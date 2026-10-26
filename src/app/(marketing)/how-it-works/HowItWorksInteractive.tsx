"use client";

import * as React from "react";
import Link from "next/link";
import { Calculator, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export function HowItWorksInteractive() {
  const [weeklyCalls, setWeeklyCalls] = React.useState(35);
  const [avgValue, setAvgValue] = React.useState(350);
  const [monthlySaas, setMonthlySaas] = React.useState(600);

  // Assumptions:
  // - Around 25% of inbound calls go unanswered or to voicemail during peak hours/after-hours
  // - Deptloy AI captures ~75% of those missed opportunities into booked appointments
  // - Admin time saved: ~15 mins per call/lead entry across reminders, logs, and follow-ups
  const missedCallsPerWeek = Math.round(weeklyCalls * 0.25);
  const recoveredCallsPerMonth = Math.round(missedCallsPerWeek * 0.75 * 4.3);
  const recoveredAnnualRevenue = recoveredCallsPerMonth * avgValue * 12;
  const adminHoursSavedPerMonth = Math.round((weeklyCalls * 4.3 * 15) / 60);
  const annualSaasWaste = monthlySaas * 12;

  return (
    <div className="mt-28">
      <div
        className="bg-white border border-[rgba(21,19,74,0.14)] p-8 sm:p-12 shadow-[0_20px_50px_rgba(87,80,168,0.1)]"
        style={{
          clipPath: "polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%)",
          borderTop: "5px solid var(--or)",
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[var(--mist)]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--or)] mb-2">
              <Calculator className="w-4 h-4" />
              <span>Interactive ROI &amp; Efficiency Diagnostic</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--deep)]">
              Calculate the cost of disconnected tools vs. a Deptloy system.
            </h2>
            <p className="text-sm text-[var(--mute)] max-w-2xl mt-1">
              Adjust your business metrics below to see estimated revenue lost to missed calls, administrative manual entry hours, and fragmented subscriptions.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 bg-[var(--paper)] border border-[var(--peri)] text-xs font-mono text-[var(--deep)] rounded-sm">
            <span className="w-2 h-2 rounded-full bg-[var(--or)] animate-pulse"></span>
            <span>Real-time diagnostic model</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-7">
            {/* Control 1: Weekly Calls */}
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-bold text-[var(--deep)]">
                  Weekly inbound customer inquiries / calls
                </span>
                <span className="font-mono font-extrabold text-[var(--pur)] text-base">
                  {weeklyCalls} calls/wk
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="150"
                step="5"
                value={weeklyCalls}
                onChange={(e) => setWeeklyCalls(Number(e.target.value))}
                className="w-full accent-[var(--pur)] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-[var(--mute)] mt-1">
                <span>10 (Boutique)</span>
                <span>75 (Growing)</span>
                <span>150+ (High Volume)</span>
              </div>
            </div>

            {/* Control 2: Average Customer Value */}
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-bold text-[var(--deep)]">
                  Average revenue per customer or appointment
                </span>
                <span className="font-mono font-extrabold text-[var(--pur)] text-base">
                  ${avgValue.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="2500"
                step="50"
                value={avgValue}
                onChange={(e) => setAvgValue(Number(e.target.value))}
                className="w-full accent-[var(--pur)] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-[var(--mute)] mt-1">
                <span>$100 (Service)</span>
                <span>$1,000 (Consulting/Legal)</span>
                <span>$2,500+ (High Ticket)</span>
              </div>
            </div>

            {/* Control 3: Monthly Disconnected SaaS Costs */}
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-bold text-[var(--deep)]">
                  Current monthly spend on disjointed SaaS tools
                </span>
                <span className="font-mono font-extrabold text-[var(--pur)] text-base">
                  ${monthlySaas}/mo
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="2500"
                step="50"
                value={monthlySaas}
                onChange={(e) => setMonthlySaas(Number(e.target.value))}
                className="w-full accent-[var(--pur)] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-[var(--mute)] mt-1">
                <span>$200/mo (Basic CRM + Calendly)</span>
                <span>$1,000/mo (Seat Bloat)</span>
                <span>$2,500/mo (Enterprise stack)</span>
              </div>
            </div>

            <div className="p-4 bg-[var(--paper)] border border-[var(--peri)] text-xs text-[var(--mute)] leading-relaxed rounded-sm">
              <span className="font-bold text-[var(--deep)]">Architectural Note:</span>{" "}
              Unlike off-the-shelf software vendors that charge per user seat and punish your growth, Deptloy builds a system on your own database with 100% data sovereignty.
            </div>
          </div>

          {/* Output Card Column */}
          <div className="lg:col-span-5 bg-[var(--deep)] text-white p-7 sm:p-8 flex flex-col justify-between shadow-[0_16px_40px_rgba(21,19,74,0.3)]">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-mono text-[var(--peri)] uppercase tracking-wider">
                  Projected Annual Impact
                </span>
                <span className="text-xs font-mono text-[var(--or)] font-bold">
                  Unified System
                </span>
              </div>

              <div>
                <span className="text-xs font-mono text-[#cfd2ee] uppercase">
                  Recovered Revenue from Lost Calls
                </span>
                <div className="text-3xl sm:text-4xl font-mono font-extrabold text-[var(--or)] mt-1">
                  +${recoveredAnnualRevenue.toLocaleString()}
                  <span className="text-xs text-[#cfd2ee] font-sans font-normal ml-2">/year</span>
                </div>
                <p className="text-xs text-[#cfd2ee] mt-1">
                  Based on capturing ~{recoveredCallsPerMonth} appointments/month currently lost to voicemails or after-hours.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <span className="text-xs font-mono text-[#cfd2ee] uppercase">
                    Admin Time Saved
                  </span>
                  <div className="text-xl font-mono font-bold text-white mt-0.5">
                    ~{adminHoursSavedPerMonth} hrs
                    <span className="text-[11px] text-[#cfd2ee] font-sans font-normal ml-1">/mo</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono text-[#cfd2ee] uppercase">
                    SaaS Subscription Tax
                  </span>
                  <div className="text-xl font-mono font-bold text-white mt-0.5">
                    ${annualSaasWaste.toLocaleString()}
                    <span className="text-[11px] text-[#cfd2ee] font-sans font-normal ml-1">/yr</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <Link
                href="/contact#appointment"
                className="w-full btn flex items-center justify-center gap-2"
                style={{ background: "var(--or)", color: "var(--deep)" }}
              >
                <span>Discuss Your System Architecture</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="text-center text-[11px] font-mono text-[#cfd2ee] mt-2">
                Zero commitment · 20-min technical scope
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}