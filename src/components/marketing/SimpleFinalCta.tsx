"use client";

import * as React from "react";
import Link from "next/link";
import { Calendar, MessageSquare } from "lucide-react";

export function SimpleFinalCta() {
  return (
    <section className="py-14 sm:py-20">
      <div className="wrap">
        <div
          className="bg-[var(--deep)] text-white p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-[0_25px_60px_rgba(21,19,74,0.3)]"
          style={{
            clipPath: "polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 0 100%)",
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
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--peri)]">
              Build With Us
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-3 mb-4 leading-tight">
              Your business deserves software built for it.
            </h2>
            <p className="text-base sm:text-lg text-[#cfd2ee] leading-relaxed max-w-2xl mb-8">
              Tell us what you&apos;re trying to achieve. We&apos;ll help design the right solution—from autonomous AI receptionists to full-scale custom platforms.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <Link
                href="/contact#appointment"
                className="btn flex items-center justify-center gap-2"
                style={{ background: "var(--or)", color: "var(--deep)", fontWeight: 700 }}
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Discovery Call</span>
              </Link>
              <Link
                href="/contact"
                className="btn ghost flex items-center justify-center gap-2"
                style={{
                  color: "#fff",
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  background: "rgba(255, 255, 255, 0.05)",
                }}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Tell Us About Your Project</span>
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs font-mono text-[#cfd2ee]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#3ccf91]"></span>
                Direct scope with principal engineers
              </span>
              <span>•</span>
              <span>Zero sales pressure</span>
              <span>•</span>
              <span>Fixed milestones &amp; deliverables</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
