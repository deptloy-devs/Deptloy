import { GoogleGenAI } from "@google/genai";
import { allowChatMessage, logChatOutcome, readChatLimits, refusalResponse, refuse } from "@/lib/chat/guard";
import { cleanHistory } from "@/lib/chat/history";
import { buildDepPrompt, buildReceptionistPrompt } from "@/lib/chat/prompts";
import { getChatStore, getClientIp, verifyChatSessionToken } from "@/lib/chat/session";
import type { ChatApiRequest } from "@/lib/chat/types";
import { isAllowedOrigin, readVoiceDemoConfig } from "@/lib/voice-demo/config";

const MODEL_NAME = process.env.GEMINI_CHAT_MODEL || "gemini-3.5-flash-lite";

function isQuotaError(err: unknown): boolean {
  if ((err as { status?: unknown })?.status === 429) return true;
  const message = err instanceof Error ? err.message : String(err);
  return /RESOURCE_EXHAUSTED|ResourceExhausted|quota/i.test(message);
}

/**
 * Streams one chat reply. Order of checks: our own site, a valid session from
 * the human check, a well-formed conversation, then the rate limits.
 */
export async function POST(req: Request): Promise<Response> {
  const ip = getClientIp(req.headers);

  if (!isAllowedOrigin(req.headers.get("origin"), readVoiceDemoConfig())) {
    logChatOutcome(ip, "origin");
    return refusalResponse(refuse(403, "origin"));
  }

  // GEMINI_CHAT_API_KEY keeps chat on its own quota; otherwise share the voice demo's key.
  const apiKey = process.env.GEMINI_CHAT_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("[chat] Neither GEMINI_CHAT_API_KEY nor GEMINI_API_KEY is set.");
    return refusalResponse(refuse(503, "not_configured"));
  }

  let body: ChatApiRequest;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { assistant, sessionToken, industryId, serviceId } = body ?? {};
  if (assistant !== "dep" && assistant !== "receptionist") {
    return Response.json({ error: "Invalid assistant specified" }, { status: 400 });
  }

  if (!verifyChatSessionToken(sessionToken, ip)) {
    return refusalResponse(refuse(401, "session"));
  }

  const history = cleanHistory(body.messages);
  if (!history.ok) return Response.json({ error: history.error }, { status: 400 });

  const allowed = await allowChatMessage(getChatStore(), ip, readChatLimits(), Date.now());
  if (!allowed.ok) {
    logChatOutcome(ip, allowed.reason);
    return refusalResponse(allowed);
  }

  const systemInstruction =
    assistant === "dep"
      ? buildDepPrompt()
      : buildReceptionistPrompt(
          typeof industryId === "string" ? industryId : undefined,
          typeof serviceId === "string" ? serviceId : undefined,
        );

  const contents = history.messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  try {
    const ai = new GoogleGenAI({ apiKey });
    const responseStream = await ai.models.generateContentStream({
      model: MODEL_NAME,
      contents,
      config: {
        systemInstruction,
        temperature: assistant === "receptionist" ? 0.6 : 0.7,
        maxOutputTokens: 900,
      },
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of responseStream) {
            const text = chunk.text;
            if (text) controller.enqueue(encoder.encode(text));
          }
          controller.close();
        } catch (streamErr) {
          console.error("[chat] Stream error:", streamErr);
          controller.error(streamErr);
        }
      },
    });

    return new Response(readable, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err: unknown) {
    console.error("[chat] Gemini error:", err);
    if (isQuotaError(err)) {
      logChatOutcome(ip, "busy");
      return refusalResponse(refuse(503, "busy", 30));
    }
    return refusalResponse(refuse(500, "failed"));
  }
}
