import { cn } from "@/lib/cn";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  subtitle?: string;
  icon: React.ReactNode;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  isPositive = true,
  subtitle,
  icon,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-card border border-line p-5 flex flex-col justify-between shadow-lg",
        className
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-fg-muted">{title}</span>
        <div className="rounded-xl bg-raised p-2 text-brand-400 border border-line">
          {icon}
        </div>
      </div>

      <div>
        <div className="text-2xl font-bold text-white font-mono tracking-tight">
          {value}
        </div>

        {(change || subtitle) && (
          <div className="mt-2 flex items-center gap-1.5 text-xs">
            {change && (
              <span
                className={cn(
                  "font-medium flex items-center gap-0.5",
                  isPositive ? "text-emerald-400" : "text-rose-400"
                )}
              >
                {isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {change}
              </span>
            )}
            {subtitle && <span className="text-fg-subtle">{subtitle}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
