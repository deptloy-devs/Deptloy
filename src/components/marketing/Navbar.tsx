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

const linkBase =
  "rounded-control px-3 py-2 text-sm font-medium transition-colors duration-150 hover:bg-white/[0.05] hover:text-fg";

export function Navbar() {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const servicesButtonRef = React.useRef<HTMLButtonElement>(null);

  // Close menus when the route changes (render-time state sync, no effect needed).
  const [lastPath, setLastPath] = React.useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setServicesOpen(false);
    setMobileOpen(false);
  }

  // Slightly stronger header background once the page scrolls.
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Services dropdown: close on outside click or Escape (focus returns to the trigger).
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

  // Mobile menu: Escape closes it, and the page behind does not scroll.
  React.useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-colors duration-200",
        scrolled || mobileOpen ? "border-line bg-canvas/90" : "border-transparent bg-canvas/60"
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[70] focus:rounded-control focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:text-fg"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <Logo size="md" />

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) =>
            item.href === "/services" ? (
              <div
                key={item.href}
                ref={dropdownRef}
                className="relative"
                onPointerEnter={(e) => e.pointerType === "mouse" && setServicesOpen(true)}
                onPointerLeave={(e) => e.pointerType === "mouse" && setServicesOpen(false)}
              >
                <button
                  ref={servicesButtonRef}
                  type="button"
                  onClick={() => setServicesOpen((o) => !o)}
                  aria-expanded={servicesOpen}
                  aria-controls="services-menu"
                  className={cn(
                    linkBase,
                    "inline-flex cursor-pointer items-center gap-1",
                    isActive(pathname, "/services") ? "text-fg" : "text-fg-muted"
                  )}
                >
                  Services
                  <ChevronDown
                    aria-hidden="true"
                    className={cn("h-4 w-4 transition-transform duration-200", servicesOpen && "rotate-180")}
                  />
                </button>

                {servicesOpen && (
                  <div id="services-menu" className="absolute left-1/2 top-full w-64 -translate-x-1/2 pt-2">
                    <div className="animate-fade-in rounded-xl border border-line bg-card/95 p-1.5 shadow-raised backdrop-blur-xl">
                      <ul className="space-y-0.5">
                        {services.map((srv) => (
                          <li key={srv.slug}>
                            <Link
                              href={srv.href}
                              aria-current={pathname === srv.href ? "page" : undefined}
                              className={cn(
                                "group flex items-center justify-between rounded-lg px-2.5 py-2 text-sm font-medium transition-colors hover:bg-raised",
                                pathname === srv.href ? "text-fg bg-raised/70" : "text-fg-soft hover:text-fg"
                              )}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-line bg-surface text-brand-300 transition-colors group-hover:border-brand-400/40">
                                  <ServiceIcon slug={srv.slug} className="h-3.5 w-3.5" />
                                </span>
                                <span className="truncate">{srv.title}</span>
                              </div>
                              <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-0 -translate-x-1 text-brand-300 transition-all group-hover:opacity-100 group-hover:translate-x-0" aria-hidden="true" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-1 border-t border-line px-2 pt-1.5 pb-0.5">
                        <Link
                          href="/services"
                          className="flex items-center justify-between rounded-md px-2 py-1.5 text-xs font-semibold text-brand-300 hover:text-brand-200 transition-colors"
                        >
                          <span>All Services</span>
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
                className={cn(linkBase, isActive(pathname, item.href) ? "text-fg" : "text-fg-muted")}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Theme appearance switcher (Sun when dark, Moon when light) */}
          <ThemeToggle />

          {/* Wrappers control visibility — Button's own display class can't be overridden via className */}
          <span className="hidden lg:block">
            <Button href="/demo" variant="ghost" size="sm">
              Try the AI demo
            </Button>
          </span>
          <span className="hidden sm:block">
            <Button href="/contact" variant="primary" size="sm">
              Book a Consultation
            </Button>
          </span>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-control border border-line bg-raised text-fg transition-colors hover:bg-raised-hover lg:hidden cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="animate-fade-in max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-canvas lg:hidden"
        >
          <nav aria-label="Mobile" className="mx-auto max-w-7xl px-4 pb-8 pt-4 sm:px-6">
            <ul className="flex flex-col">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className={cn(
                      "flex h-12 items-center rounded-control px-3 text-base font-medium hover:bg-white/[0.05]",
                      isActive(pathname, item.href) ? "text-fg" : "text-fg-soft"
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.href === "/services" && (
                    <ul className="mb-2 ml-3 border-l border-line pl-3">
                      {services.map((srv) => (
                        <li key={srv.slug}>
                          <Link
                            href={srv.href}
                            className="flex h-11 items-center gap-3 rounded-control px-2 text-sm text-fg-muted hover:bg-white/[0.05] hover:text-fg"
                          >
                            <ServiceIcon slug={srv.slug} className="h-4 w-4 text-brand-300" />
                            {srv.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3 border-t border-line pt-6">
              <div className="flex items-center justify-between rounded-control border border-line bg-card/60 px-3.5 py-2">
                <span className="text-sm font-medium text-fg">Appearance</span>
                <ThemeToggle />
              </div>
              <Button href="/contact" variant="primary" size="lg" className="w-full">
                Book a Consultation
              </Button>
              <Button href="/demo" variant="secondary" size="lg" className="w-full">
                Try the AI demo
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
