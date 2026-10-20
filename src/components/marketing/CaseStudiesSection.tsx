import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { caseStudies } from "@/lib/site";

export function CaseStudiesSection() {
  return (
    <section id="projects" className="relative py-24 bg-surface border-t border-line scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Our Work"
          title="Featured Projects & Solutions"
          description="Real-world project blueprints showing how our AI receptionists and automations resolve specific bottlenecks."
          align="center"
          className="mb-16"
        />

        {/* 3 Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((cs) => (
            <div
              key={cs.id}
              className="group relative rounded-3xl bg-card border border-line p-7 flex flex-col justify-between hover:border-brand-500/30 transition-all duration-300"
            >
              <div>
                {/* Header: Project Sector & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20">
                    {cs.industry}
                  </span>
                  <Badge variant="outline" size="sm">
                    Project Blueprint
                  </Badge>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-4 group-hover:text-brand-300 transition-colors leading-snug">
                  {cs.title}
                </h3>

                {/* Challenge */}
                <div className="mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 block mb-1">
                    The Challenge
                  </span>
                  <p className="text-xs text-fg-muted leading-relaxed">
                    {cs.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div className="mb-6 pt-3 border-t border-line">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-400 block mb-1">
                    Deptloy Architecture
                  </span>
                  <p className="text-xs text-fg-soft leading-relaxed">
                    {cs.solution}
                  </p>
                </div>

                {/* Simulated Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-black/40 border border-line mb-6 text-center">
                  {cs.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="flex flex-col">
                      <span className="text-sm font-bold text-white font-mono">{m.value}</span>
                      <span className="text-[9px] text-fg-muted leading-tight mt-0.5">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-line flex items-center justify-between text-xs">
                <span className="text-fg-subtle flex items-center gap-1">
                  <Info className="h-3 w-3" /> Tested Blueprint
                </span>
                <Link
                  href="/projects"
                  className="font-semibold text-brand-400 hover:text-brand-300 inline-flex items-center gap-1 group-hover:translate-x-1 transition-all"
                >
                  <span>Read Project</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* View All Projects Link */}
        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors"
          >
            <span>Explore all featured projects and solution specs</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
