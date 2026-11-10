import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Custom Software Solutions",
  description:
    "Explore interactive solution blueprints and custom software platforms engineered by Deptloy, including healthcare hubs, dispatch systems, and AI receptionists.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Solutions", item: "/solutions" },
        ]}
      />
      {children}
    </>
  );
}
