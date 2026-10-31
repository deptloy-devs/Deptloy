"use client";

import * as React from "react";
import Link from "next/link";
import {
  Compass,
  Layout,
  Code2,
  Rocket,
  TrendingUp,
  Search,
  Layers,
  Target,
  Database,
  Eye,
  Network,
  ShieldCheck,
  Cloud,
  CheckCircle2,
  Key,
  Activity,
  Sparkles,
  GitBranch,
  ArrowRight,
  ArrowLeft,
  Check,
  Clock,
} from "lucide-react";

export interface StageActivity {
  step: string;
  title: string;
  detail: string;
  badge: string;
  badgeColor: string;
  icon: React.ElementType;
}

export interface Stage {
  id: string;
  n: string;
  label: string;
  shortTag: string;
  cadence: string;
  icon: React.ElementType;
  title: string;
  description: string;
  deliverable: string;
  activities: StageActivity[];
}

export const STAGES: Stage[] = [
  {
    id: "discover",
    n: "01",
    label: "Discover",
    shortTag: "Audit & Scope",
    cadence: "1–2 Kickoff Sessions",
    icon: Compass,
    title: "First, we understand your business.",
    description:
      "We learn how your business operates, identify operational challenges, and understand what your users actually need.",
    deliverable: "Clear requirements and project priorities",
    activities: [
      {
        step: "01",
        title: "Workflow Deep-Dive",
        detail: "Find manual bottlenecks and lost hours.",
        badge: "45-min call",
        badgeColor: "bg-[#fff7ed] text-[#ea580c] border-[#ffedd5]",
        icon: Search,
      },
      {
        step: "02",
        title: "Tech Feasibility",
        detail: "Review your existing CRM, tools, and APIs.",
        badge: "Zero prep needed",
        badgeColor: "bg-[var(--mist)] text-[var(--pur)] border-[var(--peri)]",
        icon: Layers,
      },
      {
        step: "03",
        title: "Scope Agreement",
        detail: "Lock fixed deliverables and milestone timeline.",
        badge: "No scope creep",
        badgeColor: "bg-[#edfbf4] text-[#16875b] border-[#c2eed8]",
        icon: Target,
      },
    ],
  },
  {
    id: "design",
    n: "02",
    label: "Design",
    shortTag: "Architecture & UI",
    cadence: "Interactive Blueprint",
    icon: Layout,
    title: "We turn the problem into a clear plan.",
    description:
      "We map user journeys, define essential features, plan integrations, and design the product experience before development begins.",
    deliverable: "Product blueprint, wireframes, and agreed scope",
    activities: [
      {
        step: "01",
        title: "User Journeys",
        detail: "Design screens around real team tasks.",
        badge: "Tailored UX",
        badgeColor: "bg-[var(--mist)] text-[var(--pur)] border-[var(--peri)]",
        icon: Layout,
      },
      {
        step: "02",
        title: "System Schemas",
        detail: "Model tables, webhooks, and backend logic.",
        badge: "PostgreSQL & APIs",
        badgeColor: "bg-[#fff7ed] text-[#ea580c] border-[#ffedd5]",
        icon: Database,
      },
      {
        step: "03",
        title: "Clickable Prototype",
        detail: "Test the interface before writing any code.",
        badge: "Figma walkthrough",
        badgeColor: "bg-[#edfbf4] text-[#16875b] border-[#c2eed8]",
        icon: Eye,
      },
    ],
  },
  {
    id: "build",
    n: "03",
    label: "Build",
    shortTag: "Engineering & QA",
    cadence: "Weekly Working Demos",
    icon: Code2,
    title: "We engineer and test your solution.",
    description:
      "We develop the frontend, backend, data systems, integrations, and useful AI capabilities needed to make the product work as one system.",
    deliverable: "A tested, working software product",
    activities: [
      {
        step: "01",
        title: "Full-Stack Build",
        detail: "Modern frontend and resilient backend systems.",
        badge: "Production code",
        badgeColor: "bg-[var(--mist)] text-[var(--pur)] border-[var(--peri)]",
        icon: Code2,
      },
      {
        step: "02",
        title: "Connected AI & Tools",
        detail: "Integrate telephony, CRM, and voice assistants.",
        badge: "Strict guardrails",
        badgeColor: "bg-[#fff7ed] text-[#ea580c] border-[#ffedd5]",
        icon: Network,
      },
      {
        step: "03",
        title: "Weekly Working Demos",
        detail: "Test working software in a live staging build.",
        badge: "Live sprint preview",
        badgeColor: "bg-[#edfbf4] text-[#16875b] border-[#c2eed8]",
        icon: ShieldCheck,
      },
    ],
  },
  {
    id: "launch",
    n: "04",
    label: "Launch",
    shortTag: "Deployment & Handover",
    cadence: "Pre-Flight & Go-Live",
    icon: Rocket,
    title: "We prepare your software for real use.",
    description:
      "We handle the agreed deployment process, validate important workflows, and help prepare your team to use the new system.",
    deliverable: "Deployed product and practical handover",
    activities: [
      {
        step: "01",
        title: "Edge Deployment",
        detail: "Deploy to cloud hosting with SSL and domain.",
        badge: "Zero downtime",
        badgeColor: "bg-[#edfbf4] text-[#16875b] border-[#c2eed8]",
        icon: Cloud,
      },
      {
        step: "02",
        title: "Pre-Flight Testing",
        detail: "Verify webhooks, live calls, and failovers.",
        badge: "End-to-end check",
        badgeColor: "bg-[#fff7ed] text-[#ea580c] border-[#ffedd5]",
        icon: CheckCircle2,
      },
      {
        step: "03",
        title: "Team Handover",
        detail: "Full repository, keys, and recorded guides.",
        badge: "100% code ownership",
        badgeColor: "bg-[var(--mist)] text-[var(--pur)] border-[var(--peri)]",
        icon: Key,
      },
    ],
  },
  {
    id: "evolve",
    n: "05",
    label: "Evolve",
    shortTag: "Growth & Optimization",
    cadence: "Ongoing Roadmap",
    icon: TrendingUp,
    title: "Your software can grow with your business.",
    description:
      "As your needs change, we can continue improving features, integrations, performance, and overall usability.",
    deliverable: "A roadmap for future improvements",
    activities: [
      {
        step: "01",
        title: "System Telemetry",
        detail: "Monitor latency, error logs, and API health.",
        badge: "99.9% uptime",
        badgeColor: "bg-[#edfbf4] text-[#16875b] border-[#c2eed8]",
        icon: Activity,
      },
      {
        step: "02",
        title: "Feedback Sprints",
        detail: "Roll out features based on real user requests.",
        badge: "Continuous polish",
        badgeColor: "bg-[#fff7ed] text-[#ea580c] border-[#ffedd5]",
        icon: Sparkles,
      },
      {
        step: "03",
        title: "Modular Expansion",
        detail: "Add new portals, tools, or automations anytime.",
        badge: "No vendor lock-in",
        badgeColor: "bg-[var(--mist)] text-[var(--pur)] border-[var(--peri)]",
        icon: GitBranch,
      },
    ],
  },
];

export function DevelopmentJourney() {
  const [activeStage, setActiveStage] = React.useState(0);
  const current = STAGES[activeStage];
  const next = STAGES[activeStage + 1];

  // Keyboard navigation for accessible tabs
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setActiveStage((prev) => (prev + 1) % STAGES.length);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setActiveStage((prev) => (prev - 1 + STAGES.length) % STAGES.length);
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
          style={{ fontSize: "clamp(26px, 3.6vw, 44px)", lineHeight: 1.15 }}
          className="font-extrabold text-[var(--deep)] tracking-tight"
        >
          A proven path from challenge to deployed software.
        </h2>
        <p className="text-xs sm:text-sm lg:text-base text-[var(--mute)] mt-2.5 sm:mt-3 leading-relaxed">
          Select any stage below to inspect our engineering process, concrete activities, deliverables, and team collaboration.
        </p>
      </div>

      {/* Interactive Compact Layout: Left Stepper (4 cols), Right Detail Card (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
        {/* Left Column: Interactive Stepper (Accessible tablist) */}
        <div
          role="tablist"
          aria-label="Development stages"
          onKeyDown={handleKeyDown}
          className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none -mx-2 px-2 sm:mx-0 sm:px-0"
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
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveStage(i)}
                className={`group relative text-left p-2.5 sm:p-3 rounded-xl transition-all duration-150 border shrink-0 sm:shrink lg:shrink-0 w-[180px] sm:w-[220px] lg:w-full cursor-pointer ${
                  isActive
                    ? "bg-white border-[var(--pur)] shadow-[0_4px_16px_rgba(87,80,168,0.08)]"
                    : "bg-[var(--paper)]/80 hover:bg-white border-[var(--peri)]/70 hover:border-[var(--peri)] text-[var(--mute)]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {/* Number Badge */}
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg grid place-items-center shrink-0 font-mono text-xs font-bold transition-colors ${
                      isActive
                        ? "bg-[var(--deep)] text-white"
                        : isPast
                        ? "bg-[#edfbf4] text-[#16875b] border border-[#c2eed8]"
                        : "bg-white text-[var(--pur)] border border-[var(--peri)]"
                    }`}
                  >
                    {isPast ? <Check className="w-3.5 h-3.5" /> : stage.n}
                  </div>

                  {/* Stage Label & Subtitle */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className={`text-xs sm:text-sm font-bold truncate ${
                          isActive ? "text-[var(--deep)]" : "text-[#494770] group-hover:text-[var(--deep)]"
                        }`}
                      >
                        {stage.label}
                      </span>
                      <Icon
                        className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                          isActive ? "text-[var(--or)]" : "text-[var(--mute)]/60 group-hover:text-[var(--pur)]"
                        }`}
                      />
                    </div>
                    <p className="text-[10.5px] text-[var(--mute)] truncate mt-0.5 font-medium">
                      {stage.shortTag}
                    </p>
                  </div>
                </div>

                {/* Desktop Active Accent Pill */}
                {isActive && (
                  <div className="hidden lg:block absolute -left-1 top-2.5 bottom-2.5 w-1 rounded-full bg-[var(--or)]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Column: Minimised, Direct Information Card */}
        <div
          id={`stage-panel-${current.id}`}
          role="tabpanel"
          aria-labelledby={`stage-tab-${current.id}`}
          className="lg:col-span-8 bg-white border border-[rgba(21,19,74,0.12)] p-4 sm:p-6 lg:p-7 rounded-xl sm:rounded-2xl shadow-[0_8px_32px_rgba(87,80,168,0.05)] space-y-4 sm:space-y-5"
        >
          {/* Header Row: Stage Name & Cadence */}
          <div className="space-y-2 pb-3.5 sm:pb-4 border-b border-[rgba(21,19,74,0.08)]">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--pur)] flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[var(--paper)] text-[var(--pur)] font-bold text-[10.5px] grid place-items-center border border-[var(--peri)]">
                  {current.n}
                </span>
                <span>STAGE {current.n} · {current.label.toUpperCase()}</span>
              </span>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--mist)] border border-[var(--peri)] text-[10.5px] font-mono text-[var(--pur)] font-semibold">
                <Clock className="w-3 h-3 text-[var(--or)]" />
                <span>{current.cadence}</span>
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold text-[var(--deep)] tracking-tight leading-snug">
              {current.title}
            </h3>

            <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed">
              {current.description}
            </p>
          </div>

          {/* Concrete Activities (3 scannable cards with badges & punchy outcomes) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[var(--pur)] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--or)]" />
                Execution Blueprint
              </span>
              <span className="text-[10px] font-mono text-[var(--mute)] font-medium">
                3 Direct Milestones
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {current.activities.map((act) => {
                const ActIcon = act.icon;
                return (
                  <div
                    key={act.title}
                    className="group relative p-3 sm:p-3.5 rounded-xl bg-[var(--paper)]/70 hover:bg-white border border-[var(--peri)]/80 hover:border-[var(--pur)]/40 shadow-2xs hover:shadow-[0_4px_16px_rgba(87,80,168,0.08)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between space-y-2"
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-md bg-white border border-[var(--peri)] grid place-items-center text-[var(--pur)] group-hover:text-[var(--or)] group-hover:border-[var(--or)]/40 transition-colors shadow-2xs">
                          <ActIcon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-[var(--mute)]">
                          {act.step}
                        </span>
                      </div>
                      <span
                        className={`text-[9.5px] font-mono font-bold px-2 py-0.5 rounded-full border whitespace-nowrap ${act.badgeColor}`}
                      >
                        {act.badge}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs sm:text-[12.5px] font-extrabold text-[var(--deep)] leading-snug">
                        {act.title}
                      </h4>
                      <p className="text-[11.5px] text-[var(--mute)] leading-relaxed mt-1 font-medium">
                        {act.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Deliverable Callout */}
          <div className="p-3 sm:px-4 sm:py-2.5 rounded-xl bg-[#edfbf4] border border-[#c2eed8] flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
            <div className="flex items-center gap-2.5 min-w-0">
              <CheckCircle2 className="w-4 h-4 text-[#16875b] shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#16875b] font-bold block">
                  Agreed Deliverable
                </span>
                <span className="text-xs sm:text-[13px] font-bold text-[var(--deep)] truncate block">
                  {current.deliverable}
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white text-[#16875b] border border-[#c2eed8] shrink-0 self-start sm:self-auto">
              Handover Milestone
            </span>
          </div>

          {/* Footer Navigation (Previous / Next) */}
          <div className="flex items-center justify-between gap-3 pt-1 border-t border-[rgba(21,19,74,0.06)]">
            <button
              type="button"
              onClick={() => setActiveStage(Math.max(0, activeStage - 1))}
              disabled={activeStage === 0}
              className="btn sm ghost inline-flex items-center gap-1.5 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <span className="text-[11px] font-mono text-[var(--mute)]">
              Stage {activeStage + 1} of {STAGES.length}
            </span>

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
