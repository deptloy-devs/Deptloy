"use client";

import * as React from "react";
import type { TranscriptLine } from "@/lib/voice-demo/call-state";
import type { IssuedSession } from "@/lib/voice-demo/gatekeeper";
import { isRefusalReason, OFFER_BOOKING, REFUSAL_MESSAGES } from "@/lib/voice-demo/messages";
import { LiveCall, type CallStatus, type EndReason, type ToolHandler, type VoiceLevels } from "./live-call";
import { useTurnstile } from "./useTurnstile";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export type VoicePhase =
  | { kind: "idle" }
  | { kind: "asking_mic" }
  | { kind: "starting" }
  | { kind: "live"; status: CallStatus }
  | { kind: "ended"; reason: EndReason }
  | { kind: "problem"; message: string; offerBooking: boolean };

/** Who to call: Dep, or a /demo receptionist. */
export type CallRequest = { agent: "dep" } | { agent: "receptionist"; industry: string; serviceId: string };

const MIC_BLOCKED =
  "Microphone access is blocked. Allow it from the icon in your address bar, then try again.";

function micProblem(err: unknown): string {
  const name = (err as { name?: string } | null)?.name;
  if (name === "NotFoundError" || name === "OverconstrainedError") return "No microphone was found. Plug one in and try again.";
  if (name === "NotReadableError") return "Your microphone is busy in another app. Close it there and try again.";
  return MIC_BLOCKED;
}

function waitText(seconds: number | undefined) {
  if (!seconds || seconds < 60) return "";
  const minutes = Math.ceil(seconds / 60);
  return minutes < 90 ? ` (about ${minutes} min)` : ` (about ${Math.ceil(minutes / 60)} h)`;
}

const problem = (message: string, offerBooking = false): VoicePhase => ({ kind: "problem", message, offerBooking });

/** Asks the server for a call. Returns the session, or the phase to show instead. */
async function requestSession(request: CallRequest, turnstileToken: string): Promise<IssuedSession | VoicePhase> {
  try {
    const res = await fetch("/api/voice-demo/session", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...request, turnstileToken }),
    });
    const body: Record<string, unknown> = await res.json().catch(() => ({}));
    if (res.ok) return body as unknown as IssuedSession;

    const reason = isRefusalReason(body.reason) ? body.reason : "token_failed";
    const retryAfter = typeof body.retryAfter === "number" ? body.retryAfter : undefined;
    return problem(REFUSAL_MESSAGES[reason] + waitText(retryAfter), OFFER_BOOKING.has(reason));
  } catch {
    return problem(REFUSAL_MESSAGES.token_failed);
  }
}

/**
 * Everything around a voice call: mic permission, the human check, the
 * session request, and the live call. Used by the home page (Dep) and /demo.
 */
export function useVoiceCall({ theme }: { theme: "light" | "dark" }) {
  const { containerRef: turnstileRef, getToken } = useTurnstile(SITE_KEY, theme);
  const [phase, setPhase] = React.useState<VoicePhase>({ kind: "idle" });
  const [call, setCall] = React.useState<LiveCall | null>(null);
  const [lines, setLines] = React.useState<TranscriptLine[]>([]);
  const [remaining, setRemaining] = React.useState<number | null>(null);
  const [muted, setMuted] = React.useState(false);

  // Leaving the page (or this component going away) ends the call.
  React.useEffect(() => {
    if (!call) return;
    const onPageHide = () => call.end("hangup");
    window.addEventListener("pagehide", onPageHide);
    return () => {
      window.removeEventListener("pagehide", onPageHide);
      call.end("hangup");
    };
  }, [call]);

  /** Call from a click handler: browsers only allow audio to start inside one. */
  const start = React.useCallback(
    async (request: CallRequest, handleTool: ToolHandler) => {
      if (!SITE_KEY) {
        setPhase(problem(REFUSAL_MESSAGES.not_configured));
        return;
      }
      if (!navigator.mediaDevices?.getUserMedia || typeof AudioContext === "undefined") {
        setPhase(problem("This browser can't make voice calls. Try the latest Chrome, Edge, Safari or Firefox."));
        return;
      }

      // Safari only lets audio start inside the click, so these come before any await.
      const speakerContext = new AudioContext();
      const micContext = new AudioContext();
      void speakerContext.resume();
      void micContext.resume();
      const closeAudio = () => {
        void speakerContext.close().catch(() => {});
        void micContext.close().catch(() => {});
      };

      setLines([]);
      setRemaining(null);
      setMuted(false);
      setPhase({ kind: "asking_mic" });

      // The human check runs while the browser asks for the mic.
      const human = getToken().catch(() => null);

      let mic: MediaStream;
      try {
        mic = await navigator.mediaDevices.getUserMedia({
          audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
        });
      } catch (err) {
        closeAudio();
        setPhase(problem(micProblem(err)));
        return;
      }
      const giveUp = (next: VoicePhase) => {
        mic.getTracks().forEach((t) => t.stop());
        closeAudio();
        setPhase(next);
      };

      setPhase({ kind: "starting" });
      const turnstileToken = await human;
      if (!turnstileToken) return giveUp(problem(REFUSAL_MESSAGES.turnstile));

      const issued = await requestSession(request, turnstileToken);
      if ("kind" in issued) return giveUp(issued);

      const liveCall = new LiveCall(
        issued,
        { mic, micContext, speakerContext },
        {
          onStatus: (status) => {
            if (status !== "ended" && status !== "error") setPhase({ kind: "live", status });
          },
          onTranscript: setLines,
          onRemaining: setRemaining,
          onEnd: (reason) => setPhase({ kind: "ended", reason }),
        },
        handleTool,
      );
      setCall(liveCall);
      void liveCall.start();
    },
    [getToken],
  );

  const hangUp = React.useCallback(() => call?.end("hangup"), [call]);

  const toggleMute = React.useCallback(() => {
    setMuted((was) => {
      call?.setMuted(!was);
      return !was;
    });
  }, [call]);

  const levels: VoiceLevels | null = phase.kind === "live" ? (call?.levels ?? null) : null;
  const busy = phase.kind === "asking_mic" || phase.kind === "starting";

  return {
    phase,
    lines,
    remaining,
    muted,
    levels,
    busy,
    live: phase.kind === "live",
    configured: Boolean(SITE_KEY),
    turnstileRef,
    start,
    hangUp,
    toggleMute,
  };
}
