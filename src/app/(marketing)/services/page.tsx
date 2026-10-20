import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/marketing/PageHero";
import { ServiceGrid } from "@/components/marketing/ServicesSection";
import { IndustriesSection } from "@/components/marketing/IndustriesSection";
import { FinalCta } from "@/components/marketing/FinalCta";

export const metadata: Metadata = {
  title: "AI Services & Business Solutions",
  description:
    "Explore our AI Receptionist, Business Workflow Automation, CRM Solutions, and Web & App Development services.",
  alternates: { canonical: "/services" },
};

export default function ServicesOverviewPage() {
  return (
    <>
      <PageHero
        eyebrow="Comprehensive Service Suite"
        title="AI Services Built for Real Business Operations"
        description="We eliminate administrative friction across your customer communication, scheduling, and software pipelines. Explore each service below."
        actions={
          <>
            <Button href="/contact" size="lg" rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}>
              Book a Consultation
            </Button>
            <Button href="/demo" variant="outline" size="lg">
              Try AI Receptionist Demo
            </Button>
          </>
        }
      />

      <Section tone="surface" divider>
        <SectionHeading
          eyebrow="All Services"
          title="Choose the Service You Need"
          description="Every service can be deployed independently or combined into a unified business operating system."
          className="mb-14"
        />
        <ServiceGrid />
      </Section>

      <IndustriesSection />
      <FinalCta />
    </>
  );
}
