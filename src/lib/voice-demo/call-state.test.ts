import { describe, expect, it } from "vitest";
import {
  addTranscript,
  captionTail,
  checkCallClock,
  formatClock,
  nextSpeechGate,
  QUIET_GATE,
  type TranscriptLine,
} from "./call-state";

describe("checkCallClock", () => {
  const base = { startedAt: 0, maxCallSeconds: 180, silenceSeconds: 20, wrapUpSent: false };

  it("counts down and keeps a 2 second margin before the token expires", () => {
    expect(checkCallClock({ ...base, now: 10_000, lastActivityAt: 10_000 })).toEqual({ remaining: 168, action: "none" });
  });

  it("asks the receptionist to wrap up 20 seconds before the end, once", () => {
    const at = 158_000;
    expect(checkCallClock({ ...base, now: at, lastActivityAt: at }).action).toBe("wrap_up");
    expect(checkCallClock({ ...base, now: at, lastActivityAt: at, wrapUpSent: true }).action).toBe("none");
  });

  it("ends the call at the time limit", () => {
    expect(checkCallClock({ ...base, now: 178_000, lastActivityAt: 178_000 })).toEqual({ remaining: 0, action: "end_time" });
  });

  it("ends the call after the silence timeout", () => {
    expect(checkCallClock({ ...base, now: 50_000, lastActivityAt: 29_000 }).action).toBe("end_silence");
    expect(checkCallClock({ ...base, now: 50_000, lastActivityAt: 31_000 }).action).toBe("none");
  });
});

describe("addTranscript", () => {
  it("joins pieces from the same speaker into one line", () => {
    let lines: TranscriptLine[] = [];
    lines = addTranscript(lines, "agent", "Hello! ");
    lines = addTranscript(lines, "agent", "How can I help?");
    expect(lines).toEqual([{ id: 1, role: "agent", text: "Hello! How can I help?" }]);
  });

  it("starts a new line for a new turn by the same speaker", () => {
    let lines = addTranscript([], "agent", "Let me send that.");
    lines = addTranscript(lines, "agent", "Done!", { newTurn: true });
    expect(lines.map((l) => l.text)).toEqual(["Let me send that.", "Done!"]);
  });

  it("starts a new line when the other side speaks", () => {
    let lines = addTranscript([], "agent", "Hi.");
    lines = addTranscript(lines, "caller", "Book me in");
    lines = addTranscript(lines, "agent", "Sure.");
    expect(lines.map((l) => [l.role, l.text])).toEqual([
      ["agent", "Hi."],
      ["caller", "Book me in"],
      ["agent", "Sure."],
    ]);
  });

  it("ignores empty pieces and keeps only the latest lines", () => {
    let lines: TranscriptLine[] = [];
    expect(addTranscript(lines, "agent", "")).toBe(lines);
    for (let i = 0; i < 30; i++) lines = addTranscript(lines, i % 2 ? "agent" : "caller", `line ${i}`);
    expect(lines).toHaveLength(20);
    expect(lines.at(-1)?.text).toBe("line 29");
  });
});

describe("formatClock", () => {
  it("shows minutes and seconds", () => {
    expect(formatClock(161)).toBe("2:41");
    expect(formatClock(9)).toBe("0:09");
    expect(formatClock(-3)).toBe("0:00");
  });
});

describe("captionTail", () => {
  it("keeps short captions and trims long ones to the newest words", () => {
    expect(captionTail("  Hi   there ", 20)).toBe("Hi there");
    // The last 30 characters start mid-word ("tom software…"), so the cut moves to the next word.
    expect(captionTail("We build AI receptionists and custom software for growing teams", 30)).toBe(
      "…software for growing teams",
    );
  });
});

describe("nextSpeechGate", () => {
  const opts = { speechLevel: 0.02, quietMs: 800 };

  it("does nothing while the caller has not spoken", () => {
    expect(nextSpeechGate(QUIET_GATE, 0.005, 1_000, opts)).toEqual({ gate: QUIET_GATE, streamEnd: false });
  });

  it("ends the audio stream once the caller has been quiet long enough after talking", () => {
    let { gate } = nextSpeechGate(QUIET_GATE, 0.2, 1_000, opts);
    let step = nextSpeechGate(gate, 0.004, 1_500, opts);
    expect(step.streamEnd).toBe(false);
    step = nextSpeechGate(step.gate, 0.004, 1_800, opts);
    expect(step.streamEnd).toBe(true);
    gate = step.gate;
    // Only once per stretch of speech.
    expect(nextSpeechGate(gate, 0.004, 3_000, opts).streamEnd).toBe(false);
  });

  it("keeps waiting through short pauses between words", () => {
    let { gate } = nextSpeechGate(QUIET_GATE, 0.2, 1_000, opts);
    gate = nextSpeechGate(gate, 0.004, 1_500, opts).gate;
    gate = nextSpeechGate(gate, 0.15, 1_600, opts).gate;
    expect(nextSpeechGate(gate, 0.004, 2_300, opts).streamEnd).toBe(false);
    expect(nextSpeechGate(gate, 0.004, 2_400, opts).streamEnd).toBe(true);
  });
});
