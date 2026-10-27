"use client";

import * as React from "react";
import Link from "next/link";
import { CalendarCheck, Mic, MicOff, PhoneCall, PhoneOff } from "lucide-react";
import { DepRobot } from "@/components/marketing/DepRobot";
import { formatClock } from "@/lib/voice-demo/call-state";
import { BOOK_A_CALL_HREF } from "@/lib/voice-demo/messages";
import { runVoiceTool, type ConfirmedBooking, type ToolCall } from "@/lib/voice-demo/tools";
import type { DemoIndustryOption } from "@/types";
import type { CallStatus, EndReason } from "./live-call";
import { useVoiceCall } from "./useVoiceCall";

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

function newReference(): string {
  return `BK-${Math.floor(100000 + Math.random() * 900000)}`;
}

type Props = {
  industry: DemoIndustryOption;
  service: DemoIndustryOption["services"][number];
};

/** Live voice call with a /demo receptionist, voiced by Dep. Bookings here are sample data only. */
export function VoiceReceptionist({ industry, service }: Props) {
  const { phase, lines, remaining, muted, levels, busy, live, configured, turnstileRef, start, hangUp, toggleMute } =
    useVoiceCall({ theme: "dark" });
  const [booking, setBooking] = React.useState<ConfirmedBooking | null>(null);
  const transcriptRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight });
  }, [lines]);

  const startCall = () => {
    setBooking(null);
    void start({ agent: "receptionist", industry: industry.id, serviceId: service.id }, (call: ToolCall) => {
      const result = runVoiceTool(call, { industry: industry.id, serviceId: service.id, newReference });
      if (result.status === "confirmed") setBooking(result as ConfirmedBooking);
      return result;
    });
  };

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

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div className="flex items-center gap-4 px-4 pt-3 shrink-0">
        <DepRobot voice={levels} style={{ width: 104, height: "auto", cursor: "default" }} />
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
            {!configured && <p className="text-[#ffb59b]">Voice calls aren&apos;t set up on this site yet.</p>}
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

      {/* Cloudflare shows a checkbox here only if it needs the visitor to tick one. */}
      <div ref={turnstileRef} className="px-4 empty:hidden" />

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
            onClick={startCall}
            disabled={busy}
            className="flex-1 h-9 rounded-sm bg-[var(--or)] hover:bg-white text-[var(--deep)] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PhoneCall className="w-3.5 h-3.5" aria-hidden="true" />
            {busy ? "Starting…" : phase.kind === "idle" ? "Start call" : "Call again"}
          </button>
        )}
      </div>
    </div>
  );
}
