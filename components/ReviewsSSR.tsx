import { googleReviews } from "@/data/reviews";
import { company } from "@/data/company";

/**
 * Server-rendered (SSR) Google reviews — indexable HTML that backs the
 * #organization aggregateRating on the home page. Unlike ReviewsWidget (a
 * reputationhub iframe, invisible to crawlers), these cards are real DOM.
 *
 * Source: data/reviews.ts. While that array is empty, this renders a small
 * fallback pointing to the live Google profile (the iframe below still shows
 * the real reviews). // TODO(Luiz): paste the real reviews into data/reviews.ts
 * and they appear here automatically.
 */
function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={i < rating ? "w-4 h-4 text-alfa-gold" : "w-4 h-4 text-gray-600"}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

export default function ReviewsSSR() {
  if (googleReviews.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center bg-alfa-card border border-white/10 rounded-2xl p-8">
        <p className="text-gray-300 leading-relaxed">
          Read our verified 5-star reviews from Massachusetts homeowners on Google.
        </p>
        <a
          href={company.googleReview}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 text-alfa-gold font-semibold hover:text-white transition-colors"
        >
          See all Google reviews
        </a>
        {/* TODO(Luiz): cole as reviews reais em data/reviews.ts para renderizar os cards SSR aqui. */}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {googleReviews.slice(0, 6).map((r, i) => (
        <figure
          key={i}
          className="bg-alfa-card border border-white/10 rounded-2xl p-6 flex flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <Stars rating={r.rating} />
            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-label="Google review">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0012 23z" />
              <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 015.49 12c0-.73.13-1.43.35-2.1V7.06H2.18A11 11 0 001 12c0 1.77.43 3.45 1.18 4.94l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 002.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
            </svg>
          </div>
          <blockquote className="text-gray-300 text-sm leading-relaxed grow">
            &ldquo;{r.text}&rdquo;
          </blockquote>
          <figcaption className="text-sm text-gray-400 font-medium">
            {r.author}
            <span className="text-gray-400"> · {new Date(r.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
