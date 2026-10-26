"use client";

import * as React from "react";

const items = [
  "AI voice receptionist",
  "Custom CRM",
  "Workflow automation",
  "Websites",
  "Mobile apps",
  "Integrations",
  "Dashboards",
  "Ongoing care",
];

export function Marquee() {
  const repeated = [...items, ...items, ...items];

  return (
    <div className="marq" aria-hidden="true">
      <div>
        {repeated.map((item, idx) => (
          <span key={idx}>{item}</span>
        ))}
      </div>
    </div>
  );
}
