"use client";

import * as React from "react";
import Link from "next/link";
import { CalendarCheck, Mic, MicOff, PhoneCall, PhoneOff } from "lucide-react";
import { DepRobot } from "@/components/marketing/DepRobot";
import type { TranscriptLine } from "@/lib/voice-demo/call-state";
import type { IssuedSession } from "@/lib/voice-demo/gatekeeper";
import { BOOK_A_CALL_HREF, isRefusalReason, OFFER_BOOKING, REFUSAL_MESSAGES } from "@/lib/voice-demo/messages";
import type { ConfirmedBooking } from "@/lib/voice-demo/tools";
import type { DemoIndustryOption } from "@/types";
import { LiveCall, type CallStatus, type EndReason } from "./live-call";
import { useTurnstile } from "./useTurnstile";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Phase =
  | { kind: "idle" }
  | { kind: "asking_mic" }
  | { kind: "starting" }
  | { kind: "live"; status: CallStatus }
  | { kind: "ended"; reason: EndReason }
  | { kind: "problem"; message: string; offerBooking: boolean };

const END_MESSAGES: Record<EndReason, string> = {
  hangup: "Call ended.",
  time: "Time's up. Demo calls are short, but you can start another.",
  silence: "The call ended after a quiet stretch.",
  dropped: "The call dropped. Please try again.",
  error: "Something went wrong with the call. Please try again.",
};

const STATUS_TEXT: Record<CallStatus, string> = {
  connecting: "Connecting…",
  listening: "Listening…",
  speaking: "Speaking…",
  ended: "Call ended",
  error: "Call failed",
};

const MIC_BLOCKED =
  "Microphone access is blocked. Allow it from the icon in your address bar, then press Start call again.";

function formatClock(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

function waitText(seconds: number | undefined) {
  if (!seconds || seconds < 60) return "";
  const minutes = Math.ceil(seconds / 60);
  return minutes < 90 ? ` (about ${minutes} min)` : ` (about ${Math.ceil(minutes / 60)} h)`;
}

type Props = {
  industry: DemoIndustryOption;
  service: DemoIndustryOption["services"][number];
};

/** Live voice call with the demo receptionist, voiced by Dep. */
export function VoiceReceptionist({ industry, service }: Props) {
  const {
    containerRef: turnstileRef,
    token: turnstileToken,
    failed: turnstileFailed,
    reset: resetTurnstile,
  } = useTurnstile(SITE_KEY);
  const [phase, setPhase] = React.useState<Phase>({ kind: "idle" });
  const [call, setCall] = React.useState<LiveCall | null>(null);
  const [lines, setLines] = React.useState<TranscriptLine[]>([]);
  const [remaining, setRemaining] = React.useState<number | null>(null);
  const [booking, setBooking] = React.useState<ConfirmedBooking | null>(null);
  const [muted, setMuted] = React.useState(false);
  const transcriptRef = React.useRef<HTMLDivElement>(null);

  // Leaving the page or switching industry ends the call.
  React.useEffect(() => {
    if (!call) return;
    const onPageHide = () => call.end("hangup");
    window.addEventListener("pagehide", onPageHide);
    return () => {
      window.removeEventListener("pagehide", onPageHide);
      call.end("hangup");
    };
  }, [call]);

  React.useEffect(() => {
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight });
  }, [lines]);

  const startCall = async () => {
    if (!turnstileToken) return;

    // Audio has to start inside the click for Safari, before any await.
    const speakerContext = new AudioContext();
    const micContext = new AudioContext();
    void speakerContext.resume();
    void micContext.resume();
    const closeAudio = () => {
      void speakerContext.close().catch(() => {});
      void micContext.close().catch(() => {});
    };

    setLines([]);
    setBooking(null);
    setRemaining(null);
    setMuted(false);
    setPhase({ kind: "asking_mic" });

    let mic: MediaStream;
    try {
      mic = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
    } catch (err) {
      closeAudio();
      const name = (err as { name?: string } | null)?.name;
      const message =
        name === "NotFoundError" ? "No microphone was found. Plug one in and try again." : MIC_BLOCKED;
      setPhase({ kind: "problem", message, offerBooking: false });
      return;
    }

    setPhase({ kind: "starting" });
    let issued: IssuedSession;
    try {
      const res = await fetch("/api/voice-demo/session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ industry: industry.id, serviceId: service.id, turnstileToken }),
      });
      const body: Record<string, unknown> = await res.json().catch(() => ({}));
      if (!res.ok) {
        const reason = isRefusalReason(body.reason) ? body.reason : "token_failed";
        const retryAfter = typeof body.retryAfter === "number" ? body.retryAfter : undefined;
        throw Object.assign(new Error(REFUSAL_MESSAGES[reason] + waitText(retryAfter)), {
          offerBooking: OFFER_BOOKING.has(reason),
        });
      }
      issued = body as unknown as IssuedSession;
    } catch (err) {
      mic.getTracks().forEach((t) => t.stop());
      closeAudio();
      const message = err instanceof Error && err.message ? err.message : REFUSAL_MESSAGES.token_failed;
      setPhase({ kind: "problem", message, offerBooking: Boolean((err as { offerBooking?: boolean }).offerBooking) });
      return;
    } finally {
      // Turnstile tokens work once.
      resetTurnstile();
    }

    const liveCall = new LiveCall(
      issued,
      { industry: industry.id, serviceId: service.id },
      { mic, micContext, speakerContext },
      {
        onStatus: (status) => {
          if (status !== "ended" && status !== "error") setPhase({ kind: "live", status });
        },
        onTranscript: setLines,
        onRemaining: setRemaining,
        onBooking: setBooking,
        onEnd: (reason) => setPhase({ kind: "ended", reason }),
      },
    );
    setCall(liveCall);
    void liveCall.start();
  };

  const hangUp = () => call?.end("hangup");

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    call?.setMuted(next);
  };

  const live = phase.kind === "live";
  const busy = phase.kind === "asking_mic" || phase.kind === "starting";
  const voice = live ? call?.levels : null;

  let statusText: string;
  switch (phase.kind) {
    case "idle":
      statusText = "Ready when you are";
      break;
    case "asking_mic":
      statusText = "Allow microphone access in your browser…";
      break;
    case "starting":
      statusText = "Connecting…";
      break;
    case "live":
      statusText = STATUS_TEXT[phase.status];
      break;
    case "ended":
      statusText = END_MESSAGES[phase.reason];
      break;
    case "problem":
      statusText = phase.message;
  }

  const canStart = Boolean(SITE_KEY && turnstileToken) && !busy;

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div className="flex items-center gap-4 px-4 pt-3 shrink-0">
        <DepRobot voice={voice} style={{ width: 104, height: "auto", cursor: "default" }} />
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--peri)]">
            {industry.name} receptionist
          </p>
          <p
            className={`mt-1 text-sm font-semibold leading-snug ${phase.kind === "problem" ? "text-[#ffb59b]" : "text-white"}`}
            role="status"
            aria-live="polite"
          >
            {statusText}
          </p>
          {live && remaining !== null && (
            <p className="mt-1 text-[11px] font-mono text-[var(--peri)]" aria-label="Time left in this demo call">
              {formatClock(remaining)} left
            </p>
          )}
          {phase.kind === "problem" && phase.offerBooking && (
            <Link href={BOOK_A_CALL_HREF} className="mt-1 inline-block text-[11px] font-mono font-bold text-[var(--or)] underline">
              Book a call with us →
            </Link>
          )}
        </div>
      </div>

      <div ref={transcriptRef} className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-2 text-xs leading-relaxed">
        {phase.kind === "idle" && (
          <div className="space-y-2 text-[11px] text-[#cfd2ee]">
            <p>
              Talk to the {industry.name.toLowerCase()} receptionist about <strong className="text-white">{service.name}</strong>.
              Ask questions or book a sample appointment, just like a real phone call.
            </p>
            <p>
              Your browser will ask to use your microphone. Demo calls are short and end on their own. Audio goes to
              Google Gemini to create the replies and isn&apos;t stored by Deptloy. On Gemini&apos;s free tier, Google
              may use conversations to improve its products.
            </p>
            {!SITE_KEY && <p className="text-[#ffb59b]">Voice calls aren&apos;t set up on this site yet.</p>}
            {turnstileFailed && (
              <p className="text-[#ffb59b]">The human check didn&apos;t load. Refresh the page and try again.</p>
            )}
          </div>
        )}
        {lines.map((line) => (
          <div key={line.id} className={`flex flex-col ${line.role === "caller" ? "items-end" : "items-start"}`}>
            <span className="text-[9px] font-mono text-slate-400 mb-0.5">
              {line.role === "caller" ? "You" : "AI Receptionist"}
            </span>
            <div
              className={`px-3 py-2 max-w-[85%] rounded-sm ${
                line.role === "caller"
                  ? "bg-[var(--or)] text-[var(--deep)] font-medium rounded-tr-none"
                  : "bg-white/10 text-white border border-white/10 rounded-tl-none"
              }`}
            >
              {line.text}
            </div>
          </div>
        ))}
        {booking && (
          <div className="flex items-start gap-2 p-3 bg-emerald-400/10 border border-emerald-400/30 text-[11px] text-white rounded-sm">
            <CalendarCheck className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-bold">Sample booking {booking.reference}</p>
              <p className="text-[#cfd2ee]">
                {booking.customer_name} · {booking.service} · {booking.date} at {booking.time}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">Demo only. No real calendar entry was made.</p>
            </div>
          </div>
        )}
      </div>

      {/* Shown by Cloudflare only if it needs the visitor to tick a box. Kept mounted between calls. */}
      <div ref={turnstileRef} className={phase.kind === "idle" || phase.kind === "ended" || phase.kind === "problem" ? "px-4" : "hidden"} />

      <div className="p-3 bg-black/20 border-t border-white/10 flex items-center gap-2 shrink-0">
        {live ? (
          <>
            <button
              type="button"
              onClick={toggleMute}
              aria-pressed={muted}
              className="flex-1 h-9 rounded-sm border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {muted ? <MicOff className="w-3.5 h-3.5" aria-hidden="true" /> : <Mic className="w-3.5 h-3.5" aria-hidden="true" />}
              {muted ? "Unmute" : "Mute"}
            </button>
            <button
              type="button"
              onClick={hangUp}
              className="flex-1 h-9 rounded-sm bg-[#ef5b5b] hover:bg-[#ff7272] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <PhoneOff className="w-3.5 h-3.5" aria-hidden="true" />
              End call
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => void startCall()}
            disabled={!canStart}
            className="flex-1 h-9 rounded-sm bg-[var(--or)] hover:bg-white text-[var(--deep)] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PhoneCall className="w-3.5 h-3.5" aria-hidden="true" />
            {busy ? "Starting…" : phase.kind === "idle" ? "Start call" : "Call again"}
            {!busy && SITE_KEY && !turnstileToken && !turnstileFailed && (
              <span className="font-normal opacity-70">· checking…</span>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
