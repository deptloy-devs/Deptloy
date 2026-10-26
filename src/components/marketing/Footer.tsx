"use client";

import * as React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Modal } from "@/components/ui/Modal";

export function Footer() {
  const [activeModal, setActiveModal] = React.useState<"privacy" | "terms" | null>(null);

  return (
    <footer>
      <div className="wrap">
        <div>
          <Logo />
          <p style={{ color: "var(--mute)", maxWidth: "22em", margin: "14px 0 0", fontSize: "14.5px" }}>
            Lasting software for businesses that run on calls, leads and customers.
          </p>
        </div>

        <div>
          <h4>Services</h4>
          <Link href="/#services">AI receptionist</Link>
          <Link href="/#services">Custom CRM</Link>
          <Link href="/#services">Workflow automation</Link>
          <Link href="/#services">Web &amp; apps</Link>
          <Link href="/services">All services overview</Link>
        </div>

        <div>
          <h4>Company</h4>
          <Link href="/#why">Why Deptloy</Link>
          <Link href="/#about">About studio</Link>
          <Link href="/#faq">FAQ</Link>
          <Link href="/blogs">AI &amp; Tech Blogs</Link>
          <Link href="/#contact">Contact</Link>
          <a href="mailto:deptloy@gmail.com">deptloy@gmail.com</a>
        </div>

        <div className="cp flex flex-wrap items-center justify-between gap-4">
          <div>© 2026 Deptloy. All rights reserved.</div>
          <div className="flex items-center gap-6 text-sm">
            <button
              type="button"
              onClick={() => setActiveModal("privacy")}
              className="text-mute hover:text-deep cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setActiveModal("terms")}
              className="text-mute hover:text-deep cursor-pointer"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={activeModal === "privacy"}
        onClose={() => setActiveModal(null)}
        title="Privacy Policy"
      >
        <div className="space-y-4 text-sm text-mute">
          <p>
            Deptloy is dedicated to safeguarding your personal and business data. We collect only necessary information required to communicate regarding project scopes, architecture, and service delivery.
          </p>
          <p>
            We do not sell, rent, or trade your data to third parties. Customer call data and CRM records are processed within encrypted, dedicated infrastructure adhering to modern data security standards.
          </p>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === "terms"}
        onClose={() => setActiveModal(null)}
        title="Terms of Service"
      >
        <div className="space-y-4 text-sm text-mute">
          <p>
            By accessing or engaging Deptloy software systems and consulting services, you agree to these Terms. All intellectual property developed specifically for custom client contracts is transferred upon full settlement of project milestones.
          </p>
          <p>
            Systems developed by Deptloy come with defined care and maintenance provisions to ensure long-term stability and platform compatibility.
          </p>
        </div>
      </Modal>
    </footer>
  );
}
