import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  ShieldCheck,
  Cpu,
  RefreshCw,
  Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Deptloy — Software built to outlast the hype",
  description:
    "Deptloy is a software engineering studio building custom products, connected platforms and intelligent systems around business needs.",
  alternates: { canonical: "/about" },
};

const pillars = [
  {
    icon: Layers,
    title: "Systems, not tools",
    color: "#8478e0",
    desc: "We understand the full workflow before choosing the right product architecture. Every component has a clear purpose and a place within the system.",
  },
  {
    icon: Cpu,
    title: "Plain-spoken engineering",
    color: "#5750a8",
    desc: "No jargon or speculative promises. We explain what we are building, why it matters and how we will evaluate whether it works.",
  },
  {
    icon: ShieldCheck,
    title: "Production hardened",
    color: "#fd9150",
    desc: "Reliability, privacy boundaries and understandable interfaces guide our engineering choices from prototype through production.",
  },
  {
    icon: RefreshCw,
    title: "We stay after launch",
    color: "#ef7a5e",
    desc: "Launch is only the start. We can monitor, improve and extend the product as your company changes.",
  },
];

const processSteps = [
  { step: "01", name: "Discover", desc: "Understand users, goals and existing workflows." },
  { step: "02", name: "Design", desc: "Architect one unified operational blueprint." },
  { step: "03", name: "Build", desc: "Engineer and test the complete product." },
  { step: "04", name: "Launch", desc: "Deploy with close initial monitoring and staff onboarding." },
  { step: "05", name: "Care", desc: "Support, improve and evolve the product." },
];

export default function AboutPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="wrap">
        <span className="k">About Deptloy Studio</span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--deep)] max-w-3xl">
          A software studio for businesses with ambitions beyond everyday apps.
        </h1>
        <p className="lead2 max-w-2xl">
          We design and engineer custom digital products, connecting the people, data and workflows that make your business unique.
        </p>

        {/* Narrative Section */}
        <div className="my-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[var(--mute)] leading-relaxed">
            <p>
              Every growing business develops its own processes, exceptions and ambitions. Standard applications can be useful, but eventually the team is forced to work around the software instead of the other way around.
            </p>
            <p>
              One company needs an internal operations platform. Another needs a client-facing product, a complex integration layer or an intelligent workflow. The solution should begin with the problem, not a preset list of features.
            </p>
            <p className="font-semibold text-[var(--deep)]">
              Deptloy brings product thinking and engineering expertise together. We design, build and support custom software so the technology matches the people and operations behind it.
            </p>
          </div>

          <div
            className="lg:col-span-5 bg-white border border-[rgba(21,19,74,0.14)] p-8 shadow-[0_20px_50px_rgba(87,80,168,0.12)] space-y-4"
            style={{
              clipPath: "polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)",
            }}
          >
            <h3 className="font-display font-bold text-2xl text-[var(--deep)]">
              Our Operating Standards
            </h3>
            <ul className="space-y-3 text-sm text-[var(--mute)] font-medium">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#3ccf91] shrink-0 mt-0.5" />
                <span>Architecture chosen for the performance and reliability each product needs</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#3ccf91] shrink-0 mt-0.5" />
                <span>Clear integration boundaries and reliable data flows</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#3ccf91] shrink-0 mt-0.5" />
                <span>Security and privacy requirements discussed from the start</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#3ccf91] shrink-0 mt-0.5" />
                <span>Maintenance and improvement options after launch</span>
              </li>
            </ul>

            <div className="pt-4 border-t border-[rgba(21,19,74,0.1)]">
              <Link href="/contact" className="btn w-full justify-center">
                Book a consultation
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="mt-20">
          <span className="k">How we operate</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--deep)] mb-10">
            Engineered for longevity.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="bg-white border border-[rgba(21,19,74,0.14)] p-8 transition-transform duration-300 hover:-translate-y-1 shadow-[0_12px_30px_rgba(87,80,168,0.06)]"
                  style={{
                    borderTop: `4px solid ${pillar.color}`,
                    clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)",
                  }}
                >
                  <div className="w-12 h-12 bg-[var(--paper)] border border-[var(--peri)] flex items-center justify-center text-[var(--pur)] mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-[var(--deep)] mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--mute)] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* The 5-Step Delivery Lifecycle */}
        <div className="mt-24 bg-white border border-[rgba(21,19,74,0.12)] p-8 sm:p-12 shadow-[0_16px_40px_rgba(87,80,168,0.08)]">
          <span className="k">Engagement Process</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--deep)] mb-2">
            How we partner with you
          </h2>
          <p className="text-sm text-[var(--mute)] max-w-2xl mb-8">
            From the first product conversation to ongoing improvements, we guide each stage of delivery.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {processSteps.map((s) => (
              <div key={s.step} className="p-4 bg-[var(--paper)] border border-[var(--peri)] space-y-1.5">
                <div className="font-mono text-sm font-bold text-[var(--or)]">{s.step}</div>
                <div className="font-bold text-sm text-[var(--deep)]">{s.name}</div>
                <p className="text-xs text-[var(--mute)] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-20 p-8 sm:p-12 bg-[var(--deep)] text-white flex flex-col md:flex-row items-center justify-between gap-8"
          style={{
            clipPath: "polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)",
          }}
        >
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono text-[var(--peri)] uppercase">Direct Engineering Consultation</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Let’s talk about how your business operates today.
            </h3>
            <p className="text-xs sm:text-sm text-[#cfd2ee] leading-relaxed">
              We’ll explore what the right custom product could look like, which users it should serve and how to get to a useful first release.
            </p>
          </div>

          <Link href="/contact" className="btn" style={{ background: "var(--or)", color: "var(--deep)" }}>
            Discuss Your Idea
          </Link>
        </div>
      </div>
    </div>
  );
}
