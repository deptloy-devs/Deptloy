import crypto from "crypto";
import type { ChatSessionPayload } from "./types";

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const SESSION_TTL_MS = 60 * 60 * 1000; // 1 hour

/**
 * Extracts client IP securely.
 */
export function getClientIp(headers: Headers): string {
  if (process.env.VERCEL !== "1") return "local";
  const ip = headers.get("x-real-ip")?.trim() || headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim();
  return ip || "unknown";
}

function getSigningSecret(): string {
  return (
    process.env.TURNSTILE_SECRET_KEY ||
    process.env.GEMINI_CHAT_API_KEY ||
    "deptloy-internal-chat-secret-fallback"
  );
}

/**
 * Verifies a single-use Cloudflare Turnstile token.
 */
export async function verifyTurnstileToken(token: string, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  // If no secret is configured and we're not in production, permit testing
  if (!secret) {
    if (process.env.NODE_ENV !== "production") return true;
    return false;
  }

  // Cloudflare mock / test dummy tokens
  if (secret.startsWith("1x0000") || token === "test-turnstile-token") {
    return true;
  }

  try {
    const body: Record<string, string> = { secret, response: token };
    if (ip && ip !== "local" && ip !== "unknown" && ip !== "127.0.0.1" && ip !== "::1") {
      body.remoteip = ip;
    }

    const res = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(6000),
    });

    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

/**
 * Creates a signed short-lived session token (1 hour) for a verified visitor.
 */
export function signChatSessionToken(ip: string): { token: string; expiresAt: number } {
  const iat = Date.now();
  const exp = iat + SESSION_TTL_MS;
  const sid = crypto.randomUUID();

  const payload: ChatSessionPayload = { sid, ip, iat, exp };
  const payloadStr = Buffer.from(JSON.stringify(payload)).toString("base64url");

  const hmac = crypto.createHmac("sha256", getSigningSecret());
  hmac.update(payloadStr);
  const signature = hmac.digest("base64url");

  return {
    token: `${payloadStr}.${signature}`,
    expiresAt: exp,
  };
}

/**
 * Verifies a signed session token. Returns the payload if valid and unexpired, or null if invalid.
 */
export function verifyChatSessionToken(token: string): ChatSessionPayload | null {
  if (!token || typeof token !== "string") return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [payloadStr, signature] = parts;

  try {
    const hmac = crypto.createHmac("sha256", getSigningSecret());
    hmac.update(payloadStr);
    const expectedSignature = hmac.digest("base64url");

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(payloadStr, "base64url").toString("utf8")) as ChatSessionPayload;

    if (!payload.exp || Date.now() > payload.exp) {
      return null; // Expired
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * In-memory sliding rate limiter per IP / session ID.
 * Limits users to maxRequests per minute.
 */
interface RateRecord {
  timestamps: number[];
}

const rateLimitMap = new Map<string, RateRecord>();

export function checkChatRateLimit(identifier: string, maxRequests = 25, windowMs = 60_000): { allowed: boolean; remaining: number } {
  const now = Date.now();
  let record = rateLimitMap.get(identifier);

  if (!record) {
    record = { timestamps: [] };
    rateLimitMap.set(identifier, record);
  }

  // Filter timestamps within the window
  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (record.timestamps.length >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  record.timestamps.push(now);

  // Periodically clean up old map keys
  if (rateLimitMap.size > 2000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (val.timestamps.every((ts) => now - ts >= windowMs)) {
        rateLimitMap.delete(key);
      }
    }
  }

  return { allowed: true, remaining: maxRequests - record.timestamps.length };
}
