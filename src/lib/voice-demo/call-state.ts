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

/** Transcripts arrive in small pieces; join pieces from the same speaker into one line. */
export function addTranscript(lines: TranscriptLine[], role: TranscriptLine["role"], text: string): TranscriptLine[] {
  if (!text) return lines;
  const last = lines.at(-1);
  const next =
    last && last.role === role
      ? [...lines.slice(0, -1), { ...last, text: last.text + text }]
      : [...lines, { id: (last?.id ?? 0) + 1, role, text }];
  return next.slice(-MAX_TRANSCRIPT_LINES);
}
