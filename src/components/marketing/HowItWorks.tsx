import Link from "next/link";
import { ArrowRight, CheckCircle2, Rocket, Search, Sliders } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Understand Your Business",
    subtitle: "Discovery & Operational Mapping",
    description:
      "We audit your customer touchpoints, typical inquiries, cancellation policies, and calendar bottlenecks to map the exact conversational flow your business needs.",
    deliverables: ["Inbound call flow audit", "FAQ & knowledge base ingestion", "Custom calendar rule mapping"],
    duration: "Days 1–2",
  },
  {
    number: "02",
    icon: Sliders,
    title: "Configure Your AI & Workflows",
    subtitle: "Tailored Architecture & Testing",
    description:
      "We configure neural voice personas, connect your calendar (Google/Outlook/Calendly), set up CRM webhooks, and benchmark conversational turn-taking in a private sandbox.",
    deliverables: ["Neural voice persona tuning", "Calendar & EHR/CRM OAuth sync", "Live staging sandbox testing"],
    duration: "Days 3–5",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Automate and Improve",
    subtitle: "Go Live & Continuous Optimization",
    description:
      "Switch your phone forwarding to your Deptloy number or embed our web agent. Our dashboard provides real-time call transcripts, sentiment scores, and automated optimization.",
    deliverables: ["Seamless phone forwarding setup", "Real-time client analytics dashboard", "Bi-weekly accuracy fine-tuning"],
    duration: "Day 6 onwards",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" divider>
      <SectionHeading
        eyebrow="Implementation Roadmap"
        title="From Bottlenecks to Autopilot in Three Steps"
        description="A structured, enterprise-ready deployment process that requires zero engineering work from your team."
        className="mb-14"
      />

      <ol className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {steps.map((step, idx) => (
          <li key={step.number}>
            <Reveal delay={idx * 80} className="h-full">
              <Card padding="lg" className="flex h-full flex-col">
                <div className="mb-6 flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-card border border-line bg-raised text-brand-300">
                    <step.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="font-display text-3xl font-semibold text-fg-subtle/70" aria-hidden="true">
                    {step.number}
                  </span>
                </div>

                <p className="text-eyebrow font-semibold uppercase text-brand-300">
                  <span className="sr-only">Step {step.number}: </span>
                  {step.subtitle}
                </p>
                <h3 className="mt-2 text-h3 font-semibold">{step.title}</h3>
                <p className="mt-3 text-fg-muted">{step.description}</p>

                <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                  {step.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-sm text-fg-soft">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
                      {d}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between border-t border-line pt-5 text-sm">
                  <span className="text-fg-muted">Typical timing</span>
                  <span className="font-semibold text-fg">{step.duration}</span>
                </div>
              </Card>
            </Reveal>
          </li>
        ))}
      </ol>

      <p className="mt-10 text-center text-fg-soft">
        Have specific compliance or custom legacy tool questions?{" "}
        <Link href="/contact" className="inline-flex items-center gap-1 font-semibold text-link hover:text-brand-200">
          Talk to our technical architects <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </p>
    </Section>
  );
}
