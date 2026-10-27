"use client";

import * as React from "react";
import Link from "next/link";
import { DepRobot } from "./DepRobot";
import { useDepChat } from "./DepChat";

export function Hero() {
  const { openChat } = useDepChat();
  const [bubbleText, setBubbleText] = React.useState("");

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

          <DepRobot
            onActivate={() => openChat()}
            label="Chat with Dep, the Deptloy assistant"
            style={{ width: "min(330px, 66%)", height: "auto" }}
          />

          <button className="btn talk" id="talk" type="button" onClick={() => openChat()}>
            Chat with Dep
          </button>
        </div>
      </div>
    </div>
  );
}
