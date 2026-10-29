"use client";

import type * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTabs } from "./useTabs";

export type WalkStep = {
  label: string;
  title: string;
  body: string;
  youGet: string;
  picture: React.ReactNode;
};

/** The example project, one build step at a time, with Back and Next. */
export function BuildWalkthrough({ steps }: { steps: WalkStep[] }) {
  const { active, setActive, tab, panel } = useTabs(
    "step",
    steps.map((step) => step.label.toLowerCase()),
  );
  const next = steps[active + 1];

  return (
    <>
      <div className="wd-steps" role="tablist" aria-label="How the project is built">
        {steps.map((step, i) => (
          <button key={step.label} type="button" className={`wd-step${i < active ? " done" : ""}`} {...tab(i)}>
            <span className="wd-step-n">{String(i + 1).padStart(2, "0")}</span>
            <span className="wd-step-l">{step.label}</span>
          </button>
        ))}
      </div>
      <div className="wd-progress" aria-hidden="true">
        <i style={{ width: `${((active + 1) / steps.length) * 100}%` }} />
      </div>

      {steps.map((step, i) => (
        <div key={step.label} className="wd-panel wd-surface" {...panel(i)}>
          <div>
            <p className="wd-step-of">
              Step {i + 1} of {steps.length} · {step.label}
            </p>
            <h3>{step.title}</h3>
            <p className="wd-body">{step.body}</p>
            <p className="wd-get">
              <span>What you get</span>
              {step.youGet}
            </p>
          </div>
          {step.picture}
        </div>
      ))}

      <div className="wd-stepnav">
        <button type="button" className="btn sm ghost" onClick={() => setActive(active - 1)} disabled={active === 0}>
          <ArrowLeft aria-hidden="true" />
          Back
        </button>
        {next ? (
          <button type="button" className="btn sm" onClick={() => setActive(active + 1)}>
            Next: {next.label}
            <ArrowRight aria-hidden="true" />
          </button>
        ) : (
          <Link href="/contact#form" className="btn sm">
            Start your own project
            <ArrowRight aria-hidden="true" />
          </Link>
        )}
      </div>
    </>
  );
}
