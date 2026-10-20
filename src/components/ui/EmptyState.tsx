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
        "flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-dashed border-white/10 bg-[#111827]/40",
        className
      )}
    >
      {icon && (
        <div className="mb-4 rounded-full bg-purple-500/10 p-3.5 text-purple-400 border border-purple-500/20">
          {icon}
        </div>
      )}
      <h4 className="text-base font-semibold text-white">{title}</h4>
      <p className="mt-1 text-sm text-slate-400 max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction} className="mt-4">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
