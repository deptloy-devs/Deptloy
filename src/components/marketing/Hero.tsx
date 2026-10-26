"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, PhoneCall, Sparkles, User, Volume2, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { brand } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100svh-6rem)] flex items-center py-8 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Bold Typography & Direct Action */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Minimal Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--mist)] dark:bg-[var(--raised)] border border-line text-xs font-mono font-medium text-[var(--pur)] dark:text-[var(--peri)]">
              <span className="w-2 h-2 rounded-full bg-[var(--or)] animate-pulse" />
              <span>Engineered AI Infrastructure & Voice Agents</span>
            </div>

            {/* Kinetic 3-line Headline */}
            <h1 className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] leading-[1.04] text-[var(--deep)] dark:text-white">
              <span className="block overflow-hidden pb-1">
                <b className="reveal-up">Software built</b>
              </span>
              <span className="block overflow-hidden pb-1">
                <b className="reveal-up text-gradient-brand [animation-delay:0.1s]">
                  to outlast
                </b>
              </span>
              <span className="block overflow-hidden pb-1">
                <b className="reveal-up [animation-delay:0.2s]">the hype.</b>
              </span>
            </h1>

            {/* Concise Subtitle */}
            <p className="mt-6 max-w-xl text-base sm:text-lg text-[var(--mute)] dark:text-[var(--fg-muted)] leading-relaxed font-normal">
              Deptloy builds 24/7 AI voice agents, business automation, and custom digital systems for companies that demand speed without technical debt.
            </p>

            {/* Minimal High-Impact CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <Button
                href="/contact"
                size="lg"
                rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
              >
                Get a Quote
              </Button>
              <Button
                href="/demo"
                variant="outline"
                size="lg"
                leftIcon={<Zap className="h-4 w-4 text-[var(--or)]" aria-hidden="true" />}
              >
                Try AI Demo
              </Button>
            </div>

            {/* 3 Quick Proof Points */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-6 text-xs text-fg-muted font-medium">
              <span className="inline-flex items-center gap-1.5 text-fg">
                <CheckCircle2 className="h-4 w-4 text-[var(--or)]" aria-hidden="true" />
                24/7 Live Inbound Answering
              </span>
              <span className="inline-flex items-center gap-1.5 text-fg">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                Sub-500ms Voice Pipeline
              </span>
              <span className="inline-flex items-center gap-1.5 text-fg">
                <CheckCircle2 className="h-4 w-4 text-[var(--lav)]" aria-hidden="true" />
                Direct Calendar & CRM Sync
              </span>
            </div>
          </div>

          {/* Right Column: 3D Orbit Disc & Cleaner Voice Agent Card */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="rbwrap w-full max-w-[480px]">
              {/* Spinning dual dashed orbit rings & glowing disc */}
              <div className="disc" aria-hidden="true" />

              {/* Floating Status Badges */}
              <div
                className="floating-badge absolute -top-2 -left-2 z-20"
                style={{ animationDelay: "0s" }}
              >
                <i className="w-2.5 h-2.5 rounded-full bg-[var(--or)]" />
                <span>24/7 Voice Receptionist</span>
              </div>

              <div
                className="floating-badge absolute -bottom-3 -right-2 z-20"
                style={{ animationDelay: "-2.5s" }}
              >
                <i className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Instant Calendar Bookings</span>
              </div>

              {/* Minimal Voice Agent Glass Panel */}
              <div className="relative z-10 w-full rounded-3xl border border-white/60 dark:border-line bg-white/90 dark:bg-card/90 p-5 sm:p-6 shadow-raised backdrop-blur-2xl">
                {/* Panel Header */}
                <div className="flex items-center justify-between border-b border-line pb-4">
                  <div className="flex items-center gap-3">
                    <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[var(--deep)] dark:bg-white text-white dark:text-[var(--deep)] shadow-md">
                      <Volume2 className="h-5 w-5" aria-hidden="true" />
                      <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-card animate-pulse" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[var(--deep)] dark:text-white">
                          Deptloy Voice Agent
                        </span>
                        <span className="rounded-full bg-[var(--or)]/15 px-2 py-0.5 font-mono text-[10px] font-semibold text-[var(--or)]">
                          LIVE
                        </span>
                      </div>
                      <p className="text-xs text-[var(--mute)] dark:text-[var(--fg-muted)]">
                        Natural conversation • Sub-500ms
                      </p>
                    </div>
                  </div>

                  {/* Soundwave Bars */}
                  <div
                    className="flex h-7 items-center gap-1 rounded-full border border-line bg-surface/80 px-2.5"
                    aria-hidden="true"
                  >
                    {[0.1, 0.3, 0.5, 0.2, 0.4].map((delay, i) => (
                      <span
                        key={i}
                        className="h-2.5 w-1 rounded-full bg-[var(--or)] animate-pulse"
                        style={{ animationDelay: `${delay}s` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Minimal Dialogue */}
                <div className="my-5 space-y-3 text-xs sm:text-sm">
                  {/* Caller */}
                  <div className="flex items-start gap-2.5">
                    <span
                      className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-raised text-fg-muted"
                      aria-hidden="true"
                    >
                      <User className="h-3.5 w-3.5" />
                    </span>
                    <div className="rounded-2xl rounded-tl-sm border border-line bg-raised/70 px-3.5 py-2 text-fg-soft">
                      &ldquo;Hi, do you have any openings this Thursday at 3 PM?&rdquo;
                    </div>
                  </div>

                  {/* AI Agent */}
                  <div className="flex flex-row-reverse items-start gap-2.5">
                    <span
                      className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--deep)] dark:bg-white text-white dark:text-[var(--deep)]"
                      aria-hidden="true"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                    </span>
                    <div className="rounded-2xl rounded-tr-sm border border-[var(--lav)]/40 bg-[var(--lav)]/10 px-3.5 py-2 font-medium text-fg">
                      &ldquo;Thursday at 3:15 PM is open. I&apos;ve booked it and sent confirmation to your email.&rdquo;
                    </div>
                  </div>
                </div>

                {/* Result Pill */}
                <div className="flex items-center justify-between rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-3 py-2 text-xs text-fg">
                  <span className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                    Calendar Booked & CRM Synced
                  </span>
                  <span className="font-mono text-[11px] text-fg-muted">&lt; 1.4s</span>
                </div>

                {/* Card Footer */}
                <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-xs">
                  <span className="text-[var(--mute)] dark:text-[var(--fg-muted)]">
                    Zero wait times for callers
                  </span>
                  <Link
                    href="/demo"
                    className="inline-flex items-center gap-1 font-bold text-[var(--pur)] dark:text-[var(--peri)] hover:text-[var(--or)] transition-colors"
                  >
                    <span>Try Demo</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
