import { useId } from "react";
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
  sm: { icon: 24, text: "text-lg" },
  md: { icon: 30, text: "text-xl" },
  lg: { icon: 38, text: "text-2xl" },
} as const;

/** Deptloy mark (speed lines + D) with the wordmark. Colors sampled from the logo file. */
export function Logo({ className, href = "/", showText = true, size = "md" }: LogoProps) {
  const gradientId = `logo-grad-${useId().replace(/:/g, "")}`;
  const s = sizes[size];

  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center gap-2.5 rounded-md transition-opacity hover:opacity-90", className)}
      aria-label={`${brand.name} home`}
    >
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="10" x2="60" y2="54" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4840F5" />
            <stop offset="50%" stopColor="#376FF8" />
            <stop offset="100%" stopColor="#1EBBFE" />
          </linearGradient>
        </defs>
        <rect x="8" y="21" width="11" height="4.5" rx="2.25" fill={`url(#${gradientId})`} />
        <rect x="4" y="29.75" width="16" height="4.5" rx="2.25" fill={`url(#${gradientId})`} />
        <rect x="10" y="38.5" width="10" height="4.5" rx="2.25" fill={`url(#${gradientId})`} />
        <path
          d="M26 16.5C26 14.567 27.567 13 29.5 13H36C45.3888 13 53 20.6112 53 30C53 39.3888 45.3888 47 36 47H29.5C27.567 47 26 45.433 26 43.5V37C26 35.8954 26.8954 35 28 35H35.5C38.2614 35 40.5 32.7614 40.5 30C40.5 27.2386 38.2614 25 35.5 25H28C26.8954 25 26 24.1046 26 23V16.5Z"
          fill={`url(#${gradientId})`}
        />
      </svg>

      {showText && (
        <span className={cn("font-display font-semibold tracking-tight text-fg", s.text)}>{brand.name}</span>
      )}
    </Link>
  );
}
