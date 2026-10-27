"use client";

import * as React from "react";
import Link from "next/link";
import { Mic, MicOff, PhoneOff } from "lucide-react";
import type { BookingRequested } from "@/lib/voice-demo/booking";
import { captionTail, formatClock } from "@/lib/voice-demo/call-state";
import { BOOK_A_CALL_HREF } from "@/lib/voice-demo/messages";
import { DepRobot } from "./DepRobot";
import { useDepChat } from "./DepChat";
import { isBookingRequested, sendDepBooking } from "./voice-demo/dep-booking";
import type { EndReason } from "./voice-demo/live-call";
import { useVoiceCall, type VoicePhase } from "./voice-demo/useVoiceCall";

const GREETING = "Hi, I’m Dep! Ask me anything about Deptloy.";
/** How much of Dep's current sentence fits in the speech bubble. */
const CAPTION_CHARS = 100;

const END_LINES: Record<EndReason, string> = {
  hangup: "Thanks for talking! Call me again anytime.",
  time: "That’s our time for now. Call me again anytime!",
  silence: "It went quiet, so I hung up. Call me again anytime.",
  dropped: "Oops, the call dropped. Want to try again?",
  error: "Something went wrong on my end. Please try again.",
};

/** What Dep's speech bubble says at each step of a call. */
function bubbleLine(phase: VoicePhase, depSaid: string | undefined): string {
  switch (phase.kind) {
    case "idle":
      return "";
    case "asking_mic":
      return "Allow your microphone so I can hear you. Our call runs on Google Gemini, which may use it to improve its products.";
    case "starting":
      return "Connecting…";
    case "live":
      if (depSaid) return captionTail(depSaid, CAPTION_CHARS);
      return phase.status === "connecting" ? "Connecting…" : "I’m listening…";
    case "ended":
      return END_LINES[phase.reason];
    case "problem":
      return phase.message;
  }
}

export function Hero() {
  const { openChat } = useDepChat();
  const [typed, setTyped] = React.useState("");
  const {
    phase,
    lines,
    remaining,
    muted,
    levels,
    busy,
    live,
    configured,
    turnstileRef,
    start,
    hangUp,
    toggleMute,
  } = useVoiceCall({ theme: "light" });
  const [request, setRequest] = React.useState<BookingRequested | null>(null);
  const [requestFailed, setRequestFailed] = React.useState(false);

  // Typewriter effect
  React.useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setTyped(GREETING.slice(0, i));
      if (i >= GREETING.length) clearInterval(timer);
    }, 34);

    return () => clearInterval(timer);
  }, []);

  const talk = () => {
    setRequest(null);
    setRequestFailed(false);
    void start({ agent: "dep" }, async (call, { sessionId }) => {
      const result = await sendDepBooking(call, sessionId);
      if (isBookingRequested(result)) setRequest(result);
      else setRequestFailed(true);
      return result;
    });
  };

  const inCall = live || busy;
  const depSaid = lines.findLast((line) => line.role === "agent")?.text;
  const line = phase.kind === "idle" ? typed : bubbleLine(phase, depSaid);
  const speaking = phase.kind === "live" && phase.status === "speaking";
  const offerBooking = (phase.kind === "problem" && phase.offerBooking) || (requestFailed && !request);

  return (
    <div className="hero">
      <div className="wrap">
        <div>
          <h1>
            <span>
              <b>Software built</b>
            </span>{" "}
            <span>
              <b>to outlast</b>
            </span>{" "}
            <span>
              <b>the hype.</b>
            </span>
          </h1>
          <p className="sub">
            From intelligent AI receptionists to complete custom software platforms, we build technology that works
            around your business.
          </p>
          <div className="cta flex items-center gap-3 flex-wrap">
            <Link className="btn" href="/demo" style={{ background: "var(--deep)", color: "#fff" }}>
              Test Our AI Receptionist →
            </Link>
            <Link className="btn ghost" href="/contact#appointment">
              Book a Call
            </Link>
            <Link
              href="/projects"
              className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--pur)] hover:text-[var(--or)] ml-1 transition-colors"
            >
              Explore Our Projects →
            </Link>
          </div>
        </div>

        <div className="rbwrap" id="rbwrap">
          <div className="disc"></div>
          <div
            className={`bubble${phase.kind === "idle" ? "" : " caption"}${phase.kind === "idle" || speaking ? "" : " quiet"}`}
            id="bubble"
          >
            {line}
          </div>
          <div className="fc" style={{ "--c": "#3ccf91" } as React.CSSProperties}>
            <i></i>24/7 AI Receptionist Active
          </div>
          <div className="fc" style={{ "--c": "var(--or)" } as React.CSSProperties}>
            <i></i>Custom Workflow Live
          </div>
          <div className="fc" style={{ "--c": "var(--lav)" } as React.CSSProperties}>
            <i></i>Data In Sync · Zero Drift
          </div>

          <DepRobot
            voice={levels}
            onActivate={inCall ? undefined : () => openChat()}
            label={inCall ? "Dep, on a voice call with you" : "Chat with Dep, the Deptloy assistant"}
            style={{ width: "min(330px, 66%)", height: "auto" }}
          />

          {configured ? (
            <div className="talk dep-call">
              {/* Cloudflare shows a checkbox here only if it needs the visitor to tick one. */}
              <div ref={turnstileRef} className="dep-check" />
              {live ? (
                <div className="dep-call-row">
                  {remaining !== null && (
                    <span className="dep-clock" aria-label={`${formatClock(remaining)} left in this call`}>
                      {formatClock(remaining)}
                    </span>
                  )}
                  <button className="btn sm ghost" type="button" onClick={toggleMute} aria-pressed={muted}>
                    {muted ? <MicOff aria-hidden="true" /> : <Mic aria-hidden="true" />}
                    {muted ? "Unmute" : "Mute"}
                  </button>
                  <button className="btn sm dep-end" type="button" onClick={hangUp}>
                    <PhoneOff aria-hidden="true" />
                    End
                  </button>
                </div>
              ) : (
                <div className="dep-call-row">
                  <button className="btn sm" type="button" onClick={talk} disabled={busy}>
                    <Mic aria-hidden="true" />
                    {busy ? "Starting…" : "Talk to Dep"}
                  </button>
                  <button className="btn sm ghost" type="button" onClick={() => openChat()} disabled={busy}>
                    Chat with Dep
                  </button>
                </div>
              )}
              {/* One status line under the buttons, so Dep's bubble stays short and never covers its face. */}
              <p className={`dep-note${request ? " sent" : ""}`} role="status">
                {request ? (
                  <>
                    ✓ Request sent. We’ll email <b>{request.email}</b> to confirm.
                  </>
                ) : offerBooking ? (
                  <Link href={BOOK_A_CALL_HREF}>Book a call instead →</Link>
                ) : (
                  "Voice uses your mic · short calls · runs on Google Gemini"
                )}
              </p>
            </div>
          ) : (
            <button className="btn talk" id="talk" type="button" onClick={() => openChat()}>
              Chat with Dep
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
