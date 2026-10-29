import { describe, expect, it, vi } from "vitest";
import { readVoiceDemoConfig } from "./config";
import { endSession, startSession, type GateDeps } from "./gatekeeper";
import { createMemoryStore } from "./store";

const ORIGIN = "https://deptloy.com";
// 2026-10-27 10:00:00 in Los Angeles (UTC-7).
const START = Date.parse("2026-10-27T17:00:00Z");

function setup(env: Record<string, string> = {}, overrides: Partial<GateDeps> = {}) {
  let clock = START;
  let ids = 0;
  const deps: GateDeps = {
    config: readVoiceDemoConfig({
      NODE_ENV: "production",
      GEMINI_API_KEY: "g-key",
      TURNSTILE_SECRET_KEY: "t-secret",
      ...env,
    }),
    store: createMemoryStore(() => clock),
    verifyHuman: vi.fn(async () => true),
    createToken: vi.fn(async () => "auth_tokens/test"),
    now: () => clock,
    newSessionId: () => `s${++ids}`,
    ...overrides,
  };
  const advance = (seconds: number) => {
    clock += seconds * 1000;
  };
  const start = (
    ip = "1.1.1.1",
    body: Partial<{ agent: string; industry: string; serviceId: string; turnstileToken: string }> = {},
  ) =>
    startSession(
      { origin: ORIGIN, ip, industry: "clinic", serviceId: "srv-clean", turnstileToken: "ts-token", ...body },
      deps,
    );
  /** Starts a call and hangs it up, so the next start isn't blocked as "already in a call". */
  const call = async (ip = "1.1.1.1") => {
    const result = await start(ip);
    if (result.ok) await endSession({ origin: ORIGIN, ip, sessionId: result.session.sessionId }, deps);
    return result;
  };
  return { deps, advance, start, call };
}

describe("startSession", () => {
  it("issues a short-lived token for a valid request", async () => {
    const { deps, start } = setup();
    const result = await start();

    expect(result).toEqual({
      ok: true,
      session: {
        sessionId: "s1",
        token: "auth_tokens/test",
        model: "gemini-3.8-live",
        expiresAt: new Date(START + 180_000).toISOString(),
        maxCallSeconds: 180,
        silenceSeconds: 20,
      },
    });
    expect(deps.verifyHuman).toHaveBeenCalledWith("ts-token", "1.1.1.1");
    expect(deps.createToken).toHaveBeenCalledWith({
      agent: { kind: "receptionist", industry: "clinic", serviceId: "srv-clean" },
      expiresAt: new Date(START + 180_000),
    });
  });

  it("starts a call with Dep, Deptloy's own assistant, without an industry", async () => {
    const { deps, start } = setup();
    const result = await start("1.1.1.1", { agent: "dep", industry: undefined, serviceId: undefined });

    expect(result).toMatchObject({ ok: true });
    expect(deps.createToken).toHaveBeenCalledWith({ agent: { kind: "dep" }, expiresAt: new Date(START + 180_000) });
  });

  it("shares one set of limits between Dep and the receptionists", async () => {
    const { deps, call } = setup();
    await call();
    await call();
    const dep = await startSession({ origin: ORIGIN, ip: "1.1.1.1", agent: "dep", turnstileToken: "t" }, deps);
    expect(dep).toMatchObject({ ok: true });
    if (dep.ok) await endSession({ origin: ORIGIN, ip: "1.1.1.1", sessionId: dep.session.sessionId }, deps);
    expect(await call()).toMatchObject({ reason: "rate_hour" });
  });

  it("rejects requests from other sites before doing any work", async () => {
    const { deps } = setup();
    const result = await startSession(
      { origin: "https://evil.example", ip: "1.1.1.1", industry: "clinic", serviceId: "srv-clean", turnstileToken: "t" },
      deps,
    );
    expect(result).toMatchObject({ ok: false, status: 403, reason: "origin" });
    expect(deps.verifyHuman).not.toHaveBeenCalled();
  });

  it("answers 503 when keys or the store are missing", async () => {
    const noKey = setup({ GEMINI_API_KEY: "" });
    expect(await noKey.start()).toMatchObject({ ok: false, status: 503, reason: "not_configured" });

    const noStore = setup({}, { store: null });
    expect(await noStore.start()).toMatchObject({ ok: false, status: 503, reason: "not_configured" });
  });

  it("rejects an unknown industry, a service from another industry, or a missing Turnstile token", async () => {
    const { start, deps } = setup();
    expect(await start("1.1.1.1", { industry: "casino" })).toMatchObject({ status: 400, reason: "bad_request" });
    expect(await start("1.1.1.1", { serviceId: "srv-cut" })).toMatchObject({ status: 400, reason: "bad_request" });
    expect(await start("1.1.1.1", { turnstileToken: "" })).toMatchObject({ status: 400, reason: "bad_request" });
    expect(await start("1.1.1.1", { agent: "hal9000" })).toMatchObject({ status: 400, reason: "bad_request" });
    expect(deps.verifyHuman).not.toHaveBeenCalled();
  });

  it("rejects a failed Turnstile check and blocks the IP after repeated failures", async () => {
    const { start, deps } = setup({}, { verifyHuman: vi.fn(async () => false) });

    expect(await start()).toMatchObject({ ok: false, status: 403, reason: "turnstile" });
    await start();
    await start(); // third strike
    const blocked = await start();

    expect(blocked).toMatchObject({ ok: false, status: 429, reason: "blocked", retryAfter: 3600 });
    expect(deps.verifyHuman).toHaveBeenCalledTimes(3);
  });

  it("limits each IP to 3 calls an hour, with Retry-After", async () => {
    const { call, advance } = setup();
    await call();
    await call();
    advance(600);
    await call();

    const fourth = await call();
    expect(fourth).toMatchObject({ ok: false, status: 429, reason: "rate_hour", retryAfter: 3000 });

    advance(3000);
    expect(await call()).toMatchObject({ ok: true });
  });

  it("limits each IP to 10 calls a day", async () => {
    const { call, advance } = setup({ VOICE_DEMO_STRIKES_BEFORE_BLOCK: "99" });
    for (let i = 0; i < 10; i++) {
      expect(await call()).toMatchObject({ ok: true });
      if (i % 3 === 2) advance(3600);
    }
    const eleventh = await call();
    expect(eleventh).toMatchObject({ ok: false, status: 429, reason: "rate_day" });
    expect((eleventh as { retryAfter: number }).retryAfter).toBe(86400 - 3 * 3600);
  });

  it("blocks an IP that keeps hitting the limit", async () => {
    const { call } = setup();
    await call();
    await call();
    await call();
    await call(); // strike 1
    await call(); // strike 2
    await call(); // strike 3 -> blocked
    expect(await call()).toMatchObject({ ok: false, status: 429, reason: "blocked", retryAfter: 3600 });
  });

  it("allows one call at a time per IP", async () => {
    const { start, deps } = setup();
    const first = await start();
    expect(await start()).toMatchObject({ ok: false, status: 409, reason: "busy_ip" });

    if (!first.ok) throw new Error("first call should start");
    await endSession({ origin: ORIGIN, ip: "1.1.1.1", sessionId: first.session.sessionId }, deps);
    expect(await start()).toMatchObject({ ok: true });
  });

  it("frees a stuck call slot once the call can no longer be running", async () => {
    const { start, advance } = setup();
    await start();
    advance(180 + 30);
    expect(await start()).toMatchObject({ ok: true });
  });

  it("caps calls running at once across the site, and frees a line when a call ends", async () => {
    const { start, deps } = setup();
    const first = await start("1.1.1.1");
    await start("2.2.2.2");
    await start("3.3.3.3");

    expect(await start("4.4.4.4")).toMatchObject({ ok: false, status: 503, reason: "busy_lines", retryAfter: 60 });

    if (!first.ok) throw new Error("first call should start");
    await endSession({ origin: ORIGIN, ip: "1.1.1.1", sessionId: first.session.sessionId }, deps);
    // The refused caller wasn't left holding its own slot either.
    expect(await start("4.4.4.4")).toMatchObject({ ok: true });
  });

  it("stops issuing tokens when the daily minutes are used up, until midnight Pacific", async () => {
    const { call } = setup({ VOICE_DEMO_DAILY_MINUTES: "6" });
    expect(await call("1.1.1.1")).toMatchObject({ ok: true });
    expect(await call("2.2.2.2")).toMatchObject({ ok: true });

    const third = await call("3.3.3.3");
    // 10:00 in Los Angeles -> 14 hours to midnight.
    expect(third).toMatchObject({ ok: false, status: 503, reason: "budget", retryAfter: 14 * 3600 });
  });

  it("resets the daily minutes on the next Pacific day", async () => {
    const { call, advance } = setup({ VOICE_DEMO_DAILY_MINUTES: "3" });
    await call("1.1.1.1");
    expect(await call("2.2.2.2")).toMatchObject({ reason: "budget" });
    advance(14 * 3600);
    expect(await call("2.2.2.2")).toMatchObject({ ok: true });
  });

  it("charges nothing when Gemini fails to create the token", async () => {
    const createToken = vi.fn().mockRejectedValueOnce(new Error("quota")).mockResolvedValue("auth_tokens/ok");
    const { start } = setup({ VOICE_DEMO_DAILY_MINUTES: "3", VOICE_DEMO_MAX_CONCURRENT: "1" }, { createToken });

    expect(await start()).toMatchObject({ ok: false, status: 502, reason: "token_failed" });
    // The line, the IP's slot and the budget were all handed back.
    expect(await start()).toMatchObject({ ok: true });
  });
});

describe("endSession", () => {
  it("only releases the IP's slot for the matching session", async () => {
    const { start, deps } = setup();
    await start();
    await endSession({ origin: ORIGIN, ip: "1.1.1.1", sessionId: "someone-else" }, deps);
    expect(await start()).toMatchObject({ reason: "busy_ip" });
  });

  it("rejects other sites", async () => {
    const { deps } = setup();
    expect(await endSession({ origin: "https://evil.example", ip: "1.1.1.1", sessionId: "s1" }, deps)).toEqual({
      ok: false,
      status: 403,
    });
  });
});
