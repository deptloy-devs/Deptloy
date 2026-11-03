import crypto from "crypto";
import { readVoiceDemoConfig } from "@/lib/voice-demo/config";
import { getVoiceDemoStore } from "@/lib/voice-demo/server";
import { createMemoryStore, type VoiceDemoStore } from "@/lib/voice-demo/store";
import { verifyTurnstile } from "@/lib/voice-demo/turnstile";
import type { ChatSessionPayload } from "./types";

export { getClientIp } from "@/lib/voice-demo/client-ip";

const SESSION_TTL_MS = 60 * 60 * 1000; // 1 hour

/** Signs chat session tokens. Production needs a real secret; dev and tests get a fixed one. */
function getSigningSecret(): string | null {
  const secret = process.env.CHAT_SESSION_SECRET || process.env.TURNSTILE_SECRET_KEY;
  if (secret) return secret;
  return process.env.NODE_ENV === "production" ? null : "deptloy-dev-only-chat-secret";
}

export function chatSessionsConfigured(): boolean {
  return getSigningSecret() !== null;
}

function sign(payloadStr: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(payloadStr).digest("base64url");
}

/**
 * Asks Cloudflare whether the Turnstile token is real. Without a secret
 * (local dev only) every visitor passes.
 */
export async function verifyTurnstileToken(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return process.env.NODE_ENV !== "production";
  if (!token) return false;
  return verifyTurnstile({ secret, token, ip });
}

/**
 * Creates a signed short-lived session token (1 hour) for a verified visitor.
 */
export function signChatSessionToken(ip: string): { token: string; expiresAt: number } {
  const secret = getSigningSecret();
  if (!secret) throw new Error("Chat sessions need TURNSTILE_SECRET_KEY or CHAT_SESSION_SECRET");

  const iat = Date.now();
  const exp = iat + SESSION_TTL_MS;
  const payload: ChatSessionPayload = { sid: crypto.randomUUID(), ip, iat, exp };
  const payloadStr = Buffer.from(JSON.stringify(payload)).toString("base64url");

  return { token: `${payloadStr}.${sign(payloadStr, secret)}`, expiresAt: exp };
}

/**
 * Verifies a signed session token. Returns the payload if it's valid, unexpired
 * and (when `ip` is given) was issued to that same IP. Otherwise null.
 */
export function verifyChatSessionToken(token: unknown, ip?: string): ChatSessionPayload | null {
  const secret = getSigningSecret();
  if (!secret || !token || typeof token !== "string") return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payloadStr, signature] = parts;

  try {
    const expected = Buffer.from(sign(payloadStr, secret));
    const given = Buffer.from(signature);
    if (given.length !== expected.length || !crypto.timingSafeEqual(given, expected)) return null;

    const payload = JSON.parse(Buffer.from(payloadStr, "base64url").toString("utf8")) as ChatSessionPayload;
    if (!payload.exp || Date.now() > payload.exp) return null;
    if (ip !== undefined && payload.ip !== ip) return null;
    return payload;
  } catch {
    return null;
  }
}

const devGlobal = globalThis as typeof globalThis & { __chatFallbackStore?: VoiceDemoStore };

/**
 * Where the chat's counters live: the voice demo's Upstash Redis when it's set up
 * (and its in-memory store in `next dev`). Without Redis the counters fall back to
 * this server instance's memory, which still works but is weak on serverless.
 */
export function getChatStore(): VoiceDemoStore {
  const store = getVoiceDemoStore(readVoiceDemoConfig());
  if (store) return store;
  if (!devGlobal.__chatFallbackStore) {
    console.warn("[chat] No Redis configured. Chat rate limits are per server instance only.");
    devGlobal.__chatFallbackStore = createMemoryStore();
  }
  return devGlobal.__chatFallbackStore;
}
