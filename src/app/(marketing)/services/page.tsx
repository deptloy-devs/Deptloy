import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Database,
  Workflow,
  Globe,
  CheckCircle2,
  Server,
  Wrench,
  Sparkles,
  ShieldCheck,
  Cpu,
  Layers,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services & Engineering Scope — Deptloy",
  description:
    "Explore Deptloy's core services: AI voice receptionists, custom CRMs, workflow automations, and custom web & mobile apps. Learn about our backend engineering, maintenance, and hosting.",
  alternates: { canonical: "/services" },
};

const coreServices = [
  {
    slug: "ai-receptionist",
    href: "/services/ai-receptionist",
    icon: Bot,
    name: "AI Receptionist",
    badge: "Voice & Text Ingestion",
    color: "#8478e0",
    headline: "Answers every phone call and chat in your brand’s voice, 24/7.",
    desc: "Sub-500ms response latency, live calendar slot locking, FAQ resolution from your verified business data, and immediate CRM lead transcription.",
    features: [
      "Real-time appointment booking, rescheduling, and calendar sync",
      "Triages emergency inquiries and forwards urgent callers to human staff",
      "Answers complex service, pricing, and operating questions accurately",
      "Attaches full conversation transcripts and audio notes to customer records",
    ],
  },
  {
    slug: "crm",
    href: "/services/crm",
    icon: Database,
    name: "Custom CRM",
    badge: "Single Source of Truth",
    color: "#5750a8",
    headline: "A customer system shaped around how your team actually sells.",
    desc: "Eliminate manual data entry. Inbound leads, call records, follow-up stages, and booking histories live in one clutter-free interface with custom role permissions.",
    features: [
      "Unified contact timeline with automated call logs and client notes",
      "Custom role permissions and team task assignment queues",
      "Visual sales pipelines with automated deal value calculation",
      "Executive analytics on lead throughput, conversion, and missed revenue",
    ],
  },
  {
    slug: "automation",
    href: "/services/automation",
    icon: Workflow,
    name: "Workflow Automation",
    badge: "Autonomous Execution",
    color: "#fd9150",
    headline: "Repetitive administrative busywork handled silently in the background.",
    desc: "Never lose a client to forgotten follow-ups. Automated confirmation SMS, 2-way natural language appointment reminders that cut no-shows, and team alerts.",
    features: [
      "Instant SMS and email confirmations sent immediately after calls end",
      "Two-way natural language reminder sequences that adapt to client replies",
      "Post-appointment review requests and recurring client nurture sequences",
      "Real-time alerts to team Slack, SMS, or email when human intervention is needed",
    ],
  },
  {
    slug: "development",
    href: "/services/development",
    icon: Globe,
    name: "Web & App Development",
    badge: "Digital Front Doors",
    color: "#ef7a5e",
    headline: "High-performance web and mobile platforms built to convert.",
    desc: "Fast, accessible Next.js websites, self-service client booking portals, and mobile-friendly admin dashboards engineered to connect directly with your back end.",
    features: [
      "Sub-second load times built on modern Next.js and edge architecture",
      "Frictionless 30-second appointment booking and client self-service portals",
      "Custom internal operations dashboards for staff dispatch and scheduling",
      "Engineered APIs connecting existing legacy tools with your new system",
    ],
  },
];

const lifecyclePillars = [
  {
    icon: Server,
    title: "Backend & Data Architecture",
    badge: "Data Sovereignty",
    color: "#8478e0",
    desc: "We architect clean, scalable relational databases (PostgreSQL, Supabase, Redis) and event-driven webhook relays. You own your data completely with zero proprietary vendor lock-in.",
  },
  {
    icon: Sparkles,
    title: "Usability & Zero-Training UX",
    badge: "Team Adoption",
    color: "#5750a8",
    desc: "Software that your team doesn't use is worthless. We design minimal, high-clarity interfaces tailored to how your non-technical staff actually operate, enabling full adoption within 15 minutes.",
  },
  {
    icon: Wrench,
    title: "Maintenance & Active Monitoring",
    badge: "Production SRE",
    color: "#fd9150",
    desc: "We actively monitor API tokens, carrier phone connections, and AI prompt performance. When carriers change policies or third-party APIs update, we patch systems proactively before you notice.",
  },
  {
    icon: Layers,
    title: "Modular Expansion & Scale",
    badge: "Zero-Rewrite Growth",
    color: "#ef7a5e",
    desc: "Start with an AI receptionist to capture lost calls. When your transaction volume doubles, plug in custom invoicing or client portals into the exact same database without costly rewrites.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Hosting & Privacy",
    badge: "Bank-Grade Guardrails",
    color: "#3ccf91",
    desc: "Sub-500ms global edge delivery on isolated cloud infrastructure. Your customer conversations and health records are protected with TLS 1.3 encryption and never used to train public AI models.",
  },
  {
    icon: Cpu,
    title: "API Bridges & Legacy Sync",
    badge: "Native Interop",
    color: "#2fb67c",
    desc: "We bridge legacy EHRs, Dentrix, MLS feeds, QuickBooks, and proprietary SQL systems into modern webhook pipelines, turning outdated legacy databases into modern automated workflows.",
  },
];

export default function ServicesPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="wrap">
        {/* Header */}
        <span className="k">Engineering Scope & Services</span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--deep)] max-w-3xl">
          The architecture that powers your business.
        </h1>
        <p className="lead2 max-w-2xl">
          We combine AI receptionists, custom CRMs, intelligent automation, and bespoke software into one production-hardened system. Here is what we build, how we engineer it, and how we keep it running for years.
        </p>

        {/* Section 1: The 4 Core Building Blocks */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--peri)]">
            <h2 className="text-2xl font-extrabold text-[var(--deep)]">
              Core Building Blocks
            </h2>
            <span className="text-xs font-mono font-semibold uppercase text-[var(--mute)]">
              Modular Integration
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {coreServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.slug}
                  className="bg-white border border-[rgba(21,19,74,0.14)] p-8 sm:p-10 flex flex-col justify-between shadow-[0_16px_40px_rgba(87,80,168,0.08)]"
                  style={{
                    borderTop: `4px solid ${service.color}`,
                    clipPath: "polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%)",
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-sm flex items-center justify-center text-white shrink-0"
                          style={{ backgroundColor: service.color }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="font-display font-bold text-2xl text-[var(--deep)]">
                          {service.name}
                        </h3>
                      </div>
                      <span className="text-xs font-mono font-medium uppercase tracking-wider text-[var(--mute)] bg-[var(--paper)] px-3 py-1 border border-[var(--peri)]">
                        {service.badge}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-lg text-[var(--deep)] mb-3">
                      {service.headline}
                    </h4>

                    <p className="text-sm sm:text-base text-[var(--mute)] leading-relaxed mb-6">
                      {service.desc}
                    </p>

                    <ul className="space-y-2.5 text-sm text-[var(--deep)] font-medium mb-8">
                      {service.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <CheckCircle2
                            className="w-4 h-4 shrink-0 mt-0.5"
                            style={{ color: service.color }}
                          />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-[rgba(21,19,74,0.1)] flex items-center justify-between flex-wrap gap-4">
                    <Link
                      href={service.href}
                      className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--deep)] hover:text-[var(--or)] transition-colors inline-flex items-center gap-1.5"
                    >
                      Deep Dive: {service.name} Scope <ArrowRight className="w-3.5 h-3.5 text-[var(--or)]" />
                    </Link>

                    <Link href="/contact" className="btn sm">
                      Get custom quote
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: How We Do It (Backend, Maintenance, Usability, Hosting) */}
        <div className="mt-24">
          <div className="mb-10">
            <span className="k">Engineering Discipline</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--deep)]">
              How we do it: Lifecycle & Infrastructure
            </h2>
            <p className="lead2 max-w-2xl">
              Software is only as good as its uptime, usability, and long-term maintainability. We don't just write code and disappear — we manage every layer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lifecyclePillars.map((pillar) => {
              const PillarIcon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="bg-white border border-[rgba(21,19,74,0.12)] p-7 space-y-4 shadow-[0_12px_30px_rgba(87,80,168,0.06)]"
                  style={{
                    borderLeft: `4px solid ${pillar.color}`,
                    clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)",
                  }}
                >
                  <div className="flex items-center justify-between">
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

                  <h3 className="font-display font-bold text-lg text-[var(--deep)]">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Staging & Deployment Sandbox Banner */}
        <div
          className="mt-20 p-8 sm:p-10 bg-[var(--deep)] text-white flex flex-col md:flex-row md:items-center justify-between gap-8"
          style={{
            clipPath: "polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)",
          }}
        >
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-mono text-[var(--peri)] uppercase tracking-wider">
              Safe Engineering Deployment
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Every client gets a private staging sandbox before going live.
            </h3>
            <p className="text-xs sm:text-sm text-[#cfd2ee] leading-relaxed">
              We ingest your business knowledge base, configure calendar synchronization rules, and let your team test real phone calls and booking edge cases in an isolated preview sandbox. You launch only when 100% confident.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/demo"
              className="btn"
              style={{ background: "transparent", border: "1.5px solid rgba(255,255,255,0.3)", color: "#fff" }}
            >
              Test Voice Demo
            </Link>
            <Link
              href="/contact"
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
