"use client";

import * as React from "react";
import { ArrowUpRight, Box } from "lucide-react";
import type { ArchitectureModule } from "@/lib/project-blueprints";

interface ArchitectureStageProps {
  modules: ArchitectureModule[];
  title?: string;
  eyebrow?: string;
  accent?: string;
}

export function ArchitectureStage({
  modules,
  title = "Your connected product",
  eyebrow = "SYSTEM BLUEPRINT",
  accent = "#8478e0",
}: ArchitectureStageProps) {
  const [active, setActive] = React.useState(0);
  const visible = modules.slice(0, 4);

  return (
    <div className="architecture-stage" style={{ "--stage-accent": accent } as React.CSSProperties}>
      <div className="architecture-stage-top">
        <span>{eyebrow}</span>
        <span className="architecture-live"><i />CONNECTED BY DESIGN</span>
      </div>
      <div className="architecture-canvas">
        <svg className="architecture-paths" viewBox="0 0 1000 430" preserveAspectRatio="none" aria-hidden="true">
          <path d="M240 105 C365 105 360 210 500 210" />
          <path d="M760 105 C635 105 640 210 500 210" />
          <path d="M240 325 C365 325 360 210 500 210" />
          <path d="M760 325 C635 325 640 210 500 210" />
        </svg>
        {visible.map((module, index) => (
          <button
            key={module.name}
            type="button"
            className={`architecture-node architecture-node-${index} ${active === index ? "is-active" : ""}`}
            onClick={() => setActive(index)}
            aria-pressed={active === index}
          >
            <span className="architecture-node-index">0{index + 1}</span>
            <span className="architecture-node-name">{module.name}</span>
            <ArrowUpRight aria-hidden="true" size={16} />
          </button>
        ))}
        <div className="architecture-core">
          <div className="architecture-core-mark"><Box size={28} strokeWidth={1.7} aria-hidden="true" /></div>
          <strong>{title}</strong>
          <span>Designed around your workflow</span>
        </div>
      </div>
      <div className="architecture-stage-bottom" aria-live="polite">
        <div>
          <span>SELECTED CAPABILITY</span>
          <strong>{visible[active]?.name}</strong>
        </div>
        <p>{visible[active]?.detail}</p>
      </div>
    </div>
  );
}
