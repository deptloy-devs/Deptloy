"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinks = [
    { href: "/#services", label: "Services" },
    { href: "/#solutions", label: "Solutions" },
    { href: "/#why", label: "Why Deptloy" },
    { href: "/#process", label: "Process" },
    { href: "/#about", label: "About" },
    { href: "/blogs", label: "Blogs" },
    { href: "/#faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 pt-[env(safe-area-inset-top,0px)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 h-[78px] flex items-center">
          <div className="w-full flex items-center justify-between gap-3 bg-white/80 backdrop-blur-md border border-[rgba(87,80,168,0.15)] rounded-[14px] px-4 sm:px-5 py-2.5 shadow-[0_8px_30px_rgba(87,80,168,0.12)]">
            {/* Logo */}
            <Logo size="md" />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 text-[14.5px] font-semibold text-[#15134a]">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-3 py-1.5 rounded-full transition-colors duration-200 hover:bg-[#e8e6f7]"
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/contact"
                className="btn-chamfer ml-2 !py-2.5 !px-5 text-xs font-mono font-medium"
              >
                Book a call
              </Link>
            </nav>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              className="lg:hidden relative w-10 h-10 rounded-full bg-[#15134a] text-white flex flex-col items-center justify-center gap-1.5 cursor-pointer z-50 shrink-0"
            >
              <span
                className={cn(
                  "w-5 h-0.5 bg-white transition-all duration-300",
                  mobileOpen && "translate-y-2 rotate-45"
                )}
              />
              <span
                className={cn(
                  "w-5 h-0.5 bg-white transition-all duration-300",
                  mobileOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "w-5 h-0.5 bg-white transition-all duration-300",
                  mobileOpen && "-translate-y-2 -rotate-45"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-[#15134a] text-white z-35 flex flex-col justify-center px-8 sm:px-12 transition-all duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] lg:hidden",
          mobileOpen
            ? "[clip-path:circle(150%_at_calc(100%-46px)_46px)] pointer-events-auto"
            : "[clip-path:circle(0_at_calc(100%-46px)_46px)] pointer-events-none"
        )}
      >
        <div className="flex flex-col gap-3 font-display font-extrabold text-3xl sm:text-5xl tracking-tight">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="hover:text-[#fd9150] transition-colors py-1"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="text-[#fd9150] hover:text-white transition-colors py-1 mt-2 text-2xl font-mono uppercase"
          >
            → Book a Consultation
          </Link>
        </div>
      </div>
    </>
  );
}
