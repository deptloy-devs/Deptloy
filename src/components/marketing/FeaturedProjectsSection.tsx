"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Cpu } from "lucide-react";
import { projectBlueprints } from "@/lib/project-blueprints";

export function FeaturedProjectsSection() {
  // 2 representative solution blueprints
  const previews = projectBlueprints.slice(0, 2);

  return (
    <section id="featured-projects" className="py-14 sm:py-20 bg-[var(--mist)]/40" style={{ borderTop: "1px solid var(--peri)" }}>
      <div className="wrap">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <span className="k">Connected Systems in Action</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--deep)] tracking-tight mt-1 leading-tight">
              Featured solution blueprints.
            </h2>
            <p className="lead2 mt-2 text-sm sm:text-base">
              Instead of disconnected off-the-shelf tools, we engineer connected systems where web applications, databases, dispatch workflows, and AI assistants operate in unison.
            </p>
          </div>

          <Link href="/projects" className="btn ghost shrink-0 inline-flex items-center gap-2">
            <span>View all 4 blueprints</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Blueprint Disclaimer Banner */}
        <div className="mb-8 p-3 bg-white border-l-4 border-[var(--or)] text-xs text-[var(--mute)] shadow-sm">
          <strong>Illustrative Engineering Previews:</strong> These blueprints showcase conceptual architectures for multi-application environments. Full diagrams and deep dives are available on the Projects page.
        </div>

        {/* 2 Compact Previews in a Balanced Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {previews.map((project) => (
            <article
              key={project.slug}
              className="bg-white border border-[rgba(21,19,74,0.13)] p-6 sm:p-7 shadow-[0_12px_32px_rgba(87,80,168,0.07)] flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_45px_rgba(87,80,168,0.12)] group"
              style={{
                borderTop: `4px solid ${project.accent}`,
                clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)",
              }}
            >
              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between gap-2 border-b border-[var(--mist)] pb-3 mb-4">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--pur)]">
                    {project.categoryLabel}
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-[var(--mute)] bg-[var(--paper)] px-2 py-0.5 border border-[var(--peri)]">
                    {project.slug === "care-network" ? "Healthcare Platform" : "Field Operations"}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--deep)] leading-snug group-hover:text-[var(--or)] transition-colors">
                  {project.title}
                </h3>

                {/* Challenge & Solution Summary */}
                <div className="mt-4 space-y-3">
                  <div>
                    <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--pur)] mb-1">
                      The Operational Challenge
                    </h4>
                    <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--pur)] mb-1">
                      The Custom Solution
                    </h4>
                    <p className="text-xs sm:text-sm text-[var(--deep)] font-medium leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* Compact Visual Preview Widget */}
                <div className="mt-5 p-4 bg-[var(--deep)] text-white rounded-sm">
                  <div className="flex items-center justify-between mb-3 text-[11px] font-mono text-[var(--peri)]">
                    <span className="flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-[var(--or)]" />
                      Interconnected Suite
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Synced State
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {project.modules.map((m, idx) => (
                      <div
                        key={m.name}
                        className="bg-white/5 border border-white/10 p-2 text-left rounded-sm"
                      >
                        <span className="font-mono text-[10px] text-[var(--or)] font-bold block">
                          0{idx + 1}
                        </span>
                        <span className="text-xs font-bold text-white block truncate">
                          {m.name}
                        </span>
                        <span className="text-[10px] text-[#cfd2ee] block truncate mt-0.5">
                          {m.detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="pt-5 mt-5 border-t border-[var(--mist)] flex items-center justify-between">
                <span className="text-xs font-mono text-[var(--mute)]">
                  Architecture &amp; Data Flow
                </span>
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[var(--deep)] hover:text-[var(--or)] transition-colors"
                >
                  <span>Explore Blueprint</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
