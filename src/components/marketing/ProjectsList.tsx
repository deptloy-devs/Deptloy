"use client";

import * as React from "react";
import { ProjectDetail } from "./ProjectCard";
import { projects } from "@/lib/site";
import { cn } from "@/lib/cn";

const filterOptions = [
  { id: "all", label: "All Projects" },
  { id: "healthcare", label: "Healthcare" },
  { id: "beauty", label: "Beauty & Wellness" },
  { id: "real-estate", label: "Real Estate" },
] as const;

type FilterId = (typeof filterOptions)[number]["id"];

/** Filterable list of full case studies. Filter buttons expose state with aria-pressed. */
export function ProjectsList() {
  const [filter, setFilter] = React.useState<FilterId>("all");
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <div role="group" aria-label="Filter projects by industry" className="mb-10 flex flex-wrap justify-center gap-2">
        {filterOptions.map((opt) => {
          const active = filter === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(opt.id)}
              className={cn(
                "h-10 cursor-pointer rounded-full border px-4 text-sm font-medium transition-colors duration-150",
                active
                  ? "border-brand-400/50 bg-brand-500/15 text-fg"
                  : "border-line bg-raised text-fg-muted hover:border-line-strong hover:text-fg"
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>

      <div className="flex flex-col gap-8">
        {visible.map((p) => (
          <ProjectDetail key={p.id} project={p} />
        ))}
      </div>
    </>
  );
}
