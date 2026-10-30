"use client";

import * as React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { useCookieConsent } from "@/components/marketing/CookieConsent";

export function Footer() {
  const { openPreferences } = useCookieConsent();

  return (
    <footer>
      <div className="wrap">
        <div>
          <Logo />
          <p style={{ color: "var(--mute)", maxWidth: "22em", margin: "14px 0 0", fontSize: "14.5px" }}>
            Software built to outlast the hype. Custom products, intelligent workflows and connected systems engineered around your business.
          </p>
        </div>

        <div>
          <h4>How It Works</h4>
          <Link href="/how-it-works">Our Approach</Link>
          <Link href="/how-it-works#process">The Five Stages</Link>
          <Link href="/projects">Solution Blueprints</Link>
          <Link href="/demo">AI Receptionist Demo</Link>
          <Link href="/how-it-works" style={{ color: "var(--or)", fontWeight: 700 }}>
            Explore Methodology →
          </Link>
        </div>

        <div>
          <h4>Company</h4>
          <Link href="/projects">Solutions</Link>
          <Link href="/about">About Studio</Link>
          <Link href="/blogs">Engineering Blogs</Link>
          <Link href="/contact#form">Contact Us</Link>
          <a href="mailto:deptloy@gmail.com">deptloy@gmail.com</a>
        </div>

        <div className="cp flex flex-wrap items-center justify-between gap-4">
          <div>© 2026 Deptloy. All rights reserved.</div>
          <div className="flex items-center gap-5 sm:gap-6 text-sm flex-wrap">
            <Link
              href="/privacy"
              className="text-mute hover:text-deep transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-mute hover:text-deep transition-colors"
            >
              Terms of Service
            </Link>
            <button
              type="button"
              onClick={openPreferences}
              className="text-mute hover:text-deep transition-colors cursor-pointer text-left"
            >
              Cookie Preferences
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
