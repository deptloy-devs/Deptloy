import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Custom Software Projects & Solutions | Deptloy",
  description:
    "Explore interactive solution blueprints and custom software platforms engineered by Deptloy, including healthcare hubs, dispatch systems, and AI receptionists.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Projects & Solutions", item: "/projects" },
        ]}
      />
      {children}
    </>
  );
}
