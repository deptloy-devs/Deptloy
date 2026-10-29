import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, Database, ArrowLeft, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy & Data Governance | Deptloy",
  description: "Overview of Deptloy's data privacy, data ownership, and governance practices.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
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
          Privacy &amp; Data Governance
        </h1>
        <p className="lead2 mt-2 text-sm sm:text-base">
          How Deptloy handles company information, customer inquiries, and system data.
        </p>

        <div className="mt-6 p-4 bg-white border-l-4 border-[var(--or)] text-xs text-[var(--mute)] shadow-sm">
          <strong>Notice Regarding Formal Agreements:</strong> This page outlines Deptloy&apos;s standard data protection philosophy and studio practices. Individual client engagements are governed by executed Master Services Agreements (MSAs) and customized Data Processing Addenda (DPAs).
        </div>

        <div className="mt-10 space-y-8 bg-white border border-[rgba(21,19,74,0.12)] p-6 sm:p-10 shadow-[0_12px_32px_rgba(87,80,168,0.06)]">
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[var(--deep)]">
              <Database className="w-4 h-4 text-[var(--pur)]" />
              <h2 className="text-lg font-bold">1. Client Data Isolation &amp; Sovereignty</h2>
            </div>
            <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed">
              Customer databases, appointment records, CRM tables, and operational workflows engineered by Deptloy are deployed into dedicated, client-owned or private environments. Your data belongs to you. We do not aggregate client data across organizations.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[var(--deep)]">
              <ShieldCheck className="w-4 h-4 text-[#16875b]" />
              <h2 className="text-lg font-bold">2. Zero Model Training on Client Records</h2>
            </div>
            <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed">
              Customer inquiries, call transcripts, intake documents, and internal operational data are never sold, rented, or used to train third-party public commercial AI foundation models.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[var(--deep)]">
              <Lock className="w-4 h-4 text-[var(--or)]" />
              <h2 className="text-lg font-bold">3. Encryption &amp; In-Transit Security</h2>
            </div>
            <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed">
              All web communication, telephony audio streams, and API handshakes utilize TLS 1.3 encryption in transit. Database backends and secure document repositories are configured with industry-standard encryption at rest.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[var(--deep)]">
              <Mail className="w-4 h-4 text-[var(--lav)]" />
              <h2 className="text-lg font-bold">4. Website Inquiries &amp; Communications</h2>
            </div>
            <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed">
              Contact requests and project inquiries submitted through this website are transmitted directly to our engineering team at <strong>deptloy@gmail.com</strong>. We only use this information to respond to your technical request.
            </p>
          </section>
        </div>

        <div className="mt-8 text-center text-xs text-[var(--mute)]">
          Questions regarding data handling or privacy architecture? Email{" "}
          <a href="mailto:deptloy@gmail.com" className="font-bold text-[var(--pur)] hover:underline">
            deptloy@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
