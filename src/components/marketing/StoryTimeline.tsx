"use client";

import * as React from "react";

interface StoryStep {
  time: string;
  service: string;
  color: string;
  title: string;
  desc: string;
}

const storySteps: StoryStep[] = [
  {
    time: "9:42 pm",
    service: "AI receptionist",
    color: "#8478e0",
    title: "A customer calls after hours",
    desc: "Nobody is in the office. The call would normally go to voicemail and the job to a competitor.",
  },
  {
    time: "9:42 pm",
    service: "AI receptionist",
    color: "#8478e0",
    title: "The receptionist picks up",
    desc: "It understands the request, answers questions from your business knowledge and books Thursday at 2:30.",
  },
  {
    time: "9:43 pm",
    service: "CRM",
    color: "#5750a8",
    title: "A full record is created",
    desc: "Contact, call transcript, booking and lead source are saved. Nobody types anything.",
  },
  {
    time: "9:43 pm",
    service: "Automation",
    color: "#fd9150",
    title: "Confirmations go out",
    desc: "The customer gets a text confirmation, a reminder is scheduled and your team is quietly notified.",
  },
  {
    time: "8:00 am",
    service: "Web & apps",
    color: "#ef7a5e",
    title: "Your team starts the day informed",
    desc: "The dashboard shows the new booking and full history. The customer can reschedule from your site or app.",
  },
  {
    time: "Thursday",
    service: "Automation",
    color: "#fd9150",
    title: "Follow-up happens by itself",
    desc: "After the visit, a thank-you and review request are sent, and the CRM updates the customer’s history.",
  },
];

export function StoryTimeline() {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    const handleScroll = () => {
      const mid = window.innerHeight * 0.5;
      let matched = 0;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < mid) {
          matched = i;
        }
      });
      setActiveIdx(matched);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const cur = storySteps[activeIdx];

  return (
    <section id="story" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <span className="k">One call, followed through</span>
        <h2>See what happens after hours.</h2>

        <div className="story">
          {/* Sticky left card */}
          <div
            className="sticky"
            id="sticky"
            style={{ "--sc": cur.color } as React.CSSProperties}
          >
            <span className="sv">{cur.service}</span>
            <div className="t">
              {cur.time}
              <small>{cur.title}</small>
            </div>
            <div className="dots">
              {storySteps.map((_, i) => (
                <i key={i} className={i <= activeIdx ? "on" : ""} />
              ))}
            </div>
          </div>

          {/* Right side steps list */}
          <div className="sts" id="sts">
            {storySteps.map((step, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className={`st ${activeIdx === idx ? "on" : ""}`}
                onClick={() => setActiveIdx(idx)}
              >
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
