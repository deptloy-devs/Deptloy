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
  // 4 sets (2 identical halves of 2 sets each) guarantees a seamless -50% loop on any screen width
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="marq" role="region" aria-label="Capabilities and services">
      <div className="marq-track" aria-hidden="true">
        {repeated.map((item, idx) => (
          <span key={idx}>{item}</span>
        ))}
      </div>
    </div>
  );
}
