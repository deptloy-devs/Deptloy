import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Cpu, RefreshCw, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "About Deptloy — Software built to outlast the hype",
  description:
    "Deptloy is an engineered software studio combining AI receptionists, custom CRMs, automations, and custom apps into unified systems for businesses that run on people and phones.",
  alternates: { canonical: "/about" },
};

const pillars = [
  {
    icon: Layers,
    title: "Systems, not tools",
    desc: "A bolted-on chatbot solves one problem and creates three more. We map out the entire operational flow first so every component connects natively to your calendar, CRM, and team workflows.",
  },
  {
    icon: Cpu,
    title: "Plain-spoken engineering",
    desc: "No jargon, no buzzwords, and no speculative hype. You always know what we are building, why it was chosen, and how many hours or lost leads it reclaims for your business every week.",
  },
  {
    icon: ShieldCheck,
    title: "Production hardened",
    desc: "Our AI receptionists operate with sub-500ms voice latency, zero training data retention, and strict CRM write rules so hallucinations never compromise customer relationships.",
  },
  {
    icon: RefreshCw,
    title: "We stay after launch",
    desc: "Launch is only day one. We continuously monitor API connections, tune response parameters against real customer inquiries, and extend your system as your company scales.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="wrap">
        <span className="k">About Deptloy</span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--deep)] max-w-3xl">
          A software studio for businesses that run on calls, leads and customers.
        </h1>
        <p className="lead2 max-w-2xl">
          We combine AI voice agents, custom CRMs, workflow automations, and high-performance apps into unified, long-lasting systems shaped around how your business actually works.
        </p>

        {/* Narrative Section */}
        <div className="my-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[var(--mute)] leading-relaxed">
            <p>
              Most businesses don’t have an &ldquo;AI problem&rdquo; — they have a <strong>disconnection problem</strong>. Answering services lose context, inquiries get stuck in generic inboxes, customer notes never make it to the calendar, and follow-ups only happen if someone remembers to chase them.
            </p>
            <p>
              When software vendors sell isolated SaaS tools, they leave you to stitch together APIs, manage monthly subscription bloat, and troubleshoot fragile Zapier scripts that fail silently.
            </p>
            <p className="font-semibold text-[var(--deep)]">
              Deptloy was founded to replace that patchwork with one resilient, custom system. We design, engineer, deploy, and maintain the infrastructure so your front door never misses a customer and your staff never wastes hours on repetitive admin busywork.
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
                <span>Sub-500ms voice response latency for natural phone dialogue</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#3ccf91] shrink-0 mt-0.5" />
                <span>Bi-directional real-time calendar and CRM synchronization</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#3ccf91] shrink-0 mt-0.5" />
                <span>Dedicated cloud infrastructure with zero data resale</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#3ccf91] shrink-0 mt-0.5" />
                <span>Active weekly monitoring, rule tuning, and maintenance</span>
              </li>
            </ul>

            <div className="pt-4 border-t border-[rgba(21,19,74,0.1)]">
              <Link href="/#contact" className="btn w-full justify-center">
                Book a consultation
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
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
                  className="bg-white border border-[rgba(21,19,74,0.14)] p-8 transition-transform duration-300 hover:-translate-y-1"
                  style={{
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
      </div>
    </div>
  );
}
