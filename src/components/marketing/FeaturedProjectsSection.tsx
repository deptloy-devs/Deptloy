"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projectBlueprints } from "@/lib/project-blueprints";

export function FeaturedProjectsSection() {
  // Select two strong blueprints from projectBlueprints
  const featured = projectBlueprints.slice(0, 2);

  return (
    <section id="featured-projects" className="py-20 sm:py-28 bg-[var(--mist)]/40" style={{ borderTop: "1px solid var(--peri)" }}>
      <div className="wrap">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="k">Connected Systems in Action</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--deep)] tracking-tight mt-2 leading-tight">
              Featured solution blueprints.
            </h2>
            <p className="lead2 mt-2">
              Instead of disconnected SaaS tools, we architect unified platforms where voice AI, databases, dispatch workflows, and client portals communicate in real time.
            </p>
          </div>

          <Link href="/projects" className="btn ghost shrink-0 inline-flex items-center gap-2">
            <span>View all solution blueprints</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Blueprint Disclaimer Banner */}
        <div className="mb-10 p-3.5 bg-white border-l-4 border-[var(--or)] text-xs text-[var(--mute)] shadow-sm">
          <strong>Illustrative Solution Blueprints:</strong> The following systems represent conceptual engineering architectures showing how our capabilities connect to solve complex industry workflows.
        </div>

        <div className="space-y-10">
          {featured.map((project) => (
            <div
              key={project.slug}
              className="bg-white border border-[rgba(21,19,74,0.13)] p-6 sm:p-10 shadow-[0_16px_40px_rgba(87,80,168,0.07)] transition-all duration-300 hover:shadow-[0_24px_55px_rgba(87,80,168,0.12)]"
              style={{
                borderTop: `5px solid ${project.accent}`,
                clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)",
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--mist)] pb-4 mb-6">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--pur)]">
                  {project.categoryLabel}
                </span>
                <span className="font-mono text-[11px] font-semibold text-[var(--mute)] bg-[var(--paper)] px-2.5 py-0.5 border border-[var(--peri)]">
                  Architectural Blueprint
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-5">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[var(--mute)]">
                      {project.kicker}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--deep)] leading-tight mt-1">
                      {project.title}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--pur)] mb-1">
                        The Operational Bottleneck
                      </h4>
                      <p className="text-sm text-[var(--mute)] leading-relaxed">
                        {project.challenge}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--pur)] mb-1">
                        The Engineered Solution
                      </h4>
                      <p className="text-sm text-[var(--deep)] font-medium leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="btn sm inline-flex items-center gap-1.5"
                      style={{ background: "var(--deep)", color: "#fff" }}
                    >
                      <span>Explore blueprint details</span>
                      <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </div>

                {/* Modules visual column */}
                <div className="lg:col-span-5 bg-[var(--deep)] text-white p-6 sm:p-7 space-y-4 rounded-sm shadow-md">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs font-mono text-[var(--peri)] uppercase tracking-wider">
                      Interconnected Modules
                    </span>
                    <span className="text-[10px] font-mono text-[var(--or)] font-bold">
                      Zero Manual Sync
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {project.modules.map((mod, idx) => (
                      <div
                        key={mod.name}
                        className="p-3 bg-white/5 border border-white/10 hover:border-[var(--or)] transition-colors rounded-sm flex items-start gap-3"
                      >
                        <span className="text-xs font-mono font-bold text-[var(--or)] mt-0.5">
                          0{idx + 1}
                        </span>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                            {mod.name}
                          </h4>
                          <p className="text-[11px] text-[#cfd2ee] mt-0.5 leading-snug">
                            {mod.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#cfd2ee]">
                    <span>Single PostgreSQL Core</span>
                    <span className="text-[var(--or)]">100% Data Sovereignty</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
