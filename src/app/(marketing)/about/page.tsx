import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  ShieldCheck,
  Cpu,
  RefreshCw,
  Layers,
  ArrowRight,
  User,
} from "lucide-react";

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37z" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "About Deptloy — Software built to outlast the hype",
  description:
    "Meet the engineering leadership behind Deptloy. We design and build custom software products, intelligent workflows, and connected business systems.",
  alternates: { canonical: "/about" },
};

interface FounderProfile {
  id: string;
  name: string;
  role: string;
  focus: string;
  bio: string;
  expertise: string[];
  linkedinUrl?: string;
  badge: string;
  accent: string;
}

// 3 Co-Founders Data Structure (Ready for immediate profile population)
const founders: FounderProfile[] = [
  {
    id: "founder-1",
    name: "[Co-Founder & Technical Lead]",
    role: "Co-Founder / Head of Architecture",
    focus: "Distributed Systems & Database Engineering",
    bio: "Guides system architecture, database modeling, cloud scalability, and secure infrastructure boundaries for Deptloy's custom enterprise platforms.",
    expertise: ["Relational Data Models", "Cloud Architecture", "System Performance"],
    badge: "Architecture",
    accent: "#8478e0",
  },
  {
    id: "founder-2",
    name: "[Co-Founder & AI Systems Lead]",
    role: "Co-Founder / Head of AI & Telephony",
    focus: "Conversational Voice AI & Telephony Infrastructure",
    bio: "Oversees real-time streaming speech models, carrier telephony integration, intent parsing, and deterministic agentic workflows.",
    expertise: ["Streaming Voice AI", "Telephony Pipelines", "Agent Guardrails"],
    badge: "AI Engineering",
    accent: "#fd9150",
  },
  {
    id: "founder-3",
    name: "[Co-Founder & Product Lead]",
    role: "Co-Founder / Head of Product & Engineering",
    focus: "Full-Stack Development & Enterprise UX",
    bio: "Drives full-stack web engineering, client portals, internal dispatch interfaces, and seamless third-party API interconnectivity.",
    expertise: ["Full-Stack Next.js", "Enterprise Portals", "API Integrations"],
    badge: "Product & Delivery",
    accent: "#ef7a5e",
  },
];

const pillars = [
  {
    icon: Layers,
    title: "Systems, not isolated tools",
    color: "#8478e0",
    desc: "We understand the full operational workflow before selecting the architecture. Every component has a defined purpose and reliable data handoffs.",
  },
  {
    icon: Cpu,
    title: "Direct engineer access",
    color: "#5750a8",
    desc: "You collaborate directly with senior software architects and AI engineers—not commissioned account executives or intermediaries.",
  },
  {
    icon: ShieldCheck,
    title: "Production hardened & private",
    color: "#fd9150",
    desc: "Your data stays in your dedicated database. Customer records and transcripts are encrypted and never used to train public third-party models.",
  },
  {
    icon: RefreshCw,
    title: "Stewardship beyond launch",
    color: "#ef7a5e",
    desc: "Deployment is the beginning of the product lifecycle. We provide ongoing telemetry monitoring, prompt tuning, and system extensions.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-14 sm:py-20">
      <div className="wrap">
        <span className="k">About Deptloy Studio</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--deep)] max-w-4xl mt-1 leading-tight">
          A software studio for businesses with ambitions beyond everyday apps.
        </h1>
        <p className="lead2 max-w-2xl text-sm sm:text-base mt-2">
          We design and engineer custom software systems and intelligent AI receptionists, connecting the people, data, and workflows that make your organization operate effectively.
        </p>

        {/* Narrative & Operating Standards */}
        <div className="my-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-[var(--mute)] leading-relaxed">
            <p>
              Growing businesses develop unique operational strengths, edge cases, and client expectations. Off-the-shelf software packages often force staff to reshape their work around rigid menus and siloed databases.
            </p>
            <p>
              When a company reaches that limit, it needs unified technology: a custom customer portal, an autonomous AI receptionist, or an internal operations hub that shares one single source of truth.
            </p>
            <p className="font-semibold text-[var(--deep)]">
              Deptloy was founded to solve this problem with disciplined, transparent engineering. We build software that serves your business—not the other way around.
            </p>
          </div>

          <div
            className="lg:col-span-5 bg-white border border-[rgba(21,19,74,0.14)] p-6 sm:p-7 shadow-[0_16px_40px_rgba(87,80,168,0.08)] space-y-4"
            style={{
              clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)",
            }}
          >
            <h2 className="font-display font-bold text-xl text-[var(--deep)]">
              Why Clients Trust Deptloy
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm text-[var(--mute)]">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#16875b] shrink-0 mt-0.5" />
                <span>Dedicated databases where you retain complete data ownership</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#16875b] shrink-0 mt-0.5" />
                <span>Clean API contracts connecting your existing tools and services</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#16875b] shrink-0 mt-0.5" />
                <span>Fixed turnkey architecture with clear delivery milestones</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#16875b] shrink-0 mt-0.5" />
                <span>Direct engineer communication before, during, and after deployment</span>
              </li>
            </ul>

            <div className="pt-2 border-t border-[rgba(21,19,74,0.08)]">
              <Link href="/contact#appointment" className="btn sm w-full justify-center">
                Book an Engineering Consultation
              </Link>
            </div>
          </div>
        </div>

        {/* Section: Meet the Founders (3 Co-Founders) */}
        <section className="my-14 sm:my-18">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="k">Leadership &amp; Engineering</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--deep)] tracking-tight mt-1">
                Meet the Founders
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[var(--mute)] max-w-md">
              Deptloy is led by three technical co-founders bringing together distributed systems architecture, voice AI engineering, and enterprise product delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {founders.map((founder) => (
              <article
                key={founder.id}
                className="bg-white border border-[rgba(21,19,74,0.13)] p-6 sm:p-7 shadow-[0_12px_32px_rgba(87,80,168,0.06)] flex flex-col justify-between transition-all duration-300 hover:shadow-[0_18px_40px_rgba(87,80,168,0.1)] group"
                style={{
                  borderTop: `4px solid ${founder.accent}`,
                  clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)",
                }}
              >
                <div>
                  {/* Photo / Avatar Placeholder Frame */}
                  <div className="relative mb-5">
                    <div
                      className="w-full h-44 rounded-sm flex flex-col items-center justify-center text-[var(--mute)] border border-dashed border-[var(--peri)] relative overflow-hidden"
                      style={{ background: "linear-gradient(135deg, var(--mist) 0%, #ffffff 100%)" }}
                    >
                      <div className="w-12 h-12 rounded-full bg-white border border-[var(--peri)] grid place-items-center text-[var(--pur)] shadow-sm mb-2 group-hover:scale-105 transition-transform">
                        <User className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono font-bold text-[var(--deep)]">
                        {founder.badge}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--mute)] uppercase tracking-wider mt-0.5">
                        Founder Profile Placeholder
                      </span>
                    </div>

                    <span
                      className="absolute top-2 right-2 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-white rounded-sm shadow-sm"
                      style={{ background: founder.accent }}
                    >
                      Co-Founder
                    </span>
                  </div>

                  {/* Name & Role */}
                  <div className="border-b border-[var(--mist)] pb-3 mb-3">
                    <h3 className="text-lg font-bold text-[var(--deep)] leading-snug">
                      {founder.name}
                    </h3>
                    <p className="text-xs font-mono font-semibold text-[var(--pur)] mt-0.5">
                      {founder.role}
                    </p>
                    <span className="text-[11px] text-[var(--mute)] block mt-0.5">
                      {founder.focus}
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed mb-4">
                    {founder.bio}
                  </p>

                  {/* Expertise Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {founder.expertise.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono font-semibold text-[var(--deep)] bg-[var(--paper)] px-2 py-0.5 border border-[var(--peri)] rounded-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer with LinkedIn Link Placeholder */}
                <div className="pt-3 border-t border-[var(--mist)] flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-[var(--mute)]">
                    Deptloy Leadership
                  </span>
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[var(--pur)] hover:text-[var(--or)] transition-colors cursor-pointer">
                    <LinkedinIcon className="w-3.5 h-3.5 text-[#0077b5]" />
                    <span>LinkedIn</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-4 p-3 bg-white/70 border border-[var(--peri)] text-[11px] font-mono text-[var(--mute)] text-center rounded-sm">
            Founder names, photos, and public profiles will be announced as Deptloy formalizes its public registry.
          </div>
        </section>

        {/* 4 Core Pillars Grid */}
        <section className="my-14 sm:my-18">
          <span className="k">Our Engineering Philosophy</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--deep)] mb-8">
            Engineered for longevity.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="bg-white border border-[rgba(21,19,74,0.14)] p-6 sm:p-8 transition-transform duration-300 hover:-translate-y-1 shadow-[0_12px_30px_rgba(87,80,168,0.06)]"
                  style={{
                    borderTop: `4px solid ${pillar.color}`,
                    clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)",
                  }}
                >
                  <div className="w-10 h-10 bg-[var(--paper)] border border-[var(--peri)] flex items-center justify-center text-[var(--pur)] mb-4 rounded-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-[var(--deep)] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <div
          className="mt-14 p-7 sm:p-10 bg-[var(--deep)] text-white flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)",
          }}
        >
          <div className="space-y-1.5 max-w-2xl">
            <span className="text-xs font-mono text-[var(--peri)] uppercase">Direct Technical Consultation</span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Let’s talk about how your business operates today.
            </h3>
            <p className="text-xs sm:text-sm text-[#cfd2ee] leading-relaxed">
              We will explore what the right custom platform or AI receptionist could look like for your specific operational challenges.
            </p>
          </div>

          <Link href="/contact" className="btn shrink-0" style={{ background: "var(--or)", color: "var(--deep)", fontWeight: 700 }}>
            Discuss Your Idea <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
