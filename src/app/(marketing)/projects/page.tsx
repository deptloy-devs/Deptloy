import type { Metadata } from "next";
import { Info } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/marketing/PageHero";
import { ProjectsList } from "@/components/marketing/ProjectsList";
import { FinalCta } from "@/components/marketing/FinalCta";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "How Deptloy's AI receptionists, workflow automations and custom software remove manual busywork for clinics, salons, brokerages and other service businesses.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Work & Projects"
        title="Featured Client Projects"
        description="Review how our autonomous AI receptionists, workflow pipelines, and custom software eliminate manual busywork and maximize appointment bookings."
      >
        <p className="mt-8 flex max-w-xl items-start gap-2.5 rounded-card border border-brand-400/25 bg-brand-500/10 p-4 text-left text-sm text-fg-soft">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
          <span>
            <strong className="font-semibold text-fg">Project blueprints:</strong> Client scenarios and performance
            statistics demonstrate our architecture capabilities across multiple sectors.
          </span>
        </p>
      </PageHero>

      <Section tone="surface" divider>
        <ProjectsList />
      </Section>

      <FinalCta />
    </>
  );
}
