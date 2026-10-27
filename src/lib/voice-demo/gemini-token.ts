import { GoogleGenAI, Modality, Type, type FunctionDeclaration, type LiveConnectConstraints } from "@google/genai";
import type { DemoIndustryId } from "@/types";
import { buildSystemInstruction, RECEPTIONIST_PERSONAS } from "./prompts";

/** The SDK supports ephemeral tokens on v1alpha only. */
const API_VERSION = "v1alpha";
/** The browser has this long to open the call after getting the token. */
const START_WINDOW_MS = 60_000;

const TOOLS: FunctionDeclaration[] = [
  {
    name: "check_availability",
    description: "Lists open appointment times for a day. Call this before offering times.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        date: { type: Type.STRING, description: "The day the caller wants, e.g. 'Friday' or '2026-11-03'." },
      },
      required: ["date"],
    },
  },
  {
    name: "book_appointment",
    description: "Books a sample appointment after the caller confirms the details. Returns a booking reference.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        customer_name: { type: Type.STRING, description: "The caller's first name." },
        date: { type: Type.STRING, description: "The day, as used with check_availability." },
        time: { type: Type.STRING, description: "One of the open times, e.g. '10:30 AM'." },
        service: { type: Type.STRING, description: "Service name, if different from the one the caller picked." },
      },
      required: ["customer_name", "date", "time"],
    },
  },
];

type TokenRequest = {
  apiKey: string;
  model: string;
  industry: DemoIndustryId;
  serviceId: string;
  expiresAt: Date;
  now: number;
};

function liveConstraints(model: string, industry: DemoIndustryId, serviceId: string, maxCallSeconds: number) {
  return {
    model,
    config: {
      responseModalities: [Modality.AUDIO],
      systemInstruction: buildSystemInstruction(industry, serviceId, maxCallSeconds),
      tools: [{ functionDeclarations: TOOLS }],
      speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: RECEPTIONIST_PERSONAS[industry].voice } } },
      inputAudioTranscription: {},
      outputAudioTranscription: {},
    },
  } satisfies LiveConnectConstraints;
}

/**
 * A single-use Gemini Live token. The prompt, voice, tools and model are
 * locked into it, and Gemini rejects the call once `expiresAt` passes.
 */
export async function createGeminiLiveToken(req: TokenRequest): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: req.apiKey, httpOptions: { apiVersion: API_VERSION } });
  const maxCallSeconds = Math.round((req.expiresAt.getTime() - req.now) / 1000);

  const token = await ai.authTokens.create({
    config: {
      uses: 1,
      expireTime: req.expiresAt.toISOString(),
      newSessionExpireTime: new Date(req.now + START_WINDOW_MS).toISOString(),
      liveConnectConstraints: liveConstraints(req.model, req.industry, req.serviceId, maxCallSeconds),
      // Empty list: lock every field set above, so the browser can't change them.
      lockAdditionalFields: [],
      httpOptions: { apiVersion: API_VERSION },
    },
  });
  if (!token.name) throw new Error("Gemini returned no token");
  return token.name;
}
