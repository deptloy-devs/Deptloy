import { parseVoiceAgent, type VoiceAgent } from "./agents";
import { isAllowedOrigin, type VoiceDemoConfig } from "./config";
import type { RefusalReason } from "./messages";
import type { VoiceDemoStore } from "./store";

/**
 * Decides whether a visitor gets a voice call. Every check runs here,
 * before any Gemini token exists.
 */

export type GateDeps = {
  config: VoiceDemoConfig;
  /** Null when no store is configured. */
  store: VoiceDemoStore | null;
  verifyHuman(token: string, ip: string): Promise<boolean>;
  /** Creates the Gemini token. Returns the token's name. */
  createToken(request: { agent: VoiceAgent; expiresAt: Date }): Promise<string>;
  now(): number;
  newSessionId(): string;
};

export type StartInput = {
  origin: string | null;
  ip: string;
  /** "dep" for Dep. Leave out (or "receptionist") for a /demo receptionist picked by industry and service. */
  agent?: unknown;
  industry?: unknown;
  serviceId?: unknown;
  turnstileToken: unknown;
};

export type IssuedSession = {
  sessionId: string;
  token: string;
  model: string;
  expiresAt: string;
  maxCallSeconds: number;
  silenceSeconds: number;
};

export type StartResult =
  | { ok: true; session: IssuedSession }
  | { ok: false; status: number; reason: RefusalReason; retryAfter?: number };

const HOUR = 3600;
const DAY = 86400;
/** How long past the call's end we keep its slot, in case the browser never says goodbye. */
const SLOT_GRACE_SECONDS = 30;
const BUSY_RETRY_SECONDS = 60;

/** Redis keys. Shared with the booking check, which needs the live call's slot. */
export const keys = {
  block: (ip: string) => `vd:block:${ip}`,
  strikes: (ip: string) => `vd:strikes:${ip}`,
  hour: (ip: string) => `vd:hour:${ip}`,
  day: (ip: string) => `vd:day:${ip}`,
  ipCall: (ip: string) => `vd:call:${ip}`,
  lines: "vd:lines",
  budget: (date: string) => `vd:budget:${date}`,
  /** Set for Dep calls only: this call may send one call request to the team. */
  canBook: (sessionId: string) => `vd:canbook:${sessionId}`,
  booked: (sessionId: string) => `vd:booked:${sessionId}`,
};

const PACIFIC = "America/Los_Angeles";

/** Gemini's daily quotas reset at midnight Pacific, so our daily budget does too. */
function pacificDate(nowMs: number): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: PACIFIC }).format(nowMs);
}

function secondsUntilPacificMidnight(nowMs: number): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: PACIFIC,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hourCycle: "h23",
  }).formatToParts(nowMs);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return DAY - (get("hour") * HOUR + get("minute") * 60 + get("second"));
}

function refuse(status: number, reason: RefusalReason, retryAfter?: number): StartResult {
  return retryAfter === undefined ? { ok: false, status, reason } : { ok: false, status, reason, retryAfter };
}

/** Counts a strike against the IP and blocks it once it has too many. */
async function strike(store: VoiceDemoStore, ip: string, config: VoiceDemoConfig) {
  const { strikesBeforeBlock, blockSeconds } = config.limits;
  const strikes = await store.incrBy(keys.strikes(ip), 1, blockSeconds);
  if (strikes >= strikesBeforeBlock) {
    await store.set(keys.block(ip), "1", blockSeconds);
    await store.del(keys.strikes(ip));
  }
}

export async function startSession(input: StartInput, deps: GateDeps): Promise<StartResult> {
  const { config, store } = deps;
  const { limits } = config;

  if (!isAllowedOrigin(input.origin, config)) return refuse(403, "origin");
  if (!config.geminiApiKey || !config.turnstileSecret || !store) return refuse(503, "not_configured");

  const { ip, turnstileToken } = input;
  const agent = parseVoiceAgent(input);
  if (!agent) return refuse(400, "bad_request");
  if (typeof turnstileToken !== "string" || !turnstileToken) return refuse(400, "bad_request");

  if (await store.getString(keys.block(ip))) {
    return refuse(429, "blocked", await store.ttl(keys.block(ip)));
  }

  if (!(await deps.verifyHuman(turnstileToken, ip))) {
    await strike(store, ip, config);
    return refuse(403, "turnstile");
  }

  if ((await store.getNumber(keys.day(ip))) >= limits.perDay) {
    await strike(store, ip, config);
    return refuse(429, "rate_day", await store.ttl(keys.day(ip)));
  }
  if ((await store.getNumber(keys.hour(ip))) >= limits.perHour) {
    await strike(store, ip, config);
    return refuse(429, "rate_hour", await store.ttl(keys.hour(ip)));
  }

  const now = deps.now();
  const sessionId = deps.newSessionId();
  const callSeconds = limits.maxCallSeconds;
  const expiresAt = new Date(now + callSeconds * 1000);
  const slotSeconds = callSeconds + SLOT_GRACE_SECONDS;

  // One call at a time per IP. Holding this slot also makes the checks above safe from races.
  if (!(await store.setIfAbsent(keys.ipCall(ip), sessionId, slotSeconds))) {
    return refuse(409, "busy_ip", await store.ttl(keys.ipCall(ip)));
  }

  // Take a line and the minutes first, then check, so two callers can never both squeeze in.
  const lines = await store.addLive(keys.lines, sessionId, now + slotSeconds * 1000, now);
  const budgetKey = keys.budget(pacificDate(now));
  const usedSeconds = await store.incrBy(budgetKey, callSeconds, 2 * DAY);

  const release = async () => {
    await store.removeLive(keys.lines, sessionId);
    await store.incrBy(budgetKey, -callSeconds, 2 * DAY);
    await store.del(keys.ipCall(ip));
  };

  if (lines > limits.maxConcurrent) {
    await release();
    return refuse(503, "busy_lines", BUSY_RETRY_SECONDS);
  }
  if (usedSeconds > limits.dailyMinutes * 60) {
    await release();
    return refuse(503, "budget", secondsUntilPacificMidnight(now));
  }

  let token: string;
  try {
    token = await deps.createToken({ agent, expiresAt });
  } catch {
    await release();
    return refuse(502, "token_failed");
  }

  await store.incrBy(keys.hour(ip), 1, HOUR);
  await store.incrBy(keys.day(ip), 1, DAY);
  if (agent.kind === "dep") await store.set(keys.canBook(sessionId), "1", slotSeconds);

  return {
    ok: true,
    session: {
      sessionId,
      token,
      model: config.model,
      expiresAt: expiresAt.toISOString(),
      maxCallSeconds: callSeconds,
      silenceSeconds: limits.silenceSeconds,
    },
  };
}

export type EndInput = { origin: string | null; ip: string; sessionId: unknown };

/** Frees the caller's slot and line when they hang up. The minutes stay spent. */
export async function endSession(
  input: EndInput,
  deps: Pick<GateDeps, "config" | "store">,
): Promise<{ ok: boolean; status: number }> {
  if (!isAllowedOrigin(input.origin, deps.config)) return { ok: false, status: 403 };
  const { store } = deps;
  if (!store || typeof input.sessionId !== "string" || !input.sessionId) return { ok: false, status: 400 };

  if ((await store.getString(keys.ipCall(input.ip))) === input.sessionId) {
    await store.del(keys.ipCall(input.ip));
  }
  await store.removeLive(keys.lines, input.sessionId);
  return { ok: true, status: 204 };
}
