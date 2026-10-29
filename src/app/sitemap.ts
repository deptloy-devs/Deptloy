import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blogs";
import { projectBlueprints } from "@/lib/project-blueprints";

const base = "https://deptloy.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/how-it-works", "/projects", "/about", "/blogs", "/contact", "/demo"];
  return [
    ...pages.map((path) => ({
      url: `${base}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...projectBlueprints.map((project) => ({
      url: `${base}/projects/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...getAllPosts().map((post) => ({
      url: `${base}/blogs/${post.slug}`,
      lastModified: post.publishedAt,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
