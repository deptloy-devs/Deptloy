import { cn } from "@/lib/cn";
import { Badge } from "./Badge";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center max-w-3xl mx-auto" : "items-start text-left max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <Badge variant="violet" dot>
          {eyebrow}
        </Badge>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
