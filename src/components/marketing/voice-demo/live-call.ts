import type { FunctionCall, LiveServerMessage, Session } from "@google/genai";
import { base64ToFloat32, downsampleToPcm16, pcm16ToBase64, rmsLevel } from "@/lib/voice-demo/audio";
import { addTranscript, checkCallClock, type TranscriptLine } from "@/lib/voice-demo/call-state";
import type { IssuedSession } from "@/lib/voice-demo/gatekeeper";
import { CALL_CONNECTED_NOTE, WRAP_UP_NOTE } from "@/lib/voice-demo/prompts";
import type { ToolCall, ToolResult } from "@/lib/voice-demo/tools";

export type CallStatus = "connecting" | "listening" | "speaking" | "ended" | "error";
export type EndReason = "hangup" | "time" | "silence" | "dropped" | "error";

export type LiveCallEvents = {
  onStatus(status: CallStatus): void;
  onTranscript(lines: TranscriptLine[]): void;
  onRemaining(seconds: number): void;
  onEnd(reason: EndReason): void;
};

/** Answers the agent's tool calls: sample data on /demo, a real request to the team for Dep. */
export type ToolHandler = (call: ToolCall, session: { sessionId: string }) => Promise<ToolResult> | ToolResult;

/** What Dep reads every frame for lip sync. */
export type VoiceLevels = {
  agent(): number;
  caller(): number;
  /** The agent's sound by frequency (dB per bin), for mouth shapes. */
  agentSpectrum(): { db: Float32Array; sampleRate: number } | null;
};

/**
 * Audio set up by the click handler. Safari only lets audio start inside a
 * user gesture, so the contexts are created there, before any await.
 */
export type CallAudio = { mic: MediaStream; micContext: AudioContext; speakerContext: AudioContext };

const INPUT_MIME = "audio/pcm;rate=16000";
const OUTPUT_RATE = 24000;
/** Mic loudness that counts as the caller talking (for the silence timeout and Dep's listening look). */
const SPEECH_LEVEL = 0.02;
const TICK_MS = 250;

/**
 * One voice call: mic in, Gemini Live over a WebSocket, receptionist audio out.
 * Not a React component, so audio work never waits on renders.
 */
export class LiveCall {
  private session: Session | null = null;
  private micAnalyser: AnalyserNode | null = null;
  private speakerAnalyser: AnalyserNode | null = null;
  private playing = new Set<AudioBufferSourceNode>();
  private playAt = 0;
  private transcript: TranscriptLine[] = [];
  private timer: ReturnType<typeof setInterval> | null = null;
  private startedAt = 0;
  private lastActivityAt = 0;
  private wrapUpSent = false;
  /** The agent finished a turn, so its next words start a new transcript line. */
  private agentTurnDone = false;
  private muted = false;
  private ended = false;
  private status: CallStatus = "connecting";
  private frame = new Float32Array(1024);
  private spectrum: Float32Array<ArrayBuffer> | null = null;

  constructor(
    private readonly issued: IssuedSession,
    private readonly audio: CallAudio,
    private readonly events: LiveCallEvents,
    private readonly handleTool: ToolHandler,
  ) {}

  readonly levels: VoiceLevels = {
    agent: () => this.level(this.speakerAnalyser),
    caller: () => (this.muted ? 0 : this.level(this.micAnalyser)),
    agentSpectrum: () => {
      const analyser = this.speakerAnalyser;
      if (!analyser || this.ended) return null;
      this.spectrum ??= new Float32Array(analyser.frequencyBinCount);
      analyser.getFloatFrequencyData(this.spectrum);
      return { db: this.spectrum, sampleRate: this.audio.speakerContext.sampleRate };
    },
  };

  async start(): Promise<void> {
    this.setStatus("connecting");
    try {
      this.setUpSpeaker();
      const { GoogleGenAI, Modality } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey: this.issued.token, httpOptions: { apiVersion: "v1alpha" } });
      const session = await ai.live.connect({
        model: this.issued.model,
        config: { responseModalities: [Modality.AUDIO] },
        callbacks: {
          onmessage: (msg) => this.handleMessage(msg),
          onerror: () => this.end("error"),
          onclose: () => this.end(this.ended ? "hangup" : "dropped"),
        },
      });
      if (this.ended) {
        session.close();
        return;
      }
      this.session = session;
      await this.setUpMic();

      this.startedAt = Date.now();
      this.lastActivityAt = this.startedAt;
      this.setStatus("listening");
      session.sendClientContent({ turns: CALL_CONNECTED_NOTE, turnComplete: true });
      this.timer = setInterval(() => this.tick(), TICK_MS);
    } catch {
      this.end("error");
    }
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    if (muted) this.session?.sendRealtimeInput({ audioStreamEnd: true });
  }

  /** Ends the call once; safe to call any number of times. */
  end(reason: EndReason) {
    if (this.ended) return;
    this.ended = true;
    if (this.timer) clearInterval(this.timer);
    try {
      this.session?.close();
    } catch {
      // Already closed.
    }
    this.audio.mic.getTracks().forEach((t) => t.stop());
    void this.audio.micContext.close().catch(() => {});
    void this.audio.speakerContext.close().catch(() => {});
    this.playing.clear();

    // Frees our slot and line on the server right away. keepalive lets it finish during page unload.
    void fetch("/api/voice-demo/session/end", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ sessionId: this.issued.sessionId }),
      keepalive: true,
    }).catch(() => {});

    this.setStatus(reason === "error" ? "error" : "ended");
    this.events.onEnd(reason);
  }

  private setUpSpeaker() {
    const ctx = this.audio.speakerContext;
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 1024;
    // Light smoothing so the mouth follows each sound, not an average of the last few.
    analyser.smoothingTimeConstant = 0.3;
    analyser.connect(ctx.destination);
    this.speakerAnalyser = analyser;
  }

  private async setUpMic() {
    const ctx = this.audio.micContext;
    await ctx.audioWorklet.addModule("/voice-demo/mic-capture.worklet.js");
    const source = ctx.createMediaStreamSource(this.audio.mic);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 1024;
    const capture = new AudioWorkletNode(ctx, "mic-capture");
    capture.port.onmessage = (e: MessageEvent<Float32Array>) => this.sendMic(e.data, ctx.sampleRate);
    source.connect(analyser);
    source.connect(capture);
    // The worklet outputs silence; connecting it keeps the browser running it.
    capture.connect(ctx.destination);
    this.micAnalyser = analyser;
  }

  private sendMic(samples: Float32Array, sampleRate: number) {
    if (this.ended || this.muted || !this.session) return;
    const pcm = downsampleToPcm16(samples, sampleRate);
    this.session.sendRealtimeInput({ audio: { data: pcm16ToBase64(pcm), mimeType: INPUT_MIME } });
  }

  private handleMessage(msg: LiveServerMessage) {
    if (this.ended) return;
    const content = msg.serverContent;

    if (content?.interrupted) this.stopPlayback();
    for (const part of content?.modelTurn?.parts ?? []) {
      if (part.inlineData?.data) this.play(base64ToFloat32(part.inlineData.data));
    }
    if (content?.inputTranscription?.text) this.addLine("caller", content.inputTranscription.text);
    if (content?.outputTranscription?.text) {
      this.addLine("agent", content.outputTranscription.text, this.agentTurnDone);
      this.agentTurnDone = false;
    }
    if (content?.turnComplete || content?.interrupted) this.agentTurnDone = true;

    if (msg.toolCall?.functionCalls?.length) void this.answerTools(msg.toolCall.functionCalls);
  }

  private async answerTools(calls: FunctionCall[]) {
    this.lastActivityAt = Date.now();
    const functionResponses = await Promise.all(
      calls.map(async (call) => {
        let response: ToolResult;
        try {
          response = await this.handleTool(call, { sessionId: this.issued.sessionId });
        } catch {
          response = { status: "error", message: "That didn't work. Apologise and offer another way." };
        }
        return { id: call.id, name: call.name, response };
      }),
    );
    if (this.ended) return;
    // A slow tool (like sending an email) isn't silence.
    this.lastActivityAt = Date.now();
    this.session?.sendToolResponse({ functionResponses });
  }

  private addLine(role: TranscriptLine["role"], text: string, newTurn = false) {
    this.transcript = addTranscript(this.transcript, role, text, { newTurn });
    this.events.onTranscript(this.transcript);
  }

  private play(samples: Float32Array) {
    const ctx = this.audio.speakerContext;
    if (!ctx || !this.speakerAnalyser || samples.length === 0) return;
    const buffer = ctx.createBuffer(1, samples.length, OUTPUT_RATE);
    buffer.copyToChannel(samples as Float32Array<ArrayBuffer>, 0);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(this.speakerAnalyser);
    const startAt = Math.max(this.playAt, ctx.currentTime + 0.04);
    source.start(startAt);
    this.playAt = startAt + buffer.duration;
    this.playing.add(source);
    source.onended = () => {
      this.playing.delete(source);
      this.refreshStatus();
    };
    this.lastActivityAt = Date.now();
    this.refreshStatus();
  }

  /** The caller talked over the receptionist: drop everything queued. */
  private stopPlayback() {
    for (const source of this.playing) {
      try {
        source.stop();
      } catch {
        // Not started yet.
      }
    }
    this.playing.clear();
    this.playAt = 0;
    this.refreshStatus();
  }

  private tick() {
    if (this.ended) return;
    const now = Date.now();
    if (this.playing.size > 0 || this.levels.caller() > SPEECH_LEVEL) this.lastActivityAt = now;

    const clock = checkCallClock({
      startedAt: this.startedAt,
      now,
      maxCallSeconds: this.issued.maxCallSeconds,
      silenceSeconds: this.issued.silenceSeconds,
      lastActivityAt: this.lastActivityAt,
      wrapUpSent: this.wrapUpSent,
    });
    this.events.onRemaining(clock.remaining);

    if (clock.action === "wrap_up") {
      this.wrapUpSent = true;
      this.session?.sendClientContent({ turns: WRAP_UP_NOTE, turnComplete: true });
    } else if (clock.action === "end_time") {
      this.end("time");
    } else if (clock.action === "end_silence") {
      this.end("silence");
    }
  }

  private refreshStatus() {
    if (this.ended || this.status === "connecting") return;
    this.setStatus(this.playing.size > 0 ? "speaking" : "listening");
  }

  private setStatus(status: CallStatus) {
    if (status === this.status && status !== "connecting") return;
    this.status = status;
    this.events.onStatus(status);
  }

  private level(analyser: AnalyserNode | null): number {
    if (!analyser || this.ended) return 0;
    analyser.getFloatTimeDomainData(this.frame);
    return rmsLevel(this.frame);
  }
}
