type Env = Record<string, string | undefined>;

/**
 * The caller's IP. On Vercel we read only the headers Vercel itself sets
 * (it overwrites anything the client sends). Anywhere else we trust no
 * header, so local dev shares one "local" bucket.
 */
export function getClientIp(headers: Headers, env: Env = process.env): string {
  if (env.VERCEL !== "1") return "local";
  const ip = headers.get("x-real-ip")?.trim() || headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim();
  return ip || "unknown";
}
