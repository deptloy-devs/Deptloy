import Link from "next/link";
import {
  Bot,
  Zap,
  BarChart3,
  Code2,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FinalCta } from "@/components/marketing/FinalCta";
import { services } from "@/lib/site";
import type { ServiceSlug } from "@/types";

export function generateMetadata() {
  return {
    title: "AI Services & Business Solutions",
    description: "Explore our AI Receptionist, Business Workflow Automation, CRM Solutions, and Web & App Development services.",
  };
}

export default function ServicesOverviewPage() {
  const iconMap: Record<ServiceSlug, React.ReactNode> = {
    "ai-receptionist": <Bot className="h-6 w-6 text-brand-400" />,
    automation: <Zap className="h-6 w-6 text-blue-400" />,
    crm: <BarChart3 className="h-6 w-6 text-emerald-400" />,
    development: <Code2 className="h-6 w-6 text-cyan-400" />,
  };

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden">
        <div className="glow-brand" />
        <div className="glow-accent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            <Badge variant="brand" dot className="mb-4">
              Comprehensive Service Suite
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              AI Services Built for Real Business Operations
            </h1>

            <p className="text-lg text-fg-soft leading-relaxed mb-8">
              We eliminate administrative friction across your customer communication, scheduling, and software pipelines. Explore each service below.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button href="/#services" variant="glow" size="md" leftIcon={<Sparkles className="h-4 w-4" />}>
                Swipe Service Cards on Homepage
              </Button>
              <Button href="/demo" variant="outline" size="md">
                Try AI Receptionist Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-surface border-t border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="All Services"
            title="Choose the Service You Need"
            description="Every service can be deployed independently or combined into a unified business operating system."
            align="center"
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((srv) => (
              <div
                key={srv.slug}
                className="rounded-3xl bg-card border border-line p-8 flex flex-col justify-between hover:border-brand-500/40 transition-all duration-300 group shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="rounded-2xl bg-raised p-3.5 border border-line group-hover:scale-105 transition-transform">
                      {iconMap[srv.slug]}
                    </div>
                    {srv.badge && (
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-500/15 text-brand-300 border border-brand-500/30">
                        {srv.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-sm font-semibold text-brand-400 mb-4">{srv.short}</p>
                  <p className="text-sm text-fg-soft leading-relaxed mb-6">{srv.description}</p>

                  <div className="space-y-2 pt-4 border-t border-line mb-8">
                    {srv.points.map((pt, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-fg-soft">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-line flex items-center justify-between">
                  {srv.metrics && (
                    <div className="flex flex-col">
                      <span className="text-[11px] text-fg-muted">{srv.metrics.label}</span>
                      <span className="text-sm font-bold text-white font-mono">{srv.metrics.value}</span>
                    </div>
                  )}

                  <Link
                    href={srv.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-400 group-hover:text-brand-300 group-hover:translate-x-1 transition-all ml-auto"
                  >
                    <span>View Service Details</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <FinalCta />
    </div>
  );
}
