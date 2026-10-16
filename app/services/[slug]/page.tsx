import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { company, breadcrumbSchema, faqSchema, serviceSchema } from "@/data/company";
import ReviewsWidget from "@/components/ReviewsWidget";
import CTASection from "@/components/CTASection";
import SiteVideo from "@/components/SiteVideo";
import FormEmbed from "@/components/FormEmbed";
import { cities } from "@/data/cities";
import { cityDistanceMiles } from "@/data/cityDistances";
import { fitTitle, fitDescriptionWithTail, stripTrailingPhone } from "@/lib/serpWidth";
import { getServiceBySlug, getAllServiceSlugs, getAllServices } from "@/data/services";

/* Normas e materiais POR material. Antes havia um bloco unico em todas as 9
   paginas, que falava de Hardie e de janelas Andersen ate na pagina de vinyl
   ou de cedar. */
const standards: Record<string, { title: string; body: React.ReactNode }> = {
  siding: {
    title: "Materials we install",
    body: <>James Hardie fiber cement (ASTM C1186), premium vinyl (ASTM D3679), insulated vinyl (ASTM D7793), LP SmartSide engineered wood and Western Red Cedar — always over a continuous weather-resistant barrier with flashing at every opening.</>,
  },
  "hardie-plank-siding": {
    title: "James Hardie fiber cement",
    body: <>HardiePlank meets ASTM C1186 (Type A, Grade II) and is non-combustible. We install it over <a href="https://www.jameshardie.com/" target="_blank" rel="noopener noreferrer" className="text-alfa-gold-light underline hover:text-white">HardieWrap or an equivalent WRB</a> following James Hardie&apos;s installation instructions, which is what keeps the 30-year non-prorated limited product warranty valid.</>,
  },
  "vinyl-siding": {
    title: "Premium vinyl",
    body: <>We install vinyl that meets ASTM D3679 for impact, wind load and weathering, with center-slot nailing and expansion clearance at every course and trim piece so panels stay flat through New England temperature swings.</>,
  },
  "cedar-shake-siding": {
    title: "Western Red Cedar",
    body: <>Shakes and shingles go over a drainable or ventilated layer so the back of each course can dry, and every piece is fastened with stainless steel so the wood never stains around the nails.</>,
  },
  "clapboard-siding": {
    title: "Clapboard profiles",
    body: <>Lap siding in fiber cement (ASTM C1186), engineered wood, cedar or vinyl (ASTM D3679), laid out with a consistent reveal and flashed at every butt joint, window head and transition.</>,
  },
  "board-and-batten-siding": {
    title: "Vertical board & batten",
    body: <>Vertical panels need horizontal blocking or furring for fastening and a flashing detail at every window head and horizontal break, because water runs straight down the seams. We build both in before the battens go on.</>,
  },
  "insulated-siding": {
    title: "Insulated vinyl",
    body: <>Insulated vinyl siding is covered by its own standard, ASTM D7793, which requires a minimum R-value for the fused foam backing. We install it over a continuous weather barrier with the same expansion rules as standard vinyl.</>,
  },
  "engineered-wood-siding": {
    title: "LP SmartSide engineered wood",
    body: <>LP SmartSide strands are treated with LP&apos;s SmartGuard process (zinc borate) against rot and termites. We seal every cut end and keep the clearances LP specifies above roofs, decks and grade, which the 5/50-year limited warranty depends on.</>,
  },
  "commercial-siding": {
    title: "Commercial and multi-family",
    body: <>Fiber cement and commercial-grade vinyl installed under a building permit per the MA State Building Code (780 CMR), phased by elevation so tenants and businesses keep operating.</>,
  },
};

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const title = fitTitle(service.metaTitle, [""]);
  const description = fitDescriptionWithTail(
    stripTrailingPhone(service.metaDescription),
    `Free estimate: ${company.phone}.`,
  );

  return {
    title,
    description,
    alternates: { canonical: `https://alfapaintingcarpentry.com/services/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://alfapaintingcarpentry.com/services/${slug}`,
      images: [{ url: service.heroImage, width: 1200, height: 630, alt: service.name }],
    },
  };
}

const check = (
  <svg className="w-5 h-5 text-alfa-gold shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  const summary = getAllServices().find((s) => s.slug === slug)?.cardSummary ?? service.description;
  const std = standards[slug] ?? standards.siding;
  const nearest = [...cities]
    .sort((a, b) => (cityDistanceMiles[a.slug] ?? 99) - (cityDistanceMiles[b.slug] ?? 99))
    .slice(0, 18);
  const others = getAllServices().filter((s) => s.slug !== slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: "https://alfapaintingcarpentry.com" },
        { name: "Services", url: "https://alfapaintingcarpentry.com/services" },
        { name: service.name, url: `https://alfapaintingcarpentry.com/services/${slug}` },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema({
        name: service.name,
        description: service.metaDescription,
        url: `https://alfapaintingcarpentry.com/services/${slug}`,
        image: `https://alfapaintingcarpentry.com${service.heroImage}`,
      })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(service.faqs)) }} />

      {/* ===== HERO ===== */}
      <section className="relative pt-28 md:pt-36 pb-12 md:pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={service.heroImage} alt={`${service.name} completed by Alfa Construction in Massachusetts`} fill sizes="100vw" className="object-cover" priority quality={75} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/35" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-300 mb-4 flex-wrap">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span className="text-gray-500">/</span>
                <Link href="/services" className="hover:text-white transition-colors">Services</Link>
                <span className="text-gray-500">/</span>
                <span className="text-alfa-gold">{service.shortName}</span>
              </nav>
              <h1 className="text-[2rem] leading-tight md:text-5xl font-bold text-white mb-4 [text-wrap:balance]">
                {service.name} in <span className="whitespace-nowrap">Massachusetts</span>
              </h1>
              <p className="text-gray-200 text-base md:text-lg leading-relaxed mb-6 max-w-xl">
                {summary} Full exterior re-sides only. Licensed MA HIC {company.license}, insured, {company.experience} years.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Link href="/contact" className="inline-flex items-center justify-center whitespace-nowrap bg-alfa-gold hover:bg-alfa-gold-light text-black font-bold px-7 py-4 rounded-lg transition-colors text-base md:text-lg">
                  Get a Free Estimate
                </Link>
                <a href={company.phoneTel} className="inline-flex items-center justify-center whitespace-nowrap bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-4 rounded-lg transition-colors border border-white/30 text-base md:text-lg">
                  Call {company.phone}
                </a>
              </div>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-200">
                <li className="flex items-center gap-1.5">5.0 on Google · {company.reviewCount} reviews</li>
                <li className="flex items-center gap-1.5">Written estimate in 24h</li>
              </ul>
            </div>
            <div><FormEmbed /></div>
          </div>
        </div>
      </section>

      {/* ===== OVERVIEW ===== */}
      <section className="py-16 md:py-20 bg-alfa-dark">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">About {service.name}</h2>
          <p className="text-gray-300 text-lg leading-relaxed">{service.longDescription}</p>
        </div>
      </section>

      {/* ===== PROBLEMS / SOLUTIONS ===== */}
      <section className="py-16 md:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-alfa-card rounded-xl border border-white/5 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Problems we see on Massachusetts homes</h2>
            <ul className="space-y-4">
              {service.painPoints.map((p) => (
                <li key={p} className="flex gap-3 text-gray-300 leading-relaxed">
                  <span className="mt-2 w-2 h-2 rounded-full bg-red-400 shrink-0" aria-hidden="true" />{p}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-alfa-card rounded-xl border border-alfa-gold/20 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">How a full re-side fixes them</h2>
            <ul className="space-y-4">
              {service.solutions.map((s) => (
                <li key={s} className="flex gap-3 text-gray-300 leading-relaxed">{check}{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="py-16 md:py-20 bg-alfa-cream text-alfa-ink">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Our {service.shortName} process</h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
            {service.process.map((step) => (
              <li key={step.step} className="bg-white rounded-xl border border-alfa-cream-border p-6">
                <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-alfa-gold text-black font-bold">{step.step}</span>
                <h3 className="font-bold text-lg mt-4 mb-2">{step.title}</h3>
                <p className="text-sm text-alfa-ink-muted leading-relaxed">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== BENEFITS + STANDARDS ===== */}
      <section className="py-16 md:py-20 bg-alfa-dark">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">What you get</h2>
            <ul className="space-y-4">
              {service.benefits.map((b) => (
                <li key={b} className="flex gap-3 text-gray-300 leading-relaxed">{check}{b}</li>
              ))}
            </ul>
          </div>
          <aside className="lg:col-span-2 space-y-5">
            <div className="bg-alfa-card rounded-xl border border-white/5 p-6">
              <h3 className="text-alfa-gold font-bold text-sm uppercase tracking-wider mb-3">{std.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{std.body}</p>
            </div>
            <div className="bg-alfa-card rounded-xl border border-white/5 p-6">
              <h3 className="text-alfa-gold font-bold text-sm uppercase tracking-wider mb-3">License, insurance &amp; permits</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Massachusetts Home Improvement Contractor{" "}
                <a href="https://elicensing.hps.state.ma.us/CitizenAccess/GeneralProperty/PropertyLookUp.aspx" target="_blank" rel="noopener noreferrer" className="text-alfa-gold-light underline hover:text-white">HIC {company.license}</a>, valid through {company.licenseExpiry}. General liability and workers&apos; compensation insurance. Every job is permitted under the{" "}
                <a href="https://www.mass.gov/info-details/massachusetts-state-building-code-780-cmr" target="_blank" rel="noopener noreferrer" className="text-alfa-gold-light underline hover:text-white">MA State Building Code (780 CMR)</a>.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-16 md:py-20 bg-black">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">{service.shortName} questions</h2>
          <div className="space-y-3">
            {service.faqs.map((faq) => (
              <details key={faq.question} className="bg-alfa-card rounded-xl border border-white/5 group">
                <summary className="p-5 font-semibold text-white flex justify-between items-center gap-4">
                  {faq.question}
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="px-5 pb-5 text-gray-300 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <section className="py-16 md:py-20 bg-alfa-cream text-alfa-ink">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">What homeowners say on Google</h2>
            <p className="text-alfa-ink-muted">5.0 average from {company.reviewCount} Google reviews.</p>
          </div>
          <ReviewsWidget />
        </div>
      </section>

      {/* ===== AREA + OTHER MATERIALS ===== */}
      <section className="py-16 md:py-20 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Towns near our Bellingham base</h2>
            <p className="text-gray-400 mb-5">We install {service.shortName} across MetroWest, Worcester County and Norfolk County.</p>
            <ul className="flex flex-wrap gap-2 mb-5">
              {nearest.map((c) => (
                <li key={c.slug}>
                  <Link href={`/massachusetts/${c.slug}`} className="inline-block bg-alfa-card border border-white/10 text-gray-300 hover:border-alfa-gold/40 hover:text-alfa-gold text-sm px-3 py-1.5 rounded-full transition-colors">{c.name}</Link>
                </li>
              ))}
            </ul>
            <Link href="/massachusetts" className="text-alfa-gold font-semibold hover:text-alfa-gold-light">See the full service area →</Link>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">Other siding we install</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/services/${o.slug}`} className="block bg-alfa-card border border-white/5 hover:border-alfa-gold/40 rounded-lg px-4 py-3 text-white font-semibold transition-colors">{o.shortName}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <SiteVideo serviceSlug={slug} placeName="Massachusetts" />

      <CTASection title={`Get your free ${service.shortName} estimate`} />
    </>
  );
}
