import { describe, expect, it } from "vitest";
import { startResponse } from "./http";

describe("startResponse", () => {
  it("returns the session as no-store JSON", async () => {
    const session = {
      sessionId: "s1",
      token: "auth_tokens/x",
      model: "gemini-3.8-live",
      expiresAt: "2026-10-27T17:03:00.000Z",
      maxCallSeconds: 180,
      silenceSeconds: 20,
    };
    const res = startResponse({ ok: true, session });
    expect(res.status).toBe(200);
    expect(res.headers.get("cache-control")).toBe("no-store");
    expect(await res.json()).toEqual(session);
  });

  it("returns 429 with Retry-After and a friendly message", async () => {
    const res = startResponse({ ok: false, status: 429, reason: "rate_hour", retryAfter: 1200 });
    expect(res.status).toBe(429);
    expect(res.headers.get("retry-after")).toBe("1200");
    expect(await res.json()).toEqual({
      reason: "rate_hour",
      message: "You've used this hour's demo calls. Try again later, or book a call with us.",
      retryAfter: 1200,
    });
  });

  it("leaves out Retry-After when there's no wait", async () => {
    const res = startResponse({ ok: false, status: 403, reason: "turnstile" });
    expect(res.headers.get("retry-after")).toBeNull();
    expect((await res.json()).reason).toBe("turnstile");
  });
});
