import * as React from "react";
import { cn } from "@/lib/cn";

const widths = {
  default: "max-w-7xl",
  wide: "max-w-[90rem]",
  narrow: "max-w-5xl",
  prose: "max-w-3xl",
} as const;

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: keyof typeof widths;
}

/** Centered page column with the site-wide side gutters (16 / 24 / 32px). */
export function Container({ size = "default", className, ...props }: ContainerProps) {
  return <div className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", widths[size], className)} {...props} />;
}
