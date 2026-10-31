import { describe, expect, it } from "vitest";
import { POST as sessionHandler } from "./session/route";
import { POST as chatHandler } from "./route";

describe("/api/chat API routes", () => {
  it("creates a signed chat session via /api/chat/session", async () => {
    const req = new Request("http://localhost/api/chat/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ turnstileToken: "test-turnstile-token" }),
    });

    const res = await sessionHandler(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
    expect(data.sessionToken).toBeTruthy();
    expect(data.expiresAt).toBeGreaterThan(Date.now());
  });

  it("rejects invalid request bodies in /api/chat", async () => {
    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assistant: "invalid-assistant", messages: [] }),
    });

    const res = await chatHandler(req);
    expect(res.status).toBe(400);
  });

  it("handles valid request for assistant 'dep'", async () => {
    // Generate valid session token
    const sessReq = new Request("http://localhost/api/chat/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ turnstileToken: "test-turnstile-token" }),
    });
    const sessRes = await sessionHandler(sessReq);
    const { sessionToken } = await sessRes.json();

    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        assistant: "dep",
        sessionToken,
        messages: [{ role: "user", content: "What does Deptloy do?" }],
      }),
    });

    const res = await chatHandler(req);
    // Should either stream 200 (if API key present) or 503 (if missing in test environment)
    expect([200, 503]).toContain(res.status);
    if (res.status === 200) {
      expect(res.headers.get("content-type")).toContain("text/plain");
    }
  });

  it("handles valid request for assistant 'receptionist'", async () => {
    const sessReq = new Request("http://localhost/api/chat/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ turnstileToken: "test-turnstile-token" }),
    });
    const sessRes = await sessionHandler(sessReq);
    const { sessionToken } = await sessRes.json();

    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        assistant: "receptionist",
        industryId: "clinic",
        serviceId: "srv-clean",
        sessionToken,
        messages: [{ role: "user", content: "What are your business hours?" }],
      }),
    });

    const res = await chatHandler(req);
    expect([200, 503]).toContain(res.status);
  });
});
