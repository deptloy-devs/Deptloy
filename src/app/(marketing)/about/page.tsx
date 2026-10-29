import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MonitorSmartphone, PhoneCall, Workflow } from "lucide-react";
import { AboutStudioSection } from "@/components/marketing/AboutStudioSection";
import { BlogCta } from "@/components/marketing/blog/BlogCta";

export const metadata: Metadata = {
  title: "About Deptloy | Software that fits how your business works",
  description:
    "Deptloy designs and builds AI receptionists, automations, customer systems and websites for growing businesses, all connected so they work as one.",
  alternates: { canonical: "/about" },
};

// No names or photos for now: each founder is shown by the part of the work they lead.
const founders = [
  {
    icon: Workflow,
    role: "Systems & data",
    doing: "Plans how your tools connect and where your information lives.",
    tone: "lav",
  },
  {
    icon: PhoneCall,
    role: "AI & phone calls",
    doing: "Builds AI receptionists and the automations behind them.",
    tone: "peach",
  },
  {
    icon: MonitorSmartphone,
    role: "Websites & apps",
    doing: "Designs and builds the screens your team and customers use.",
    tone: "sky",
  },
];

export default function AboutPage() {
  return (
    <div className="au">
      <div className="wrap">
        <div className="au-hero">
          <div>
            <span className="k">About Deptloy</span>
            <h1>Software that fits how your business already works.</h1>
            <p className="au-intro">
              Deptloy designs and builds AI receptionists, automations, customer systems and websites for growing
              businesses, all connected so they work as one.
            </p>
            <div className="au-cta">
              <Link className="btn" href="/contact#form">
                Discuss your project
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link className="btn ghost" href="/projects">
                See what we build
              </Link>
            </div>
          </div>

          <aside className="au-team" aria-labelledby="au-team-title">
            <div className="au-team-top">
              <div className="au-faces" aria-hidden="true">
                {founders.map(({ icon: Icon, role, tone }) => (
                  <span key={role} className="au-face" data-tone={tone}>
                    <Icon />
                  </span>
                ))}
              </div>
              <span className="au-chip">3 co-founders</span>
              <h2 id="au-team-title">Who you&apos;ll work with</h2>
              <p>Each co-founder leads a different part of your project.</p>
            </div>
            <ul className="au-roles">
              {founders.map(({ role, doing, tone }, i) => (
                <li key={role} data-tone={tone}>
                  <span className="au-role-num" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <span>
                    <b>{role}</b>
                    <span className="au-role-doing">{doing}</span>
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <AboutStudioSection />

        <BlogCta />
      </div>
    </div>
  );
}
