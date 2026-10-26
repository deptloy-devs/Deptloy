import * as React from "react";
import { cn } from "@/lib/cn";

type CardElement = "div" | "article" | "li";

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: CardElement;
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  tone?: "card" | "raised" | "highlight";
  radius?: "card" | "panel";
}

const paddings = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-6 sm:p-8",
  xl: "p-6 sm:p-10",
} as const;

const tones = {
  card: "border-[rgba(21,19,74,0.14)] bg-white text-[var(--deep)]",
  raised: "border-[rgba(21,19,74,0.14)] bg-[var(--paper)] text-[var(--deep)]",
  highlight: "border-[var(--pur)] bg-white text-[var(--deep)] shadow-[0_14px_40px_rgba(87,80,168,0.12)]",
} as const;

export function Card({
  as: Tag = "div",
  interactive = false,
  padding = "md",
  tone = "card",
  radius = "card",
  className,
  ...props
}: CardProps) {
  return (
    <Tag
      className={cn(
        "relative border",
        tones[tone],
        paddings[padding],
        interactive &&
          "transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-[var(--pur)] hover:shadow-lg focus-within:border-[var(--pur)]",
        className
      )}
      {...props}
    />
  );
}
