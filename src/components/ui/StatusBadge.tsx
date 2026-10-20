import { cn } from "@/lib/cn";
import type { AppointmentStatus } from "@/types";

interface StatusBadgeProps {
  status: AppointmentStatus | "Active" | "Lead" | "Customer" | "Follow-up" | "Connected (Demo)" | "Not Connected" | "Pending Auth";
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getVariant = () => {
    switch (status) {
      case "confirmed":
      case "Active":
      case "Connected (Demo)":
        return {
          bg: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
          dot: "bg-emerald-400",
          label: status === "confirmed" ? "Confirmed" : status,
        };
      case "pending":
      case "Lead":
      case "Pending Auth":
        return {
          bg: "bg-amber-500/15 text-amber-400 border-amber-500/30",
          dot: "bg-amber-400",
          label: status === "pending" ? "Pending" : status,
        };
      case "completed":
      case "Customer":
        return {
          bg: "bg-sky-500/15 text-sky-400 border-sky-500/30",
          dot: "bg-sky-400",
          label: status === "completed" ? "Completed" : status,
        };
      case "cancelled":
      case "Not Connected":
        return {
          bg: "bg-rose-500/15 text-rose-400 border-rose-500/30",
          dot: "bg-rose-400",
          label: status === "cancelled" ? "Cancelled" : status,
        };
      case "Follow-up":
        return {
          bg: "bg-purple-500/15 text-purple-400 border-purple-500/30",
          dot: "bg-purple-400",
          label: "Follow-up",
        };
      default:
        return {
          bg: "bg-slate-500/15 text-slate-300 border-slate-500/30",
          dot: "bg-slate-400",
          label: String(status),
        };
    }
  };

  const current = getVariant();

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border backdrop-blur-sm",
        current.bg,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", current.dot)} />
      {current.label}
    </span>
  );
}
