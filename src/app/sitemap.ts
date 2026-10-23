import type { MetadataRoute } from "next";
import { services } from "@/lib/site";

const base = "https://deptloy.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/projects", "/about", "/blogs", "/contact", "/demo"];
  return [
    ...pages.map((path) => ({
      url: `${base}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...services.map((s) => ({
      url: `${base}${s.href}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
