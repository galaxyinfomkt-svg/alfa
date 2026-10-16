import type { MetadataRoute } from "next";
import { getCoreCitySlugs } from "@/data/cities";
import { getAllServiceSlugs } from "@/data/services";
import { getAllProjectSlugs } from "@/data/projects";
import { getAllBlogSlugs } from "@/data/blog";

const BASE_URL = "https://alfapaintingcarpentry.com";
const SITE_CONTENT_UPDATED = "2026-10-16";

// Materiais de siding (paginas estaduais /services/<slug>). A matriz cidade x
// servico foi aposentada em out/2026 — ver next.config.ts.
const serviceSlugs = getAllServiceSlugs();

export default function sitemap(): MetadataRoute.Sitemap {
  // Só cidades "core" (dentro do raio real ~35 mi). As "extended" são
  // noindex e ficam fora do sitemap. Ver data/cities.ts.
  const citySlugs = getCoreCitySlugs();
  const projectSlugs = getAllProjectSlugs();
  const blogSlugs = getAllBlogSlugs();
  // Data da ultima mudanca real de conteudo. Antes era new Date() a cada build:
  // todo deploy declarava as paginas todas como alteradas, e o Google passa a
  // ignorar um lastmod que nunca e confiavel. Atualize ao mudar o conteudo.
  const now = SITE_CONTENT_UPDATED;

  // ─── Core Pages ───
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    // O hub de area de atendimento. Foi criado no commit 9b3b612 (era 404
    // recebendo 110 links internos) e eu esqueci de inclui-lo aqui — as 109
    // paginas de cidade filhas estavam no sitemap, mas a pagina-mae nao.
    // Prioridade alta: e a que atende busca estadual ("siding contractor
    // Massachusetts") e distribui link para as 109 cidades.
    { url: `${BASE_URL}/massachusetts`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
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

  // ─── City Landing Pages ───
  const cityPages: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: `${BASE_URL}/massachusetts/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
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
    ...projectPages,
    ...blogPages,
  ];
}
