import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { projects, getProject } from "@/lib/projects";
import { ProjectVisualPreview } from "@/components/marketing/projects/ProjectVisuals";
import { ProjectWaitlistForm } from "@/components/marketing/projects/ProjectWaitlistForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project | Deptloy" };

  return {
    title: `${project.name} | Deptloy Projects`,
    description: project.summary,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${project.name} — Deptloy Projects`,
      description: project.summary,
      url: `https://www.deptloy.com/projects/${slug}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const isDevelopment = project.status === "in-development";
  const isLive = project.status === "live";

  // Find next project for smooth browsing
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-24">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Projects", item: "/projects" },
          { name: project.name, item: `/projects/${project.slug}` },
        ]}
      />

      <div className="wrap max-w-5xl">
        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--pur)] hover:text-[var(--deep)] mb-8 transition-colors"
        >
          <ArrowLeft size={14} /> Back to all projects
        </Link>

        {/* Hero Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
              isDevelopment
                ? "bg-[#16875b]/15 text-[#16875b] border border-[#16875b]/30"
                : isLive
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-purple-50 text-purple-700 border border-purple-200"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isDevelopment ? "bg-[#16875b] animate-pulse" : "bg-emerald-500"
              }`}
            />
            {project.status === "in-development" ? "In Development • Launching Soon" : "Live Product"}
          </span>

          <span className="text-xs font-mono font-semibold text-[var(--mute)]">
            {project.category}
          </span>
          <span className="text-xs font-mono text-[var(--mute)]">
            • {project.platform} • {project.year}
          </span>
        </div>

        {/* Title & Pitch */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--deep)] tracking-tight leading-[1.08]">
          {project.name}
        </h1>
        <p className="mt-4 text-base sm:text-xl text-[var(--mute)] leading-relaxed max-w-3xl">
          {project.summary}
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {project.action.kind === "waitlist" ? (
            <a
              href="#waitlist"
              className="btn font-bold text-sm"
              style={{ background: project.accent, color: "#fff" }}
            >
              <span>{project.action.label}</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </a>
          ) : project.action.kind === "link" ? (
            <Link
              href={project.action.href}
              className="btn font-bold text-sm"
              style={{ background: project.accent, color: "#fff" }}
            >
              <span>{project.action.label}</span>
              <ArrowUpRight className="w-4 h-4 ml-1.5" />
            </Link>
          ) : null}

          {project.secondaryAction && project.secondaryAction.kind === "link" && (
            <Link
              href={project.secondaryAction.href}
              className="btn ghost font-semibold text-sm"
            >
              <span>{project.secondaryAction.label}</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          )}

          <Link href="/contact#form" className="btn ghost font-semibold text-sm">
            <span>Discuss this project</span>
          </Link>
        </div>

        {/* Showcase Visual Element */}
        <div className="mt-12 sm:mt-16">
          <div className="mb-3 flex items-center justify-between text-xs font-mono text-[var(--mute)]">
            <span className="uppercase font-bold tracking-wider">
              Interactive Product Preview
            </span>
            <span>Tap tabs to test interface</span>
          </div>
          <ProjectVisualPreview project={project} />
        </div>

        {/* Problem vs Built Breakdown */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mt-14 sm:mt-20">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[rgba(21,19,74,0.12)] shadow-sm">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--or)]">
              The Problem
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--deep)] mt-1.5 mb-3 tracking-tight">
              Why this needed to be built.
            </h2>
            <p className="text-sm sm:text-base text-[var(--mute)] leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[rgba(21,19,74,0.12)] shadow-sm">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#16875b]">
              The Architecture
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--deep)] mt-1.5 mb-3 tracking-tight">
              How we engineered the solution.
            </h2>
            <p className="text-sm sm:text-base text-[var(--mute)] leading-relaxed">
              {project.built}
            </p>
          </div>
        </div>

        {/* Key Features Grid */}
        <div className="mt-16 sm:mt-24">
          <span className="k">Core Capabilities</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--deep)] tracking-tight mt-1 mb-8">
            Engineered features that matter.
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {project.features.map((feat, i) => (
              <div
                key={feat.title}
                className="p-5 sm:p-6 rounded-xl bg-white border border-[rgba(21,19,74,0.1)] shadow-sm hover:border-[var(--pur)]/40 transition-colors"
              >
                <div
                  className="w-8 h-8 rounded-lg grid place-items-center font-mono font-bold text-xs mb-3 text-white"
                  style={{ background: project.accent }}
                >
                  0{i + 1}
                </div>
                <h3 className="text-base font-bold text-[var(--deep)] leading-snug">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed mt-2">
                  {feat.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-Step User Journey */}
        <div className="mt-16 sm:mt-24">
          <span className="k">Experience Flow</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--deep)] tracking-tight mt-1 mb-6">
            From first launch to daily habit.
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.steps.map((step, idx) => (
              <div
                key={step}
                className="p-5 rounded-xl bg-white border border-[var(--peri)]/60 shadow-sm"
              >
                <span
                  className="font-mono font-bold text-base block mb-4"
                  style={{ color: project.accent }}
                >
                  Step 0{idx + 1}
                </span>
                <p className="text-sm font-bold text-[var(--deep)] leading-snug">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack (if listed) */}
        {project.stack && project.stack.length > 0 && (
          <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-[var(--paper)] border border-[var(--peri)]">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--pur)] block mb-3">
              Technologies &amp; Architecture
            </span>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[rgba(21,19,74,0.1)] text-xs font-mono font-semibold text-[var(--deep)] shadow-xs"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Waitlist Section (if applicable) */}
        {project.action.kind === "waitlist" && (
          <div id="waitlist" className="mt-16 sm:mt-24 scroll-mt-28">
            <ProjectWaitlistForm
              projectName={project.name}
              category={project.category}
              accent={project.accent}
            />
          </div>
        )}

        {/* Next Project Teaser */}
        <div className="mt-20 pt-8 border-t border-[var(--mist)] flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase text-[var(--mute)]">Next Project</span>
            <div className="text-lg font-bold text-[var(--deep)] mt-0.5">
              {nextProject.name}
            </div>
          </div>
          <Link
            href={`/projects/${nextProject.slug}`}
            className="btn sm inline-flex items-center gap-2"
          >
            <span>View next project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

