"use client";

import * as React from "react";

export function InteractiveCursor() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const dotRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rx = 0;
    let ry = 0;
    let px = 0;
    let py = 0;
    let animId: number;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const canvas = canvasRef.current;
    if (!dot || !ring || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cw = window.innerWidth;
    let ch = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      cw = window.innerWidth;
      ch = window.innerHeight;
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const sparks: { x: number; y: number; vx: number; vy: number; l: number; c: string }[] = [];
    const colors = ["#fd9150", "#8478e0", "#5cc8f0", "#5750a8", "#ef7a5e"];

    const onPointerDown = (e: PointerEvent) => {
      for (let i = 0; i < 10; i++) {
        const a = Math.random() * Math.PI * 2;
        const v = 1.5 + Math.random() * 4;
        sparks.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(a) * v,
          vy: Math.sin(a) * v,
          l: 1,
          c: colors[i % colors.length],
        });
      }
    };
    window.addEventListener("pointerdown", onPointerDown);

    const onPointerMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
      dot.style.transform = `translate(${px}px, ${py}px)`;
    };
    window.addEventListener("pointermove", onPointerMove);

    const onPointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, .so, #robot, input, textarea, select, [role='button']")) {
        ring.classList.add("big-ring");
      } else {
        ring.classList.remove("big-ring");
      }
    };
    document.addEventListener("pointerover", onPointerOver);

    const loop = () => {
      rx += (px - rx) * 0.16;
      ry += (py - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;

      ctx.clearRect(0, 0, cw, ch);
      for (let i = sparks.length - 1; i >= 0; i--) {
        const q = sparks[i];
        q.x += q.vx;
        q.y += q.vy;
        q.vx *= 0.95;
        q.vy *= 0.95;
        q.l -= 0.025;
        if (q.l <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = q.l;
        ctx.fillStyle = q.c;
        ctx.beginPath();
        ctx.arc(q.x, q.y, 3 * q.l + 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-[98] pointer-events-none"
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -mt-1 -ml-1 rounded-full bg-[#fd9150] pointer-events-none z-[99] opacity-0 transition-opacity duration-200"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 -mt-5 -ml-5 rounded-full border-[1.5px] border-[#5750a8] pointer-events-none z-[99] opacity-0 transition-[width,height,margin,background] duration-200"
        aria-hidden="true"
        style={{
          boxSizing: "border-box",
        }}
      />
      <style jsx global>{`
        .big-ring {
          width: 72px !important;
          height: 72px !important;
          margin-top: -36px !important;
          margin-left: -36px !important;
          background: rgba(132, 120, 224, 0.15) !important;
          border-color: #8478e0 !important;
        }
      `}</style>
    </>
  );
}
