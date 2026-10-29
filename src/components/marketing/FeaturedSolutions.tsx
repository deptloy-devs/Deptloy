"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Activity,
  Clock,
  Truck,
  Navigation,
  Users,
} from "lucide-react";

export function FeaturedSolutions() {
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
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="relative"
      style={{
        paddingTop: "clamp(48px, 5.5vw, 76px)",
        paddingBottom: "0",
      }}
    >
      <div className="wrap">
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--pur)] bg-[var(--mist)] px-3 py-1 rounded-sm border border-[var(--peri)] inline-block">
            WHAT WE CAN BUILD
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--deep)] tracking-tight leading-tight mt-2.5">
            Software built around real business operations.
          </h2>
          <p className="text-sm sm:text-base text-[var(--mute)] max-w-2xl leading-relaxed mt-2">
            From healthcare operations to logistics platforms, we engineer custom applications designed around how businesses work.
          </p>

          {/* Honest Conceptual Disclosure */}
          <div className="mt-3.5 inline-flex items-center gap-2 text-[11px] font-mono text-[var(--mute)] bg-white/80 border border-[var(--peri)]/70 px-3 py-1 rounded-md shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--or)] shrink-0" />
            <span>Illustrative software concepts showing the types of custom platforms we can engineer.</span>
          </div>
        </div>

        {/* Featured Solutions Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-7 mt-8">
          {/* =========================================================================
              SOLUTION 1: HEALTHCARE OPERATIONS
             ========================================================================= */}
          <article
            className={`solution-preview-card bg-white border border-[var(--peri)] rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-[0_10px_30px_rgba(87,80,168,0.05)] hover:border-[var(--pur)]/60 hover:shadow-[0_16px_40px_rgba(87,80,168,0.09)] group ${
              inView ? "solution-card-1" : "opacity-0"
            }`}
          >
            {/* Top Info */}
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[10.5px] font-bold text-[var(--pur)] uppercase tracking-wider">
                  HEALTHCARE OPERATIONS
                </span>
                <span className="text-[10px] font-mono font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Clinic Queue
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[var(--deep)] tracking-tight mt-1.5 leading-snug">
                A connected workspace for modern healthcare teams.
              </h3>
            </div>

            {/* Miniature Healthcare Application Interface Mockup */}
            <div className="my-5 bg-[#f8fafc] border border-slate-200/80 rounded-xl p-3 sm:p-3.5 shadow-inner">
              {/* Mini Clinic Topbar */}
              <div className="flex flex-wrap items-center justify-between gap-1 pb-2 border-b border-slate-200 text-[10.5px] font-mono">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <Activity size={12} className="text-[var(--lav)] shrink-0" />
                  <span>CareOS · Clinic 2B</span>
                </div>
                <div className="flex items-center gap-2 text-[9.5px] text-slate-500">
                  <span className="hidden xs:inline">Dr. Vance</span>
                  <span className="text-emerald-600 font-semibold">● 100% Staffed</span>
                </div>
              </div>

              {/* Two-Column Clinical Schedule & Patient Queue */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2.5 text-[11px]">
                {/* Left: Patient Queue */}
                <div className="bg-white border border-slate-200/70 rounded-lg p-2.5 shadow-2xs">
                  <div className="flex items-center justify-between text-[9.5px] font-mono font-bold text-slate-500 uppercase pb-1.5 border-b border-slate-100">
                    <span>Patient Queue</span>
                    <span className="text-[var(--pur)]">3 Waiting</span>
                  </div>
                  <div className="space-y-1.5 mt-2">
                    <div className="flex items-center justify-between bg-slate-50 px-2 py-1 rounded text-[10px]">
                      <div>
                        <span className="font-bold text-slate-800 block leading-tight">Sarah L.</span>
                        <span className="text-[8.5px] font-mono text-slate-500">09:15 · Consultation</span>
                      </div>
                      <span className="text-[8.5px] font-mono font-semibold bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200/60">
                        Exam Rm 2
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-slate-50 px-2 py-1 rounded text-[10px]">
                      <div>
                        <span className="font-bold text-slate-800 block leading-tight">Marcus K.</span>
                        <span className="text-[8.5px] font-mono text-slate-500">09:30 · Vitals Done</span>
                      </div>
                      <span className="text-[8.5px] font-mono font-semibold bg-[var(--mist)] text-[var(--pur)] px-1.5 py-0.5 rounded border border-[var(--peri)]">
                        In Triage
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-slate-50 px-2 py-1 rounded text-[10px]">
                      <div>
                        <span className="font-bold text-slate-800 block leading-tight">Elena R.</span>
                        <span className="text-[8.5px] font-mono text-slate-500">09:45 · Checked In</span>
                      </div>
                      <span className="text-[8.5px] font-mono font-semibold bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded border border-amber-200/60">
                        Waiting
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Provider Schedule & Room Allocation */}
                <div className="bg-white border border-slate-200/70 rounded-lg p-2.5 shadow-2xs">
                  <div className="flex items-center justify-between text-[9.5px] font-mono font-bold text-slate-500 uppercase pb-1.5 border-b border-slate-100">
                    <span>Provider Schedule</span>
                    <span className="text-slate-400">Oct 28</span>
                  </div>
                  <div className="space-y-1.5 mt-2 text-[10px]">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                      <div className="flex items-center gap-1.5">
                        <Users size={11} className="text-slate-400 shrink-0" />
                        <span className="font-semibold text-slate-800">Dr. Chen (Cardiology)</span>
                      </div>
                      <span className="text-[8.5px] font-mono text-emerald-600 font-bold">Available</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                      <div className="flex items-center gap-1.5">
                        <Clock size={11} className="text-slate-400 shrink-0" />
                        <span className="font-semibold text-slate-800">Dr. Vance (Surgery)</span>
                      </div>
                      <span className="text-[8.5px] font-mono text-amber-600 font-bold">In Surgery</span>
                    </div>

                    <div className="pt-1 flex items-center justify-between text-[9px] font-mono text-slate-500">
                      <span>Room Capacity</span>
                      <span className="text-slate-700 font-bold">4 of 5 Occupied</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action CTA Link */}
            <div className="pt-3 mt-1 border-t border-[var(--mist)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-[11.5px] sm:text-xs text-[var(--mute)]">
                EMR sync · Staff scheduling · Patient intake
              </span>
              <Link
                href="/projects/care-network"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[var(--pur)] group-hover:text-[var(--deep)] transition-colors shrink-0"
              >
                <span>Explore Healthcare Solution</span>
                <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </article>

          {/* =========================================================================
              SOLUTION 2: LOGISTICS & FIELD OPERATIONS
             ========================================================================= */}
          <article
            className={`solution-preview-card bg-white border border-[var(--peri)] rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-[0_10px_30px_rgba(87,80,168,0.05)] hover:border-[var(--or)]/60 hover:shadow-[0_16px_40px_rgba(87,80,168,0.09)] group ${
              inView ? "solution-card-2" : "opacity-0"
            }`}
          >
            {/* Top Info */}
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[10.5px] font-bold text-[var(--or)] uppercase tracking-wider">
                  LOGISTICS &amp; FIELD OPERATIONS
                </span>
                <span className="text-[10px] font-mono font-semibold text-amber-800 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  Active Fleet Dispatch
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[var(--deep)] tracking-tight mt-1.5 leading-snug">
                One workspace for dispatch, tracking, and field teams.
              </h3>
            </div>

            {/* Miniature Logistics Application Interface Mockup */}
            <div className="my-5 bg-[#0f172a] text-slate-200 border border-slate-800 rounded-xl p-3 sm:p-3.5 shadow-inner">
              {/* Mini Dispatch Topbar */}
              <div className="flex flex-wrap items-center justify-between gap-1 pb-2 border-b border-slate-800 text-[10.5px] font-mono">
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <Truck size={12} className="text-[var(--or)] shrink-0" />
                  <span className="truncate">FleetHub · Metro North</span>
                </div>
                <div className="flex items-center gap-2 text-[9.5px] text-slate-400">
                  <span className="hidden xs:inline">8 Active Drivers</span>
                  <span className="text-emerald-400 font-semibold">● 98.4% On-Time</span>
                </div>
              </div>

              {/* Two-Column Route Manifest & Route Waypoint Map */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2.5 text-[11px]">
                {/* Left: Dispatch Runs */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-2.5 shadow-2xs">
                  <div className="flex items-center justify-between text-[9.5px] font-mono font-bold text-slate-400 uppercase pb-1.5 border-b border-slate-800">
                    <span>Active Manifests</span>
                    <span className="text-[var(--or)]">Live GPS</span>
                  </div>
                  <div className="space-y-1.5 mt-2">
                    <div className="bg-slate-800/80 px-2 py-1.5 rounded text-[10px] border border-slate-700/60">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">Run #408 · Marcus T.</span>
                        <span className="text-[8px] font-mono bg-emerald-950 text-emerald-400 px-1.5 py-0.2 rounded border border-emerald-800">
                          In Transit
                        </span>
                      </div>
                      <div className="text-[8.5px] font-mono text-slate-400 mt-0.5 flex justify-between">
                        <span>Van 14 · ETA 10:45 AM</span>
                        <span className="text-slate-300">9/12 Drops</span>
                      </div>
                      {/* Mini Progress Bar */}
                      <div className="w-full h-1 bg-slate-700 rounded-full mt-1 overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: "75%" }} />
                      </div>
                    </div>

                    <div className="bg-slate-800/80 px-2 py-1.5 rounded text-[10px] border border-slate-700/60">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">Run #412 · David S.</span>
                        <span className="text-[8px] font-mono bg-amber-950 text-amber-400 px-1.5 py-0.2 rounded border border-amber-800">
                          At Dock 3
                        </span>
                      </div>
                      <div className="text-[8.5px] font-mono text-slate-400 mt-0.5 flex justify-between">
                        <span>Truck 03 · Offloading</span>
                        <span className="text-slate-300">Priority B</span>
                      </div>
                      <div className="w-full h-1 bg-slate-700 rounded-full mt-1 overflow-hidden">
                        <div className="h-full bg-[var(--or)] rounded-full" style={{ width: "35%" }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Route Telemetry & Waypoint Map */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-2.5 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[9.5px] font-mono font-bold text-slate-400 uppercase pb-1.5 border-b border-slate-800">
                      <span>Route Corridor</span>
                      <span className="text-slate-500">Sector 4</span>
                    </div>

                    {/* Vector Route Map Visualization */}
                    <div className="relative w-full h-[66px] bg-slate-950/80 rounded border border-slate-800/70 mt-2 overflow-hidden flex items-center justify-center">
                      <svg className="w-full h-full" viewBox="0 0 160 66" preserveAspectRatio="none">
                        {/* Faint Grid Lines */}
                        <line x1="0" y1="22" x2="160" y2="22" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 2" />
                        <line x1="0" y1="44" x2="160" y2="44" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 2" />
                        <line x1="50" y1="0" x2="50" y2="66" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 2" />
                        <line x1="110" y1="0" x2="110" y2="66" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 2" />

                        {/* Route Corridor Path */}
                        <path
                          d="M 16 48 L 52 24 L 108 40 L 144 16"
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="2"
                          strokeDasharray="4 3"
                        />

                        {/* Waypoints */}
                        <circle cx="16" cy="48" r="3.5" fill="#64748b" />
                        <circle cx="52" cy="24" r="3.5" fill="#64748b" />
                        {/* Active Vehicle Marker */}
                        <circle cx="108" cy="40" r="4.5" fill="#fd9150" />
                        <circle cx="108" cy="40" r="8" fill="#fd9150" fillOpacity="0.3" className="animate-ping" />
                        <circle cx="144" cy="16" r="3.5" fill="#3ccf91" />
                      </svg>
                    </div>
                  </div>

                  <div className="mt-1.5 flex items-center justify-between text-[8.5px] font-mono text-slate-400 pt-1 border-t border-slate-800/60">
                    <span className="flex items-center gap-1">
                      <Navigation size={9} className="text-[var(--or)]" />
                      Next: Hub #08
                    </span>
                    <span className="text-slate-300">Avg Speed: 42 mph</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action CTA Link */}
            <div className="pt-3 mt-1 border-t border-[var(--mist)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-[11.5px] sm:text-xs text-[var(--mute)]">
                Live dispatch · Telemetry · Driver updates
              </span>
              <Link
                href="/projects/field-operations"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[var(--or)] group-hover:text-[var(--deep)] transition-colors shrink-0"
              >
                <span>Explore Logistics Solution</span>
                <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
