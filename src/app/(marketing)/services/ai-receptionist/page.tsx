"use client";

import * as React from "react";
import {
  Calendar,
  Clock,
  Sparkles,
  Shield,
  CheckCircle2,
  ChevronDown,
  Volume2,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqList } from "@/lib/site";

export default function AiReceptionistPage() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);

  const workflowSteps = [
    {
      step: "01",
      title: "Inbound Call or Chat Received",
      desc: "Call arrives via your existing business phone number (call forwarded) or website widget. Answered within 1.5 seconds.",
    },
    {
      step: "02",
      title: "Intent & Identity Qualification",
      desc: "AI identifies caller's name, intent (new appointment, pricing question, rescheduling), and checks existing records in CRM.",
    },
    {
      step: "03",
      title: "Real-Time Calendar Availability",
      desc: "The agent checks open slots across clinician or provider calendars, proposing available times that fit the client's preference.",
    },
    {
      step: "04",
      title: "Confirmation & Automated Sync",
      desc: "The appointment is locked in, SMS confirmation dispatched, and the lead record with audio transcript is delivered to your inbox and CRM.",
    },
  ];

  const useCases = [
    {
      title: "After-Hours & Weekend Coverage",
      desc: "Capture 100% of high-intent inquiries when your office is closed without paying high overtime agency rates.",
    },
    {
      title: "Peak-Hour Overflow Support",
      desc: "When all front-desk staff are occupied with in-person patients or clients, extra calls roll over automatically.",
    },
    {
      title: "Instant FAQ & Pricing Answering",
      desc: "Provide immediate, consistent answers regarding location, insurance, parking, and pricing policies without staff distraction.",
    },
    {
      title: "No-Show & Rescheduling Management",
      desc: "Callers can modify or confirm appointments by speaking naturally, automatically opening up canceled slots for other clients.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-14 sm:pt-20 pb-section-sm overflow-hidden">
        <div className="glow-brand" />
        <div className="glow-accent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            <Badge variant="brand" dot className="mb-4">
              Flagship Voice & Chat Solution
            </Badge>

            <h1 className="text-h1 font-semibold mb-6">
              An AI Receptionist That Never Misses a Call
            </h1>

            <p className="text-lg text-fg-soft leading-relaxed mb-8">
              A conversational, human-grade voice assistant customized to your business. It answers calls 24/7, schedules appointments directly into your calendar, answers complex FAQs, and captures qualified leads.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <Button href="/contact" variant="primary" size="lg">
                Schedule Architecture Call
              </Button>
              <Button href="/demo" variant="outline" size="lg" leftIcon={<Sparkles className="h-4 w-4" aria-hidden="true" />}>
                Try Live Interactive Demo
              </Button>
            </div>
          </div>

          {/* Interactive Receptionist Visualizer Card */}
          <div className="mt-16 rounded-panel bg-card border border-line p-6 sm:p-10 shadow-raised relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-control bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-brand-400">
                    <Volume2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-fg">Neural Voice Engine Simulation</h2>
                    <p className="text-xs text-fg-muted">Low-latency acoustic turn-taking (240ms)</p>
                  </div>
                </div>

                <div className="rounded-card bg-raised border border-line p-4 space-y-3 text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="font-semibold text-fg-muted shrink-0">Caller:</span>
                    <p className="text-fg-soft">&ldquo;Hi! I want to schedule a deep dental cleaning for next Tuesday morning.&rdquo;</p>
                  </div>
                  <div className="flex items-start gap-2.5 pt-2 border-t border-line">
                    <span className="font-semibold text-brand-400 shrink-0">Deptloy AI:</span>
                    <p className="text-brand-200">&ldquo;I would be happy to help with that. Dr. Lawson has openings next Tuesday at 9:30 AM and 11:00 AM. Which one fits your morning better?&rdquo;</p>
                  </div>
                  <div className="flex items-start gap-2.5 pt-2 border-t border-line">
                    <span className="font-semibold text-fg-muted shrink-0">Caller:</span>
                    <p className="text-fg-soft">&ldquo;11:00 AM is great. Do you take BlueCross BlueShield?&rdquo;</p>
                  </div>
                  <div className="flex items-start gap-2.5 pt-2 border-t border-line">
                    <span className="font-semibold text-brand-400 shrink-0">Deptloy AI:</span>
                    <p className="text-brand-200">&ldquo;Yes, we are in-network with BlueCross PPO. I have reserved Tuesday at 11:00 AM for you. What is your full name?&rdquo;</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-fg-subtle">
                  <Shield className="h-3.5 w-3.5" />
                  <span>Configured to strict HIPAA-compliant security standards.</span>
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col gap-4">
                <div className="rounded-card bg-surface border border-line p-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-fg-muted block mb-3">
                    Direct Calendar Integration
                  </span>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-control bg-white/[0.04]">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-brand-400" />
                        <span className="text-fg-soft">Tuesday, Oct 28 • 11:00 AM</span>
                      </div>
                      <Badge variant="success" size="sm">Slot Held</Badge>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-control bg-white/[0.04]">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-brand-300" />
                        <span className="text-fg-soft">Provider: Dr. Marcus Lawson</span>
                      </div>
                      <span className="text-fg-muted">Chair #2</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-control bg-white/[0.04]">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-success" />
                        <span className="text-fg-soft">EHR / CRM Sync</span>
                      </div>
                      <span className="text-success font-medium">Auto-created</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-line">
                    <Button href="/demo" variant="secondary" size="sm" className="w-full">
                      Launch Full Booking Prototype
                    </Button>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Appointment Booking Workflow */}
      <section className="py-20 bg-surface border-t border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Workflow Logic"
            title="How Inbound Appointments Are Handled"
            description="From initial ring to calendar entry, everything is orchestrated autonomously in seconds."
            align="center"
            className="mb-14"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((wf, idx) => (
              <div key={idx} className="rounded-card bg-card border border-line p-6 flex flex-col justify-between">
                <div>
                  <span className="text-2xl font-bold font-mono text-brand-400 mb-3 block">
                    {wf.step}
                  </span>
                  <h3 className="text-base font-bold text-fg mb-2">{wf.title}</h3>
                  <p className="text-xs text-fg-muted leading-relaxed">{wf.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits and Use Cases */}
      <section className="py-20 bg-canvas border-t border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Practical Applications"
            title="Where AI Receptionists Deliver Immediate ROI"
            align="center"
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((uc, idx) => (
              <div key={idx} className="p-6 rounded-card bg-card border border-line">
                <h3 className="text-lg font-bold text-fg mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-brand-400" />
                  {uc.title}
                </h3>
                <p className="text-sm text-fg-muted leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 bg-canvas border-t border-line">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Answers & Clarifications"
            title="Frequently Asked Questions"
            align="center"
            className="mb-12"
          />

          <div className="space-y-3">
            {faqList.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-card bg-card border border-line overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-fg hover:text-brand-300 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-fg-muted transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-brand-400" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-fg-muted leading-relaxed border-t border-line">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
