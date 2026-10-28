"use client";

import * as React from "react";
import { PhoneCall, Database, Workflow, Layout, Table, Zap, Users, Unlink } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";

export function WhyDeptloySection() {
  const [inView, setInView] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why"
      className="relative"
      style={{
        paddingTop: "clamp(48px, 5.5vw, 76px)",
        paddingBottom: "0",
      }}
    >
      <div className="wrap">
        {/* Prominent, Confident Header */}
        <div className="max-w-3xl">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--pur)] bg-[var(--mist)] px-3 py-1 rounded-sm border border-[var(--peri)] inline-block">
            Why Custom Software
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--deep)] tracking-tight leading-[1.12] mt-3">
            Disconnected tools.{" "}
            <span className="text-[var(--pur)]">One connected business.</span>
          </h2>
          <p className="text-base sm:text-lg text-[var(--mute)] max-w-2xl leading-relaxed mt-3">
            Custom software brings your applications, data, and workflows together into one unified platform.
          </p>
        </div>

        {/* Substantial, Elevated Comparison Panels */}
        <div className="why-grid mt-8 sm:mt-10">
          {/* Panel 1: Disconnected Tools */}
          <div className="bg-white/95 border-2 border-dashed border-[#ef7a5e]/35 rounded-2xl p-5 sm:p-6 lg:p-7 flex flex-col justify-between min-h-[290px] relative overflow-hidden shadow-xs">
            {/* Panel Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-[var(--peri)]/50 z-10 relative">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--mute)] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ef7a5e]" />
                Disconnected Tools
              </span>
              <span className="text-[10px] font-mono text-[#ef7a5e] bg-[#ef7a5e]/10 border border-[#ef7a5e]/25 px-2.5 py-0.5 rounded-full font-semibold">
                ✕ Isolated Silos
              </span>
            </div>

            {/* Micro Architecture Diagram */}
            <div className="relative w-full h-[160px] my-auto flex items-center justify-between px-1 sm:px-2">
              {/* SVG Broken Dashed Conduits */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                viewBox="0 0 460 160"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M 136 35 C 158 35 166 60 178 68"
                  stroke="#ef7a5e"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                  strokeOpacity="0.55"
                  className={inView ? "why-seq-2" : ""}
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 136 125 C 158 125 166 100 178 92"
                  stroke="#ef7a5e"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                  strokeOpacity="0.55"
                  className={inView ? "why-seq-2" : ""}
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 282 68 C 294 60 302 35 324 35"
                  stroke="#ef7a5e"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                  strokeOpacity="0.55"
                  className={inView ? "why-seq-2" : ""}
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 282 92 C 294 100 302 125 324 125"
                  stroke="#ef7a5e"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                  strokeOpacity="0.55"
                  className={inView ? "why-seq-2" : ""}
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* Column 1: Phone System & CRM */}
              <div className={`w-[36%] max-w-[145px] flex flex-col justify-between h-[134px] z-10 ${inView ? "why-seq-1" : ""}`}>
                {/* Node 1: Phone System */}
                <div className="bg-[var(--paper)]/90 border border-[var(--peri)]/80 rounded-xl p-2 sm:p-2.5 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-red-50 border border-red-200/60 flex items-center justify-center shrink-0">
                      <PhoneCall size={12} className="text-[#ef7a5e]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[var(--deep)] truncate">
                        Phone System
                      </div>
                      <div className="text-[9px] font-mono text-[var(--mute)] truncate">
                        VoIP &amp; Calls
                      </div>
                    </div>
                  </div>
                </div>

                {/* Node 2: CRM */}
                <div className="bg-[var(--paper)]/90 border border-[var(--peri)]/80 rounded-xl p-2 sm:p-2.5 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-red-50 border border-red-200/60 flex items-center justify-center shrink-0">
                      <Users size={12} className="text-[#ef7a5e]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[var(--deep)] truncate">
                        SaaS CRM
                      </div>
                      <div className="text-[9px] font-mono text-[var(--mute)] truncate">
                        Siloed Contacts
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center: Disconnected Warning */}
              <div className={`z-10 flex flex-col items-center justify-center text-center shrink-0 mx-1 ${inView ? "why-seq-1" : ""}`}>
                <div
                  className="w-9 h-9 rounded-full bg-red-50 text-[#ef7a5e] border-2 border-red-200/80 flex items-center justify-center shadow-xs"
                  title="No direct system link"
                >
                  <Unlink size={15} />
                </div>
                <span className="text-[8px] font-mono font-bold text-[#ef7a5e] bg-white px-2 py-0.5 rounded-full border border-red-200/70 mt-1.5 shadow-2xs whitespace-nowrap">
                  No Direct Sync
                </span>
              </div>

              {/* Column 2: Spreadsheets & Automations */}
              <div className={`w-[36%] max-w-[145px] flex flex-col justify-between h-[134px] z-10 ${inView ? "why-seq-1" : ""}`}>
                {/* Node 3: Spreadsheets */}
                <div className="bg-[var(--paper)]/90 border border-[var(--peri)]/80 rounded-xl p-2 sm:p-2.5 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-red-50 border border-red-200/60 flex items-center justify-center shrink-0">
                      <Table size={12} className="text-[#ef7a5e]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[var(--deep)] truncate">
                        Spreadsheets
                      </div>
                      <div className="text-[9px] font-mono text-[var(--mute)] truncate">
                        Manual CSVs
                      </div>
                    </div>
                  </div>
                </div>

                {/* Node 4: Automations */}
                <div className="bg-[var(--paper)]/90 border border-[var(--peri)]/80 rounded-xl p-2 sm:p-2.5 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-red-50 border border-red-200/60 flex items-center justify-center shrink-0">
                      <Zap size={12} className="text-[#ef7a5e]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[var(--deep)] truncate">
                        Automations
                      </div>
                      <div className="text-[9px] font-mono text-[var(--mute)] truncate">
                        Fragile Zaps
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel Bottom Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-[var(--peri)]/50 text-[11px] font-mono text-[var(--mute)] z-10 relative">
              <span>Scattered data &amp; separate logins</span>
              <span className="text-[#ef7a5e] font-semibold">Fragile connections</span>
            </div>
          </div>

          {/* Panel 2: One Connected System */}
          <div className="bg-white border-2 border-[var(--peri)] rounded-2xl p-5 sm:p-6 lg:p-7 flex flex-col justify-between min-h-[290px] relative overflow-hidden shadow-[0_12px_36px_rgba(87,80,168,0.08)]">
            {/* Panel Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-[var(--mist)] z-10 relative">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--deep)] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                One Connected System
              </span>
              <span className={`text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200/90 px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1.5 ${inView ? "why-seq-5" : ""}`}>
                <span className="why-live-dot" />
                Connected
              </span>
            </div>

            {/* Architecture Diagram: Connected Modules */}
            <div className="relative w-full h-[160px] my-auto flex items-center justify-between px-1 sm:px-2">
              {/* SVG Continuous Conduits */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                viewBox="0 0 460 160"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="why-stream-left" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8478e0" />
                    <stop offset="100%" stopColor="#fd9150" />
                  </linearGradient>
                  <linearGradient id="why-stream-right" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#fd9150" />
                    <stop offset="100%" stopColor="#3ccf91" />
                  </linearGradient>
                </defs>

                {/* Base Faint Conduits */}
                <path
                  d="M 136 35 C 172 35 172 80 208 80"
                  stroke="#8478e0"
                  strokeWidth="2.5"
                  strokeOpacity="0.25"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 136 125 C 172 125 172 80 208 80"
                  stroke="#5750a8"
                  strokeWidth="2.5"
                  strokeOpacity="0.25"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 252 80 C 288 80 288 35 324 35"
                  stroke="#fd9150"
                  strokeWidth="2.5"
                  strokeOpacity="0.25"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 252 80 C 288 80 288 125 324 125"
                  stroke="#3ccf91"
                  strokeWidth="2.5"
                  strokeOpacity="0.25"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Animated Drawing Conduits toward central logo */}
                <path
                  d="M 136 35 C 172 35 172 80 208 80"
                  stroke="url(#why-stream-left)"
                  strokeWidth="2.5"
                  className={inView ? "why-seq-4" : ""}
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 136 125 C 172 125 172 80 208 80"
                  stroke="url(#why-stream-left)"
                  strokeWidth="2.5"
                  className={inView ? "why-seq-4" : ""}
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 252 80 C 288 80 288 35 324 35"
                  stroke="url(#why-stream-right)"
                  strokeWidth="2.5"
                  className={inView ? "why-seq-4" : ""}
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 252 80 C 288 80 288 125 324 125"
                  stroke="url(#why-stream-right)"
                  strokeWidth="2.5"
                  className={inView ? "why-seq-4" : ""}
                  vectorEffect="non-scaling-stroke"
                />

                {/* Subtle slow signal pulses (calm, non-distracting) */}
                {inView && (
                  <>
                    <circle cx="0" cy="0" r="3" fill="#8478e0">
                      <animateMotion
                        dur="3.2s"
                        repeatCount="indefinite"
                        path="M 136 35 C 172 35 172 80 208 80"
                      />
                    </circle>
                    <circle cx="0" cy="0" r="3" fill="#3ccf91">
                      <animateMotion
                        dur="3.2s"
                        repeatCount="indefinite"
                        begin="1.6s"
                        path="M 252 80 C 288 80 288 125 324 125"
                      />
                    </circle>
                  </>
                )}
              </svg>

              {/* Column 1: AI Receptionist & Custom CRM */}
              <div className={`w-[36%] max-w-[145px] flex flex-col justify-between h-[134px] z-10 ${inView ? "why-seq-3" : ""}`}>
                {/* Node 1: AI Receptionist */}
                <div className="bg-[var(--paper)]/95 border border-[var(--peri)] rounded-xl p-2 sm:p-2.5 shadow-2xs hover:border-[var(--lav)] transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-white border border-[var(--peri)]/60 flex items-center justify-center shrink-0 shadow-2xs">
                      <PhoneCall size={12} className="text-[var(--lav)]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[var(--deep)] truncate">
                        AI Voice
                      </div>
                      <div className="text-[9px] font-mono text-[var(--mute)] truncate">
                        Voice Intake
                      </div>
                    </div>
                  </div>
                </div>

                {/* Node 2: Custom CRM */}
                <div className="bg-[var(--paper)]/95 border border-[var(--peri)] rounded-xl p-2 sm:p-2.5 shadow-2xs hover:border-[var(--pur)] transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-white border border-[var(--peri)]/60 flex items-center justify-center shrink-0 shadow-2xs">
                      <Database size={12} className="text-[var(--pur)]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[var(--deep)] truncate">
                        Custom CRM
                      </div>
                      <div className="text-[9px] font-mono text-[var(--mute)] truncate">
                        Relational Core
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center: Deptloy Logo Core Hub */}
              <div className={`z-10 flex flex-col items-center justify-center text-center shrink-0 mx-1 ${inView ? "why-seq-3" : ""}`}>
                <div
                  className="w-11 h-11 rounded-full bg-[var(--deep)] text-[var(--or)] flex items-center justify-center why-hub-ring cursor-default shadow-md"
                  title="Deptloy Central Architecture"
                >
                  <LogoMark className="w-5.5 h-5.5 text-[var(--or)]" />
                </div>
                <span className="text-[8.5px] font-mono font-bold text-[var(--deep)] bg-white px-2 py-0.5 rounded border border-[var(--peri)] mt-1.5 shadow-2xs whitespace-nowrap">
                  Deptloy Core
                </span>
                <span className="text-[7.5px] font-mono text-[var(--mute)]">PostgreSQL</span>
              </div>

              {/* Column 2: Workflows & Custom Apps */}
              <div className={`w-[36%] max-w-[145px] flex flex-col justify-between h-[134px] z-10 ${inView ? "why-seq-3" : ""}`}>
                {/* Node 3: Workflows */}
                <div className="bg-[var(--paper)]/95 border border-[var(--peri)] rounded-xl p-2 sm:p-2.5 shadow-2xs hover:border-[var(--or)] transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-white border border-[var(--peri)]/60 flex items-center justify-center shrink-0 shadow-2xs">
                      <Workflow size={12} className="text-[var(--or)]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[var(--deep)] truncate">
                        Workflows
                      </div>
                      <div className="text-[9px] font-mono text-[var(--mute)] truncate">
                        Instant Triggers
                      </div>
                    </div>
                  </div>
                </div>

                {/* Node 4: Custom Apps */}
                <div className="bg-[var(--paper)]/95 border border-[var(--peri)] rounded-xl p-2 sm:p-2.5 shadow-2xs hover:border-emerald-500 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-white border border-[var(--peri)]/60 flex items-center justify-center shrink-0 shadow-2xs">
                      <Layout size={12} className="text-emerald-600" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[var(--deep)] truncate">
                        Custom Apps
                      </div>
                      <div className="text-[9px] font-mono text-[var(--mute)] truncate">
                        Tailored Portals
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel Bottom Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-[var(--mist)] text-[11px] font-mono text-[var(--mute)] z-10 relative">
              <span>One central database &amp; live sync</span>
              <span className="text-[var(--pur)] font-semibold">Unified platform</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
