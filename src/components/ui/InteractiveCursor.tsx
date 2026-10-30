"use client";

import * as React from "react";

/** Things you can click: Dep gets happy eyes over them. */
const CLICKABLE = "a, button, select, summary, label[for], .so, #robot, [role='button']";
/** Over text fields the normal text cursor comes back (see .dc in design.css), so people see where they type. */
const TYPING =
  "input:not([type='button'], [type='submit'], [type='checkbox'], [type='radio'], [type='range']), textarea, [contenteditable='true']";
/** A pointy-top hexagon in a 100x100 box: the shape of the Deptloy mark, used for the pointer and the sparks. */
const HEX = "50,4 90,27 90,73 50,96 10,73 10,27";
const SPARK_COLORS = ["#fd9150", "#8478e0", "#5cc8f0", "#ef7a5e"];
/** Where Dep floats: below and to the right of the pointer, so he never covers what you point at. */
const OFFSET_X = 30;
const OFFSET_Y = 34;

type Spark = { x: number; y: number; vx: number; vy: number; r: number; rot: number; spin: number; life: number; color: string };
type Ping = { x: number; y: number; life: number };

function hexPath(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, rot: number) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = rot + (Math.PI / 3) * i - Math.PI / 2;
    ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
  }
  ctx.closePath();
}

export function InteractiveCursor() {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const dotRef = React.useRef<HTMLDivElement>(null);
  const botRef = React.useRef<HTMLDivElement>(null);
  const lookRef = React.useRef<SVGGElement>(null);

  React.useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = rootRef.current;
    const dot = dotRef.current;
    const bot = botRef.current;
    const look = lookRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !dot || !bot || !look || !canvas || !ctx) return;

    // Only now hide the system cursor, so it never goes missing if this doesn't run.
    document.documentElement.classList.add("dc-on");

    let px = 0;
    let py = 0;
    let bx = 0;
    let by = 0;
    let tilt = 0;
    let lookX = 0;
    let lookY = 0;
    let bob = 0;
    let lastMove = 0;
    let seen = false;
    let painted = false;
    let animId = 0;
    let blinkTimer = 0;
    const sparks: Spark[] = [];
    const pings: Ping[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cw = 0;
    let ch = 0;

    const resize = () => {
      cw = window.innerWidth;
      ch = window.innerHeight;
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const set = (key: "on" | "state" | "press" | "blink", value: string) => {
      if (root.dataset[key] !== value) root.dataset[key] = value;
    };

    const blink = () => {
      set("blink", "1");
      window.setTimeout(() => set("blink", ""), 140);
      blinkTimer = window.setTimeout(blink, 2500 + Math.random() * 3500);
    };
    blinkTimer = window.setTimeout(blink, 2000);

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return set("on", "");
      px = e.clientX;
      py = e.clientY;
      lastMove = performance.now();
      if (!seen) {
        // start Dep beside the pointer instead of flying in from the corner
        bx = px + OFFSET_X;
        by = py + OFFSET_Y;
        seen = true;
      }
      dot.style.transform = `translate3d(${px}px, ${py}px, 0)`;
      set("on", "1");
    };

    const onPointerOver = (e: PointerEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      const clickable = target?.closest(CLICKABLE);
      set("state", target?.closest(TYPING) ? "type" : clickable && !clickable.matches(":disabled") ? "link" : "");
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      set("press", "1");
      pings.push({ x: e.clientX, y: e.clientY, life: 1 });
      for (let i = 0; i < 8; i++) {
        const a = (Math.PI * 2 * i) / 8 + Math.random() * 0.5;
        const v = 2 + Math.random() * 3.5;
        sparks.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(a) * v,
          vy: Math.sin(a) * v,
          r: 2.5 + Math.random() * 2.5,
          rot: Math.random() * Math.PI,
          spin: (Math.random() - 0.5) * 0.3,
          life: 1,
          color: SPARK_COLORS[i % SPARK_COLORS.length],
        });
      }
    };
    const onPointerUp = () => set("press", "");

    // Leaving the window (or moving into an embedded frame) has no related element.
    const onMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget) set("on", "");
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("mouseout", onMouseOut);

    const loop = (now: number) => {
      const tx = px + OFFSET_X;
      const ty = py + OFFSET_Y;
      bx += (tx - bx) * 0.14;
      by += (ty - by) * 0.14;
      // Dep leans the way he's being pulled, and bobs gently once the mouse rests
      tilt += (Math.max(-22, Math.min(22, (tx - bx) * 0.8)) - tilt) * 0.15;
      bob += ((now - lastMove > 600 ? 1 : 0) - bob) * 0.05;
      bot.style.transform = `translate3d(${bx}px, ${by + Math.sin(now / 450) * 2.5 * bob}px, 0) rotate(${tilt}deg)`;

      // his eyes follow the pointer
      const dx = px - bx;
      const dy = py - by;
      const dist = Math.hypot(dx, dy) || 1;
      lookX += ((dx / dist) * 9 - lookX) * 0.2;
      lookY += ((dy / dist) * 6 - lookY) * 0.2;
      look.setAttribute("transform", `translate(${lookX.toFixed(2)} ${lookY.toFixed(2)})`);

      if (sparks.length || pings.length || painted) {
        ctx.clearRect(0, 0, cw, ch);
        for (let i = pings.length - 1; i >= 0; i--) {
          const p = pings[i];
          p.life -= 0.05;
          if (p.life <= 0) {
            pings.splice(i, 1);
            continue;
          }
          ctx.globalAlpha = p.life;
          ctx.strokeStyle = "#fd9150";
          ctx.lineWidth = 1.5;
          hexPath(ctx, p.x, p.y, 10 + (1 - p.life) * 30, 0);
          ctx.stroke();
        }
        for (let i = sparks.length - 1; i >= 0; i--) {
          const q = sparks[i];
          q.x += q.vx;
          q.y += q.vy;
          q.vx *= 0.93;
          q.vy *= 0.93;
          q.rot += q.spin;
          q.life -= 0.028;
          if (q.life <= 0) {
            sparks.splice(i, 1);
            continue;
          }
          ctx.globalAlpha = q.life;
          ctx.fillStyle = q.color;
          hexPath(ctx, q.x, q.y, q.r * (0.4 + 0.6 * q.life), q.rot);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        painted = sparks.length > 0 || pings.length > 0;
      }

      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove("dc-on");
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(animId);
      clearTimeout(blinkTimer);
    };
  }, []);

  return (
    <div ref={rootRef} className="dc" aria-hidden="true">
      <canvas ref={canvasRef} className="dc-fx" />

      {/* A mini Dep: the home page robot's head, drawn the same way (DepRobot.tsx). */}
      <div ref={botRef} className="dc-bot">
        <svg viewBox="34 6 232 194">
          <line x1="150" y1="52" x2="150" y2="28" stroke="#5750a8" strokeWidth="6" strokeLinecap="round" />
          <circle className="dc-glow" cx="150" cy="22" r="11" fill="#fd9150" />
          <circle cx="54" cy="122" r="17" fill="#8478e0" />
          <circle cx="246" cy="122" r="17" fill="#8478e0" />
          <rect x="62" y="50" width="176" height="146" rx="60" fill="url(#hd)" stroke="#d5cffa" strokeWidth="4" />
          <rect x="82" y="72" width="136" height="100" rx="40" fill="#15134a" />
          <g ref={lookRef}>
            <g className="dc-eyes">
              <g className="dc-blink">
                <rect x="110" y="96" width="24" height="34" rx="12" fill="#bfe3f5" />
                <rect x="166" y="96" width="24" height="34" rx="12" fill="#bfe3f5" />
              </g>
            </g>
            {/* happy ^ ^ eyes, over things you can click */}
            <g className="dc-happy" stroke="#bfe3f5" strokeWidth="9" fill="none" strokeLinecap="round">
              <path d="M108 122q14-22 28 0" />
              <path d="M164 122q14-22 28 0" />
            </g>
          </g>
          <circle cx="100" cy="146" r="9" fill="#f7b8c9" opacity=".75" />
          <circle cx="200" cy="146" r="9" fill="#f7b8c9" opacity=".75" />
          <path className="dc-smile" d="M132 148q18 15 36 0" stroke="#fd9150" strokeWidth="7" fill="none" strokeLinecap="round" />
          {/* a little "wow" while the mouse button is down */}
          <ellipse className="dc-wow" cx="150" cy="152" rx="9" ry="10" fill="#2a0f2e" stroke="#fd9150" strokeWidth="4" />
        </svg>
      </div>

      <div ref={dotRef} className="dc-dot">
        <svg viewBox="0 0 100 100">
          <polygon points={HEX} />
        </svg>
      </div>
    </div>
  );
}
