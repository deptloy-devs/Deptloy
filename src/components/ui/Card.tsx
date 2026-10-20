import * as React from "react";
import { cn } from "@/lib/cn";

type CardElement = "div" | "article" | "li";

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: CardElement;
  /** Lift + brand border on hover. Use when the whole card is clickable. */
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  tone?: "card" | "raised";
}

const paddings = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-6 sm:p-8",
} as const;

/** Standard surface for content blocks. */
export function Card({
  as: Tag = "div",
  interactive = false,
  padding = "md",
  tone = "card",
  className,
  ...props
}: CardProps) {
  return (
    <Tag
      className={cn(
        "relative rounded-card border border-line shadow-card",
        tone === "raised" ? "bg-raised" : "bg-card",
        paddings[padding],
        interactive &&
          "transition-[transform,border-color,box-shadow] duration-200 ease-out-soft hover:-translate-y-0.5 hover:border-brand-400/35 hover:shadow-raised focus-within:border-brand-400/35",
        className
      )}
      {...props}
    />
  );
}
