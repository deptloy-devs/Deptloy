import React from "react";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.deptloy.com/#organization",
    name: "Deptloy",
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
