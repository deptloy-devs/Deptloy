"use client";

import * as React from "react";
import { PhoneCall, Database, Workflow, Layout, AlertTriangle } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";

export function WhyDeptloySection() {
  return (
    <section
      id="why"
      className="relative"
      style={{
        marginTop: "clamp(20px, 2.8vw, 32px)",
        padding: "clamp(12px, 1.6vw, 18px) 0",
      }}
    >
      <div className="wrap">
        {/* Compact Header: One short heading and one supporting sentence */}
        <div className="max-w-2xl">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--pur)] bg-[var(--mist)] px-2.5 py-0.5 rounded-sm border border-[var(--peri)] inline-block">
            Why Custom Software
          </span>
          <h2
            className="font-extrabold text-[var(--deep)] tracking-tight mt-1.5"
            style={{
              fontSize: "clamp(22px, 2.2vw, 26px)",
              lineHeight: 1.15,
              maxWidth: "none",
            }}
          >
            Why companies build custom software.
          </h2>
          <p
            className="text-[var(--mute)] mt-1"
            style={{
              fontSize: "clamp(12px, 1.05vw, 13.5px)",
              lineHeight: 1.45,
              maxWidth: "48em",
            }}
          >
            Generic subscriptions scatter your data across rigid silos. Deptloy engineers a single, connected platform combining AI receptionists, custom CRM, automated workflows, and tailored web apps.
          </p>
        </div>

        {/* Visual Comparison: 4 Disconnected Silos vs All 4 Services Unified */}
        <div className="why-grid mt-3">
          {/* Side A: Disconnected SaaS Apps */}
          <div className="bg-[var(--paper)]/90 border border-dashed border-[#ef7a5e]/40 rounded-xl p-2.5 sm:p-3 flex flex-col justify-between h-[164px] relative overflow-hidden shadow-2xs">
            <div className="flex items-center justify-between pb-1.5 border-b border-[var(--peri)]/60 z-10 relative">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--mute)] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ef7a5e]" />
                Disconnected SaaS Apps
              </span>
              <span className="text-[9px] font-mono text-[#ef7a5e] bg-[#ef7a5e]/10 border border-[#ef7a5e]/25 px-2 py-0.5 rounded-full font-bold">
                ✕ 4 Fragile Silos
              </span>
            </div>

            {/* Micro Architecture Diagram - 4 Broken Silos */}
            <div className="relative w-full h-[100px] my-auto flex items-center justify-between px-0.5 sm:px-1">
              {/* Broken Dashed SVG Lines with Failed Packets */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                viewBox="0 0 400 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {/* Top-Left to Center Broken Conduit */}
                <path
                  d="M 120 24 C 144 24 148 40 158 45"
                  stroke="#ef7a5e"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                  strokeOpacity="0.6"
                  vectorEffect="non-scaling-stroke"
                />
                {/* Bottom-Left to Center Broken Conduit */}
                <path
                  d="M 120 76 C 144 76 148 60 158 55"
                  stroke="#ef7a5e"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                  strokeOpacity="0.6"
                  vectorEffect="non-scaling-stroke"
                />
                {/* Center to Top-Right Broken Conduit */}
                <path
                  d="M 242 45 C 252 40 256 24 280 24"
                  stroke="#ef7a5e"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                  strokeOpacity="0.6"
                  vectorEffect="non-scaling-stroke"
                />
                {/* Center to Bottom-Right Broken Conduit */}
                <path
                  d="M 242 55 C 252 60 256 76 280 76"
                  stroke="#ef7a5e"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                  strokeOpacity="0.6"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Packet fading out before reaching center */}
                <circle cx="0" cy="0" r="3" fill="#ef7a5e">
                  <animateMotion
                    dur="2s"
                    repeatCount="indefinite"
                    path="M 120 24 C 144 24 148 40 158 45"
                  />
                  <animate
                    attributeName="opacity"
                    values="1;0.6;0"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>

              {/* Column 1: Silo 1 & 2 */}
              <div className="w-[32%] max-w-[120px] flex flex-col justify-between h-[84px] z-10">
                {/* Silo 1: VoIP Phone */}
                <div className="bg-white border border-[var(--peri)] rounded-md px-1.5 py-1 shadow-2xs why-card-float">
                  <div className="flex items-center justify-between text-[8px] font-bold text-[var(--deep)]">
                    <span className="truncate">VoIP Phone</span>
                    <span className="text-[6.5px] font-mono text-[#ef7a5e] shrink-0 ml-1">Silo 1</span>
                  </div>
                  <div className="text-[7px] font-mono text-[#ef7a5e] truncate mt-0.5">
                    Call 2:14 · Stuck ⚠
                  </div>
                </div>

                {/* Silo 2: Generic CRM */}
                <div className="bg-white border border-[var(--peri)] rounded-md px-1.5 py-1 shadow-2xs why-card-float-delayed">
                  <div className="flex items-center justify-between text-[8px] font-bold text-[var(--deep)]">
                    <span className="truncate">Generic CRM</span>
                    <span className="text-[6.5px] font-mono text-[#ef7a5e] shrink-0 ml-1">Silo 2</span>
                  </div>
                  <div className="text-[7px] font-mono text-[#ef7a5e] truncate mt-0.5">
                    Lead #4082 · Desynced ✕
                  </div>
                </div>
              </div>

              {/* Center: Broken Zapier / Manual CSV Drift */}
              <div className="z-10 flex flex-col items-center justify-center text-center shrink-0 mx-1">
                <div
                  className="w-7 h-7 rounded-full bg-red-50 text-[#ef7a5e] border border-red-200 flex items-center justify-center shadow-xs why-err-pulse"
                  title="Broken webhook or manual CSV export"
                >
                  <AlertTriangle size={13} />
                </div>
                <span className="text-[7px] font-mono font-bold text-[#ef7a5e] bg-white px-1.5 py-0.2 rounded border border-red-200 mt-0.5 shadow-2xs whitespace-nowrap">
                  Sync Drift
                </span>
              </div>

              {/* Column 2: Silo 3 & 4 */}
              <div className="w-[32%] max-w-[120px] flex flex-col justify-between h-[84px] z-10">
                {/* Silo 3: Fragile Zaps */}
                <div className="bg-white border border-[var(--peri)] rounded-md px-1.5 py-1 shadow-2xs why-card-float">
                  <div className="flex items-center justify-between text-[8px] font-bold text-[var(--deep)]">
                    <span className="truncate">Fragile Zaps</span>
                    <span className="text-[6.5px] font-mono text-[#ef7a5e] shrink-0 ml-1">Silo 3</span>
                  </div>
                  <div className="text-[7px] font-mono text-[#ef7a5e] truncate mt-0.5">
                    Webhook Fail · 504 ⚠
                  </div>
                </div>

                {/* Silo 4: Spreadsheets */}
                <div className="bg-white border border-[var(--peri)] rounded-md px-1.5 py-1 shadow-2xs why-card-float-delayed">
                  <div className="flex items-center justify-between text-[8px] font-bold text-[var(--deep)]">
                    <span className="truncate">Spreadsheets</span>
                    <span className="text-[6.5px] font-mono text-[#ef7a5e] shrink-0 ml-1">Silo 4</span>
                  </div>
                  <div className="text-[7px] font-mono text-[#ef7a5e] truncate mt-0.5">
                    Manual CSV · Stale ✕
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-[var(--peri)]/50 text-[9.5px] font-mono text-[var(--mute)] z-10 relative">
              <span>Scattered logins, broken zaps &amp; siloed data</span>
              <span className="text-[#ef7a5e] font-semibold">Fragile connectors</span>
            </div>
          </div>

          {/* Side B: One Connected System (All 4 Services Unified) */}
          <div className="bg-white border border-[var(--peri)] shadow-[0_6px_22px_rgba(87,80,168,0.08)] rounded-xl p-2.5 sm:p-3 flex flex-col justify-between h-[164px] relative overflow-hidden">
            <div className="flex items-center justify-between pb-1.5 border-b border-[var(--mist)] z-10 relative">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--deep)] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                One Connected System
              </span>
              <span className="text-[9px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                ✓ All 4 Services Unified
              </span>
            </div>

            {/* Micro Architecture Diagram - Connected Flow across all 4 Services */}
            <div className="relative w-full h-[100px] my-auto flex items-center justify-between px-0.5 sm:px-1">
              {/* Flowing Animated Stream with Traveling Signals */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                viewBox="0 0 400 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="why-stream-tl" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8478e0" />
                    <stop offset="100%" stopColor="#fd9150" />
                  </linearGradient>
                  <linearGradient id="why-stream-bl" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#5750a8" />
                    <stop offset="100%" stopColor="#fd9150" />
                  </linearGradient>
                  <linearGradient id="why-stream-tr" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#fd9150" />
                    <stop offset="100%" stopColor="#8478e0" />
                  </linearGradient>
                  <linearGradient id="why-stream-br" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#fd9150" />
                    <stop offset="100%" stopColor="#3ccf91" />
                  </linearGradient>
                </defs>

                {/* Base Faint Conduits */}
                <path
                  d="M 120 24 C 150 24 150 50 182 50"
                  stroke="#8478e0"
                  strokeWidth="2"
                  strokeOpacity="0.25"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 120 76 C 150 76 150 50 182 50"
                  stroke="#5750a8"
                  strokeWidth="2"
                  strokeOpacity="0.25"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 218 50 C 250 50 250 24 280 24"
                  stroke="#fd9150"
                  strokeWidth="2"
                  strokeOpacity="0.25"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 218 50 C 250 50 250 76 280 76"
                  stroke="#3ccf91"
                  strokeWidth="2"
                  strokeOpacity="0.25"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Animated Stream Lines */}
                <path
                  d="M 120 24 C 150 24 150 50 182 50"
                  stroke="url(#why-stream-tl)"
                  strokeWidth="2.2"
                  strokeDasharray="4 6"
                  className="why-flow-line"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 120 76 C 150 76 150 50 182 50"
                  stroke="url(#why-stream-bl)"
                  strokeWidth="2.2"
                  strokeDasharray="4 6"
                  className="why-flow-line"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 218 50 C 250 50 250 24 280 24"
                  stroke="url(#why-stream-tr)"
                  strokeWidth="2.2"
                  strokeDasharray="4 6"
                  className="why-flow-line"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 218 50 C 250 50 250 76 280 76"
                  stroke="url(#why-stream-br)"
                  strokeWidth="2.2"
                  strokeDasharray="4 6"
                  className="why-flow-line"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Traveling Data Packets across all 4 services */}
                {/* Packet 1: AI Call Intake entering Core */}
                <circle cx="0" cy="0" r="3" fill="#8478e0">
                  <animateMotion
                    dur="2s"
                    repeatCount="indefinite"
                    path="M 120 24 C 150 24 150 50 182 50"
                  />
                </circle>
                {/* Packet 2: Core syncing into Custom CRM */}
                <circle cx="0" cy="0" r="3" fill="#5750a8">
                  <animateMotion
                    dur="2s"
                    repeatCount="indefinite"
                    begin="0.5s"
                    path="M 182 50 C 150 50 150 76 120 76"
                  />
                </circle>
                {/* Packet 3: Core triggering Automations */}
                <circle cx="0" cy="0" r="3" fill="#fd9150">
                  <animateMotion
                    dur="2s"
                    repeatCount="indefinite"
                    begin="1.0s"
                    path="M 218 50 C 250 50 250 24 280 24"
                  />
                </circle>
                {/* Packet 4: Core syncing into Custom Portal & Apps */}
                <circle cx="0" cy="0" r="3" fill="#3ccf91">
                  <animateMotion
                    dur="2s"
                    repeatCount="indefinite"
                    begin="1.5s"
                    path="M 218 50 C 250 50 250 76 280 76"
                  />
                </circle>
              </svg>

              {/* Column 1: Services 1 & 2 */}
              <div className="w-[32%] max-w-[120px] flex flex-col justify-between h-[84px] z-10">
                {/* Service 1: AI Receptionist */}
                <div className="bg-[var(--paper)] border border-[var(--peri)] rounded-md px-1.5 py-1 shadow-2xs why-card-float">
                  <div className="flex items-center justify-between text-[8px] font-bold text-[var(--deep)]">
                    <span className="truncate flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
                      AI Receptionist
                    </span>
                    <span className="text-[6.5px] font-mono text-emerald-600 font-bold shrink-0">Live</span>
                  </div>
                  <div className="text-[7px] font-mono text-[var(--mute)] truncate mt-0.5">
                    Voice Intake · 0ms
                  </div>
                </div>

                {/* Service 2: Custom CRM */}
                <div className="bg-[var(--paper)] border border-[var(--peri)] rounded-md px-1.5 py-1 shadow-2xs why-card-float-delayed">
                  <div className="flex items-center justify-between text-[8px] font-bold text-[var(--deep)]">
                    <span className="truncate flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--pur)] shrink-0" />
                      Custom CRM
                    </span>
                    <span className="text-[6.5px] font-mono text-[var(--pur)] font-bold shrink-0">Synced</span>
                  </div>
                  <div className="text-[7px] font-mono text-[var(--deep)] font-semibold truncate mt-0.5">
                    Maya R. · Saved
                  </div>
                </div>
              </div>

              {/* Center: Deptloy Relational Core Hub */}
              <div className="z-10 flex flex-col items-center justify-center text-center shrink-0 mx-1">
                <div
                  className="w-8 h-8 rounded-full bg-[var(--deep)] text-[var(--or)] flex items-center justify-center why-hub-ring cursor-default"
                  title="Deptloy PostgreSQL Core"
                >
                  <LogoMark className="w-4 h-4.5" />
                </div>
                <span className="text-[7px] font-mono font-bold text-[var(--deep)] bg-white/95 px-1.5 py-0.2 rounded border border-[var(--peri)] mt-0.5 shadow-2xs whitespace-nowrap">
                  Deptloy Core
                </span>
                <span className="text-[6.5px] font-mono text-[var(--mute)]">PostgreSQL</span>
              </div>

              {/* Column 2: Services 3 & 4 */}
              <div className="w-[32%] max-w-[120px] flex flex-col justify-between h-[84px] z-10">
                {/* Service 3: Automated Workflows */}
                <div className="bg-[var(--paper)] border border-[var(--peri)] rounded-md px-1.5 py-1 shadow-2xs why-card-float">
                  <div className="flex items-center justify-between text-[8px] font-bold text-[var(--deep)]">
                    <span className="truncate flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--or)] shrink-0" />
                      Automations
                    </span>
                    <span className="text-[6.5px] font-mono text-[var(--or)] font-bold shrink-0">Auto</span>
                  </div>
                  <div className="text-[7px] font-mono text-[var(--mute)] truncate mt-0.5">
                    Dispatch &amp; Alerts ✓
                  </div>
                </div>

                {/* Service 4: Custom Software & Apps */}
                <div className="bg-[var(--paper)] border border-[var(--peri)] rounded-md px-1.5 py-1 shadow-2xs why-card-float-delayed">
                  <div className="flex items-center justify-between text-[8px] font-bold text-[var(--deep)]">
                    <span className="truncate flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3ccf91] shrink-0" />
                      Custom Apps
                    </span>
                    <span className="text-[6.5px] font-mono text-[#3ccf91] font-bold shrink-0">Portal</span>
                  </div>
                  <div className="text-[7px] font-mono text-emerald-700 font-semibold truncate mt-0.5">
                    Ops Dashboard Live
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-[var(--mist)] text-[9.5px] font-mono text-[var(--mute)] z-10 relative">
              <span>AI · CRM · Automations · Custom Apps</span>
              <span className="text-[var(--or)] font-bold">Single PostgreSQL Core</span>
            </div>
          </div>
        </div>

        {/* Four Combined Services: AI Receptionist, Custom CRM, Automations, Custom Software */}
        <div className="why-benefits-grid mt-3">
          {/* Service 1: AI Receptionist */}
          <div className="bg-white/90 backdrop-blur-sm border border-[var(--peri)]/50 rounded-xl p-2 sm:p-2.5 hover:border-[var(--lav)]/70 hover:bg-white transition-all duration-200 shadow-2xs flex items-start gap-2 group">
            <div className="w-5.5 h-5.5 rounded-md bg-[var(--mist)] text-[var(--lav)] border border-[var(--peri)] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform duration-200">
              <PhoneCall size={12} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 flex-wrap">
                <h3 className="text-[11.5px] font-bold text-[var(--deep)] tracking-tight">
                  AI Receptionist
                </h3>
                <span className="text-[7.5px] font-mono text-[var(--pur)] bg-[var(--paper)] px-1 py-0.2 rounded border border-[var(--peri)]/50">
                  Voice Intake
                </span>
              </div>
              <p className="text-[10px] text-[var(--mute)] leading-snug mt-0.5">
                Human-grade voice agents that answer calls 24/7, qualify leads, and book directly into your core.
              </p>
            </div>
          </div>

          {/* Service 2: Custom CRM */}
          <div className="bg-white/90 backdrop-blur-sm border border-[var(--peri)]/50 rounded-xl p-2 sm:p-2.5 hover:border-[var(--lav)]/70 hover:bg-white transition-all duration-200 shadow-2xs flex items-start gap-2 group">
            <div className="w-5.5 h-5.5 rounded-md bg-[var(--mist)]/70 text-[var(--pur)] border border-[var(--peri)] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform duration-200">
              <Database size={12} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 flex-wrap">
                <h3 className="text-[11.5px] font-bold text-[var(--deep)] tracking-tight">
                  Custom CRM
                </h3>
                <span className="text-[7.5px] font-mono text-[var(--pur)] bg-[var(--paper)] px-1 py-0.2 rounded border border-[var(--peri)]/50">
                  Single Core
                </span>
              </div>
              <p className="text-[10px] text-[var(--mute)] leading-snug mt-0.5">
                Dedicated relational database eliminating duplicate customer records, spreadsheets, and sync drift.
              </p>
            </div>
          </div>

          {/* Service 3: Automated Workflows */}
          <div className="bg-white/90 backdrop-blur-sm border border-[var(--peri)]/50 rounded-xl p-2 sm:p-2.5 hover:border-[var(--or)]/70 hover:bg-white transition-all duration-200 shadow-2xs flex items-start gap-2 group">
            <div className="w-5.5 h-5.5 rounded-md bg-[var(--peach)]/30 text-[var(--or)] border border-[var(--or)]/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform duration-200">
              <Workflow size={12} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 flex-wrap">
                <h3 className="text-[11.5px] font-bold text-[var(--deep)] tracking-tight">
                  Automated Workflows
                </h3>
                <span className="text-[7.5px] font-mono text-[var(--or)] bg-[var(--cream)] px-1 py-0.2 rounded border border-[var(--or)]/30">
                  Zero Fragility
                </span>
              </div>
              <p className="text-[10px] text-[var(--mute)] leading-snug mt-0.5">
                Instant event triggers, automated invoicing, team dispatch, and alerts with zero broken webhooks.
              </p>
            </div>
          </div>

          {/* Service 4: Custom Software & Apps */}
          <div className="bg-white/90 backdrop-blur-sm border border-[var(--peri)]/50 rounded-xl p-2 sm:p-2.5 hover:border-[var(--lav)]/70 hover:bg-white transition-all duration-200 shadow-2xs flex items-start gap-2 group">
            <div className="w-5.5 h-5.5 rounded-md bg-[var(--rose)]/30 text-[var(--lav)] border border-[var(--peri)] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform duration-200">
              <Layout size={12} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 flex-wrap">
                <h3 className="text-[11.5px] font-bold text-[var(--deep)] tracking-tight">
                  Custom Apps
                </h3>
                <span className="text-[7.5px] font-mono text-[var(--pur)] bg-[var(--paper)] px-1 py-0.2 rounded border border-[var(--peri)]/50">
                  Tailored Logic
                </span>
              </div>
              <p className="text-[10px] text-[var(--mute)] leading-snug mt-0.5">
                Client portals, operational dashboards, and internal software engineered strictly for your workflow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
