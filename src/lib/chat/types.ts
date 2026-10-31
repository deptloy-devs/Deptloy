export type ChatAssistantType = "dep" | "receptionist";

export type ChatRole = "user" | "assistant" | "system";

export interface ChatMessagePayload {
  role: "user" | "assistant";
  content: string;
}

export interface ChatApiRequest {
  assistant: ChatAssistantType;
  messages: ChatMessagePayload[];
  sessionToken?: string;
  industryId?: string;
  serviceId?: string;
}

export interface ChatSessionPayload {
  sid: string;
  ip: string;
  iat: number;
  exp: number;
}

export interface ChatSessionResponse {
  ok: boolean;
  sessionToken?: string;
  expiresAt?: number;
  error?: string;
}
