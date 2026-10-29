/** Pure call logic for the voice demo: the clock and the live transcript. */

/** End this long before the token expires, so the call ends on our terms. */
const END_MARGIN_SECONDS = 2;
const WRAP_UP_AT_SECONDS = 20;
const MAX_TRANSCRIPT_LINES = 20;

export type ClockInput = {
  startedAt: number;
  now: number;
  maxCallSeconds: number;
  silenceSeconds: number;
  /** Last time either side made sound. */
  lastActivityAt: number;
  wrapUpSent: boolean;
};

export type ClockAction = "none" | "wrap_up" | "end_time" | "end_silence";

export function checkCallClock(input: ClockInput): { remaining: number; action: ClockAction } {
  const endAt = input.startedAt + (input.maxCallSeconds - END_MARGIN_SECONDS) * 1000;
  const remaining = Math.max(0, Math.ceil((endAt - input.now) / 1000));

  if (input.now >= endAt) return { remaining: 0, action: "end_time" };
  if (input.now - input.lastActivityAt >= input.silenceSeconds * 1000) return { remaining, action: "end_silence" };
  if (!input.wrapUpSent && remaining <= WRAP_UP_AT_SECONDS) return { remaining, action: "wrap_up" };
  return { remaining, action: "none" };
}

export type TranscriptLine = { id: number; role: "agent" | "caller"; text: string };

/**
 * Transcripts arrive in small pieces; join pieces from the same speaker into one line.
 * `newTurn` starts a fresh line even when the same speaker talks again (e.g. after a tool call).
 */
export function addTranscript(
  lines: TranscriptLine[],
  role: TranscriptLine["role"],
  text: string,
  { newTurn = false }: { newTurn?: boolean } = {},
): TranscriptLine[] {
  if (!text) return lines;
  const last = lines.at(-1);
  const next =
    last && last.role === role && !newTurn
      ? [...lines.slice(0, -1), { ...last, text: last.text + text }]
      : [...lines, { id: (last?.id ?? 0) + 1, role, text }];
  return next.slice(-MAX_TRANSCRIPT_LINES);
}

/** 161 -> "2:41" */
export function formatClock(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/** The end of a long caption, cut at a word, so a small speech bubble shows the newest words. */
export function captionTail(text: string, maxChars: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= maxChars) return clean;
  const tail = clean.slice(clean.length - maxChars);
  const firstSpace = tail.indexOf(" ");
  return "…" + (firstSpace >= 0 && firstSpace < 20 ? tail.slice(firstSpace + 1) : tail);
}
