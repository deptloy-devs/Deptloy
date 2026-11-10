"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { ProjectVisualPreview } from "./ProjectVisuals";

export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const isDevelopment = project.status === "in-development";
  const isLive = project.status === "live";

  return (
    <article
      className={`group relative rounded-2xl bg-white border border-[rgba(21,19,74,0.12)] p-6 sm:p-8 shadow-[0_12px_36px_rgba(87,80,168,0.06)] hover:shadow-[0_20px_50px_rgba(87,80,168,0.12)] hover:border-[var(--pur)]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
        featured ? "lg:col-span-2 bg-gradient-to-br from-white via-white to-[var(--paper)]" : ""
      }`}
    >
      {/* Top subtle highlight band */}
      <div
        className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-1.5"
        style={{ background: project.accent }}
      />

      <div>
        {/* Header Meta: Status, Category, Year */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3.5">
          <div className="flex items-center gap-2">
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
                  isDevelopment
                    ? "bg-[#16875b] animate-pulse"
                    : "bg-emerald-500"
                }`}
              />
              {project.status === "in-development" ? "In Development • Launching Soon" : "Live Product"}
            </span>

            <span className="text-xs font-mono font-semibold text-[var(--mute)]">
              {project.category}
            </span>
          </div>

          <span className="text-xs font-mono text-[var(--mute)]">
            {project.year} • {project.platform}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--deep)] tracking-tight group-hover:text-[var(--pur)] transition-colors leading-snug">
          <Link href={`/projects/${project.slug}`} className="focus:outline-none">
            {project.name}
          </Link>
        </h3>

        {/* Tagline */}
        <p className="mt-2 text-sm sm:text-base text-[var(--mute)] leading-relaxed max-w-3xl">
          {project.tagline}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 my-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-[var(--paper)] text-[var(--deep)] border border-[var(--peri)]/60"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Visual Preview */}
        <div className="my-5">
          <ProjectVisualPreview project={project} />
        </div>
      </div>

      {/* Footer CTA & Link */}
      <div className="pt-4 border-t border-[var(--mist)] flex flex-wrap items-center justify-between gap-3 mt-4">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--deep)] hover:text-[var(--or)] transition-colors font-mono"
        >
          <span>Explore project details</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>

        {project.action.kind === "waitlist" ? (
          <Link
            href={`/projects/${project.slug}#waitlist`}
            className="btn sm"
            style={{ background: project.accent, color: "#fff" }}
          >
            <span>{project.action.label}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        ) : project.action.kind === "link" ? (
          <Link
            href={project.action.href}
            className="btn sm ghost"
          >
            <span>{project.action.label}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <Link
            href={`/projects/${project.slug}`}
            className="btn sm ghost"
          >
            <span>{project.action.label}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </article>
  );
}

