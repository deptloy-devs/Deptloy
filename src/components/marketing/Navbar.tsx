"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Bot, Database, Workflow, Globe, ArrowRight } from "lucide-react";

const coreServices = [
  {
    href: "/services/ai-receptionist",
    title: "AI Receptionist",
    short: "24/7 conversational voice & chat intake",
    color: "#8478e0",
    icon: Bot,
  },
  {
    href: "/services/crm",
    title: "Custom CRM",
    short: "Clutter-free customer pipelines & records",
    color: "#5750a8",
    icon: Database,
  },
  {
    href: "/services/automation",
    title: "Workflow Automation",
    short: "Background sync, reminders & task handoffs",
    color: "#fd9150",
    icon: Workflow,
  },
  {
    href: "/services/development",
    title: "Web & App Development",
    short: "Client portals, Next.js apps & dashboards",
    color: "#ef7a5e",
    icon: Globe,
  },
];

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = React.useState(false);
  const pathname = usePathname();
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close menus on route change
  React.useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
    document.body.classList.remove("open");
  }, [pathname]);

  // Close dropdown on click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setOpen((prev) => {
      const next = !prev;
      if (next) {
        document.body.classList.add("open");
      } else {
        document.body.classList.remove("open");
      }
      return next;
    });
  };

  const closeMenu = () => {
    setOpen(false);
    setMobileServicesOpen(false);
    document.body.classList.remove("open");
  };

  const isServicesActive = pathname.startsWith("/services");

  return (
    <>
      <header>
        <div className="wrap">
          <div className="navpill">
            <Link href="/" className="logo" aria-label="Deptloy home">
              <svg style={{ width: "28px", height: "32px", flexShrink: 0 }}>
                <use href="#mk" />
              </svg>
              Deptloy
            </Link>

            <nav>
              {/* Home */}
              <Link href="/" className={pathname === "/" ? "cur" : ""}>
                Home
              </Link>

              {/* Services Dropdown */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  type="button"
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full font-semibold transition-colors cursor-pointer ${
                    isServicesActive ? "bg-[var(--mist)] text-[var(--deep)]" : "hover:bg-[var(--mist)] text-[var(--deep)]"
                  }`}
                  aria-expanded={servicesOpen}
                  onClick={() => setServicesOpen((prev) => !prev)}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      servicesOpen ? "rotate-180 text-[var(--or)]" : "text-[var(--mute)]"
                    }`}
                  />
                </button>

                {/* Dropdown Panel */}
                {servicesOpen && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 animate-fade-in"
                    style={{ minWidth: "340px" }}
                  >
                    <div
                      className="bg-white border border-[rgba(21,19,74,0.14)] p-3 shadow-[0_20px_50px_rgba(21,19,74,0.18)]"
                      style={{
                        clipPath: "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%)",
                      }}
                    >
                      <div className="px-3 py-1.5 border-b border-[var(--mist)] mb-1.5 flex items-center justify-between">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--pur)]">
                          Core Building Blocks
                        </span>
                        <span className="text-[10px] font-mono text-[var(--mute)]">Modular Architecture</span>
                      </div>

                      {/* 4 Core Services */}
                      <div className="space-y-1">
                        {coreServices.map((service) => {
                          const Icon = service.icon;
                          const isActive = pathname === service.href;
                          return (
                            <Link
                              key={service.href}
                              href={service.href}
                              onClick={() => setServicesOpen(false)}
                              className={`flex items-start gap-3 p-2.5 rounded-lg transition-colors group ${
                                isActive ? "bg-[var(--mist)]" : "hover:bg-[var(--paper)]"
                              }`}
                            >
                              <div
                                className="w-8 h-8 rounded-md flex items-center justify-center text-white shrink-0 mt-0.5"
                                style={{ backgroundColor: service.color }}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-bold text-[var(--deep)] group-hover:text-[var(--or)] transition-colors flex items-center justify-between">
                                  <span>{service.title}</span>
                                  <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[var(--or)]" />
                                </div>
                                <p className="text-xs text-[var(--mute)] leading-tight mt-0.5 truncate">
                                  {service.short}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      {/* Combined Services Page Link */}
                      <div className="mt-2 pt-2 border-t border-[var(--mist)]">
                        <Link
                          href="/services"
                          onClick={() => setServicesOpen(false)}
                          className="flex items-center justify-between px-3 py-2 text-xs font-semibold font-mono text-[var(--deep)] hover:text-[var(--or)] hover:bg-[var(--paper)] rounded transition-colors"
                        >
                          <span>All Services & Architecture Scope</span>
                          <span className="text-[var(--or)] font-bold">Explore →</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Projects */}
              <Link href="/projects" className={pathname === "/projects" ? "cur" : ""}>
                Projects
              </Link>

              {/* About */}
              <Link href="/about" className={pathname === "/about" ? "cur" : ""}>
                About
              </Link>

              {/* Blogs */}
              <Link href="/blogs" className={pathname.startsWith("/blogs") ? "cur" : ""}>
                Blogs
              </Link>

              {/* Contact */}
              <Link href="/contact" className={pathname === "/contact" ? "cur" : ""}>
                Contact
              </Link>

              {/* CTA Button */}
              <Link className="btn sm" href="/contact#appointment">
                Book a call
              </Link>
            </nav>

            <button
              id="burger"
              type="button"
              aria-label="Menu"
              aria-expanded={open}
              onClick={toggleMenu}
            >
              <i></i>
              <i></i>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <div id="menu">
        <Link href="/" onClick={closeMenu}>
          Home
        </Link>

        {/* Mobile Services Accordion */}
        <div className="py-2">
          <button
            type="button"
            onClick={() => setMobileServicesOpen((prev) => !prev)}
            className="flex items-center justify-between w-full text-left font-extrabold text-[clamp(28px,7vw,46px)] tracking-tight text-white hover:text-[var(--or)]"
          >
            <span>Services</span>
            <ChevronDown
              className={`w-6 h-6 transition-transform duration-200 ${
                mobileServicesOpen ? "rotate-180 text-[var(--or)]" : "text-white/60"
              }`}
            />
          </button>

          {mobileServicesOpen && (
            <div className="pl-4 mt-2 space-y-2 border-l-2 border-[var(--or)]">
              {coreServices.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={closeMenu}
                  className="block text-lg font-bold text-white/80 hover:text-white py-1"
                >
                  {s.title}
                </Link>
              ))}
              <Link
                href="/services"
                onClick={closeMenu}
                className="block text-sm font-mono text-[var(--or)] pt-1"
              >
                View all services & scope →
              </Link>
            </div>
          )}
        </div>

        <Link href="/projects" onClick={closeMenu}>
          Projects
        </Link>
        <Link href="/about" onClick={closeMenu}>
          About
        </Link>
        <Link href="/blogs" onClick={closeMenu}>
          Blogs
        </Link>
        <Link href="/contact" onClick={closeMenu} style={{ color: "var(--or)" }}>
          Contact & Book
        </Link>
      </div>
    </>
  );
}
