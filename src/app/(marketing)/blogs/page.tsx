import type { Metadata } from "next";
import Link from "next/link";
import { Zap } from "lucide-react";
import { BlogList } from "@/components/marketing/BlogList";
import { blogPosts } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "AI Insights & Architecture Briefs",
  description:
    "Curated, essential insights on voice AI latency, autonomous workflow agents, enterprise privacy, and front-office automation from Deptloy.",
  alternates: { canonical: "/blogs" },
};

export default function BlogsPage() {
  return (
    <div className="py-14 sm:py-20">
      <div className="wrap">
        <span className="k">Field notes &amp; briefs</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--deep)] max-w-3xl mt-1 leading-tight">
          High-signal intelligence for AI implementation.
        </h1>
        <p className="lead2 max-w-2xl text-sm sm:text-base mt-2">
          Concise, practical breakdowns of real-time voice latency, autonomous workflows, model architectures, and data security. No fluff, just implementation reality.
        </p>

        {/* Executive Summary Banner */}
        <div
          className="my-8 p-6 sm:p-8 bg-white border border-[rgba(21,19,74,0.14)]"
          style={{
            clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)",
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--pur)]">
                <Zap className="h-3.5 w-3.5 text-[var(--or)]" aria-hidden="true" />
                State of Business AI — 2026 Executive Summary
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--deep)]">
                Streaming conversational voice &amp; deterministic tool execution have replaced static chatbots.
              </h2>
              <p className="text-sm leading-relaxed text-[var(--mute)]">
                The modern AI stack is defined by three rules: low-latency streaming voice for natural conversation, zero training retention on customer data, and bi-directional CRM integration that writes verified bookings rather than hallucinating answers.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <Link href="/demo" className="btn sm">
                Try AI Receptionist Demo
              </Link>
            </div>
          </div>
        </div>

        {/* Blog Posts Filter & Grid */}
        <BlogList posts={blogPosts} />
      </div>
    </div>
  );
}
