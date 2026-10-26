"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ServiceIcon } from "./ServiceIcon";
import { mainNav, services } from "@/lib/site";
import { cn } from "@/lib/cn";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

export function Navbar() {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const servicesButtonRef = React.useRef<HTMLButtonElement>(null);

  // Close menus when route changes
  const [lastPath, setLastPath] = React.useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setServicesOpen(false);
    setMobileOpen(false);
  }

  // Reading progress bar & scroll detection
  React.useEffect(() => {
    const onScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      setScrollProgress(Math.min(1, Math.max(0, progress)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Services dropdown outside click & Escape
  React.useEffect(() => {
    if (!servicesOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setServicesOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        servicesButtonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [servicesOpen]);

  // Mobile menu scroll lock
  React.useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div
        id="bar"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      <header className="fixed top-0 left-0 right-0 z-40 pt-3 sm:pt-4 px-3 sm:px-6">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[70] focus:rounded-full focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:text-fg"
        >
          Skip to content
        </a>

        <div className="max-w-7xl mx-auto">
          <div className="navpill">
            {/* Logo */}
            <Logo size="md" />

            {/* Desktop Navigation */}
            <nav
              aria-label="Main"
              className="hidden lg:flex items-center gap-1 text-[14.5px] font-semibold"
            >
              {mainNav.map((item) =>
                item.href === "/services" ? (
                  <div
                    key={item.href}
                    ref={dropdownRef}
                    className="relative"
                    onPointerEnter={(e) =>
                      e.pointerType === "mouse" && setServicesOpen(true)
                    }
                    onPointerLeave={(e) =>
                      e.pointerType === "mouse" && setServicesOpen(false)
                    }
                  >
                    <button
                      ref={servicesButtonRef}
                      type="button"
                      onClick={() => setServicesOpen((o) => !o)}
                      aria-expanded={servicesOpen}
                      aria-controls="services-menu"
                      className={cn(
                        "inline-flex cursor-pointer items-center gap-1.5 px-3.5 py-2 rounded-full transition-colors",
                        isActive(pathname, "/services")
                          ? "bg-[var(--mist)] dark:bg-[var(--raised)] text-fg"
                          : "text-fg-soft hover:bg-[var(--mist)] dark:hover:bg-[var(--raised)] hover:text-fg"
                      )}
                    >
                      Services
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200",
                          servicesOpen && "rotate-180"
                        )}
                      />
                    </button>

                    {servicesOpen && (
                      <div
                        id="services-menu"
                        className="absolute left-1/2 top-full w-64 -translate-x-1/2 pt-2"
                      >
                        <div className="rounded-2xl border border-line bg-card/95 p-2 shadow-raised backdrop-blur-xl">
                          <ul className="space-y-1">
                            {services.map((srv) => (
                              <li key={srv.slug}>
                                <Link
                                  href={srv.href}
                                  onClick={() => setServicesOpen(false)}
                                  className={cn(
                                    "group flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:bg-raised",
                                    pathname === srv.href
                                      ? "text-fg bg-raised/70"
                                      : "text-fg-soft hover:text-fg"
                                  )}
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-line bg-surface text-[var(--pur)] dark:text-[var(--peri)]">
                                      <ServiceIcon
                                        slug={srv.slug}
                                        className="h-3.5 w-3.5"
                                      />
                                    </span>
                                    <span className="truncate">{srv.title}</span>
                                  </div>
                                  <ArrowRight
                                    className="h-3.5 w-3.5 shrink-0 opacity-0 -translate-x-1 text-[var(--or)] transition-all group-hover:opacity-100 group-hover:translate-x-0"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-2 border-t border-line px-2.5 pt-2 flex items-center justify-between">
                            <Link
                              href="/services"
                              onClick={() => setServicesOpen(false)}
                              className="flex items-center gap-1 text-xs font-bold text-[var(--pur)] dark:text-[var(--peri)] hover:text-[var(--or)] transition-colors"
                            >
                              <span>Explore All</span>
                              <ArrowRight className="h-3 w-3" aria-hidden="true" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className={cn(
                      "px-3.5 py-2 rounded-full transition-colors",
                      isActive(pathname, item.href)
                        ? "bg-[var(--mist)] dark:bg-[var(--raised)] text-fg"
                        : "text-fg-soft hover:bg-[var(--mist)] dark:hover:bg-[var(--raised)] hover:text-fg"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle />

              <span className="hidden sm:inline-flex">
                <Button href="/contact" variant="primary" size="sm">
                  Get a Quote
                </Button>
              </span>

              {/* Mobile hamburger */}
              <button
                type="button"
                onClick={() => setMobileOpen((o) => !o)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                className="grid h-9 w-9 place-items-center rounded-full border border-line bg-raised text-fg transition-colors hover:bg-raised-hover lg:hidden cursor-pointer"
              >
                {mobileOpen ? (
                  <X className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Menu className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileOpen && (
          <div
            id="mobile-menu"
            className="mt-2 rounded-3xl border border-line bg-card/95 p-5 shadow-raised backdrop-blur-2xl lg:hidden max-h-[calc(100dvh-5.5rem)] overflow-y-auto"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {mainNav.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex h-11 items-center rounded-2xl px-3.5 text-base font-bold",
                      isActive(pathname, item.href)
                        ? "bg-[var(--mist)] dark:bg-[var(--raised)] text-fg"
                        : "text-fg-soft hover:text-fg"
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.href === "/services" && (
                    <div className="my-1 ml-4 border-l-2 border-line pl-3 space-y-1">
                      {services.map((srv) => (
                        <Link
                          key={srv.slug}
                          href={srv.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex h-9 items-center gap-2.5 rounded-xl px-2 text-sm font-medium text-fg-muted hover:text-fg"
                        >
                          <ServiceIcon slug={srv.slug} className="h-3.5 w-3.5 text-[var(--pur)] dark:text-[var(--peri)]" />
                          <span>{srv.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-line flex flex-col gap-2.5">
                <Button
                  href="/contact"
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => setMobileOpen(false)}
                >
                  Get a Quote
                </Button>
                <Button
                  href="/demo"
                  variant="secondary"
                  size="md"
                  className="w-full"
                  onClick={() => setMobileOpen(false)}
                >
                  Try AI Demo
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
