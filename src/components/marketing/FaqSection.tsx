"use client";

import * as React from "react";

const faqs = [
  {
    q: "What exactly does Deptloy build?",
    a: "Custom software products such as business platforms, client portals, SaaS applications, data systems and AI-enabled workflows. We choose the capabilities around the problem, not from a fixed service bundle.",
  },
  {
    q: "Do I need to know which technology to use?",
    a: "No. Tell us what you are trying to achieve, who will use it and what is getting in the way. We will help define an appropriate technical approach and scope.",
  },
  {
    q: "What happens after launch?",
    a: "We can stay involved with maintenance, monitoring, improvements and new capabilities, with support arrangements tailored to the project.",
  },
  {
    q: "How do we get started?",
    a: "Send us a short description of your idea or business challenge. We will discuss the users, workflows, priorities and possible first version.",
  },
];

export function FaqSection() {
  const [openIdx, setOpenIdx] = React.useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <span className="k">FAQ</span>
        <h2>Good things to ask us.</h2>

        <div className="faq" id="faqs">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={faq.q} className={`q ${isOpen ? "on" : ""}`}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggle(idx)}
                >
                  {faq.q}
                  <span>{isOpen ? "×" : "+"}</span>
                </button>
                <div>
                  <p>{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
