import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema, company } from "@/data/company";
import { cities } from "@/data/cities";
import { cityDistanceMiles } from "@/data/cityDistances";
import CTASection from "@/components/CTASection";
import GoogleMap from "@/components/GoogleMap";

/**
 * Service-area hub for /massachusetts.
 *
 * Organizado por distancia real do escritorio em Bellingham, e nao por
 * condado: e assim que o cliente pensa ("voces atendem a minha cidade?") e
 * deixa claro, sem exagero, onde a Alfa trabalha com mais frequencia.
 */

const BANDS = [
  { max: 15, title: "Within 15 miles of Bellingham", note: "Our home base — most of our jobs are here." },
  { max: 25, title: "15 to 25 miles", note: "MetroWest, Blackstone Valley and south of Boston." },
  { max: 35, title: "25 to 35 miles", note: "Worcester, the Route 2 corridor and the inner suburbs." },
  { max: Infinity, title: "More than 35 miles", note: "Full-home re-sides only at this distance." },
] as const;

const miles = (slug: string) => cityDistanceMiles[slug] ?? 99;

export const metadata: Metadata = {
  title: "Siding Contractor Service Area · Massachusetts",
  description:
    "Towns we serve from our Bellingham, MA base — sorted by distance. Licensed MA HIC #192348. Free estimate: (508) 590-9193.",
  alternates: { canonical: "https://alfapaintingcarpentry.com/massachusetts" },
  openGraph: {
    title: "Alfa Construction Service Area — Massachusetts",
    description: "Full-home siding installation in towns across MetroWest, Worcester County and Norfolk County.",
    url: "https://alfapaintingcarpentry.com/massachusetts",
    images: ["/images/hardie-plank-siding-carlisle-ma-after-front.jpg"],
  },
};

export default function MassachusettsHubPage() {
  const sorted = [...cities].sort((a, b) => miles(a.slug) - miles(b.slug) || a.name.localeCompare(b.name));
  let lower = -1;
  const groups = BANDS.map((band) => {
    const towns = sorted.filter((c) => miles(c.slug) > lower && miles(c.slug) <= band.max);
    lower = band.max;
    return { ...band, towns };
  }).filter((g) => g.towns.length > 0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "https://alfapaintingcarpentry.com" },
              { name: "Service Area", url: "https://alfapaintingcarpentry.com/massachusetts" },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="pt-36 md:pt-44 pb-12 md:pb-14 bg-paper">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-display text-5xl md:text-7xl text-ink mb-5 [text-wrap:balance]">
            Our Massachusetts Service Area
          </h1>
          <p className="text-ink-soft max-w-2xl mx-auto text-lg">
            Alfa Construction is based in {company.address.locality}, MA. These are the towns we re-side homes in, sorted by
            distance from our office. Don&apos;t see yours? Call and ask.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center whitespace-nowrap bg-alfa-gold hover:bg-alfa-gold-light text-ink font-bold px-7 py-4 rounded-full transition-colors text-lg"
            >
              Get a Free Estimate
            </Link>
            <a
              href={company.phoneTel}
              className="inline-flex items-center justify-center whitespace-nowrap bg-mist hover:bg-line text-ink font-bold px-7 py-4 rounded-full transition-colors border border-line text-lg"
            >
              Call {company.phone}
            </a>
          </div>
          {/* Atalhos para as faixas: a lista e longa e no celular vira rolagem. */}
          <nav aria-label="Jump to distance" className="mt-8">
            <ul className="flex flex-wrap justify-center gap-2 text-sm">
              {groups.map((g, i) => (
                <li key={g.title}>
                  <a href={`#band-${i}`} className="inline-block rounded-full bg-card shadow-soft px-4 py-2 text-ink-soft hover:border-alfa-gold/50 hover:text-gold-ink">
                    {g.title.replace(" of Bellingham", "")} · {g.towns.length}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* Faixas de distancia */}
      <section className="py-14 md:py-16 bg-mist">
        <div className="max-w-7xl mx-auto px-4">
          {groups.map((group, i) => (
            <div key={group.title} id={`band-${i}`} className="mb-14 last:mb-0 scroll-mt-28">
              <div className="border-b border-line pb-3 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-ink">{group.title}</h2>
                <p className="text-ink-soft text-sm mt-1">{group.note}</p>
              </div>
              <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
                {group.towns.map((town) => (
                  <li key={town.slug}>
                    <Link
                      href={`/massachusetts/${town.slug}`}
                      className="flex flex-col md:flex-row md:items-center md:justify-between gap-0.5 md:gap-3 h-full rounded-xl bg-card shadow-soft hover:border-alfa-gold/40 px-3 py-2.5 md:px-4 md:py-3 transition-colors group"
                    >
                      <span>
                        <span className="block font-semibold text-ink group-hover:text-gold-ink leading-snug">{town.name}</span>
                        <span className="block text-xs text-ink-soft">{town.county} County</span>
                      </span>
                      <span className="text-xs text-alfa-gold/80 whitespace-nowrap">
                        {miles(town.slug) === 0 ? "Our office" : `${miles(town.slug)} mi`}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 md:py-16 bg-paper">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-ink mb-6 text-center">Our office in {company.address.locality}</h2>
          <GoogleMap />
        </div>
      </section>

      <CTASection
        title="Not sure if we cover your town?"
        subtitle="If it's near any of the towns above, we likely do. Call Fabio and ask — English or Portuguese."
      />
    </>
  );
}
