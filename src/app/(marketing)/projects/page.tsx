"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ArchitectureStage } from "@/components/marketing/ArchitectureStage";
import { projectBlueprints } from "@/lib/project-blueprints";

const categories = [
  { id: "all", label: "All blueprints" },
  { id: "healthcare", label: "Healthcare" },
  { id: "operations", label: "Operations" },
  { id: "commerce", label: "Commerce" },
  { id: "professional", label: "Professional services" },
];

export default function ProjectsPage() {
  const [filter, setFilter] = React.useState("all");
  const visible = filter === "all" ? projectBlueprints : projectBlueprints.filter((p) => p.category === filter);

  return (
    <div className="py-24 sm:py-32">
      <div className="wrap">
        <span className="k">Solution blueprints</span>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <h1 className="lg:col-span-8 text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--deep)] leading-tight">
            Not another app. The system your business actually needs.
          </h1>
          <p className="lg:col-span-4 text-base text-[var(--mute)] leading-relaxed">
            Explore the kinds of connected products we can engineer, from operational platforms to digital customer experiences.
          </p>
        </div>
        <div className="mt-8 p-4 bg-white/80 border-l-4 border-[var(--or)] text-sm text-[var(--mute)] max-w-4xl">
          These are <strong className="text-[var(--deep)]">illustrative engineering concepts</strong>, not completed client projects or measured results. Each shows how a custom solution could be structured.
        </div>

        <div className="mt-10 mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter solution blueprints">
          {categories.map((category) => (
            <button key={category.id} type="button" aria-pressed={filter === category.id} onClick={() => setFilter(category.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wide cursor-pointer border transition-colors ${
                filter === category.id ? "bg-[var(--deep)] text-white border-[var(--deep)]" : "bg-white text-[var(--mute)] border-[var(--peri)] hover:border-[var(--pur)]"
              }`}>
              {category.label}
            </button>
          ))}
        </div>

        <div className="space-y-12">
          {visible.map((project) => (
            <article key={project.slug} className="blueprint-card bg-white border border-[rgba(21,19,74,.13)] shadow-[0_15px_40px_rgba(87,80,168,.07)] p-5 sm:p-8 lg:p-10"
              style={{ borderTop: `5px solid ${project.accent}` }}>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--peri)] pb-5 mb-7">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--pur)] font-bold">{project.categoryLabel}</span>
                <span className="font-mono text-[11px] font-bold text-[var(--mute)] uppercase">Custom product architecture</span>
              </div>
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                <div className="lg:col-span-5 flex flex-col gap-5">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[var(--pur)]">{project.kicker}</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--deep)] leading-tight mt-3">{project.title}</h2>
                  </div>
                  <div>
                    <h3 className="text-xs font-mono uppercase font-bold tracking-wider text-[var(--pur)] mb-2">The challenge</h3>
                    <p className="text-sm text-[var(--mute)] leading-relaxed">{project.challenge}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-mono uppercase font-bold tracking-wider text-[var(--pur)] mb-2">The product approach</h3>
                    <p className="text-sm text-[var(--deep)] leading-relaxed">{project.solution}</p>
                  </div>
                  <Link href={`/projects/${project.slug}`} className="btn self-start">Explore blueprint <ArrowUpRight size={16} /></Link>
                </div>
                <div className="lg:col-span-7">
                  <ArchitectureStage modules={project.modules} title="One operating system" accent={project.accent} eyebrow={project.categoryLabel.toUpperCase()} />
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-20 bg-[var(--deep)] text-white p-8 sm:p-12">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--peri)]">Your business is the blueprint</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold mt-4 max-w-3xl">Have a product idea that doesn’t fit a template?</h2>
          <p className="max-w-2xl text-[#d2cdf3] mt-4 mb-8">That is where our work starts. Tell us what you need your software to do, and we will explore how to build it.</p>
          <Link href="/contact" className="btn" style={{ background: "var(--or)", color: "var(--deep)" }}>
            Discuss your idea <ArrowRight size={16} />
          </Link>
        </section>
      </div>
    </div>
  );
}
