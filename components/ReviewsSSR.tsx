import { googleReviews } from "@/data/reviews";
import { company } from "@/data/company";

/**
 * Reviews do Google renderizadas no servidor: HTML de verdade, que o Google e
 * as IAs conseguem ler (o widget do Reputation Hub e um iframe invisivel para
 * eles). Fonte: data/reviews.ts.
 */
function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={i < rating ? "w-4 h-4 text-alfa-gold" : "w-4 h-4 text-line"} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

const fmt = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString("en-US", { month: "long", year: "numeric" });

/**
 * Versao curta para paginas programaticas (cidades): uma review por pagina,
 * alternando por `seed`, para nao repetir o mesmo bloco grande em 109 paginas.
 */
export function ReviewQuote({ seed }: { seed: string }) {
  if (googleReviews.length === 0) return null;
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  const r = googleReviews[Math.abs(h) % googleReviews.length];
  return (
    <figure className="max-w-3xl">
      <Stars rating={r.rating} />
      <blockquote className="mt-4 text-xl md:text-2xl leading-relaxed text-ink">“{r.text}”</blockquote>
      <figcaption className="mt-5 text-sm text-ink-soft">
        <span className="font-semibold text-ink">{r.author}</span>
        {r.place ? ` · ${r.place}` : ""} · Google review · <time dateTime={r.date}>{fmt(r.date)}</time> ·{" "}
        <a href={company.googleReview} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink underline underline-offset-2">
          Read all reviews
        </a>
      </figcaption>
    </figure>
  );
}

export default function ReviewsSSR({ limit }: { limit?: number }) {
  const list = limit ? googleReviews.slice(0, limit) : googleReviews;
  const [first, ...rest] = list;
  if (!first) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
      {/* A review mais completa ganha destaque: e a que mais responde a duvida
          de quem ja teve problema com outro empreiteiro. */}
      <figure className="bg-card shadow-soft rounded-[2rem] p-7 md:p-9 flex flex-col self-start">
        <Stars rating={first.rating} />
        <blockquote className="mt-4 text-lg md:text-xl leading-relaxed text-ink flex-1">“{first.text}”</blockquote>
        <figcaption className="mt-6 text-sm text-ink-soft">
          <span className="font-semibold text-ink">{first.author}</span> · Google review · <time dateTime={first.date}>{fmt(first.date)}</time>
        </figcaption>
      </figure>
      <div className="flex flex-col gap-6">
        {rest.map((r) => (
          <figure key={r.author + r.date} className="bg-card shadow-soft rounded-[2rem] p-6">
            <Stars rating={r.rating} />
            <blockquote className="mt-3 text-ink leading-relaxed">“{r.text}”</blockquote>
            <figcaption className="mt-4 text-sm text-ink-soft">
              <span className="font-semibold text-ink">{r.author}</span>
              {r.place ? ` · ${r.place}` : ""} · <time dateTime={r.date}>{fmt(r.date)}</time>
            </figcaption>
          </figure>
        ))}
        <a
          href={company.googleReview}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-ink px-5 py-3 font-semibold text-ink hover:bg-ink hover:text-white transition-colors"
        >
          Read all reviews on Google
        </a>
      </div>
    </div>
  );
}
