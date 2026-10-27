import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, FileText, Cpu, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service & Engagement | Deptloy",
  description: "Overview of Deptloy's software engineering engagement terms and service guidelines.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="py-14 sm:py-20">
      <div className="wrap max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-[var(--pur)] hover:text-[var(--deep)] mb-8"
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <span className="k">Studio Policy Overview</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--deep)] tracking-tight mt-1 leading-tight">
          Terms of Service &amp; Engagement
        </h1>
        <p className="lead2 mt-2 text-sm sm:text-base">
          Guidelines governing technical discovery, software engineering engagements, and website use.
        </p>

        <div className="mt-6 p-4 bg-white border-l-4 border-[var(--or)] text-xs text-[var(--mute)] shadow-sm">
          <strong>Notice Regarding Formal Agreements:</strong> These terms describe Deptloy&apos;s standard engineering process and working principles. Formal client engagements are governed by mutually executed project contracts, statements of work (SOWs), and service agreements.
        </div>

        <div className="mt-10 space-y-8 bg-white border border-[rgba(21,19,74,0.12)] p-6 sm:p-10 shadow-[0_12px_32px_rgba(87,80,168,0.06)]">
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[var(--deep)]">
              <Cpu className="w-4 h-4 text-[var(--pur)]" />
              <h2 className="text-lg font-bold">1. Technical Discovery &amp; Scope</h2>
            </div>
            <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed">
              Every custom software build or AI receptionist deployment begins with a structured discovery phase. We define data models, integration endpoints, and deliverables prior to commencing development, avoiding speculative scopes.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[var(--deep)]">
              <CheckCircle2 className="w-4 h-4 text-[#16875b]" />
              <h2 className="text-lg font-bold">2. Intellectual Property &amp; Code Ownership</h2>
            </div>
            <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed">
              Unless explicitly specified otherwise in writing under a custom licensing framework, clients retain full ownership of their custom application schemas, proprietary business logic, and internal databases upon delivery.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[var(--deep)]">
              <FileText className="w-4 h-4 text-[var(--or)]" />
              <h2 className="text-lg font-bold">3. Website Use &amp; Illustrative Demonstrations</h2>
            </div>
            <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed">
              The project blueprints and interactive simulators displayed on deptloy.com represent conceptual engineering architectures. They do not constitute binding architectural guarantees for third-party systems without prior technical discovery.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[var(--deep)]">
              <Scale className="w-4 h-4 text-[var(--lav)]" />
              <h2 className="text-lg font-bold">4. Telephony &amp; API Integrations</h2>
            </div>
            <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed">
              Where systems interface with external telephony carriers (e.g. Twilio) or third-party CRM platforms, clients maintain their respective carrier accounts and underlying compliance with local telecommunications regulations.
            </p>
          </section>
        </div>

        <div className="mt-8 text-center text-xs text-[var(--mute)]">
          Questions regarding engagement contracts? Email{" "}
          <a href="mailto:deptloy@gmail.com" className="font-bold text-[var(--pur)] hover:underline">
            deptloy@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
