import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Projects | Deptloy Software Engineering & AI Studio",
  description:
    "Explore applications, voice agents, and digital products engineered and maintained by Deptloy, including our upcoming Akhirah app and live voice AI systems.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Projects", item: "/projects" },
        ]}
      />
      {children}
    </>
  );
}

