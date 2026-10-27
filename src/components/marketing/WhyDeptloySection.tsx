"use client";

import * as React from "react";

export function WhyDeptloySection() {
  return (
    <section className="dark" id="why">
      <div className="wrap">
        <span className="k">Why Deptloy</span>
        <h2>Generic tools make you adapt. Custom software adapts to you.</h2>
        <p className="lead2">
          Your processes, people and customers should shape the software. We connect the pieces deliberately and keep room for the system to grow.
        </p>

        <div className="cmp">
          {/* Column A: Generic stack */}
          <div className="col a">
            <h3>A patchwork of generic tools</h3>
            <div>
              <b>×</b>
              <span>Features shaped by a generic workflow</span>
            </div>
            <div>
              <b>×</b>
              <span>Teams copy information between disconnected apps</span>
            </div>
            <div>
              <b>×</b>
              <span>Integrations become difficult to maintain</span>
            </div>
            <div>
              <b>×</b>
              <span>New requirements mean more workarounds</span>
            </div>
          </div>

          {/* Column B: Deptloy */}
          <div className="col b">
            <h3>Deptloy</h3>
            <div>
              <b>✓</b>
              <span>A connected system built around how you work</span>
            </div>
            <div>
              <b>✓</b>
              <span>Interfaces and data designed for your actual users</span>
            </div>
            <div>
              <b>✓</b>
              <span>Designed to adapt as your tools and team grow</span>
            </div>
            <div>
              <b>✓</b>
              <span>Monitored, improved and extended after launch</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
