import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceIcon } from "./ServiceIcon";
import { services } from "@/lib/site";

/** All four services visible at once — replaces the one-at-a-time swipe carousel. */
export function ServicesSection() {
  return (
    <Section id="services" tone="surface" divider>
      <SectionHeading
        eyebrow="Our Services"
        title="Technology That Works for Your Business"
        description="Four core services, built to work together. Start with one, or combine them."
        className="mb-14"
      />

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {services.map((srv, idx) => (
          <li key={srv.slug}>
            <Reveal delay={(idx % 2) * 80} className="h-full">
              <article className="group relative flex h-full flex-col rounded-card border border-line bg-card p-6 shadow-card transition-[transform,border-color,box-shadow] duration-200 ease-out-soft hover:-translate-y-1 hover:border-brand-400/35 hover:shadow-raised focus-within:border-brand-400/35 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-card border border-brand-400/25 bg-brand-500/10 text-brand-300">
                    <ServiceIcon slug={srv.slug} className="h-6 w-6" />
                  </span>
                  {srv.badge && <Badge variant={idx === 0 ? "brand" : "default"}>{srv.badge}</Badge>}
                </div>

                <h3 className="mt-6 text-h3 font-semibold">
                  <Link href={srv.href} className="after:absolute after:inset-0 focus-visible:outline-none">
                    {srv.title}
                  </Link>
                </h3>
                <p className="mt-2 font-medium text-fg-soft">{srv.short}</p>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{srv.description}</p>

                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {srv.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-sm text-fg-soft">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
                      {pt}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <div className="flex items-end justify-between gap-4 border-t border-line pt-5">
                    {srv.metrics && (
                      <div>
                        <p className="text-xs text-fg-muted">{srv.metrics.label}</p>
                        <p className="font-display text-xl font-semibold text-fg">{srv.metrics.value}</p>
                      </div>
                    )}
                    <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-link">
                      Explore
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
