import type { ChatMessagePayload } from "./types";

export const MAX_MESSAGE_LENGTH = 1500;
export const MAX_CONVERSATION_MESSAGES = 24;
/** Caps how much text one request can send to the model, whatever the message count. */
export const MAX_HISTORY_CHARACTERS = 12_000;

export type HistoryResult =
  | { ok: true; messages: ChatMessagePayload[] }
  | { ok: false; error: string };

/**
 * Checks the conversation the browser sent and trims it to what we pass to the model:
 * the most recent messages, within the size caps, ending with the visitor's message.
 */
export function cleanHistory(raw: unknown): HistoryResult {
  if (!Array.isArray(raw) || raw.length === 0) return { ok: false, error: "Messages array cannot be empty" };

  const messages: ChatMessagePayload[] = [];
  for (const item of raw.slice(-MAX_CONVERSATION_MESSAGES)) {
    const { role, content } = (item ?? {}) as Record<string, unknown>;
    if (role !== "user" && role !== "assistant") return { ok: false, error: "Invalid message role" };
    if (typeof content !== "string" || !content.trim()) return { ok: false, error: "Invalid message content" };
    if (content.length > MAX_MESSAGE_LENGTH) {
      return { ok: false, error: `Message is too long (maximum ${MAX_MESSAGE_LENGTH} characters)` };
    }
    messages.push({ role, content });
  }

  if (messages[messages.length - 1].role !== "user") {
    return { ok: false, error: "The last message must be the visitor's" };
  }

  // Drop the oldest messages until the whole history fits.
  let total = messages.reduce((sum, m) => sum + m.content.length, 0);
  while (total > MAX_HISTORY_CHARACTERS && messages.length > 1) {
    total -= messages.shift()!.content.length;
  }

  return { ok: true, messages };
}
