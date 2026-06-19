import type { MetadataRoute } from "next";
import { getCoreCitySlugs } from "@/data/cities";
import { getAllProjectSlugs } from "@/data/projects";
import { getAllBlogSlugs } from "@/data/blog";

const BASE_URL = "https://alfapaintingcarpentry.com";

// PIVOT SIDING-ONLY — só /services/siding (+ sub-tipos hardie/vinyl/cedar
// que continuam relevantes pra material-specific SEO).
const serviceSlugs = [
  "siding",
  "hardie-plank-siding",
  "vinyl-siding",
  "cedar-shake-siding",
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Só cidades "core" (dentro do raio real ~35 mi). As "extended" são
  // noindex e ficam fora do sitemap. Ver data/cities.ts.
  const citySlugs = getCoreCitySlugs();
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

  // ─── Service Pages — siding + 3 sub-tipos ───
  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.95,
  }));

  // ─── City Landing Pages (109) ───
  const cityPages: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: `${BASE_URL}/massachusetts/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // ─── City + Siding Pages (109 — sem carpentry/windows/remodeling/painting) ───
  const cityServicePages: MetadataRoute.Sitemap = citySlugs.map((city) => ({
    url: `${BASE_URL}/massachusetts/${city}/siding`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

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
