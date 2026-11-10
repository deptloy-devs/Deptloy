import React from "react";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.deptloy.com/#organization",
    name: "Deptloy",
    legalName: "Deptloy",
    url: "https://www.deptloy.com",
    logo: {
      "@type": "ImageObject",
      url: "https://www.deptloy.com/icon-512.png",
      width: 512,
      height: 512,
    },
    image: "https://www.deptloy.com/opengraph-image.png",
    description:
      "Deptloy builds custom software, AI receptionists, CRM systems, and intelligent business automation tailored to the way your company works.",
    email: "contact@deptloy.com",
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "contact@deptloy.com",
        contactType: "customer support",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.deptloy.com/#website",
    url: "https://www.deptloy.com",
    name: "Deptloy",
    alternateName: ["Deptloy Studio", "Deptloy Software"],
    description:
      "Deptloy builds custom software, AI receptionists, CRM systems, and intelligent business automation tailored to the way your company works.",
    publisher: {
      "@id": "https://www.deptloy.com/#organization",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function SiteNavigationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SiteNavigationElement",
        name: "Projects",
        description: "Studio projects, applications, and tools we build and launch.",
        url: "https://www.deptloy.com/projects",
      },
      {
        "@type": "SiteNavigationElement",
        name: "Solutions",
        description: "Explore custom software platforms and engineering blueprints.",
        url: "https://www.deptloy.com/solutions",
      },
      {
        "@type": "SiteNavigationElement",
        name: "How It Works",
        description: "Our rapid 5-stage engineering and deployment journey.",
        url: "https://www.deptloy.com/how-it-works",
      },
      {
        "@type": "SiteNavigationElement",
        name: "AI Receptionist Demo",
        description: "Interactive simulator for custom AI receptionists and voice callers.",
        url: "https://www.deptloy.com/demo",
      },
      {
        "@type": "SiteNavigationElement",
        name: "About",
        description: "About Deptloy software engineering studio and team.",
        url: "https://www.deptloy.com/about",
      },
      {
        "@type": "SiteNavigationElement",
        name: "Let's Connect",
        description: "Discuss and scope your custom software project with our engineers.",
        url: "https://www.deptloy.com/contact",
      },
      {
        "@type": "SiteNavigationElement",
        name: "Engineering Blogs",
        description: "Technical articles on architecture, AI, and workflow automation.",
        url: "https://www.deptloy.com/blogs",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface BreadcrumbItem {
  name: string;
  item: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.item.startsWith("http")
        ? crumb.item
        : `https://www.deptloy.com${crumb.item}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
