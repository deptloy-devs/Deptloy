"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Menu,
  X,
  Bot,
  Zap,
  BarChart3,
  Code2,
  ArrowRight,
  Sparkles,
  LayoutDashboard,
  Home,
  Briefcase,
  Layers,
  Phone,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Navbar() {
  const pathname = usePathname();
  const [isServicesOpen, setIsServicesOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  };

  const serviceIcons = {
    "ai-receptionist": <Bot className="h-5 w-5 text-brand-400" />,
    automation: <Zap className="h-5 w-5 text-blue-400" />,
    crm: <BarChart3 className="h-5 w-5 text-emerald-400" />,
    development: <Code2 className="h-5 w-5 text-cyan-400" />,
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-canvas/95 backdrop-blur-2xl shadow-xl transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Logo size="md" />

        {/* Visible Navigation on Tablet & Desktop (md:flex instead of lg:flex) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          
          {/* Home Link */}
          <Link
            href="/"
            className={cn(
              "px-3 py-2 text-sm font-semibold rounded-lg transition-colors",
              pathname === "/"
                ? "text-brand-300 bg-white/[0.08]"
                : "text-fg-soft hover:text-white hover:bg-white/[0.05]"
            )}
          >
            Home
          </Link>

          {/* Services Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              onMouseEnter={() => setIsServicesOpen(true)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer",
                pathname.startsWith("/services")
                  ? "text-brand-300 bg-white/[0.08]"
                  : "text-fg-soft hover:text-white hover:bg-white/[0.05]"
              )}
              aria-expanded={isServicesOpen}
            >
              <span>Services</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200 text-fg-muted",
                  isServicesOpen && "rotate-180 text-brand-400"
                )}
              />
            </button>

            {/* Dropdown Menu */}
            {isServicesOpen && (
              <div
                onMouseLeave={() => setIsServicesOpen(false)}
                className="absolute left-0 mt-2 w-[480px] rounded-2xl bg-card border border-line p-3 shadow-2xl shadow-brand-950/60 backdrop-blur-2xl animate-fade-in z-50"
              >
                <div className="grid grid-cols-1 gap-1">
                  {services.map((srv) => (
                    <Link
                      key={srv.slug}
                      href={srv.href}
                      onClick={closeMenus}
                      className="group flex items-start gap-3.5 p-3 rounded-xl hover:bg-white/[0.06] transition-all"
                    >
                      <div className="mt-0.5 rounded-lg bg-raised p-2 border border-line group-hover:border-brand-500/40 transition-colors">
                        {serviceIcons[srv.slug]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white group-hover:text-brand-300 transition-colors">
                            {srv.title}
                          </span>
                          {srv.badge && (
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-brand-500/15 text-brand-300 border border-brand-500/30">
                              {srv.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-fg-muted mt-0.5 line-clamp-1 group-hover:text-fg-soft">
                          {srv.short}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-fg-subtle group-hover:text-brand-400 group-hover:translate-x-0.5 transition-all self-center opacity-0 group-hover:opacity-100" />
                    </Link>
                  ))}
                </div>

                <div className="mt-2 pt-2 border-t border-line px-3 py-1.5 flex items-center justify-between text-xs text-fg-muted">
                  <Link
                    href="/#services"
                    onClick={closeMenus}
                    className="text-brand-400 hover:text-brand-300 font-medium inline-flex items-center gap-1"
                  >
                    <span>Swipe service cards on Homepage</span> <ArrowRight className="h-3 w-3" />
                  </Link>
                  <Link href="/contact" onClick={closeMenus} className="hover:text-white transition-colors">
                    Custom Scope →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Projects Link (Replaces Case Studies) */}
          <Link
            href="/projects"
            className={cn(
              "px-3 py-2 text-sm font-semibold rounded-lg transition-colors",
              pathname === "/projects" || pathname === "/case-studies"
                ? "text-brand-300 bg-white/[0.08]"
                : "text-fg-soft hover:text-white hover:bg-white/[0.05]"
            )}
          >
            Projects
          </Link>

          {/* About Link */}
          <Link
            href="/#about"
            className="px-3 py-2 text-sm font-semibold text-fg-soft hover:text-white hover:bg-white/[0.05] rounded-lg transition-colors"
          >
            About
          </Link>

          {/* Contact Link */}
          <Link
            href="/contact"
            className={cn(
              "px-3 py-2 text-sm font-semibold rounded-lg transition-colors",
              pathname === "/contact"
                ? "text-brand-300 bg-white/[0.08]"
                : "text-fg-soft hover:text-white hover:bg-white/[0.05]"
            )}
          >
            Contact
          </Link>

        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-fg-soft hover:text-white transition-colors rounded-lg hover:bg-white/[0.05] border border-line"
          >
            <LayoutDashboard className="h-3.5 w-3.5 text-brand-400" />
            <span>Dashboard</span>
          </Link>
          <Button
            href="/demo"
            variant="glow"
            size="sm"
            leftIcon={<Sparkles className="h-3.5 w-3.5" />}
          >
            Try AI Demo
          </Button>
        </div>

        {/* Mobile Navigation Button (Clear & Unmissable) */}
        <div className="flex md:hidden items-center gap-2">
          <Button href="/demo" variant="primary" size="sm" className="text-xs px-3">
            AI Demo
          </Button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-raised border border-brand-500/30 text-white hover:bg-brand-600/20 transition-all focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5 text-brand-400" /> : <Menu className="h-5 w-5 text-brand-400" />}
            <span className="text-xs font-bold uppercase tracking-wider">Menu</span>
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-line bg-canvas/98 backdrop-blur-2xl px-5 pt-3 pb-8 animate-fade-in shadow-2xl">
          <div className="flex flex-col gap-2">
            
            <Link
              href="/"
              onClick={closeMenus}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white/[0.06] text-white text-sm font-semibold"
            >
              <Home className="h-4 w-4 text-brand-400" />
              <span>Home</span>
            </Link>

            <div className="text-[11px] font-bold uppercase tracking-wider text-fg-subtle px-3 pt-2">
              Our Services
            </div>
            {services.map((srv) => (
              <Link
                key={srv.slug}
                href={srv.href}
                onClick={closeMenus}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.06] text-fg-soft hover:text-white text-sm"
              >
                {serviceIcons[srv.slug]}
                <span>{srv.title}</span>
              </Link>
            ))}

            <Link
              href="/#services"
              onClick={closeMenus}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-brand-600/15 text-brand-300 text-xs font-semibold ml-3"
            >
              <span>Swipe Services on Home Page →</span>
            </Link>

            <div className="my-2 border-t border-line" />

            <Link
              href="/projects"
              onClick={closeMenus}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white/[0.06] text-fg-soft hover:text-white text-sm font-semibold"
            >
              <Briefcase className="h-4 w-4 text-blue-400" />
              <span>Projects</span>
            </Link>

            <Link
              href="/#about"
              onClick={closeMenus}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white/[0.06] text-fg-soft hover:text-white text-sm font-semibold"
            >
              <Layers className="h-4 w-4 text-emerald-400" />
              <span>About Deptloy</span>
            </Link>

            <Link
              href="/contact"
              onClick={closeMenus}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white/[0.06] text-fg-soft hover:text-white text-sm font-semibold"
            >
              <Phone className="h-4 w-4 text-amber-400" />
              <span>Contact</span>
            </Link>

            <Link
              href="/dashboard"
              onClick={closeMenus}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.04] text-fg-soft hover:text-white text-sm font-medium"
            >
              <LayoutDashboard className="h-4 w-4 text-brand-400" />
              <span>Client Dashboard Preview</span>
            </Link>

            <div className="mt-4 pt-3 flex flex-col gap-2">
              <Button href="/demo" variant="glow" size="md" className="w-full" onClick={closeMenus}>
                Experience AI Demo
              </Button>
              <Button href="/contact" variant="outline" size="md" className="w-full" onClick={closeMenus}>
                Book Consultation
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
