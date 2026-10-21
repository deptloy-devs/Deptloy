import { cn } from "@/lib/cn";

/**
 * Visible marker for content the client still has to supply (logos, quotes, photos).
 * Search the codebase for "isPlaceholder" to find every spot to replace.
 */
export function PlaceholderTag({ className, label = "Placeholder" }: { className?: string; label?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-dashed border-warning/50 px-2 py-0.5 text-xs font-medium text-warning",
        className
      )}
    >
      {label}
    </span>
  );
}
