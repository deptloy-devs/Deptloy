import { afterEach, describe, expect, it, vi } from "vitest";
import { createGeminiLiveToken } from "./gemini-token";

/** Captures the token request the Gemini SDK sends, and answers like Gemini does. */
function captureTokenRequest() {
  const sent: { url: string; body: Record<string, unknown> }[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string | URL, init?: RequestInit) => {
      sent.push({ url: String(url), body: JSON.parse(String(init?.body ?? "{}")) });
      return new Response(JSON.stringify({ name: "auth_tokens/test-token" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }),
  );
  return sent;
}

afterEach(() => vi.unstubAllGlobals());

describe("createGeminiLiveToken", () => {
  const now = Date.parse("2026-10-28T12:00:00Z");
  const request = { apiKey: "test-key", model: "gemini-3.8-live", expiresAt: new Date(now + 180_000), now };

  it("returns the token's name", async () => {
    captureTokenRequest();
    expect(await createGeminiLiveToken({ ...request, agent: { kind: "dep" } })).toBe("auth_tokens/test-token");
  });

  // Gemini rejects a field mask with the tools in it ("field_mask is invalid"), and with no
  // field mask it takes the whole call setup from the token and ignores the browser's.
  it("locks the whole call setup into the token without a field mask, tools included", async () => {
    const sent = captureTokenRequest();
    await createGeminiLiveToken({ ...request, agent: { kind: "dep" } });

    expect(sent).toHaveLength(1);
    expect(sent[0].body).not.toHaveProperty("fieldMask");
    expect(JSON.stringify(sent[0].body)).toContain("book_discovery_call");
  });

  it("does the same for the /demo receptionists", async () => {
    const sent = captureTokenRequest();
    await createGeminiLiveToken({ ...request, agent: { kind: "receptionist", industry: "clinic", serviceId: "srv-clean" } });

    expect(sent[0].body).not.toHaveProperty("fieldMask");
    expect(JSON.stringify(sent[0].body)).toContain("check_availability");
  });
});
