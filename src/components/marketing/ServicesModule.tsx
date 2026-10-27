"use client";

import * as React from "react";

interface ServiceItem {
  n: string;
  s: string;
  c: string;
  pc: string;
  t: string;
  l: string[];
  f: string[];
  x: string[];
}

const services: ServiceItem[] = [
  {
    n: "AI & intelligent systems",
    s: "Intelligence with a purpose",
    c: "#8478e0",
    pc: "#d5cffa",
    t: "Practical AI features woven into the product, only where they help.",
    l: [
      "Conversational agents for calls, messages and support",
      "AI-assisted search and knowledge workflows",
      "Human review and clear escalation rules",
      "Relevant context connected to your own data",
    ],
    f: ["Caller", "AI answers", "Books", "CRM record", "Text sent"],
    x: ["Data & platform architecture", "Automation & integration", "Custom software & apps"],
  },
  {
    n: "Data & platform architecture",
    s: "One reliable source of truth",
    c: "#5750a8",
    pc: "#ece8ff",
    t: "The database, APIs and foundations that make a product dependable.",
    l: [
      "Custom data models built around your workflows",
      "Secure APIs and role-based access",
      "Shared records across teams and touchpoints",
      "Clear reporting and operational dashboards",
    ],
    f: ["New lead", "Qualified", "Booked", "Served", "Review asked"],
    x: ["AI & intelligent systems", "Automation & integration", "Custom software & apps"],
  },
  {
    n: "Automation & integration",
    s: "Connect the moving parts",
    c: "#fd9150",
    pc: "#ffd8be",
    t: "Reliable integrations and workflows that keep complex operations moving.",
    l: [
      "Connect existing tools and internal platforms",
      "Automate repeatable approvals and updates",
      "Coordinate handoffs across teams and systems",
      "Track failures and route exceptions to people",
    ],
    f: ["Trigger", "Check rules", "Act", "Notify", "Log"],
    x: ["AI & intelligent systems", "Data & platform architecture", "Custom software & apps"],
  },
  {
    n: "Custom software & apps",
    s: "Built around your people",
    c: "#ef7a5e",
    pc: "#f7b8c9",
    t: "Digital products tailored to the work, not squeezed into a template.",
    l: [
      "Internal tools and business platforms",
      "Client portals, SaaS products and web applications",
      "Thoughtful user journeys and responsive interfaces",
      "Dashboards, integrations and scalable foundations",
    ],
    f: ["Visitor", "Books online", "CRM record", "Reminder", "Returns"],
    x: ["AI & intelligent systems", "Data & platform architecture", "Automation & integration"],
  },
];

export function ServicesModule() {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const cur = services[activeIdx];

  const handlePlugClick = (name: string) => {
    const foundIdx = services.findIndex((s) => s.n === name);
    if (foundIdx !== -1) {
      setActiveIdx(foundIdx);
    }
  };

  return (
    <section id="services">
      <div className="wrap">
        <span className="k">Our capabilities</span>
        <h2>The expertise behind your product.</h2>
        <p className="lead2">
          You bring the challenge. We bring together the right mix of engineering, design, AI and integrations to build a product around it.
        </p>

        <div className="mods">
          {/* Tabs list */}
          <div className="modlist" id="tabs">
            {services.map((s, i) => (
              <button
                key={s.n}
                type="button"
                className={`mod ${activeIdx === i ? "on" : ""}`}
                style={{ "--c": s.c } as React.CSSProperties}
                onClick={() => setActiveIdx(i)}
              >
                <span className="mk"></span>
                <span>
                  <h3>{s.n}</h3>
                  <small>{s.s}</small>
                </span>
                <span className="ports">
                  <i></i>
                  <i></i>
                  <i></i>
                </span>
              </button>
            ))}
          </div>

          {/* Interactive Specification Viewport */}
          <div
            className="spec"
            id="panel"
            style={{ "--c": cur.c } as React.CSSProperties}
          >
            <div className="sh2">
              <span>Capability</span>
              <b>{cur.n}</b>
            </div>

            {/* Visualizer Viewport */}
            <div className="vz">
              {activeIdx === 0 && (
                <div className="v1" style={{ "--c": cur.c } as React.CSSProperties}>
                  <div className="wv">
                    {Array.from({ length: 22 }).map((_, idx) => (
                      <s key={idx} />
                    ))}
                  </div>
                  <div className="tx">
                    <div className="bb a">Can I book a cleaning on Thursday?</div>
                    <div className="bb b">Thursday 2:30 works. Booked for you.</div>
                    <div className="stamp">✓ Booked · saved to CRM</div>
                  </div>
                </div>
              )}

              {activeIdx === 1 && (
                <div className="v2" style={{ "--c": cur.c } as React.CSSProperties}>
                  <div className="col">
                    <b>New</b>
                    <i></i>
                    <i></i>
                  </div>
                  <div className="col">
                    <b>Booked</b>
                    <i></i>
                  </div>
                  <div className="col">
                    <b>Won</b>
                    <i></i>
                  </div>
                  <div className="mv">Maya R.</div>
                </div>
              )}

              {activeIdx === 2 && (
                <svg
                  className="v3"
                  viewBox="0 0 420 190"
                  style={{ "--c": cur.c } as React.CSSProperties}
                >
                  <g className="ln">
                    <path d="M92 95H138M222 95C246 95 246 48 270 48M222 95C246 95 246 142 270 142M352 48C374 48 374 95 386 95M352 142C374 142 374 95 386 95" />
                  </g>
                  <g className="nb">
                    <rect x="8" y="76" width="84" height="38" />
                    <text x="50" y="99" textAnchor="middle">
                      Call ends
                    </text>
                    <rect x="138" y="76" width="84" height="38" />
                    <text x="180" y="99" textAnchor="middle">
                      Save to CRM
                    </text>
                    <rect x="270" y="29" width="82" height="38" />
                    <text x="311" y="52" textAnchor="middle">
                      Text client
                    </text>
                    <rect x="270" y="123" width="82" height="38" />
                    <text x="311" y="146" textAnchor="middle">
                      Alert team
                    </text>
                  </g>
                  <circle cx="398" cy="95" r="13" fill="var(--c)" />
                  <path
                    d="M392 95l5 5 9-10"
                    stroke="#15134a"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  <circle r="5" fill="#fff">
                    <animateMotion
                      dur="3.2s"
                      repeatCount="indefinite"
                      path="M8 95H138H222C246 95 246 48 270 48H352C374 48 374 95 386 95"
                    />
                  </circle>
                  <circle r="5" fill="#fff">
                    <animateMotion
                      dur="3.2s"
                      begin="1.6s"
                      repeatCount="indefinite"
                      path="M8 95H138H222C246 95 246 142 270 142H352C374 142 374 95 386 95"
                    />
                  </circle>
                </svg>
              )}

              {activeIdx === 3 && (
                <div className="v4" style={{ "--c": cur.c } as React.CSSProperties}>
                  <div className="br">
                    <div className="bar">
                      <i></i>
                      <i></i>
                      <i></i>
                    </div>
                    <div className="hh">Your customer portal</div>
                    <div className="cc">
                      <i></i>
                      <i></i>
                      <i></i>
                    </div>
                  </div>
                  <div className="ph">
                    <b>Choose an action</b>
                    <div className="sl">
                      <i>9:00</i>
                      <i>10:30</i>
                      <i className="s">2:30</i>
                      <i>4:00</i>
                    </div>
                    <em className="tap"></em>
                  </div>
                </div>
              )}
            </div>

            <h3>{cur.t}</h3>
            <ul>
              {cur.l.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <div className="plug">
              <span>Works with</span>
              {cur.x.map((plugName) => (
                <button
                  key={plugName}
                  type="button"
                  onClick={() => handlePlugClick(plugName)}
                >
                  {plugName}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
