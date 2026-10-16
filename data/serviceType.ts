// data/serviceType.ts — shared Service shape (statewide /services/<slug> pages).
export interface Service {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  icon: string;
  heroImage: string;
  keywords: string[];
  painPoints: string[];
  solutions: string[];
  process: { step: number; title: string; description: string }[];
  benefits: string[];
  cta: string;
  ctaDescription: string;
  faqs: { question: string; answer: string }[];
  metaTitle: string;
  metaDescription: string;
}
