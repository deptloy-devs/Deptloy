import {
  Clock,
  CalendarCheck2,
  Database,
  Timer,
  Cpu,
  CheckCircle2,
  TrendingUp,
  Activity,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function BenefitsSection() {
  const benefits = [
    {
      icon: <Clock className="h-5 w-5 text-brand-400" />,
      title: "Sub-Second Inbound Response Times",
      description:
        "Never make callers wait on hold or send prospects to an unmonitored voicemail box. Every inquiry is met with immediate, polite, professional assistance 24/7/365.",
    },
    {
      icon: <CalendarCheck2 className="h-5 w-5 text-blue-400" />,
      title: "Flawless Appointment Coordination",
      description:
        "Direct real-time two-way synchronization with your calendar eliminates accidental double-bookings, honors clinician buffer times, and handles cancellations autonomously.",
    },
    {
      icon: <Database className="h-5 w-5 text-emerald-400" />,
      title: "Organized, Enriched Customer Data",
      description:
        "Call transcripts, requested services, caller intent, and verified contact records are automatically categorized and funneled directly into your CRM before you even meet the client.",
    },
    {
      icon: <Timer className="h-5 w-5 text-amber-400" />,
      title: "Eliminate 20+ Hours of Weekly Admin",
      description:
        "Free your high-value practitioners and front-desk staff from phone-tag, intake re-entry, and rescheduling, letting them focus on clients in front of them.",
    },
    {
      icon: <Cpu className="h-5 w-5 text-cyan-400" />,
      title: "Customized to Your Existing Software Stack",
      description:
        "No need to rip and replace what already works. Deptloy integrates cleanly with Google Workspace, Outlook, HubSpot, Stripe, Calendly, and industry EHRs.",
    },
  ];

  return (
    <section className="relative py-24 bg-canvas border-t border-line overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Measurable Business Impact"
          title="Less Manual Work. Better Customer Experiences."
          description="Transforming your communication layer from a reactive distraction into an autonomous competitive advantage."
          align="center"
          className="mb-16"
        />

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: List of 5 Benefits */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {benefits.map((b, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-2xl bg-card/60 border border-line hover:border-brand-500/30 hover:bg-card transition-all"
              >
                <div className="rounded-xl bg-raised p-2.5 border border-line shrink-0 mt-0.5">
                  {b.icon}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">
                    {b.title}
                  </h4>
                  <p className="text-sm text-fg-muted leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Supporting UI Visuals & Metrics Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Visual Card 1: Operational Efficiency Comparison */}
            <div className="rounded-3xl bg-card border border-line p-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-line mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-fg-muted">
                  Operational Throughput
                </span>
                <span className="text-xs font-mono text-brand-400 flex items-center gap-1">
                  <Activity className="h-3.5 w-3.5" /> Benchmarked
                </span>
              </div>

              {/* Progress Bars */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-fg-soft">Inbound Call Answering Rate</span>
                    <span className="font-bold text-emerald-400 font-mono">99.8% with AI</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-raised-hover overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-brand-500 to-emerald-400 rounded-full w-[99%]" />
                  </div>
                  <span className="text-[10px] text-fg-subtle mt-1 block">vs. ~68% industry average for manual front desks</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-fg-soft">Average Inquiry Response Time</span>
                    <span className="font-bold text-cyan-400 font-mono">2.1s with AI</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-raised-hover overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-brand-500 to-cyan-400 rounded-full w-[95%]" />
                  </div>
                  <span className="text-[10px] text-fg-subtle mt-1 block">vs. 4-8 hours for manual voicemail return</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-fg-soft">Front Desk Hours Redirected to Clients</span>
                    <span className="font-bold text-brand-400 font-mono">+22 hrs/week</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-raised-hover overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-brand-500 rounded-full w-[88%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Card 2: System Health & Availability Pill */}
            <div className="rounded-2xl bg-gradient-to-br from-brand-950/30 to-card border border-brand-500/20 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">24/7 Continuous Receptionist Uptime</h5>
                  <p className="text-xs text-fg-muted">Zero holidays, zero sick days, zero peak-hour phone queues</p>
                </div>
              </div>
              <div className="pt-3 border-t border-line flex items-center justify-between text-xs text-fg-muted">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" /> High availability failover
                </span>
                <span className="font-mono text-fg-muted">99.9% Telephony SLA</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
