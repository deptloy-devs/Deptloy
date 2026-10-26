import Link from "next/link";
import { cn } from "@/lib/cn";
import { brand } from "@/lib/site";

interface LogoProps {
  className?: string;
  href?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { width: 22, height: 25, text: "text-lg", gap: "gap-2" },
  md: { width: 28, height: 32, text: "text-2xl", gap: "gap-2.5" },
  lg: { width: 34, height: 39, text: "text-3xl", gap: "gap-3" },
} as const;

/**
 * Deptloy Hexagonal 3D Portal Mark & Wordmark
 * Derived from the official design system:
 * - Top facet: #8478e0 (lavender)
 * - Left facet: #15134a (deep navy)
 * - Right upper facet: #5750a8 (iris purple)
 * - Right lower facet: #ef7a5e (coral)
 * - Inner portal: #f7f5ff
 * - Inner cavity: #15134a
 * - Upward launch arrow: #fd9150 (orange)
 */
export function Logo({
  className,
  href = "/",
  showText = true,
  size = "md",
}: LogoProps) {
  const s = sizes[size];

  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center transition-transform duration-200 active:scale-95",
        s.gap,
        className
      )}
      aria-label={`${brand.name} home`}
    >
      <svg
        width={s.width}
        height={s.height}
        viewBox="-140 -160 280 320"
        fill="none"
        aria-hidden="true"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      >
        {/* Top facet */}
        <polygon points="0,-150 130,-75 0,0 -130,-75" fill="#8478e0" />
        {/* Left facet */}
        <polygon points="-130,-75 0,0 0,150 -130,75" fill="#15134a" />
        {/* Right upper facet */}
        <polygon points="0,0 130,-75 130,0 0,75" fill="#5750a8" />
        {/* Right lower facet */}
        <polygon points="0,75 130,0 130,75 0,150" fill="#ef7a5e" />
        {/* Inner portal frame */}
        <polygon
          points="-84,-44 0,-92 84,-44 84,38 4,86 -84,36"
          fill="#f7f5ff"
        />
        {/* Inner shadow/cavity */}
        <polygon
          points="-48,-8 0,-36 46,-8 46,26 -48,28"
          fill="#15134a"
        />
        {/* Upward launcher arrow */}
        <polygon
          points="0,-6 36,28 16,28 16,106 -16,106 -16,28 -36,28"
          fill="#fd9150"
        />
      </svg>

      {showText && (
        <span
          className={cn(
            "font-archivo font-extrabold tracking-[-0.04em] text-[var(--deep)] dark:text-white transition-colors",
            s.text
          )}
        >
          {brand.name}
        </span>
      )}
    </Link>
  );
}
