"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Layers,
  Smartphone,
  Server,
  Database,
  Bot,
  Activity,
  MapPin,
  Clock,
  Radio,
  FileText,
  Lock,
  Workflow,
  Store,
  Truck,
  Users,
} from "lucide-react";

const categories = [
  { id: "all", label: "All blueprints" },
  { id: "healthcare", label: "Healthcare" },
  { id: "operations", label: "Field Operations" },
  { id: "commerce", label: "Retail Commerce" },
  { id: "professional", label: "Professional Services" },
];

export default function ProjectsPage() {
  const [filter, setFilter] = React.useState("all");

  // Interactive Simulation State for Healthcare Diagram
  const [activeHealthScenario, setActiveHealthScenario] = React.useState<"call" | "schedule" | "intake">("call");

  // Interactive Tab State for Professional Services Workspace
  const [activeWorkspaceTab, setActiveWorkspaceTab] = React.useState<"client" | "partner" | "security">("client");

  return (
    <div className="py-14 sm:py-20">
      <div className="wrap">
        {/* Page Header */}
        <div className="max-w-4xl">
          <span className="k">Connected Enterprise Architectures</span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--deep)] mt-1 leading-tight">
            Not another app. The system your business actually needs.
          </h1>
          <p className="lead2 mt-3 text-sm sm:text-base max-w-3xl">
            Large companies don&apos;t run on disconnected consumer tools. They operate on unified custom platforms where specialized applications, databases, dispatch consoles, and AI assistants communicate within one connected architecture.
          </p>
        </div>

        {/* Honest Illustrative Blueprint Banner */}
        <div className="mt-6 mb-8 p-3.5 bg-white border-l-4 border-[var(--or)] text-xs text-[var(--mute)] shadow-sm max-w-4xl">
          <strong>Illustrative Solution Blueprints:</strong> These architectures demonstrate how Deptloy designs and engineers interconnected software systems for complex organizations. They represent conceptual product blueprints, not completed client case studies or fabricated results.
        </div>

        {/* Filter Pills with Guaranteed High-Contrast White Text */}
        <div className="mb-12 flex flex-wrap gap-2.5" role="tablist" aria-label="Filter solution blueprints">
          {categories.map((category) => {
            const isSelected = filter === category.id;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setFilter(category.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wide cursor-pointer border transition-colors ${
                  isSelected
                    ? "bg-[var(--deep)] text-white border-[var(--deep)] shadow-md pill-active"
                    : "bg-white text-[var(--mute)] border-[var(--peri)] hover:text-[var(--deep)] hover:border-[var(--pur)]"
                }`}
                style={{
                  color: isSelected ? "#ffffff" : "var(--deep)",
                  backgroundColor: isSelected ? "var(--deep)" : "#ffffff",
                }}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* The 4 Distinctive Solution Blueprints */}
        <div className="space-y-16">

          {/* =========================================================================
              BLUEPRINT 1: HEALTHCARE OPERATIONS PLATFORM
              Visual Approach: Interactive Connected System & Event Flow Simulator
             ========================================================================= */}
          {(filter === "all" || filter === "healthcare") && (
            <article
              id="care-network"
              className="bg-white border border-[rgba(21,19,74,0.14)] p-6 sm:p-9 shadow-[0_16px_45px_rgba(87,80,168,0.08)]"
              style={{
                borderTop: "5px solid #8478e0",
                clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)",
              }}
            >
              {/* Category Eyebrow */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--mist)] pb-4 mb-6">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--pur)] font-bold">
                  Healthcare Operations • Solution Blueprint
                </span>
                <span className="font-mono text-[11px] font-semibold text-[var(--mute)] bg-[var(--paper)] px-2.5 py-1 border border-[var(--peri)]">
                  Architecture 01: Multi-Location Care Network
                </span>
              </div>

              {/* Top Context & Questions */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--mute)]">
                    Patient Experience + Clinical Operations
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--deep)] leading-tight">
                    One connected workspace for a multi-location care network.
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="bg-[var(--paper)] p-3.5 border border-[var(--peri)] rounded-xs">
                      <span className="text-[11px] font-mono font-bold uppercase text-[var(--pur)] block mb-1">
                        1. Target Organization
                      </span>
                      <p className="text-xs text-[var(--mute)] leading-relaxed">
                        Multi-site dental groups, outpatient surgical centers, and regional specialized clinics managing 1,000+ monthly patient visits.
                      </p>
                    </div>

                    <div className="bg-[var(--paper)] p-3.5 border border-[var(--peri)] rounded-xs">
                      <span className="text-[11px] font-mono font-bold uppercase text-[var(--pur)] block mb-1">
                        2. The Operational Problem
                      </span>
                      <p className="text-xs text-[var(--mute)] leading-relaxed">
                        Inbound phone triage, doctor availability, room schedules, and intake forms live in separate software. Front desk staff spend hours reconciling double-bookings.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[var(--mist)]/40 p-5 border border-[var(--peri)] space-y-3">
                  <span className="text-[11px] font-mono font-bold uppercase text-[var(--deep)] block">
                    3. Custom Applications Involved
                  </span>
                  <ul className="text-xs text-[var(--mute)] space-y-2">
                    <li className="flex items-start gap-2">
                      <Bot className="w-3.5 h-3.5 text-[#8478e0] shrink-0 mt-0.5" />
                      <span><strong>AI Phone Receptionist:</strong> 24/7 conversational triage, slot locking, and doctor calendar lookups.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Smartphone className="w-3.5 h-3.5 text-[#8478e0] shrink-0 mt-0.5" />
                      <span><strong>Patient Intake Web App:</strong> Mobile-first medical history, consent signatures, and insurance card upload.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Activity className="w-3.5 h-3.5 text-[#8478e0] shrink-0 mt-0.5" />
                      <span><strong>Provider Schedule Matrix:</strong> Multi-room doctor assignment, procedure duration buffers, and shift swap rules.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Database className="w-3.5 h-3.5 text-[#8478e0] shrink-0 mt-0.5" />
                      <span><strong>Central Relational Core:</strong> Dedicated PostgreSQL database synchronizing patient charts with existing EHR adapters.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* DISTINCTIVE VISUAL 1: Interactive Connected System Diagram with Scenario Simulation */}
              <div className="bg-[var(--deep)] text-white p-6 sm:p-8 rounded-sm shadow-inner">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-xs font-mono text-[var(--peri)] uppercase">Interactive Architecture Visualizer</span>
                    <h3 className="text-lg font-bold text-white">How The Healthcare Applications Communicate</h3>
                  </div>

                  {/* Simulator Controls */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-300 mr-1">Simulate Data Flow:</span>
                    <button
                      type="button"
                      onClick={() => setActiveHealthScenario("call")}
                      className={`px-3 py-1 text-xs font-mono rounded-xs border transition-colors cursor-pointer ${
                        activeHealthScenario === "call"
                          ? "bg-[var(--or)] text-[var(--deep)] font-bold border-[var(--or)]"
                          : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                      }`}
                    >
                      Inbound Caller
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveHealthScenario("intake")}
                      className={`px-3 py-1 text-xs font-mono rounded-xs border transition-colors cursor-pointer ${
                        activeHealthScenario === "intake"
                          ? "bg-[var(--or)] text-[var(--deep)] font-bold border-[var(--or)]"
                          : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                      }`}
                    >
                      Digital Intake
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveHealthScenario("schedule")}
                      className={`px-3 py-1 text-xs font-mono rounded-xs border transition-colors cursor-pointer ${
                        activeHealthScenario === "schedule"
                          ? "bg-[var(--or)] text-[var(--deep)] font-bold border-[var(--or)]"
                          : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                      }`}
                    >
                      Doctor Rotation
                    </button>
                  </div>
                </div>

                {/* 4 Connected Nodes Architecture Map */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                  {/* Node 1 */}
                  <div className={`p-4 rounded-sm border transition-all ${
                    activeHealthScenario === "call" ? "bg-white/15 border-[var(--or)] shadow-lg" : "bg-white/5 border-white/10"
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase text-[var(--peri)]">Entry Point</span>
                      <Radio className={`w-3.5 h-3.5 ${activeHealthScenario === "call" ? "text-[var(--or)] animate-pulse" : "text-slate-400"}`} />
                    </div>
                    <h4 className="text-sm font-bold text-white">AI Phone Receptionist</h4>
                    <p className="text-[11px] text-[#cfd2ee] mt-1 leading-snug">
                      Answers caller with low latency, matches symptom to doctor, and locks temporary slot.
                    </p>
                  </div>

                  {/* Node 2 */}
                  <div className={`p-4 rounded-sm border transition-all ${
                    activeHealthScenario === "intake" ? "bg-white/15 border-[var(--or)] shadow-lg" : "bg-white/5 border-white/10"
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase text-[var(--peri)]">Self-Service</span>
                      <Smartphone className={`w-3.5 h-3.5 ${activeHealthScenario === "intake" ? "text-[var(--or)] animate-pulse" : "text-slate-400"}`} />
                    </div>
                    <h4 className="text-sm font-bold text-white">Patient Intake Portal</h4>
                    <p className="text-[11px] text-[#cfd2ee] mt-1 leading-snug">
                      Dispatches instant SMS link; caller signs HIPAA waiver and uploads insurance before arrival.
                    </p>
                  </div>

                  {/* Node 3 */}
                  <div className={`p-4 rounded-sm border transition-all ${
                    activeHealthScenario === "schedule" ? "bg-white/15 border-[var(--or)] shadow-lg" : "bg-white/5 border-white/10"
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase text-[var(--peri)]">Resource Engine</span>
                      <Activity className={`w-3.5 h-3.5 ${activeHealthScenario === "schedule" ? "text-[var(--or)] animate-pulse" : "text-slate-400"}`} />
                    </div>
                    <h4 className="text-sm font-bold text-white">Provider Matrix</h4>
                    <p className="text-[11px] text-[#cfd2ee] mt-1 leading-snug">
                      Balances room allocation, surgical suite clean times, and doctor rotation schedules.
                    </p>
                  </div>

                  {/* Node 4 */}
                  <div className="p-4 rounded-sm border bg-white/5 border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase text-[var(--peri)]">Relational Core</span>
                      <Database className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <h4 className="text-sm font-bold text-white">Encrypted Core DB</h4>
                    <p className="text-[11px] text-[#cfd2ee] mt-1 leading-snug">
                      PostgreSQL database with audit logging; syncs verified patient notes via REST adapters.
                    </p>
                  </div>
                </div>

                {/* Live Scenario Explanation Bar */}
                <div className="mt-5 p-3 bg-black/30 border border-white/10 rounded-sm flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--or)] animate-ping" />
                    <span className="font-mono text-slate-300">
                      {activeHealthScenario === "call" && "Active Flow: Caller &rarr; Telephony WebSocket &rarr; Real-time Slot Lock in PostgreSQL &rarr; Confirmation SMS sent in 3 seconds"}
                      {activeHealthScenario === "intake" && "Active Flow: Patient completes mobile form &rarr; Encrypted payload stored in DB &rarr; Clinic Dashboard updates status to 'Ready For Triage'"}
                      {activeHealthScenario === "schedule" && "Active Flow: Practice Manager updates doctor shifts &rarr; AI receptionist availability cache invalidates immediately with zero delay"}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono uppercase text-[var(--peri)] hidden sm:block">Zero Data Drift</span>
                </div>
              </div>

              {/* Bottom Impact & Deep Dive Link */}
              <div className="mt-6 pt-5 border-t border-[var(--mist)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-[var(--mute)]">
                  <strong>5. Operational Impact:</strong> Eliminates phone hold times, prevents double-booking disputes, and ensures all patient data is digitized before patients walk through the clinic door.
                </div>
                <Link
                  href="/projects/care-network"
                  className="btn sm shrink-0 inline-flex items-center gap-1.5"
                  style={{ background: "var(--deep)", color: "#fff" }}
                >
                  <span>Explore Technical Blueprint</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </article>
          )}

          {/* =========================================================================
              BLUEPRINT 2: FIELD OPERATIONS & DISPATCH HUB
              Visual Approach: Split Interface Mockup (Desktop Dispatch Board + Smartphone Mobile View)
             ========================================================================= */}
          {(filter === "all" || filter === "operations") && (
            <article
              id="field-operations"
              className="bg-white border border-[rgba(21,19,74,0.14)] p-6 sm:p-9 shadow-[0_16px_45px_rgba(87,80,168,0.08)]"
              style={{
                borderTop: "5px solid #fd9150",
                clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)",
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--mist)] pb-4 mb-6">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--or)] font-bold">
                  Logistics &amp; Field Services • Solution Blueprint
                </span>
                <span className="font-mono text-[11px] font-semibold text-[var(--mute)] bg-[var(--paper)] px-2.5 py-1 border border-[var(--peri)]">
                  Architecture 02: Field Operations &amp; Dispatch Hub
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--mute)]">
                    Dispatch + Real-Time Execution
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--deep)] leading-tight">
                    A live operations hub for teams working in the field.
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="bg-[var(--paper)] p-3.5 border border-[var(--peri)] rounded-xs">
                      <span className="text-[11px] font-mono font-bold uppercase text-[var(--pur)] block mb-1">
                        1. Target Organization
                      </span>
                      <p className="text-xs text-[var(--mute)] leading-relaxed">
                        Commercial HVAC contractors, regional freight carriers, electrical infrastructure teams, and telecommunications maintenance fleets with 15–150 field technicians.
                      </p>
                    </div>

                    <div className="bg-[var(--paper)] p-3.5 border border-[var(--peri)] rounded-xs">
                      <span className="text-[11px] font-mono font-bold uppercase text-[var(--pur)] block mb-1">
                        2. The Operational Problem
                      </span>
                      <p className="text-xs text-[var(--mute)] leading-relaxed">
                        Dispatchers manually call drivers to locate trucks. Completed job tickets are written on paper, and billing waits 3 weeks because parts used aren&apos;t logged.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[var(--mist)]/40 p-5 border border-[var(--peri)] space-y-3">
                  <span className="text-[11px] font-mono font-bold uppercase text-[var(--deep)] block">
                    3. Custom Applications Involved
                  </span>
                  <ul className="text-xs text-[var(--mute)] space-y-2">
                    <li className="flex items-start gap-2">
                      <Radio className="w-3.5 h-3.5 text-[var(--or)] shrink-0 mt-0.5" />
                      <span><strong>Smart Dispatch Board:</strong> Drag-and-drop live map scheduling with real-time GPS technician tracking.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Smartphone className="w-3.5 h-3.5 text-[var(--or)] shrink-0 mt-0.5" />
                      <span><strong>Technician Mobile Web App:</strong> Offline-first job checklists, photo evidence capture, and digital customer sign-off.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[var(--or)] shrink-0 mt-0.5" />
                      <span><strong>Customer Tracking Web Portal:</strong> Live technician ETA tracker with 2-way SMS alerts for arrivals.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Server className="w-3.5 h-3.5 text-[var(--or)] shrink-0 mt-0.5" />
                      <span><strong>Automated Invoicing Relay:</strong> Instantly converts signed field tickets into accounting invoices upon job completion.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* DISTINCTIVE VISUAL 2: Split Interface Mockup (Desktop Dispatch Board + Smartphone Mobile View) */}
              <div className="bg-[var(--deep)] text-white p-6 sm:p-8 rounded-sm shadow-inner">
                <div className="mb-6 pb-4 border-b border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-[var(--peri)] uppercase">Interactive Mockup Preview</span>
                    <h3 className="text-lg font-bold text-white">Dispatch Console &amp; Mobile Technician App</h3>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    WebSocket Stream Active
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  {/* Left (8 cols): Desktop Dispatch Board UI Mockup */}
                  <div className="lg:col-span-8 bg-[#0e0c33] border border-white/15 p-5 rounded-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                        <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
                          <Radio className="w-3.5 h-3.5 text-[var(--or)]" />
                          Central Dispatch Grid • Fleet Alpha
                        </span>
                        <span className="text-[11px] font-mono text-[#cfd2ee]">4 Active Jobs • 1 Pending</span>
                      </div>

                      {/* Mock Job Rows */}
                      <div className="space-y-2.5 text-xs font-mono">
                        <div className="p-3 bg-white/5 border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            <span className="text-white font-bold">#WO-8821</span>
                            <span className="text-[#cfd2ee]">Tech: Marcus V.</span>
                          </div>
                          <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-xs">
                            On Site • Diagnostics
                          </span>
                        </div>

                        <div className="p-3 bg-white/5 border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-amber-400" />
                            <span className="text-white font-bold">#WO-8822</span>
                            <span className="text-[#cfd2ee]">Tech: Sarah K.</span>
                          </div>
                          <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-xs">
                            En Route • ETA 14 mins
                          </span>
                        </div>

                        <div className="p-3 bg-white/5 border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-indigo-400" />
                            <span className="text-white font-bold">#WO-8823</span>
                            <span className="text-[#cfd2ee]">Tech: Liam O.</span>
                          </div>
                          <span className="text-xs font-bold text-indigo-300 bg-indigo-400/10 px-2 py-0.5 rounded-xs">
                            Completed • Invoicing
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#cfd2ee]">
                      <span>Communication: GPS Telemetry &rarr; WebSocket Bus &rarr; Dispatcher Map</span>
                      <span className="font-mono text-[var(--or)]">Live Auto-Sync</span>
                    </div>
                  </div>

                  {/* Right (4 cols): Smartphone Frame Mockup for Technician */}
                  <div className="lg:col-span-4 bg-[#0e0c33] border-2 border-white/20 p-4 rounded-xl flex flex-col justify-between shadow-xl">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                      <span className="text-[11px] font-mono font-bold text-[var(--or)]">TECHNICIAN APP</span>
                      <span className="text-[10px] font-mono text-slate-400">Offline-Ready</span>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="bg-white/10 p-2.5 rounded-xs border border-white/10">
                        <span className="text-[10px] uppercase font-mono text-[var(--peri)]">Assigned Ticket</span>
                        <h4 className="text-sm font-bold text-white mt-0.5">Commercial Chiller Unit 4B</h4>
                        <p className="text-[11px] text-slate-300 mt-0.5">Apex Logistics Center, Dock 3</p>
                      </div>

                      <div className="space-y-1.5 text-[11px]">
                        <div className="flex items-center gap-2 text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Safety Lockout Verified</span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Compressor PSI Tested</span>
                        </div>
                        <div className="flex items-center gap-2 text-amber-300">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Customer Sign-Off Pending</span>
                        </div>
                      </div>

                      <div className="p-2 border border-dashed border-white/20 bg-white/5 rounded-xs text-center text-[10px] text-slate-400">
                        [ Digital Signature Captured ]
                      </div>
                    </div>

                    <div className="mt-3 pt-2 text-center">
                      <div className="w-full py-2 bg-[var(--or)] text-[var(--deep)] font-bold text-xs font-mono rounded-xs">
                        Complete Job &amp; Invoice
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[var(--mist)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-[var(--mute)]">
                  <strong>5. Operational Impact:</strong> Invoices generated within minutes of technician departure instead of weeks. Customers receive Uber-like technician ETA links, reducing &quot;where is my technician&quot; support calls.
                </div>
                <Link
                  href="/projects/field-operations"
                  className="btn sm shrink-0 inline-flex items-center gap-1.5"
                  style={{ background: "var(--deep)", color: "#fff" }}
                >
                  <span>Explore Technical Blueprint</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </article>
          )}

          {/* =========================================================================
              BLUEPRINT 3: ENTERPRISE COMMERCE & OMNICHANNEL INVENTORY
              Visual Approach: Omnichannel Flow Pipeline & Event Bus Ingestion
             ========================================================================= */}
          {(filter === "all" || filter === "commerce") && (
            <article
              id="commerce-platform"
              className="bg-white border border-[rgba(21,19,74,0.14)] p-6 sm:p-9 shadow-[0_16px_45px_rgba(87,80,168,0.08)]"
              style={{
                borderTop: "5px solid #ef7a5e",
                clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)",
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--mist)] pb-4 mb-6">
                <span className="font-mono text-xs uppercase tracking-wider text-[#ef7a5e] font-bold">
                  Omnichannel Retail &amp; Commerce • Solution Blueprint
                </span>
                <span className="font-mono text-[11px] font-semibold text-[var(--mute)] bg-[var(--paper)] px-2.5 py-1 border border-[var(--peri)]">
                  Architecture 03: Unified Inventory &amp; Order Layer
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--mute)]">
                    Orders + Inventory + Customer Experience
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--deep)] leading-tight">
                    A commerce platform that connects every sales channel.
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="bg-[var(--paper)] p-3.5 border border-[var(--peri)] rounded-xs">
                      <span className="text-[11px] font-mono font-bold uppercase text-[var(--pur)] block mb-1">
                        1. Target Organization
                      </span>
                      <p className="text-xs text-[var(--mute)] leading-relaxed">
                        Retailers operating 5–50 physical stores alongside high-traffic e-commerce storefronts, wholesale portals, and central fulfillment warehouses.
                      </p>
                    </div>

                    <div className="bg-[var(--paper)] p-3.5 border border-[var(--peri)] rounded-xs">
                      <span className="text-[11px] font-mono font-bold uppercase text-[var(--pur)] block mb-1">
                        2. The Operational Problem
                      </span>
                      <p className="text-xs text-[var(--mute)] leading-relaxed">
                        Online storefronts sell inventory that in-store registers just sold 5 minutes prior. Disconnected databases result in canceled customer orders and frustrated staff.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[var(--mist)]/40 p-5 border border-[var(--peri)] space-y-3">
                  <span className="text-[11px] font-mono font-bold uppercase text-[var(--deep)] block">
                    3. Custom Applications Involved
                  </span>
                  <ul className="text-xs text-[var(--mute)] space-y-2">
                    <li className="flex items-start gap-2">
                      <Store className="w-3.5 h-3.5 text-[#ef7a5e] shrink-0 mt-0.5" />
                      <span><strong>Storefront &amp; POS Connectors:</strong> Real-time checkout bridges syncing physical cash registers with online cart checkouts.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Layers className="w-3.5 h-3.5 text-[#ef7a5e] shrink-0 mt-0.5" />
                      <span><strong>Event Streaming Inventory Engine:</strong> Multi-location ledger broadcasting SKU availability with millisecond accuracy.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Truck className="w-3.5 h-3.5 text-[#ef7a5e] shrink-0 mt-0.5" />
                      <span><strong>Warehouse Picking Terminal:</strong> Barcode scanning terminal optimizing packing routes and carrier label dispatch.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Users className="w-3.5 h-3.5 text-[#ef7a5e] shrink-0 mt-0.5" />
                      <span><strong>Customer Support 360 Console:</strong> Single screen displaying customer orders across all stores, web, and returns.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* DISTINCTIVE VISUAL 3: Horizontal Omnichannel Flow Pipeline */}
              <div className="bg-[var(--deep)] text-white p-6 sm:p-8 rounded-sm shadow-inner">
                <div className="mb-6 pb-4 border-b border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-[var(--peri)] uppercase">Architecture Visualization</span>
                    <h3 className="text-lg font-bold text-white">4. Omnichannel Ingestion &amp; Event Stream Pipeline</h3>
                  </div>
                  <span className="text-xs font-mono text-[var(--or)]">Streaming Event Bus</span>
                </div>

                {/* 3-Stage Pipeline Diagram */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                  {/* Channel Ingestion */}
                  <div className="bg-white/5 border border-white/10 p-5 rounded-sm space-y-3">
                    <span className="text-[10px] font-mono uppercase text-[var(--peri)] block">Stage 1: Sales Channels</span>
                    <h4 className="text-sm font-bold text-white">Multi-Touchpoint Ingestion</h4>
                    <div className="space-y-2 text-xs">
                      <div className="p-2 bg-white/5 rounded border border-white/5 flex items-center justify-between">
                        <span>Web Next.js Storefront</span>
                        <span className="text-emerald-400 font-mono text-[10px]">Active</span>
                      </div>
                      <div className="p-2 bg-white/5 rounded border border-white/5 flex items-center justify-between">
                        <span>Physical Store POS</span>
                        <span className="text-emerald-400 font-mono text-[10px]">12 Outlets</span>
                      </div>
                      <div className="p-2 bg-white/5 rounded border border-white/5 flex items-center justify-between">
                        <span>B2B Wholesale Portal</span>
                        <span className="text-emerald-400 font-mono text-[10px]">Active</span>
                      </div>
                    </div>
                  </div>

                  {/* Core Event Bus */}
                  <div className="bg-white/10 border-2 border-[var(--or)] p-5 rounded-sm space-y-3 shadow-lg">
                    <span className="text-[10px] font-mono uppercase text-[var(--or)] font-bold block">Stage 2: Central Router</span>
                    <h4 className="text-sm font-bold text-white">Real-Time Event Ledger</h4>
                    <p className="text-xs text-[#cfd2ee] leading-relaxed">
                      Every transaction emits a stock event. The ledger immediately reserves inventory and invalidates stale caches across all registers in under 100ms.
                    </p>
                    <div className="p-2.5 bg-black/40 rounded border border-white/10 text-[11px] font-mono text-emerald-400">
                      &gt; Event: SKU_RESERVED (ID: #4910)
                      <br />&gt; Sync Latency: &lt; 40ms
                    </div>
                  </div>

                  {/* Fulfillment & Support */}
                  <div className="bg-white/5 border border-white/10 p-5 rounded-sm space-y-3">
                    <span className="text-[10px] font-mono uppercase text-[var(--peri)] block">Stage 3: Fulfillment</span>
                    <h4 className="text-sm font-bold text-white">Warehouse &amp; Support 360</h4>
                    <div className="space-y-2 text-xs">
                      <div className="p-2 bg-white/5 rounded border border-white/5 flex items-center justify-between">
                        <span>Warehouse Pick Route</span>
                        <span className="text-[var(--or)] font-mono text-[10px]">Batched</span>
                      </div>
                      <div className="p-2 bg-white/5 rounded border border-white/5 flex items-center justify-between">
                        <span>FedEx / UPS Carrier API</span>
                        <span className="text-emerald-400 font-mono text-[10px]">Label Ready</span>
                      </div>
                      <div className="p-2 bg-white/5 rounded border border-white/5 flex items-center justify-between">
                        <span>Support Timeline Sync</span>
                        <span className="text-emerald-400 font-mono text-[10px]">Synced</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[var(--mist)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-[var(--mute)]">
                  <strong>5. Operational Impact:</strong> Zero inventory desync between physical storefronts and digital shopping carts. Fast, accurate packing routes reduce order fulfillment overhead.
                </div>
                <Link
                  href="/projects/commerce-platform"
                  className="btn sm shrink-0 inline-flex items-center gap-1.5"
                  style={{ background: "var(--deep)", color: "#fff" }}
                >
                  <span>Explore Technical Blueprint</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </article>
          )}

          {/* =========================================================================
              BLUEPRINT 4: CLIENT WORKSPACE & PROFESSIONAL SERVICES
              Visual Approach: Interactive Workspace Tabbed Mockup (Client View vs Partner View vs Security)
             ========================================================================= */}
          {(filter === "all" || filter === "professional") && (
            <article
              id="client-workspace"
              className="bg-white border border-[rgba(21,19,74,0.14)] p-6 sm:p-9 shadow-[0_16px_45px_rgba(87,80,168,0.08)]"
              style={{
                borderTop: "5px solid #5750a8",
                clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)",
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--mist)] pb-4 mb-6">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--pur)] font-bold">
                  Professional Services &amp; Advisory • Solution Blueprint
                </span>
                <span className="font-mono text-[11px] font-semibold text-[var(--mute)] bg-[var(--paper)] px-2.5 py-1 border border-[var(--peri)]">
                  Architecture 04: Secure Client Collaboration Hub
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--mute)]">
                    Intake + Collaboration + Delivery
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--deep)] leading-tight">
                    A secure client workspace built around high-value engagements.
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="bg-[var(--paper)] p-3.5 border border-[var(--peri)] rounded-xs">
                      <span className="text-[11px] font-mono font-bold uppercase text-[var(--pur)] block mb-1">
                        1. Target Organization
                      </span>
                      <p className="text-xs text-[var(--mute)] leading-relaxed">
                        Corporate law firms, management consultancies, private equity groups, and specialized accounting practices handling sensitive client engagements.
                      </p>
                    </div>

                    <div className="bg-[var(--paper)] p-3.5 border border-[var(--peri)] rounded-xs">
                      <span className="text-[11px] font-mono font-bold uppercase text-[var(--pur)] block mb-1">
                        2. The Operational Problem
                      </span>
                      <p className="text-xs text-[var(--mute)] leading-relaxed">
                        Confidential deliverables, legal drafts, and milestone sign-offs are scattered across unencrypted email attachments and multiple cloud drives with no unified progress visibility.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[var(--mist)]/40 p-5 border border-[var(--peri)] space-y-3">
                  <span className="text-[11px] font-mono font-bold uppercase text-[var(--deep)] block">
                    3. Custom Applications Involved
                  </span>
                  <ul className="text-xs text-[var(--mute)] space-y-2">
                    <li className="flex items-start gap-2">
                      <Lock className="w-3.5 h-3.5 text-[var(--pur)] shrink-0 mt-0.5" />
                      <span><strong>Encrypted Client Portal:</strong> High-security client access for document review, e-signatures, and milestone tracking.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Users className="w-3.5 h-3.5 text-[var(--pur)] shrink-0 mt-0.5" />
                      <span><strong>Partner Oversight Console:</strong> Internal staff view of associate billable hours, project milestones, and pending approvals.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Workflow className="w-3.5 h-3.5 text-[var(--pur)] shrink-0 mt-0.5" />
                      <span><strong>Automated Review Engine:</strong> Stage-gate approval workflows with automated notification reminders for client stakeholders.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FileText className="w-3.5 h-3.5 text-[var(--pur)] shrink-0 mt-0.5" />
                      <span><strong>Permissioned Audit Vault:</strong> Tamper-evident activity logs, watermarked document previews, and role-based permissions.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* DISTINCTIVE VISUAL 4: Interactive Tabbed Workspace & Security Matrix Preview */}
              <div className="bg-[var(--deep)] text-white p-6 sm:p-8 rounded-sm shadow-inner">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-xs font-mono text-[var(--peri)] uppercase">Interactive Workspace Preview</span>
                    <h3 className="text-lg font-bold text-white">4. Multi-Role Collaboration &amp; Data Security</h3>
                  </div>

                  {/* Tab Selector */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveWorkspaceTab("client")}
                      className={`px-3 py-1 text-xs font-mono rounded-xs border transition-colors cursor-pointer ${
                        activeWorkspaceTab === "client"
                          ? "bg-[var(--or)] text-[var(--deep)] font-bold border-[var(--or)]"
                          : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                      }`}
                    >
                      Client View
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveWorkspaceTab("partner")}
                      className={`px-3 py-1 text-xs font-mono rounded-xs border transition-colors cursor-pointer ${
                        activeWorkspaceTab === "partner"
                          ? "bg-[var(--or)] text-[var(--deep)] font-bold border-[var(--or)]"
                          : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                      }`}
                    >
                      Partner Console
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveWorkspaceTab("security")}
                      className={`px-3 py-1 text-xs font-mono rounded-xs border transition-colors cursor-pointer ${
                        activeWorkspaceTab === "security"
                          ? "bg-[var(--or)] text-[var(--deep)] font-bold border-[var(--or)]"
                          : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                      }`}
                    >
                      Security Matrix
                    </button>
                  </div>
                </div>

                {/* Tab 1: Client Portal View */}
                {activeWorkspaceTab === "client" && (
                  <div className="bg-[#0e0c33] p-5 border border-white/15 rounded-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div>
                        <span className="text-[10px] font-mono text-[var(--peri)]">ENGAGEMENT PORTAL</span>
                        <h4 className="text-sm font-bold text-white">Vanguard M&amp;A Restructuring Project</h4>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-xs">
                        Stage 3 of 4: Final Sign-off
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div className="bg-white/5 p-3 rounded border border-white/10">
                        <span className="text-[10px] font-mono text-slate-400">Milestone 01</span>
                        <h5 className="font-bold text-white mt-0.5">Discovery &amp; Audit</h5>
                        <span className="text-emerald-400 text-[11px] font-semibold mt-1 block">Approved &amp; Archived</span>
                      </div>
                      <div className="bg-white/5 p-3 rounded border border-white/10">
                        <span className="text-[10px] font-mono text-slate-400">Milestone 02</span>
                        <h5 className="font-bold text-white mt-0.5">Asset Reallocation Plan</h5>
                        <span className="text-emerald-400 text-[11px] font-semibold mt-1 block">Signed by General Counsel</span>
                      </div>
                      <div className="bg-white/10 p-3 rounded border border-[var(--or)]">
                        <span className="text-[10px] font-mono text-[var(--or)]">Milestone 03 (Current)</span>
                        <h5 className="font-bold text-white mt-0.5">Closing Deliverables</h5>
                        <span className="text-[var(--or)] text-[11px] font-semibold mt-1 block">Pending Partner Review</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Partner Console View */}
                {activeWorkspaceTab === "partner" && (
                  <div className="bg-[#0e0c33] p-5 border border-white/15 rounded-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div>
                        <span className="text-[10px] font-mono text-[var(--peri)]">INTERNAL PARTNER VIEW</span>
                        <h4 className="text-sm font-bold text-white">Practice Group Allocation &amp; Hours</h4>
                      </div>
                      <span className="text-xs font-mono text-[var(--or)]">8 Active Engagements</span>
                    </div>

                    <div className="space-y-2 text-xs font-mono">
                      <div className="p-2.5 bg-white/5 rounded border border-white/10 flex items-center justify-between">
                        <span className="text-white">Vanguard M&amp;A • Partner: E. Thornton</span>
                        <span className="text-slate-300">84 Billable Hrs • Target: 90</span>
                        <span className="text-emerald-400">On Track</span>
                      </div>
                      <div className="p-2.5 bg-white/5 rounded border border-white/10 flex items-center justify-between">
                        <span className="text-white">Apex Compliance • Partner: M. Vance</span>
                        <span className="text-slate-300">42 Billable Hrs • Target: 40</span>
                        <span className="text-amber-300">Deliverable Due Tomorrow</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Security & Role-Based Access Matrix */}
                {activeWorkspaceTab === "security" && (
                  <div className="bg-[#0e0c33] p-5 border border-white/15 rounded-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div>
                        <span className="text-[10px] font-mono text-[var(--peri)]">SECURITY CONTROLS</span>
                        <h4 className="text-sm font-bold text-white">Granular Role-Based Access Control (RBAC)</h4>
                      </div>
                      <span className="text-xs font-mono text-emerald-400">TLS 1.3 + At-Rest AES-256</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 bg-white/5 rounded border border-white/10">
                        <span className="font-bold text-white block mb-1">Client Stakeholder</span>
                        <p className="text-[11px] text-[#cfd2ee]">Read-only milestones, download executed agreements, upload requested financial docs.</p>
                      </div>
                      <div className="p-3 bg-white/5 rounded border border-white/10">
                        <span className="font-bold text-white block mb-1">Senior Associate</span>
                        <p className="text-[11px] text-[#cfd2ee]">Draft creation, peer comment threads, internal redlines, stage completion requests.</p>
                      </div>
                      <div className="p-3 bg-white/5 rounded border border-white/10">
                        <span className="font-bold text-white block mb-1">Partner &amp; Auditor</span>
                        <p className="text-[11px] text-[#cfd2ee]">Full signing authority, invoice release approval, complete immutable audit log export.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-5 border-t border-[var(--mist)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-[var(--mute)]">
                  <strong>5. Operational Impact:</strong> Clients stay informed through a clean branded portal without chasing status emails. Partners maintain strict access controls and billing accuracy.
                </div>
                <Link
                  href="/projects/client-workspace"
                  className="btn sm shrink-0 inline-flex items-center gap-1.5"
                  style={{ background: "var(--deep)", color: "#fff" }}
                >
                  <span>Explore Technical Blueprint</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </article>
          )}
        </div>

        {/* Bottom Call to Action */}
        <section className="mt-16 bg-[var(--deep)] text-white p-8 sm:p-12 shadow-xl"
          style={{
            clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)",
          }}>
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--peri)]">Your business is the blueprint</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold mt-2 max-w-3xl leading-tight">
            Have an operational challenge that doesn’t fit a generic app?
          </h2>
          <p className="max-w-2xl text-[#d2cdf3] text-sm sm:text-base mt-3 mb-6">
            That is where our work starts. Tell us what your business needs to accomplish, and our engineers will architect the software system to make it happen.
          </p>
          <Link href="/contact" className="btn" style={{ background: "var(--or)", color: "var(--deep)", fontWeight: 700 }}>
            Discuss Your Architecture Idea <ArrowRight size={16} />
          </Link>
        </section>
      </div>
    </div>
  );
}
