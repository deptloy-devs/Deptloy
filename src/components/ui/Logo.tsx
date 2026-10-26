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
      width={28}
      height={32}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      style={{ width: "28px", height: "32px", display: "inline-block" }}
      aria-hidden="true"
    >
      <use href="#mk" />
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
