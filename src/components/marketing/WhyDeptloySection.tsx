"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function WhyDeptloySection() {
  return (
    <section
      className="dark"
      id="why"
      style={{
        marginTop: "clamp(64px, 8vw, 104px)",
        padding: "clamp(36px, 4.5vw, 52px) 0",
      }}
    >
      <div className="wrap">
        <span className="k" style={{ fontSize: "11px" }}>Why Custom Software</span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-1 leading-tight">
          Why companies outgrow generic tools.
        </h2>
        <p className="text-xs sm:text-sm text-[#cfd2ee] max-w-2xl mt-1.5 leading-relaxed">
          Standard tools force your team into rigid templates and fragile zaps. Deptloy builds intelligent systems tailored around how your business actually operates.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 mt-6">
          {/* Column A: Generic software */}
          <div
            className="p-5 sm:p-6 bg-white/[0.04] border border-white/10 rounded-sm"
            style={{
              clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)",
            }}
          >
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
              <h3 className="text-sm sm:text-base font-bold text-[var(--peri)]">Generic Off-The-Shelf Tools</h3>
              <span className="text-[10px] font-mono uppercase text-[#ef7a5e] bg-[#ef7a5e]/10 px-2 py-0.5 rounded-xs">
                SaaS Bottlenecks
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-[#cfd2ee]">
              <div className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-[#ef7a5e]/20 text-[#ef7a5e] flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold">
                  ×
                </span>
                <span><strong>Disconnected tools:</strong> Multiple subscriptions taped together with fragile automations.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-[#ef7a5e]/20 text-[#ef7a5e] flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold">
                  ×
                </span>
                <span><strong>Repetitive manual work:</strong> Teams spend hours copy-pasting data between separate dashboards.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-[#ef7a5e]/20 text-[#ef7a5e] flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold">
                  ×
                </span>
                <span><strong>Rigid templates:</strong> Fixed schemas that restrict how your company actually sells and delivers.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-[#ef7a5e]/20 text-[#ef7a5e] flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold">
                  ×
                </span>
                <span><strong>Scattered data:</strong> Client records, call notes, and deal pipelines trapped in proprietary silos.</span>
              </div>
            </div>
          </div>

          {/* Column B: Deptloy Custom Architecture */}
          <div
            className="p-5 sm:p-6 bg-white text-[var(--deep)] border-t-4 border-[var(--or)] shadow-lg rounded-sm"
            style={{
              clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)",
            }}
          >
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--mist)]">
              <h3 className="text-sm sm:text-base font-bold text-[var(--deep)]">Deptloy Custom Architecture</h3>
              <span className="text-[10px] font-mono uppercase text-[var(--or)] font-bold bg-[var(--paper)] px-2 py-0.5 border border-[var(--peri)] rounded-xs">
                Unified System
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-[var(--mute)]">
              <div className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-[#16875b] flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold">
                  ✓
                </span>
                <span><strong>Single relational core:</strong> One dedicated database designed around your operational model.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-[#16875b] flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold">
                  ✓
                </span>
                <span><strong>Automated workflows:</strong> Inbound calls, customer records, and dispatch update in real time.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-[#16875b] flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold">
                  ✓
                </span>
                <span><strong>Purpose-built interfaces:</strong> Clean, minimal applications staff adopt in minutes without training.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-[#16875b] flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold">
                  ✓
                </span>
                <span><strong>Measurable AI value:</strong> Conversational phone intake and background automations that drive ROI.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-5 pt-4 flex items-center justify-between flex-wrap gap-3 border-t border-white/10 text-xs">
          <span className="text-[11px] font-mono text-[#d2cdf3]">
            Dedicated relational database · Open standard code architecture · Full engineering stewardship
          </span>
          <Link
            href="/how-it-works"
            className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--or)] hover:text-white inline-flex items-center gap-1 transition-colors"
          >
            Explore our engineering approach <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
