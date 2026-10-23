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
  sm: { height: 22, width: 30, text: "text-lg" },
  md: { height: 28, width: 38, text: "text-xl" },
  lg: { height: 34, width: 46, text: "text-2xl" },
} as const;

/** Official Deptloy mark (speed lines + play-arrow D) with the wordmark. Directly sourced from deploy-logos. */
export function Logo({ className, href = "/", showText = true, size = "md" }: LogoProps) {
  const id = useId().replace(/:/g, "");
  const dGradId = `dGrad-${id}`;
  const lineGradId = `lineGrad-${id}`;
  const s = sizes[size];

  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center gap-2.5 rounded-md transition-opacity hover:opacity-90", className)}
      aria-label={`${brand.name} home`}
    >
      <svg
        width={s.width}
        height={s.height}
        viewBox="275 380 295 220"
        fill="none"
        aria-hidden="true"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          <linearGradient id={dGradId} gradientUnits="userSpaceOnUse" x1="362" y1="400" x2="560" y2="560">
            <stop offset="0%" stopColor="#5440F2" />
            <stop offset="55%" stopColor="#2F7DF8" />
            <stop offset="100%" stopColor="#14BBFF" />
          </linearGradient>
          <linearGradient id={lineGradId} gradientUnits="userSpaceOnUse" x1="285" y1="440" x2="404" y2="540">
            <stop offset="0%" stopColor="#5143F0" />
            <stop offset="100%" stopColor="#4466F4" />
          </linearGradient>
        </defs>

        {/* Speed lines */}
        <rect x="315" y="442" width="81" height="22" rx="11" fill={`url(#${lineGradId})`} />
        <rect x="285" y="481" width="103" height="21" rx="10.5" fill={`url(#${lineGradId})`} />
        <rect x="332" y="520" width="72" height="21" rx="10.5" fill={`url(#${lineGradId})`} />

        {/* D mark with play-arrow cutout */}
        <path
          fill={`url(#${dGradId})`}
          d="M 372,390 H 460 A 100,100 0 0 1 460,590 H 380 Q 370,590 370,580 V 565 Q 370,555 380,555 H 424 Q 431,555 437,550 L 500,498 Q 508,490 500,482 L 437,431 Q 431,425 424,425 H 372 Q 362,425 362,415 V 400 Q 362,390 372,390 Z"
        />
      </svg>

      {showText && (
        <span className={cn("font-display font-semibold tracking-tight text-fg", s.text)}>{brand.name}</span>
      )}
    </Link>
  );
}
