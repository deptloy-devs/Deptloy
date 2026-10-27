"use client";

import * as React from "react";
import { mouthOpenness, smoothLevel } from "@/lib/voice-demo/audio";

/** Live voice levels, read every frame. Same shape as LiveCall's `levels`. */
export type DepVoiceLevels = { agent(): number; caller(): number };

type DepRobotProps = {
  /** When set, Dep lip-syncs to `agent()` and looks like it's listening on `caller()`. */
  voice?: DepVoiceLevels | null;
  /** Makes Dep a button (the home page opens the chat). */
  onActivate?: () => void;
  label?: string;
  style?: React.CSSProperties;
};

/**
 * Dep, the Deptloy mascot. Its idle motion (bob, wave, blink, eye tracking)
 * lives in design.css. Lip sync only sets a CSS variable on the mouth bars,
 * so it never fights the body's own transforms.
 */
export function DepRobot({ voice, onActivate, label, style }: DepRobotProps) {
  const robotRef = React.useRef<SVGSVGElement>(null);
  const eyesRef = React.useRef<SVGGElement>(null);

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

  // Lip sync: volume -> mouth opening, every animation frame.
  React.useEffect(() => {
    const svg = robotRef.current;
    if (!svg || !voice) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let mouth = 0;
    let ear = 0;
    let speaking = false;
    let listening = false;
    let last = performance.now();
    let frame = 0;
    svg.classList.add("dep-live");

    const step = (now: number) => {
      const elapsed = now - last;
      last = now;
      mouth = smoothLevel(mouth, mouthOpenness(voice.agent()), elapsed);
      ear = smoothLevel(ear, voice.caller(), elapsed);

      // Two thresholds each, so the look doesn't flicker on the edge.
      const nowSpeaking = speaking ? mouth > 0.04 : mouth > 0.1;
      if (nowSpeaking !== speaking) {
        speaking = nowSpeaking;
        svg.classList.toggle("speaking", speaking);
      }
      const nowListening = !speaking && (listening ? ear > 0.012 : ear > 0.025);
      if (nowListening !== listening) {
        listening = nowListening;
        svg.classList.toggle("listening", listening);
      }

      const open = reduceMotion ? (speaking ? 0.5 : 0) : mouth;
      svg.style.setProperty("--dep-mouth", open.toFixed(3));
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frame);
      svg.classList.remove("dep-live", "speaking", "listening");
      svg.style.removeProperty("--dep-mouth");
    };
  }, [voice]);

  const interactive = Boolean(onActivate);

  return (
    <svg
      id="robot"
      ref={robotRef}
      viewBox="0 0 300 340"
      role={interactive ? "button" : "img"}
      tabIndex={interactive ? 0 : undefined}
      style={style}
      onClick={onActivate}
      onKeyDown={interactive ? (e) => (e.key === "Enter" || e.key === " ") && onActivate?.() : undefined}
      aria-label={label}
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
  );
}
