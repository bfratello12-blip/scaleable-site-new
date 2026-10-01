import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/caseStudies";
import { insights } from "@/content/insights";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/managed-growth", priority: 0.9, changeFrequency: "monthly" },
    { path: "/software", priority: 0.9, changeFrequency: "monthly" },
    { path: "/results", priority: 0.8, changeFrequency: "monthly" },
    { path: "/pricing", priority: 0.8, changeFrequency: "monthly" },
    { path: "/insights", priority: 0.7, changeFrequency: "weekly" },
    { path: "/approach", priority: 0.6, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route.path === "/" ? "" : route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...caseStudies.map((study) => ({
      url: `${siteConfig.url}/results/${study.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...insights.map((post) => ({
      url: `${siteConfig.url}/insights/${post.slug}`,
      lastModified: new Date(`${post.updatedAt ?? post.publishedAt}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
