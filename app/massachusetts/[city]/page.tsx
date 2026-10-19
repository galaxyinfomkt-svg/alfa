import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCityBySlug, cities, isExtendedCity } from "@/data/cities";
import { cityDistanceMiles } from "@/data/cityDistances";
import { projects, getFeaturedProjects, projectLocation } from "@/data/projects";
import { company, breadcrumbSchema } from "@/data/company";
import { housingSource } from "@/data/cityHousing";
import { fitTitle, fitDescription } from "@/lib/serpWidth";
import { getCityProfile } from "@/lib/cityProfile";
import { getService } from "@/data/schema";
import { ReviewQuote } from "@/components/ReviewsSSR";
import CTASection from "@/components/CTASection";
import SiteVideo from "@/components/SiteVideo";

/* So fotos deitadas com 1600px+ de largura e sem lixo/escada/obra na cena:
   as menores e as em pe ficam borradas em tela cheia. A rotacao e por cidade, entao duas
   cidades vizinhas raramente repetem a mesma foto. */
const heroImages = [
  { src: "/images/hardie-plank-siding-carlisle-ma-after-rear-skylights.jpg", alt: "Finished Hardie Plank re-side with new deck and skylights" },
  { src: "/images/hardie-plank-siding-carlisle-ma-porch-side.jpg", alt: "Completed fiber cement re-side with porch and deck" },
];

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) { h = (h << 5) - h + s.charCodeAt(i); h |= 0; }
  return Math.abs(h);
}
const getCityHeroImage = (slug: string) => heroImages[hashStr(slug) % heroImages.length];

/** "about 14 miles from our Bellingham base" / "home of our office" */
function distancePhrase(slug: string, name: string): string {
  const mi = cityDistanceMiles[slug];
  if (mi === undefined) return "near our Bellingham base";
  if (mi < 1) return `here in ${name}, home of our office`;
  return `about ${mi} miles from our Bellingham base`;
}

const fmtInt = (n: number) => n.toLocaleString("en-US");

export async function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};

  const title = fitTitle(`Siding Contractor in ${city.name}, MA`, [" — Free Estimate", ""]);
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
    alternates: { canonical: `https://alfapaintingcarpentry.com/massachusetts/${city.slug}` },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const profile = getCityProfile(city);
  const citySidingService = getService({ city: city.name, citySlug: city.slug });
  const heroImg = getCityHeroImage(city.slug);
  const distance = distancePhrase(city.slug, city.name);
  const neighbors = city.neighboringCities.map((n) => {
    const nSlug = n.toLowerCase().replace(/\s+/g, "-");
    return { name: n, slug: getCityBySlug(nSlug) ? nSlug : null };
  });
  // Obra feita na propria cidade vem primeiro; o resto completa com destaques.
  const localProjects = projects.filter((p) => p.city === city.name);
  const shownProjects = [...localProjects, ...getFeaturedProjects().filter((p) => p.city !== city.name)].slice(0, 3);

  const faqs = profile?.faqs ?? [
    { q: `Do you install siding in ${city.name}?`, a: `Yes. ${city.name} is ${distance}, and we take complete exterior re-sides there.` },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(citySidingService) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "https://alfapaintingcarpentry.com" },
              { name: "Service Area", url: "https://alfapaintingcarpentry.com/massachusetts" },
              { name: `${city.name}, MA`, url: `https://alfapaintingcarpentry.com/massachusetts/${city.slug}` },
            ]),
          ),
        }}
      />

      {/* ===== HERO: foto em tela cheia ===== */}
      <section className="relative min-h-[82dvh] flex flex-col">
        <Image src={heroImg.src} alt={`${heroImg.alt} — siding contractor serving ${city.name}, MA`} fill sizes="100vw" className="object-cover" priority quality={85} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/30 to-transparent" aria-hidden="true" />
        <div className="relative mt-auto px-4 pb-16 md:pb-20 pt-36">
          <div className="max-w-7xl mx-auto">
            <nav aria-label="Breadcrumb" className="text-sm text-white/75 mb-5">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href="/" className="hover:text-white underline underline-offset-2">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/massachusetts" className="hover:text-white underline underline-offset-2">Service Area</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-white">{city.name}, MA</li>
              </ol>
            </nav>
            <h1 className="font-display text-white text-5xl sm:text-6xl lg:text-7xl max-w-4xl">Siding contractor in {city.name}, MA</h1>
            <p className="mt-5 text-white/85 text-lg md:text-xl max-w-2xl leading-relaxed">Full-home siding installation and replacement for {city.name} homes, {distance}. Licensed MA HIC {company.license} and insured, in business since {company.foundedYear}.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#estimate" className="group inline-flex items-center justify-between sm:justify-center gap-4 rounded-full bg-alfa-gold hover:bg-alfa-gold-light text-ink font-bold pl-7 pr-2 py-2 text-lg transition-colors">
                Get a free estimate
                <span className="w-11 h-11 rounded-full bg-ink/10 grid place-items-center transition-transform duration-500 ease-premium group-hover:translate-x-1" aria-hidden="true">→</span>
              </a>
              <a href={company.phoneTel} className="inline-flex items-center justify-center rounded-full bg-white/15 backdrop-blur hover:bg-white/25 text-white font-semibold px-7 py-4 text-lg transition-colors">
                Call {company.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CASAS DA CIDADE (dados do Censo) ===== */}
      {profile && (
        <section className="py-16 md:py-24 bg-mist">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12">
            <div>
              <h2 className="font-display text-4xl md:text-5xl text-ink mb-6">{city.name} homes, by the numbers</h2>
              <div className="space-y-4 text-ink-soft leading-relaxed max-w-prose">
                {profile.housingParagraphs.map((p) => <p key={p}>{p}</p>)}
              </div>
            </div>
            <figure className="bg-card shadow-soft rounded-[2rem] p-6 md:p-8 self-start">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
                <div><dt className="text-sm text-ink-soft">Median year built</dt><dd className="text-3xl font-bold text-ink tabular-nums">{profile.h.medianYearBuilt}</dd></div>
                <div><dt className="text-sm text-ink-soft">Homes</dt><dd className="text-3xl font-bold text-ink tabular-nums">{fmtInt(profile.h.housingUnits)}</dd></div>
                <div><dt className="text-sm text-ink-soft">Built before 1980</dt><dd className="text-3xl font-bold text-ink tabular-nums">{profile.h.pctBuiltBefore1980}%</dd></div>
                <div><dt className="text-sm text-ink-soft">Single-family detached</dt><dd className="text-3xl font-bold text-ink tabular-nums">{profile.h.pctSingleFamilyDetached}%</dd></div>
                <div><dt className="text-sm text-ink-soft">2–4 unit buildings</dt><dd className="text-3xl font-bold text-ink tabular-nums">{profile.h.pctTwoToFourUnits}%</dd></div>
                <div><dt className="text-sm text-ink-soft">Owner-occupied</dt><dd className="text-3xl font-bold text-ink tabular-nums">{profile.h.pctOwnerOccupied}%</dd></div>
              </dl>
              <figcaption className="mt-6 pt-4 border-t border-line text-xs text-ink-soft">
                Source: {housingSource.label}, {profile.h.geoName.replace(", MA", "")}.
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      {/* ===== ATRAS DO SIDING VELHO ===== */}
      {profile && profile.behindTheSiding.length > 0 && (
        <section className="py-16 md:py-24 bg-paper">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="font-display text-4xl md:text-5xl text-ink mb-4 max-w-3xl">What we expect behind old siding in {city.name}</h2>
            <p className="text-ink-soft max-w-2xl mb-10">Based on when {city.name}&apos;s homes were built, these are the conditions we plan for at the estimate, so they never become a surprise change order.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              {profile.behindTheSiding.map((b) => (
                <div key={b.title} className="rounded-[1.75rem] bg-card shadow-soft p-7">
                  <h3 className="text-xl font-bold text-ink mb-2">{b.title}</h3>
                  <p className="text-ink-soft leading-relaxed">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== MATERIAIS PARA O PERFIL ===== */}
      <section className="px-4 py-6 md:py-10">
        <div className="max-w-7xl mx-auto rounded-[2.25rem] bg-charcoal text-white px-6 py-12 md:px-12 md:py-16">
          <h2 className="font-display text-4xl md:text-5xl mb-10 max-w-3xl">Siding that suits {city.name} homes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(profile?.materialPicks ?? []).map((m) => (
              <Link key={m.slug} href={`/services/${m.slug}`} className="group block rounded-[1.5rem] bg-white/[0.06] ring-1 ring-white/10 p-6 hover:bg-white/[0.1] transition-colors">
                <h3 className="text-2xl font-bold group-hover:text-alfa-gold-light transition-colors">{m.label}</h3>
                <p className="mt-2 text-white/75 leading-relaxed">{m.why}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-alfa-gold-light">Details →</span>
              </Link>
            ))}
          </div>
          <p className="mt-10 text-white/70">
            Every option is a complete re-side: tear-off, sheathing repair, weather barrier, flashing, trim and cleanup.{" "}
            <Link href="/services" className="font-semibold text-white underline underline-offset-2">Compare all nine siding options</Link>.
          </p>
        </div>
      </section>

      {/* ===== NOTA LOCAL ===== */}
      <section className="py-16 md:py-24 bg-paper">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12">
          <div>
            <h2 className="font-display text-4xl md:text-5xl text-ink mb-6">About {city.name}</h2>
            <div className="space-y-4 text-ink-soft leading-relaxed max-w-prose">
              <p>{city.description}</p>
              <p>{city.sidingNote}</p>
              <p><span className="font-semibold text-ink">Local note:</span> {city.uniqueFact}</p>
            </div>
          </div>
          <aside className="space-y-6">
            <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 text-sm rounded-[1.5rem] bg-card shadow-soft p-6">
              <dt className="text-ink-soft">County</dt><dd className="text-ink">{city.county}</dd>
              <dt className="text-ink-soft">Population</dt><dd className="text-ink">{city.population} (2020 Census)</dd>
              <dt className="text-ink-soft">Typical homes</dt><dd className="text-ink">{city.homeStyle}</dd>
              <dt className="text-ink-soft">From our office</dt><dd className="text-ink">{cityDistanceMiles[city.slug] ? `About ${cityDistanceMiles[city.slug]} miles from Bellingham` : "Bellingham"}</dd>
            </dl>
            <div>
              <h3 className="font-bold text-ink mb-3">Neighboring towns we serve</h3>
              <ul className="flex flex-wrap gap-2">
                {neighbors.map((n) => (
                  <li key={n.name}>
                    {n.slug ? (
                      <Link href={`/massachusetts/${n.slug}`} className="inline-block rounded-full bg-card shadow-soft px-4 py-2 text-sm font-medium text-ink hover:border-ink transition-colors">{n.name}</Link>
                    ) : (
                      <span className="inline-block rounded-full bg-card shadow-soft px-4 py-2 text-sm text-ink-soft">{n.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* ===== OBRAS ===== */}
      <section className="py-16 md:py-24 bg-mist">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between gap-4 mb-10">
            <h2 className="font-display text-4xl md:text-5xl text-ink">
              {localProjects.length > 0 ? `Our work in ${city.name} and nearby` : "Recent full-home re-sides"}
            </h2>
            <Link href="/projects" className="font-semibold text-ink underline underline-offset-4 decoration-alfa-gold decoration-2 whitespace-nowrap">All projects</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shownProjects.map((p) => (
              <Link key={p.slug} href={`/projects/${p.slug}`} className="group block">
                <div className="relative aspect-[4/3] rounded-[1.75rem] overflow-hidden bg-line">
                  <Image src={p.image} alt={p.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" quality={60} />
                </div>
                <h3 className="mt-3 font-bold text-ink leading-snug group-hover:text-gold-ink transition-colors">{p.title}</h3>
                <p className="text-sm text-ink-soft">{projectLocation(p)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <section className="py-16 md:py-24 bg-paper">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-10">What homeowners wrote on Google</h2>
          <ReviewQuote seed={city.slug} />
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-16 md:py-24 bg-mist">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-8">Questions from {city.name} homeowners</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-[1.5rem] bg-card shadow-soft px-6">
                <summary className="py-5 font-semibold text-ink text-lg flex justify-between items-center gap-4">
                  {f.q}
                  <svg className="w-5 h-5 text-ink-soft group-open:rotate-180 transition-transform shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="pb-6 text-ink-soft leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <SiteVideo citySlug={city.slug} placeName={`${city.name}, MA`} />

      <CTASection cityName={city.name} />
    </>
  );
}
