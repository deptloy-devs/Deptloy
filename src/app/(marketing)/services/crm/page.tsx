"use client";

import * as React from "react";
import Link from "next/link";
import {
  Database,
  BarChart3,
  GitBranch,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  PieChart,
  Users,
  Shield,
  Layers,
  ArrowRight,
  Filter,
} from "lucide-react";

const pipelineStages = [
  {
    stage: "01. Intake",
    title: "New Inbound Inquiries",
    count: "24 Active",
    value: "$18,400",
    color: "#8478e0",
    items: ["Dr. Sarah Mitchell", "Apex Dental Studio", "Elena Rostova"],
  },
  {
    stage: "02. Qualified",
    title: "AI Triage & Budget Verified",
    count: "16 Verified",
    value: "$34,200",
    color: "#5750a8",
    items: ["Highland Health Group", "Summit Advisory", "Luxe Aesthetics"],
  },
  {
    stage: "03. Scheduled",
    title: "Consultation Confirmed",
    count: "9 Booked",
    value: "$42,000",
    color: "#fd9150",
    items: ["Pacific Brokerage", "Marcus Vance", "Beacon Capital"],
  },
  {
    stage: "04. Won / Active",
    title: "Ongoing System Retainer",
    count: "18 Live",
    value: "$86,500/mo",
    color: "#16875b",
    items: ["Aura Studio Franchise", "Metro Wellness", "Vanguard Mechanical"],
  },
];

const crmFeatures = [
  {
    icon: PhoneCall,
    title: "Automated Interaction Timeline",
    desc: "Every phone call recording, SMS thread, email exchange, and appointment note is automatically attached to the customer record with zero manual entry.",
  },
  {
    icon: Users,
    title: "Custom Role & Permission Queues",
    desc: "Front-desk, service providers, and executives only see the views relevant to their daily workflow. Assign tasks and round-robin leads seamlessly.",
  },
  {
    icon: GitBranch,
    title: "Dynamic Deal Stage Automations",
    desc: "When an appointment is completed or a contract signed, deals automatically advance to the next stage, triggering invoicing and review request sequences.",
  },
  {
    icon: BarChart3,
    title: "Executive Revenue Analytics",
    desc: "Track marketing channel attribution, booking conversion rates, customer lifetime value, and lost inquiry revenue on real-time dashboards.",
  },
  {
    icon: Shield,
    title: "Data Sovereignty & Direct Ownership",
    desc: "No per-seat pricing penalties. Your CRM runs on dedicated relational PostgreSQL databases that you own completely. Export or migrate anytime.",
  },
  {
    icon: Layers,
    title: "Custom Field Architecture",
    desc: "Configured strictly to your specific operational vocabulary (e.g., patient EHR chart numbers, property MLS IDs, or vehicle VIN tags).",
  },
];

export default function CrmServicePage() {
  const [activeStage, setActiveStage] = React.useState(0);

  return (
    <div className="py-24 sm:py-32">
      <div className="wrap">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-mono text-[var(--mute)]">
          <Link href="/services" className="hover:text-[var(--deep)]">
            Services
          </Link>
          <span>/</span>
          <span className="text-[var(--pur)] font-bold">Custom CRM</span>
        </div>

        {/* Hero Section */}
        <span className="k">Customer Data Architecture</span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--deep)] max-w-3xl">
          A customer record shaped around how your team actually sells.
        </h1>
        <p className="lead2 max-w-2xl">
          Off-the-shelf CRMs are bloated with hundreds of unused fields and expensive per-seat licenses. Deptloy builds streamlined, purpose-built CRM architectures with automated lead capture, audio transcripts, and automated follow-ups.
        </p>

        {/* Hero CTAs */}
        <div className="mt-8 flex flex-wrap gap-4 items-center">
          <Link href="/contact" className="btn">
            Scope Your Custom CRM
          </Link>
          <Link href="/#solutions" className="btn ghost">
            View Sector Solutions
          </Link>
        </div>

        {/* Visual Pipeline Interactive Board */}
        <div
          className="mt-16 bg-white border border-[rgba(21,19,74,0.14)] p-8 sm:p-10 shadow-[0_20px_50px_rgba(87,80,168,0.1)]"
          style={{
            borderTop: "5px solid #5750a8",
            clipPath: "polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)",
          }}
        >
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8 pb-4 border-b border-[var(--mist)]">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--pur)]">
                Live Pipeline Visualizer
              </span>
              <h2 className="text-xl font-bold text-[var(--deep)] mt-0.5">
                Automated Customer Journey Tracking
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono bg-[var(--paper)] px-3 py-1.5 border border-[var(--peri)]">
              <span className="w-2 h-2 rounded-full bg-[#16875b]" />
              <span>Real-Time Ingestion Active</span>
            </div>
          </div>

          {/* 4 Pipeline Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pipelineStages.map((stage, idx) => (
              <div
                key={stage.stage}
                onClick={() => setActiveStage(idx)}
                className={`p-4 border transition-all cursor-pointer ${
                  activeStage === idx
                    ? "bg-[var(--paper)] border-[#5750a8] shadow-sm"
                    : "bg-white border-[var(--peri)] hover:bg-[var(--paper)]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold" style={{ color: stage.color }}>
                    {stage.stage}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--mute)]">
                    {stage.count}
                  </span>
                </div>

                <div className="text-sm font-bold text-[var(--deep)] mb-1">
                  {stage.title}
                </div>
                <div className="text-xs font-mono font-bold text-[var(--pur)] mb-3">
                  {stage.value}
                </div>

                <div className="space-y-1.5 pt-2 border-t border-[var(--mist)]">
                  {stage.items.map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className="text-xs p-2 bg-white border border-[rgba(21,19,74,0.08)] flex items-center justify-between"
                    >
                      <span className="font-medium text-[var(--deep)] truncate">{item}</span>
                      <CheckCircle2 className="w-3 h-3 text-[#16875b] shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6 CRM Capabilities Grid */}
        <div className="mt-24">
          <span className="k">Engineering Features</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--deep)] mb-4">
            Built for throughput, not administrative overhead.
          </h2>
          <p className="lead2 max-w-2xl mb-12">
            Generic CRMs force your team to spend hours clicking dropdowns. A Deptloy CRM captures data invisibly through voice, email, and booking sync.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {crmFeatures.map((feat) => {
              const FeatIcon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="bg-white border border-[rgba(21,19,74,0.12)] p-7 space-y-3 shadow-[0_12px_30px_rgba(87,80,168,0.06)]"
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)",
                  }}
                >
                  <div className="w-10 h-10 rounded-sm bg-[#5750a8]/15 text-[#5750a8] flex items-center justify-center">
                    <FeatIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-[var(--deep)]">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div
          className="mt-20 p-8 sm:p-12 bg-[var(--deep)] text-white flex flex-col md:flex-row items-center justify-between gap-8"
          style={{
            clipPath: "polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)",
          }}
        >
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono text-[var(--peri)] uppercase">Turnkey CRM Architecture</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Own a CRM that matches how your business actually operates.
            </h3>
            <p className="text-xs sm:text-sm text-[#cfd2ee] leading-relaxed">
              We migrate your existing customer records, integrate your phone lines and booking tools, and deliver a clean system within 5 to 7 days.
            </p>
          </div>

          <Link href="/contact" className="btn" style={{ background: "var(--or)", color: "var(--deep)" }}>
            Request CRM Scope
          </Link>
        </div>
      </div>
    </div>
  );
}
