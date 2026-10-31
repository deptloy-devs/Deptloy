import { GoogleGenAI } from "@google/genai";
import { buildDepPrompt, buildReceptionistPrompt } from "@/lib/chat/prompts";
import { checkChatRateLimit, getClientIp, verifyChatSessionToken } from "@/lib/chat/session";
import type { ChatApiRequest, ChatMessagePayload } from "@/lib/chat/types";

const MODEL_NAME = process.env.GEMINI_CHAT_MODEL || "gemini-3.5-flash-lite";
const MAX_MESSAGE_LENGTH = 1500;
const MAX_CONVERSATION_MESSAGES = 24;

export async function POST(req: Request): Promise<Response> {
  const ip = getClientIp(req.headers);

  // 1. Parse JSON body
  let body: ChatApiRequest;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { assistant, messages, sessionToken, industryId, serviceId } = body;

  if (!assistant || (assistant !== "dep" && assistant !== "receptionist")) {
    return Response.json({ error: "Invalid assistant specified" }, { status: 400 });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "Messages array cannot be empty" }, { status: 400 });
  }

  // 2. Verify Session Security
  // In development, allow testing if session token is omitted or in test mode
  let sessionId = "anonymous";
  if (sessionToken) {
    const session = verifyChatSessionToken(sessionToken);
    if (!session) {
      return Response.json({ error: "Session expired or invalid. Please refresh the page." }, { status: 401 });
    }
    sessionId = session.sid;
  } else if (process.env.NODE_ENV === "production") {
    return Response.json({ error: "Missing required chat session token" }, { status: 401 });
  }

  // 3. Rate Limiting (per session/IP)
  const rateLimitKey = `${ip}:${sessionId}`;
  const rateCheck = checkChatRateLimit(rateLimitKey, 30, 60_000);
  if (!rateCheck.allowed) {
    return Response.json(
      { error: "Too many messages in a short time. Please slow down and try again shortly." },
      { status: 429, headers: { "Retry-After": "10" } }
    );
  }

  // 4. Validate and Sanitize Conversation History
  const recentMessages: ChatMessagePayload[] = messages.slice(-MAX_CONVERSATION_MESSAGES);
  for (const m of recentMessages) {
    if (!m.content || typeof m.content !== "string") {
      return Response.json({ error: "Invalid message content" }, { status: 400 });
    }
    if (m.content.length > MAX_MESSAGE_LENGTH) {
      return Response.json(
        { error: `Message is too long (maximum ${MAX_MESSAGE_LENGTH} characters)` },
        { status: 400 }
      );
    }
  }

  // 5. Check Server Gemini Chat API Key
  const apiKey = process.env.GEMINI_CHAT_API_KEY;
  if (!apiKey) {
    console.error("[Deptloy Chat] GEMINI_CHAT_API_KEY is not configured.");
    return Response.json(
      { error: "AI Chat is temporarily unconfigured. Please contact support." },
      { status: 503 }
    );
  }

  // 6. Build System Instructions and Conversation Format
  const systemInstruction =
    assistant === "dep"
      ? buildDepPrompt()
      : buildReceptionistPrompt(industryId, serviceId);

  // Map messages to GenAI contents structure
  const contents = recentMessages.map((m) => ({
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
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (streamErr) {
          console.error("[Deptloy Chat] Stream iteration error:", streamErr);
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
    console.error("[Deptloy Chat] Gemini error:", err);
    const errMsg = err instanceof Error ? err.message : String(err);
    if (errMsg.includes("ResourceExhausted") || errMsg.includes("quota")) {
      return Response.json(
        { error: "High traffic: Gemini quota temporarily exceeded. Please try again in a moment." },
        { status: 429 }
      );
    }
    return Response.json(
      { error: "An error occurred while connecting to Deptloy AI. Please try again." },
      { status: 500 }
    );
  }
}
