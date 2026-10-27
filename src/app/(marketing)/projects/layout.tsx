import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Solution Blueprints | Custom Software Projects | Deptloy",
  description: "Explore illustrative custom software architectures for healthcare, operations, commerce and professional services, with interactive connected-system diagrams.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return children;
}
