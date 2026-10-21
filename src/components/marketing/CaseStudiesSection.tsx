import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/lib/site";

export function CaseStudiesSection() {
  return (
    <Section id="projects" tone="surface" divider>
      <SectionHeading
        eyebrow="Our Work"
        title="Featured Projects & Solutions"
        description="Real-world project blueprints showing how our AI receptionists and automations resolve specific bottlenecks."
        className="mb-14"
      />

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, idx) => (
          <li key={p.id}>
            <Reveal delay={idx * 80} className="h-full">
              <ProjectCard project={p} />
            </Reveal>
          </li>
        ))}
      </ul>

      <div className="mt-10 text-center">
        <Link href="/projects" className="inline-flex items-center gap-2 font-semibold text-link hover:text-brand-200">
          Explore all featured projects and solution specs <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </Section>
  );
}
