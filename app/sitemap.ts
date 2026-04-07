import type { MetadataRoute } from "next";
import { getAllCitySlugs } from "@/data/cities";
import { getAllProjectSlugs } from "@/data/projects";
import { getAllBlogSlugs } from "@/data/blog";

const BASE_URL = "https://alfapaintingcarpentry.com";
const serviceSlugs = ["carpentry", "siding", "windows-doors", "remodeling"];

export default function sitemap(): MetadataRoute.Sitemap {
  const citySlugs = getAllCitySlugs();
  const projectSlugs = getAllProjectSlugs();
  const blogSlugs = getAllBlogSlugs();
  const now = new Date().toISOString();

  // ─── Core Pages ───
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
  ];

  // ─── Service Pages (main conversion pages) ───
  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.95,
  }));

  // ─── City Landing Pages (local SEO) ───
  const cityPages: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: `${BASE_URL}/massachusetts/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // ─── City + Service Pages (long-tail keywords) ───
  const cityServicePages: MetadataRoute.Sitemap = citySlugs.flatMap((city) =>
    serviceSlugs.map((service) => ({
      url: `${BASE_URL}/massachusetts/${city}/${service}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  );

  // ─── Project Pages ───
  const projectPages: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${BASE_URL}/projects/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // ─── Blog Posts ───
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...cityPages,
    ...cityServicePages,
    ...projectPages,
    ...blogPages,
  ];
}
