"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function WhyDeptloySection() {
  return (
    <section className="dark" id="why" style={{ padding: "80px 0" }}>
      <div className="wrap">
        <span className="k">Why Custom Software</span>
        <h2>Why companies outgrow generic tools.</h2>
        <p className="lead2" style={{ maxWidth: "34em" }}>
          Standard software forces your team to adapt to rigid templates. Deptloy builds intelligent systems designed around how your business actually operates.
        </p>

        <div className="cmp" style={{ marginTop: "32px" }}>
          {/* Column A: Generic software */}
          <div className="col a">
            <h3>Generic Software</h3>
            <div>
              <b style={{ color: "#ef7a5e" }}>×</b>
              <span><strong>Disconnected tools:</strong> Multiple subscriptions taped together with fragile zaps.</span>
            </div>
            <div>
              <b style={{ color: "#ef7a5e" }}>×</b>
              <span><strong>Repetitive manual work:</strong> Teams spend hours copy-pasting data between separate tools.</span>
            </div>
            <div>
              <b style={{ color: "#ef7a5e" }}>×</b>
              <span><strong>Limited customization:</strong> Rigid templates that restrict your unique workflow.</span>
            </div>
            <div>
              <b style={{ color: "#ef7a5e" }}>×</b>
              <span><strong>Scattered information:</strong> Client records, call notes, and pipeline data trapped in silos.</span>
            </div>
          </div>

          {/* Column B: Deptloy */}
          <div className="col b">
            <h3>Deptloy Custom Architecture</h3>
            <div>
              <b style={{ color: "var(--or)" }}>✓</b>
              <span><strong>Custom architecture:</strong> A single relational core built for your exact operational model.</span>
            </div>
            <div>
              <b style={{ color: "var(--or)" }}>✓</b>
              <span><strong>Connected workflows:</strong> Calls, client records, and team dispatch update automatically.</span>
            </div>
            <div>
              <b style={{ color: "var(--or)" }}>✓</b>
              <span><strong>Purpose-built applications:</strong> Clean, zero-training interfaces your staff adopt in minutes.</span>
            </div>
            <div>
              <b style={{ color: "var(--or)" }}>✓</b>
              <span><strong>AI with real value:</strong> Sub-500ms voice intake and automations where they drive ROI.</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 flex items-center justify-between flex-wrap gap-4 border-t border-white/10">
          <span className="text-xs font-mono text-[#d2cdf3]">
            Sovereign PostgreSQL database · Zero vendor lock-in · Full engineering stewardship
          </span>
          <Link
            href="/how-it-works"
            className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--or)] hover:text-white inline-flex items-center gap-1 transition-colors"
          >
            Explore our engineering approach <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
