import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { ProjectsGrid } from "@/components/marketing/projects/ProjectsGrid";

export default function ProjectsPage() {
  return (
    <div className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-24">
      <div className="wrap">
        {/* Page Header */}
        <div className="max-w-4xl mb-12 sm:mb-16">
          <span className="k">Studio Projects &amp; Products</span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--deep)] tracking-tight leading-[1.05]">
            What we build, ship, and stand behind.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[var(--mute)] leading-relaxed max-w-2xl">
            A focused collection of applications, voice agents, and digital products we have
            engineered and are actively bringing to market. Click any project to inspect its
            architecture or join the early access list.
          </p>
        </div>

        {/* Interactive Projects Grid */}
        <ProjectsGrid projects={projects} />

        {/* Bottom Callout / Discussion Section */}
        <div className="mt-20 sm:mt-28 p-8 sm:p-12 rounded-2xl bg-white border border-[rgba(21,19,74,0.12)] shadow-[0_16px_40px_rgba(87,80,168,0.06)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--pur)]">
              Build With Deptloy
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--deep)] tracking-tight mt-1">
              Have an app, system, or custom platform in mind?
            </h2>
            <p className="text-sm sm:text-base text-[var(--mute)] mt-2 leading-relaxed">
              We design and engineer bespoke software from clean architecture to production deployment.
              Let&apos;s map your idea and see what it takes to build.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link href="/contact#form" className="btn w-full sm:w-auto justify-center font-bold">
              <span>Discuss your project</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
            <Link href="/solutions" className="btn ghost w-full sm:w-auto justify-center">
              <span>Explore solutions</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

