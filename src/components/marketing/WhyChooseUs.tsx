import { Sparkles, Clock, Layers, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

const stats = [
  {
    value: "24/7",
    label: "Live Answering",
    detail: "Zero missed client calls",
  },
  {
    value: "< 500ms",
    label: "Voice Latency",
    detail: "Natural human response",
  },
  {
    value: "20+ hrs",
    label: "Saved / Week",
    detail: "Automated booking & intake",
  },
  {
    value: "3–5 Days",
    label: "Fast Deployment",
    detail: "Customized to your business",
  },
];

const pillars = [
  {
    icon: Sparkles,
    title: "Trained on Your Business Rules",
    description:
      "Tuned precisely to your services, pricing, calendar buffers, and tone. Accurate responses with zero hallucinations.",
  },
  {
    icon: Clock,
    title: "Instant Inbound Booking",
    description:
      "Converses naturally, verifies open time slots in real time, and locks appointments directly onto your calendar.",
  },
  {
    icon: Layers,
    title: "Direct Two-Way CRM Sync",
    description:
      "Automatic synchronization with Google Calendar, Outlook, HubSpot, Stripe, and your CRM with zero manual data entry.",
  },
];

export function WhyChooseUs() {
  return (
    <Section id="why-deptloy" spacing="sm">
      {/* Minimal Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--mist)] dark:bg-[var(--raised)] text-xs font-mono font-medium text-[var(--pur)] dark:text-[var(--peri)] mb-3">
          <span>Engineered Reliability</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--deep)] dark:text-white">
          Built for operations. Measured in results.
        </h2>
      </div>

      {/* Proof Stats Strip: Scannable in 3 seconds */}
      <Reveal className="mb-8">
        <div className="rounded-3xl border border-line bg-card/90 px-6 py-6 shadow-card backdrop-blur-md">
          <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:divide-x lg:divide-line">
            {stats.map((s, idx) => (
              <div
                key={s.label}
                className={idx > 0 ? "flex flex-col gap-1 lg:pl-6" : "flex flex-col gap-1"}
              >
                <dd className="font-archivo text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient-brand">
                  {s.value}
                </dd>
                <dt className="text-xs font-bold text-fg uppercase tracking-wider">{s.label}</dt>
                <p className="text-xs text-[var(--mute)] dark:text-[var(--fg-muted)]">{s.detail}</p>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>

      {/* 3 Value Pillars */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {pillars.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Reveal key={item.title} delay={idx * 60} className="h-full">
              <div className="card-hover-fx flex h-full flex-col justify-between rounded-3xl border border-line bg-card/90 p-6 shadow-card backdrop-blur-sm">
                <div>
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--mist)] dark:bg-[var(--raised)] text-[var(--pur)] dark:text-[var(--peri)]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-[var(--deep)] dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--mute)] dark:text-[var(--fg-muted)]">
                    {item.description}
                  </p>
                </div>
                <div className="mt-5 flex items-center gap-1.5 border-t border-line pt-4 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Turnkey configuration</span>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
