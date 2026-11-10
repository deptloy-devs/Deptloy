import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blogs";
import { projectBlueprints } from "@/lib/project-blueprints";
import { projects } from "@/lib/projects";

const base = "https://www.deptloy.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastMod = new Date();

  const corePages = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/projects", priority: 0.95, changeFrequency: "weekly" as const },
    { path: "/solutions", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/how-it-works", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/demo", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/blogs", priority: 0.8, changeFrequency: "daily" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "monthly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "monthly" as const },
  ];

  return [
    ...corePages.map((page) => ({
      url: `${base}${page.path}`,
      lastModified: lastMod,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...projects.map((project) => ({
      url: `${base}/projects/${project.slug}`,
      lastModified: lastMod,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...projectBlueprints.map((project) => ({
      url: `${base}/solutions/${project.slug}`,
      lastModified: lastMod,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    ...getAllPosts().map((post) => ({
      url: `${base}/blogs/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
