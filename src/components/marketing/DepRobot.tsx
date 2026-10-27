"use client";

import * as React from "react";
import { smoothLevel } from "@/lib/voice-demo/audio";
import { ease, mouthGeometry, mouthShape, voiceFeatures, type MouthShape } from "@/lib/voice-demo/mouth";

/** Live voice levels, read every frame. Same shape as LiveCall's `levels`. */
export type DepVoiceLevels = {
  agent(): number;
  caller(): number;
  agentSpectrum?(): { db: Float32Array; sampleRate: number } | null;
};

type DepRobotProps = {
  /** When set, Dep lip-syncs to `agent()` and looks like it's listening on `caller()`. */
  voice?: DepVoiceLevels | null;
  /** Makes Dep a button (the home page opens the chat). */
  onActivate?: () => void;
  label?: string;
  style?: React.CSSProperties;
};

const CLOSED: MouthShape = { open: 0, wide: 0, round: 0 };
/** Shown while talking when the visitor prefers reduced motion: open, but still. */
const STILL_TALKING: MouthShape = { open: 0.45, wide: 0, round: 0 };
/** Dep counts as talking until this long after its voice stops, so the smile doesn't flash between words. */
const PAUSE_MS = 300;
/** At most one end-of-sentence blink this often, so pauses don't turn into fluttering. */
const BLINK_GAP_MS = 2500;

type MouthParts = {
  hole: SVGRectElement;
  lip: SVGRectElement;
  clip: SVGRectElement;
  tongue: SVGEllipseElement;
};

function drawMouth(parts: MouthParts, shape: MouthShape) {
  const g = mouthGeometry(shape);
  for (const rect of [parts.hole, parts.lip, parts.clip]) {
    rect.setAttribute("x", g.x.toFixed(2));
    rect.setAttribute("y", g.y.toFixed(2));
    rect.setAttribute("width", g.width.toFixed(2));
    rect.setAttribute("height", g.height.toFixed(2));
    rect.setAttribute("rx", g.rx.toFixed(2));
  }
  parts.tongue.setAttribute("cy", (g.y + g.height * 0.9).toFixed(2));
  parts.tongue.setAttribute("rx", (g.width * 0.32).toFixed(2));
  parts.tongue.setAttribute("ry", (g.height * 0.32).toFixed(2));
  parts.tongue.setAttribute("opacity", g.height > 9 ? "1" : "0");
}

/**
 * Dep, the Deptloy mascot. Its idle motion (bob, wave, blink, eye tracking)
 * lives in design.css. On a call, Dep's mouth takes the shape of each sound
 * ("ah", "oh", "oo", "ee", closed), its head nods on stressed words, and it
 * blinks at the end of a sentence. None of this touches the body's own animation.
 */
export function DepRobot({ voice, onActivate, label, style }: DepRobotProps) {
  const robotRef = React.useRef<SVGSVGElement>(null);
  const eyesRef = React.useRef<SVGGElement>(null);
  const headRef = React.useRef<SVGGElement>(null);
  const holeRef = React.useRef<SVGRectElement>(null);
  const lipRef = React.useRef<SVGRectElement>(null);
  const clipRectRef = React.useRef<SVGRectElement>(null);
  const tongueRef = React.useRef<SVGEllipseElement>(null);
  const clipId = `dep-mouth-${React.useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

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

  // Lip sync and talking gestures, every animation frame.
  React.useEffect(() => {
    const svg = robotRef.current;
    const head = headRef.current;
    const hole = holeRef.current;
    const lip = lipRef.current;
    const clip = clipRectRef.current;
    const tongue = tongueRef.current;
    if (!svg || !head || !hole || !lip || !clip || !tongue || !voice) return;
    const parts = { hole, lip, clip, tongue };
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let shape = CLOSED;
    let ear = 0;
    let speaking = false;
    let listening = false;
    let lastVoiceAt = -Infinity;
    let talkiness = 0;
    let slowLevel = 0;
    let nod = 0;
    let nodSide = 1;
    let lastNodAt = 0;
    let blinkTimer: ReturnType<typeof setTimeout> | undefined;
    let lastBlinkAt = -Infinity;
    let last = performance.now();
    let frame = 0;
    svg.classList.add("dep-live");

    const step = (now: number) => {
      const elapsed = Math.min(100, now - last);
      last = now;

      // Mouth: loudness opens it, the sound shapes it. Opens fast, closes a bit slower.
      const level = voice.agent();
      const spectrum = voice.agentSpectrum?.() ?? null;
      const target = mouthShape(level, spectrum ? voiceFeatures(spectrum.db, spectrum.sampleRate) : null);
      shape = {
        open: ease(shape.open, target.open, elapsed, target.open > shape.open ? 35 : 80),
        wide: ease(shape.wide, target.wide, elapsed, 70),
        round: ease(shape.round, target.round, elapsed, 70),
      };

      if (shape.open > 0.08) lastVoiceAt = now;
      const nowSpeaking = now - lastVoiceAt < PAUSE_MS;
      if (nowSpeaking !== speaking) {
        speaking = nowSpeaking;
        svg.classList.toggle("speaking", speaking);
        // A blink at the end of a sentence.
        if (!speaking && !reduceMotion && now - lastBlinkAt > BLINK_GAP_MS) {
          lastBlinkAt = now;
          svg.classList.add("dep-blink");
          clearTimeout(blinkTimer);
          blinkTimer = setTimeout(() => svg.classList.remove("dep-blink"), 240);
        }
      }

      ear = smoothLevel(ear, voice.caller(), elapsed);
      const nowListening = !speaking && (listening ? ear > 0.012 : ear > 0.025);
      if (nowListening !== listening) {
        listening = nowListening;
        svg.classList.toggle("listening", listening);
      }

      drawMouth(parts, reduceMotion ? (speaking ? STILL_TALKING : CLOSED) : shape);

      if (!reduceMotion) {
        // A small nod on stressed words (a sudden jump in loudness), alternating sides, plus a gentle sway.
        slowLevel = ease(slowLevel, level, elapsed, 250);
        if (speaking && level - slowLevel > 0.04 && now - lastNodAt > 400) {
          nod = 1;
          nodSide = -nodSide;
          lastNodAt = now;
        }
        nod *= Math.exp(-elapsed / 220);
        talkiness = ease(talkiness, speaking ? 1 : 0, elapsed, 300);
        const tilt = nodSide * nod * 1.8 + Math.sin(now / 850) * 0.9 * talkiness;
        head.style.transform = `translate(0px, ${(nod * 2).toFixed(2)}px) rotate(${tilt.toFixed(2)}deg)`;
      }

      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(blinkTimer);
      svg.classList.remove("dep-live", "speaking", "listening", "dep-blink");
      head.style.removeProperty("transform");
      drawMouth(parts, CLOSED);
    };
  }, [voice]);

  const interactive = Boolean(onActivate);
  const closed = mouthGeometry(CLOSED);

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

      <g className="dep-head" ref={headRef}>
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

        {/* The talking mouth. DepRobot reshapes it every frame during a call. */}
        <g className="mouth">
          <defs>
            <clipPath id={clipId}>
              <rect ref={clipRectRef} {...closed} />
            </clipPath>
          </defs>
          <rect ref={holeRef} {...closed} fill="#2a0f2e" />
          <ellipse ref={tongueRef} cx="150" cy="146" rx="0" ry="0" fill="#f7b8c9" opacity="0" clipPath={`url(#${clipId})`} />
          <rect ref={lipRef} {...closed} fill="none" stroke="#fd9150" strokeWidth="2.4" />
        </g>
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
