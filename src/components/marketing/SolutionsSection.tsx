"use client";

import * as React from "react";
import { LogoMark } from "@/components/ui/Logo";

interface SolutionItem {
  title: string;
  desc: string;
  tags: [string, string, string];
  color: string;
}

const solutions: SolutionItem[] = [
  {
    title: "Clinics & dental",
    desc: "After-hours booking, reminders that cut no-shows, and automatic patient follow-ups.",
    tags: ["Voice booking", "Patient CRM", "Reminders"],
    color: "#8478e0",
  },
  {
    title: "Home services",
    desc: "Answer every emergency call, capture the job details and follow up on every quote.",
    tags: ["Call capture", "Job tracking", "Quote follow-up"],
    color: "#fd9150",
  },
  {
    title: "Legal & professional",
    desc: "Screen and log intake calls, book consultations and give clients a secure portal.",
    tags: ["Intake calls", "Client portal", "Consult booking"],
    color: "#5750a8",
  },
  {
    title: "Salons & wellness",
    desc: "24/7 booking, rebooking nudges and review requests after every visit.",
    tags: ["Online booking", "Client history", "Rebooking"],
    color: "#ef7a5e",
  },
  {
    title: "Real estate",
    desc: "Capture leads from every channel, schedule viewings and nurture buyers automatically.",
    tags: ["Lead capture", "Viewings", "Nurture"],
    color: "#3aa8d8",
  },
  {
    title: "Startups & agencies",
    desc: "Internal tools, dashboards, MVPs and integrations built to scale with you.",
    tags: ["Custom apps", "Dashboards", "APIs"],
    color: "#2fb67c",
  },
];

const rowLabels = ["Front door", "The record", "Follow-through"];

export function SolutionsSection() {
  const [activeIdx, setActiveIdx] = React.useState(0);

  return (
    <section id="solutions" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <span className="k">Solutions</span>
        <h2>Built for businesses that run on people and phones.</h2>
        <p className="lead2">
          Pick an industry to see the kind of system we set up. Don’t see yours? The pattern is the same.
        </p>

        <div className="sol" id="sol">
          {solutions.map((item, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div
                key={item.title}
                className={`so ${isActive ? "on" : ""}`}
                style={{ "--ac": item.color } as React.CSSProperties}
                tabIndex={0}
                role="button"
                aria-expanded={isActive}
                onClick={() => setActiveIdx(idx)}
                onMouseEnter={() => {
                  if (typeof window !== "undefined" && window.matchMedia("(hover:hover)").matches) {
                    setActiveIdx(idx);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setActiveIdx(idx);
                  }
                }}
              >
                <h3>{item.title}</h3>
                <span className="ix">0{idx + 1}</span>

                <div className="in2">
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                    <div className="sr">
                      {item.tags.map((tag, tIdx) => (
                        <div key={tIdx}>
                          <b>{rowLabels[tIdx]}</b>
                          <span>{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Architecture Diagram */}
                  <svg className="dg" viewBox="0 0 300 250" aria-hidden="true">
                    <path d="M150 100C120 90 90 85 80 66M150 100C180 90 210 85 220 66M150 152V190" />
                    <rect x="24" y="36" width="112" height="30" />
                    <text x="80" y="55" textAnchor="middle">
                      {item.tags[0]}
                    </text>

                    <rect x="164" y="36" width="112" height="30" />
                    <text x="220" y="55" textAnchor="middle">
                      {item.tags[1]}
                    </text>

                    <rect x="94" y="190" width="112" height="30" />
                    <text x="150" y="209" textAnchor="middle">
                      {item.tags[2]}
                    </text>

                    <circle
                      cx="150"
                      cy="126"
                      r="28"
                      style={{
                        fill: "var(--deep)",
                        stroke: "var(--ac)",
                        strokeWidth: 1.6,
                        strokeDasharray: "none",
                        animation: "none",
                      }}
                    />
                    <circle className="pl" cx="150" cy="126" r="28" />
                    <g transform="translate(136, 110) scale(0.1)">
                      <LogoMark />
                    </g>
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
