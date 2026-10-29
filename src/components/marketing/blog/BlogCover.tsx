import type * as React from "react";
import { MonitorSmartphone, PhoneCall, ShieldCheck, Sparkles, Users, Workflow, type LucideIcon } from "lucide-react";
import type { BlogCategory } from "@/lib/blog-post";

/**
 * A calm, drawn cover for a post: a soft tint and pattern for its topic, plus the
 * topic's icon. Posts on the same topic get a slightly different layout from their slug.
 */

type Pattern = (variant: number) => React.ReactNode;

const waves: Pattern = (v) => (
  <g transform={`translate(${v % 2 ? 120 : 360} ${110 + v * 14})`}>
    {[50, 95, 140, 185, 230, 275].map((r, i) => (
      <circle key={r} r={r} fill="none" stroke="currentColor" strokeWidth="2" opacity={0.5 - i * 0.07} />
    ))}
  </g>
);

const rings: Pattern = (v) => (
  <g transform={`translate(${v % 2 ? 130 : 350} 135)`}>
    {[60, 120, 180, 240, 300].map((s, i) => (
      <rect key={s} x={-s / 2} y={-s / 2} width={s} height={s} rx={s / 5} fill="none" stroke="currentColor" strokeWidth="2" opacity={0.45 - i * 0.07} />
    ))}
  </g>
);

const dots: Pattern = (v) => (
  <g>
    {Array.from({ length: 12 }, (_, col) =>
      Array.from({ length: 7 }, (_, row) => (
        <circle key={`${col}-${row}`} cx={24 + col * 40} cy={24 + row * 38} r={(col + row + v) % 5 === 0 ? 5 : 2.4} fill="currentColor" opacity={(col + row + v) % 5 === 0 ? 0.45 : 0.22} />
      ))
    )}
  </g>
);

const flow: Pattern = (v) => {
  const nodes = [
    [70, 70 + v * 10],
    [230, 150 - v * 8],
    [390, 80 + v * 12],
    [300, 225],
  ];
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2">
      <path d={`M${nodes[0][0]} ${nodes[0][1]} L${nodes[1][0]} ${nodes[1][1]} L${nodes[2][0]} ${nodes[2][1]} M${nodes[1][0]} ${nodes[1][1]} L${nodes[3][0]} ${nodes[3][1]}`} opacity="0.35" strokeDasharray="6 7" />
      {nodes.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x - 38} y={y - 20} width="76" height="40" rx="12" fill="#fff" fillOpacity="0.55" opacity="0.6" />
      ))}
    </g>
  );
};

const cards: Pattern = (v) => (
  <g>
    {Array.from({ length: 6 }, (_, col) =>
      Array.from({ length: 4 }, (_, row) => (
        <rect key={`${col}-${row}`} x={30 + col * 74} y={22 + row * 62} width="58" height="44" rx="10" fill="currentColor" opacity={(col * 3 + row + v) % 4 === 0 ? 0.32 : 0.12} />
      ))
    )}
  </g>
);

const windows: Pattern = (v) => (
  <g fill="none" stroke="currentColor" strokeWidth="2">
    {[0, 1, 2].map((i) => {
      const x = (v % 2 ? 40 : 170) + i * 60;
      const y = 40 + i * 50;
      return (
        <g key={i} opacity={0.5 - i * 0.12}>
          <rect x={x} y={y} width="240" height="150" rx="14" fill="#fff" fillOpacity="0.35" />
          <path d={`M${x} ${y + 28} H${x + 240}`} />
          {[0, 1, 2].map((d) => (
            <circle key={d} cx={x + 18 + d * 14} cy={y + 14} r="3.5" fill="currentColor" stroke="none" />
          ))}
        </g>
      );
    })}
  </g>
);

const LOOK: Record<BlogCategory, { icon: LucideIcon; tone: string; pattern: Pattern }> = {
  "AI Receptionists": { icon: PhoneCall, tone: "lav", pattern: waves },
  Automation: { icon: Workflow, tone: "peach", pattern: flow },
  "Customers & CRM": { icon: Users, tone: "mist", pattern: cards },
  "Websites & Apps": { icon: MonitorSmartphone, tone: "coral", pattern: windows },
  "AI for Business": { icon: Sparkles, tone: "sky", pattern: dots },
  "Privacy & Security": { icon: ShieldCheck, tone: "mint", pattern: rings },
};

function variantOf(slug: string): number {
  let hash = 0;
  for (const char of slug) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return hash % 4;
}

type CoverProps = { category: BlogCategory; slug: string; size?: "card" | "large"; badge?: string };

export function BlogCover({ category, slug, size = "card", badge }: CoverProps) {
  const { icon: Icon, tone, pattern } = LOOK[category];
  return (
    <div className={`bl-cover ${size}`} data-tone={tone}>
      <svg viewBox="0 0 480 270" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {pattern(variantOf(slug))}
      </svg>
      {badge && <span className="bl-cover-badge">{badge}</span>}
      <span className="bl-cover-icon" aria-hidden="true">
        <Icon />
      </span>
    </div>
  );
}
