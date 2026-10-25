import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceIcon } from "../ServiceIcon";
import type { ServiceSlug } from "@/types";

interface ServiceItem {
  slug: ServiceSlug;
  href: string;
  title: string;
  headline: string;
  description: string;
  metric: string;
  metricLabel: string;
  badge?: string;
}

const services: ServiceItem[] = [
  {
    slug: "ai-receptionist",
    href: "/services/ai-receptionist",
    title: "AI Voice & Web Receptionist",
    headline: "Never miss an inbound lead, customer call, or booking again.",
    description:
      "A branded 24/7 conversational voice assistant that answers inbound calls, resolves questions, and schedules appointments directly into your calendar.",
    metric: "< 2.4s",
    metricLabel: "Response Speed",
    badge: "Flagship Service",
  },
  {
    slug: "automation",
    href: "/services/automation",
    title: "Workflow Automation",
    headline: "Eliminate repetitive administrative tasks and manual entry.",
    description:
      "Self-running workflows that connect your software. From automated client intake and invoicing to calendar sync and task routing.",
    metric: "22+ hrs",
    metricLabel: "Saved Weekly",
    badge: "Efficiency",
  },
  {
    slug: "crm",
    href: "/services/crm",
    title: "CRM Architecture & Pipelines",
    headline: "Turn customer interactions into predictable, trackable revenue.",
    description:
      "Tailored CRM implementations with automated lead qualification, interaction timelines, and real-time executive sales dashboards.",
    metric: "99.8%",
    metricLabel: "Lead Capture",
    badge: "Pipelines",
  },
  {
    slug: "development",
    href: "/services/development",
    title: "Custom Software & Web Apps",
    headline: "Bespoke digital platforms engineered for conversion and speed.",
    description:
      "Modern Next.js web applications, client portals, and bespoke internal tools designed to scale your operational throughput.",
    metric: "99+",
    metricLabel: "Performance Score",
    badge: "Engineering",
  },
];

export function DemoServicesSection() {
  return (
    <Section id="services" tone="surface" divider spacing="default">
      {/* Crisp Section Header */}
      <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
        <span className="inline-block rounded-full border border-brand-400/25 bg-brand-500/10 px-3 py-1 font-mono text-xs font-semibold text-brand-300 mb-4">
          Core Capabilities
        </span>
        <h2 className="text-display-sm sm:text-display font-semibold tracking-tight text-fg">
          Our Services
        </h2>
        <p className="mt-4 text-base sm:text-lg text-fg-soft leading-relaxed max-w-2xl mx-auto">
          Four tailored solutions built to eliminate operational friction, capture missed opportunities, and scale revenue.
        </p>
      </div>

      {/* Spacious 2x2 Services Grid with Maximum Readability & Zero Clutter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
        {services.map((srv, idx) => (
          <Reveal key={srv.slug} delay={idx * 80} className="h-full">
            <Link
              href={srv.href}
              className="group relative flex h-full flex-col justify-between rounded-panel border border-line bg-card/90 p-7 sm:p-8 backdrop-blur-md shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/40 hover:shadow-raised block"
            >
              <div>
                {/* Top Bar: Icon + Badge */}
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-control border border-brand-400/25 bg-brand-500/10 text-brand-300 group-hover:scale-105 transition-transform">
                    <ServiceIcon slug={srv.slug} className="h-6 w-6" />
                  </span>
                  {srv.badge && (
                    <Badge variant={idx === 0 ? "brand" : "default"} size="sm">
                      {srv.badge}
                    </Badge>
                  )}
                </div>

                {/* Title */}
                <h3 className="mt-6 font-display text-xl sm:text-2xl font-bold tracking-tight text-fg group-hover:text-brand-300 transition-colors">
                  {srv.title}
                </h3>

                {/* Punchy Headline */}
                <p className="mt-2 text-sm font-medium text-brand-300">
                  {srv.headline}
                </p>

                {/* Clean 1-sentence description */}
                <p className="mt-3 text-sm text-fg-muted leading-relaxed">
                  {srv.description}
                </p>
              </div>

              {/* Bottom Bar: Metric + Explore Link */}
              <div className="mt-8 border-t border-line pt-4 flex items-center justify-between">
                <div>
                  <p className="font-display text-xl font-bold text-fg">
                    {srv.metric}
                  </p>
                  <p className="text-[11px] font-medium text-fg-muted">
                    {srv.metricLabel}
                  </p>
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-link group-hover:text-brand-200 transition-colors">
                  Explore Service
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
