import crypto from "crypto";
import { describe, expect, it } from "vitest";
import { buildDepPrompt, buildReceptionistPrompt } from "./prompts";
import {
  checkChatRateLimit,
  getClientIp,
  signChatSessionToken,
  verifyChatSessionToken,
  verifyTurnstileToken,
} from "./session";

describe("Chat Prompts", () => {
  it("buildDepPrompt includes Deptloy core capabilities and guardrails", () => {
    const prompt = buildDepPrompt();
    expect(prompt).toContain("Dep");
    expect(prompt).toContain("Deptloy");
    expect(prompt).toContain("Autonomous AI Receptionists");
    expect(prompt).toContain("/demo");
    expect(prompt).toContain("/projects");
    expect(prompt).toContain("/contact#form");
    expect(prompt).toContain("Never invent fictitious pricing");
  });

  it("buildReceptionistPrompt formats clinic correctly", () => {
    const prompt = buildReceptionistPrompt("clinic");
    expect(prompt).toContain("Apex Health Clinic");
    expect(prompt).toContain("Comprehensive Dental Examination & Cleaning");
    expect(prompt).toContain("[APPOINTMENT SUMMARY]");
    expect(prompt).toContain("Interactive Simulation");
  });

  it("buildReceptionistPrompt formats salon correctly", () => {
    const prompt = buildReceptionistPrompt("salon");
    expect(prompt).toContain("Velvet Studio");
    expect(prompt).toContain("Balayage Full Color Treatment");
    expect(prompt).toContain("[APPOINTMENT SUMMARY]");
  });

  it("buildReceptionistPrompt defaults to clinic when invalid id provided", () => {
    const prompt = buildReceptionistPrompt("unknown-id");
    expect(prompt).toContain("Apex Health Clinic");
  });
});

describe("Chat Session Security", () => {
  it("signs and verifies a valid chat session token", () => {
    const { token, expiresAt } = signChatSessionToken("203.0.113.10");
    expect(token).toBeTruthy();
    expect(expiresAt).toBeGreaterThan(Date.now());

    const verified = verifyChatSessionToken(token);
    expect(verified).not.toBeNull();
    expect(verified?.ip).toBe("203.0.113.10");
    expect(verified?.sid).toBeTruthy();
  });

  it("rejects a tampered session token", () => {
    const { token } = signChatSessionToken("203.0.113.10");
    const [, sig] = token.split(".");
    // Tamper with payload
    const tamperedPayload = Buffer.from(
      JSON.stringify({ sid: "fake", ip: "1.1.1.1", exp: Date.now() + 100000 })
    ).toString("base64url");
    const tamperedToken = `${tamperedPayload}.${sig}`;

    expect(verifyChatSessionToken(tamperedToken)).toBeNull();
  });

  it("rejects an expired session token", () => {
    const iat = Date.now() - 10000;
    const exp = Date.now() - 1000; // already expired
    const payloadStr = Buffer.from(JSON.stringify({ sid: "expired", ip: "1.1.1.1", iat, exp })).toString("base64url");
    // Sign it
    const secret =
      process.env.TURNSTILE_SECRET_KEY ||
      process.env.GEMINI_CHAT_API_KEY ||
      "deptloy-internal-chat-secret-fallback";
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(payloadStr);
    const signature = hmac.digest("base64url");

    expect(verifyChatSessionToken(`${payloadStr}.${signature}`)).toBeNull();
  });

  it("getClientIp resolves local or vercel headers properly", () => {
    const headers = new Headers({ "x-real-ip": "198.51.100.5" });
    // In test env without VERCEL=1
    expect(getClientIp(headers)).toBe("local");
  });
});

describe("Rate Limiting", () => {
  it("enforces sliding rate limits per identifier", () => {
    const testId = `test-user-${Date.now()}`;
    for (let i = 0; i < 5; i++) {
      const res = checkChatRateLimit(testId, 5, 1000);
      expect(res.allowed).toBe(true);
    }
    // 6th call should be blocked
    const blocked = checkChatRateLimit(testId, 5, 1000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
  });
});

describe("Turnstile Token Verification", () => {
  it("verifies test tokens successfully in non-production", async () => {
    const result = await verifyTurnstileToken("test-turnstile-token");
    expect(result).toBe(true);
  });
});
