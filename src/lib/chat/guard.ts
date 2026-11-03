import { pacificDate, secondsUntilPacificMidnight } from "@/lib/voice-demo/gatekeeper";
import type { VoiceDemoStore } from "@/lib/voice-demo/store";

/**
 * Abuse limits for the text chat, built like the voice demo's gatekeeper:
 * counters per IP in Redis, strikes that end in a block, and a site-wide daily cap.
 * Each limit can be overridden with the env var named next to it.
 */

type Env = Record<string, string | undefined>;

const MINUTE = 60;
const HOUR = 3600;
const DAY = 86400;

const LIMIT_DEFAULTS = {
  /** CHAT_MAX_PER_MINUTE: messages per IP per minute. */
  perMinute: 10,
  /** CHAT_MAX_PER_HOUR: messages per IP per hour. */
  perHour: 60,
  /** CHAT_MAX_PER_DAY: messages per IP per day. */
  perDay: 150,
  /** CHAT_MAX_SESSIONS_PER_HOUR: new chat sessions (human checks) per IP per hour. */
  sessionsPerHour: 10,
  /** CHAT_DAILY_MESSAGES: total messages per day across the whole site. */
  dailyMessages: 1500,
  /** CHAT_STRIKES_BEFORE_BLOCK: limit hits or failed checks before the IP is blocked. */
  strikesBeforeBlock: 3,
  /** CHAT_BLOCK_SECONDS: how long a blocked IP waits. */
  blockSeconds: 3600,
};

const LIMIT_ENV: Record<keyof typeof LIMIT_DEFAULTS, string> = {
  perMinute: "CHAT_MAX_PER_MINUTE",
  perHour: "CHAT_MAX_PER_HOUR",
  perDay: "CHAT_MAX_PER_DAY",
  sessionsPerHour: "CHAT_MAX_SESSIONS_PER_HOUR",
  dailyMessages: "CHAT_DAILY_MESSAGES",
  strikesBeforeBlock: "CHAT_STRIKES_BEFORE_BLOCK",
  blockSeconds: "CHAT_BLOCK_SECONDS",
};

export type ChatLimits = typeof LIMIT_DEFAULTS;

function positiveInt(value: string | undefined, fallback: number): number {
  if (!value || !/^\d+$/.test(value.trim())) return fallback;
  const n = Number(value);
  return n > 0 ? n : fallback;
}

export function readChatLimits(env: Env = process.env): ChatLimits {
  const limits = { ...LIMIT_DEFAULTS };
  for (const key of Object.keys(LIMIT_DEFAULTS) as (keyof ChatLimits)[]) {
    limits[key] = positiveInt(env[LIMIT_ENV[key]], LIMIT_DEFAULTS[key]);
  }
  return limits;
}

export type ChatRefusalReason =
  | "origin"
  | "not_configured"
  | "bad_request"
  | "session"
  | "turnstile"
  | "blocked"
  | "sessions"
  | "rate_minute"
  | "rate_hour"
  | "rate_day"
  | "budget"
  | "busy"
  | "failed";

/** What the visitor sees. The chat UI shows these as they are. */
export const CHAT_REFUSAL_MESSAGES: Record<ChatRefusalReason, string> = {
  origin: "This chat only works on deptloy.com.",
  not_configured: "Chat isn't available right now. Please email contact@deptloy.com.",
  bad_request: "Something went wrong sending your message. Please try again.",
  session: "Your chat session ran out. Please send your message again.",
  turnstile: "We couldn't confirm you're human. Refresh the page and try again.",
  blocked: "Too many messages from your network. Please try again later, or contact our team.",
  sessions: "Too many new chats from your network. Please try again later.",
  rate_minute: "You're sending messages quickly. Please wait a minute and try again.",
  rate_hour: "You've reached this hour's chat limit. Try again later, or contact our team.",
  rate_day: "You've reached today's chat limit. Try again tomorrow, or contact our team.",
  budget: "Chat is resting for today. Please try again later, or contact our team.",
  busy: "We're getting a lot of messages right now. Please try again in a moment.",
  failed: "Something went wrong on our side. Please try again.",
};

export type ChatRefusal = {
  ok: false;
  status: number;
  reason: ChatRefusalReason;
  retryAfter?: number;
};

export type GuardResult = { ok: true } | ChatRefusal;

export function refuse(status: number, reason: ChatRefusalReason, retryAfter?: number): ChatRefusal {
  return retryAfter === undefined ? { ok: false, status, reason } : { ok: false, status, reason, retryAfter };
}

/** Turns a refusal into the JSON response the chat UI reads (`error` is shown to the visitor). */
export function refusalResponse(refusal: ChatRefusal): Response {
  const headers = new Headers({ "cache-control": "no-store" });
  if (refusal.retryAfter !== undefined) headers.set("retry-after", String(refusal.retryAfter));
  return Response.json(
    { ok: false, reason: refusal.reason, error: CHAT_REFUSAL_MESSAGES[refusal.reason] },
    { status: refusal.status, headers },
  );
}

/** One line per refusal. Never message text or tokens. */
export function logChatOutcome(ip: string, outcome: string) {
  console.info(`[chat] ${JSON.stringify({ ip, at: new Date().toISOString(), outcome })}`);
}

/** Redis keys. Kept apart from the voice demo's `vd:` keys. */
export const chatKeys = {
  block: (ip: string) => `chat:block:${ip}`,
  strikes: (ip: string) => `chat:strikes:${ip}`,
  sessions: (ip: string) => `chat:sessions:${ip}`,
  minute: (ip: string) => `chat:minute:${ip}`,
  hour: (ip: string) => `chat:hour:${ip}`,
  day: (ip: string) => `chat:day:${ip}`,
  budget: (date: string) => `chat:budget:${date}`,
};

/** Counts a strike against the IP and blocks it once it has too many. */
async function strike(store: VoiceDemoStore, ip: string, limits: ChatLimits) {
  const strikes = await store.incrBy(chatKeys.strikes(ip), 1, limits.blockSeconds);
  if (strikes >= limits.strikesBeforeBlock) {
    await store.set(chatKeys.block(ip), "1", limits.blockSeconds);
    await store.del(chatKeys.strikes(ip));
  }
}

async function blocked(store: VoiceDemoStore, ip: string): Promise<ChatRefusal | null> {
  if (!(await store.getString(chatKeys.block(ip)))) return null;
  return refuse(429, "blocked", await store.ttl(chatKeys.block(ip)));
}

/**
 * Decides whether a visitor may open a chat session. `verifyHuman` runs the
 * Turnstile check and is only called once the cheaper checks pass.
 */
export async function startChatSession(
  store: VoiceDemoStore,
  ip: string,
  limits: ChatLimits,
  verifyHuman: () => Promise<boolean>,
): Promise<GuardResult> {
  const block = await blocked(store, ip);
  if (block) return block;

  if ((await store.getNumber(chatKeys.sessions(ip))) >= limits.sessionsPerHour) {
    await strike(store, ip, limits);
    return refuse(429, "sessions", await store.ttl(chatKeys.sessions(ip)));
  }

  if (!(await verifyHuman())) {
    await strike(store, ip, limits);
    return refuse(403, "turnstile");
  }

  await store.incrBy(chatKeys.sessions(ip), 1, HOUR);
  return { ok: true };
}

/**
 * Decides whether one more message may go to the model. Counters go up first
 * and are checked after, so parallel requests can't slip past a limit together.
 */
export async function allowChatMessage(
  store: VoiceDemoStore,
  ip: string,
  limits: ChatLimits,
  nowMs: number,
): Promise<GuardResult> {
  const block = await blocked(store, ip);
  if (block) return block;

  const minute = await store.incrBy(chatKeys.minute(ip), 1, MINUTE);
  if (minute > limits.perMinute) {
    return refuse(429, "rate_minute", await store.ttl(chatKeys.minute(ip)));
  }

  const hour = await store.incrBy(chatKeys.hour(ip), 1, HOUR);
  if (hour > limits.perHour) {
    await strike(store, ip, limits);
    return refuse(429, "rate_hour", await store.ttl(chatKeys.hour(ip)));
  }

  const day = await store.incrBy(chatKeys.day(ip), 1, DAY);
  if (day > limits.perDay) {
    await strike(store, ip, limits);
    return refuse(429, "rate_day", await store.ttl(chatKeys.day(ip)));
  }

  // Site-wide cap, reset at midnight Pacific like the voice demo's budget.
  const used = await store.incrBy(chatKeys.budget(pacificDate(nowMs)), 1, 2 * DAY);
  if (used > limits.dailyMessages) {
    return refuse(503, "budget", secondsUntilPacificMidnight(nowMs));
  }

  return { ok: true };
}
