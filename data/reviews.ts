// data/reviews.ts
// ─────────────────────────────────────────────────────────────────────────────
// Reviews REAIS do Google (Alfa Construction Inc) para render em SSR + schema.
//
// ⚠️ TODO(Luiz): COLAR AQUI as reviews reais do Google Business Profile
// (autor, nota, data ISO YYYY-MM-DD, texto). NÃO inventar reviews.
// Enquanto este array estiver vazio:
//   - O bloco de reviews SSR (ReviewsSSR) cai no fallback (widget GHL abaixo).
//   - O schema da home emite aggregateRating SEM a lista `review` (TODO Luiz
//     confirmar rating/reviewCount no GBP — ver data/siteConfig.ts).
//
// Fonte: https://g.page/r/CZ1rhJ3jJReMEAE  (link real do GBP)
// ─────────────────────────────────────────────────────────────────────────────

export interface GoogleReview {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string; // ISO YYYY-MM-DD
  text: string;
}

export const googleReviews: GoogleReview[] = [
  // TODO(Luiz): exemplo do formato — substituir por reviews reais:
  // {
  //   author: "Jane D.",
  //   rating: 5,
  //   date: "2025-09-12",
  //   text: "Alfa re-sided our whole house in HardiePlank...",
  // },
];
