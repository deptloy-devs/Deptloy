import { Activity, CalendarCheck2, CheckCircle2, Clock, Cpu, Database, Timer, TrendingUp } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

const benefits = [
  {
    icon: Clock,
    title: "Sub-Second Inbound Response Times",
    description:
      "Never make callers wait on hold or send prospects to an unmonitored voicemail box. Every inquiry is met with immediate, polite, professional assistance 24/7/365.",
  },
  {
    icon: CalendarCheck2,
    title: "Flawless Appointment Coordination",
    description:
      "Direct real-time two-way synchronization with your calendar eliminates accidental double-bookings, honors clinician buffer times, and handles cancellations autonomously.",
  },
  {
    icon: Database,
    title: "Organized, Enriched Customer Data",
    description:
      "Call transcripts, requested services, caller intent, and verified contact records are automatically categorized and funneled directly into your CRM before you even meet the client.",
  },
  {
    icon: Timer,
    title: "Eliminate 20+ Hours of Weekly Admin",
    description:
      "Free your high-value practitioners and front-desk staff from phone-tag, intake re-entry, and rescheduling, letting them focus on clients in front of them.",
  },
  {
    icon: Cpu,
    title: "Customized to Your Existing Software Stack",
    description:
      "No need to rip and replace what already works. Deptloy integrates cleanly with Google Workspace, Outlook, HubSpot, Stripe, Calendly, and industry EHRs.",
  },
];

const meters = [
  { label: "Inbound Call Answering Rate", value: "99.8% with AI", width: "99%", note: "vs. ~68% industry average for manual front desks" },
  { label: "Average Inquiry Response Time", value: "2.1s with AI", width: "95%", note: "vs. 4-8 hours for manual voicemail return" },
  { label: "Front Desk Hours Redirected to Clients", value: "+22 hrs/week", width: "88%" },
];

export function BenefitsSection() {
  return (
    <Section divider>
      <SectionHeading
        eyebrow="Measurable Business Impact"
        title="Less Manual Work. Better Customer Experiences."
        description="Transforming your communication layer from a reactive distraction into an autonomous competitive advantage."
        className="mb-14"
      />

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-8">
        <ul className="flex flex-col gap-4 lg:col-span-7">
          {benefits.map((b) => (
            <li key={b.title}>
              <Card padding="sm" className="flex items-start gap-4 sm:p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-control border border-line bg-raised text-brand-300">
                  <b.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-sans text-base font-semibold text-fg">{b.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-fg-muted">{b.description}</p>
                </div>
              </Card>
            </li>
          ))}
        </ul>

        <Reveal className="flex flex-col gap-4 lg:sticky lg:top-28 lg:col-span-5">
          <Card padding="lg">
            <div className="mb-5 flex items-center justify-between border-b border-line pb-4">
              <span className="text-eyebrow font-semibold uppercase text-fg-muted">Operational Throughput</span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-300">
                <Activity className="h-3.5 w-3.5" aria-hidden="true" /> Benchmarked
              </span>
            </div>
            <dl className="space-y-5">
              {meters.map((m) => (
                <div key={m.label}>
                  <div className="mb-2 flex items-baseline justify-between gap-4 text-sm">
                    <dt className="text-fg-soft">{m.label}</dt>
                    <dd className="shrink-0 font-semibold text-fg">{m.value}</dd>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-raised-hover" aria-hidden="true">
                    <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-electric-400" style={{ width: m.width }} />
                  </div>
                  {m.note && <p className="mt-1.5 text-xs text-fg-subtle">{m.note}</p>}
                </div>
              ))}
            </dl>
          </Card>

          <Card className="border-brand-400/20 bg-gradient-to-br from-brand-950/40 to-card">
            <div className="flex items-start gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-control border border-success/30 bg-success/10 text-success">
                <TrendingUp className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-sans text-base font-semibold text-fg">24/7 Continuous Receptionist Uptime</h3>
                <p className="mt-0.5 text-sm text-fg-muted">Zero holidays, zero sick days, zero peak-hour phone queues</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4 text-sm">
              <span className="inline-flex items-center gap-1.5 text-success">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> High availability failover
              </span>
              <span className="text-fg-muted">99.9% Telephony SLA</span>
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
