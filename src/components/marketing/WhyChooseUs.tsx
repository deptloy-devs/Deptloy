import { Sparkles, Clock, Layers, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

const stats = [
  {
    value: "24/7",
    label: "Inbound Coverage",
    detail: "Never miss after-hours leads",
  },
  {
    value: "< 2.4s",
    label: "Response Speed",
    detail: "Sub-second natural pickup",
  },
  {
    value: "22+ hrs",
    label: "Admin Saved / Wk",
    detail: "Zero manual intake & phone-tag",
  },
  {
    value: "3–7 Days",
    label: "Rapid Rollout",
    detail: "Turnkey setup, zero coding",
  },
];

const pillars = [
  {
    icon: Sparkles,
    title: "Trained on Your Rules",
    description:
      "Configured strictly to your service catalog, pricing, clinician buffer times, and brand tone. Zero hallucinations.",
  },
  {
    icon: Clock,
    title: "Instant 24/7 Booking",
    description:
      "Answers phone calls with natural human cadence, checks live calendar slots, and confirms appointments on the spot.",
  },
  {
    icon: Layers,
    title: "Direct Calendar & CRM Sync",
    description:
      "Two-way synchronization with Google Calendar, Outlook, HubSpot, Stripe, and your CRM with zero workflow friction.",
  },
];

export function WhyChooseUs() {
  return (
    <Section id="why-choose-us" divider spacing="sm">
      {/* Minimal Section Header */}
      <SectionHeading
        eyebrow="Why Deptloy"
        title="Built for Real Operations. Measured in Real Results."
        className="mb-8"
      />

      {/* Proof Stats Strip: Scannable in 3 seconds */}
      <Reveal className="mb-6">
        <div className="rounded-card border border-line bg-card/80 px-5 py-4 shadow-card backdrop-blur-md">
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:divide-x lg:divide-line">
            {stats.map((s, idx) => (
              <div
                key={s.label}
                className={idx > 0 ? "flex flex-col gap-0.5 lg:pl-6" : "flex flex-col gap-0.5"}
              >
                <dd className="font-display text-2xl font-bold tracking-tight text-gradient-brand sm:text-3xl">
                  {s.value}
                </dd>
                <dt className="text-xs font-semibold text-fg">{s.label}</dt>
                <p className="text-[11px] text-fg-muted">{s.detail}</p>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>

      {/* 3 Minimal Value Pillars */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {pillars.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Reveal key={item.title} delay={idx * 60} className="h-full">
              <Card className="flex h-full flex-col justify-between p-5 transition-all duration-200 hover:border-brand-400/35 hover:shadow-raised">
                <div>
                  <span className="grid h-9 w-9 place-items-center rounded-control border border-brand-400/25 bg-brand-500/10 text-brand-300">
                    <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-fg">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-fg-muted">
                    {item.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 border-t border-line pt-3 text-[11px] font-medium text-emerald-500 dark:text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>Fully configured & tested</span>
                </div>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
