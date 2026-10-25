import { Sparkles, Clock, Layers, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

const differentiators = [
  {
    icon: Clock,
    stat: "< 2.4s",
    statLabel: "Response Speed",
    title: "Instant 24/7 Lead Capture",
    description:
      "Answers inbound calls and web inquiries instantly with natural voice, booking appointments directly into your calendar.",
    tag: "Direct Booking",
  },
  {
    icon: Sparkles,
    stat: "100%",
    statLabel: "Brand Safe",
    title: "Trained on Your Playbook",
    description:
      "Tuned strictly to your pricing, services, and scheduling rules. Zero hallucinations or generic robotic answers.",
    tag: "Custom Logic",
  },
  {
    icon: Layers,
    stat: "2-Way",
    statLabel: "Live Sync",
    title: "Works With Your Stack",
    description:
      "Seamless real-time integration with Google Calendar, Microsoft 365, HubSpot, Stripe, and your industry CRM.",
    tag: "Zero Migration",
  },
  {
    icon: ShieldCheck,
    stat: "3–7 Days",
    statLabel: "Turnkey Go-Live",
    title: "Fully Managed Setup",
    description:
      "We design, test, deploy, and maintain your entire system. Zero coding or technical overhead required from your team.",
    tag: "Done-for-You",
  },
];

const integrations = [
  "Google Calendar",
  "Microsoft 365",
  "HubSpot",
  "Stripe",
  "Calendly",
  "Custom CRMs",
];

export function DemoWhyChooseUs() {
  return (
    <Section id="why-choose-us" divider spacing="default">
      {/* Crisp, Bold Section Header */}
      <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
        <span className="inline-block rounded-full border border-brand-400/25 bg-brand-500/10 px-3 py-1 font-mono text-xs font-semibold text-brand-300 mb-4">
          Why Deptloy
        </span>
        <h2 className="text-display-sm sm:text-display font-semibold tracking-tight text-fg">
          Built for Operations. <span className="text-gradient-brand">Measured in Revenue.</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-fg-soft leading-relaxed max-w-2xl mx-auto">
          We replace manual administrative busywork with autonomous AI systems that capture leads, book clients, and integrate into your existing tools.
        </p>
      </div>

      {/* Spacious 4-Card Value Grid: Unified Stats + Pillars (Zero visual clutter) */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {differentiators.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Reveal key={item.title} delay={idx * 75} className="h-full">
              <Card className="group relative flex h-full flex-col justify-between p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/40 hover:shadow-raised">
                <div>
                  {/* Top Bar: Icon + Tag */}
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-control border border-brand-400/25 bg-brand-500/10 text-brand-300 group-hover:scale-105 transition-transform">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="rounded-full border border-line bg-raised px-2.5 py-0.5 font-mono text-[11px] font-medium text-fg-muted">
                      {item.tag}
                    </span>
                  </div>

                  {/* Big Scannable Stat */}
                  <div className="mt-6">
                    <p className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-gradient-brand">
                      {item.stat}
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-wider text-fg-muted mt-0.5">
                      {item.statLabel}
                    </p>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="mt-5 text-lg font-semibold text-fg tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-fg-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Card>
            </Reveal>
          );
        })}
      </div>

      {/* Clean Native Integrations Bar */}
      <Reveal delay={200} className="mt-12 sm:mt-16">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-panel border border-line bg-card/60 px-6 py-4 shadow-card backdrop-blur-sm text-center sm:text-left">
          <p className="text-xs sm:text-sm font-medium text-fg-soft">
            Direct two-way integration with your daily tools:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {integrations.map((tool) => (
              <span
                key={tool}
                className="rounded-control border border-line bg-raised px-3 py-1 text-xs font-semibold text-fg-soft"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
