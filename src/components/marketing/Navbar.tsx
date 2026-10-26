"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setOpen(false);
    document.body.classList.remove("open");
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
              <svg style={{ width: "28px", height: "32px", flexShrink: 0 }}>
                <use href="#mk" />
              </svg>
              Deptloy
            </Link>

            <nav>
              <Link href="/#services">Services</Link>
              <Link href="/#solutions">Solutions</Link>
              <Link href="/#why">Why Deptloy</Link>
              <Link href="/#process">Process</Link>
              <Link href="/#about">About</Link>
              <Link href="/blogs">Blogs</Link>
              <Link href="/#faq">FAQ</Link>
              <Link href="/#contact">Contact</Link>
              <Link className="btn sm" href="/#contact">
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
        <Link href="/#services" onClick={closeMenu}>
          Services
        </Link>
        <Link href="/#solutions" onClick={closeMenu}>
          Solutions
        </Link>
        <Link href="/#why" onClick={closeMenu}>
          Why Deptloy
        </Link>
        <Link href="/#process" onClick={closeMenu}>
          Process
        </Link>
        <Link href="/#about" onClick={closeMenu}>
          About
        </Link>
        <Link href="/blogs" onClick={closeMenu}>
          Blogs
        </Link>
        <Link href="/#faq" onClick={closeMenu}>
          FAQ
        </Link>
        <Link href="/#contact" onClick={closeMenu} style={{ color: "var(--or)" }}>
          Contact
        </Link>
      </div>
    </>
  );
}
