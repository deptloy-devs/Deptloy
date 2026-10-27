import { Redis } from "@upstash/redis";
import type { VoiceDemoConfig } from "./config";
import type { GateDeps } from "./gatekeeper";
import { createGeminiLiveToken } from "./gemini-token";
import { createMemoryStore, createUpstashStore, type VoiceDemoStore } from "./store";
import { verifyTurnstile } from "./turnstile";

let upstash: VoiceDemoStore | undefined;
const devGlobal = globalThis as typeof globalThis & { __voiceDemoDevStore?: VoiceDemoStore };

/**
 * Upstash in production. In `next dev` without Redis, an in-memory store so
 * the demo can be tried locally. Anywhere else without Redis: none (the route answers 503).
 */
export function getVoiceDemoStore(config: VoiceDemoConfig): VoiceDemoStore | null {
  if (config.redisConfigured) {
    upstash ??= createUpstashStore(Redis.fromEnv());
    return upstash;
  }
  if (process.env.NODE_ENV === "development") {
    devGlobal.__voiceDemoDevStore ??= createMemoryStore();
    return devGlobal.__voiceDemoDevStore;
  }
  return null;
}

export function gateDeps(config: VoiceDemoConfig): GateDeps {
  return {
    config,
    store: getVoiceDemoStore(config),
    verifyHuman: (token, ip) => verifyTurnstile({ secret: config.turnstileSecret ?? "", token, ip }),
    createToken: ({ industry, serviceId, expiresAt }) =>
      createGeminiLiveToken({
        apiKey: config.geminiApiKey ?? "",
        model: config.model,
        industry,
        serviceId,
        expiresAt,
        now: Date.now(),
      }),
    now: Date.now,
    newSessionId: () => crypto.randomUUID(),
  };
}
