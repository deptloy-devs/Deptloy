"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useDepChat } from "./DepChat";
import { LogoMark } from "@/components/ui/Logo";

export function Hero() {
  const { openChat } = useDepChat();
  const [bubbleText, setBubbleText] = React.useState("");
  const [eyesPos, setEyesPos] = React.useState({ x: 0, y: 0 });
  const robotRef = React.useRef<SVGSVGElement>(null);

  // Typewriter effect for Dep speech bubble
  React.useEffect(() => {
    const fullText = "Hi, I’m Dep! Ask me anything about Deptloy.";
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setBubbleText(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(interval);
    }, 38);
    return () => clearInterval(interval);
  }, []);

  // Eye tracking towards pointer
  React.useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!robotRef.current) return;
      const rect = robotRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height * 0.35;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const k = Math.min(6, dist / 35);
      setEyesPos({ x: (dx / dist) * k, y: (dy / dist) * k });
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section className="relative min-h-[92svh] flex items-center pt-28 pb-16 lg:py-28 overflow-hidden bg-[radial-gradient(50%_62%_at_74%_50%,#fff,rgba(255,255,255,0)_72%),linear-gradient(180deg,#e9e6fb_0,#f4f3fb_72%,#f4f3fb)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Headline and Actions */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          <h1 className="font-display font-extrabold text-[42px] sm:text-[64px] lg:text-[84px] tracking-tight leading-[0.98] text-[#15134a]">
            <span className="block overflow-hidden pb-1">
              <span className="block transform translate-y-0 animate-[up_1.1s_cubic-bezier(0.2,0.8,0.2,1)_forwards]">
                Software built
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="block bg-gradient-to-r from-[#5750a8] via-[#ef7a5e] to-[#fd9150] bg-clip-text text-transparent transform translate-y-0 animate-[up_1.1s_cubic-bezier(0.2,0.8,0.2,1)_0.1s_forwards]">
                to outlast
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="block transform translate-y-0 animate-[up_1.1s_cubic-bezier(0.2,0.8,0.2,1)_0.2s_forwards]">
                the hype.
              </span>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base sm:text-lg text-[#5c5a86] font-normal leading-relaxed">
            We combine AI, CRM, automation and custom apps into one system built around your business, then maintain
            it so it keeps working for years.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/contact" className="btn-chamfer">
              Book a call
            </Link>
            <Link href="#services" className="btn-chamfer ghost">
              Explore services
            </Link>
          </div>
        </div>

        {/* Right Column: Dep Interactive Assistant Visual */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[440px] sm:min-h-[520px]">
          {/* Radial layered pulsing disc */}
          <div className="absolute w-[320px] sm:w-[420px] aspect-square rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff,#d2cdf3_55%,#f6dcc8)] shadow-[0_40px_90px_rgba(87,80,168,0.22)]">
            <div className="absolute -inset-[5%] rounded-full border-[1.5px] border-dashed border-[rgba(87,80,168,0.35)] animate-[spin_40s_linear_infinite]" />
            <div className="absolute -inset-[14%] rounded-full border-[1.5px] border-dashed border-[rgba(253,145,80,0.45)] animate-[spin_60s_linear_infinite_reverse]" />
          </div>

          {/* Speech Bubble */}
          <div className="absolute top-2 left-0 sm:left-4 z-20 max-w-[220px] sm:max-w-[250px] bg-white rounded-[22px_22px_22px_6px] p-3.5 sm:p-4 text-xs sm:text-sm font-bold text-[#15134a] shadow-[0_14px_40px_rgba(87,80,168,0.2)]">
            <span>{bubbleText}</span>
            <span className="inline-block w-0.5 h-3 bg-[#fd9150] ml-1 align-baseline animate-[cb_1s_steps(2)_infinite]" />
          </div>

          {/* Floating Proof Badges */}
          <div className="absolute top-[18%] right-0 z-20 bg-white rounded-xl px-3 py-2 text-xs font-bold text-[#15134a] shadow-[0_12px_30px_rgba(87,80,168,0.18)] flex items-center gap-2 animate-[fl_5s_ease-in-out_infinite]">
            <span className="w-2 h-2 rounded-full bg-[#3ccf91]" />
            Call answered in 2 rings
          </div>

          <div className="absolute top-[58%] -left-2 sm:left-0 z-20 bg-white rounded-xl px-3 py-2 text-xs font-bold text-[#15134a] shadow-[0_12px_30px_rgba(87,80,168,0.18)] flex items-center gap-2 animate-[fl_5s_ease-in-out_infinite_1.5s]">
            <span className="w-2 h-2 rounded-full bg-[#fd9150]" />
            Booked Thu 2:30 PM
          </div>

          <div className="absolute bottom-[16%] right-0 z-20 bg-white rounded-xl px-3 py-2 text-xs font-bold text-[#15134a] shadow-[0_12px_30px_rgba(87,80,168,0.18)] flex items-center gap-2 animate-[fl_5s_ease-in-out_infinite_3s]">
            <span className="w-2 h-2 rounded-full bg-[#8478e0]" />
            Lead saved to CRM
          </div>

          {/* Dep Robot SVG Character */}
          <svg
            ref={robotRef}
            viewBox="0 0 300 340"
            role="button"
            tabIndex={0}
            onClick={() => openChat()}
            onKeyDown={(e) => e.key === "Enter" && openChat()}
            aria-label="Chat with Dep, the Deptloy assistant"
            className="relative w-[240px] sm:w-[310px] cursor-pointer z-10 filter drop-shadow-[0_24px_24px_rgba(21,19,74,0.22)] animate-[bob_4s_ease-in-out_infinite]"
          >
            <defs>
              <linearGradient id="hd" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fff" />
                <stop offset="1" stopColor="#d5cffa" />
              </linearGradient>
              <linearGradient id="bd" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#8478e0" />
                <stop offset="1" stopColor="#5750a8" />
              </linearGradient>
            </defs>

            {/* Shadow */}
            <ellipse cx="150" cy="326" rx="70" ry="9" fill="#15134a" opacity="0.12" />

            {/* Antenna with glow */}
            <line x1="150" y1="52" x2="150" y2="28" stroke="#5750a8" strokeWidth="5" strokeLinecap="round" />
            <circle cx="150" cy="22" r="9" fill="#fd9150" className="animate-[pls_1.6s_ease-in-out_infinite]" />

            {/* Ears */}
            <circle cx="54" cy="122" r="16" fill="#8478e0" />
            <circle cx="246" cy="122" r="16" fill="#8478e0" />

            {/* Head outer */}
            <rect x="62" y="50" width="176" height="146" rx="60" fill="url(#hd)" stroke="#d5cffa" strokeWidth="3" />

            {/* Visor face */}
            <rect x="82" y="72" width="136" height="100" rx="40" fill="#15134a" />

            {/* Eye screen with interactive tracking */}
            <g style={{ transform: `translate(${eyesPos.x}px, ${eyesPos.y}px)` }}>
              <rect x="112" y="98" width="20" height="30" rx="10" fill="#bfe3f5" className="animate-[blink_5s_infinite]" />
              <rect x="168" y="98" width="20" height="30" rx="10" fill="#bfe3f5" className="animate-[blink_5s_infinite]" />
            </g>

            {/* Cheeks */}
            <circle cx="100" cy="144" r="8" fill="#f7b8c9" opacity="0.7" />
            <circle cx="200" cy="144" r="8" fill="#f7b8c9" opacity="0.7" />

            {/* Smile */}
            <path d="M130 146q20 16 40 0" stroke="#fd9150" strokeWidth="5" fill="none" strokeLinecap="round" />

            {/* Torso */}
            <rect x="96" y="198" width="108" height="100" rx="42" fill="url(#bd)" />

            {/* Chest Logo: Deptloy 3D cube */}
            <g transform="translate(133, 230) scale(0.12)">
              <polygon points="0,-150 130,-75 0,0 -130,-75" fill="#f7f5ff" />
              <polygon points="-130,-75 0,0 0,150 -130,75" fill="#15134a" />
              <polygon points="0,0 130,-75 130,0 0,75" fill="#d2cdf3" />
              <polygon points="0,75 130,0 130,75 0,150" fill="#fd9150" />
            </g>

            {/* Left arm */}
            <path d="M96 222q-30 14-26 52" stroke="#8478e0" strokeWidth="20" fill="none" strokeLinecap="round" />

            {/* Right waving arm */}
            <g className="origin-[206px_222px] animate-[wave_3.6s_ease-in-out_infinite]">
              <path d="M206 222q34 8 40 48" stroke="#8478e0" strokeWidth="20" fill="none" strokeLinecap="round" />
              <circle cx="246" cy="276" r="15" fill="#ffd8be" />
            </g>

            <ellipse cx="150" cy="306" rx="32" ry="8" fill="#fd9150" opacity="0.55" />
          </svg>

          {/* Trigger button */}
          <button
            type="button"
            onClick={() => openChat()}
            className="btn-chamfer absolute bottom-0 right-4 z-20 !py-2.5 !px-5 text-xs shadow-lg"
          >
            Chat with Dep
          </button>
        </div>
      </div>
    </section>
  );
}
