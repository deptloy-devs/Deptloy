import { getClientIp, signChatSessionToken, verifyTurnstileToken } from "@/lib/chat/session";
import type { ChatSessionResponse } from "@/lib/chat/types";

export async function POST(req: Request): Promise<Response> {
  const ip = getClientIp(req.headers);

  let body: { turnstileToken?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json(
      { ok: false, error: "Invalid JSON body" } satisfies ChatSessionResponse,
      { status: 400, headers: { "cache-control": "no-store" } }
    );
  }

  const { turnstileToken } = body;

  // Verify turnstile token
  const isTurnstileValid = await verifyTurnstileToken(turnstileToken || "", ip);
  if (!isTurnstileValid) {
    return Response.json(
      { ok: false, error: "Security verification challenge failed" } satisfies ChatSessionResponse,
      { status: 403, headers: { "cache-control": "no-store" } }
    );
  }

  // Issue 1-hour signed session token
  const { token, expiresAt } = signChatSessionToken(ip);

  return Response.json(
    {
      ok: true,
      sessionToken: token,
      expiresAt,
    } satisfies ChatSessionResponse,
    { status: 200, headers: { "cache-control": "no-store" } }
  );
}
