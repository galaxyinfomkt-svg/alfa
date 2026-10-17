// data/reviews.ts
// ─────────────────────────────────────────────────────────────────────────────
// Reviews REAIS do Google (Alfa Construction Inc), copiadas do widget do
// Reputation Hub do GHL (que sincroniza com o Google Business Profile) em
// 16/10/2026. Renderizadas em SSR (HTML indexavel) e no schema da home.
//
// Ficaram DE FORA de proposito:
//   - "Fabio Defaria" (23/04/2025): e o dono avaliando a propria empresa.
//     Conflito de interesse pelas regras do Google; pedir para ele apagar.
//   - "LUIZ ALBERTO" (23/04/2025): aparenta ser da agencia/equipe. Mesmo motivo.
//   - "luciano Pereira" e "Guilherme Schnetzler": so estrelas, sem texto.
//   - "Noreen Hovey" (2018): fala de pintura, servico que a Alfa nao vende mais.
// Ajuste editorial: da review do Marcilio Ferreira foi removido o endereco de
// rua da casa dele (dado pessoal). Nenhuma outra palavra foi alterada.
//
// NAO inventar reviews. Para atualizar, copiar do Google ou do widget do GHL.
// ─────────────────────────────────────────────────────────────────────────────

export interface GoogleReview {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string; // ISO YYYY-MM-DD
  text: string;
  /** Cidade citada pelo proprio cliente na review, quando houver. */
  place?: string;
}

export const googleReviews: GoogleReview[] = [
  {
    author: "Douglas Graciano",
    rating: 5,
    date: "2025-05-18",
    text: "I hired Alfa to install new siding on my home after a very disappointing experience with a previous contractor, and I honestly cannot thank them enough. From start to finish, the entire team was courteous, professional, and respectful—not just to our property, but to our family as well. The crew was highly knowledgeable and took the time to explain each step of the process, ensuring we felt informed and comfortable throughout the project. The quality of their work exceeded my expectations, and the results speak for themselves. I’m truly grateful for their dedication and craftsmanship. I won’t hesitate to hire them again in the future, and I’ll gladly recommend Alfa to anyone in need of the services they offer.",
  },
  {
    author: "Meg Schlesman",
    rating: 5,
    date: "2025-05-16",
    text: "I wish I could give them 10 stars! Fabio and his crew did an amazing job with many aspects of our new home construction, Hardie siding, trim, Trex decking, painting, etc. His crew was professional and talented. Fabio worked tirelessly to ensure that the job was completed timely and within budget. I can't say enough good things about our experience with Fabio and his team!",
  },
  {
    author: "Marcilio Ferreira",
    rating: 5,
    date: "2025-05-18",
    text: "Excellent, guys very clean, and from the first day to the last day I am so happy it the job.",
    place: "Milford, MA",
  },
  {
    author: "Rafael Costa",
    rating: 5,
    date: "2025-05-17",
    text: "I highly recommend Alfa Construçao,,,quality work,,,respect for the client,,,I had the pleasure of carrying out some work with them,,,commitment and punctuality with the client is a rule with this company,,,thank you very much Alfa",
  },
];
