import type * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { BuildWalkthrough } from "@/components/marketing/deliver/BuildWalkthrough";
import { ServiceShowcase } from "@/components/marketing/deliver/ServiceShowcase";
import {
  ArchitectPicture,
  AutomationScreen,
  CrmScreen,
  DiscoverPicture,
  EngineerPicture,
  EvolvePicture,
  LaunchPicture,
  ReceptionistScreen,
  WebScreen,
} from "@/components/marketing/deliver/screens";
import { projectBlueprints } from "@/lib/project-blueprints";
import { services } from "@/lib/site";
import { buildSteps, EXAMPLE_BUSINESS, serviceShowcases } from "@/lib/solutions";
import type { ServiceSlug } from "@/types";

/** How each service looks on this page: its colour, example screen, and what it's doing in the hero card. */
const LOOK: Record<ServiceSlug, { color: string; screen: React.ReactNode; doing: string }> = {
  "ai-receptionist": { color: "var(--lav)", screen: <ReceptionistScreen />, doing: "Answering calls" },
  automation: { color: "var(--or)", screen: <AutomationScreen />, doing: "Sending reminders" },
  crm: { color: "var(--pur)", screen: <CrmScreen />, doing: "Keeping track of customers" },
  development: { color: "var(--co)", screen: <WebScreen />, doing: "Taking bookings online" },
};

const STEP_PICTURES = [DiscoverPicture, ArchitectPicture, EngineerPicture, LaunchPicture, EvolvePicture];

export default function ProjectsPage() {
  const items = serviceShowcases.map((showcase) => {
    const service = services.find((s) => s.slug === showcase.slug);
    if (!service) throw new Error(`No service for ${showcase.slug}`);
    return { ...showcase, title: service.title, href: service.href, ...LOOK[showcase.slug] };
  });
  const steps = buildSteps.map((step, i) => {
    const Picture = STEP_PICTURES[i];
    return { ...step, picture: <Picture /> };
  });

  return (
    <div className="wd">
      <div className="wrap">
        <div className="wd-hero">
          <div>
            <span className="k">What we deliver</span>
            <h1>See exactly what you&apos;ll get.</h1>
            <p className="wd-intro">
              Four services that fit together into one system for your business. Here&apos;s what each one looks like,
              and how we build it with you.
            </p>
            <div className="wd-cta">
              <Link className="btn" href="/contact#form">
                Discuss your project
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link className="btn ghost" href="/demo">
                Try our AI receptionist
              </Link>
            </div>
            <p className="wd-small">Screens on this page are examples, not client work.</p>
          </div>

          <div className="wd-hero-card wd-surface">
            <p className="wd-hero-head">
              <b>Your business, connected</b>
              <span className="wd-chip green">All running</span>
            </p>
            {items.map((item) => (
              <a key={item.slug} href={`#service-${item.slug}`} className="wd-hero-row">
                <span className="wd-dot" style={{ "--c": item.color } as React.CSSProperties} aria-hidden="true" />
                <span>
                  <b>{item.title}</b>
                  <span className="wd-muted">{item.doing}</span>
                </span>
                <ArrowRight aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="wd-part">
          <span className="k">Our services</span>
          <h2>Four services. One team behind all of them.</h2>
          <p className="wd-intro">Pick one to see what you&apos;d get. Use one on its own, or let them work together.</p>
          <ServiceShowcase items={items} />
        </div>

        <div className="wd-part">
          <span className="k">How it&apos;s built</span>
          <h2>Watch a project come together.</h2>
          <p className="wd-intro">
            {EXAMPLE_BUSINESS} is a made-up dental clinic that misses calls after hours. Here&apos;s how we&apos;d build
            its system, one step at a time.
          </p>
          <BuildWalkthrough steps={steps} />
        </div>

        <div className="wd-others">
          <p>The same pieces fit other businesses too:</p>
          <div className="wd-links">
            {projectBlueprints.map((blueprint) => (
              <Link key={blueprint.slug} href={`/projects/${blueprint.slug}`} className="wd-link">
                {blueprint.categoryLabel}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>

        <div className="wd-final">
          <h2>Tell us how your business works.</h2>
          <p>Tell us what slows your team down. We&apos;ll show you what we&apos;d build for you, in plain words.</p>
          <div className="wd-cta">
            <Link className="btn" href="/contact#form">
              Discuss your project
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="btn ghost" href="/demo">
              Try our AI receptionist
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
