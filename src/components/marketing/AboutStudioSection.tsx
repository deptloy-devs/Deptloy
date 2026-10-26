"use client";

import * as React from "react";
import { LogoMark } from "@/components/ui/Logo";

const tabs = [
  {
    title: "Systems, not tools",
    desc: "We design how the pieces work together before we build any single one, so nothing is bolted on afterwards.",
  },
  {
    title: "Plain-spoken",
    desc: "No jargon and no hype. You always know what we’re building, why, and what it will do for your day.",
  },
  {
    title: "We stay",
    desc: "Launch is the start. We monitor, fix and extend the system as your business changes.",
  },
];

export function AboutStudioSection() {
  const [activeTab, setActiveTab] = React.useState(0);
  const [isOneSystem, setIsOneSystem] = React.useState(true);
  const userInteractedRef = React.useRef(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (!userInteractedRef.current) {
        setActiveTab((prev) => (prev + 1) % 3);
      }
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  const handleSelectTab = (idx: number) => {
    userInteractedRef.current = true;
    setActiveTab(idx);
  };

  return (
    <section id="about" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <span className="k">About</span>
        <h2>A software studio for businesses that run on calls, leads and customers.</h2>

        <div className="ab">
          {/* Tab selector buttons */}
          <div className="prl" id="prl">
            {tabs.map((tab, idx) => (
              <button
                key={tab.title}
                type="button"
                className={`pr ${activeTab === idx ? "on" : ""}`}
                onClick={() => handleSelectTab(idx)}
                onMouseEnter={() => {
                  if (typeof window !== "undefined" && window.matchMedia("(hover:hover)").matches) {
                    handleSelectTab(idx);
                  }
                }}
              >
                <h3>{tab.title}</h3>
                <p>{tab.desc}</p>
              </button>
            ))}
          </div>

          {/* Dynamic interactive right stage */}
          <div className="stg">
            {/* Slide 0: Architecture Graph with Systems vs Separate Toggle */}
            <div className={`sc ${activeTab === 0 ? "on" : ""}`}>
              <svg
                className={`sysv ${isOneSystem ? "on" : ""}`}
                id="sysv"
                viewBox="0 0 520 330"
              >
                <g className="lk">
                  <path id="m1" d="M260 165C200 150 150 110 130 70" />
                  <path id="m2" d="M260 165C320 150 370 110 390 70" />
                  <path id="m3" d="M260 165C200 180 150 220 130 260" />
                  <path id="m4" d="M260 165C320 180 370 220 390 260" />
                  <circle r="4.5" fill="#fff">
                    <animateMotion
                      dur="2.6s"
                      repeatCount="indefinite"
                      path="M130 70C150 110 200 150 260 165"
                    />
                  </circle>
                  <circle r="4.5" fill="#fff">
                    <animateMotion
                      dur="2.6s"
                      begin=".6s"
                      repeatCount="indefinite"
                      path="M260 165C320 150 370 110 390 70"
                    />
                  </circle>
                  <circle r="4.5" fill="#fff">
                    <animateMotion
                      dur="2.6s"
                      begin="1.2s"
                      repeatCount="indefinite"
                      path="M260 165C200 180 150 220 130 260"
                    />
                  </circle>
                  <circle r="4.5" fill="#fff">
                    <animateMotion
                      dur="2.6s"
                      begin="1.8s"
                      repeatCount="indefinite"
                      path="M390 260C370 220 320 180 260 165"
                    />
                  </circle>
                </g>

                <g className="nd" style={{ "--dx": "-26px", "--dy": "-18px" } as React.CSSProperties}>
                  <rect x="62" y="48" width="136" height="44" />
                  <text x="130" y="75" textAnchor="middle">
                    AI receptionist
                  </text>
                </g>

                <g className="nd" style={{ "--dx": "30px", "--dy": "-26px" } as React.CSSProperties}>
                  <rect x="322" y="48" width="136" height="44" />
                  <text x="390" y="75" textAnchor="middle">
                    Custom CRM
                  </text>
                </g>

                <g className="nd" style={{ "--dx": "-20px", "--dy": "28px" } as React.CSSProperties}>
                  <rect x="62" y="238" width="136" height="44" />
                  <text x="130" y="265" textAnchor="middle">
                    Automation
                  </text>
                </g>

                <g className="nd" style={{ "--dx": "34px", "--dy": "20px" } as React.CSSProperties}>
                  <rect x="322" y="238" width="136" height="44" />
                  <text x="390" y="265" textAnchor="middle">
                    Web &amp; apps
                  </text>
                </g>

                <g className="hb2">
                  <circle cx="260" cy="165" r="34" />
                  <g transform="translate(245, 147) scale(0.11)">
                    <LogoMark />
                  </g>
                </g>
              </svg>

              <div className="tg">
                <button
                  type="button"
                  className={!isOneSystem ? "on" : ""}
                  onClick={() => {
                    userInteractedRef.current = true;
                    setIsOneSystem(false);
                  }}
                >
                  Separate tools
                </button>
                <button
                  type="button"
                  className={isOneSystem ? "on" : ""}
                  onClick={() => {
                    userInteractedRef.current = true;
                    setIsOneSystem(true);
                  }}
                >
                  One system
                </button>
              </div>
              <div className="cap">Same services. Designed together.</div>
            </div>

            {/* Slide 1: Jargon Translator */}
            <div className={`sc ${activeTab === 1 ? "on" : ""}`}>
              <div className="ppw">
                <div className="pp">
                  <small>What the industry says</small>
                  <div className="j">Omnichannel conversational AI orchestration</div>
                  <div className="p">It answers your calls and messages.</div>
                </div>
                <div className="pp">
                  <small>What the industry says</small>
                  <div className="j">Bidirectional CRM synchronization layer</div>
                  <div className="p">Your customer records stay up to date.</div>
                </div>
                <div className="pp">
                  <small>What the industry says</small>
                  <div className="j">Event-driven workflow automation</div>
                  <div className="p">Follow-ups happen without anyone chasing.</div>
                </div>
              </div>
              <div className="cap">We say it like this</div>
            </div>

            {/* Slide 2: Multi-year Care & Monitoring Timeline */}
            <div className={`sc ${activeTab === 2 ? "on" : ""}`}>
              <svg className="ecgv" viewBox="0 0 520 110" preserveAspectRatio="none">
                <path
                  pathLength={100}
                  className="b0"
                  d="M0 60H110l12-36 16 72 14-52 10 16H300l12-36 16 72 14-52 10 16H520"
                />
                <path
                  pathLength={100}
                  className="b1"
                  d="M0 60H110l12-36 16 72 14-52 10 16H300l12-36 16 72 14-52 10 16H520"
                />
              </svg>

              <div className="tl">
                <span>Launch</span>
                <span>Month 1</span>
                <span>Month 6</span>
                <span>Year 1</span>
                <span>Year 3</span>
              </div>

              <div className="lgw">
                <div className="lgl">
                  <b>Monitoring</b> All services healthy
                </div>
                <div className="lgl">
                  <b>Improved</b> Follow-up rules tuned to real calls
                </div>
                <div className="lgl">
                  <b>Updated</b> Calendar integration refreshed
                </div>
                <div className="lgl">
                  <b>Extended</b> New booking form added to the app
                </div>
              </div>

              <div className="cap">Still being looked after</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
