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
  painting: {
    name: "Interior & Exterior Painting",
    shortName: "Painting",
    heroImage: "/images/exterior-siding-cape-cod-home-bellingham-ma.jpg",
    metaTitle: "Interior & Exterior Painting Services in Massachusetts",
    metaDescription: "Professional interior and exterior painting in Massachusetts. Expert prep, premium paints, flawless finish. Licensed & insured. 18+ years experience. Free estimates. Call (508) 596-3750.",
    headline: "Professional Interior & Exterior Painting in Massachusetts",
    subheadline: "Transform your home with premium painting services backed by 18+ years of experience. From a single room refresh to a complete exterior makeover, Alfa Construction delivers flawless results that last.",
    description: [
      "At Alfa Construction Inc, painting is more than applying color to walls — it's about transforming your living space. Our experienced painting team handles every detail, from thorough surface preparation and filling imperfections to applying premium-quality paints with precision.",
      "Whether you need to refresh faded interior rooms, repaint a peeling exterior, or update your home's colors before selling, our team delivers a flawless finish every time. We work with top-tier paint brands and use proven techniques refined over 18+ years of painting homes across Massachusetts.",
      "New England weather is harsh on exterior paint. Freezing winters, humid summers, and constant temperature swings cause peeling, cracking, and fading. Our exterior painting process is specifically designed to withstand these conditions, using weather-resistant primers and paints that protect your home for years.",
    ],
    painPoints: [
      { title: "Peeling & Flaking Paint", text: "Massachusetts freeze-thaw cycles cause paint to crack and peel, exposing wood to moisture damage and rot." },
      { title: "Faded & Outdated Colors", text: "UV exposure and years of weathering leave your home looking tired and dated, lowering curb appeal and property value." },
      { title: "Inconsistent Previous Work", text: "Poor prep work or cheap paint from a previous contractor results in uneven coverage, drips, and early failure." },
      { title: "Preparing to Sell", text: "A fresh coat of paint is the highest-ROI improvement when selling your home — buyers notice paint quality immediately." },
    ],
    process: [
      { step: 1, title: "Free Consultation & Estimate", description: "We visit your property, assess the scope, discuss colors and preferences, and provide a detailed written estimate at no cost." },
      { step: 2, title: "Surface Preparation", description: "We power wash, scrape loose paint, fill holes and cracks, sand smooth, caulk gaps, and apply primer to ensure perfect adhesion." },
      { step: 3, title: "Protection & Masking", description: "We carefully tape edges, cover floors, furniture, and landscaping to protect your property from paint drips and overspray." },
      { step: 4, title: "Premium Paint Application", description: "Using top-quality paints, we apply even coats with professional techniques — brushwork for trim, rolling for walls, spraying where appropriate." },
      { step: 5, title: "Final Inspection & Cleanup", description: "We inspect every surface for perfection, do touch-ups, remove all masking, and leave your home spotless." },
    ],
    benefits: [
      "Premium paints from trusted brands for lasting color and protection",
      "Meticulous surface preparation — the key to a paint job that lasts",
      "Clean, professional work with full protection of your property",
      "Experienced crew with 18+ years of painting homes in Massachusetts",
      "Licensed & insured for your complete peace of mind",
      "Free color consultation and written estimates",
    ],
    cta: "Get Your Free Painting Estimate",
    faqs: [
      { question: "How long does it take to paint the exterior of a house?", answer: "A typical exterior painting project takes 3-7 days depending on the size of the home, weather conditions, and amount of prep work needed. We always prioritize quality over speed." },
      { question: "What kind of paint do you use?", answer: "We use premium-quality paints from trusted brands like Benjamin Moore and Sherwin-Williams. For exteriors, we use weather-resistant formulas specifically designed for New England's harsh climate." },
      { question: "Do you provide color consultations?", answer: "Yes! We offer free color consultation as part of our estimate process. We can help you choose colors that complement your home's architecture and neighborhood." },
      { question: "How long will the paint last?", answer: "With proper preparation and premium paint, exterior paint typically lasts 7-10 years in Massachusetts, and interior paint lasts even longer. Our thorough prep work is key to long-lasting results." },
      { question: "Do you paint in cold weather?", answer: "We follow paint manufacturer guidelines for application temperatures. Most exterior painting is done from spring through fall, but interior painting can be done year-round." },
    ],
    keywords: ["interior painting Massachusetts", "exterior house painting MA", "residential painters near me", "painting contractor Massachusetts"],
  },
  carpentry: {
    name: "Carpentry & Trim Work",
    shortName: "Carpentry",
    heroImage: "/images/deck-carpentry-staircase-railing-massachusetts.png",
    metaTitle: "Carpentry & Trim Work Services in Massachusetts",
    metaDescription: "Expert carpentry and trim work in Massachusetts. Trim replacement, door installation, fine woodwork. Licensed & insured. 18+ years experience. Free estimates. Call (508) 596-3750.",
    headline: "Expert Carpentry & Trim Work in Massachusetts",
    subheadline: "From rotten trim replacement to precision door installation, Alfa Construction's carpenters deliver meticulous craftsmanship that restores and enhances your home's character.",
    description: [
      "Quality carpentry is the foundation of a beautiful home. At Alfa Construction Inc, our skilled carpenters specialize in trim replacement, door installation, and detailed finish work that transforms the look and feel of your property.",
      "New England's harsh weather takes a toll on exterior woodwork. Freezing temperatures, snow, ice, and moisture cause trim to rot, warp, and deteriorate. Our team identifies and replaces damaged trim with durable materials — including PVC composite and premium wood — that withstand Massachusetts weather.",
      "Whether you need interior doors replaced, exterior trim restored, crown molding installed, or custom woodwork crafted, we bring precision and pride to every cut. Our 18+ years of carpentry experience across Massachusetts means we've seen and solved every challenge.",
    ],
    painPoints: [
      { title: "Rotten & Damaged Trim", text: "Moisture and freeze-thaw cycles cause exterior trim to rot, inviting water damage and pests into your home." },
      { title: "Outdated Interior Doors", text: "Old, worn doors that stick, squeak, or don't close properly make your home feel dated and less secure." },
      { title: "Poor Previous Craftsmanship", text: "Gaps, uneven joints, and sloppy finish work from a previous contractor detract from your home's appearance." },
      { title: "Damaged Woodwork", text: "Scratched floors, chipped baseboards, and worn window casings need expert repair to look like new again." },
    ],
    process: [
      { step: 1, title: "Assessment & Consultation", description: "We inspect all carpentry needs, discuss materials and options, and provide a comprehensive written estimate." },
      { step: 2, title: "Material Selection", description: "We help you choose the right materials — premium wood, PVC composite, or MDF — based on location, climate exposure, and budget." },
      { step: 3, title: "Precision Removal", description: "We carefully remove damaged trim, doors, or woodwork, inspecting the underlying structure for hidden issues." },
      { step: 4, title: "Expert Installation", description: "Using professional-grade tools and techniques, we install new trim, doors, and woodwork with tight joints and perfect alignment." },
      { step: 5, title: "Finishing & Inspection", description: "We fill nail holes, sand smooth, caulk joints, and prime/paint as needed. Final walkthrough ensures every detail meets our standards." },
    ],
    benefits: [
      "Precision craftsmanship with 18+ years of carpentry experience",
      "Premium materials including rot-resistant PVC and hardwoods",
      "Complete door installation with hardware and proper alignment",
      "Exterior trim built to withstand New England weather",
      "Licensed & insured with a proven track record",
      "Clean, respectful work and thorough site cleanup",
    ],
    cta: "Schedule Your Carpentry Consultation",
    faqs: [
      { question: "What types of trim do you install?", answer: "We install all types of interior and exterior trim including baseboards, crown molding, window casings, door casings, chair rail, and decorative millwork. We work with wood, PVC, and MDF materials." },
      { question: "Can you match existing trim profiles?", answer: "Yes, we can match most existing trim profiles. If the exact profile is no longer available, we can custom-mill matching trim or suggest a complementary alternative." },
      { question: "Do you install interior and exterior doors?", answer: "Absolutely. We install all types of doors — interior passage doors, exterior entry doors, sliding doors, and French doors — with proper fitting, hardware, and weathersealing." },
      { question: "How do you handle rotten trim?", answer: "We remove the rotted sections, inspect the underlying structure for damage, make structural repairs if needed, then install new trim using rot-resistant materials to prevent future issues." },
      { question: "Is PVC trim better than wood for exteriors?", answer: "PVC trim is excellent for Massachusetts exteriors because it's completely rot-proof and moisture-resistant. However, some homeowners prefer the look and feel of real wood. We can advise on the best choice for your situation." },
    ],
    keywords: ["carpentry services Massachusetts", "trim work MA", "door installation near me", "carpenter Massachusetts"],
  },
  siding: {
    name: "Siding Installation & Repair",
    shortName: "Siding",
    heroImage: "/images/commercial-siding-installation-massachusetts.png",
    metaTitle: "Siding Installation & Repair in Massachusetts | Hardie Plank Experts",
    metaDescription: "Professional siding installation and repair in Massachusetts. Hardie Plank, vinyl siding specialists. Licensed & insured. 18+ years experience. Free estimates. Call (508) 596-3750.",
    headline: "Professional Siding Installation & Repair in Massachusetts",
    subheadline: "Protect your home from New England's harshest weather with premium siding from Alfa Construction. Specializing in Hardie Plank fiber cement and vinyl siding installation.",
    description: [
      "Your home's siding is its first line of defense against the elements. In Massachusetts, where nor'easters, freezing winters, and humid summers test every surface, having quality siding properly installed is essential. Alfa Construction Inc delivers expert siding services that protect and beautify your home.",
      "We specialize in James Hardie fiber cement siding — widely considered the best siding material for New England homes. Hardie Plank siding resists rot, won't warp or crack in temperature extremes, and maintains its appearance for decades. We're also experienced with vinyl siding installation and repair for homeowners seeking a budget-friendly option.",
      "Whether you need a full siding replacement or targeted repairs after storm damage, our team handles every aspect from removing old siding and inspecting sheathing to installing weather barriers and new siding with precision. The result is a weathertight, beautiful exterior built to last.",
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
      "Experienced with vinyl siding installation and repair",
      "Proper weather barrier installation for maximum protection",
      "Precision installation that prevents water infiltration",
      "Licensed & insured with 18+ years of siding experience",
      "Wide selection of colors and styles to match your vision",
    ],
    cta: "Get a Free Siding Quote",
    faqs: [
      { question: "Why is Hardie Plank siding recommended for Massachusetts homes?", answer: "Hardie Plank fiber cement siding is engineered for harsh climates. It won't rot, warp, or crack like wood; it resists impact better than vinyl; and it's fire-resistant. It's the ideal choice for Massachusetts homes that face extreme temperature swings." },
      { question: "How long does siding installation take?", answer: "A typical full-home siding installation takes 1-3 weeks depending on the size of the house, weather, and amount of underlying repair needed. We keep you informed throughout the process." },
      { question: "Can you repair just a section of siding?", answer: "Yes, we do targeted siding repairs including replacing damaged panels, fixing loose sections, and addressing storm damage. We color-match new panels to your existing siding whenever possible." },
      { question: "What's the difference between Hardie Plank and vinyl siding?", answer: "Hardie Plank is fiber cement — heavier, more durable, and more natural-looking than vinyl. Vinyl is lighter and less expensive but can crack in extreme cold and fade faster. We help you weigh the pros and cons for your specific situation." },
      { question: "Does new siding improve energy efficiency?", answer: "Absolutely. New siding combined with proper insulation and weather barriers can significantly reduce heating and cooling costs, especially if your current siding is old or damaged." },
    ],
    keywords: ["siding installation Massachusetts", "Hardie Plank installer MA", "siding repair near me", "vinyl siding Massachusetts"],
  },
  "windows-doors": {
    name: "Window & Door Installation",
    shortName: "Windows & Doors",
    heroImage: "/images/siding-window-installation-before-massachusetts.jpg",
    metaTitle: "Window & Door Installation in Massachusetts",
    metaDescription: "Professional window and door installation in Massachusetts. Energy-efficient upgrades, precise fitting. Licensed & insured. 18+ years experience. Free estimates. Call (508) 596-3750.",
    headline: "Professional Window & Door Installation in Massachusetts",
    subheadline: "Upgrade your home's comfort, security, and energy efficiency with precision window and door installation from Alfa Construction.",
    description: [
      "Windows and doors are critical to your home's comfort, energy efficiency, and security. Old, drafty windows and worn-out doors let cold New England air in during winter and conditioned air out during summer — costing you hundreds in energy bills every year.",
      "Alfa Construction Inc provides expert window and door installation across Massachusetts. We install energy-efficient double and triple-pane windows, modern entry doors, sliding patio doors, and interior doors with precise fitting that eliminates drafts and enhances your home's appearance.",
      "Our installation process ensures airtight, weatherproof results. We properly flash and seal every opening to prevent water intrusion, insulate gaps to maximize energy savings, and align every window and door for smooth, reliable operation. The result is a more comfortable, secure, and energy-efficient home.",
    ],
    painPoints: [
      { title: "Drafty Windows", text: "Old single-pane windows let cold air pour in during Massachusetts winters, creating uncomfortable rooms and skyrocketing heating bills." },
      { title: "High Energy Bills", text: "Inefficient windows and doors can account for 25-30% of your home's heating and cooling energy loss." },
      { title: "Stuck or Leaking Doors", text: "Doors that stick, won't latch, or let water seep in compromise your home's security and interior protection." },
      { title: "Outdated Appearance", text: "Old windows and doors date your home's look, reducing curb appeal and resale value." },
    ],
    process: [
      { step: 1, title: "Home Assessment", description: "We evaluate your current windows and doors, measure openings, discuss energy-efficiency options, and provide a detailed estimate." },
      { step: 2, title: "Product Selection", description: "We help you choose the right windows and doors based on style, energy rating, material, and budget. We work with top manufacturers." },
      { step: 3, title: "Careful Removal", description: "We remove old windows and doors cleanly, inspect the rough openings, and address any hidden issues like rot or water damage." },
      { step: 4, title: "Precision Installation", description: "New windows and doors are installed plumb, level, and square. We flash, seal, and insulate every opening for maximum performance." },
      { step: 5, title: "Finishing & Testing", description: "We install interior and exterior trim, test every window and door for smooth operation, and clean up completely." },
    ],
    benefits: [
      "Energy-efficient windows that reduce heating and cooling costs",
      "Precision installation for airtight, weatherproof performance",
      "Modern hardware and locking systems for enhanced security",
      "Wide selection of styles to match any home architecture",
      "Licensed & insured with 18+ years of installation experience",
      "Proper flashing and sealing to prevent water damage",
    ],
    cta: "Get a Free Window & Door Estimate",
    faqs: [
      { question: "How much can new windows save on energy bills?", answer: "Energy-efficient replacement windows can reduce heating and cooling costs by 15-30%, depending on the condition of your current windows and the efficiency rating of the new ones." },
      { question: "What types of windows do you install?", answer: "We install all types including double-hung, casement, slider, bay, bow, picture, and specialty windows. We work with major manufacturers to match your style and budget." },
      { question: "How long does window replacement take?", answer: "Most windows can be replaced in 30-60 minutes each. A typical home with 10-20 windows takes 2-4 days to complete." },
      { question: "Do you install entry doors and patio doors?", answer: "Yes, we install all types of exterior doors including entry doors, storm doors, French doors, and sliding patio doors, along with all interior door types." },
      { question: "Will new windows reduce outside noise?", answer: "Yes, modern double and triple-pane windows with insulated glass significantly reduce outside noise — a noticeable improvement over old single-pane windows." },
    ],
    keywords: ["window installation Massachusetts", "door replacement MA", "energy-efficient windows near me", "door installation Massachusetts"],
  },
  remodeling: {
    name: "Home Remodeling & Renovation",
    shortName: "Remodeling",
    heroImage: "/images/new-construction-framing-zip-system-massachusetts.jpg",
    metaTitle: "Home Remodeling & Renovation in Massachusetts",
    metaDescription: "Complete home remodeling and renovation in Massachusetts. Kitchen, bathroom, full-home renovations. Licensed & insured. 18+ years experience. Free estimates. Call (508) 596-3750.",
    headline: "Complete Home Remodeling & Renovation in Massachusetts",
    subheadline: "Transform your living spaces with Alfa Construction's full-service remodeling. From kitchens to bathrooms, we handle every detail to increase your home's value and livability.",
    description: [
      "Your home should reflect your lifestyle and grow with your family's needs. Alfa Construction Inc provides comprehensive home remodeling services across Massachusetts — from kitchen and bathroom renovations to full-home transformations that breathe new life into outdated spaces.",
      "What sets us apart is our ability to handle multiple trades under one roof. Carpentry, drywall, trim work, door installation — we coordinate every element of your renovation seamlessly, saving you the hassle of managing multiple contractors.",
      "Whether you're updating a tired kitchen, converting unused space into functional rooms, or preparing your home for sale with a strategic renovation, our experienced team delivers results that exceed expectations. Every project is managed with attention to detail, clear communication, and respect for your home.",
    ],
    painPoints: [
      { title: "Outdated Living Spaces", text: "Dated kitchens, bathrooms, and living areas make your home feel old and reduce its appeal to family and potential buyers." },
      { title: "Wasted Space", text: "Unused rooms, awkward layouts, and underutilized areas represent missed potential in your home's functionality and value." },
      { title: "Preparing to Sell", text: "Strategic renovations can significantly increase your home's market value and help it sell faster in Massachusetts' competitive market." },
      { title: "Multiple Contractor Headaches", text: "Coordinating painters, carpenters, and other trades is stressful. A single full-service contractor simplifies everything." },
    ],
    process: [
      { step: 1, title: "Design Consultation", description: "We discuss your vision, assess the space, review your budget, and create a detailed plan for your renovation project." },
      { step: 2, title: "Detailed Proposal", description: "You receive a comprehensive written proposal covering scope, materials, timeline, and cost — no surprises." },
      { step: 3, title: "Demolition & Prep", description: "We carefully demo existing structures, dispose of debris, and prepare the space for new construction." },
      { step: 4, title: "Construction & Installation", description: "Our team handles all phases — framing, drywall, trim, doors, painting, and finishing — with coordinated precision." },
      { step: 5, title: "Final Walkthrough", description: "We do a detailed walkthrough together, address any touch-ups, and ensure you're 100% satisfied with every detail." },
    ],
    benefits: [
      "Full-service renovation — carpentry, siding, drywall, and more under one roof",
      "Kitchen and bathroom expertise that adds real value to your home",
      "Experienced project management for smooth, on-time completion",
      "High-quality materials and finishes that stand the test of time",
      "Licensed & insured with 18+ years of remodeling experience",
      "Clear communication and respect for your home throughout the project",
    ],
    cta: "Start Your Remodeling Project",
    faqs: [
      { question: "What types of remodeling do you do?", answer: "We handle kitchen renovations, bathroom remodels, basement finishing, room additions, drywall, painting, trim work, door replacement, and general interior renovations. We can also combine services for a complete home transformation." },
      { question: "How long does a kitchen remodel take?", answer: "A typical kitchen remodel takes 4-8 weeks depending on scope. Simple updates like painting and new trim take less time, while full renovations with new layouts take longer." },
      { question: "Do you handle permits?", answer: "We guide you through the permitting process and ensure all work meets Massachusetts building codes. Our license #192348 ensures compliance with state requirements." },
      { question: "Can you work on the project while I'm living in the home?", answer: "Absolutely. Most of our remodeling projects are done in occupied homes. We plan the work to minimize disruption, contain dust, and clean up daily." },
      { question: "Will remodeling increase my home's value?", answer: "Yes, strategic renovations consistently deliver strong ROI. Kitchen and bathroom remodels typically return 60-80% of the investment in increased home value, and the improvements make your home more competitive if you decide to sell." },
    ],
    keywords: ["home remodeling Massachusetts", "house renovation MA", "general contractor near me", "kitchen remodel Massachusetts"],
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
