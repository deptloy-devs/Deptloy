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
            Software built to outlast the hype. Unified systems for businesses that run on calls, leads and customers.
          </p>
        </div>

        <div>
          <h4>Services</h4>
          <Link href="/services/ai-receptionist">AI Receptionist</Link>
          <Link href="/services/crm">Custom CRM</Link>
          <Link href="/services/automation">Workflow Automation</Link>
          <Link href="/services/development">Web &amp; Apps</Link>
          <Link href="/services" style={{ color: "var(--or)", fontWeight: 700 }}>
            All Services Scope →
          </Link>
        </div>

        <div>
          <h4>Company</h4>
          <Link href="/projects">Projects &amp; Case Studies</Link>
          <Link href="/about">About Studio</Link>
          <Link href="/blogs">Engineering Blogs</Link>
          <Link href="/contact">Contact &amp; Book</Link>
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
        <div className="space-y-4 text-sm text-[var(--mute)] leading-relaxed">
          <p>
            At Deptloy, we take data sovereignty and privacy seriously. Customer and patient records ingested by our AI receptionists, CRMs, and automations are never sold, rented, or used to train third-party public AI models.
          </p>
          <p>
            All phone recordings, call transcripts, and customer intake details are secured with TLS 1.3 encryption in transit and AES-256 encryption at rest. Inquiries submitted through our website are routed directly to our engineering team at <strong>deptloy@gmail.com</strong>.
          </p>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === "terms"}
        onClose={() => setActiveModal(null)}
        title="Terms of Service"
      >
        <div className="space-y-4 text-sm text-[var(--mute)] leading-relaxed">
          <p>
            Deptloy provides turnkey software engineering, voice AI orchestration, and system maintenance services. Every client deployment begins with a mutual technical discovery process and fixed project architectural scope.
          </p>
          <p>
            Unless explicitly agreed otherwise under a separate enterprise agreement, you retain complete ownership of your proprietary customer databases, CRM tables, and intellectual property.
          </p>
        </div>
      </Modal>
    </footer>
  );
}
