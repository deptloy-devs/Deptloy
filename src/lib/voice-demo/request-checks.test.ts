import { describe, expect, it, vi } from "vitest";
import { getClientIp } from "./client-ip";
import { verifyTurnstile } from "./turnstile";

describe("getClientIp", () => {
  it("uses the IP Vercel sets when running on Vercel", () => {
    const headers = new Headers({ "x-real-ip": "203.0.113.7", "x-forwarded-for": "198.51.100.1" });
    expect(getClientIp(headers, { VERCEL: "1" })).toBe("203.0.113.7");
  });

  it("falls back to Vercel's own forwarded-for header", () => {
    const headers = new Headers({ "x-vercel-forwarded-for": "203.0.113.8, 10.0.0.1" });
    expect(getClientIp(headers, { VERCEL: "1" })).toBe("203.0.113.8");
  });

  it("never trusts client-sent headers off Vercel", () => {
    const headers = new Headers({ "x-real-ip": "203.0.113.7", "x-forwarded-for": "203.0.113.7" });
    expect(getClientIp(headers, {})).toBe("local");
  });

  it("groups requests with no IP together on Vercel", () => {
    expect(getClientIp(new Headers(), { VERCEL: "1" })).toBe("unknown");
  });
});

describe("verifyTurnstile", () => {
  const okResponse = (body: unknown) => new Response(JSON.stringify(body), { status: 200 });

  it("sends the secret, token and IP to Cloudflare and passes on success", async () => {
    const fetchImpl = vi.fn(async () => okResponse({ success: true }));
    const ok = await verifyTurnstile({ secret: "sec", token: "tok", ip: "203.0.113.7", fetchImpl });

    expect(ok).toBe(true);
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://challenges.cloudflare.com/turnstile/v0/siteverify");
    expect(JSON.parse(String(init.body))).toEqual({ secret: "sec", response: "tok", remoteip: "203.0.113.7" });
  });

  it("leaves out placeholder IPs", async () => {
    const fetchImpl = vi.fn(async () => okResponse({ success: true }));
    await verifyTurnstile({ secret: "sec", token: "tok", ip: "local", fetchImpl });
    const [, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(JSON.parse(String(init.body))).toEqual({ secret: "sec", response: "tok" });
  });

  it("fails on a rejected token, an HTTP error or a network error", async () => {
    expect(
      await verifyTurnstile({ secret: "s", token: "t", ip: "1.1.1.1", fetchImpl: async () => okResponse({ success: false }) }),
    ).toBe(false);
    expect(
      await verifyTurnstile({ secret: "s", token: "t", ip: "1.1.1.1", fetchImpl: async () => new Response("", { status: 500 }) }),
    ).toBe(false);
    expect(
      await verifyTurnstile({
        secret: "s",
        token: "t",
        ip: "1.1.1.1",
        fetchImpl: async () => {
          throw new Error("offline");
        },
      }),
    ).toBe(false);
  });
});
