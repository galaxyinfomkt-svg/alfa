import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCityBySlug, cities, isExtendedCity } from "@/data/cities";
import { cityDistanceMiles } from "@/data/cityDistances";
import { getFeaturedProjects, projectLocation } from "@/data/projects";
import { getAllServices } from "@/data/services";
import { company, breadcrumbSchema } from "@/data/company";
import { fitTitle, fitDescription } from "@/lib/serpWidth";
import { getService } from "@/data/schema";
import ReviewsWidget from "@/components/ReviewsWidget";
import CTASection from "@/components/CTASection";
import SiteVideo from "@/components/SiteVideo";
import FormEmbed from "@/components/FormEmbed";

/* ---------- hero image ---------- */

/* Fotos landscape de re-sides completos. A rotacao e por cidade, entao duas
   cidades vizinhas raramente repetem a mesma foto. O overlay e mais leve que o
   anterior (black/90): a casa precisa aparecer — e a prova do servico. */
const heroImages = [
  { src: "/images/hardie-plank-siding-carlisle-ma-after-front.jpg", alt: "Finished Hardie Plank siding on a Massachusetts home" },
  { src: "/images/dark-shake-siding-renovation-after-ma.jpg", alt: "Charcoal shake siding after a full exterior re-side" },
  { src: "/images/green-siding-exterior-completed-ma.jpg", alt: "Sage green siding with white trim after a full re-side" },
  { src: "/images/hardie-plank-siding-carlisle-ma-front-day.jpg", alt: "Front elevation after a complete fiber cement re-side" },
  { src: "/images/blue-gray-siding-red-door-ma.jpg", alt: "Blue-gray clapboard siding with white trim" },
  { src: "/images/hardie-plank-siding-carlisle-ma-after-garage.jpg", alt: "Hardie Plank siding around garage and entry" },
  { src: "/images/exterior-siding-cape-cod-home-bellingham-ma.jpg", alt: "Gray clapboard siding on a Cape Cod home in Bellingham, MA" },
  { src: "/images/hardie-plank-siding-carlisle-ma-after-side.jpg", alt: "Hardie Plank lap siding with trim detail" },
];

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) { h = (h << 5) - h + s.charCodeAt(i); h |= 0; }
  return Math.abs(h);
}

function getCityHeroImage(slug: string) {
  return heroImages[hashStr(slug) % heroImages.length];
}

/** "about 14 miles" / "here in Bellingham" */
function distancePhrase(slug: string, name: string): string {
  const mi = cityDistanceMiles[slug];
  if (mi === undefined) return `near our Bellingham base`;
  if (mi < 1) return `here in ${name}, home of our office`;
  return `about ${mi} miles from our Bellingham base`;
}

export async function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};

  const title = fitTitle(`Siding Contractor in ${city.name}, MA`, [
    " — Free Estimate",
    "",
  ]);

  const description = fitDescription([
    `Full-home siding installation & replacement in ${city.name}, MA — Hardie Plank, vinyl, cedar & clapboard. Licensed MA HIC, insured. Free estimate: ${company.phone}.`,
    `Full-home siding in ${city.name}, MA — Hardie Plank, vinyl & cedar. Licensed & insured. Free estimate: ${company.phone}.`,
  ]);

  const hero = getCityHeroImage(city.slug);

  return {
    title,
    description,
    robots: isExtendedCity(city.slug) ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://alfapaintingcarpentry.com/massachusetts/${city.slug}`,
      images: [{ url: hero.src, width: 1200, height: 630, alt: hero.alt }],
    },
    alternates: {
      canonical: `https://alfapaintingcarpentry.com/massachusetts/${city.slug}`,
    },
  };
}

const check = (
  <svg className="w-4 h-4 text-alfa-gold shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const steps = [
  { title: "Free walk-around estimate", text: "Fabio inspects every elevation, checks for rot behind the old siding and writes an itemized quote: materials, labor, permit, disposal." },
  { title: "Permit & material order", text: "We pull the building permit and order your siding, trim and weather barrier so the crew starts with everything on site." },
  { title: "Strip, wrap & install", text: "Old siding comes off to the sheathing, damaged boards are replaced, then house wrap, flashing and the new siding go on." },
  { title: "Final walk-through", text: "We walk the house with you, finish any punch-list item and leave the yard clean. Workmanship warranty starts that day." },
];

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const citySidingService = getService({ city: city.name, citySlug: city.slug });
  const heroImg = getCityHeroImage(city.slug);
  const distance = distancePhrase(city.slug, city.name);
  const materials = getAllServices().filter((s) => s.slug !== "siding");
  const neighbors = city.neighboringCities.map((n) => {
    const nSlug = n.toLowerCase().replace(/\s+/g, "-");
    return { name: n, slug: getCityBySlug(nSlug) ? nSlug : null };
  });
  const projects = getFeaturedProjects().slice(0, 3);

  const faqs = [
    {
      q: `Do you install siding in ${city.name}?`,
      a: `Yes. ${city.name} is ${distance}, and we take complete exterior re-sides there — Hardie Plank, vinyl, cedar shake, clapboard and board & batten. We do not take patch repairs or single-wall jobs.`,
    },
    {
      q: `Do I need a permit to re-side my home in ${city.name}?`,
      a: `In Massachusetts, replacing the siding on a home generally requires a building permit from the local building department, and the contractor must be a registered Home Improvement Contractor. We are registered (MA HIC ${company.license}) and pull the permit with the ${city.name} building department as part of the job.`,
    },
    {
      q: "How long does a full re-side take?",
      a: "Most single-family homes take one to two weeks on site, depending on size, material and weather. Your written estimate includes the timeline.",
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(citySidingService) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
          { name: "Home", url: "https://alfapaintingcarpentry.com" },
          { name: "Service Area", url: "https://alfapaintingcarpentry.com/massachusetts" },
          { name: `${city.name}, MA`, url: `https://alfapaintingcarpentry.com/massachusetts/${city.slug}` },
        ])) }}
      />

      {/* ===== HERO ===== */}
      <section className="relative pt-28 md:pt-36 pb-12 md:pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={heroImg.src} alt={`${heroImg.alt} — siding contractor serving ${city.name}, MA`} fill sizes="100vw" className="object-cover" priority quality={75} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/35" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-300 mb-4 flex-wrap">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span className="text-gray-500">/</span>
                <Link href="/massachusetts" className="hover:text-white transition-colors">Service Area</Link>
                <span className="text-gray-500">/</span>
                <span className="text-alfa-gold">{city.name}, MA</span>
              </nav>

              <h1 className="text-[2rem] leading-tight md:text-5xl font-bold text-white mb-4 [text-wrap:balance]">
                Siding Contractor in <span className="text-alfa-gold whitespace-nowrap">{city.name}, MA</span>
              </h1>
              <p className="text-gray-200 text-base md:text-lg leading-relaxed mb-6 max-w-xl">
                Full-home siding installation and replacement for {city.name} homes — {distance}.
                Licensed MA HIC {company.license}, insured, {company.experience} years.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Link href="/contact" className="inline-flex items-center justify-center whitespace-nowrap bg-alfa-gold hover:bg-alfa-gold-light text-black font-bold px-7 py-4 rounded-lg transition-colors text-base md:text-lg">
                  Get a Free Estimate
                </Link>
                <a href={company.phoneTel} className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-4 rounded-lg transition-colors border border-white/30 text-base md:text-lg">
                  Call {company.phone}
                </a>
              </div>

              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-200">
                <li className="flex items-center gap-1.5">{check}5.0 on Google · {company.reviewCount} reviews</li>
                <li className="flex items-center gap-1.5">{check}Full re-sides only</li>
                <li className="flex items-center gap-1.5">{check}Written estimate in 24h</li>
              </ul>
            </div>
            <div>
              <FormEmbed />
            </div>
          </div>
        </div>
      </section>

      {/* ===== MATERIALS ===== */}
      <section className="py-16 md:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <p className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">Siding options</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-3">Siding we install on {city.name} homes</h2>
            <p className="text-gray-400">Every job is a complete exterior re-side. Pick the material; we handle the tear-off, weather barrier, flashing, trim and cleanup.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {materials.map((m) => (
              <Link key={m.slug} href={`/services/${m.slug}`} className="group flex flex-col bg-alfa-card rounded-xl border border-white/5 hover:border-alfa-gold/40 p-5 transition-colors">
                <h3 className="text-lg font-bold text-white group-hover:text-alfa-gold transition-colors">{m.shortName}</h3>
                <p className="text-sm text-gray-400 mt-2 mb-4 flex-1">{m.cardSummary}</p>
                <span className="text-sm font-semibold text-alfa-gold">See {m.shortName.toLowerCase()} details →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LOCAL ===== */}
      <section className="py-16 md:py-20 bg-alfa-dark">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <p className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">Local knowledge</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-5">Re-siding a home in {city.name}</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed max-w-prose">
              <p>{city.description}</p>
              <p>{city.sidingNote}</p>
              <p><span className="font-semibold text-white">Local note:</span> {city.uniqueFact}</p>
            </div>
          </div>
          <aside className="lg:col-span-2 space-y-5">
            <div className="bg-alfa-card rounded-xl border border-white/5 p-6">
              <h3 className="font-bold text-white mb-4">{city.name} at a glance</h3>
              <dl className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-3 text-sm">
                <dt className="text-gray-400">County</dt><dd className="text-white">{city.county}</dd>
                <dt className="text-gray-400">Population</dt><dd className="text-white">{city.population} <span className="text-gray-500">(2020 Census)</span></dd>
                <dt className="text-gray-400">Typical homes</dt><dd className="text-white">{city.homeStyle}</dd>
                <dt className="text-gray-400">From our office</dt><dd className="text-white">{cityDistanceMiles[city.slug] ? `~${cityDistanceMiles[city.slug]} mi from Bellingham` : "Bellingham"}</dd>
              </dl>
            </div>
            <div className="bg-alfa-card rounded-xl border border-white/5 p-6">
              <h3 className="font-bold text-white mb-4">Neighboring towns</h3>
              <ul className="flex flex-wrap gap-2">
                {neighbors.map((n) => (
                  <li key={n.name}>
                    {n.slug ? (
                      <Link href={`/massachusetts/${n.slug}`} className="inline-block bg-white/5 border border-white/10 text-gray-200 hover:border-alfa-gold/40 hover:text-alfa-gold text-sm px-3 py-1.5 rounded-full transition-colors">{n.name}</Link>
                    ) : (
                      <span className="inline-block bg-white/5 border border-white/10 text-gray-400 text-sm px-3 py-1.5 rounded-full">{n.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section className="py-16 md:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div className="max-w-2xl">
              <p className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">Our work</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Recent full-home re-sides</h2>
            </div>
            <Link href="/projects" className="text-alfa-gold font-semibold hover:text-alfa-gold-light whitespace-nowrap">All projects →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {projects.map((p) => (
              <Link key={p.slug} href={`/projects/${p.slug}`} className="group block bg-alfa-card rounded-xl border border-white/5 overflow-hidden hover:border-alfa-gold/40 transition-colors">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image src={p.image} alt={p.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-5">
                  <h3 className="text-white font-bold leading-snug">{p.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{projectLocation(p)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="py-16 md:py-20 bg-alfa-cream text-alfa-ink">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-alfa-gold-dark font-semibold text-sm uppercase tracking-wider">How it works</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-10">From estimate to finished re-side</h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((s, i) => (
              <li key={s.title} className="bg-white rounded-xl border border-alfa-cream-border p-6">
                <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-alfa-gold text-black font-bold">{i + 1}</span>
                <h3 className="font-bold text-lg mt-4 mb-2">{s.title}</h3>
                <p className="text-sm text-alfa-ink-muted leading-relaxed">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-16 md:py-20 bg-black">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Questions from {city.name} homeowners</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="bg-alfa-card rounded-xl border border-white/5 group">
                <summary className="p-5 font-semibold text-white flex justify-between items-center gap-4">
                  {f.q}
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="px-5 pb-5 text-gray-300 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <section className="py-16 md:py-20 bg-alfa-cream text-alfa-ink">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-alfa-gold-dark font-semibold text-sm uppercase tracking-wider">Reviews</p>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-3">What homeowners say on Google</h2>
            <p className="text-alfa-ink-muted">5.0 average from {company.reviewCount} Google reviews.</p>
          </div>
          <ReviewsWidget />
        </div>
      </section>

      <SiteVideo citySlug={city.slug} placeName={`${city.name}, MA`} />

      <CTASection cityName={city.name} />
    </>
  );
}
