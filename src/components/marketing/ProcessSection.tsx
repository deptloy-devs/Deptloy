"use client";

import * as React from "react";

const steps = [
  {
    n: "1",
    title: "Discover",
    desc: "We learn how your business runs and where calls, leads and time slip away.",
    output: "Output: a map of where time and leads slip away",
  },
  {
    n: "2",
    title: "Design",
    desc: "We plan one system: what connects, what’s automated, what stays human.",
    output: "Output: one plan for the whole system",
  },
  {
    n: "3",
    title: "Build",
    desc: "We build and test each piece against real situations, not demos.",
    output: "Output: tested, working pieces",
  },
  {
    n: "4",
    title: "Launch",
    desc: "We go live, train your team and watch closely for the first weeks.",
    output: "Output: a live system and a trained team",
  },
  {
    n: "5",
    title: "Care",
    desc: "We keep improving and extending it as your business grows.",
    output: "Output: steady monitoring and upgrades",
  },
];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export function ProcessSection() {
  const procRef = React.useRef<HTMLDivElement>(null);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      if (!procRef.current) return;
      const r = procRef.current.getBoundingClientRect();
      const q = clamp((window.innerHeight * 0.75 - r.top) / (r.height + window.innerHeight * 0.2));
      setProgress(q);
      procRef.current.style.setProperty("--pr", `${q}`);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section id="process">
      <div className="wrap">
        <span className="k">Process</span>
        <h2>From first conversation to years of use.</h2>

        <div className="proc" id="proc" ref={procRef}>
          {steps.map((step, idx) => {
            const isOn = idx / steps.length < progress;
            return (
              <div
                key={step.n}
                className={`ps ${isOn ? "on" : ""}`}
                data-n={step.n}
              >
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                <small>{step.output}</small>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
