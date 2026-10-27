"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark, LogoWordmark } from "@/components/ui/Logo";

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const prevPathnameRef = React.useRef(pathname);

  // Close menus on route change
  React.useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      setOpen(false);
      document.body.classList.remove("open");
    }
  }, [pathname]);

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
    document.body.classList.remove("open");
  };

  return (
    <>
      <header>
        <div className="wrap">
          <div className="navpill">
            <Link href="/" className="logo" aria-label="Deptloy home">
              <LogoMark className="w-7 h-8" />
              <LogoWordmark className="w-[74px] h-[20.5px]" />
            </Link>

            <nav>
              {/* Home */}
              <Link href="/" className={pathname === "/" ? "cur" : ""}>
                Home
              </Link>

              {/* How it works */}
              <Link
                href="/how-it-works"
                className={pathname === "/how-it-works" ? "cur" : ""}
              >
                How it works
              </Link>

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
        <Link href="/how-it-works" onClick={closeMenu}>
          How it works
        </Link>
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
          Contact &amp; Book
        </Link>
      </div>
    </>
  );
}
