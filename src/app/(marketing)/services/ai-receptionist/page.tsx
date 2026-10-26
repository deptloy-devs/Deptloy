"use client";

import * as React from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Sparkles,
  Shield,
  CheckCircle2,
  ChevronDown,
  Volume2,
  Zap,
  ArrowRight,
  PhoneCall,
  UserCheck,
  FileText,
  MessageSquare,
} from "lucide-react";

const workflowSteps = [
  {
    step: "01",
    title: "Inbound Call or Chat Received",
    desc: "Call arrives via your existing business line (seamless carrier forwarding) or website widget. Answered in sub-500ms with custom brand inflection.",
    badge: "Carrier Connect",
  },
  {
    step: "02",
    title: "Intent & Caller Qualification",
    desc: "The assistant identifies the caller's name, intent (new appointment, pricing FAQ, rescheduling), and checks existing customer history in your CRM.",
    badge: "CRM Context",
  },
  {
    step: "03",
    title: "Two-Way Calendar Synchronization",
    desc: "The agent queries open slots across staff calendars, enforcing buffer times, lunch breaks, and appointment durations before offering times.",
    badge: "Slot Locking",
  },
  {
    step: "04",
    title: "Confirmation & Automated Sync",
    desc: "The appointment is locked in, SMS confirmation dispatched, and the lead record with audio transcript is delivered to your team instantly.",
    badge: "Zero-Lag Sync",
  },
];

const capabilities = [
  {
    icon: PhoneCall,
    title: "24/7 Inbound Voice Intake",
    desc: "Never lose a high-value customer to an answering machine again. Every call is answered day and night with warm, natural turn-taking.",
  },
  {
    icon: Calendar,
    title: "Real-Time Appointment Scheduling",
    desc: "Direct integration with Google Calendar, Outlook, Calendly, or custom EHR/booking engines. Only open, verified slots are offered.",
  },
  {
    icon: MessageSquare,
    title: "Business Knowledge & FAQ Answering",
    desc: "Trained on your verified price books, service policies, location, and operating hours. Provides instant, accurate answers without staff distraction.",
  },
  {
    icon: UserCheck,
    title: "Emergency Triage & Human Rollover",
    desc: "Detects urgent keywords (e.g. severe pain, water pipe leak, VIP buyer). Automatically transfers the live call straight to on-call staff cell phones.",
  },
  {
    icon: FileText,
    title: "Call Transcripts & CRM Logging",
    desc: "Every interaction is transcribed, summarized, and tagged with sentiment score and deal value, automatically appended to the client's CRM timeline.",
  },
  {
    icon: Zap,
    title: "Instant SMS Follow-Through",
    desc: "Callers immediately receive a personalized text confirmation with their appointment date, prep instructions, and easy one-tap reschedule links.",
  },
];

const faqs = [
  {
    q: "How does it connect to our existing phone number?",
    a: "We configure standard carrier call forwarding. You can choose unconditional forwarding (24/7), conditional forwarding (after-hours and weekends only), or rollover forwarding when your front-desk lines are busy.",
  },
  {
    q: "Does it sound like a robotic telephone menu?",
    a: "No. We deploy neural conversational speech models that speak naturally with sub-500ms latency, conversational pauses, and human inflection. Callers experience a smooth, intelligent two-way conversation.",
  },
  {
    q: "What happens if a caller asks something unexpected?",
    a: "The assistant is bounded strictly by your verified knowledge base. If asked something out of scope, it never hallucinates; it politely captures the caller's details and routes the message to your team.",
  },
  {
    q: "Can callers reschedule or cancel over the phone?",
    a: "Yes. The assistant matches the caller's phone number against your calendar or CRM, locates their booking, and allows them to adjust or cancel their slot autonomously.",
  },
];

export default function AiReceptionistPage() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <div className="py-24 sm:py-32">
      <div className="wrap">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-mono text-[var(--mute)]">
          <Link href="/how-it-works" className="hover:text-[var(--deep)]">
            How It Works
          </Link>
          <span>/</span>
          <span className="text-[var(--pur)] font-bold">AI Receptionist</span>
        </div>

        {/* Hero Section */}
        <span className="k">Conversational Voice & Chat Ingestion</span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--deep)] max-w-3xl">
          An AI Receptionist that never misses a call.
        </h1>
        <p className="lead2 max-w-2xl">
          A conversational, human-grade voice and messaging assistant tailored strictly to your business rules. It answers calls 24/7, schedules verified calendar appointments, resolves pricing FAQs, and logs every detail into your CRM.
        </p>

        {/* Hero CTA & Quick Proof */}
        <div className="mt-8 flex flex-wrap gap-4 items-center">
          <Link href="/contact" className="btn">
            Schedule Architecture Call
          </Link>
          <Link
            href="/demo"
            className="btn ghost"
          >
            <Sparkles className="w-4 h-4 text-[var(--or)]" /> Test Live Voice Demo
          </Link>
        </div>

        {/* Live Audio Visualizer Stage */}
        <div
          className="mt-16 bg-white border border-[rgba(21,19,74,0.14)] p-8 sm:p-12 shadow-[0_20px_50px_rgba(87,80,168,0.1)]"
          style={{
            borderTop: "5px solid #8478e0",
            clipPath: "polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#16875b] animate-ping" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#16875b]">
                  Live Voice Assistant Active
                </span>
                <span className="text-xs font-mono text-[var(--mute)]">• 420ms Latency</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--deep)]">
                “Hi! Thanks for calling. How can I assist with your appointment today?”
              </h2>

              <p className="text-sm sm:text-base text-[var(--mute)] leading-relaxed">
                Callers speak naturally without pressing numbers. The AI understands accents, handles conversational interruptions, checks provider calendars in real time, and sends instant SMS confirmations before the call even terminates.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[var(--mist)]">
                <div>
                  <div className="text-2xl font-extrabold font-mono text-[var(--deep)]">&lt; 1.8s</div>
                  <div className="text-xs text-[var(--mute)]">Average Pickup Time</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold font-mono text-[#8478e0]">94%</div>
                  <div className="text-xs text-[var(--mute)]">After-Hours Capture</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold font-mono text-[#16875b]">35%</div>
                  <div className="text-xs text-[var(--mute)]">No-Show Reduction</div>
                </div>
              </div>
            </div>

            {/* Interactive Step Switcher */}
            <div className="lg:col-span-5 bg-[var(--paper)] border border-[var(--peri)] p-6 space-y-4">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--pur)]">
                Call Execution Pipeline
              </span>

              <div className="space-y-2.5">
                {workflowSteps.map((step, idx) => (
                  <button
                    key={step.step}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left p-3 border transition-colors ${
                      activeStep === idx
                        ? "bg-white border-[#8478e0] shadow-sm"
                        : "bg-white/60 border-transparent hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-bold text-[#8478e0]">{step.step}</span>
                      <span className="text-[10px] font-mono uppercase bg-[var(--mist)] px-2 py-0.5 text-[var(--deep)]">
                        {step.badge}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-[var(--deep)]">{step.title}</div>
                    {activeStep === idx && (
                      <p className="text-[11px] text-[var(--mute)] mt-1.5 leading-relaxed">
                        {step.desc}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section: 6 Core Capabilities Grid */}
        <div className="mt-24">
          <span className="k">Full Capability Breakdown</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--deep)] mb-4">
            Engineered for real operational phone lines.
          </h2>
          <p className="lead2 max-w-2xl mb-12">
            No fragile conversational scripts. Every call operates on verified business knowledge, strict safety boundaries, and live API calendar slot locking.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => {
              const CapIcon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="bg-white border border-[rgba(21,19,74,0.12)] p-7 space-y-3 shadow-[0_12px_30px_rgba(87,80,168,0.06)]"
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)",
                  }}
                >
                  <div className="w-10 h-10 rounded-sm bg-[#8478e0]/15 text-[#8478e0] flex items-center justify-center">
                    <CapIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-[var(--deep)]">
                    {cap.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Integration Strip */}
        <div className="mt-20 p-8 bg-[var(--paper)] border border-[var(--peri)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase text-[var(--pur)]">
              Modular Interconnect
            </span>
            <h3 className="text-xl font-bold text-[var(--deep)]">
              Connects directly to your CRM and SMS automations.
            </h3>
            <p className="text-xs sm:text-sm text-[var(--mute)]">
              When a call ends, the transcript automatically populates the custom CRM, triggers the SMS confirmation flow, and updates your team dashboard.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/services/crm" className="text-xs font-mono font-bold text-[var(--deep)] hover:text-[var(--or)]">
              Explore CRM →
            </Link>
            <Link href="/services/automation" className="text-xs font-mono font-bold text-[var(--deep)] hover:text-[var(--or)]">
              Explore Automation →
            </Link>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="mt-24">
          <span className="k">FAQ</span>
          <h2 className="text-3xl font-extrabold text-[var(--deep)] mb-8">
            Technical Questions on Voice AI
          </h2>

          <div className="space-y-4 max-w-3xl">
            {faqs.map((faq, idx) => (
              <div
                key={faq.q}
                className="bg-white border border-[rgba(21,19,74,0.12)] p-6 cursor-pointer"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-bold text-base text-[var(--deep)]">{faq.q}</h3>
                  <ChevronDown
                    className={`w-4 h-4 text-[var(--mute)] transition-transform ${
                      openFaq === idx ? "rotate-180 text-[var(--or)]" : ""
                    }`}
                  />
                </div>
                {openFaq === idx && (
                  <p className="mt-4 text-sm text-[var(--mute)] leading-relaxed pt-3 border-t border-[var(--mist)]">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div
          className="mt-20 p-8 sm:p-12 bg-[var(--deep)] text-white flex flex-col md:flex-row items-center justify-between gap-8"
          style={{
            clipPath: "polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)",
          }}
        >
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono text-[var(--peri)] uppercase">Turnkey Rollout</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to test an AI receptionist configured for your practice?
            </h3>
            <p className="text-xs sm:text-sm text-[#cfd2ee] leading-relaxed">
              We build a functioning prototype with your real service menu, hours, and calendar rules within 3 business days.
            </p>
          </div>

          <Link href="/contact" className="btn" style={{ background: "var(--or)", color: "var(--deep)" }}>
            Request Prototype Scope
          </Link>
        </div>
      </div>
    </div>
  );
}
