import { Quote, Star } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

const clientStories = [
  {
    metric: "+45",
    metricLabel: "New Appointments / Mo",
    quote:
      "Deptloy captured 94% of our after-hours calls and filled our clinic calendar automatically without extra staff.",
    name: "Dr. Marcus Vance",
    role: "Clinical Director",
    company: "Metro Wellness & Family Dental",
    initials: "MV",
  },
  {
    metric: "35%",
    metricLabel: "Fewer Client No-Shows",
    quote:
      "Our stylists no longer step away from clients to answer phones. Bookings and deposits are 100% automated.",
    name: "Elena Rostova",
    role: "Founder",
    company: "Aura Studio & Aesthetics",
    initials: "ER",
  },
  {
    metric: "30s",
    metricLabel: "Average Lead Response",
    quote:
      "Inbound buyer inquiries now get answered in seconds instead of hours. Showing attendance doubled in weeks.",
    name: "David Chen",
    role: "Managing Principal Broker",
    company: "Vanguard Coastal Properties",
    initials: "DC",
  },
];

export function DemoTestimonials() {
  return (
    <Section id="testimonials" divider spacing="default">
      {/* Crisp Section Header */}
      <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
        <span className="inline-block rounded-full border border-brand-400/25 bg-brand-500/10 px-3 py-1 font-mono text-xs font-semibold text-brand-300 mb-4">
          Client Outcomes
        </span>
        <h2 className="text-display-sm sm:text-display font-semibold tracking-tight text-fg">
          Proven Operational Results
        </h2>
        <p className="mt-4 text-base sm:text-lg text-fg-soft leading-relaxed max-w-2xl mx-auto">
          See how service teams eliminate daily administrative bottlenecks and unlock autonomous growth.
        </p>
      </div>

      {/* 3 Spacious High-Impact Outcome Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
        {clientStories.map((item, idx) => (
          <Reveal key={item.name} delay={idx * 80} className="h-full">
            <Card className="flex h-full flex-col justify-between p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/40 hover:shadow-raised">
              <div>
                {/* Big Stat + Star Rating */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-display text-4xl font-bold tracking-tight text-gradient-brand">
                      {item.metric}
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-wider text-fg-muted mt-1">
                      {item.metricLabel}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Short, crisp quote */}
                <blockquote className="mt-6 text-sm sm:text-base leading-relaxed text-fg-soft">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </div>

              {/* Author Info */}
              <footer className="mt-8 flex items-center gap-3.5 border-t border-line pt-5">
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-brand-400/30 bg-brand-500/10 text-xs font-bold text-brand-300"
                  aria-hidden="true"
                >
                  {item.initials}
                </span>
                <div className="text-xs">
                  <span className="block font-semibold text-fg">{item.name}</span>
                  <span className="text-fg-muted">
                    {item.role} • <span className="text-fg-soft">{item.company}</span>
                  </span>
                </div>
              </footer>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
