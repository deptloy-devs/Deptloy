import type { Metadata } from "next";
import { DemoHero } from "@/components/marketing/demo/DemoHero";
import { DemoWhyChooseUs } from "@/components/marketing/demo/DemoWhyChooseUs";
import { DemoServicesSection } from "@/components/marketing/demo/DemoServicesSection";
import { DemoTestimonials } from "@/components/marketing/demo/DemoTestimonials";

export const metadata: Metadata = {
  title: "Deptloy — Streamlined Demo (Decluttered & Concise)",
  description:
    "Demo edition with decluttered spacing, reduced copy, and high-readability design for team review.",
  alternates: { canonical: "/demo-home" },
  robots: {
    index: false,
    follow: false,
  },
};

export default function DemoHomePage() {
  return (
    <>
      <DemoHero />
      <DemoWhyChooseUs />
      <DemoServicesSection />
      <DemoTestimonials />
    </>
  );
}
