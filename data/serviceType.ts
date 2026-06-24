// data/serviceType.ts — shared Service shape for the city × service matrix.
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
  cityIntros: Record<"historic" | "suburban" | "rural" | "urban", string[]>;
  cityPainPoints: Record<"historic" | "suburban" | "rural" | "urban", string[]>;
  citySolutions: Record<"historic" | "suburban" | "rural" | "urban", string[]>;
  cityClosings: Record<"historic" | "suburban" | "rural" | "urban", string[]>;
}
