import { GoogleGenAI, Modality, Type, type FunctionDeclaration, type LiveConnectConstraints } from "@google/genai";
import type { VoiceAgent } from "./agents";
import { buildDepInstruction, buildSystemInstruction, DEP_PERSONA, RECEPTIONIST_PERSONAS } from "./prompts";

/** The SDK supports ephemeral tokens on v1alpha only. */
const API_VERSION = "v1alpha";
/** The browser has this long to open the call after getting the token. */
const START_WINDOW_MS = 60_000;

/** The /demo receptionists' tools. Answered in the browser with sample data. */
const RECEPTIONIST_TOOLS: FunctionDeclaration[] = [
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

/**
 * Dep's tools. The browser forwards book_discovery_call to /api/voice-demo/book, which emails
 * the team, and answers show_email_box itself by showing the email box.
 */
const DEP_TOOLS: FunctionDeclaration[] = [
  {
    name: "book_discovery_call",
    description:
      "Sends the visitor's discovery call request to the Deptloy team, who email them to confirm a time. Call only after reading the details back and getting a yes. Call at most once.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING, description: "The visitor's full name." },
        email: { type: Type.STRING, description: "The visitor's email exactly as confirmed, e.g. ana.ruiz@example.com." },
        topic: { type: Type.STRING, description: "What they want to build or fix, in one or two sentences." },
        preferred_time: {
          type: Type.STRING,
          description: "Preferred day and time with time zone, as the visitor said it, e.g. Tuesday afternoon, Eastern time.",
        },
        company: { type: Type.STRING, description: "Their company or business name, if they gave one." },
      },
      required: ["name", "email", "topic", "preferred_time"],
    },
  },
  {
    name: "show_email_box",
    description:
      "Shows a box on the page where the visitor can type their email instead of spelling it. Call it right before asking for their email.",
  },
];

type TokenRequest = {
  apiKey: string;
  model: string;
  agent: VoiceAgent;
  expiresAt: Date;
  now: number;
};

function agentSetup(agent: VoiceAgent, maxCallSeconds: number) {
  if (agent.kind === "dep") {
    return { instruction: buildDepInstruction(maxCallSeconds), tools: DEP_TOOLS, voice: DEP_PERSONA.voice };
  }
  return {
    instruction: buildSystemInstruction(agent.industry, agent.serviceId, maxCallSeconds),
    tools: RECEPTIONIST_TOOLS,
    voice: RECEPTIONIST_PERSONAS[agent.industry].voice,
  };
}

function liveConstraints(model: string, agent: VoiceAgent, maxCallSeconds: number) {
  const { instruction, tools, voice } = agentSetup(agent, maxCallSeconds);
  return {
    model,
    config: {
      responseModalities: [Modality.AUDIO],
      systemInstruction: instruction,
      tools: [{ functionDeclarations: tools }],
      speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } } },
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
      liveConnectConstraints: liveConstraints(req.model, req.agent, maxCallSeconds),
      // No lockAdditionalFields: with no field mask, Gemini takes the whole call setup from this
      // token and ignores the browser's, so nothing can be changed. (An empty list makes the SDK
      // send a field mask with "tools.0" in it, which Gemini rejects.)
      httpOptions: { apiVersion: API_VERSION },
    },
  });
  if (!token.name) throw new Error("Gemini returned no token");
  return token.name;
}
