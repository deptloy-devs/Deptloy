import { Hero } from "@/components/marketing/Hero";
import { InPageNav } from "@/components/marketing/InPageNav";
import { ServicesSection } from "@/components/marketing/ServicesSection";
import { ReceptionistShowcase } from "@/components/marketing/ReceptionistShowcase";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { IndustriesSection } from "@/components/marketing/IndustriesSection";
import { BenefitsSection } from "@/components/marketing/BenefitsSection";
import { CaseStudiesSection } from "@/components/marketing/CaseStudiesSection";
import { FinalCta } from "@/components/marketing/FinalCta";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <InPageNav />
      <ServicesSection />
      <ReceptionistShowcase />
      <HowItWorks />
      <IndustriesSection />
      <BenefitsSection />
      <CaseStudiesSection />
      <div id="about">
        <FinalCta />
      </div>
    </div>
  );
}
