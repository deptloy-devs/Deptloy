"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const processStages = [
  {
    step: "01",
    label: "Discover",
    title: "We map the operational bottleneck.",
    desc: "We analyze where your team loses time, how customer inquiries arrive, and which system boundaries stall execution. No speculative ideas—just concrete problem mapping.",
    output: "Architecture blueprint & fixed project scope",
  },
  {
    step: "02",
    label: "Design & Build",
    title: "We engineer and test the complete system.",
    desc: "Voice agents, normalized database schemas, custom user interfaces, and automations are engineered together and tested against real-world scenarios in a private staging sandbox.",
    output: "Working software & private test sandbox",
  },
  {
    step: "03",
    label: "Launch & Evolve",
    title: "Seamless cutover and long-term care.",
    desc: "We manage deployment, carrier telephony forwarding, and team onboarding (under 15 mins). Then we actively monitor APIs and prompts so your system never degrades as you scale.",
    output: "Zero-downtime launch & ongoing SRE care",
  },
];

export function ShortProcessSection() {
  return (
    <section id="process" className="py-20 sm:py-28" style={{ borderTop: "1px solid var(--peri)" }}>
      <div className="wrap">
        <div className="max-w-2xl mb-12">
          <span className="k">Our Engineering Methodology</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--deep)] tracking-tight mt-2 leading-tight">
            Three focused stages. One dedicated engineering partner.
          </h2>
          <p className="lead2 mt-2">
            Predictable milestones, fixed delivery timelines, and full transparency from initial technical discovery to post-launch maintenance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {processStages.map((stage) => (
            <div
              key={stage.step}
              className="bg-white border border-[rgba(21,19,74,0.12)] p-7 sm:p-8 flex flex-col justify-between shadow-[0_10px_25px_rgba(87,80,168,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(87,80,168,0.1)]"
              style={{
                clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)",
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-3xl font-extrabold text-[var(--or)]">
                    {stage.step}
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--pur)] bg-[var(--paper)] px-2.5 py-1 border border-[var(--peri)]">
                    {stage.label}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[var(--deep)] mb-3 leading-snug">
                  {stage.title}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed mb-6">
                  {stage.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--mist)]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--pur)] font-bold block mb-1">
                  Deliverable
                </span>
                <div className="text-xs font-semibold text-[var(--deep)] flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3ccf91] shrink-0 mt-0.5" />
                  <span>{stage.output}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/how-it-works"
            className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--deep)] hover:text-[var(--or)] inline-flex items-center gap-1.5 transition-colors"
          >
            <span>See our full 5-stage engineering lifecycle</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
