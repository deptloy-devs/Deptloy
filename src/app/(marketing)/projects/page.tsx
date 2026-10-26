"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Stethoscope,
  Wrench,
  Sparkles,
  Building2,
  CheckCircle2,
  Cpu,
  Layers,
  ShieldAlert,
  Zap,
  Server,
  FileText,
} from "lucide-react";

interface CaseProject {
  id: string;
  category: "all" | "healthcare" | "field-services" | "wellness" | "professional";
  categoryLabel: string;
  industry: string;
  client: string;
  headline: string;
  offTheShelfProblem: string;
  interconnectedSystem: string;
  architectureComponents: string[];
  metrics: { label: string; value: string }[];
  color: string;
  icon: React.ComponentType<{ className?: string }>;
}

const enterpriseProjects: CaseProject[] = [
  {
    id: "apex-health",
    category: "healthcare",
    categoryLabel: "Healthcare & Dental",
    industry: "Multi-Location Healthcare & Dental Network",
    client: "Apex Health & Dental Group (8 Clinic Locations)",
    headline: "Centralized AI Voice Triage and Real-Time EHR Appointment Synchronization",
    offTheShelfProblem:
      "The network relied on generic scheduling tools, an isolated legacy EHR, and an offshore third-party call center. Patients faced 20-minute phone queues during peak hours, and over 40% of after-hours patient inquiries were lost to answering machines, resulting in a 30% empty-chair rate.",
    interconnectedSystem:
      "Deptloy engineered a centralized 24/7 AI Voice Receptionist integrated directly into their EHR database. The assistant understands clinical urgency, verifies patient insurance eligibility on the fly, locks appointments into the provider's specific room calendar, and triggers instant SMS prep instructions.",
    architectureComponents: [
      "24/7 Voice AI Engine",
      "Carrier SIP Rollover Trunking",
      "EHR Calendar Sync Bridge",
      "Patient SMS Triage Relay",
      "Centralized Operations Dashboard",
    ],
    metrics: [
      { label: "After-Hours Inquiries Booked", value: "94%" },
      { label: "Front-Desk Phone Hours Saved", value: "18 hrs/wk" },
      { label: "Empty-Chair No-Show Reduction", value: "35%" },
    ],
    color: "#8478e0",
    icon: Stethoscope,
  },
  {
    id: "vanguard-logistics",
    category: "field-services",
    categoryLabel: "Field Services & Logistics",
    industry: "High-Volume Emergency HVAC & Mechanical Contractor",
    client: "Vanguard Field Services (65 Technicians On-Site)",
    headline: "24/7 Autonomous Emergency Dispatch, Geolocation Triage, and Instant Mobile Payments",
    offTheShelfProblem:
      "Technicians on roofs and in basements could not answer incoming calls. High-ticket emergency repairs ($3,500+ average) went to competitors because no one answered the phone. Manual dispatch on whiteboards led to delayed customer updates and 4-day invoicing lags.",
    interconnectedSystem:
      "Deptloy built an interconnected dispatch system: Inbound voice AI triages the emergency severity, estimates arrival windows by querying technician GPS positions, books the job slot, and sends real-time technician tracking to the homeowner. When the technician marks the job complete on mobile, Stripe automatically collects payment.",
    architectureComponents: [
      "Emergency Voice AI Dispatch",
      "Geolocation Proximity Router",
      "Custom Dispatch CRM",
      "Technician Mobile PWA",
      "Instant Stripe Billing Relay",
    ],
    metrics: [
      { label: "Lead Response Time", value: "< 15 sec" },
      { label: "Emergency Job Capture", value: "+52%" },
      { label: "Same-Day Invoicing Throughput", value: "98%" },
    ],
    color: "#fd9150",
    icon: Wrench,
  },
  {
    id: "velvet-studios",
    category: "wellness",
    categoryLabel: "Wellness & Aesthetics",
    industry: "Luxury Aesthetics & MedSpa Franchise Network",
    client: "Velvet Aesthetic Studios (14 Regional Locations)",
    headline: "Omnichannel Concierge, Multi-Staff Resource Locking, and Card Pre-Authorization",
    offTheShelfProblem:
      "Front-desk coordinators constantly interrupted delicate laser and skin treatments to answer phone calls and Instagram DMs about pricing. Unsecured bookings resulted in frequent cancellations, costing over $140,000 annually in lost aesthetician chair time.",
    interconnectedSystem:
      "Deptloy deployed a unified conversational concierge across phone lines, Instagram DMs, and their web portal. The system checks equipment availability, matches treatment duration to certified aestheticians, pre-authorizes deposits via Stripe, and triggers pre-treatment skincare instructions automatically.",
    architectureComponents: [
      "Omnichannel AI (Voice + IG + Web)",
      "Multi-Resource Room & Staff Matcher",
      "Stripe Card Pre-Auth Vault",
      "Automated Pre-Care Pipeline",
      "Franchise Analytics Engine",
    ],
    metrics: [
      { label: "Autonomous Booking Rate", value: "88%" },
      { label: "Cancellation Revenue Loss", value: "-74%" },
      { label: "Aesthetician Treatment Focus", value: "100%" },
    ],
    color: "#ef7a5e",
    icon: Sparkles,
  },
  {
    id: "beacon-capital",
    category: "professional",
    categoryLabel: "Legal & Private Wealth",
    industry: "Corporate Counsel & Private Wealth Advisory",
    client: "Beacon Capital & Legal Partners",
    headline: "Confidential Intake Triage, Conflict Verification, and Executive Calendar Scheduling",
    offTheShelfProblem:
      "Senior partners charging $650/hour spent 15+ hours each week reviewing unqualified inquiries, exchanging calendar emails, and waiting days for prospective clients to sign mutual NDAs before initial discovery calls.",
    interconnectedSystem:
      "Deptloy engineered a private client intake portal and voice qualification line. Inbound inquiries are screened against the firm's ideal client profile, automated conflict checks are conducted against existing records, digital NDAs are counter-signed in real time, and qualified executives self-schedule directly onto the partner's calendar.",
    architectureComponents: [
      "Encrypted Intake Portal",
      "Automated Conflict Verification",
      "Digital NDA e-Sign Bridge",
      "Executive Calendar Coordinator",
      "Secure Document Vault",
    ],
    metrics: [
      { label: "Unqualified Calls Eliminated", value: "100%" },
      { label: "Partner Hours Reclaimed", value: "16 hrs/wk" },
      { label: "Client Onboarding Time", value: "< 24 hrs" },
    ],
    color: "#5750a8",
    icon: Building2,
  },
];

const filterCategories = [
  { id: "all", label: "All Interconnected Systems" },
  { id: "healthcare", label: "Healthcare & Dental" },
  { id: "field-services", label: "Field Services & Logistics" },
  { id: "wellness", label: "Wellness & Aesthetics" },
  { id: "professional", label: "Legal & Wealth Advisory" },
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = React.useState<string>("all");

  const visibleProjects =
    activeFilter === "all"
      ? enterpriseProjects
      : enterpriseProjects.filter((p) => p.category === activeFilter);

  return (
    <div className="py-24 sm:py-32">
      <div className="wrap">
        {/* Header */}
        <span className="k">Interconnected Custom Architectures</span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--deep)] max-w-3xl">
          Systems built for businesses that have outgrown everyday apps.
        </h1>
        <p className="lead2 max-w-2xl">
          Growing companies hit a wall with off-the-shelf software. When generic tools create data silos, missed calls, and manual busywork, Deptloy engineers unified, custom systems where every tool talks to the next.
        </p>

        {/* Filter Bar */}
        <div className="mt-12 mb-10 flex flex-wrap gap-2">
          {filterCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
                activeFilter === cat.id
                  ? "bg-[var(--deep)] text-white border-[var(--deep)] shadow-sm"
                  : "bg-white text-[var(--mute)] border-[var(--peri)] hover:text-[var(--deep)] hover:border-[var(--deep)]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Case Studies Cards List */}
        <div className="space-y-12">
          {visibleProjects.map((project) => {
            const Icon = project.icon;
            return (
              <article
                key={project.id}
                id={project.id}
                className="bg-white border border-[rgba(21,19,74,0.14)] p-8 sm:p-12 shadow-[0_20px_50px_rgba(87,80,168,0.08)]"
                style={{
                  borderTop: `5px solid ${project.color}`,
                  clipPath: "polygon(0 0, calc(100% - 34px) 0, 100% 34px, 100% 100%, 0 100%)",
                }}
              >
                {/* Header row */}
                <div className="flex items-center justify-between flex-wrap gap-4 mb-6 pb-4 border-b border-[var(--mist)]">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-sm flex items-center justify-center text-white shrink-0"
                      style={{ backgroundColor: project.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--mute)]">
                        {project.categoryLabel} • {project.client}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--deep)] mt-0.5">
                        {project.headline}
                      </h2>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold uppercase text-[var(--deep)] bg-[var(--paper)] px-3 py-1 border border-[var(--peri)]">
                    Interconnected Architecture
                  </span>
                </div>

                {/* Problem vs Interconnected System Comparison */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
                  {/* The Problem with Everyday Apps */}
                  <div className="bg-[var(--paper)] border border-[rgba(217,56,58,0.2)] p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#d9383a]">
                      <ShieldAlert className="w-4 h-4" />
                      The Limit of Everyday Apps
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed">
                      {project.offTheShelfProblem}
                    </p>
                  </div>

                  {/* The Deptloy Interconnected System */}
                  <div className="bg-white border border-[rgba(22,135,91,0.25)] p-6 space-y-3 shadow-sm">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#16875b]">
                      <CheckCircle2 className="w-4 h-4" />
                      The Deptloy Interconnected System
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--deep)] font-medium leading-relaxed">
                      {project.interconnectedSystem}
                    </p>
                  </div>
                </div>

                {/* Architecture Technical Stack */}
                <div className="my-6">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--pur)] block mb-3">
                    Interconnected Software Components
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.architectureComponents.map((comp) => (
                      <span
                        key={comp}
                        className="text-xs font-mono bg-[var(--paper)] text-[var(--deep)] border border-[var(--peri)] px-3 py-1 font-semibold flex items-center gap-1.5"
                      >
                        <Cpu className="w-3 h-3 text-[var(--or)]" />
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Verified Metrics Row & CTA */}
                <div className="pt-6 border-t border-[var(--mist)] flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="grid grid-cols-3 gap-6">
                    {project.metrics.map((m) => (
                      <div key={m.label}>
                        <div className="text-xl sm:text-2xl font-extrabold font-mono text-[var(--deep)]">
                          {m.value}
                        </div>
                        <div className="text-[11px] text-[var(--mute)] leading-tight mt-0.5">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link href="/contact" className="btn sm shrink-0">
                    Scope Similar System <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Comparison Callout: Fragmented Apps vs Interconnected System */}
        <div
          className="mt-20 p-8 sm:p-12 bg-[var(--deep)] text-white"
          style={{
            clipPath: "polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)",
          }}
        >
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono text-[var(--peri)] uppercase">Engineering Thesis</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Why big companies don’t rely on everyday tools.
            </h2>
            <p className="text-sm text-[#cfd2ee] leading-relaxed">
              When your business volume grows, subscribing to 8 different SaaS products creates 8 disconnected data silos. Staff spend half their day manually reconciling calendar invites, copying customer details, and chasing dropped leads.
            </p>
            <p className="text-sm text-[#cfd2ee] leading-relaxed">
              Deptloy connects your entire operational loop into one proprietary architecture. You own the database, you control the customer journey, and your systems scale seamlessly without multiplying software fees.
            </p>

            <div className="pt-4">
              <Link href="/contact" className="btn" style={{ background: "var(--or)", color: "var(--deep)" }}>
                Discuss Your Operational Architecture
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
