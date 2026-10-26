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
    n: "AI receptionist",
    s: "Never miss a call again",
    c: "#8478e0",
    pc: "#d5cffa",
    t: "Answers every call and message in your brand’s voice, day and night.",
    l: [
      "Books, reschedules and cancels appointments",
      "Answers questions using your own business knowledge",
      "Qualifies leads and sends urgent calls to a person",
      "Saves every conversation to your CRM",
    ],
    f: ["Caller", "AI answers", "Books", "CRM record", "Text sent"],
    x: ["CRM", "Automation", "Web & apps"],
  },
  {
    n: "Custom CRM",
    s: "Every customer in one place",
    c: "#5750a8",
    pc: "#ece8ff",
    t: "A customer system shaped around how your team actually sells and serves.",
    l: [
      "Pipeline and full contact history in one view",
      "Call transcripts, notes and tasks attached automatically",
      "Views and permissions for each team member",
      "Reports on leads, bookings and follow-ups",
    ],
    f: ["New lead", "Qualified", "Booked", "Served", "Review asked"],
    x: ["AI receptionist", "Automation", "Web & apps"],
  },
  {
    n: "Automation",
    s: "The busywork, handled",
    c: "#fd9150",
    pc: "#ffd8be",
    t: "Quiet workflows that do the repetitive work reliably, in the background.",
    l: [
      "Instant follow-ups after every call or form",
      "Reminders, confirmations and review requests",
      "Handoffs between tools, staff and customers",
      "Alerts when something needs a human",
    ],
    f: ["Trigger", "Check rules", "Act", "Notify", "Log"],
    x: ["AI receptionist", "CRM", "Web & apps"],
  },
  {
    n: "Web & app development",
    s: "Where customers meet your system",
    c: "#ef7a5e",
    pc: "#f7b8c9",
    t: "Websites and apps your customers use and your team can rely on.",
    l: [
      "Fast, on-brand websites built to convert",
      "Booking flows, customer portals and mobile apps",
      "Admin dashboards for your team",
      "APIs that link everything to your system",
    ],
    f: ["Visitor", "Books online", "CRM record", "Reminder", "Returns"],
    x: ["AI receptionist", "CRM", "Automation"],
  },
];

export function ServicesModule() {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const cur = services[activeIdx];

  const handlePlugClick = (name: string) => {
    const target = name.split(" ")[0].toLowerCase();
    const foundIdx = services.findIndex((s) => s.n.toLowerCase().includes(target));
    if (foundIdx !== -1) {
      setActiveIdx(foundIdx);
    }
  };

  return (
    <section id="services">
      <div className="wrap">
        <span className="k">What we build</span>
        <h2>The building blocks of your system.</h2>
        <p className="lead2">
          We combine these services into one custom, long-lasting system that runs your business. Start with the piece that matters most; everything is designed to connect.
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
              <span>Module</span>
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
                    <div className="hh">Book in 30 seconds</div>
                    <div className="cc">
                      <i></i>
                      <i></i>
                      <i></i>
                    </div>
                  </div>
                  <div className="ph">
                    <b>Pick a time</b>
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
              <span>Plugs into</span>
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
