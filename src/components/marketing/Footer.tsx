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
          <Link href="/projects">Projects &amp; Blueprints</Link>
          <Link href="/about">About Studio</Link>
          <Link href="/blogs">Engineering Blogs</Link>
          <Link href="/contact#form">Contact Us</Link>
          <a href="mailto:deptloy@gmail.com">deptloy@gmail.com</a>
        </div>

        <div className="cp flex flex-wrap items-center justify-between gap-4">
          <div>© 2026 Deptloy. All rights reserved.</div>
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-mute hover:text-deep"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-mute hover:text-deep"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      <Modal
        isOpen={activeModal === "privacy"}
        onClose={() => setActiveModal(null)}
        title="Privacy &amp; Data Governance Overview"
      >
        <div className="space-y-4 text-sm text-[var(--mute)] leading-relaxed">
          <p className="text-xs bg-[var(--paper)] p-2.5 border border-[var(--peri)]">
            <strong>Studio Policy Overview:</strong> This summary describes standard studio practices. Executed Master Services Agreements include customized Data Processing Addenda.
          </p>
          <p>
            At Deptloy, we take data isolation and privacy seriously. Customer and patient records ingested by our AI receptionists, CRMs, and automations are never sold, rented, or used to train third-party public commercial AI models.
          </p>
          <p>
            All phone recordings, call transcripts, and customer intake details are secured with TLS 1.3 encryption in transit and AES-256 encryption at rest. Inquiries submitted through our website are routed directly to our engineering team at <strong>deptloy@gmail.com</strong>.
          </p>
          <div className="pt-2">
            <Link href="/privacy" className="text-xs font-mono font-bold uppercase text-[var(--pur)] hover:underline" onClick={() => setActiveModal(null)}>
              View Full Privacy Policy Page →
            </Link>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === "terms"}
        onClose={() => setActiveModal(null)}
        title="Terms of Service &amp; Engagement Overview"
      >
        <div className="space-y-4 text-sm text-[var(--mute)] leading-relaxed">
          <p className="text-xs bg-[var(--paper)] p-2.5 border border-[var(--peri)]">
            <strong>Studio Policy Overview:</strong> These terms summarize our engagement principles. Formal engineering deliverables are governed by mutually executed project agreements.
          </p>
          <p>
            Deptloy provides turnkey software engineering, voice AI orchestration, and system maintenance services. Every client deployment begins with a mutual technical discovery process and fixed project architectural scope.
          </p>
          <p>
            Unless explicitly agreed otherwise under a separate enterprise agreement, you retain complete ownership of your proprietary customer databases, CRM tables, and intellectual property.
          </p>
          <div className="pt-2">
            <Link href="/terms" className="text-xs font-mono font-bold uppercase text-[var(--pur)] hover:underline" onClick={() => setActiveModal(null)}>
              View Full Terms Page →
            </Link>
          </div>
        </div>
      </Modal>
    </footer>
  );
}
