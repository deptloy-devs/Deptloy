import { logChatOutcome, readChatLimits, refusalResponse, refuse, startChatSession } from "@/lib/chat/guard";
import {
  chatSessionsConfigured,
  getChatStore,
  getClientIp,
  signChatSessionToken,
  verifyTurnstileToken,
} from "@/lib/chat/session";
import type { ChatSessionResponse } from "@/lib/chat/types";
import { isAllowedOrigin, readVoiceDemoConfig } from "@/lib/voice-demo/config";

/** Runs the human check (Turnstile) and hands out a 1-hour chat session token. */
export async function POST(req: Request): Promise<Response> {
  const ip = getClientIp(req.headers);

  if (!isAllowedOrigin(req.headers.get("origin"), readVoiceDemoConfig())) {
    logChatOutcome(ip, "origin");
    return refusalResponse(refuse(403, "origin"));
  }
  if (!chatSessionsConfigured()) return refusalResponse(refuse(503, "not_configured"));

  const body = (await req.json().catch(() => ({}))) as { turnstileToken?: unknown };
  const turnstileToken = typeof body.turnstileToken === "string" ? body.turnstileToken : "";

  const result = await startChatSession(getChatStore(), ip, readChatLimits(), () =>
    verifyTurnstileToken(turnstileToken, ip),
  );
  if (!result.ok) {
    logChatOutcome(ip, result.reason);
    return refusalResponse(result);
  }

  const { token, expiresAt } = signChatSessionToken(ip);
  return Response.json({ ok: true, sessionToken: token, expiresAt } satisfies ChatSessionResponse, {
    headers: { "cache-control": "no-store" },
  });
}
