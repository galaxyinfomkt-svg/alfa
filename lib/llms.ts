import { company } from "@/data/company";
import { getAllServices } from "@/data/services";
import { cities } from "@/data/cities";
import { cityDistanceMiles } from "@/data/cityDistances";
import { projects, projectLocation } from "@/data/projects";
import { blogPosts } from "@/data/blog";
import { homeFaqs } from "@/data/faqData";

/**
 * llms.txt e llms-full.txt gerados a partir dos mesmos dados do site.
 *
 * As versoes estaticas em /public ainda descreviam a empresa antiga (janelas,
 * carpintaria, reforma, "109 cidades e sul de NH", "18+ anos") e linkavam
 * paginas que nao existem mais. Gerando daqui, nao tem como divergir.
 */

const SITE = company.website;

const byDistance = [...cities].sort(
  (a, b) => (cityDistanceMiles[a.slug] ?? 99) - (cityDistanceMiles[b.slug] ?? 99) || a.name.localeCompare(b.name),
);

function header(): string {
  return `# ${company.tradeName}

> ${company.tradeName} is a licensed Massachusetts siding contractor based in ${company.address.locality}, MA. We do one thing: complete full-home siding installation and replacement — James Hardie fiber cement, vinyl, cedar shake, clapboard, board & batten, insulated and engineered wood siding. Owner-operated by ${company.owner} since ${company.foundedYear}. Bilingual (English & Portuguese).

## Company details

- **Legal name:** ${company.name}
- **Owner:** ${company.owner}
- **Founded:** ${company.foundedYear}
- **License:** Massachusetts Home Improvement Contractor (HIC) ${company.license}, valid through ${company.licenseExpiry}
- **Phone:** ${company.phone}
- **Email:** ${company.email}
- **Address:** ${company.address.street}, ${company.address.locality}, ${company.address.region} ${company.address.postalCode}
- **Service area:** ${company.serviceArea}
- **Hours:** ${company.hours}
- **Google rating:** ${company.rating} from ${company.reviewCount} reviews (${company.googleMapsUrl})
- **What we don't do:** patch jobs, single-panel repairs, painting, roofing, interior remodeling. Window and door replacement only as part of a full re-side.
`;
}

export function llmsTxt(): string {
  const services = getAllServices()
    .map((s) => `- [${s.name}](${SITE}/services/${s.slug}): ${s.cardSummary}`)
    .join("\n");
  const nearest = byDistance
    .slice(0, 20)
    .map((c) => `[${c.name}](${SITE}/massachusetts/${c.slug})`)
    .join(", ");
  return `${header()}
## Services

${services}

## Key pages

- [Home](${SITE}/)
- [All siding services](${SITE}/services)
- [Projects with before/after photos](${SITE}/projects)
- [Service area](${SITE}/massachusetts)
- [Siding guides (blog)](${SITE}/blog)
- [About ${company.owner} and the company](${SITE}/about)
- [Free estimate / contact](${SITE}/contact)
- [Full version of this file](${SITE}/llms-full.txt)

## Towns closest to our Bellingham office

${nearest}
`;
}

export function llmsFullTxt(): string {
  const services = getAllServices()
    .map((s) => `### ${s.name}\n\n${s.description}\n\nURL: ${SITE}/services/${s.slug}`)
    .join("\n\n");
  const proj = projects
    .map((p) => `- [${p.title}](${SITE}/projects/${p.slug}) — ${projectLocation(p)}`)
    .join("\n");
  const posts = [...blogPosts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((p) => `- [${p.title}](${SITE}/blog/${p.slug}) (${p.date}): ${p.excerpt}`)
    .join("\n");
  const towns = byDistance
    .map((c) => `- [${c.name}](${SITE}/massachusetts/${c.slug}) — ${c.county} County, ${cityDistanceMiles[c.slug] ?? "?"} mi from Bellingham`)
    .join("\n");
  const faqs = homeFaqs.map((f) => `**${f.q}**\n${f.a}`).join("\n\n");
  return `${header()}
## Services

${services}

## Projects

${proj}

## Siding guides

${posts}

## Frequently asked questions

${faqs}

## Service area (sorted by straight-line distance from our office)

${towns}
`;
}
