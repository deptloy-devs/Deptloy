"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Bot,
  CalendarCheck,
  Users,
  PhoneCall,
  Layers,
  Settings,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";

export type DashboardTab =
  | "overview"
  | "receptionist"
  | "appointments"
  | "contacts"
  | "calls"
  | "integrations"
  | "settings";

interface SidebarProps {
  currentTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({
  currentTab,
  onTabChange,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  const navItems = [
    { id: "overview" as DashboardTab, label: "Overview", icon: LayoutDashboard },
    { id: "receptionist" as DashboardTab, label: "AI Receptionist", icon: Bot, badge: "Live" },
    { id: "appointments" as DashboardTab, label: "Appointments", icon: CalendarCheck },
    { id: "contacts" as DashboardTab, label: "Contacts", icon: Users },
    { id: "calls" as DashboardTab, label: "Call History", icon: PhoneCall },
    { id: "integrations" as DashboardTab, label: "Integrations", icon: Layers },
    { id: "settings" as DashboardTab, label: "Settings", icon: Settings },
  ];

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 bg-[#080B14] border-r border-white/10 flex flex-col justify-between transition-all duration-300 z-30",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div>
        {/* Top Header / Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/[0.08]">
          {!isCollapsed ? (
            <div className="flex items-center gap-2">
              <Logo size="sm" />
              <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">
                SaaS
              </span>
            </div>
          ) : (
            <div className="mx-auto">
              <Logo size="sm" showText={false} />
            </div>
          )}

          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group",
                  isActive
                    ? "bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-md shadow-purple-950/40"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0 transition-colors",
                    isActive ? "text-purple-400" : "text-slate-400 group-hover:text-slate-200"
                  )}
                />
                {!isCollapsed && (
                  <span className="flex-1 text-left truncate">{item.label}</span>
                )}
                {!isCollapsed && item.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-mono">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & External Links */}
      <div className="p-3 border-t border-white/[0.08] space-y-2">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 p-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-white/[0.04] transition-colors",
            isCollapsed && "justify-center"
          )}
          title="Back to Marketing Site"
        >
          <ExternalLink className="h-4 w-4 shrink-0" />
          {!isCollapsed && <span>Marketing Website</span>}
        </Link>

        {/* User Card */}
        <div
          className={cn(
            "flex items-center gap-2.5 p-2 rounded-xl bg-[#111827] border border-white/5",
            isCollapsed && "justify-center"
          )}
        >
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
            AD
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">Apex Clinic Admin</p>
              <p className="text-[10px] text-slate-400 truncate">demo@apexclinic.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
