const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type VerifyInput = {
  secret: string;
  token: string;
  ip: string;
  fetchImpl?: typeof fetch;
};

/** Asks Cloudflare whether the Turnstile token is real. Any failure counts as "no". */
export async function verifyTurnstile({ secret, token, ip, fetchImpl = fetch }: VerifyInput): Promise<boolean> {
  const body: Record<string, string> = { secret, response: token };
  if (ip !== "local" && ip !== "unknown") body.remoteip = ip;

  try {
    const res = await fetchImpl(SITEVERIFY_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return false;
    const result = (await res.json()) as { success?: unknown };
    return result.success === true;
  } catch {
    return false;
  }
}
