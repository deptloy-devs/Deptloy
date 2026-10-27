import type { Redis } from "@upstash/redis";

/**
 * The few counter operations the gatekeeper needs. Upstash Redis in
 * production; the in-memory version is for tests and local dev.
 */
export interface VoiceDemoStore {
  /** Numeric value of a counter, or 0 when missing. */
  getNumber(key: string): Promise<number>;
  getString(key: string): Promise<string | null>;
  /** Seconds left before the key expires, or 0 when it's missing. */
  ttl(key: string): Promise<number>;
  /** Adds `by` and returns the new value. The expiry is set only when the key is new. */
  incrBy(key: string, by: number, ttlSeconds: number): Promise<number>;
  set(key: string, value: string, ttlSeconds: number): Promise<void>;
  /** Sets the key only if it doesn't exist. Returns false when it already did. */
  setIfAbsent(key: string, value: string, ttlSeconds: number): Promise<boolean>;
  del(key: string): Promise<void>;
  /** Adds a member that counts until `expiresAtMs`, drops expired ones, and returns how many are left. */
  addLive(key: string, member: string, expiresAtMs: number, nowMs: number): Promise<number>;
  removeLive(key: string, member: string): Promise<void>;
}

export function createUpstashStore(redis: Redis): VoiceDemoStore {
  return {
    async getNumber(key) {
      const value = await redis.get<number | string>(key);
      return value == null ? 0 : Number(value) || 0;
    },
    async getString(key) {
      const value = await redis.get<string | number>(key);
      return value == null ? null : String(value);
    },
    async ttl(key) {
      return Math.max(0, await redis.ttl(key));
    },
    async incrBy(key, by, ttlSeconds) {
      const [value] = await redis.pipeline().incrby(key, by).expire(key, ttlSeconds, "NX").exec<[number, number]>();
      return value;
    },
    async set(key, value, ttlSeconds) {
      await redis.set(key, value, { ex: ttlSeconds });
    },
    async setIfAbsent(key, value, ttlSeconds) {
      return (await redis.set(key, value, { nx: true, ex: ttlSeconds })) === "OK";
    },
    async del(key) {
      await redis.del(key);
    },
    async addLive(key, member, expiresAtMs, nowMs) {
      const [, , count] = await redis
        .pipeline()
        .zremrangebyscore(key, "-inf", nowMs)
        .zadd(key, { score: expiresAtMs, member })
        .zcard(key)
        .expire(key, 24 * 3600)
        .exec<[number, number, number, number]>();
      return count;
    },
    async removeLive(key, member) {
      await redis.zrem(key, member);
    },
  };
}

/** In-process store. Fine for tests and `next dev`; useless across serverless instances. */
export function createMemoryStore(now: () => number = Date.now): VoiceDemoStore {
  const values = new Map<string, { value: string; expiresAt: number }>();
  const live = new Map<string, Map<string, number>>();

  const read = (key: string) => {
    const entry = values.get(key);
    if (entry && entry.expiresAt <= now()) {
      values.delete(key);
      return undefined;
    }
    return entry;
  };

  return {
    async getNumber(key) {
      return Number(read(key)?.value ?? 0);
    },
    async getString(key) {
      return read(key)?.value ?? null;
    },
    async ttl(key) {
      const entry = read(key);
      return entry ? Math.ceil((entry.expiresAt - now()) / 1000) : 0;
    },
    async incrBy(key, by, ttlSeconds) {
      const entry = read(key);
      const value = Number(entry?.value ?? 0) + by;
      values.set(key, { value: String(value), expiresAt: entry?.expiresAt ?? now() + ttlSeconds * 1000 });
      return value;
    },
    async set(key, value, ttlSeconds) {
      values.set(key, { value, expiresAt: now() + ttlSeconds * 1000 });
    },
    async setIfAbsent(key, value, ttlSeconds) {
      if (read(key)) return false;
      values.set(key, { value, expiresAt: now() + ttlSeconds * 1000 });
      return true;
    },
    async del(key) {
      values.delete(key);
    },
    async addLive(key, member, expiresAtMs, nowMs) {
      const members = live.get(key) ?? new Map<string, number>();
      for (const [m, expiry] of members) if (expiry <= nowMs) members.delete(m);
      members.set(member, expiresAtMs);
      live.set(key, members);
      return members.size;
    },
    async removeLive(key, member) {
      live.get(key)?.delete(member);
    },
  };
}
