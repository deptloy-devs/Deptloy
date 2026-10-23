import { Sparkles, Clock, Layers, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

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
    detail: "Zero phone-tag & manual intake",
  },
  {
    value: "3–7 Days",
    label: "Rapid Launch",
    detail: "Turnkey setup, zero coding",
  },
];

const pillars = [
  {
    icon: Sparkles,
    badge: "Custom Logic",
    title: "Trained on Your Playbook",
    description:
      "Tuned specifically to your service catalog, pricing, clinician buffer times, and rules. No hallucinations or generic replies.",
    metricTag: "Zero hallucinations • Brand-safe",
  },
  {
    icon: Clock,
    badge: "Sub-Second",
    title: "Instant 24/7 Lead Capture",
    description:
      "Answers phone calls and web inquiries instantly with natural human cadence, real-time availability checks, and direct booking.",
    metricTag: "Locks in appointments on the spot",
  },
  {
    icon: Layers,
    badge: "Direct Sync",
    title: "Works With Your Current Stack",
    description:
      "Two-way sync with Google Calendar, Outlook, HubSpot, Stripe, and specialized CRMs. No new tools to learn.",
    metricTag: "Zero migration • Bi-directional OAuth",
  },
  {
    icon: ShieldCheck,
    badge: "Done-for-You",
    title: "Turnkey Rollout & Support",
    description:
      "We build, test edge cases in sandbox staging, and deploy your entire setup. Ongoing tuning included after go-live.",
    metricTag: "Fully managed by our team",
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

export function WhyChooseUs() {
  return (
    <Section id="why-choose-us" divider spacing="sm">
      {/* Section Header */}
      <SectionHeading
        eyebrow="Why Choose Deptloy"
        title="Built for Real Operations. Measured in Real Growth."
        description="We build custom-tuned AI agents and automations that capture every customer, eliminate administrative chaos, and fit cleanly into your existing workflows."
        className="mb-8"
      />

      {/* Compact Proof Stats Strip */}
      <Reveal className="mb-6">
        <div className="rounded-card border border-line bg-card/80 px-5 py-4 shadow-card backdrop-blur-md">
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:divide-x lg:divide-line">
            {stats.map((s, idx) => (
              <div
                key={s.label}
                className={cn(
                  "flex flex-col gap-0.5",
                  idx > 0 && "lg:pl-6"
                )}
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

      {/* Compact Differentiator Cards (4-Column Grid) */}
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((item, idx) => {
          const Icon = item.icon;
          return (
            <li key={item.title}>
              <Reveal delay={idx * 60} className="h-full">
                <Card className="flex h-full flex-col justify-between p-5 transition-[transform,border-color,box-shadow] duration-200 ease-out-soft hover:-translate-y-1 hover:border-brand-400/35 hover:shadow-raised">
                  <div>
                    {/* Header: Icon + Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="grid h-9 w-9 place-items-center rounded-control border border-brand-400/25 bg-brand-500/10 text-brand-300">
                        <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                      </span>
                      <span className="rounded-full border border-brand-400/20 bg-brand-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-brand-300">
                        {item.badge}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="mt-4 text-base font-semibold text-fg">{item.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-fg-muted">
                      {item.description}
                    </p>
                  </div>

                  {/* Micro Tag Footer */}
                  <div className="mt-4 flex items-center gap-1.5 border-t border-line pt-3 text-[11px] font-medium text-brand-300">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />
                    <span>{item.metricTag}</span>
                  </div>
                </Card>
              </Reveal>
            </li>
          );
        })}
      </ul>

      {/* Compact Integration Strip */}
      <Reveal delay={150} className="mt-6">
        <div className="flex flex-col items-center justify-between gap-3 rounded-card border border-line/60 bg-raised/30 px-4 py-2.5 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-fg-muted">
            Native integrations:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {integrations.map((tool) => (
              <span
                key={tool}
                className="rounded-control border border-line/70 bg-card/60 px-2 py-0.5 text-[11px] font-medium text-fg-soft"
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
