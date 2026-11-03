import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

// The demo page is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "AI Receptionist Interactive Simulator",
  description:
    "Test Deptloy's custom AI receptionist in real time. Choose your industry vertical and experience live simulated caller intake and calendar booking.",
  alternates: { canonical: "/demo" },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "AI Receptionist Simulator", item: "/demo" },
        ]}
      />
      {children}
    </>
  );
}
