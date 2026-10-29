"use client";

import * as React from "react";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

export function SimpleFinalCta() {
  return (
    <section
      className="relative"
      style={{
        paddingTop: "clamp(36px, 5vw, 68px)",
        paddingBottom: "clamp(36px, 5vw, 68px)",
      }}
    >
      <div className="wrap">
        <div
          className="bg-[var(--deep)] text-white p-5 sm:p-10 lg:p-14 relative overflow-hidden shadow-[0_25px_60px_rgba(21,19,74,0.3)] rounded-2xl"
          style={{
            clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)",
            border: "1px solid rgba(132, 120, 224, 0.4)",
          }}
        >
          {/* Subtle background glow */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-20"
            style={{
              background: "radial-gradient(circle, var(--lav) 0%, transparent 70%)",
              transform: "translate(30%, -30%)",
            }}
          />

          <div className="relative z-10 max-w-3xl">
            <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[var(--peri)]">
              Build With Us
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-2.5 mb-3.5 leading-tight">
              Every business works differently.{" "}
              <span className="text-[var(--peri)]">Your software should too.</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-[#cfd2ee] leading-relaxed max-w-2xl mb-6 sm:mb-8">
              Tell us what slows your team down. We&apos;ll help you design a system that makes everything work together.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
              <Link
                href="/contact#form"
                className="btn inline-flex items-center justify-center gap-2 text-center"
                style={{ background: "var(--or)", color: "var(--deep)", fontWeight: 700 }}
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>Tell Us About Your Project</span>
              </Link>
            </div>

            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-[#cfd2ee]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3ccf91] shrink-0"></span>
                Direct scope with principal engineers
              </span>
              <span className="hidden sm:inline opacity-30">•</span>
              <span>Zero sales pressure</span>
              <span className="hidden sm:inline opacity-30">•</span>
              <span>Fixed milestones &amp; deliverables</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
