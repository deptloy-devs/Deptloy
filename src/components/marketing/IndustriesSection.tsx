import Link from "next/link";
import {
  Stethoscope,
  Sparkles,
  Building2,
  Briefcase,
  Wrench,
  Scale,
  ArrowRight,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { industries } from "@/lib/site";

export function IndustriesSection() {
  const iconMap: Record<string, React.ReactNode> = {
    Stethoscope: <Stethoscope className="h-6 w-6 text-brand-400" />,
    Sparkles: <Sparkles className="h-6 w-6 text-pink-400" />,
    Building2: <Building2 className="h-6 w-6 text-blue-400" />,
    Briefcase: <Briefcase className="h-6 w-6 text-emerald-400" />,
    Wrench: <Wrench className="h-6 w-6 text-amber-400" />,
    Scale: <Scale className="h-6 w-6 text-cyan-400" />,
  };

  return (
    <section id="tailored-services" className="relative py-24 bg-surface border-t border-line scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Services by Sector"
          title="Tailored Services for Every Business Type"
          description="Every business operates with distinct customer questions, booking workflows, and staff needs. We tailor each AI service deployment to your exact operations."
          align="center"
          className="mb-16"
        />

        {/* 6 Industry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind) => (
            <div
              key={ind.id}
              className="group relative rounded-3xl bg-card border border-line p-7 flex flex-col justify-between hover:border-brand-500/30 hover:bg-card transition-all duration-300"
            >
              <div>
                {/* Header Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="rounded-2xl bg-raised p-3 border border-line group-hover:scale-105 transition-transform">
                    {iconMap[ind.iconName] || <Briefcase className="h-6 w-6 text-brand-400" />}
                  </div>
                  <span className="text-[11px] font-mono text-brand-400 font-semibold">Tailored Service</span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">
                  {ind.title}
                </h3>
                <p className="text-xs font-medium text-brand-400 mb-3">
                  {ind.tagline}
                </p>
                <p className="text-sm text-fg-muted leading-relaxed mb-5">
                  {ind.description}
                </p>

                {/* Common Bottleneck & Solution Pill */}
                <div className="rounded-xl bg-black/30 p-3 border border-line space-y-1.5 mb-6 text-xs">
                  <div>
                    <span className="text-fg-subtle font-semibold block text-[10px] uppercase">Operational Friction</span>
                    <p className="text-fg-soft">{ind.commonBottleneck}</p>
                  </div>
                  <div className="pt-1.5 border-t border-line">
                    <span className="text-brand-400 font-semibold block text-[10px] uppercase">Deptloy Configuration</span>
                    <p className="text-fg-soft">{ind.deptloySolution}</p>
                  </div>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="pt-4 border-t border-line flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {ind.recommendedServices.slice(0, 2).map((srv, idx) => (
                    <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/5 text-fg-soft">
                      {srv}
                    </span>
                  ))}
                </div>
                <Link
                  href="/industries"
                  className="text-xs font-semibold text-brand-400 hover:text-brand-300 inline-flex items-center gap-1 group-hover:translate-x-1 transition-all"
                >
                  <span>Learn more</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* View All Services Link */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors"
          >
            <span>Explore all tailored services & solutions</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
