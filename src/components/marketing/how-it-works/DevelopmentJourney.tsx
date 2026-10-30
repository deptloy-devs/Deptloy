"use client";

import * as React from "react";
import Link from "next/link";
import {
  Compass,
  Layout,
  Code2,
  Rocket,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Check,
} from "lucide-react";

export interface Stage {
  id: string;
  n: string;
  label: string;
  icon: React.ElementType;
  title: string;
  description: string;
  deliverable: string;
}

export const STAGES: Stage[] = [
  {
    id: "discover",
    n: "01",
    label: "Discover",
    icon: Compass,
    title: "First, we understand your business.",
    description:
      "We learn how your business operates, identify operational challenges, and understand what your users actually need.",
    deliverable: "Clear requirements and project priorities",
  },
  {
    id: "design",
    n: "02",
    label: "Design",
    icon: Layout,
    title: "We turn the problem into a clear plan.",
    description:
      "We map user journeys, define essential features, plan integrations, and design the product experience before development begins.",
    deliverable: "Product blueprint, wireframes, and agreed scope",
  },
  {
    id: "build",
    n: "03",
    label: "Build",
    icon: Code2,
    title: "We engineer and test your solution.",
    description:
      "We develop the frontend, backend, data systems, integrations, and useful AI capabilities needed to make the product work as one system.",
    deliverable: "A tested, working software product",
  },
  {
    id: "launch",
    n: "04",
    label: "Launch",
    icon: Rocket,
    title: "We prepare your software for real use.",
    description:
      "We handle the agreed deployment process, validate important workflows, and help prepare your team to use the new system.",
    deliverable: "Deployed product and practical handover",
  },
  {
    id: "evolve",
    n: "05",
    label: "Evolve",
    icon: TrendingUp,
    title: "Your software can grow with your business.",
    description:
      "As your needs change, we can continue improving features, integrations, performance, and overall usability.",
    deliverable: "A roadmap for future improvements",
  },
];

/* -------------------------------------------------------------------------- */
/* Visual 1: Discover Board                                                   */
/* -------------------------------------------------------------------------- */
function DiscoverVisual() {
  const items = [
    {
      type: "Operational Problem",
      detail: "Manual appointment triage & lost phone leads",
      tag: "Priority Issue",
      color: "bg-[#feece7] text-[#de593c] border-[#fcd3c7]",
    },
    {
      type: "System Architecture",
      detail: "PostgreSQL database, real-time calendar & automated intake",
      tag: "Core Scope",
      color: "bg-[var(--mist)] text-[var(--pur)] border-[var(--peri)]",
    },
    {
      type: "User Workflow",
      detail: "Caller inquiry -> AI qualification -> CRM table -> SMS confirmation",
      tag: "Workflow Mapped",
      color: "bg-[#edfbf4] text-[#16875b] border-[#c2eed8]",
    },
    {
      type: "Milestone Contract",
      detail: "Agreed feature boundaries, schemas & delivery criteria",
      tag: "Fixed Scope",
      color: "bg-[#fff7ed] text-[#ea580c] border-[#ffedd5]",
    },
  ];

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(21,19,74,0.08)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--or)] animate-pulse" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--deep)]">
            Discovery &amp; Requirements Matrix
          </span>
        </div>
        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[var(--mist)] text-[var(--pur)]">
          Stage 01 Scoping
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {items.map((item) => (
          <div
            key={item.type}
            className="p-3 sm:p-3.5 rounded-xl bg-white border border-[rgba(21,19,74,0.08)] shadow-[0_2px_8px_rgba(87,80,168,0.03)] space-y-1.5"
          >
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] font-mono uppercase font-bold text-[var(--mute)]">
                {item.type}
              </span>
              <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${item.color}`}>
                {item.tag}
              </span>
            </div>
            <p className="text-xs font-semibold text-[var(--deep)] leading-snug">
              {item.detail}
            </p>
          </div>
        ))}
      </div>

      <div className="p-2.5 rounded-lg bg-[var(--paper)] border border-[var(--peri)]/60 flex items-center justify-between text-[11px] text-[var(--mute)]">
        <span className="flex items-center gap-1.5 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#16875b]" />
          Requirements validated with stakeholders
        </span>
        <span className="font-mono text-[10px] text-[var(--pur)] font-bold">100% Aligned</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Visual 2: Design Blueprint & Wireframe                                     */
/* -------------------------------------------------------------------------- */
function DesignVisual() {
  const [mode, setMode] = React.useState<"wireframe" | "polished">("polished");

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(21,19,74,0.08)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--pur)]" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--deep)]">
            UI Architecture &amp; Wireframe Sandbox
          </span>
        </div>
        <div className="flex items-center p-0.5 rounded-lg bg-[var(--mist)] text-[10px] font-mono font-bold">
          <button
            type="button"
            onClick={() => setMode("wireframe")}
            className={`px-2 py-0.5 rounded-md transition-colors ${
              mode === "wireframe" ? "bg-white text-[var(--deep)] shadow-sm" : "text-[var(--mute)] hover:text-[var(--deep)]"
            }`}
          >
            Blueprint
          </button>
          <button
            type="button"
            onClick={() => setMode("polished")}
            className={`px-2 py-0.5 rounded-md transition-colors ${
              mode === "polished" ? "bg-[var(--deep)] text-white shadow-sm" : "text-[var(--mute)] hover:text-[var(--deep)]"
            }`}
          >
            Interface
          </button>
        </div>
      </div>

      {mode === "wireframe" ? (
        <div className="p-4 rounded-xl bg-[#faf9fe] border-2 border-dashed border-[var(--peri)] space-y-3 font-mono">
          <div className="flex items-center justify-between text-[10px] text-[var(--mute)]">
            <span>[Grid Layout: 12 Cols]</span>
            <span>W: 1040px · H: Auto</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="h-10 rounded border border-dashed border-[var(--pur)]/40 bg-[var(--paper)] flex items-center justify-center text-[9px] text-[var(--pur)] font-bold">
              Header · Nav
            </div>
            <div className="col-span-2 h-10 rounded border border-dashed border-[var(--pur)]/40 bg-[var(--paper)] flex items-center justify-center text-[9px] text-[var(--pur)] font-bold">
              Hero Module [h1 + cta]
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-16 rounded border border-dashed border-[var(--or)]/40 bg-[#fff9f5] p-2 flex flex-col justify-between text-[9px] text-[#de593c]">
              <span>Customer Flow Schema</span>
              <span className="text-[8px] opacity-70">Form inputs · Validation rules</span>
            </div>
            <div className="h-16 rounded border border-dashed border-[#16875b]/40 bg-[#f4fdf8] p-2 flex flex-col justify-between text-[9px] text-[#16875b]">
              <span>Database Data Model</span>
              <span className="text-[8px] opacity-70">PostgreSQL tables · Relations</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3 sm:p-4 rounded-xl bg-white border border-[rgba(21,19,74,0.12)] shadow-[0_4px_16px_rgba(87,80,168,0.06)] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ef7a5e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#fd9150]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#3ccf91]" />
              <span className="text-[10px] font-mono text-[var(--mute)] ml-1">app.deptloy.system</span>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#edfbf4] text-[#16875b] border border-[#c2eed8]">
              Prototype Ready
            </span>
          </div>

          <div className="p-2 sm:p-3 rounded-lg bg-[var(--paper)] border border-[var(--peri)] space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[var(--deep)]">
              <span>Client Management Portal</span>
              <span className="text-[10px] font-mono text-[var(--pur)]">Component v1.4</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center text-[10px] font-mono">
              <div className="bg-white p-1.5 sm:p-2 rounded border border-[var(--peri)]/60">
                <span className="text-[var(--mute)] block text-[8px] sm:text-[9px] truncate">INQUIRIES</span>
                <span className="font-bold text-[var(--deep)] text-[10.5px] sm:text-xs">24 Total</span>
              </div>
              <div className="bg-white p-1.5 sm:p-2 rounded border border-[var(--peri)]/60">
                <span className="text-[var(--mute)] block text-[8px] sm:text-[9px] truncate">BOOKED</span>
                <span className="font-bold text-[#16875b] text-[10.5px] sm:text-xs">18 Active</span>
              </div>
              <div className="bg-white p-1.5 sm:p-2 rounded border border-[var(--peri)]/60">
                <span className="text-[var(--mute)] block text-[8px] sm:text-[9px] truncate">CONVERSION</span>
                <span className="font-bold text-[var(--or)] text-[10.5px] sm:text-xs">75.0%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-[11px] text-[var(--mute)] px-1">
        <span>Click tabs above to compare schematic plan vs. production UI</span>
        <span className="font-mono text-[10px] text-[var(--pur)] font-bold">Figma &amp; Design Specs</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Visual 3: Build Prototype Interface                                        */
/* -------------------------------------------------------------------------- */
function BuildVisual() {
  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(21,19,74,0.08)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#16875b] animate-ping" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--deep)]">
            Engineered Solution Simulation
          </span>
        </div>
        <span className="text-[10px] font-mono text-[#16875b] font-bold bg-[#edfbf4] px-2 py-0.5 rounded-full border border-[#c2eed8]">
          Tests Passing · 100%
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {/* Left: Customer/Inbound intake */}
        <div className="p-3.5 rounded-xl bg-white border border-[rgba(21,19,74,0.1)] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase text-[var(--pur)]">
              Inbound Caller Intake
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#f4f3fb] text-[var(--deep)] font-semibold">
              Voice Agent
            </span>
          </div>
          <div className="p-2 rounded bg-[var(--paper)] text-xs space-y-1">
            <p className="font-semibold text-[var(--deep)]">&ldquo;Can I book an appointment for Thursday 2:30pm?&rdquo;</p>
            <p className="text-[11px] text-[#16875b] font-medium flex items-center gap-1">
              <Check className="w-3 h-3 shrink-0" />
              Verified available &amp; reserved in calendar.
            </p>
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-[var(--mute)]">
            <span>Latency: 280ms</span>
            <span className="text-[#16875b]">No Hallucinations</span>
          </div>
        </div>

        {/* Right: Operations & DB Backend */}
        <div className="p-3.5 rounded-xl bg-white border border-[rgba(21,19,74,0.1)] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase text-[var(--or)]">
              Connected Operations
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#fff7f5] text-[#de593c] font-semibold">
              Live Sync
            </span>
          </div>
          <div className="space-y-1 text-[10px] sm:text-[11px] font-mono">
            <div className="flex items-center justify-between p-1.5 rounded bg-[var(--paper)] gap-1">
              <span className="text-[var(--mute)] shrink-0">PostgreSQL:</span>
              <span className="font-bold text-[var(--deep)] truncate text-right">Record #8942 inserted</span>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded bg-[var(--paper)] gap-1">
              <span className="text-[var(--mute)] shrink-0">Google Calendar:</span>
              <span className="font-bold text-[#16875b] truncate text-right">Event created ✓</span>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded bg-[var(--paper)] gap-1">
              <span className="text-[var(--mute)] shrink-0">SMS Confirmation:</span>
              <span className="font-bold text-[var(--pur)] truncate text-right">Dispatched via API</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-[10px] font-mono text-[var(--mute)] text-center">
        * Illustrative custom software workflow simulation · Engineered around specific client requirements.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Visual 4: Launch Checklist                                                 */
/* -------------------------------------------------------------------------- */
function LaunchVisual() {
  const checks = [
    {
      title: "Edge Infrastructure & Hosting",
      detail: "Global SSL/TLS 1.3 encryption, Vercel serverless edge routing & Cloudflare security.",
      status: "Verified",
    },
    {
      title: "Database Isolation & Schema Validation",
      detail: "Dedicated PostgreSQL tables, zero public training parameters, encrypted backups.",
      status: "Verified",
    },
    {
      title: "End-to-End Workflow & Telephony Tests",
      detail: "Twilio/Telnyx SIP trunk handshake, webhook retry queues, error fallback triggers.",
      status: "Passed",
    },
    {
      title: "Operational Documentation & Team Handover",
      detail: "Admin credentials, dashboard walkthroughs, architecture bluebook delivered.",
      status: "Complete",
    },
  ];

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(21,19,74,0.08)]">
        <div className="flex items-center gap-2">
          <Rocket className="w-3.5 h-3.5 text-[#16875b]" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--deep)]">
            Deployment &amp; Handover Checklist
          </span>
        </div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#edfbf4] text-[#16875b] border border-[#c2eed8]">
          Ready for Live Traffic
        </span>
      </div>

      <div className="space-y-2">
        {checks.map((item) => (
          <div
            key={item.title}
            className="p-2.5 sm:p-3 rounded-lg bg-white border border-[rgba(21,19,74,0.08)] flex items-start gap-3 shadow-[0_1px_4px_rgba(87,80,168,0.02)]"
          >
            <div className="w-5 h-5 rounded-full bg-[#16875b]/15 text-[#16875b] grid place-items-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[var(--deep)]">{item.title}</span>
                <span className="text-[9px] font-mono font-bold text-[#16875b] bg-[#edfbf4] px-1.5 py-0.5 rounded">
                  {item.status}
                </span>
              </div>
              <p className="text-[11px] text-[var(--mute)] leading-relaxed mt-0.5">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Visual 5: Evolve Roadmap                                                   */
/* -------------------------------------------------------------------------- */
function EvolveVisual() {
  const phases = [
    {
      phase: "Phase 1: Production Launch",
      timing: "Day 1",
      detail: "Working software live in production solving the core business bottleneck.",
      status: "Live & Active",
      badge: "bg-[#edfbf4] text-[#16875b] border-[#c2eed8]",
    },
    {
      phase: "Phase 2: Insights & Optimizations",
      timing: "Month 1–3",
      detail: "Telemetry review, workflow refinements, and performance telemetry tuning.",
      status: "Roadmap Item",
      badge: "bg-[var(--mist)] text-[var(--pur)] border-[var(--peri)]",
    },
    {
      phase: "Phase 3: Modular Feature Expansion",
      timing: "Month 3+",
      detail: "Adding new integrations, multi-team automations, or specialized portals as you scale.",
      status: "Future Capability",
      badge: "bg-[var(--paper)] text-[var(--mute)] border-[var(--peri)]/60",
    },
  ];

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(21,19,74,0.08)]">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-3.5 h-3.5 text-[var(--pur)]" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--deep)]">
            Long-Term Growth &amp; Architectural Roadmap
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--pur)] font-bold bg-[var(--mist)] px-2 py-0.5 rounded-full border border-[var(--peri)]">
          Built to Adapt
        </span>
      </div>

      <div className="relative pl-6 space-y-4">
        {/* Continuous roadmap progress line */}
        <div className="absolute top-2.5 bottom-2.5 left-2.5 w-0.5 bg-gradient-to-b from-[#16875b] via-[var(--pur)] to-[var(--peri)]" />

        {phases.map((item, idx) => (
          <div key={item.phase} className="relative space-y-1">
            <span
              className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-white grid place-items-center ${
                idx === 0 ? "bg-[#16875b]" : idx === 1 ? "bg-[var(--pur)]" : "bg-[var(--peri)]"
              }`}
            />
            <div className="p-3 rounded-xl bg-white border border-[rgba(21,19,74,0.08)] space-y-1 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[var(--deep)]">{item.phase}</span>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${item.badge}`}>
                  {item.timing}
                </span>
              </div>
              <p className="text-[11px] text-[var(--mute)] leading-relaxed">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-2.5 rounded-lg bg-[var(--paper)] border border-[var(--peri)]/60 text-center text-[10px] font-mono text-[var(--mute)]">
        Software engineered with clean separation of concerns so features can be extended anytime.
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Interactive Journey Component                                         */
/* -------------------------------------------------------------------------- */
export function DevelopmentJourney() {
  const [activeStage, setActiveStage] = React.useState(0);
  const current = STAGES[activeStage];
  const next = STAGES[activeStage + 1];

  // Visual selector
  const renderVisual = () => {
    switch (activeStage) {
      case 0:
        return <DiscoverVisual />;
      case 1:
        return <DesignVisual />;
      case 2:
        return <BuildVisual />;
      case 3:
        return <LaunchVisual />;
      case 4:
        return <EvolveVisual />;
      default:
        return null;
    }
  };

  return (
    <section id="process" className="mb-12 sm:mb-16 lg:mb-20" aria-labelledby="journey-title">
      {/* Section Header */}
      <div className="max-w-2xl mb-6 sm:mb-8">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--pur)] bg-[var(--mist)] px-3 py-1 rounded-sm border border-[var(--peri)] inline-block mb-3.5">
            FIVE-STAGE DEVELOPMENT JOURNEY
          </span>
          <h2
            id="journey-title"
            style={{ fontSize: "clamp(28px, 3.8vw, 46px)", lineHeight: 1.15 }}
            className="font-extrabold text-[var(--deep)] tracking-tight"
          >
            A proven path from challenge to deployed software.
          </h2>
          <p className="text-sm sm:text-base text-[var(--mute)] mt-3.5 leading-relaxed">
            Select any stage below to inspect the work, the deliverables, and how we collaborate with your team at every step.
          </p>
        </div>

        {/* Interactive Layout: Left Stepper, Right Visual Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Interactive Stepper (accessible tablist) */}
          <div
            role="tablist"
            aria-label="Development stages"
            className="lg:col-span-5 flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none -mx-2 px-2 sm:mx-0 sm:px-0"
          >
            {STAGES.map((stage, i) => {
              const Icon = stage.icon;
              const isActive = activeStage === i;
              const isPast = activeStage > i;

              return (
                <button
                  key={stage.id}
                  id={`stage-tab-${stage.id}`}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls={`stage-panel-${stage.id}`}
                  onClick={() => setActiveStage(i)}
                  className={`group relative text-left p-3.5 sm:p-4 rounded-xl transition-all duration-200 border shrink-0 sm:shrink lg:shrink-0 w-[220px] sm:w-[260px] lg:w-full cursor-pointer ${
                    isActive
                      ? "bg-white border-[var(--pur)] shadow-[0_6px_24px_rgba(87,80,168,0.1)]"
                      : "bg-[var(--paper)]/70 hover:bg-white border-[var(--peri)]/70 hover:border-[var(--peri)] text-[var(--mute)]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Number & Icon badge */}
                    <div
                      className={`w-9 h-9 rounded-lg grid place-items-center shrink-0 font-mono text-xs font-bold transition-colors ${
                        isActive
                          ? "bg-[var(--deep)] text-white"
                          : isPast
                          ? "bg-[#edfbf4] text-[#16875b] border border-[#c2eed8]"
                          : "bg-white text-[var(--pur)] border border-[var(--peri)]"
                      }`}
                    >
                      {isPast ? <Check className="w-4 h-4" /> : stage.n}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className={`text-sm font-bold truncate ${
                            isActive ? "text-[var(--deep)]" : "text-[#494770] group-hover:text-[var(--deep)]"
                          }`}
                        >
                          {stage.label}
                        </span>
                        <Icon
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            isActive ? "text-[var(--or)]" : "text-[var(--mute)]/60 group-hover:text-[var(--pur)]"
                          }`}
                        />
                      </div>
                      <p className="text-[11px] text-[var(--mute)] truncate mt-0.5 font-medium">
                        {stage.title}
                      </p>
                    </div>
                  </div>

                  {/* Active highlight indicator */}
                  {isActive && (
                    <div className="hidden lg:block absolute -left-1 top-3 bottom-3 w-1.5 rounded-full bg-[var(--or)]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Stage Details & Visual Sandbox */}
          <div
            id={`stage-panel-${current.id}`}
            role="tabpanel"
            aria-labelledby={`stage-tab-${current.id}`}
            className="lg:col-span-7 bg-white border border-[rgba(21,19,74,0.12)] p-4 sm:p-7 lg:p-8 rounded-xl sm:rounded-2xl shadow-[0_12px_40px_rgba(87,80,168,0.06)] space-y-5 sm:space-y-6"
          >
            {/* Stage Header & Deliverable */}
            <div className="space-y-3 pb-5 border-b border-[rgba(21,19,74,0.08)]">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--pur)] flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-[var(--paper)] text-[var(--pur)] font-bold text-[11px] grid place-items-center border border-[var(--peri)]">
                    {current.n}
                  </span>
                  <span>STAGE {current.n} · {current.label.toUpperCase()}</span>
                </span>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--paper)] border border-[var(--peri)] text-[11px] font-mono text-[var(--deep)] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--or)]" />
                  <span>Deliverable</span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--deep)] tracking-tight leading-snug">
                {current.title}
              </h3>

              <p className="text-sm sm:text-base text-[var(--mute)] leading-relaxed">
                {current.description}
              </p>

              {/* What You Get / Deliverable badge */}
              <div className="p-3 sm:px-4 sm:py-3 rounded-xl bg-[var(--paper)] border border-[var(--peri)] flex items-start gap-2.5 text-xs text-[var(--deep)] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#16875b] shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--pur)] font-bold block mb-0.5">
                    What comes out of this stage
                  </span>
                  <span>{current.deliverable}</span>
                </div>
              </div>
            </div>

            {/* Dynamic Stage Visual Sandbox */}
            <div className="p-3 sm:p-4 lg:p-5 rounded-lg sm:rounded-xl bg-[var(--paper)]/70 border border-[var(--peri)]/70">
              {renderVisual()}
            </div>

            {/* Step Controls (Back / Next) */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveStage(Math.max(0, activeStage - 1))}
                disabled={activeStage === 0}
                className="btn sm ghost inline-flex items-center gap-1.5 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous Stage</span>
              </button>

              {next ? (
                <button
                  type="button"
                  onClick={() => setActiveStage(activeStage + 1)}
                  className="btn sm inline-flex items-center gap-1.5 text-xs font-bold"
                >
                  <span>Next: {next.label}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <Link
                  href="/contact#form"
                  className="btn sm inline-flex items-center gap-1.5 text-xs font-bold"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
    </section>
  );
}
