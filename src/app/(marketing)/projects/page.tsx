"use client";

import * as React from "react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FinalCta } from "@/components/marketing/FinalCta";
import { projects } from "@/lib/site";

export default function ProjectsPage() {
  const [filter, setFilter] = React.useState<string>("all");

  const filterOptions = [
    { id: "all", label: "All Projects" },
    { id: "healthcare", label: "Healthcare" },
    { id: "beauty", label: "Beauty & Wellness" },
    { id: "real-estate", label: "Real Estate" },
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((cs) => cs.category === filter);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden">
        <div className="glow-brand" />
        <div className="glow-accent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            <Badge variant="violet" dot className="mb-4">
              Our Work & Projects
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Featured Client Projects
            </h1>

            <p className="text-lg text-fg-soft leading-relaxed mb-6">
              Review how our autonomous AI receptionists, workflow pipelines, and custom software eliminate manual busywork and maximize appointment bookings.
            </p>

            {/* Project Notice Banner */}
            <div className="inline-flex items-center gap-2 p-3 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-200 text-xs mb-8 max-w-xl text-left">
              <Info className="h-4 w-4 shrink-0 text-brand-400" />
              <span>
                <strong>Project blueprints:</strong> Client scenarios and performance statistics demonstrate our architecture capabilities across multiple sectors.
              </span>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2">
              {filterOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setFilter(opt.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    filter === opt.id
                      ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30"
                      : "bg-raised text-fg-muted hover:text-white border border-line"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Listing */}
      <section className="py-16 bg-surface border-t border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {filteredProjects.map((cs) => (
              <div
                key={cs.id}
                className="rounded-3xl bg-card border border-line p-8 sm:p-12 shadow-xl hover:border-brand-500/30 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Details */}
                  <div className="lg:col-span-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-500/15 text-brand-300 border border-brand-500/30">
                          {cs.industry}
                        </span>
                        <span className="text-xs font-mono text-fg-subtle">
                          Client: {cs.clientPlaceholder}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                        {cs.title}
                      </h2>

                      {/* Challenge */}
                      <div className="mb-6">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2">
                          The Problem We Solved
                        </h4>
                        <p className="text-sm text-fg-soft leading-relaxed bg-raised p-4 rounded-2xl border border-line">
                          {cs.challenge}
                        </p>
                      </div>

                      {/* Solution */}
                      <div className="mb-6">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-brand-400 mb-2">
                          The Implemented Solution
                        </h4>
                        <p className="text-sm text-fg-soft leading-relaxed bg-raised p-4 rounded-2xl border border-line">
                          {cs.solution}
                        </p>
                      </div>

                      {/* Outcome */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                          Measured Impact
                        </h4>
                        <p className="text-sm text-fg-soft leading-relaxed">
                          {cs.outcome}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Performance Metrics Card */}
                  <div className="lg:col-span-4 flex flex-col gap-4">
                    <div className="rounded-2xl bg-card border border-line p-6 shadow-lg">
                      <span className="text-xs font-bold uppercase tracking-wider text-fg-muted block mb-4">
                        Measured Results
                      </span>

                      <div className="space-y-4">
                        {cs.metrics.map((metric, idx) => (
                          <div key={idx} className="p-3.5 rounded-xl bg-raised border border-line flex items-center justify-between">
                            <span className="text-xs text-fg-muted">{metric.label}</span>
                            <span className="text-lg font-bold text-white font-mono text-brand-300">
                              {metric.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 pt-4 border-t border-line flex items-center justify-between text-xs text-fg-subtle">
                        <span>Solution Architecture</span>
                        <span className="text-fg-soft font-medium">Enterprise Custom</span>
                      </div>
                    </div>

                    <Button href="/contact" variant="outline" size="sm" className="w-full">
                      Discuss This Project
                    </Button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <FinalCta />
    </div>
  );
}
