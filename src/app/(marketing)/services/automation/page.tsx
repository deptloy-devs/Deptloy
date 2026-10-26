"use client";

import * as React from "react";
import Link from "next/link";
import {
  Workflow,
  Zap,
  Clock,
  Bell,
  RefreshCw,
  CheckCircle2,
  Send,
  MessageSquare,
  CreditCard,
  FileCheck,
  Shield,
  Layers,
} from "lucide-react";

const automationPipelines = [
  {
    trigger: "Customer Call Ends",
    action: "Instant Text & Calendar Lock",
    detail: "Immediately sends a personalized SMS with appointment time, clinician/specialist name, and 1-tap reschedule link. Locks calendar slot.",
    metric: "0 sec delay",
  },
  {
    trigger: "24h & 2h Pre-Appointment",
    action: "Natural Language Reminders",
    detail: "Sends conversational SMS reminder. If client replies 'Running 10 mins late', AI parses the message and notifies front-desk.",
    metric: "74% fewer no-shows",
  },
  {
    trigger: "Appointment Completed",
    action: "Google Review & Retention",
    detail: "Triggers automated thank-you note and direct 5-star Google Review request. Schedules 6-month checkup reminder automatically.",
    metric: "+3.2x reviews",
  },
  {
    trigger: "High-Ticket Lead Arrives",
    action: "Emergency Team Dispatch",
    detail: "Evaluates deal size and urgency. Alerts on-call staff via Slack and SMS with caller details and suggested follow-up action.",
    metric: "< 3 min response",
  },
];

const automationFeatures = [
  {
    icon: Zap,
    title: "Instant Multi-Tool Triggers",
    desc: "Connect your voice agent, calendar, CRM, email provider, and accounting software with zero manual copy-pasting.",
  },
  {
    icon: MessageSquare,
    title: "Conversational SMS Sequences",
    desc: "Patients and customers can reply with real sentences. Our AI parses intent, updates calendar buffers, and notifies your team.",
  },
  {
    icon: CreditCard,
    title: "Deposit & Payment Workflows",
    desc: "Automatically collect deposits via Stripe during phone bookings or web self-scheduling to eliminate last-minute ghosting.",
  },
  {
    icon: Bell,
    title: "Staff Alert Escalations",
    desc: "Filter out noise. Staff only receive alerts when an emergency arises, an inquiry exceeds threshold value, or human attention is required.",
  },
  {
    icon: FileCheck,
    title: "Digital Intake & Document Collection",
    desc: "Send digital intake forms, medical history surveys, or contracts before consultations. Responses automatically attach to the CRM record.",
  },
  {
    icon: RefreshCw,
    title: "Recurring Client Nurture",
    desc: "Keep clients coming back. Automated maintenance reminders, seasonal checkups, and annual consultation alerts keep your book full.",
  },
];

export default function AutomationServicePage() {
  const [activePipeline, setActivePipeline] = React.useState(0);

  return (
    <div className="py-24 sm:py-32">
      <div className="wrap">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-mono text-[var(--mute)]">
          <Link href="/how-it-works" className="hover:text-[var(--deep)]">
            How It Works
          </Link>
          <span>/</span>
          <span className="text-[var(--pur)] font-bold">Workflow Automation</span>
        </div>

        {/* Hero Section */}
        <span className="k">Autonomous Background Execution</span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--deep)] max-w-3xl">
          The administrative busywork, handled quietly in the background.
        </h1>
        <p className="lead2 max-w-2xl">
          Stop chasing clients, double-booking calendars, and typing data across five different browser tabs. Deptloy builds quiet, resilient automation workflows that keep your business running on autopilot.
        </p>

        {/* Hero CTAs */}
        <div className="mt-8 flex flex-wrap gap-4 items-center">
          <Link href="/contact" className="btn">
            Automate Your Workflows
          </Link>
          <Link href="/demo" className="btn ghost">
            Test Live Voice & SMS Demo
          </Link>
        </div>

        {/* Live Event Automation Board */}
        <div
          className="mt-16 bg-white border border-[rgba(21,19,74,0.14)] p-8 sm:p-10 shadow-[0_20px_50px_rgba(87,80,168,0.1)]"
          style={{
            borderTop: "5px solid #fd9150",
            clipPath: "polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)",
          }}
        >
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8 pb-4 border-b border-[var(--mist)]">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--pur)]">
                Autonomous Workflow Engine
              </span>
              <h2 className="text-xl font-bold text-[var(--deep)] mt-0.5">
                Real-Time Event Triggers & Handoffs
              </h2>
            </div>
            <div className="text-xs font-mono bg-[var(--paper)] px-3 py-1.5 border border-[var(--peri)]">
              <span className="font-bold text-[#fd9150]">22+ Hours</span> Saved Weekly per Clinic / Business
            </div>
          </div>

          {/* Pipelines Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {automationPipelines.map((pipe, idx) => (
              <div
                key={pipe.trigger}
                onClick={() => setActivePipeline(idx)}
                className={`p-6 border transition-all cursor-pointer ${
                  activePipeline === idx
                    ? "bg-[var(--paper)] border-[#fd9150] shadow-sm"
                    : "bg-white border-[var(--peri)] hover:bg-[var(--paper)]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-[var(--pur)]">
                    TRIGGER: {pipe.trigger}
                  </span>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 bg-[#fd9150]/15 text-[#fd9150]">
                    {pipe.metric}
                  </span>
                </div>

                <h3 className="font-display font-bold text-base text-[var(--deep)] mb-2">
                  → {pipe.action}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed">
                  {pipe.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 6 Automation Capabilities Grid */}
        <div className="mt-24">
          <span className="k">Capabilities</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--deep)] mb-4">
            Reliable orchestration between staff, tools, and clients.
          </h2>
          <p className="lead2 max-w-2xl mb-12">
            No fragile no-code workarounds that stop working when an API key expires. We build hardened webhooks with retry logic and active monitoring.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {automationFeatures.map((feat) => {
              const FeatIcon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="bg-white border border-[rgba(21,19,74,0.12)] p-7 space-y-3 shadow-[0_12px_30px_rgba(87,80,168,0.06)]"
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)",
                  }}
                >
                  <div className="w-10 h-10 rounded-sm bg-[#fd9150]/15 text-[#fd9150] flex items-center justify-center">
                    <FeatIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-[var(--deep)]">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
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
            <span className="text-xs font-mono text-[var(--peri)] uppercase">Autonomous Systems</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to eliminate 20+ hours of manual administrative busywork?
            </h3>
            <p className="text-xs sm:text-sm text-[#cfd2ee] leading-relaxed">
              We audit your repetitive tasks and deploy synchronized background workflows tailored to your tools.
            </p>
          </div>

          <Link href="/contact" className="btn" style={{ background: "var(--or)", color: "var(--deep)" }}>
            Request Automation Audit
          </Link>
        </div>
      </div>
    </div>
  );
}
