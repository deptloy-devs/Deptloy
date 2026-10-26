import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
  href?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "dark" | "light" | "auto";
}

const sizes = {
  sm: { icon: "w-6 h-7", text: "text-lg" },
  md: { icon: "w-7 h-8", text: "text-2xl" },
  lg: { icon: "w-9 h-10", text: "text-3xl" },
} as const;

/** Brand new 3D isometric cube logo mark with upward orange arrow */
export function LogoMark({ className = "w-7 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="-140 -160 280 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      {/* Top face: lavender */}
      <polygon points="0,-150 130,-75 0,0 -130,-75" fill="#8478e0" />
      {/* Left lower face: deep navy */}
      <polygon points="-130,-75 0,0 0,150 -130,75" fill="#15134a" />
      {/* Right upper facet: purple */}
      <polygon points="0,0 130,-75 130,0 0,75" fill="#5750a8" />
      {/* Right lower facet: coral */}
      <polygon points="0,75 130,0 130,75 0,150" fill="#ef7a5e" />
      {/* Inner negative space facet: off-white */}
      <polygon points="-84,-44 0,-92 84,-44 84,38 4,86 -84,36" fill="#f7f5ff" />
      {/* Inner dark core */}
      <polygon points="-48,-8 0,-36 46,-8 46,26 -48,28" fill="#15134a" />
      {/* Orange arrow pointing UP */}
      <polygon points="0,-6 36,28 16,28 16,106 -16,106 -16,28 -36,28" fill="#fd9150" />
    </svg>
  );
}

export function Logo({
  className,
  href = "/",
  showText = true,
  size = "md",
  variant = "auto",
}: LogoProps) {
  const s = sizes[size];

  const textColor =
    variant === "light"
      ? "text-white"
      : variant === "dark"
      ? "text-[#15134a]"
      : "text-deep";

  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2.5 font-display font-extrabold tracking-tight transition-transform duration-200 hover:scale-[1.02]",
        textColor,
        s.text,
        className
      )}
      aria-label="Deptloy home"
    >
      <LogoMark className={s.icon} />
      {showText && <span className="font-display font-extrabold">Deptloy</span>}
    </Link>
  );
}
