import { cn } from "@/lib/cn";
import { Button } from "./Button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-dashed border-line bg-raised/40",
        className
      )}
    >
      {icon && (
        <div className="mb-4 rounded-full bg-brand-500/10 p-3.5 text-brand-400 border border-brand-500/20">
          {icon}
        </div>
      )}
      <h4 className="text-base font-semibold text-white">{title}</h4>
      <p className="mt-1 text-sm text-fg-muted max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction} className="mt-4">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
