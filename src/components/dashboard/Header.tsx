"use client";

import * as React from "react";
import {
  Bell,
  Search,
  Building2,
  ChevronDown,
  Sparkles,
  Menu,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface HeaderProps {
  onToggleMobileMenu: () => void;
  selectedOrg: string;
  onSelectOrg: (org: string) => void;
}

export function Header({
  onToggleMobileMenu,
  selectedOrg,
  onSelectOrg,
}: HeaderProps) {
  const [isOrgDropdownOpen, setIsOrgDropdownOpen] = React.useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);

  const orgs = [
    "Apex Medical & Dental Group",
    "Velvet Hair & Aesthetics Studio",
    "Horizon Coastal Real Estate",
    "Deptloy Internal Sandbox",
  ];

  const notifications = [
    {
      id: 1,
      title: "New Appointment Booked",
      desc: "AI Receptionist booked Marcus Vance for Friday at 4:30 PM",
      time: "4 mins ago",
      unread: true,
    },
    {
      id: 2,
      title: "Calendar Sync Successful",
      desc: "Google Calendar bidirectional lock confirmed for Dr. Harris",
      time: "28 mins ago",
      unread: true,
    },
    {
      id: 3,
      title: "Weekly Analytics Ready",
      desc: "142 calls answered autonomously with a 94% resolution rate",
      time: "1 hour ago",
      unread: false,
    },
  ];

  return (
    <header className="h-16 border-b border-line bg-canvas/80 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
      
      {/* Left: Mobile hamburger & Organization Selector */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-xl text-fg-soft hover:text-white hover:bg-white/10"
          aria-label="Open mobile navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Organization Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOrgDropdownOpen(!isOrgDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-raised border border-line hover:border-line-strong text-xs font-semibold text-white transition-all"
          >
            <Building2 className="h-3.5 w-3.5 text-brand-400" />
            <span className="max-w-[150px] sm:max-w-[220px] truncate">{selectedOrg}</span>
            <ChevronDown className="h-3 w-3 text-fg-muted" />
          </button>

          {isOrgDropdownOpen && (
            <div className="absolute left-0 mt-2 w-64 rounded-2xl bg-raised border border-line p-2 shadow-2xl z-50">
              <span className="text-[10px] font-bold uppercase tracking-wider text-fg-muted px-3 py-1 block">
                Active Tenant / Organization
              </span>
              {orgs.map((org) => (
                <button
                  key={org}
                  onClick={() => {
                    onSelectOrg(org);
                    setIsOrgDropdownOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left text-fg-soft hover:text-white hover:bg-white/[0.06] transition-colors"
                >
                  <span className="truncate">{org}</span>
                  {selectedOrg === org && <Check className="h-3.5 w-3.5 text-brand-400" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Middle: Search Field */}
      <div className="hidden md:flex items-center relative w-72">
        <Search className="h-3.5 w-3.5 text-fg-subtle absolute left-3 pointer-events-none" />
        <input
          type="text"
          placeholder="Search appointments, contacts..."
          className="w-full h-9 pl-9 pr-3 rounded-xl bg-raised border border-line text-xs text-fg-soft placeholder:text-fg-subtle focus:outline-none focus:ring-1 focus:ring-brand-400"
        />
      </div>

      {/* Right: Notification Dropdown & Demo Action */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 rounded-xl text-fg-muted hover:text-white hover:bg-white/5 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-card border border-line p-3 shadow-2xl z-50">
              <div className="flex items-center justify-between pb-2 border-b border-line px-2">
                <span className="text-xs font-bold text-white">Notifications</span>
                <span className="text-[10px] text-brand-400 bg-brand-500/15 px-2 py-0.5 rounded-full">
                  2 unread
                </span>
              </div>
              <div className="space-y-1.5 mt-2">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-2.5 rounded-xl hover:bg-white/[0.04] transition-colors text-xs"
                  >
                    <div className="flex items-center justify-between text-white font-medium">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-fg-subtle">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-fg-muted mt-0.5 leading-snug">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Button href="/demo" variant="glow" size="sm" leftIcon={<Sparkles className="h-3 w-3" />}>
          Live Booking Demo
        </Button>
      </div>

    </header>
  );
}
