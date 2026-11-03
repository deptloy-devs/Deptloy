import { afterEach, describe, expect, it, vi } from "vitest";
import { POST as sessionHandler } from "./session/route";
import { POST as chatHandler } from "./route";

const ORIGIN = "https://deptloy.com";

function post(url: string, body: unknown, origin: string | null = ORIGIN) {
  const headers = new Headers({ "Content-Type": "application/json" });
  if (origin) headers.set("origin", origin);
  return new Request(url, { method: "POST", headers, body: JSON.stringify(body) });
}

async function newSessionToken(): Promise<string> {
  const res = await sessionHandler(post("http://localhost/api/chat/session", { turnstileToken: "" }));
  const { sessionToken } = await res.json();
  return sessionToken;
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("/api/chat API routes", () => {
  it("creates a signed chat session via /api/chat/session", async () => {
    const res = await sessionHandler(post("http://localhost/api/chat/session", { turnstileToken: "" }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
    expect(data.sessionToken).toBeTruthy();
    expect(data.expiresAt).toBeGreaterThan(Date.now());
  });

  it("refuses sessions and messages from other sites", async () => {
    const session = await sessionHandler(post("http://localhost/api/chat/session", {}, "https://evil.example"));
    expect(session.status).toBe(403);

    const chat = await chatHandler(
      post("http://localhost/api/chat", { assistant: "dep", messages: [{ role: "user", content: "Hi" }] }, null),
    );
    expect(chat.status).toBe(403);
  });

  it("refuses a message without a valid session", async () => {
    vi.stubEnv("GEMINI_CHAT_API_KEY", "test-key");
    const res = await chatHandler(
      post("http://localhost/api/chat", {
        assistant: "dep",
        sessionToken: "not-a-real-token",
        messages: [{ role: "user", content: "Hi" }],
      }),
    );
    expect(res.status).toBe(401);
    expect((await res.json()).error).toBeTruthy();
  });

  it("rejects invalid request bodies in /api/chat", async () => {
    vi.stubEnv("GEMINI_CHAT_API_KEY", "test-key");
    const res = await chatHandler(
      post("http://localhost/api/chat", { assistant: "invalid-assistant", messages: [] }),
    );
    expect(res.status).toBe(400);
  });

  it("handles valid request for assistant 'dep'", async () => {
    const sessionToken = await newSessionToken();
    const res = await chatHandler(
      post("http://localhost/api/chat", {
        assistant: "dep",
        sessionToken,
        messages: [{ role: "user", content: "What does Deptloy do?" }],
      }),
    );
    // Should either stream 200 (if API key present) or 503 (if missing in test environment)
    expect([200, 503]).toContain(res.status);
    if (res.status === 200) {
      expect(res.headers.get("content-type")).toContain("text/plain");
    }
  });

  it("handles valid request for assistant 'receptionist'", async () => {
    const sessionToken = await newSessionToken();
    const res = await chatHandler(
      post("http://localhost/api/chat", {
        assistant: "receptionist",
        industryId: "clinic",
        serviceId: "srv-clean",
        sessionToken,
        messages: [{ role: "user", content: "What are your business hours?" }],
      }),
    );
    expect([200, 503]).toContain(res.status);
  });
});
