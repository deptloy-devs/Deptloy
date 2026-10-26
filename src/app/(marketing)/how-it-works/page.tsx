import type { Metadata } from "next";
import Link from "next/link";
import {
  Bot,
  Database,
  Workflow,
  Globe,
  Server,
  Wrench,
  Sparkles,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  Terminal,
  Activity,
  Zap,
} from "lucide-react";
import { HowItWorksInteractive } from "./HowItWorksInteractive";

export const metadata: Metadata = {
  title: "How It Works: End-to-End Custom Software Engineering — Deptloy",
  description:
    "We don't sell disconnected tools. We bring full-stack engineering expertise to design, build, host, and maintain custom software tailored to your business — combining Voice AI, CRM, automations, and web apps.",
  alternates: { canonical: "/how-it-works" },
};

const capabilities = [
  {
    title: "Conversational Voice AI & Autonomous Intake",
    tag: "Voice & Text Ingestion",
    color: "#8478e0",
    icon: Bot,
    summary:
      "Sub-500ms voice agents that sound completely human, converse with nuance, check real calendar slots, and capture emergency caller notes.",
    points: [
      "24/7 call intake with zero hold times or busy signals",
      "Real-time calendar slot reservation & rescheduling",
      "Understands pricing, hours, and custom business protocols",
      "Automatic call transcript generation & audio logging",
    ],
  },
  {
    title: "Custom Relational Core & CRM Pipelines",
    tag: "Single Source of Truth",
    color: "#5750a8",
    icon: Database,
    summary:
      "A tailored PostgreSQL database and visual pipeline shaped exactly around how your business sells, dispatches, and fulfills.",
    points: [
      "Zero manual data entry: calls, forms & texts log automatically",
      "Custom role-based permissions for staff, managers & techs",
      "Unified customer timeline with lifetime interaction history",
      "100% data sovereignty — you own your tables and code",
    ],
  },
  {
    title: "Autonomous Event-Driven Automations",
    tag: "Background Execution",
    color: "#fd9150",
    icon: Workflow,
    summary:
      "Intelligent background relays that handle client reminders, staff dispatch notifications, and post-service reviews without human lag.",
    points: [
      "Instant SMS/email confirmation right after a call ends",
      "Two-way natural language reminder sequences that cut no-shows",
      "Real-time Slack or phone alerts when human triage is needed",
      "Automated review requests sent right after jobs are marked won",
    ],
  },
  {
    title: "High-Performance Frontends & Portals",
    tag: "Digital Experience",
    color: "#ef7a5e",
    icon: Globe,
    summary:
      "Sub-second Next.js web applications, client self-service booking portals, and mobile-ready admin dashboards engineered to convert.",
    points: [
      "Frictionless 30-second mobile booking flows",
      "Client portals for viewing past work, invoices & rescheduling",
      "Internal dispatch screens built for high-speed front desks",
      "Direct API sync to legacy accounting, EHR, or ERP tools",
    ],
  },
];

const engineeringPillars = [
  {
    icon: Server,
    title: "Backend & Relational Architecture",
    badge: "Data Sovereignty",
    color: "#8478e0",
    desc: "We architect clean, scalable relational databases (PostgreSQL, Supabase, Redis) and event-driven webhook relays. You own your data completely with zero proprietary vendor lock-in.",
    highlights: ["PostgreSQL / Supabase", "Normalized relational schemas", "100% client data ownership"],
  },
  {
    icon: Sparkles,
    title: "Usability & Zero-Training UX",
    badge: "Team Adoption",
    color: "#5750a8",
    desc: "Software that your team doesn't use is worthless. We design minimal, high-clarity interfaces tailored to how your non-technical staff actually operate, enabling full adoption within 15 minutes.",
    highlights: ["High-contrast typography", "Zero cognitive clutter", "15-minute onboarding curve"],
  },
  {
    icon: Wrench,
    title: "Continuous Maintenance & SRE",
    badge: "24/7 Production Care",
    color: "#fd9150",
    desc: "We actively monitor API tokens, carrier phone connections, and AI prompt performance. When carriers change policies or third-party APIs update, we patch systems proactively before you notice.",
    highlights: ["24/7 uptime & carrier health", "Prompt drift defense", "Proactive zero-downtime patches"],
  },
  {
    icon: Layers,
    title: "Modular Expansion & Scale",
    badge: "Zero-Rewrite Growth",
    color: "#ef7a5e",
    desc: "Start with an AI receptionist to capture lost calls. When your transaction volume doubles, plug in custom invoicing, multi-location support, or client portals into the exact same database without rewrites.",
    highlights: ["Event-driven modular design", "Multi-location expansion", "Scales to millions of events"],
  },
  {
    icon: ShieldCheck,
    title: "High-Availability Hosting & Security",
    badge: "Bank-Grade Guardrails",
    color: "#3ccf91",
    desc: "Sub-500ms global edge delivery on isolated cloud infrastructure. Your customer conversations and records are protected with TLS 1.3 encryption and never used to train public AI models.",
    highlights: ["Isolated cloud execution", "TLS 1.3 & AES-256 encryption", "Strict privacy & compliance"],
  },
  {
    icon: Cpu,
    title: "API Bridges & Legacy System Sync",
    badge: "Native Interop",
    color: "#2fb67c",
    desc: "We bridge legacy EHRs, Dentrix, MLS feeds, QuickBooks, and proprietary SQL systems into modern webhook pipelines, turning outdated legacy databases into modern automated workflows.",
    highlights: ["Custom REST/GraphQL relays", "Two-way legacy EHR sync", "Fault-tolerant webhook retries"],
  },
];

const methodologySteps = [
  {
    step: "01",
    phase: "Technical Discovery & Blueprint",
    timing: "Days 1–2",
    title: "We map your bottleneck down to the exact data flow.",
    desc: "We analyze your phone call volume, intake drop-offs, booking bottlenecks, and existing software stack. We produce an architectural blueprint with fixed scope, clear milestones, and guaranteed delivery dates.",
    deliverable: "System architecture blueprint & fixed project specification",
  },
  {
    step: "02",
    phase: "Prototype & Staging Sandbox",
    timing: "Days 3–5",
    title: "Test live phone calls and pipelines before touching production.",
    desc: "We train the conversational voice model on your business knowledge base, configure calendar synchronization rules, and spin up an isolated staging sandbox. You can dial a real phone number to test edge cases firsthand.",
    deliverable: "Private staging environment & live phone test sandbox",
  },
  {
    step: "03",
    phase: "Full-Stack Engineering & Data Migration",
    timing: "Weeks 1–2",
    title: "We engineer the database, automations, and custom interfaces.",
    desc: "We build your clean PostgreSQL tables, configure webhook listeners, craft the zero-training user interface, and securely migrate your existing customer records so you lose zero operational history.",
    deliverable: "Production codebase, verified schemas, and migrated data records",
  },
  {
    step: "04",
    phase: "Zero-Downtime Cutover & Onboarding",
    timing: "Launch Day",
    title: "Seamless cutover with zero interrupted customer calls.",
    desc: "We configure telephony forwarding rules, verify carrier health, and walk your team through their new dashboard. Your staff requires only 15 minutes to master the intuitive layout.",
    deliverable: "Live carrier activation, team walkthrough & operational runbook",
  },
  {
    step: "05",
    phase: "Autonomous Maintenance & SRE",
    timing: "Continuous",
    title: "We manage and patch the system so you never need an in-house DevOps team.",
    desc: "Software isn't static. We continuously tune AI prompts to prevent drift, patch API breaking changes, monitor carrier uptime, and deliver modular features as your business expands.",
    deliverable: "24/7 uptime monitoring, SLA support & ongoing feature roadmap",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="wrap">
        {/* Top Hero */}
        <div className="max-w-4xl">
          <span className="k">The Deptloy Engineering Architecture</span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--deep)] mt-3 leading-tight">
            We don’t sell tools. We engineer custom systems that outlast the hype.
          </h1>
          <p className="lead2 max-w-3xl mt-6">
            Instead of forcing your business into rigid off-the-shelf SaaS subscriptions taped together with fragile Zaps, we apply full-stack engineering expertise to design, build, host, and maintain software built specifically around how your company operates.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/contact#appointment" className="btn">
              Book technical discovery call
            </Link>
            <a href="#architecture" className="btn ghost">
              Explore the engineering ↓
            </a>
          </div>

          {/* Key Value Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 pt-8 border-t border-[var(--peri)]">
            <div>
              <div className="font-mono text-2xl font-extrabold text-[var(--deep)]">100%</div>
              <div className="text-xs font-mono uppercase text-[var(--mute)] mt-1">Data Sovereignty</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-extrabold text-[var(--deep)]">&lt; 500ms</div>
              <div className="text-xs font-mono uppercase text-[var(--mute)] mt-1">Voice AI Latency</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-extrabold text-[var(--deep)]">15 Mins</div>
              <div className="text-xs font-mono uppercase text-[var(--mute)] mt-1">Team Onboarding</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-extrabold text-[var(--deep)]">24/7/365</div>
              <div className="text-xs font-mono uppercase text-[var(--mute)] mt-1">Proactive SRE Care</div>
            </div>
          </div>
        </div>

        {/* Section: The Paradigm Shift (SaaS Fragmentation vs Deptloy Custom Engine) */}
        <div className="mt-28">
          <div className="mb-10 max-w-2xl">
            <span className="k">The Paradigm Shift</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--deep)]">
              Why piecemeal SaaS breaks down as you grow.
            </h2>
            <p className="text-[var(--mute)] text-sm sm:text-base mt-2">
              Most businesses end up with 5 or 6 different disconnected apps. Here is the difference between duct-taping off-the-shelf tools and having Deptloy engineer your unified platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Fragile SaaS Trap */}
            <div
              className="bg-white border border-red-200 p-8 shadow-[0_12px_30px_rgba(239,122,94,0.08)]"
              style={{
                clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)",
                borderTop: "4px solid #ef7a5e",
              }}
            >
              <div className="flex items-center gap-2 text-[#ef7a5e] font-mono text-xs font-bold uppercase tracking-wider mb-4">
                <XCircle className="w-4 h-4" />
                <span>The Fragile SaaS Trap</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-[var(--deep)] mb-4">
                5+ subscriptions, duplicate data &amp; recurring breakage
              </h3>
              <ul className="space-y-3.5 text-sm text-[var(--mute)]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#ef7a5e] font-bold">✕</span>
                  <span><strong>Monthly subscription tax:</strong> Paying \$1,200+/month for features your team only uses 10% of.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#ef7a5e] font-bold">✕</span>
                  <span><strong>Silent automation failures:</strong> Webhooks fail silently when third-party schemas update, losing leads unnoticed.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#ef7a5e] font-bold">✕</span>
                  <span><strong>Data hostage:</strong> Customer records, recordings, and history are trapped across disconnected proprietary silos.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#ef7a5e] font-bold">✕</span>
                  <span><strong>Cluttered, bloated UX:</strong> Front-desk staff fight confusing menus and refuse to enter data consistently.</span>
                </li>
              </ul>
            </div>

            {/* The Deptloy Unified Engine */}
            <div
              className="bg-white border border-[var(--pur)] p-8 shadow-[0_16px_40px_rgba(87,80,168,0.12)]"
              style={{
                clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)",
                borderTop: "4px solid var(--pur)",
              }}
            >
              <div className="flex items-center gap-2 text-[var(--pur)] font-mono text-xs font-bold uppercase tracking-wider mb-4">
                <CheckCircle2 className="w-4 h-4" />
                <span>The Deptloy Unified Engine</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-[var(--deep)] mb-4">
                One sovereign database, tailored UX &amp; full engineering care
              </h3>
              <ul className="space-y-3.5 text-sm text-[var(--deep)]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[var(--or)] font-bold">✓</span>
                  <span><strong>Single source of truth:</strong> Relational PostgreSQL core where calls, texts, deals, and notes connect seamlessly.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[var(--or)] font-bold">✓</span>
                  <span><strong>Continuous SRE maintenance:</strong> Our engineers monitor carrier routes, API health, and AI prompts so you never maintain code.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[var(--or)] font-bold">✓</span>
                  <span><strong>Complete data sovereignty:</strong> You own 100% of your data, schemas, and assets with zero proprietary lock-in.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[var(--or)] font-bold">✓</span>
                  <span><strong>Zero-training simplicity:</strong> Interfaces designed for speed; new team members can use the system on day one.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section: Technical Building Blocks (What We Build) */}
        <div id="architecture" className="mt-28">
          <div className="mb-10 max-w-3xl">
            <span className="k">The Ingredients</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--deep)]">
              The building blocks we compose for your product.
            </h2>
            <p className="lead2 mt-2">
              We do not treat these as isolated items you pick from a catalog. Instead, we use our mastery of each layer to craft whatever unified software solution your business demands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="bg-white border border-[rgba(21,19,74,0.12)] p-8 sm:p-10 shadow-[0_12px_30px_rgba(87,80,168,0.06)] flex flex-col justify-between"
                  style={{
                    borderLeft: `5px solid ${cap.color}`,
                    clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)",
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className="w-10 h-10 rounded-sm flex items-center justify-center text-white"
                        style={{ backgroundColor: cap.color }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--mute)] bg-[var(--paper)] px-3 py-1 border border-[var(--peri)]">
                        {cap.tag}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-2xl text-[var(--deep)] mb-3">
                      {cap.title}
                    </h3>
                    <p className="text-sm text-[var(--mute)] leading-relaxed mb-6">
                      {cap.summary}
                    </p>

                    <ul className="space-y-2 text-sm text-[var(--deep)] font-medium mb-6">
                      {cap.points.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2
                            className="w-4 h-4 shrink-0 mt-0.5"
                            style={{ color: cap.color }}
                          />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[var(--mist)] flex items-center justify-between">
                    <span className="text-xs font-mono text-[var(--mute)]">Interconnected &amp; Maintained</span>
                    <Link
                      href="/contact#appointment"
                      className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--deep)] hover:text-[var(--or)] inline-flex items-center gap-1 transition-colors"
                    >
                      Scope This Layer →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section: How We Do It (Backend, Maintenance, Usability, Hosting, Expansion) */}
        <div className="mt-28">
          <div className="mb-10 max-w-3xl">
            <span className="k">Engineering Discipline</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--deep)]">
              How we do it: Full-lifecycle software stewardship.
            </h2>
            <p className="lead2 mt-2">
              Writing code is only 20% of the challenge. The real value is in how the software lives, performs, updates, and scales alongside your business over five to ten years.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {engineeringPillars.map((pillar) => {
              const PillarIcon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="bg-white border border-[rgba(21,19,74,0.12)] p-7 space-y-4 shadow-[0_12px_30px_rgba(87,80,168,0.06)] flex flex-col justify-between"
                  style={{
                    borderTop: `4px solid ${pillar.color}`,
                    clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)",
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className="w-9 h-9 rounded-sm flex items-center justify-center text-white"
                        style={{ backgroundColor: pillar.color }}
                      >
                        <PillarIcon className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--mute)] bg-[var(--paper)] px-2.5 py-0.5 border border-[var(--peri)]">
                        {pillar.badge}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-[var(--deep)] mb-2">
                      {pillar.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed mb-4">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[var(--mist)] space-y-1.5">
                    {pillar.highlights.map((h, i) => (
                      <div key={i} className="text-xs font-mono text-[var(--deep)] flex items-center gap-1.5">
                        <span className="text-[var(--or)]">›</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section: 5-Step Execution Methodology */}
        <div className="mt-28">
          <div className="mb-12 max-w-3xl">
            <span className="k">Predictable Delivery</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--deep)]">
              Our 5-step engineering methodology.
            </h2>
            <p className="lead2 mt-2">
              From our first diagnostic call to live multi-carrier cutover, every step is transparent, tested, and protected by fixed-price deliverables.
            </p>
          </div>

          <div className="space-y-6">
            {methodologySteps.map((m) => (
              <div
                key={m.step}
                className="bg-white border border-[rgba(21,19,74,0.12)] p-6 sm:p-8 flex flex-col md:flex-row md:items-start gap-6 shadow-[0_10px_25px_rgba(87,80,168,0.05)]"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)",
                }}
              >
                <div className="flex md:flex-col items-center md:items-start justify-between md:justify-start gap-2 shrink-0 md:w-36">
                  <span className="font-mono text-3xl font-extrabold text-[var(--or)]">
                    {m.step}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--mute)] bg-[var(--paper)] px-2.5 py-1 border border-[var(--peri)]">
                    {m.timing}
                  </span>
                </div>

                <div className="flex-1 space-y-2">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--pur)]">
                    {m.phase}
                  </div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--deep)]">
                    {m.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--mute)] leading-relaxed">
                    {m.desc}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 text-xs font-mono text-[var(--deep)] bg-[var(--mist)] px-3 py-1.5 rounded-sm">
                    <span className="font-bold text-[var(--or)]">Deliverable:</span>
                    <span>{m.deliverable}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive System Savings & Efficiency Calculator */}
        <HowItWorksInteractive />

        {/* Live Staging & Sandbox Banner */}
        <div
          className="mt-24 p-8 sm:p-12 bg-[var(--deep)] text-white flex flex-col md:flex-row md:items-center justify-between gap-8"
          style={{
            clipPath: "polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)",
          }}
        >
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--peri)] uppercase tracking-wider">
              <Terminal className="w-4 h-4 text-[var(--or)]" />
              <span>Isolated Staging Previews</span>
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Every client gets a private sandbox before anything goes live.
            </h3>
            <p className="text-xs sm:text-sm text-[#cfd2ee] leading-relaxed">
              We ingest your business knowledge base, configure calendar synchronization rules, and let your team test real phone calls and booking edge cases in an isolated preview sandbox. You launch only when 100% confident.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/demo"
              className="btn"
              style={{
                background: "transparent",
                border: "1.5px solid rgba(255,255,255,0.3)",
                color: "#fff",
              }}
            >
              Test Voice Demo
            </Link>
            <Link
              href="/contact#appointment"
              className="btn"
              style={{ background: "var(--or)", color: "var(--deep)" }}
            >
              Schedule System Scope
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}