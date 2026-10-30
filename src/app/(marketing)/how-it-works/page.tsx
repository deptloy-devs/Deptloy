import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  MonitorCheck,
  PackageCheck,
} from "lucide-react";
import { DevelopmentJourney } from "@/components/marketing/how-it-works/DevelopmentJourney";

export const metadata: Metadata = {
  title: "How We Work | Deptloy",
  description:
    "From your challenge to working software. Discover, design, build, launch, and evolve custom software and AI systems built around your business.",
  alternates: { canonical: "/how-it-works" },
};

const WORKING_POINTS = [
  {
    icon: ClipboardCheck,
    tag: "Milestone Contract",
    title: "Clear Scope",
    description:
      "Understand the requirements, priorities, and agreed deliverables before development begins.",
  },
  {
    icon: MonitorCheck,
    tag: "Visible Progress",
    title: "Visible Progress",
    description:
      "Review working features, provide feedback, and stay informed as development progresses.",
  },
  {
    icon: PackageCheck,
    tag: "Practical Handover",
    title: "Practical Handover",
    description:
      "Receive the agreed deployment, documentation, and guidance needed to start using your software.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="hiw-page">
      <div className="wrap">
        {/* ================================================================== */}
        {/* 1. COMPACT HERO                                                    */}
        {/* ================================================================== */}
        <section aria-labelledby="hero-title" className="mb-10 sm:mb-14 lg:mb-16">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--paper)] border border-[var(--peri)] text-xs font-mono font-bold uppercase tracking-wider text-[var(--pur)] mb-3.5">
              <span className="w-2 h-2 rounded-full bg-[#3ccf91] shrink-0" />
              <span>How We Work</span>
            </div>

            {/* Main Heading */}
            <h1
              id="hero-title"
              style={{ fontSize: "clamp(30px, 4.2vw, 48px)", lineHeight: 1.12 }}
              className="font-extrabold tracking-tight text-[var(--deep)]"
            >
              From your challenge to working software.
            </h1>

            {/* Supporting Description */}
            <p className="text-sm sm:text-base lg:text-lg text-[var(--mute)] mt-3 leading-relaxed max-w-2xl">
              Every great product starts with understanding the problem. We work with you to discover, design, build,
              and launch software around the way your business operates.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mt-5 sm:mt-6">
              <Link href="/contact#form" className="btn">
                Discuss your project
                <ArrowRight aria-hidden="true" />
              </Link>

              <Link href="/projects" className="btn ghost">
                Explore solutions
              </Link>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 2. INTERACTIVE FIVE-STAGE DEVELOPMENT JOURNEY                      */}
        {/* ================================================================== */}
        <DevelopmentJourney />

        {/* ================================================================== */}
        {/* 3. WHAT WORKING WITH DEPTLOY LOOKS LIKE                            */}
        {/* ================================================================== */}
        <section
          aria-labelledby="working-together-title"
          className="pt-10 sm:pt-14 lg:pt-16 pb-12 sm:pb-16 lg:pb-20 border-t border-[rgba(21,19,74,0.08)]"
        >
          <div className="max-w-2xl mb-6 sm:mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--pur)] bg-[var(--mist)] px-3 py-1 rounded-sm border border-[var(--peri)] inline-block mb-3">
              WORKING TOGETHER
            </span>
            <h2
              id="working-together-title"
              style={{ fontSize: "clamp(26px, 3.5vw, 40px)", lineHeight: 1.15 }}
              className="font-extrabold text-[var(--deep)] tracking-tight"
            >
              A clear process. No unnecessary complexity.
            </h2>
            <p className="text-sm sm:text-base text-[var(--mute)] mt-2.5 leading-relaxed">
              We eliminate technical ambiguity with upfront architecture, weekly demo verification, and complete
              deliverable handovers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {WORKING_POINTS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group bg-white border border-[rgba(21,19,74,0.1)] p-6 sm:p-7 rounded-2xl shadow-[0_4px_20px_rgba(87,80,168,0.04)] hover:border-[var(--pur)]/40 hover:-translate-y-0.5 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-[var(--paper)] text-[var(--pur)] border border-[var(--peri)]/60 grid place-items-center mb-5 group-hover:bg-[var(--deep)] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--mute)] block mb-1">
                      {item.tag}
                    </span>

                    <h3 className="text-lg sm:text-xl font-extrabold text-[var(--deep)] mb-2.5">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================================================== */}
        {/* 4. FINAL CONTACT CTA                                               */}
        {/* ================================================================== */}
        <section aria-labelledby="cta-title" className="pt-2 sm:pt-4">
          <div className="bl-cta border border-[rgba(87,80,168,0.14)] shadow-[0_12px_40px_rgba(87,80,168,0.05)]">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--pur)] bg-white px-2.5 py-0.5 rounded-sm border border-[var(--peri)] inline-block mb-3">
                LET&apos;S GET STARTED
              </span>

              <h2
                id="cta-title"
                style={{ fontSize: "clamp(26px, 3.2vw, 38px)", lineHeight: 1.15 }}
                className="font-extrabold text-[var(--deep)] tracking-tight"
              >
                Let&apos;s turn your challenge into a product.
              </h2>

              <p className="text-sm sm:text-base text-[var(--mute)] mt-3 leading-relaxed max-w-xl">
                Tell us what you&apos;re trying to solve. We&apos;ll help explore what the right software and practical AI could look like for your business.
              </p>

              <div className="mt-4 pt-3 border-t border-[rgba(87,80,168,0.12)] flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-[var(--mute)]">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16875b] shrink-0" />
                  Direct scope with principal engineers
                </span>
                <span className="opacity-40">•</span>
                <span>Zero sales pressure</span>
                <span className="opacity-40">•</span>
                <span>Fixed milestones &amp; deliverables</span>
              </div>
            </div>

            <div className="bl-cta-buttons">
              <Link className="btn" href="/contact#form">
                Discuss your project
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link className="btn ghost" href="/demo">
                Try our AI receptionist
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
