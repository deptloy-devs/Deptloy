import { describe, expect, it, vi } from "vitest";
import type { Lead } from "@/lib/lead-email";
import { requestBooking, type BookDeps } from "./booking";
import { readVoiceDemoConfig } from "./config";
import { endSession, startSession, type GateDeps } from "./gatekeeper";
import { createMemoryStore } from "./store";

const ORIGIN = "https://deptloy.com";
const IP = "1.1.1.1";
const NOW = Date.parse("2026-10-27T17:00:00Z");

const DETAILS = {
  name: "Ana Ruiz",
  email: "Ana.Ruiz @ Example.com",
  topic: "An AI receptionist for our two dental clinics.",
  preferred_time: "Tuesday 3 PM Eastern",
  company: "Ruiz Dental",
};

function setup(overrides: Partial<BookDeps> = {}) {
  const config = readVoiceDemoConfig({ NODE_ENV: "production", GEMINI_API_KEY: "g", TURNSTILE_SECRET_KEY: "t" });
  const store = createMemoryStore(() => NOW);
  let ids = 0;
  const gate: GateDeps = {
    config,
    store,
    verifyHuman: async () => true,
    createToken: async () => "auth_tokens/x",
    now: () => NOW,
    newSessionId: () => `s${++ids}`,
  };
  const sendLead = vi.fn<(lead: Lead) => Promise<void>>(async () => {});
  const deps: BookDeps = { config, store, sendLead, now: () => NOW, newReference: () => "CAL-123456", ...overrides };

  /** Starts a live call and returns its session id. */
  const startCall = async (agent: "dep" | "receptionist" = "dep", ip = IP) => {
    const result = await startSession(
      { origin: ORIGIN, ip, agent, industry: "clinic", serviceId: "srv-clean", turnstileToken: "ts" },
      gate,
    );
    if (!result.ok) throw new Error(result.reason);
    return result.session.sessionId;
  };
  const book = (sessionId: unknown, details: Record<string, unknown> = DETAILS, ip = IP, origin = ORIGIN) =>
    requestBooking({ origin, ip, sessionId, details }, deps);

  return { deps, gate, sendLead, startCall, book };
}

describe("requestBooking", () => {
  it("emails the team a call request during a live call with Dep", async () => {
    const { sendLead, startCall, book } = setup();
    const result = await book(await startCall());

    expect(result).toEqual({
      ok: true,
      status: 200,
      body: {
        status: "requested",
        reference: "CAL-123456",
        name: "Ana Ruiz",
        email: "ana.ruiz@example.com",
        preferred_time: "Tuesday 3 PM Eastern",
      },
    });
    expect(sendLead).toHaveBeenCalledTimes(1);
    const lead = sendLead.mock.calls[0][0];
    expect(lead).toMatchObject({
      id: "CAL-123456",
      fullName: "Ana Ruiz",
      email: "ana.ruiz@example.com",
      companyName: "Ruiz Dental",
      timestamp: new Date(NOW).toISOString(),
    });
    expect(lead.serviceRequired.toLowerCase()).toContain("call");
    expect(lead.projectDescription).toContain("Tuesday 3 PM Eastern");
    expect(lead.projectDescription).toContain("two dental clinics");
  });

  it("sends only one request per call", async () => {
    const { sendLead, startCall, book } = setup();
    const sessionId = await startCall();
    await book(sessionId);

    expect(await book(sessionId)).toMatchObject({ ok: false, status: 409, reason: "already_sent" });
    expect(sendLead).toHaveBeenCalledTimes(1);
  });

  it("needs a live call with Dep from the same visitor", async () => {
    const { deps, sendLead, startCall, book } = setup();

    expect(await book("made-up")).toMatchObject({ status: 403, reason: "no_call" });
    expect(await book(undefined)).toMatchObject({ status: 403, reason: "no_call" });

    const receptionist = await startCall("receptionist");
    expect(await book(receptionist)).toMatchObject({ status: 403, reason: "no_call" });
    await endSession({ origin: ORIGIN, ip: IP, sessionId: receptionist }, deps);

    const dep = await startCall("dep");
    expect(await book(dep, DETAILS, "9.9.9.9")).toMatchObject({ status: 403, reason: "no_call" });

    await endSession({ origin: ORIGIN, ip: IP, sessionId: dep }, deps);
    expect(await book(dep)).toMatchObject({ status: 403, reason: "no_call" });
    expect(sendLead).not.toHaveBeenCalled();
  });

  it("asks Dep to fix missing or unclear details, without using up the call's request", async () => {
    const { sendLead, startCall, book } = setup();
    const sessionId = await startCall();

    const cases: [Record<string, unknown>, RegExp][] = [
      [{ ...DETAILS, name: " " }, /name/i],
      [{ ...DETAILS, email: "ana at example" }, /spell/i],
      [{ ...DETAILS, topic: "" }, /build or fix/i],
      [{ ...DETAILS, preferred_time: undefined }, /time zone/i],
      [{ ...DETAILS, topic: "x".repeat(601) }, /shorter/i],
    ];
    for (const [details, message] of cases) {
      const result = await book(sessionId, details);
      expect(result).toMatchObject({ ok: false, status: 400, reason: "invalid" });
      expect(result.body.status === "error" && result.body.message).toMatch(message);
    }
    expect(sendLead).not.toHaveBeenCalled();
    expect(await book(sessionId)).toMatchObject({ ok: true });
  });

  it("works without a company name", async () => {
    const { sendLead, startCall, book } = setup();
    await book(await startCall(), { ...DETAILS, company: undefined });
    expect(sendLead.mock.calls[0][0].companyName).toBe("Not given");
  });

  it("rejects other sites", async () => {
    const { startCall, book } = setup();
    const result = await book(await startCall(), DETAILS, IP, "https://evil.example");
    expect(result).toMatchObject({ ok: false, status: 403, reason: "origin" });
  });

  it("says so when email isn't set up", async () => {
    const { startCall, book } = setup({ sendLead: null });
    expect(await book(await startCall())).toMatchObject({ ok: false, status: 503, reason: "not_configured" });
  });

  it("lets Dep try again when Gmail fails", async () => {
    const sendLead = vi.fn<(lead: Lead) => Promise<void>>().mockRejectedValueOnce(new Error("smtp")).mockResolvedValue();
    const { startCall, book } = setup({ sendLead });
    const sessionId = await startCall();

    expect(await book(sessionId)).toMatchObject({ ok: false, status: 502, reason: "send_failed" });
    expect(await book(sessionId)).toMatchObject({ ok: true });
  });
});
