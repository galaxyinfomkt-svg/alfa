import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema } from "@/data/company";
import { cities } from "@/data/cities";
import CTASection from "@/components/CTASection";

/**
 * Service-area hub for /massachusetts.
 *
 * This route did not exist. It was linked 110 times — once from every city
 * page ("See all 109 Massachusetts cities we serve") and once from /projects —
 * and every one of those links returned a 404. Beyond fixing the dead links,
 * this is the natural landing page for statewide queries like
 * "siding contractor Massachusetts".
 */

const COUNTY_ORDER = ["Middlesex", "Worcester", "Norfolk", "Essex"] as const;

export const metadata: Metadata = {
  title: "Siding Contractor in 109 Massachusetts Cities",
  description:
    "Full-home siding in 109 MA cities — Middlesex, Worcester, Norfolk & Essex. Licensed MA HIC #192348. Free estimate: (508) 590-9193.",
  alternates: { canonical: "https://alfapaintingcarpentry.com/massachusetts" },
  openGraph: {
    title: "Siding Contractor in 109 Massachusetts Cities",
    description:
      "Full-home siding installation across 109 Massachusetts cities. Licensed, insured, 20+ years.",
    url: "https://alfapaintingcarpentry.com/massachusetts",
    images: ["/images/new-construction-siding-windows-board-batten-ma.jpg"],
  },
};

export default function MassachusettsHubPage() {
  const byCounty = COUNTY_ORDER.map((county) => ({
    county,
    towns: cities
      .filter((c) => c.county === county)
      .sort((a, b) => a.name.localeCompare(b.name)),
  })).filter((g) => g.towns.length > 0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "https://alfapaintingcarpentry.com" },
              { name: "Massachusetts", url: "https://alfapaintingcarpentry.com/massachusetts" },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="pt-40 pb-14 bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">
            Where We Work
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-5">
            Siding Installation Across {cities.length} Massachusetts Cities
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Alfa Construction is a licensed Massachusetts siding contractor
            (MA HIC #192348) working across Middlesex, Worcester, Norfolk and
            Essex counties. We take complete full-home re-sides — Hardie Plank,
            vinyl, cedar shake, clapboard and board &amp; batten.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="tel:+15085909193"
              className="inline-flex items-center justify-center bg-alfa-gold hover:bg-alfa-gold-light text-black font-bold px-8 py-4 rounded-lg transition-colors duration-200"
            >
              Call (508) 590-9193
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-white/20 hover:border-alfa-gold/50 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200"
            >
              Request a Free Estimate
            </Link>
          </div>
        </div>
      </section>

      {/* Counties */}
      <section className="py-16 bg-alfa-dark">
        <div className="max-w-7xl mx-auto px-4">
          {byCounty.map((group) => (
            <div key={group.county} className="mb-14 last:mb-0">
              <div className="flex items-baseline gap-3 border-b border-white/10 pb-3 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {group.county} County
                </h2>
                <span className="text-alfa-gold text-sm font-semibold">
                  {group.towns.length} cities &amp; towns
                </span>
              </div>
              <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3">
                {group.towns.map((town) => (
                  <li key={town.slug}>
                    <Link
                      href={`/massachusetts/${town.slug}`}
                      className="block text-gray-300 hover:text-alfa-gold py-1.5 transition-colors duration-200"
                    >
                      Siding in {town.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title="Not Sure If We Cover Your Town?"
        subtitle="If your town borders any of the cities above, we almost certainly serve it. Call Fabio and ask — English or Portuguese."
      />
    </>
  );
}
