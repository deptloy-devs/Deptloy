import { describe, expect, it } from "vitest";
import { addTranscript, checkCallClock, type TranscriptLine } from "./call-state";

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
