"use client";

import * as React from "react";

const faqs = [
  {
    q: "What exactly does Deptloy build?",
    a: "AI receptionists, custom CRMs, workflow automation, and websites and mobile apps, designed together as one connected system for your business.",
  },
  {
    q: "Do I need every part?",
    a: "No. Many clients start with one, often the receptionist or the CRM. Because we design for the whole system from the start, adding the rest later is straightforward.",
  },
  {
    q: "What happens after launch?",
    a: "We stay involved. We monitor the system, fix issues, and improve and extend it as your business changes, so it doesn’t go stale.",
  },
  {
    q: "How do we get started?",
    a: "Book a call or send us a message. We’ll ask how your business runs, then outline what a connected system could look like and what to build first.",
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
