import { Search, Sliders, Rocket, CheckCircle2, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: <Search className="h-6 w-6 text-purple-400" />,
      title: "Understand Your Business",
      subtitle: "Discovery & Operational Mapping",
      description:
        "We audit your customer touchpoints, typical inquiries, cancellation policies, and calendar bottlenecks to map the exact conversational flow your business needs.",
      deliverables: ["Inbound call flow audit", "FAQ & knowledge base ingestion", "Custom calendar rule mapping"],
    },
    {
      number: "02",
      icon: <Sliders className="h-6 w-6 text-blue-400" />,
      title: "Configure Your AI & Workflows",
      subtitle: "Tailored Architecture & Testing",
      description:
        "We configure neural voice personas, connect your calendar (Google/Outlook/Calendly), set up CRM webhooks, and benchmark conversational turn-taking in a private sandbox.",
      deliverables: ["Neural voice persona tuning", "Calendar & EHR/CRM OAuth sync", "Live staging sandbox testing"],
    },
    {
      number: "03",
      icon: <Rocket className="h-6 w-6 text-emerald-400" />,
      title: "Automate and Improve",
      subtitle: "Go Live & Continuous Optimization",
      description:
        "Switch your phone forwarding to your Deptloy number or embed our web agent. Our dashboard provides real-time call transcripts, sentiment scores, and automated optimization.",
      deliverables: ["Seamless phone forwarding setup", "Real-time client analytics dashboard", "Bi-weekly accuracy fine-tuning"],
    },
  ];

  return (
    <section id="how-it-works" className="relative py-24 bg-[#080B14] border-t border-white/[0.06] scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Implementation Roadmap"
          title="From Bottlenecks to Autopilot in Three Steps"
          description="A structured, enterprise-ready deployment process that requires zero engineering work from your team."
          align="center"
          className="mb-16"
        />

        {/* 3 Step Connected Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative rounded-3xl bg-[#101522] border border-white/10 p-8 flex flex-col justify-between hover:border-purple-500/30 transition-all duration-300 group"
            >
              <div>
                {/* Step Top Bar */}
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-[#111827] border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {step.icon}
                  </div>
                  <span className="text-3xl font-extrabold text-slate-700 group-hover:text-purple-400/40 transition-colors font-mono">
                    {step.number}
                  </span>
                </div>

                {/* Step Title & Subtitle */}
                <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider block mb-1">
                  {step.subtitle}
                </span>
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Deliverables List */}
                <div className="space-y-2 pt-4 border-t border-white/[0.08]">
                  {step.deliverables.map((deliv, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
                <span>Phase {step.number} Duration</span>
                <span className="font-semibold text-white">
                  {idx === 0 ? "Days 1–2" : idx === 1 ? "Days 3–5" : "Day 6 onwards"}
                </span>
              </div>
            </div>
          ))}

        </div>

        {/* Bottom Callout */}
        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
          >
            <span>Have specific compliance or custom legacy tool questions?</span>
            <span className="text-purple-400 hover:text-purple-300 font-semibold inline-flex items-center gap-1">
              Talk to our technical architects <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}
