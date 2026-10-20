"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { brand } from "@/lib/site";

interface LogoProps {
  className?: string;
  href?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  useImage?: boolean;
}

export function Logo({
  className,
  href = "/",
  showText = true,
  size = "md",
  useImage = false,
}: LogoProps) {
  const sizeMap = {
    sm: { height: 26, width: 95, iconSize: 24, textSize: "text-lg" },
    md: { height: 32, width: 125, iconSize: 30, textSize: "text-xl" },
    lg: { height: 40, width: 160, iconSize: 38, textSize: "text-2xl" },
  };

  const current = sizeMap[size];

  // If useImage is requested, render the official cropped logo
  if (useImage) {
    return (
      <Link
        href={href}
        className={cn("inline-flex items-center gap-2 group transition-opacity hover:opacity-90", className)}
        aria-label={`${brand.name} home`}
      >
        <div className="relative h-9 w-36 overflow-hidden rounded-md">
          <Image
            src="/logo-cropped.jpg"
            alt={brand.name}
            fill
            className="object-contain object-left"
            priority
          />
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn("inline-flex items-center gap-2.5 group transition-opacity hover:opacity-90", className)}
      aria-label={`${brand.name} home`}
    >
      {/* Precision Vector Emblem matching the provided Deptloy mark */}
      <div className="relative flex items-center justify-center">
        <svg
          width={current.iconSize}
          height={current.iconSize}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            <linearGradient id="deptloyIconGrad" x1="0" y1="10" x2="60" y2="54" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="45%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
            <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Speed bars */}
          <rect x="8" y="21" width="11" height="4.5" rx="2.25" fill="url(#deptloyIconGrad)" />
          <rect x="4" y="29.75" width="16" height="4.5" rx="2.25" fill="url(#deptloyIconGrad)" />
          <rect x="10" y="38.5" width="10" height="4.5" rx="2.25" fill="url(#deptloyIconGrad)" />

          {/* D / Rocket Arrow Head */}
          <path
            d="M26 16.5C26 14.567 27.567 13 29.5 13H36C45.3888 13 53 20.6112 53 30C53 39.3888 45.3888 47 36 47H29.5C27.567 47 26 45.433 26 43.5V37C26 35.8954 26.8954 35 28 35H35.5C38.2614 35 40.5 32.7614 40.5 30C40.5 27.2386 38.2614 25 35.5 25H28C26.8954 25 26 24.1046 26 23V16.5Z"
            fill="url(#deptloyIconGrad)"
          />
        </svg>
      </div>

      {showText && (
        <span
          className={cn(
            "font-bold tracking-tight text-white transition-colors duration-200",
            current.textSize
          )}
        >
          {brand.name}
        </span>
      )}
    </Link>
  );
}
