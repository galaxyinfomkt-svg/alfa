import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { company, breadcrumbSchema, faqSchema, serviceSchema } from "@/data/company";
import ReviewsWidget from "@/components/ReviewsWidget";
import GoogleMap from "@/components/GoogleMap";
import CTASection from "@/components/CTASection";
import FormEmbed from "@/components/FormEmbed";
import { getAllCitySlugs, getCityBySlug } from "@/data/cities";

const servicesData: Record<string, {
  name: string;
  shortName: string;
  heroImage: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  subheadline: string;
  description: string[];
  painPoints: { title: string; text: string }[];
  process: { step: number; title: string; description: string }[];
  benefits: string[];
  cta: string;
  faqs: { question: string; answer: string }[];
  keywords: string[];
}> = {
  siding: {
    name: "Siding Installation & Replacement",
    shortName: "Siding",
    heroImage: "/images/commercial-siding-installation-massachusetts.png",
    metaTitle: "Siding Installation & Replacement in MA · Hardie & Vinyl · 5★",
    metaDescription: "Complete full-home siding installation & replacement in 5-7 days by MA's 20-year crew. License #192348 · 22 ★★★★★ reviews. We do full re-sides, not patch repairs. (508) 590-9193.",
    headline: "Full-Home Siding Installation & Replacement in Massachusetts",
    subheadline: "Protect your home from New England's harshest weather with a complete re-side from Alfa Construction. Specializing exclusively in full-home Hardie Plank fiber cement and vinyl siding replacement — not patch repairs.",
    description: [
      "Your home's siding is its first line of defense against the elements. In Massachusetts, where nor'easters, freezing winters, and humid summers test every surface, having quality siding properly installed is essential. Alfa Construction Inc delivers complete full-home siding installation and replacement that protects and beautifies your home.",
      "We specialize in James Hardie fiber cement siding — widely considered the best siding material for New England homes. Hardie Plank siding resists rot, won't warp or crack in temperature extremes, and maintains its appearance for decades. We also install premium vinyl siding for homeowners seeking a budget-friendly full re-side.",
      "Every project is a complete re-side: we strip the old cladding, inspect and repair the sheathing, install a proper weather barrier, and mount new siding with precision. We do not take patch repairs or single-panel swaps — only full-exterior replacements. The result is a weathertight, beautiful exterior built to last.",
    ],
    painPoints: [
      { title: "Old & Damaged Siding", text: "Cracked, warped, or missing siding panels leave your home vulnerable to water infiltration, mold, and structural damage." },
      { title: "Energy Loss", text: "Poorly insulated or damaged siding lets cold air in during winter and hot air in during summer, driving up energy bills." },
      { title: "Declining Curb Appeal", text: "Faded, dirty, or outdated siding makes your home look neglected, lowering property value and neighborhood appeal." },
      { title: "Water Infiltration", text: "Failed siding allows moisture behind walls, causing hidden rot, mold growth, and expensive structural repairs." },
    ],
    process: [
      { step: 1, title: "Property Assessment", description: "We inspect your current siding, identify damage, assess the underlying structure, and discuss material options and colors." },
      { step: 2, title: "Material & Color Selection", description: "Choose from Hardie Plank fiber cement, vinyl, or other options. We help you select the style and color that complements your home." },
      { step: 3, title: "Removal & Preparation", description: "We remove old siding, inspect and repair sheathing, and install a premium weather-resistant barrier for maximum protection." },
      { step: 4, title: "Professional Installation", description: "Our crew installs new siding with precision, ensuring proper overlap, fastening, and flashing at windows, doors, and transitions." },
      { step: 5, title: "Trim & Finishing", description: "We install coordinating trim, corner boards, and accessories, then do a final inspection to ensure a perfect, weathertight finish." },
    ],
    benefits: [
      "Specialists in Hardie Plank fiber cement siding — New England's best choice",
      "Full-home vinyl and cedar siding installation and replacement",
      "Proper weather barrier installation for maximum protection",
      "Precision installation that prevents water infiltration",
      "Licensed & insured with 20+ years of siding experience",
      "Wide selection of colors and styles to match your vision",
    ],
    cta: "Get a Free Siding Quote",
    faqs: [
      { question: "Why is Hardie Plank siding recommended for Massachusetts homes?", answer: "Hardie Plank fiber cement siding is engineered for harsh climates. It won't rot, warp, or crack like wood; it resists impact better than vinyl; and it's fire-resistant. It's the ideal choice for Massachusetts homes that face extreme temperature swings." },
      { question: "How long does siding installation take?", answer: "A typical full-home siding installation takes 1-3 weeks depending on the size of the house, weather, and amount of underlying repair needed. We keep you informed throughout the process." },
      { question: "Do you do small siding repairs or patch jobs?", answer: "No. Alfa Construction specializes exclusively in complete full-home siding installation and replacement. We strip the old cladding to the sheathing, correct moisture or rot issues, install a proper weather barrier, and re-side the entire exterior — we do not take patch repairs, single-panel swaps, or partial sections." },
      { question: "What's the difference between Hardie Plank and vinyl siding?", answer: "Hardie Plank is fiber cement — heavier, more durable, and more natural-looking than vinyl. Vinyl is lighter and less expensive but can crack in extreme cold and fade faster. We help you weigh the pros and cons for your specific situation." },
      { question: "Does new siding improve energy efficiency?", answer: "Absolutely. New siding combined with proper insulation and weather barriers can significantly reduce heating and cooling costs, especially if your current siding is old or damaged." },
    ],
    keywords: ["siding installation Massachusetts", "Hardie Plank installer MA", "siding replacement Massachusetts", "vinyl siding Massachusetts"],
  },
  "hardie-plank-siding": {
    name: "James Hardie Fiber Cement Siding",
    shortName: "Hardie Plank",
    heroImage: "/images/dark-shake-siding-side-view-ma.jpg",
    metaTitle: "Hardie Plank Siding in MA · 30-Year Warranty · Free Estimate",
    metaDescription: "James Hardie fiber cement installed by MA's 18-year crew. 30-year warranty, fire-resistant, freeze-proof. 22 ★★★★★ · License #192348. Free estimate in 24h. (508) 590-9193.",
    headline: "James Hardie Fiber Cement Siding Installation in Massachusetts",
    subheadline: "Upgrade to the gold standard in siding. James Hardie fiber cement siding delivers unmatched durability, beauty, and protection for New England homes.",
    description: [
      "James Hardie fiber cement siding is the number-one choice among Massachusetts homeowners who want lasting protection and curb appeal. Engineered specifically for harsh climates, Hardie Plank siding resists rot, insects, fire, and extreme temperature swings — making it the ideal material for New England's demanding weather.",
      "Unlike wood that rots, vinyl that cracks in the cold, or aluminum that dents, Hardie Plank maintains its strength and appearance for decades. Its ColorPlus technology bakes the color into the finish, so it resists fading and won't need repainting for 15+ years. That means lower maintenance costs and a home that looks freshly sided year after year.",
      "Alfa Construction Inc is a trusted Hardie Plank installer serving communities across Massachusetts. Our crews are factory-trained in James Hardie installation best practices, ensuring your siding is fastened, flashed, and finished to manufacturer specifications — which is critical for maintaining the industry-leading 30-year warranty.",
    ],
    painPoints: [
      { title: "Wood Rot & Decay", text: "Traditional wood siding absorbs moisture and rots over time, leading to costly repairs and potential structural damage to your home." },
      { title: "Constant Maintenance", text: "Scraping, priming, and repainting wood siding every few years is expensive, time-consuming, and never-ending." },
      { title: "Weather Damage", text: "Massachusetts nor'easters, ice storms, and temperature extremes crack vinyl and warp wood, leaving your home exposed." },
      { title: "Color Fading", text: "Inferior siding materials lose their color quickly under UV exposure, making your home look worn and dated within just a few years." },
    ],
    process: [
      { step: 1, title: "In-Home Consultation", description: "We assess your current siding, discuss Hardie Plank styles and ColorPlus color options, and provide a detailed written estimate." },
      { step: 2, title: "Old Siding Removal", description: "Our crew carefully strips existing siding and inspects the sheathing and framing for hidden rot or water damage." },
      { step: 3, title: "Weather Barrier Installation", description: "We install a premium house wrap and flash all windows, doors, and penetrations to create a continuous moisture barrier." },
      { step: 4, title: "Hardie Plank Installation", description: "Each plank is cut, fastened, and sealed per James Hardie specifications — ensuring proper gapping, overlap, and nailing patterns." },
      { step: 5, title: "Trim & Finishing Details", description: "We install HardieTrim boards, corner pieces, and soffit details, then perform a final walkthrough to guarantee a flawless result." },
    ],
    benefits: [
      "Industry-leading 30-year non-prorated substrate warranty",
      "Fire-resistant (non-combustible fiber cement composition)",
      "Pest-proof — will not attract termites, carpenter ants, or woodpeckers",
      "ColorPlus finish holds color for 15+ years with no repainting",
      "Low lifetime maintenance compared to wood or vinyl",
      "Increases home value and curb appeal",
    ],
    cta: "Get a Free Hardie Plank Quote",
    faqs: [
      { question: "How long does Hardie Plank siding last?", answer: "James Hardie fiber cement siding is engineered to last 50+ years. It comes with a 30-year non-prorated warranty on the substrate and a 15-year warranty on the ColorPlus finish." },
      { question: "Is Hardie Plank siding worth the higher cost?", answer: "Yes. While the upfront cost is higher than vinyl, Hardie Plank's durability, low maintenance, and long lifespan deliver a lower total cost of ownership. It also adds more resale value to your home than vinyl siding." },
      { question: "Can Hardie Plank be installed over existing siding?", answer: "We always recommend removing old siding before installing Hardie Plank. This allows us to inspect the sheathing, repair any damage, and install a proper weather barrier — which is essential for warranty compliance and long-term performance." },
      { question: "Does Hardie Plank siding need to be painted?", answer: "If you choose the ColorPlus factory-finished option, no painting is needed for 15+ years. The color is baked on in a controlled environment for a more durable and even finish than field painting." },
      { question: "Is James Hardie siding fire resistant?", answer: "Yes, fiber cement is a non-combustible material. Hardie Plank has earned the highest possible fire rating, making it an excellent choice for homes near wooded areas or in fire-prone regions." },
    ],
    keywords: ["hardie plank siding massachusetts", "james hardie installation", "fiber cement siding MA", "hardie board installer Massachusetts"],
  },
  "vinyl-siding": {
    name: "Vinyl Siding Installation",
    shortName: "Vinyl Siding",
    heroImage: "/images/green-siding-exterior-completed-ma.jpg",
    metaTitle: "Vinyl Siding Installation in MA · 25-Yr Warranty · 5★",
    metaDescription: "Premium vinyl siding installed in 5-7 days by MA's 18-year crew. 40+ color options, 25-year warranty. 22 ★★★★★ · License #192348. Free estimate in 24h. (508) 590-9193.",
    headline: "Professional Vinyl Siding Installation in Massachusetts",
    subheadline: "Get a fresh, beautiful exterior at an affordable price. Vinyl siding offers outstanding value, low maintenance, and endless style options for Massachusetts homeowners.",
    description: [
      "Vinyl siding remains one of the most popular siding choices in Massachusetts — and for good reason. It combines affordability, durability, and virtually zero maintenance into a package that works for any budget. Today's premium vinyl siding looks nothing like the flimsy panels of decades past; modern insulated vinyl offers crisp profiles, realistic wood-grain textures, and fade-resistant colors.",
      "At Alfa Construction Inc, we install high-quality vinyl siding from leading manufacturers. Our team helps you choose from hundreds of colors, styles, and profiles — including traditional clapboard, Dutch lap, board-and-batten, and cedar shake impressions — so your home gets the exact look you envision.",
      "Vinyl siding never needs painting, won't rot, and cleans up with just a garden hose. When installed correctly with proper insulation and weather barriers, it also improves your home's energy efficiency and protects against moisture infiltration. Our 18+ years of experience across Massachusetts ensures every panel is installed to last.",
    ],
    painPoints: [
      { title: "Peeling Paint & Upkeep", text: "Tired of scraping and repainting your home every few years? Vinyl siding eliminates painting forever." },
      { title: "Cracked or Faded Panels", text: "Old vinyl siding becomes brittle, cracks in cold weather, and loses its color — making your home look neglected." },
      { title: "Tight Budget Concerns", text: "A full siding replacement feels expensive. Vinyl offers premium curb appeal at a fraction of the cost of fiber cement or wood." },
      { title: "Mismatched Repairs", text: "Patching damaged sections with mismatched panels creates an uneven, patchwork appearance that hurts curb appeal." },
    ],
    process: [
      { step: 1, title: "Free Consultation & Estimate", description: "We inspect your home's exterior, discuss color and style preferences, and provide a clear, detailed written quote." },
      { step: 2, title: "Color & Style Selection", description: "Browse our wide range of vinyl profiles and colors. We bring samples so you can see how each option looks on your home." },
      { step: 3, title: "Removal & Surface Prep", description: "We remove old siding, repair any damaged sheathing, and install house wrap and insulation for energy efficiency." },
      { step: 4, title: "Expert Vinyl Installation", description: "Our crew installs each panel with proper overlap, locking, and fastening to allow for thermal expansion and contraction." },
      { step: 5, title: "Trim, Accessories & Cleanup", description: "We install matching trim, J-channels, soffit, and fascia, then do a final quality inspection and thorough cleanup." },
    ],
    benefits: [
      "Most affordable siding option with excellent long-term value",
      "Zero painting — vinyl never needs to be scraped or repainted",
      "Hundreds of colors, styles, and textures to choose from",
      "Resists moisture, insects, and rot without chemical treatments",
      "Licensed & insured with 18+ years of vinyl siding experience",
      "Insulated vinyl options improve home energy efficiency",
    ],
    cta: "Get a Free Vinyl Siding Quote",
    faqs: [
      { question: "How long does vinyl siding last?", answer: "Quality vinyl siding lasts 20-40 years depending on the grade, climate exposure, and maintenance. Premium insulated vinyl panels from top manufacturers can last even longer." },
      { question: "Is vinyl siding a good choice for Massachusetts weather?", answer: "Yes, modern vinyl siding is engineered to handle temperature swings, moisture, and wind. We install premium-grade panels rated for New England conditions and ensure proper fastening to allow for thermal expansion." },
      { question: "How much does vinyl siding cost compared to Hardie Plank?", answer: "Vinyl siding typically costs 30-50% less than James Hardie fiber cement siding, including materials and installation. It's the most budget-friendly option for a complete siding replacement." },
      { question: "Can vinyl siding be installed over existing siding?", answer: "While it's technically possible, we recommend removing old siding first. This lets us inspect the sheathing, fix any hidden damage, and install a proper weather barrier for the best results." },
      { question: "Does vinyl siding increase home value?", answer: "Yes, vinyl siding replacement consistently ranks among the top home improvement projects for return on investment, typically recouping 65-75% of the project cost at resale." },
    ],
    keywords: ["vinyl siding installation massachusetts", "vinyl siding cost MA", "vinyl siding contractor Massachusetts", "affordable siding installation MA"],
  },
  "cedar-shake-siding": {
    name: "Cedar Shake & Shingle Siding",
    shortName: "Cedar Shake",
    heroImage: "/images/dark-shake-siding-renovation-after-ma.jpg",
    metaTitle: "Cedar Shake Siding in MA · Authentic New England Look",
    metaDescription: "Cedar shake & shingle siding by MA's 18-year crew. Timeless New England curb appeal, hand-installed. 22 ★★★★★ · License #192348. Free estimate in 24h. (508) 590-9193.",
    headline: "Cedar Shake & Shingle Siding Installation in Massachusetts",
    subheadline: "Nothing matches the warmth and character of real cedar. Bring timeless New England charm to your home with hand-selected cedar shake and shingle siding from Alfa Construction.",
    description: [
      "Cedar shake and shingle siding has defined New England architecture for centuries. Its rich, natural grain and warm tones create a look that no synthetic material can truly replicate. For Massachusetts homeowners who value authenticity and curb appeal, cedar siding remains the premier choice.",
      "At Alfa Construction Inc, we install both cedar shakes (thicker, hand-split for a rugged texture) and cedar shingles (machine-cut for a smooth, uniform look). Whether you want a classic Cape Cod cottage aesthetic or a bold modern farmhouse style, cedar siding delivers unmatched character and charm.",
      "Cedar is naturally resistant to insects and decay thanks to its built-in oils, and when properly installed and maintained, it can protect your home for 30-40 years. Our experienced crew ensures every shake is aligned, fastened, and sealed to maximize longevity and weather performance across Massachusetts' demanding seasons.",
    ],
    painPoints: [
      { title: "Bland, Generic Exteriors", text: "Cookie-cutter vinyl and fiber cement can't match the warmth and individuality that real cedar brings to your home's appearance." },
      { title: "Aging & Weathered Shakes", text: "Old cedar siding that hasn't been maintained can split, curl, and allow moisture behind the wall, leading to damage." },
      { title: "Loss of Historic Character", text: "Replacing original cedar with synthetic materials can strip a historic home of its architectural authenticity and reduce its value." },
      { title: "Inconsistent Past Installations", text: "Poorly installed cedar shakes with wrong exposure or missing flashing lead to premature failure and costly repairs." },
    ],
    process: [
      { step: 1, title: "Design Consultation", description: "We discuss cedar grades, shake vs. shingle styles, stain colors, and exposure patterns to match your home's architecture." },
      { step: 2, title: "Material Sourcing", description: "We source premium-grade Western Red Cedar shakes or shingles and confirm quantities, stain, and accessories before work begins." },
      { step: 3, title: "Removal & Substrate Prep", description: "Old siding is removed, sheathing is inspected and repaired, and a breathable weather-resistant barrier is installed." },
      { step: 4, title: "Cedar Installation", description: "Each shake or shingle is hand-nailed at the correct exposure with proper offset patterns, inside/outside corners, and flashing details." },
      { step: 5, title: "Staining & Protection", description: "We apply a high-quality penetrating stain or sealant to protect the cedar from UV, moisture, and mildew right from day one." },
    ],
    benefits: [
      "Authentic natural beauty no synthetic material can replicate",
      "Naturally insect-resistant and decay-resistant wood",
      "30-40 year lifespan with proper maintenance",
      "Exceptional curb appeal that increases property value",
      "Licensed & insured with 18+ years of cedar siding experience",
      "Available in shakes (rustic) and shingles (refined) to suit any style",
    ],
    cta: "Get a Free Cedar Siding Quote",
    faqs: [
      { question: "What's the difference between cedar shakes and cedar shingles?", answer: "Cedar shakes are hand-split, giving them a thicker, more rugged and textured appearance. Cedar shingles are machine-cut for a thinner, smoother, and more uniform look. Both offer the natural beauty of real cedar." },
      { question: "How long does cedar shake siding last?", answer: "With proper installation and regular maintenance (staining every 5-7 years), cedar shake siding can last 30-40 years or more. The natural oils in cedar make it inherently resistant to insects and decay." },
      { question: "Does cedar siding require a lot of maintenance?", answer: "Cedar does require more maintenance than vinyl or fiber cement. We recommend cleaning and re-staining every 5-7 years to maintain its appearance and protection. However, many homeowners feel the unmatched beauty is well worth the effort." },
      { question: "Can cedar siding be painted or stained any color?", answer: "Yes, cedar accepts both paint and stain beautifully. Semi-transparent stains are popular because they showcase the natural grain, but solid stains and paints are also options. We help you choose the right finish." },
      { question: "Is cedar siding a good investment for resale value?", answer: "Absolutely. Cedar siding is a premium material that consistently adds curb appeal and market value. It's especially valued in historic New England neighborhoods where natural materials are prized." },
    ],
    keywords: ["cedar shake siding massachusetts", "cedar shingle installation MA", "cedar siding contractor Massachusetts", "natural wood siding MA"],
  },
};

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug];
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `https://alfapaintingcarpentry.com/services/${slug}`,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `https://alfapaintingcarpentry.com/services/${slug}`,
      images: [{ url: service.heroImage, width: 1200, height: 630, alt: service.name }],
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesData[slug];
  if (!service) notFound();

  return (
    <>
      {/* Schema.org Structured Data */}
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

      {/* Hero (split layout with form) */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={service.heroImage}
            alt={service.name}
            fill
            sizes="100vw"
            className="object-cover"
            priority
            quality={75}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left Side */}
            <div>
              <nav className="flex items-center gap-2 text-sm text-gray-400 mb-5 flex-wrap">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span className="text-gray-600">/</span>
                <Link href="/services" className="hover:text-white transition-colors">Services</Link>
                <span className="text-gray-600">/</span>
                <span className="text-alfa-gold">{service.name}</span>
              </nav>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 bg-alfa-gold text-black text-sm font-bold px-4 py-2 rounded-full">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Serving 109+ MA Cities
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full border border-white/20">
                  <span className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5 text-alfa-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </span>
                  5 (22+ reviews)
                </span>
              </div>

              <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">Our Services</span>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white mt-2 mb-5 leading-tight">{service.headline}</h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">{service.subheadline}</p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-alfa-gold hover:bg-alfa-gold-light text-black font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg text-lg">
                  {service.cta}
                </Link>
                <a href={company.phoneTel} className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 border border-white/30 text-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  Call {company.phone}
                </a>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-alfa-gold" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Licensed {company.license}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-alfa-gold" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  {company.experience} Years
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-alfa-gold" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Free Estimates
                </span>
              </div>
            </div>

            {/* Right Side — Form */}
            <div>
              <FormEmbed />
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-20 bg-alfa-dark">
        <div className="max-w-4xl mx-auto px-4">
          {service.description.map((para, i) => (
            <p key={i} className="text-gray-300 text-lg leading-relaxed mb-6">{para}</p>
          ))}
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Common Problems We Solve</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.painPoints.map((point, i) => (
              <div key={i} className="bg-alfa-card rounded-xl p-6 border border-white/5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">{point.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{point.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-alfa-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Our {service.shortName} Process</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {service.process.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-14 h-14 bg-alfa-gold text-black rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-bold text-white mb-2 text-sm">{step.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-alfa-dark border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">Why Choose Alfa Construction</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/5 border border-white/5 rounded-lg p-4">
                <svg className="w-5 h-5 text-alfa-gold mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span className="text-white text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Standards & Materials (GEO — external citations + technical terms) */}
      <section className="py-20 bg-alfa-dark border-t border-white/5" aria-labelledby="standards-heading">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">Verified Standards</span>
            <h2 id="standards-heading" className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Industry Standards &amp; Materials We Use
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Every Alfa install meets manufacturer specs, ENERGY STAR efficiency standards, and Massachusetts building code. Verify each independently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-alfa-card border border-white/5 rounded-xl p-6">
              <h3 className="text-alfa-gold font-bold text-sm uppercase tracking-wider mb-3">Siding Materials</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                We install <a href="https://www.jameshardie.com/products/hardieplank-lap-siding" target="_blank" rel="noopener noreferrer" className="text-alfa-gold-light underline hover:text-white">James Hardie</a> fiber cement (ASTM C1186 Type A Grade II rated, Class A fire rated), premium vinyl siding (ASTM D3679 certified), and authentic cedar shake on a properly fastened <a href="https://www.dupont.com/brands/tyvek.html" target="_blank" rel="noopener noreferrer" className="text-alfa-gold-light underline hover:text-white">DuPont Tyvek HouseWrap</a> weather-resistant barrier with Z-flashing at every penetration.
              </p>
            </div>
            <div className="bg-alfa-card border border-white/5 rounded-xl p-6">
              <h3 className="text-alfa-gold font-bold text-sm uppercase tracking-wider mb-3">Windows &amp; Energy</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                <a href="https://www.andersenwindows.com/products/windows/" target="_blank" rel="noopener noreferrer" className="text-alfa-gold-light underline hover:text-white">Andersen 400 Series</a> windows with low-E glass (U-factor under 0.30, NFRC certified), <a href="https://www.energystar.gov/products/windows_doors_skylights" target="_blank" rel="noopener noreferrer" className="text-alfa-gold-light underline hover:text-white">ENERGY STAR</a> qualified for the Northern climate zone. Continuous-wall EnergyShield insulation pairs with windows to deliver R-13 effective wall R-value.
              </p>
            </div>
            <div className="bg-alfa-card border border-white/5 rounded-xl p-6">
              <h3 className="text-alfa-gold font-bold text-sm uppercase tracking-wider mb-3">License &amp; Insurance</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Massachusetts Home Improvement Contractor (HIC) license{" "}
                <a href="https://elicensing.hps.state.ma.us/CitizenAccess/GeneralProperty/PropertyLookUp.aspx" target="_blank" rel="noopener noreferrer" className="text-alfa-gold-light underline hover:text-white">#{company.license}</a>, valid through {company.licenseExpiry}. Verifiable through the MA Division of Professional Licensure. Full general liability and workers&apos; compensation insurance — Certificate of Insurance issued per project.
              </p>
            </div>
            <div className="bg-alfa-card border border-white/5 rounded-xl p-6">
              <h3 className="text-alfa-gold font-bold text-sm uppercase tracking-wider mb-3">Code Compliance</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Every project pulled to the local{" "}
                <a href="https://www.mass.gov/info-details/massachusetts-state-building-code-780-cmr" target="_blank" rel="noopener noreferrer" className="text-alfa-gold-light underline hover:text-white">MA State Building Code (780 CMR)</a>{" "}
                with proper permits, inspections, and final sign-off. Hardie installs follow manufacturer best practices to maintain the 30-year limited transferable product warranty.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {service.faqs.map((faq, i) => (
              <details key={i} className="bg-alfa-card rounded-xl border border-white/5 group">
                <summary className="p-6 cursor-pointer font-semibold text-white flex justify-between items-center">
                  {faq.question}
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="px-6 pb-6 text-gray-400 leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-alfa-dark">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-10">Customer Reviews</h2>
          <ReviewsWidget />
        </div>
      </section>

      {/* Map */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-10">{service.shortName} Service Area</h2>
          <GoogleMap />
        </div>
      </section>

      {/* Cities We Serve - Hub & Spoke Internal Linking */}
      <section className="py-20 bg-alfa-dark border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">Service Area</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              {service.shortName} Services Across Massachusetts
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We provide professional {service.shortName.toLowerCase()} services in 109 cities across Massachusetts. Click your city for local details and a free estimate.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {getAllCitySlugs().map((citySlug) => {
              const city = getCityBySlug(citySlug);
              if (!city) return null;
              return (
                <Link
                  key={citySlug}
                  href={`/massachusetts/${citySlug}/${slug}`}
                  className="inline-block bg-alfa-card hover:bg-alfa-gold hover:text-black text-gray-300 text-sm font-medium px-4 py-2 rounded-full border border-white/10 hover:border-alfa-gold transition-all duration-200"
                >
                  {city.name}, MA
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection title={`Get Your Free ${service.shortName} Estimate`} />

    </>
  );
}
