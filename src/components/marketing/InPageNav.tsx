"use client";

import Link from "next/link";
import {
  Zap,
  Bot,
  Rocket,
  Briefcase,
  Phone,
  Sparkles,
} from "lucide-react";

export function InPageNav() {
  const sections = [
    { href: "#services", label: "Services (Swipeable)", icon: <Zap className="h-3.5 w-3.5 text-brand-400" /> },
    { href: "#receptionist", label: "AI Receptionist", icon: <Bot className="h-3.5 w-3.5 text-blue-400" /> },
    { href: "#how-it-works", label: "How It Works", icon: <Rocket className="h-3.5 w-3.5 text-emerald-400" /> },
    { href: "#projects", label: "Projects", icon: <Briefcase className="h-3.5 w-3.5 text-amber-400" /> },
    { href: "#tailored-services", label: "Services by Sector", icon: <Sparkles className="h-3.5 w-3.5 text-cyan-400" /> },
    { href: "/contact", label: "Contact Us", icon: <Phone className="h-3.5 w-3.5 text-pink-400" /> },
  ];

  return (
    <div className="sticky top-20 z-30 w-full bg-canvas/90 backdrop-blur-md border-b border-line py-2.5 px-4 shadow-lg">
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
        
        {/* Label */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-fg-muted shrink-0">
          <span className="h-2 w-2 rounded-full bg-brand-400 animate-pulse" />
          <span>Quick Navigation:</span>
        </div>

        {/* Scrollable Horizontal Pill Links */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 flex-1 justify-start sm:justify-center">
          {sections.map((sec, idx) => (
            <Link
              key={idx}
              href={sec.href}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-raised border border-line hover:border-brand-500/40 hover:bg-white/[0.06] text-xs font-semibold text-fg-soft hover:text-white whitespace-nowrap transition-all active:scale-95 shadow-sm"
            >
              {sec.icon}
              <span>{sec.label}</span>
            </Link>
          ))}
        </div>

        {/* Quick Demo Button */}
        <div className="hidden lg:block shrink-0">
          <Link
            href="/demo"
            className="text-xs font-bold text-brand-400 hover:text-brand-300 inline-flex items-center gap-1"
          >
            Launch Demo →
          </Link>
        </div>

      </div>
    </div>
  );
}
