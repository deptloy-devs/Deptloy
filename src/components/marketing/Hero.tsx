"use client";

import * as React from "react";
import Link from "next/link";
import { useDepChat } from "./DepChat";

export function Hero() {
  const { openChat } = useDepChat();
  const [bubbleText, setBubbleText] = React.useState("");
  const robotRef = React.useRef<SVGSVGElement>(null);
  const eyesRef = React.useRef<SVGGElement>(null);

  // Typewriter effect
  React.useEffect(() => {
    const txt = "Hi, I’m Dep! Ask me anything about Deptloy.";
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setBubbleText(txt.slice(0, i));
      if (i >= txt.length) clearInterval(timer);
    }, 34);

    return () => clearInterval(timer);
  }, []);

  // Pointer eye-tracking
  React.useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!robotRef.current || !eyesRef.current) return;
      const r = robotRef.current.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height * 0.35);
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(7, d / 40);
      eyesRef.current.style.transform = `translate(${(dx / d) * k}px, ${(dy / d) * k}px)`;
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="hero">
      <div className="wrap">
        <div>
          <h1>
            <span>
              <b>Software built</b>
            </span>{" "}
            <span>
              <b>to outlast</b>
            </span>{" "}
            <span>
              <b>the hype.</b>
            </span>
          </h1>
          <p className="sub">
            From intelligent AI receptionists to complete custom software platforms, we build technology that works
            around your business.
          </p>
          <div className="cta flex items-center gap-3 flex-wrap">
            <Link className="btn" href="/demo" style={{ background: "var(--deep)", color: "#fff" }}>
              Test Our AI Receptionist →
            </Link>
            <Link className="btn ghost" href="/contact#appointment">
              Book a Call
            </Link>
            <Link
              href="/projects"
              className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--pur)] hover:text-[var(--or)] ml-1 transition-colors"
            >
              Explore Our Projects →
            </Link>
          </div>
        </div>

        <div className="rbwrap" id="rbwrap">
          <div className="disc"></div>
          <div className="bubble" id="bubble">
            {bubbleText}
          </div>
          <div className="fc" style={{ "--c": "#3ccf91" } as React.CSSProperties}>
            <i></i>24/7 AI Receptionist Active
          </div>
          <div className="fc" style={{ "--c": "var(--or)" } as React.CSSProperties}>
            <i></i>Custom Workflow Live
          </div>
          <div className="fc" style={{ "--c": "var(--lav)" } as React.CSSProperties}>
            <i></i>Data In Sync · Zero Drift
          </div>

          <svg
            id="robot"
            ref={robotRef}
            viewBox="0 0 300 340"
            role="button"
            tabIndex={0}
            style={{ width: "min(330px, 66%)", height: "auto" }}
            onClick={() => openChat()}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openChat()}
            aria-label="Chat with Dep, the Deptloy assistant"
          >
            <ellipse cx="150" cy="326" rx="70" ry="9" fill="#15134a" opacity=".12" />
            <line x1="150" y1="52" x2="150" y2="28" stroke="#5750a8" strokeWidth="5" strokeLinecap="round" />
            <circle className="glow" cx="150" cy="22" r="9" fill="#fd9150" />
            <circle cx="54" cy="122" r="16" fill="#8478e0" />
            <circle cx="246" cy="122" r="16" fill="#8478e0" />
            <rect x="62" y="50" width="176" height="146" rx="60" fill="url(#hd)" stroke="#d5cffa" strokeWidth="3" />
            <rect x="82" y="72" width="136" height="100" rx="40" fill="#15134a" />

            <g id="eyes" ref={eyesRef}>
              <rect className="eye" x="112" y="98" width="20" height="30" rx="10" fill="#bfe3f5" />
              <rect className="eye" x="168" y="98" width="20" height="30" rx="10" fill="#bfe3f5" />
            </g>

            <circle cx="100" cy="144" r="8" fill="#f7b8c9" opacity=".7" />
            <circle cx="200" cy="144" r="8" fill="#f7b8c9" opacity=".7" />
            <path className="smile" d="M130 146q20 16 40 0" stroke="#fd9150" strokeWidth="5" fill="none" strokeLinecap="round" />

            <g className="mouth" fill="#fd9150">
              <rect x="128" y="142" width="7" height="8" rx="3" />
              <rect x="139" y="142" width="7" height="8" rx="3" />
              <rect x="150" y="142" width="7" height="8" rx="3" />
              <rect x="161" y="142" width="7" height="8" rx="3" />
            </g>

            <rect x="96" y="198" width="108" height="100" rx="42" fill="url(#bd)" />
            <use href="#mk" x="128" y="222" width="44" height="50" />

            <path d="M96 222q-30 14-26 52" stroke="#8478e0" strokeWidth="20" fill="none" strokeLinecap="round" />
            <g className="arm">
              <path d="M206 222q34 8 40 48" stroke="#8478e0" strokeWidth="20" fill="none" strokeLinecap="round" />
              <circle cx="246" cy="276" r="15" fill="#ffd8be" />
            </g>
            <ellipse cx="150" cy="306" rx="32" ry="8" fill="#fd9150" opacity=".55" />
          </svg>

          <button className="btn talk" id="talk" type="button" onClick={() => openChat()}>
            Chat with Dep
          </button>
        </div>
      </div>
    </div>
  );
}
