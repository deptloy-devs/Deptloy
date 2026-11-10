"use client";

import * as React from "react";
import type { Project, ProjectStatus } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = React.useState<"all" | ProjectStatus>("all");

  const filtered = React.useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.status === filter);
  }, [projects, filter]);

  return (
    <div className="space-y-8">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--mist)] pb-4">
        <div className="flex flex-wrap gap-2">
          {[
            { id: "all", label: "All Projects", count: projects.length },
            {
              id: "in-development",
              label: "In Development",
              count: projects.filter((p) => p.status === "in-development").length,
            },
            {
              id: "live",
              label: "Live & Deployed",
              count: projects.filter((p) => p.status === "live").length,
            },
          ].map((tab) => {
            const isCur = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id as typeof filter)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isCur
                    ? "bg-[var(--deep)] text-white shadow-sm"
                    : "bg-white text-[var(--mute)] hover:text-[var(--deep)] border border-[rgba(21,19,74,0.12)]"
                }`}
              >
                <span>{tab.label}</span>
                <span className="ml-1.5 opacity-60">({tab.count})</span>
              </button>
            );
          })}
        </div>

        <span className="text-xs font-mono text-[var(--mute)] hidden sm:inline-block">
          Click any card to read full specs &amp; sign up
        </span>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filtered.map((project, idx) => (
          <ProjectCard
            key={project.slug}
            project={project}
            featured={filter === "all" && idx === 0}
          />
        ))}
      </div>
    </div>
  );
}

