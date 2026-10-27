import { describe, expect, it } from "vitest";
import { isAllowedOrigin, readVoiceDemoConfig } from "./config";

describe("readVoiceDemoConfig", () => {
  it("uses safe defaults when nothing is set", () => {
    const config = readVoiceDemoConfig({});
    expect(config.model).toBe("gemini-3.8-live");
    expect(config.limits).toEqual({
      perHour: 3,
      perDay: 10,
      strikesBeforeBlock: 3,
      blockSeconds: 3600,
      maxCallSeconds: 180,
      silenceSeconds: 20,
      maxConcurrent: 3,
      dailyMinutes: 60,
    });
    expect(config.geminiApiKey).toBeUndefined();
    expect(config.redisConfigured).toBe(false);
  });

  it("reads limits and keys from env", () => {
    const config = readVoiceDemoConfig({
      GEMINI_API_KEY: "g-key",
      GEMINI_LIVE_MODEL: "gemini-other-live",
      TURNSTILE_SECRET_KEY: "t-secret",
      KV_REST_API_URL: "https://redis.example",
      KV_REST_API_TOKEN: "r-token",
      VOICE_DEMO_MAX_PER_HOUR: "5",
      VOICE_DEMO_MAX_PER_DAY: "20",
      VOICE_DEMO_STRIKES_BEFORE_BLOCK: "4",
      VOICE_DEMO_BLOCK_SECONDS: "600",
      VOICE_DEMO_MAX_CALL_SECONDS: "120",
      VOICE_DEMO_SILENCE_SECONDS: "15",
      VOICE_DEMO_MAX_CONCURRENT: "2",
      VOICE_DEMO_DAILY_MINUTES: "90",
    });
    expect(config.model).toBe("gemini-other-live");
    expect(config.geminiApiKey).toBe("g-key");
    expect(config.turnstileSecret).toBe("t-secret");
    expect(config.redisConfigured).toBe(true);
    expect(config.limits).toEqual({
      perHour: 5,
      perDay: 20,
      strikesBeforeBlock: 4,
      blockSeconds: 600,
      maxCallSeconds: 120,
      silenceSeconds: 15,
      maxConcurrent: 2,
      dailyMinutes: 90,
    });
  });

  it("ignores limits that are not positive whole numbers", () => {
    const config = readVoiceDemoConfig({
      VOICE_DEMO_MAX_PER_HOUR: "abc",
      VOICE_DEMO_MAX_PER_DAY: "-4",
      VOICE_DEMO_MAX_CALL_SECONDS: "0",
      VOICE_DEMO_DAILY_MINUTES: "2.5",
    });
    expect(config.limits.perHour).toBe(3);
    expect(config.limits.perDay).toBe(10);
    expect(config.limits.maxCallSeconds).toBe(180);
    expect(config.limits.dailyMinutes).toBe(60);
  });

  it("accepts Upstash's own env names for Redis", () => {
    const config = readVoiceDemoConfig({
      UPSTASH_REDIS_REST_URL: "https://redis.example",
      UPSTASH_REDIS_REST_TOKEN: "r-token",
    });
    expect(config.redisConfigured).toBe(true);
  });
});

describe("isAllowedOrigin", () => {
  it("allows the production domains by default", () => {
    const config = readVoiceDemoConfig({ NODE_ENV: "production" });
    expect(isAllowedOrigin("https://deptloy.com", config)).toBe(true);
    expect(isAllowedOrigin("https://www.deptloy.com", config)).toBe(true);
  });

  it("rejects other sites, a missing origin and localhost in production", () => {
    const config = readVoiceDemoConfig({ NODE_ENV: "production" });
    expect(isAllowedOrigin("https://evil.example", config)).toBe(false);
    expect(isAllowedOrigin("https://deptloy.com.evil.example", config)).toBe(false);
    expect(isAllowedOrigin(null, config)).toBe(false);
    expect(isAllowedOrigin("http://localhost:3000", config)).toBe(false);
  });

  it("allows this Vercel deployment's own URLs", () => {
    const config = readVoiceDemoConfig({
      NODE_ENV: "production",
      VERCEL_URL: "deptloy-abc123.vercel.app",
      VERCEL_BRANCH_URL: "deptloy-git-voice.vercel.app",
    });
    expect(isAllowedOrigin("https://deptloy-abc123.vercel.app", config)).toBe(true);
    expect(isAllowedOrigin("https://deptloy-git-voice.vercel.app", config)).toBe(true);
    expect(isAllowedOrigin("https://someone-else.vercel.app", config)).toBe(false);
  });

  it("allows localhost on any port in development", () => {
    const config = readVoiceDemoConfig({ NODE_ENV: "development" });
    expect(isAllowedOrigin("http://localhost:3000", config)).toBe(true);
    expect(isAllowedOrigin("http://127.0.0.1:3001", config)).toBe(true);
  });

  it("replaces the default list when VOICE_DEMO_ALLOWED_ORIGINS is set", () => {
    const config = readVoiceDemoConfig({
      NODE_ENV: "production",
      VOICE_DEMO_ALLOWED_ORIGINS: "https://staging.deptloy.com/, https://deptloy.com",
    });
    expect(isAllowedOrigin("https://staging.deptloy.com", config)).toBe(true);
    expect(isAllowedOrigin("https://www.deptloy.com", config)).toBe(false);
  });
});
