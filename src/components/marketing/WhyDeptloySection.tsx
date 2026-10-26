"use client";

import * as React from "react";

export function WhyDeptloySection() {
  return (
    <section className="dark" id="why">
      <div className="wrap">
        <span className="k">Why Deptloy</span>
        <h2>Most AI providers sell you a tool. We build what it plugs into.</h2>
        <p className="lead2">
          A bolted-on chatbot solves one problem and creates three more. We design the whole system first, so every piece fits and nothing is thrown away when your business changes.
        </p>

        <div className="cmp">
          {/* Column A: Usual AI provider */}
          <div className="col a">
            <h3>The usual AI provider</h3>
            <div>
              <b>×</b>
              <span>One tool configured from a template</span>
            </div>
            <div>
              <b>×</b>
              <span>Calls, leads and follow-ups live in separate places</span>
            </div>
            <div>
              <b>×</b>
              <span>Breaks when a tool or price changes</span>
            </div>
            <div>
              <b>×</b>
              <span>Handed over at launch, then you’re on your own</span>
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
              <span>Every call becomes a CRM record and an automatic follow-up</span>
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
