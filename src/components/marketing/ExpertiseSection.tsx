"use client";

import * as React from "react";
import Link from "next/link";
import { Bot, Laptop, Database, Workflow, ArrowRight } from "lucide-react";

const capabilities = [
  {
    title: "AI Receptionists & Intelligent Systems",
    subtitle: "Conversational Intake",
    accent: "#8478e0",
    icon: Bot,
    description:
      "Conversational voice agents and natural text intake that answer calls 24/7 in your brand's voice, reserve live calendar slots, and escalate urgent inquiries to staff.",
    badge: "Flagship Offering",
  },
  {
    title: "Custom Software & Applications",
    subtitle: "Digital Platforms",
    accent: "#ef7a5e",
    icon: Laptop,
    description:
      "High-performance Next.js web applications, client self-service portals, and internal dispatch dashboards built for zero-training staff adoption.",
    badge: "Full-Stack Engineering",
  },
  {
    title: "CRM, Data & Platform Architecture",
    subtitle: "Single Source of Truth",
    accent: "#5750a8",
    icon: Database,
    description:
      "Normalized relational databases (PostgreSQL/Supabase) and role-based permissions where every customer record, call transcript, and deal status stays in sync.",
    badge: "Data Architecture",
  },
  {
    title: "Automation & Integrations",
    subtitle: "Autonomous Relays",
    accent: "#fd9150",
    icon: Workflow,
    description:
      "Event-driven background workflows, automated 2-way SMS appointment reminders, and resilient API bridges to your existing accounting and legacy systems.",
    badge: "Resilient Pipelines",
  },
];

export function ExpertiseSection() {
  return (
    <section id="expertise" className="py-14 sm:py-20" style={{ borderTop: "1px solid var(--peri)" }}>
      <div className="wrap">
        <div className="max-w-3xl mb-12">
          <span className="k">Our Engineering Capabilities</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--deep)] tracking-tight mt-2 leading-tight">
            The expertise behind your custom product.
          </h2>
          <p className="lead2 mt-3">
            We don’t sell rigid off-the-shelf software packages. Instead, we assemble the right combination of intelligence, database architecture, and full-stack engineering around your operational bottlenecks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className="bg-white border border-[rgba(21,19,74,0.12)] p-7 sm:p-9 shadow-[0_12px_30px_rgba(87,80,168,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(87,80,168,0.12)] flex flex-col justify-between group"
                style={{
                  borderTop: `4px solid ${cap.accent}`,
                  clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)",
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div
                      className="w-10 h-10 rounded-md flex items-center justify-center text-white shrink-0 shadow-sm"
                      style={{ backgroundColor: cap.accent }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--mute)] bg-[var(--paper)] px-3 py-1 border border-[var(--peri)]">
                      {cap.badge}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--pur)]">
                    {cap.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--deep)] mt-1 mb-3 group-hover:text-[var(--or)] transition-colors">
                    {cap.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[var(--mute)] leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[var(--mist)] flex items-center justify-between">
                  <span className="text-xs font-mono text-[var(--mute)]">Interconnected Architecture</span>
                  <Link
                    href="/how-it-works"
                    className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--deep)] group-hover:text-[var(--or)] inline-flex items-center gap-1 transition-colors"
                  >
                    See How It Connects <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/how-it-works"
            className="btn ghost inline-flex items-center gap-2"
          >
            <span>Explore our full engineering architecture</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
