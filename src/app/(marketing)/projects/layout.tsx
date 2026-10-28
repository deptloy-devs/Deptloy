import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "What We Deliver | AI Receptionists, Automation, CRM & Apps | Deptloy",
  description:
    "See what you get from Deptloy: AI receptionists, business automation, CRMs and custom web apps, with example screens and a step-by-step look at how a project is built.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return children;
}
