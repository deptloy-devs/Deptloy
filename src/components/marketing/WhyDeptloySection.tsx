"use client";

import * as React from "react";
import { Clock, Sparkles, TrendingUp } from "lucide-react";

const benefits = [
  {
    title: "Save Time",
    desc: "Automate repetitive work.",
    icon: Clock,
    tag: "Efficiency",
    iconBg: "bg-[var(--peach)]/35 text-[var(--or)] border border-[var(--or)]/30",
    tagColor: "text-[var(--or)] bg-[var(--cream)] border border-[var(--or)]/25",
    accent: "from-[var(--or)] to-transparent",
    hoverBorder: "hover:border-[var(--or)]/50",
  },
  {
    title: "Better Experiences",
    desc: "Serve customers more efficiently.",
    icon: Sparkles,
    tag: "Frictionless",
    iconBg: "bg-[var(--mist)] text-[var(--pur)] border border-[var(--peri)]",
    tagColor: "text-[var(--pur)] bg-[var(--mist)]/70 border border-[var(--peri)]",
    accent: "from-[var(--lav)] to-transparent",
    hoverBorder: "hover:border-[var(--lav)]/60",
  },
  {
    title: "Grow Freely",
    desc: "Software that adapts with you.",
    icon: TrendingUp,
    tag: "Scalable",
    iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-200/70",
    tagColor: "text-emerald-700 bg-emerald-50 border border-emerald-200/70",
    accent: "from-[#3ccf91] to-transparent",
    hoverBorder: "hover:border-[#3ccf91]/60",
  },
];

export function WhyDeptloySection() {
  const [inView, setInView] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why"
      className="relative"
      style={{
        paddingTop: "clamp(48px, 5.5vw, 76px)",
        paddingBottom: "0",
      }}
    >
      <div className="wrap">
        {/* Concise Business Benefits Header */}
        <div className="max-w-2xl">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--pur)] bg-[var(--mist)] px-2.5 py-0.5 rounded-sm border border-[var(--peri)] inline-block">
            Why Custom Software
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--deep)] tracking-tight leading-tight mt-2">
            Built around the way you work.
          </h2>
          <p className="text-sm sm:text-base text-[var(--mute)] leading-relaxed mt-1.5 max-w-xl">
            Technology should make running your business easier, not more complicated.
          </p>
        </div>

        {/* Three Clean Visual Elements */}
        <div className="why-benefits-trio mt-6 sm:mt-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            const animClass = inView
              ? idx === 0
                ? "why-card-1"
                : idx === 1
                ? "why-card-2"
                : "why-card-3"
              : "opacity-0";

            return (
              <div
                key={b.title}
                className={`why-benefit-card bg-white border border-[var(--peri)]/70 rounded-2xl p-5 sm:p-6 relative overflow-hidden shadow-2xs hover:shadow-[0_10px_28px_rgba(87,80,168,0.06)] ${b.hoverBorder} group ${animClass}`}
              >
                {/* Subtle Ambient Accent Line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${b.accent} opacity-40 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Card Top: Icon + Micro Pill */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-9 h-9 rounded-xl ${b.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-2xs`}
                  >
                    <Icon size={17} />
                  </div>
                  <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full ${b.tagColor}`}>
                    {b.tag}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-base sm:text-lg font-bold text-[var(--deep)] tracking-tight mt-4">
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed mt-1">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
