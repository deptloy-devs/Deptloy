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
        marginTop: "clamp(24px, 3.2vw, 40px)",
        padding: "clamp(12px, 1.8vw, 20px) 0",
      }}
    >
      <div className="wrap">
        {/* Simplified Header */}
        <div className="max-w-2xl">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--pur)] bg-[var(--mist)] px-2.5 py-0.5 rounded-sm border border-[var(--peri)] inline-block">
            Why Custom Software
          </span>
          <h2
            className="font-extrabold text-[var(--deep)] tracking-tight mt-1.5"
            style={{
              fontSize: "clamp(22px, 2.2vw, 28px)",
              lineHeight: 1.15,
            }}
          >
            Disconnected tools. One connected business.
          </h2>
          <p
            className="text-[var(--mute)] mt-1.5"
            style={{
              fontSize: "clamp(12.5px, 1.05vw, 14px)",
              lineHeight: 1.5,
              maxWidth: "46em",
            }}
          >
            Custom software brings your applications, data, and workflows together.
          </p>
        </div>

        {/* Minimal Two-Column Comparison */}
        <div className="why-grid mt-4">
          {/* Panel 1: Disconnected Tools */}
          <div className="bg-white/85 border border-[#ef7a5e]/30 rounded-xl p-3 sm:p-4 flex flex-col justify-between min-h-[188px] relative overflow-hidden shadow-2xs">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[var(--peri)]/50 z-10 relative">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--mute)] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ef7a5e]" />
                Disconnected Tools
              </span>
              <span className="text-[9px] font-mono text-[#ef7a5e] bg-[#ef7a5e]/10 border border-[#ef7a5e]/25 px-2 py-0.5 rounded-full font-semibold">
                Isolated Apps
              </span>
            </div>

            {/* Architecture Diagram: Disconnected Nodes */}
            <div className="relative w-full h-[106px] my-auto flex items-center justify-between px-0.5 sm:px-1">
              {/* SVG Disconnected Lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                viewBox="0 0 380 106"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {/* Broken paths stopping short of the center */}
                <path
                  d="M 114 26 C 136 26 142 42 152 48"
                  stroke="#ef7a5e"
                  strokeWidth="1.75"
                  strokeDasharray="3 3"
                  strokeOpacity="0.55"
                  className={inView ? "why-seq-2" : ""}
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 114 80 C 136 80 142 64 152 58"
                  stroke="#ef7a5e"
                  strokeWidth="1.75"
                  strokeDasharray="3 3"
                  strokeOpacity="0.55"
                  className={inView ? "why-seq-2" : ""}
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 228 48 C 238 42 244 26 266 26"
                  stroke="#ef7a5e"
                  strokeWidth="1.75"
                  strokeDasharray="3 3"
                  strokeOpacity="0.55"
                  className={inView ? "why-seq-2" : ""}
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 228 58 C 238 64 244 80 266 80"
                  stroke="#ef7a5e"
                  strokeWidth="1.75"
                  strokeDasharray="3 3"
                  strokeOpacity="0.55"
                  className={inView ? "why-seq-2" : ""}
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* Left Column: Phone System & CRM */}
              <div className={`w-[32%] max-w-[114px] flex flex-col justify-between h-[86px] z-10 ${inView ? "why-seq-1" : ""}`}>
                {/* Node 1: Phone System */}
                <div className="bg-[var(--paper)]/80 border border-[var(--peri)]/70 rounded-md px-2 py-1 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-[var(--deep)]">
                    <PhoneCall size={11} className="text-[#ef7a5e]/80 shrink-0" />
                    <span className="truncate">Phone System</span>
                  </div>
                  <div className="text-[7.5px] font-mono text-[var(--mute)] truncate mt-0.5">
                    VoIP &amp; Calls
                  </div>
                </div>

                {/* Node 2: CRM */}
                <div className="bg-[var(--paper)]/80 border border-[var(--peri)]/70 rounded-md px-2 py-1 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-[var(--deep)]">
                    <Users size={11} className="text-[#ef7a5e]/80 shrink-0" />
                    <span className="truncate">CRM</span>
                  </div>
                  <div className="text-[7.5px] font-mono text-[var(--mute)] truncate mt-0.5">
                    Contacts List
                  </div>
                </div>
              </div>

              {/* Center: Disconnected Indicator */}
              <div className={`z-10 flex flex-col items-center justify-center text-center shrink-0 mx-1 ${inView ? "why-seq-1" : ""}`}>
                <div
                  className="w-7 h-7 rounded-full bg-red-50 text-[#ef7a5e] border border-red-200/70 flex items-center justify-center shadow-2xs"
                  title="Isolated applications"
                >
                  <Unlink size={12} />
                </div>
                <span className="text-[7px] font-mono font-bold text-[#ef7a5e] bg-white px-1.5 py-0.2 rounded border border-red-200/60 mt-1 shadow-2xs whitespace-nowrap">
                  No Sync
                </span>
              </div>

              {/* Right Column: Spreadsheets & Automations */}
              <div className={`w-[32%] max-w-[114px] flex flex-col justify-between h-[86px] z-10 ${inView ? "why-seq-1" : ""}`}>
                {/* Node 3: Spreadsheets */}
                <div className="bg-[var(--paper)]/80 border border-[var(--peri)]/70 rounded-md px-2 py-1 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-[var(--deep)]">
                    <Table size={11} className="text-[#ef7a5e]/80 shrink-0" />
                    <span className="truncate">Spreadsheets</span>
                  </div>
                  <div className="text-[7.5px] font-mono text-[var(--mute)] truncate mt-0.5">
                    Manual CSVs
                  </div>
                </div>

                {/* Node 4: Automations */}
                <div className="bg-[var(--paper)]/80 border border-[var(--peri)]/70 rounded-md px-2 py-1 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-[var(--deep)]">
                    <Zap size={11} className="text-[#ef7a5e]/80 shrink-0" />
                    <span className="truncate">Automations</span>
                  </div>
                  <div className="text-[7.5px] font-mono text-[var(--mute)] truncate mt-0.5">
                    Fragmented Zaps
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex items-center justify-between pt-1.5 border-t border-[var(--peri)]/40 text-[9px] font-mono text-[var(--mute)] z-10 relative">
              <span>Scattered data &amp; separate logins</span>
              <span className="text-[#ef7a5e] font-semibold">Fragile connections</span>
            </div>
          </div>

          {/* Panel 2: One Connected System */}
          <div className="bg-white border border-[var(--peri)] shadow-[0_4px_24px_rgba(87,80,168,0.06)] rounded-xl p-3 sm:p-4 flex flex-col justify-between min-h-[188px] relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[var(--mist)] z-10 relative">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--deep)] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                One Connected System
              </span>
              <span className={`text-[9px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1 ${inView ? "why-seq-5" : ""}`}>
                <span className="why-live-dot" />
                Connected
              </span>
            </div>

            {/* Architecture Diagram: Connected Nodes to Deptloy Core */}
            <div className="relative w-full h-[106px] my-auto flex items-center justify-between px-0.5 sm:px-1">
              {/* SVG Connected Conduits */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                viewBox="0 0 380 106"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="why-conduit-l" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8478e0" />
                    <stop offset="100%" stopColor="#fd9150" />
                  </linearGradient>
                  <linearGradient id="why-conduit-r" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#fd9150" />
                    <stop offset="100%" stopColor="#3ccf91" />
                  </linearGradient>
                </defs>

                {/* Base Faint Paths */}
                <path
                  d="M 114 26 C 144 26 144 53 174 53"
                  stroke="#8478e0"
                  strokeWidth="2"
                  strokeOpacity="0.2"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 114 80 C 144 80 144 53 174 53"
                  stroke="#5750a8"
                  strokeWidth="2"
                  strokeOpacity="0.2"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 206 53 C 236 53 236 26 266 26"
                  stroke="#fd9150"
                  strokeWidth="2"
                  strokeOpacity="0.2"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 206 53 C 236 53 236 80 266 80"
                  stroke="#3ccf91"
                  strokeWidth="2"
                  strokeOpacity="0.2"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Animated Drawing Conduits toward central logo */}
                <path
                  d="M 114 26 C 144 26 144 53 174 53"
                  stroke="url(#why-conduit-l)"
                  strokeWidth="2"
                  className={inView ? "why-seq-4" : ""}
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 114 80 C 144 80 144 53 174 53"
                  stroke="url(#why-conduit-l)"
                  strokeWidth="2"
                  className={inView ? "why-seq-4" : ""}
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 206 53 C 236 53 236 26 266 26"
                  stroke="url(#why-conduit-r)"
                  strokeWidth="2"
                  className={inView ? "why-seq-4" : ""}
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 206 53 C 236 53 236 80 266 80"
                  stroke="url(#why-conduit-r)"
                  strokeWidth="2"
                  className={inView ? "why-seq-4" : ""}
                  vectorEffect="non-scaling-stroke"
                />

                {/* Subtle slow signal pulses (calm, non-distracting) */}
                {inView && (
                  <>
                    <circle cx="0" cy="0" r="2.5" fill="#8478e0">
                      <animateMotion
                        dur="3.2s"
                        repeatCount="indefinite"
                        path="M 114 26 C 144 26 144 53 174 53"
                      />
                    </circle>
                    <circle cx="0" cy="0" r="2.5" fill="#3ccf91">
                      <animateMotion
                        dur="3.2s"
                        repeatCount="indefinite"
                        begin="1.6s"
                        path="M 206 53 C 236 53 236 80 266 80"
                      />
                    </circle>
                  </>
                )}
              </svg>

              {/* Left Column: AI Receptionist & Custom CRM */}
              <div className={`w-[32%] max-w-[114px] flex flex-col justify-between h-[86px] z-10 ${inView ? "why-seq-3" : ""}`}>
                {/* Node 1: AI Receptionist */}
                <div className="bg-[var(--paper)] border border-[var(--peri)] rounded-md px-2 py-1 shadow-2xs hover:border-[var(--lav)] transition-colors">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-[var(--deep)]">
                    <PhoneCall size={11} className="text-[var(--lav)] shrink-0" />
                    <span className="truncate">AI Receptionist</span>
                  </div>
                  <div className="text-[7.5px] font-mono text-[var(--mute)] truncate mt-0.5">
                    Voice &amp; Inbound
                  </div>
                </div>

                {/* Node 2: Custom CRM */}
                <div className="bg-[var(--paper)] border border-[var(--peri)] rounded-md px-2 py-1 shadow-2xs hover:border-[var(--pur)] transition-colors">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-[var(--deep)]">
                    <Database size={11} className="text-[var(--pur)] shrink-0" />
                    <span className="truncate">Custom CRM</span>
                  </div>
                  <div className="text-[7.5px] font-mono text-[var(--mute)] truncate mt-0.5">
                    Unified Records
                  </div>
                </div>
              </div>

              {/* Center: Deptloy Logo Core Hub */}
              <div className={`z-10 flex flex-col items-center justify-center text-center shrink-0 mx-1 ${inView ? "why-seq-3" : ""}`}>
                <div
                  className="w-8 h-8 rounded-full bg-[var(--deep)] text-[var(--or)] flex items-center justify-center why-hub-ring cursor-default shadow-xs"
                  title="Deptloy Central Architecture"
                >
                  <LogoMark className="w-4 h-4 text-[var(--or)]" />
                </div>
                <span className="text-[7.5px] font-mono font-bold text-[var(--deep)] bg-white px-1.5 py-0.2 rounded border border-[var(--peri)] mt-1 shadow-2xs whitespace-nowrap">
                  Deptloy Core
                </span>
              </div>

              {/* Right Column: Workflows & Custom Apps */}
              <div className={`w-[32%] max-w-[114px] flex flex-col justify-between h-[86px] z-10 ${inView ? "why-seq-3" : ""}`}>
                {/* Node 3: Workflows */}
                <div className="bg-[var(--paper)] border border-[var(--peri)] rounded-md px-2 py-1 shadow-2xs hover:border-[var(--or)] transition-colors">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-[var(--deep)]">
                    <Workflow size={11} className="text-[var(--or)] shrink-0" />
                    <span className="truncate">Workflows</span>
                  </div>
                  <div className="text-[7.5px] font-mono text-[var(--mute)] truncate mt-0.5">
                    Automated Actions
                  </div>
                </div>

                {/* Node 4: Custom Apps */}
                <div className="bg-[var(--paper)] border border-[var(--peri)] rounded-md px-2 py-1 shadow-2xs hover:border-emerald-500 transition-colors">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-[var(--deep)]">
                    <Layout size={11} className="text-[#3ccf91] shrink-0" />
                    <span className="truncate">Custom Apps</span>
                  </div>
                  <div className="text-[7.5px] font-mono text-[var(--mute)] truncate mt-0.5">
                    Tailored Portals
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex items-center justify-between pt-1.5 border-t border-[var(--mist)] text-[9px] font-mono text-[var(--mute)] z-10 relative">
              <span>One central database &amp; live sync</span>
              <span className="text-[var(--pur)] font-semibold">Unified platform</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
