/**
 * Every limit and key for the live voice demo, in one place.
 * Each limit can be overridden with the env var named next to it.
 */

type Env = Record<string, string | undefined>;

export const DEFAULT_LIVE_MODEL = "gemini-3.8-live";

const DEFAULT_ORIGINS = ["https://deptloy.com", "https://www.deptloy.com"];

const LIMIT_DEFAULTS = {
  /** VOICE_DEMO_MAX_PER_HOUR: call starts per IP per hour. */
  perHour: 3,
  /** VOICE_DEMO_MAX_PER_DAY: call starts per IP per day. */
  perDay: 10,
  /** VOICE_DEMO_STRIKES_BEFORE_BLOCK: limit hits or failed checks before the IP is blocked. */
  strikesBeforeBlock: 3,
  /** VOICE_DEMO_BLOCK_SECONDS: how long a blocked IP waits. */
  blockSeconds: 3600,
  /** VOICE_DEMO_MAX_CALL_SECONDS: hard call length, enforced by the token's expiry. */
  maxCallSeconds: 180,
  /** VOICE_DEMO_SILENCE_SECONDS: the browser hangs up after this much silence. */
  silenceSeconds: 20,
  /** VOICE_DEMO_MAX_CONCURRENT: calls at once across the site (Gemini free tier allows 3). */
  maxConcurrent: 3,
  /** VOICE_DEMO_DAILY_MINUTES: total call minutes per day across the site. */
  dailyMinutes: 60,
};

const LIMIT_ENV: Record<keyof typeof LIMIT_DEFAULTS, string> = {
  perHour: "VOICE_DEMO_MAX_PER_HOUR",
  perDay: "VOICE_DEMO_MAX_PER_DAY",
  strikesBeforeBlock: "VOICE_DEMO_STRIKES_BEFORE_BLOCK",
  blockSeconds: "VOICE_DEMO_BLOCK_SECONDS",
  maxCallSeconds: "VOICE_DEMO_MAX_CALL_SECONDS",
  silenceSeconds: "VOICE_DEMO_SILENCE_SECONDS",
  maxConcurrent: "VOICE_DEMO_MAX_CONCURRENT",
  dailyMinutes: "VOICE_DEMO_DAILY_MINUTES",
};

export type VoiceDemoLimits = typeof LIMIT_DEFAULTS;

export type VoiceDemoConfig = {
  model: string;
  geminiApiKey?: string;
  turnstileSecret?: string;
  redisConfigured: boolean;
  allowedOrigins: string[];
  /** Development only: allow http://localhost and 127.0.0.1 on any port. */
  allowLocalhost: boolean;
  limits: VoiceDemoLimits;
};

function positiveInt(value: string | undefined, fallback: number): number {
  if (!value || !/^\d+$/.test(value.trim())) return fallback;
  const n = Number(value);
  return n > 0 ? n : fallback;
}

function originOf(value: string): string | null {
  try {
    return new URL(value.trim()).origin;
  } catch {
    return null;
  }
}

export function readVoiceDemoConfig(env: Env = process.env): VoiceDemoConfig {
  const limits = { ...LIMIT_DEFAULTS };
  for (const key of Object.keys(LIMIT_DEFAULTS) as (keyof VoiceDemoLimits)[]) {
    limits[key] = positiveInt(env[LIMIT_ENV[key]], LIMIT_DEFAULTS[key]);
  }

  const listed = env.VOICE_DEMO_ALLOWED_ORIGINS?.split(",").filter((s) => s.trim());
  const origins = new Set<string>();
  for (const value of listed?.length ? listed : DEFAULT_ORIGINS) {
    const origin = originOf(value);
    if (origin) origins.add(origin);
  }
  // Vercel sets these to this deployment's own hostnames, so previews work too.
  for (const host of [env.VERCEL_URL, env.VERCEL_BRANCH_URL, env.VERCEL_PROJECT_PRODUCTION_URL]) {
    const origin = host ? originOf(`https://${host}`) : null;
    if (origin) origins.add(origin);
  }

  const redisUrl = env.UPSTASH_REDIS_REST_URL || env.KV_REST_API_URL;
  const redisToken = env.UPSTASH_REDIS_REST_TOKEN || env.KV_REST_API_TOKEN;

  return {
    model: env.GEMINI_LIVE_MODEL?.trim() || DEFAULT_LIVE_MODEL,
    geminiApiKey: env.GEMINI_API_KEY || undefined,
    turnstileSecret: env.TURNSTILE_SECRET_KEY || undefined,
    redisConfigured: Boolean(redisUrl && redisToken),
    allowedOrigins: [...origins],
    allowLocalhost: env.NODE_ENV === "development",
    limits,
  };
}

/** True only for an exact match with one of our own origins. */
export function isAllowedOrigin(origin: string | null, config: VoiceDemoConfig): boolean {
  if (!origin) return false;
  if (config.allowedOrigins.includes(origin)) return true;
  if (!config.allowLocalhost) return false;
  try {
    const url = new URL(origin);
    return url.protocol === "http:" && (url.hostname === "localhost" || url.hostname === "127.0.0.1");
  } catch {
    return false;
  }
}
