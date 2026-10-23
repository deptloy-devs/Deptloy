import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, Cpu, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/marketing/PageHero";
import { BlogList } from "@/components/marketing/BlogList";
import { blogPosts } from "@/lib/blogs";
import { brand } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Insights & Architecture Briefs",
  description:
    "Curated, essential insights on voice AI latency, autonomous workflow agents, enterprise privacy, and front-office automation from the Deptloy engineering team.",
  alternates: { canonical: "/blogs" },
};

export default function BlogsPage() {
  return (
    <>
      <PageHero
        eyebrow="Latest AI Briefs"
        title="High-Signal Intelligence for AI Implementation"
        description="Concise, practical breakdowns of real-time voice latency, agentic automations, model architectures, and data security. No fluff, just implementation reality."
        actions={
          <>
            <Button
              href="/demo"
              size="lg"
              leftIcon={<Sparkles className="h-4 w-4" aria-hidden="true" />}
            >
              Test Live Voice AI
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Book a Strategy Call
            </Button>
          </>
        }
      />

      {/* Featured Fast Facts / Executive Briefing */}
      <Section tone="canvas" className="pt-0">
        <div className="mb-10 rounded-panel border border-brand-400/25 bg-gradient-to-br from-brand-950/40 via-card to-card p-6 shadow-raised sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-300">
                <Zap className="h-4 w-4 text-brand-400" aria-hidden="true" />
                State of Business AI — 2026 Executive Summary
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-fg">
                Sub-second voice response & deterministic tool execution have replaced static chatbots.
              </h2>
              <p className="text-sm leading-relaxed text-fg-muted">
                The modern AI enterprise stack is defined by three rules: latency under 500ms for natural conversation, zero training retention on customer data, and bi-directional CRM integration that writes verified bookings rather than hallucinating answers.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-col sm:w-56 shrink-0">
              <div className="rounded-card border border-line bg-raised/70 p-3">
                <span className="block font-display text-xl font-bold text-fg">&lt; 450ms</span>
                <span className="text-[11px] text-fg-subtle">Voice round-trip latency</span>
              </div>
              <div className="rounded-card border border-line bg-raised/70 p-3">
                <span className="block font-display text-xl font-bold text-fg">100%</span>
                <span className="text-[11px] text-fg-subtle">Zero data training retention</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filterable Blog List */}
        <BlogList posts={blogPosts} />
      </Section>

      {/* Minimal Bottom CTA */}
      <Section tone="surface" divider>
        <div className="mx-auto max-w-3xl text-center space-y-5">
          <h2 className="font-display text-h2 font-semibold text-fg">
            Deploy these architectures in your business
          </h2>
          <p className="text-lead text-fg-muted">
            We architect and deploy custom AI voice receptionists, autonomous CRM pipelines, and intelligent automations tailored to your exact tech stack.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              href="/contact"
              size="lg"
              variant="primary"
              rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
            >
              Consult with Our Team
            </Button>
            <Button href="/projects" variant="outline" size="lg">
              Explore Deployed Projects
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
