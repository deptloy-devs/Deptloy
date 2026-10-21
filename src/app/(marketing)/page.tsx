import type { Metadata } from "next";
import { Hero } from "@/components/marketing/Hero";
import { ProofStrip } from "@/components/marketing/ProofStrip";
import { ServicesSection } from "@/components/marketing/ServicesSection";
import { ReceptionistShowcase } from "@/components/marketing/ReceptionistShowcase";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { IndustriesSection } from "@/components/marketing/IndustriesSection";
import { BenefitsSection } from "@/components/marketing/BenefitsSection";
import { CaseStudiesSection } from "@/components/marketing/CaseStudiesSection";
import { Testimonials } from "@/components/marketing/Testimonials";
import { FinalCta } from "@/components/marketing/FinalCta";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Trust first, then convert: hero → proof → offer → how → who it's for → impact → work → voices → CTA
export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <ServicesSection />
      <ReceptionistShowcase />
      <HowItWorks />
      <IndustriesSection />
      <BenefitsSection />
      <CaseStudiesSection />
      <Testimonials />
      <FinalCta />
    </>
  );
}
