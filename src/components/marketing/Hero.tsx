"use client";

import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Clock,
  User,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { brand, trustPoints } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32">
      {/* Background radial glows */}
      <div className="glow-brand" />
      <div className="glow-accent" />
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Copy, Actions & Trust Points */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-medium mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(139,92,246,0.15)]">
              <span className="flex h-2 w-2 rounded-full bg-brand-300 animate-ping" />
              <span>AI-Powered Business Solutions</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
              Let AI Handle the Busywork.{" "}
              <span className="bg-gradient-to-r from-brand-300 via-brand-300 to-electric-400 bg-clip-text text-transparent">
                You Build the Business.
              </span>
            </h1>

            {/* Supporting Subtitle */}
            <p className="text-base sm:text-lg text-fg-soft leading-relaxed mb-8 max-w-2xl">
              Turn missed calls and manual data entry into autonomous revenue. {brand.name} builds branded AI voice receptionists, intelligent workflow automations, CRM pipelines, and custom software that work around the clock.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-12">
              <Button
                href="/demo"
                variant="glow"
                size="lg"
                leftIcon={<Sparkles className="h-4 w-4" />}
                rightIcon={<ArrowRight className="h-4 w-4" />}
                className="w-full sm:w-auto font-semibold"
              >
                Experience AI Receptionist
              </Button>
              <Button
                href="/contact"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                Book a Consultation
              </Button>
            </div>

            {/* Three Concise Trust Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-line w-full">
              {trustPoints.map((tp, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-400 shrink-0" />
                    <span>{tp.title}</span>
                  </div>
                  <p className="text-xs text-fg-muted leading-normal">
                    {tp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: AI Receptionist Product Preview Card */}
          <div className="lg:col-span-5 relative z-10">
            <div className="relative rounded-3xl p-1 bg-gradient-to-b from-brand-500/30 via-white/10 to-transparent shadow-2xl shadow-brand-950/50">
              <div className="rounded-[22px] bg-card border border-line p-5 sm:p-6 backdrop-blur-xl">
                
                {/* Dashboard Card Top Header */}
                <div className="flex items-center justify-between pb-4 border-b border-line">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-blue-500 shadow-md shadow-brand-600/30 text-white">
                      <Volume2 className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-white">Deptloy Voice Agent</h4>
                        <span className="text-[10px] text-brand-300 bg-brand-500/20 px-1.5 py-0.2 rounded font-mono">
                          v2.4
                        </span>
                      </div>
                      <p className="text-xs text-fg-muted flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Live • Inbound Line Active
                      </p>
                    </div>
                  </div>

                  {/* Waveform Visualization */}
                  <div className="flex h-8 items-center gap-1 px-2.5 rounded-lg bg-black/40 border border-line" aria-hidden="true">
                    {[0, 0.2, 0.4, 0.1, 0.3].map((delay, i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1 rounded-full bg-gradient-to-t from-brand-500 to-electric-400 animate-wave"
                        style={{ animationDelay: `${delay}s` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Example Conversation Bubbles */}
                <div className="my-5 flex flex-col gap-3">
                  {/* Customer Message */}
                  <div className="flex items-start gap-2.5 max-w-[85%]">
                    <div className="h-6 w-6 rounded-full bg-raised-hover flex items-center justify-center text-fg-soft shrink-0 text-xs mt-0.5">
                      <User className="h-3.5 w-3.5" />
                    </div>
                    <div className="rounded-2xl rounded-tl-sm bg-raised p-3 text-xs text-fg-soft border border-line leading-relaxed">
                      &ldquo;Hi, I need to schedule a consultation this Thursday afternoon for our team. Do you have an opening around 3 PM?&rdquo;
                    </div>
                  </div>

                  {/* AI Assistant Response */}
                  <div className="flex items-start gap-2.5 max-w-[90%] self-end flex-row-reverse">
                    <div className="h-6 w-6 rounded-full bg-brand-600/30 border border-brand-500/50 flex items-center justify-center text-brand-300 shrink-0 text-xs mt-0.5">
                      <Sparkles className="h-3 w-3" />
                    </div>
                    <div className="rounded-2xl rounded-tr-sm bg-gradient-to-br from-brand-900/40 to-slate-900 p-3 text-xs text-brand-100 border border-brand-500/20 leading-relaxed">
                      &ldquo;Yes, absolutely! We have an opening on Thursday at 3:15 PM with Dr. Harris. Shall I reserve that slot and send you the calendar invite?&rdquo;
                    </div>
                  </div>
                </div>

                {/* Live Action Status / Sync Indicators */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-black/30 border border-line text-[11px] text-fg-soft">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">Caller Verified via CallerID</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-black/30 border border-line text-[11px] text-fg-soft">
                    <CalendarCheck className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                    <span className="truncate">Calendar Slot Reserved</span>
                  </div>
                </div>

                {/* Upcoming Appointment Preview Card */}
                <div className="rounded-xl bg-raised border border-line p-3.5 shadow-inner">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-fg-muted">
                      Confirmed Booking
                    </span>
                    <Badge variant="success" size="sm" dot>
                      Confirmed
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-white">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-brand-400" />
                      <span>Thursday, 3:15 PM</span>
                    </div>
                    <span className="text-fg-muted text-[11px]">Duration: 45 min</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-line flex items-center justify-between text-[11px] text-fg-muted">
                    <span>Client: Sarah Jenkins</span>
                    <span className="text-brand-400 font-medium">Synced to CRM</span>
                  </div>
                </div>

                {/* Interactive Demo Link Footer */}
                <div className="mt-4 pt-3 border-t border-line flex items-center justify-between text-xs">
                  <span className="text-fg-muted">Simulated live dashboard preview</span>
                  <Link
                    href="/demo"
                    className="text-brand-400 hover:text-brand-300 font-semibold inline-flex items-center gap-1"
                  >
                    Launch Interactive Demo <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>

              </div>
            </div>

            {/* Ambient shadow pill under card */}
            <div className="mx-auto h-4 w-4/5 rounded-full bg-brand-600/20 blur-xl -mt-2" />
          </div>

        </div>
      </div>
    </section>
  );
}
