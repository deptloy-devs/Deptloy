"use client";

import * as React from "react";
import { LogoMark } from "@/components/ui/Logo";

const cfg: [number, number, number, number, number][] = [
  [-0.12, -0.2, -8, 0.94, 2],
  [0.14, -0.24, 7, 1.05, 0],
  [-0.15, 0.2, 6, 1.05, 0],
  [0.12, 0.22, -7, 0.92, 2],
];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

export function AssemblyTrack() {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const consoleRef = React.useRef<HTMLDivElement>(null);
  const frameRef = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);
  const linesRef = React.useRef<SVGSVGElement>(null);
  const hubRef = React.useRef<HTMLDivElement>(null);
  const hintRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  const [phaseIndex, setPhaseIndex] = React.useState(0);

  React.useEffect(() => {
    let animId: number;
    let p = 0;
    let tp = 0;
    let mx = 0;
    let my = 0;

    const onPointerMove = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onPointerMove);

    const updatePaths = () => {
      if (!gridRef.current || !linesRef.current) return;
      const g = gridRef.current;
      if (g.offsetWidth === 0 || g.offsetHeight === 0) return;

      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length < 4) return;

      const cx = g.offsetWidth / 2;
      const cy = g.offsetHeight / 2;
      linesRef.current.setAttribute("viewBox", `0 0 ${g.offsetWidth} ${g.offsetHeight}`);

      const rects = cards.map((h) => ({
        l: h.offsetLeft,
        t: h.offsetTop,
        w: h.offsetWidth,
        h: h.offsetHeight,
      }));

      const endpoints = [
        [rects[0].l + rects[0].w, rects[0].t + rects[0].h / 2],
        [rects[1].l, rects[1].t + rects[1].h / 2],
        [rects[2].l + rects[2].w, rects[2].t + rects[2].h / 2],
        [rects[3].l, rects[3].t + rects[3].h / 2],
      ];

      linesRef.current.innerHTML = endpoints
        .map(
          ([x, y]) =>
            `<path d="M${x} ${y}C${(x + cx) / 2} ${y} ${cx} ${(y + cy) / 2} ${cx} ${cy}"/><circle cx="${x}" cy="${y}" r="5"/>`
        )
        .join("");
    };

    updatePaths();
    window.addEventListener("resize", updatePaths);

    const loop = (t: number) => {
      if (!trackRef.current) return;
      const tr = trackRef.current;
      const max = tr.offsetHeight - window.innerHeight;
      if (max > 0) {
        tp = clamp(-tr.getBoundingClientRect().top / max);
      } else {
        tp = 0;
      }
      p += (tp - p) * 0.1;

      const W = window.innerWidth;
      const H = window.innerHeight;
      const m = W < 640 ? 0.15 : W < 980 ? 0.3 : 1;

      cardRefs.current.forEach((h, i) => {
        if (!h) return;
        const [dx, dy, r, s, bl] = cfg[i];
        const e = ease(clamp(p * 1.4 - i * 0.08));
        const k = 1 - e;
        const bob = Math.sin(t / 900 + i * 1.7) * 8 * k;

        h.style.transform = `translate(${dx * W * m * k + mx * (i % 2 ? -24 : 24) * k}px,${
          dy * H * m * k + bob + my * 16 * k
        }px) rotate(${r * k}deg) scale(${1 + (s - 1) * k})`;
        h.style.filter = bl && k > 0.02 ? `blur(${bl * k}px)` : "";
        h.style.zIndex = s > 1 && k > 0.3 ? "3" : "1";
      });

      if (frameRef.current) {
        const f = ease(clamp((p - 0.55) / 0.3));
        frameRef.current.style.opacity = `${f}`;
        frameRef.current.style.transform = `scale(${0.95 + 0.05 * f})`;
      }

      const hubOpacity = clamp((p - 0.65) / 0.2);
      if (linesRef.current) {
        linesRef.current.style.opacity = `${hubOpacity}`;
      }
      if (hubRef.current) {
        hubRef.current.style.opacity = `${hubOpacity}`;
        hubRef.current.style.transform = `scale(${0.6 + 0.4 * ease(hubOpacity)})`;
      }

      if (consoleRef.current) {
        consoleRef.current.style.transform = `rotateY(${mx * -4 * ease(p)}deg) rotateX(${
          my * 3 * ease(p)
        }deg)`;
      }

      const activePhase = p < 0.25 ? 0 : p < 0.8 ? 1 : 2;
      setPhaseIndex(activePhase);

      if (hintRef.current) {
        hintRef.current.style.opacity = p > 0.04 ? "0" : "1";
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", updatePaths);
    };
  }, []);

  return (
    <div className="track" ref={trackRef} id="track">
      <div className="stage">
        <h2>Different capabilities. One connected product.</h2>

        <div className="phase" id="phase">
          <span className={phaseIndex === 0 ? "on" : ""}>AI &amp; Custom Software</span>
          <span className={phaseIndex === 1 ? "on" : ""}>Databases &amp; Automations</span>
          <span className={phaseIndex === 2 ? "on" : ""}>One Connected System</span>
        </div>

        <div className="console" ref={consoleRef} id="console">
          <div className="frame" ref={frameRef} id="frame">
            <small>
              <i></i>Your custom system · built and maintained by Deptloy
            </small>
          </div>

          <div className="grid" ref={gridRef} id="grid">
            {/* Card 1: AI receptionist */}
            <div
              className="hc"
              style={{ "--c": "var(--lav)" } as React.CSSProperties}
              ref={(el) => {
                cardRefs.current[0] = el;
              }}
            >
              <h4>
                <i></i>AI receptionist<em>Live call</em>
              </h4>
              <div>
                <div className="wave">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <s key={i} />
                  ))}
                </div>
                <div className="msg">Can I book a cleaning on Thursday?</div>
                <div className="msg ai">Thursday 2:30 works. Booked for you.</div>
                <div className="msg hide-m">Great, thanks!</div>
              </div>
              <div className="ill">
                <div className="tick">
                  <div className="d">
                    <small>THURSDAY</small>2:30 PM
                  </div>
                  <div className="ok">Cleaning confirmed</div>
                </div>
              </div>
            </div>

            {/* Card 2: CRM */}
            <div
              className="hc"
              style={{ "--c": "var(--pur)", "--c2": "var(--lav)" } as React.CSSProperties}
              ref={(el) => {
                cardRefs.current[1] = el;
              }}
            >
              <h4>
                <i></i>CRM<em>3 new today</em>
              </h4>
              <div>
                <div className="kb">
                  <div style={{ "--c2": "var(--or)" } as React.CSSProperties}>
                    <b>New</b>
                    <s>Maya R.</s>
                    <s>Tom B.</s>
                  </div>
                  <div style={{ "--c2": "var(--lav)" } as React.CSSProperties}>
                    <b>Booked</b>
                    <s>Dan K.</s>
                    <s className="hide-m">Lea M.</s>
                  </div>
                  <div style={{ "--c2": "#3ccf91" } as React.CSSProperties}>
                    <b>Won</b>
                    <s>Priya S.</s>
                  </div>
                </div>
              </div>
              <div className="ill">
                <svg className="spark" viewBox="0 0 150 120">
                  <defs>
                    <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#8478e0" stopOpacity="0.45" />
                      <stop offset="1" stopColor="#8478e0" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <text x="4" y="12">
                    Leads this week
                  </text>
                  <path d="M4 100L28 84 52 90 76 58 100 66 124 30 146 18V116H4Z" fill="url(#sg)" />
                  <path
                    d="M4 100L28 84 52 90 76 58 100 66 124 30 146 18"
                    fill="none"
                    stroke="#5750a8"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="146" cy="18" r="5" fill="#fd9150" />
                </svg>
              </div>
            </div>

            {/* Card 3: Automation */}
            <div
              className="hc"
              style={{ "--c": "var(--or)" } as React.CSSProperties}
              ref={(el) => {
                cardRefs.current[2] = el;
              }}
            >
              <h4>
                <i></i>Automation<em>Running</em>
              </h4>
              <div className="full">
                <svg className="flow" viewBox="0 0 440 130" preserveAspectRatio="xMidYMid meet">
                  <g>
                    <path d="M92 65H132M214 65C240 65 240 30 266 30M214 65C240 65 240 100 266 100M348 30C374 30 374 65 392 65M348 100C374 100 374 65 392 65" />
                  </g>
                  <g>
                    <rect x="4" y="46" width="88" height="38" rx="12" fill="#ece8ff" />
                    <text x="48" y="69" textAnchor="middle">
                      Call ends
                    </text>
                    <rect x="132" y="46" width="82" height="38" rx="12" fill="#d5cffa" />
                    <text x="173" y="69" textAnchor="middle">
                      Save to CRM
                    </text>
                    <rect x="266" y="11" width="82" height="38" rx="12" fill="#ffd8be" />
                    <text x="307" y="34" textAnchor="middle">
                      Text client
                    </text>
                    <rect x="266" y="81" width="82" height="38" rx="12" fill="#f7b8c9" />
                    <text x="307" y="104" textAnchor="middle">
                      Alert team
                    </text>
                    <circle cx="410" cy="65" r="20" fill="#fd9150" />
                    <path
                      d="M401 65l7 7 12-14"
                      stroke="#fff"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </g>
                </svg>
              </div>
            </div>

            {/* Card 4: Web & apps */}
            <div
              className="hc"
              style={{ "--c": "var(--co)" } as React.CSSProperties}
              ref={(el) => {
                cardRefs.current[3] = el;
              }}
            >
              <h4>
                <i></i>Web &amp; apps<em>Live</em>
              </h4>
              <div>
                <div className="browser">
                  <div className="bar">
                    <i></i>
                    <i></i>
                    <i></i>yourbusiness.com
                  </div>
                  <div className="hero2">
                    <p>Book in 30 seconds</p>
                    <s>Book now</s>
                  </div>
                  <div className="cs">
                    <i></i>
                    <i></i>
                    <i></i>
                  </div>
                </div>
              </div>
              <div className="ill">
                <div className="phone">
                  <b>Pick a time</b>
                  <div className="sl">
                    <i>9:00</i>
                    <i>10:30</i>
                    <i className="s">2:30</i>
                    <i>4:00</i>
                    <i>4:30</i>
                    <i>5:00</i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <svg className="lines" ref={linesRef} id="lines" aria-hidden="true"></svg>

          <div className="hub" ref={hubRef} id="hub">
            <svg width="34" height="38" viewBox="-140 -160 280 320">
              <use href="#mk" />
            </svg>
          </div>
        </div>

        <div className="scrollhint" ref={hintRef} id="hint">
          Scroll to assemble your system
        </div>
      </div>
    </div>
  );
}
