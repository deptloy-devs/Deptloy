import type { Metadata } from "next";
import { Hero } from "@/components/marketing/Hero";
import { WhyChooseUs } from "@/components/marketing/WhyChooseUs";
import { ServicesSection } from "@/components/marketing/ServicesSection";
import { Testimonials } from "@/components/marketing/Testimonials";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <ServicesSection />
      <Testimonials />
    </>
  );
}
