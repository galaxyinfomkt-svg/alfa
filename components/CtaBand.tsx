import Link from "next/link";
import { company } from "@/data/company";

/**
 * A slim conversion band for the middle of a long page.
 *
 * The full CTASection carries an embedded form and belongs at the end of a
 * page, where the reader has already been convinced. Repeating it between
 * sections would bury the page in forms, so this is the light version: one
 * line of copy and the two actions that matter, pointing at the same places.
 */
export default function CtaBand({
  headline = "Ready for your free estimate?",
  sub = "Licensed and insured. No obligation, no pressure.",
  tone = "gold",
}: {
  headline?: string;
  sub?: string;
  tone?: "gold" | "dark";
}) {
  const isGold = tone === "gold";

  return (
    <section
      className={
        isGold
          ? "py-10 bg-alfa-gold border-y border-black/10"
          : "py-10 bg-black border-y border-white/10"
      }
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p
            className={`text-xl sm:text-2xl font-bold ${
              isGold ? "text-black" : "text-white"
            }`}
          >
            {headline}
          </p>
          <p
            className={`mt-1 text-sm ${
              isGold ? "text-black/70" : "text-white/60"
            }`}
          >
            {sub}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:shrink-0">
          <Link
            href="/contact"
            className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-transform hover:scale-105 ${
              isGold
                ? "bg-black text-white hover:bg-black/85"
                : "bg-alfa-gold text-black hover:bg-alfa-gold-light"
            }`}
          >
            Get My Free Estimate
          </Link>
          <a
            href={company.phoneTel}
            className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold border transition-colors ${
              isGold
                ? "border-black/25 text-black hover:bg-black/5"
                : "border-white/25 text-white hover:bg-white/5"
            }`}
          >
            Call {company.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
