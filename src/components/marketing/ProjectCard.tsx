import Link from "next/link";
import { ArrowRight, Briefcase, Building2, Sparkles, Stethoscope, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { CaseStudyItem } from "@/types";

const categoryIcon: Record<CaseStudyItem["category"], LucideIcon> = {
  healthcare: Stethoscope,
  beauty: Sparkles,
  "real-estate": Building2,
  professional: Briefcase,
};

/**
 * Branded cover illustration until real project imagery is supplied.
 * Pure CSS/SVG — no image requests, no layout shift (fixed aspect ratio).
 */
export function ProjectCover({ project, className }: { project: CaseStudyItem; className?: string }) {
  const Icon = categoryIcon[project.category];
  return (
    <div
      className={cn("relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-brand-950 via-ink-800 to-ink-850", className)}
      aria-hidden="true"
    >
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-brand-600/25 blur-3xl" />
      <div className="absolute -bottom-20 left-6 h-48 w-48 rounded-full bg-electric-500/15 blur-3xl" />
      <div className="absolute inset-0 grid place-items-center transition-transform duration-500 ease-out-soft group-hover:scale-105">
        <div className="relative grid h-20 w-20 place-items-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm">
          <div className="absolute -inset-4 rounded-full border border-white/[0.06]" />
          <div className="absolute -inset-9 rounded-full border border-white/[0.04]" />
          <Icon className="h-8 w-8 text-brand-200" />
        </div>
      </div>
      <span className="absolute bottom-3 left-4 text-xs font-medium text-fg-muted">{project.industry}</span>
    </div>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Services used">
      {tags.map((t) => (
        <li key={t} className="rounded-full border border-line bg-raised px-2.5 py-0.5 text-xs font-medium text-fg-soft">
          {t}
        </li>
      ))}
    </ul>
  );
}

function Metrics({ metrics }: { metrics: CaseStudyItem["metrics"] }) {
  return (
    <dl className="grid grid-cols-3 divide-x divide-line rounded-card border border-line bg-raised/60 text-center">
      {metrics.map((m) => (
        <div key={m.label} className="flex flex-col-reverse gap-1 px-2 py-3">
          <dt className="text-xs leading-tight text-fg-muted">{m.label}</dt>
          <dd className="font-display text-lg font-semibold text-fg">{m.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Compact card for the home page — the whole card links to the full write-up. */
export function ProjectCard({ project }: { project: CaseStudyItem }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-card shadow-card transition-[transform,border-color,box-shadow] duration-200 ease-out-soft hover:-translate-y-1 hover:border-brand-400/35 hover:shadow-raised focus-within:border-brand-400/35">
      <ProjectCover project={project} />
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between gap-3">
          <Tags tags={project.tags.slice(0, 2)} />
          {project.isDemonstration && <Badge variant="outline" size="sm">Sample scenario</Badge>}
        </div>
        <h3 className="font-sans text-lg font-semibold leading-snug text-fg">
          <Link href={`/projects#${project.id}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {project.title}
          </Link>
        </h3>
        <p className="line-clamp-3 text-sm text-fg-muted">{project.challenge}</p>
        <div className="mt-auto space-y-4">
          <Metrics metrics={project.metrics} />
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-link">
            Read the project
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  );
}

/** Full case-study layout for the Projects page. */
export function ProjectDetail({ project }: { project: CaseStudyItem }) {
  return (
    <article
      id={project.id}
      className="group grid scroll-mt-28 overflow-hidden rounded-panel border border-line bg-card shadow-card lg:grid-cols-5"
    >
      <ProjectCover project={project} className="lg:col-span-2 lg:aspect-auto lg:h-full" />
      <div className="flex flex-col gap-6 p-6 sm:p-8 lg:col-span-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Tags tags={project.tags} />
          {project.isDemonstration && <Badge variant="outline" size="sm">Sample scenario</Badge>}
        </div>
        <div>
          <p className="text-sm text-fg-muted">{project.clientPlaceholder} · {project.industry}</p>
          <h2 className="mt-2 font-sans text-h3 font-semibold text-fg">{project.title}</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="font-sans text-eyebrow font-semibold uppercase text-fg-subtle">The Problem We Solved</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-soft">{project.challenge}</p>
          </div>
          <div>
            <h3 className="font-sans text-eyebrow font-semibold uppercase text-brand-300">The Implemented Solution</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-soft">{project.solution}</p>
          </div>
        </div>
        <div>
          <h3 className="mb-3 font-sans text-eyebrow font-semibold uppercase text-fg-subtle">Measured Impact</h3>
          <Metrics metrics={project.metrics} />
          <p className="mt-3 text-sm text-fg-muted">{project.outcome}</p>
        </div>
        <div className="mt-auto">
          <Button href="/contact" variant="outline" size="md" className="w-full sm:w-auto">
            Discuss This Project
          </Button>
        </div>
      </div>
    </article>
  );
}
