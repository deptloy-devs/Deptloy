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
      <div className="hero-glow-violet" />
      <div className="hero-glow-cyan" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Copy, Actions & Trust Points */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[#A78BFA] text-xs font-medium mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(139,92,246,0.15)]">
              <span className="flex h-2 w-2 rounded-full bg-[#A78BFA] animate-ping" />
              <span>AI-Powered Business Solutions</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
              Let AI Handle the Busywork.{" "}
              <span className="bg-gradient-to-r from-[#A78BFA] via-[#C084FC] to-[#38BDF8] bg-clip-text text-transparent">
                You Build the Business.
              </span>
            </h1>

            {/* Supporting Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/[0.08] w-full">
              {trustPoints.map((tp, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                    <CheckCircle2 className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                    <span>{tp.title}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">
                    {tp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: AI Receptionist Product Preview Card */}
          <div className="lg:col-span-5 relative z-10">
            <div className="relative rounded-3xl p-1 bg-gradient-to-b from-purple-500/30 via-white/10 to-transparent shadow-2xl shadow-purple-950/50">
              <div className="rounded-[22px] bg-[#0E1322] border border-white/10 p-5 sm:p-6 backdrop-blur-xl">
                
                {/* Dashboard Card Top Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 shadow-md shadow-purple-600/30 text-white">
                      <Volume2 className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-white">Deptloy Voice Agent</h4>
                        <span className="text-[10px] text-purple-300 bg-purple-500/20 px-1.5 py-0.2 rounded font-mono">
                          v2.4
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Live • Inbound Line Active
                      </p>
                    </div>
                  </div>

                  {/* Waveform Visualization */}
                  <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/5">
                    <span className="w-1 bg-purple-400 rounded-full animate-wave-1" />
                    <span className="w-1 bg-blue-400 rounded-full animate-wave-2" />
                    <span className="w-1 bg-cyan-400 rounded-full animate-wave-3" />
                    <span className="w-1 bg-purple-400 rounded-full animate-wave-4" />
                    <span className="w-1 bg-indigo-400 rounded-full animate-wave-5" />
                  </div>
                </div>

                {/* Example Conversation Bubbles */}
                <div className="my-5 flex flex-col gap-3">
                  {/* Customer Message */}
                  <div className="flex items-start gap-2.5 max-w-[85%]">
                    <div className="h-6 w-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 shrink-0 text-xs mt-0.5">
                      <User className="h-3.5 w-3.5" />
                    </div>
                    <div className="rounded-2xl rounded-tl-sm bg-[#161F33] p-3 text-xs text-slate-200 border border-white/5 leading-relaxed">
                      &ldquo;Hi, I need to schedule a consultation this Thursday afternoon for our team. Do you have an opening around 3 PM?&rdquo;
                    </div>
                  </div>

                  {/* AI Assistant Response */}
                  <div className="flex items-start gap-2.5 max-w-[90%] self-end flex-row-reverse">
                    <div className="h-6 w-6 rounded-full bg-purple-600/30 border border-purple-500/50 flex items-center justify-center text-purple-300 shrink-0 text-xs mt-0.5">
                      <Sparkles className="h-3 w-3" />
                    </div>
                    <div className="rounded-2xl rounded-tr-sm bg-gradient-to-br from-purple-900/40 to-slate-900 p-3 text-xs text-purple-100 border border-purple-500/20 leading-relaxed">
                      &ldquo;Yes, absolutely! We have an opening on Thursday at 3:15 PM with Dr. Harris. Shall I reserve that slot and send you the calendar invite?&rdquo;
                    </div>
                  </div>
                </div>

                {/* Live Action Status / Sync Indicators */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-black/30 border border-white/5 text-[11px] text-slate-300">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">Caller Verified via CallerID</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-black/30 border border-white/5 text-[11px] text-slate-300">
                    <CalendarCheck className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                    <span className="truncate">Calendar Slot Reserved</span>
                  </div>
                </div>

                {/* Upcoming Appointment Preview Card */}
                <div className="rounded-xl bg-[#111827] border border-white/10 p-3.5 shadow-inner">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Confirmed Booking
                    </span>
                    <Badge variant="success" size="sm" dot>
                      Confirmed
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-white">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-purple-400" />
                      <span>Thursday, 3:15 PM</span>
                    </div>
                    <span className="text-slate-400 text-[11px]">Duration: 45 min</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Client: Sarah Jenkins</span>
                    <span className="text-purple-400 font-medium">Synced to CRM</span>
                  </div>
                </div>

                {/* Interactive Demo Link Footer */}
                <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs">
                  <span className="text-slate-400">Simulated live dashboard preview</span>
                  <Link
                    href="/demo"
                    className="text-purple-400 hover:text-purple-300 font-semibold inline-flex items-center gap-1"
                  >
                    Launch Interactive Demo <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>

              </div>
            </div>

            {/* Ambient shadow pill under card */}
            <div className="mx-auto h-4 w-4/5 rounded-full bg-purple-600/20 blur-xl -mt-2" />
          </div>

        </div>
      </div>
    </section>
  );
}
