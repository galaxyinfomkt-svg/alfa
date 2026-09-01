/**
 * Largura de texto no SERP do Google, medida em pixels.
 *
 * O Google nao corta title e description por numero de caracteres — corta por
 * largura renderizada. Um title de 60 caracteres cheio de "W" estoura onde um
 * de 68 cheio de "i" cabe. Contar caractere leva a decisao errada.
 *
 * A tabela abaixo sao as larguras reais de cada caractere em Arial 20px,
 * extraidas do Chromium via canvas measureText. Arial 20px e a fonte do title
 * no SERP desktop; a description usa Arial 14px, que e a mesma tabela escalada.
 *
 * Limites praticos no SERP desktop:
 *   title ......... ~600px  (1 linha)
 *   description ... ~920px  (2 linhas)
 */

const ARIAL_20: Record<string, number> = {
  " ": 5.557,
  "!": 5.557,
  "\"": 7.1,
  "#": 11.123,
  "$": 11.123,
  "%": 17.783,
  "&": 13.34,
  "'": 3.818,
  "(": 6.66,
  ")": 6.66,
  "*": 7.783,
  "+": 11.68,
  ",": 5.557,
  "-": 6.66,
  ".": 5.557,
  "/": 5.557,
  "0": 11.123,
  "1": 11.123,
  "2": 11.123,
  "3": 11.123,
  "4": 11.123,
  "5": 11.123,
  "6": 11.123,
  "7": 11.123,
  "8": 11.123,
  "9": 11.123,
  ":": 5.557,
  ";": 5.557,
  "<": 11.68,
  "=": 11.68,
  ">": 11.68,
  "?": 11.123,
  "@": 20.303,
  "A": 13.34,
  "B": 13.34,
  "C": 14.443,
  "D": 14.443,
  "E": 13.34,
  "F": 12.217,
  "G": 15.557,
  "H": 14.443,
  "I": 5.557,
  "J": 10,
  "K": 13.34,
  "L": 11.123,
  "M": 16.66,
  "N": 14.443,
  "O": 15.557,
  "P": 13.34,
  "Q": 15.557,
  "R": 14.443,
  "S": 13.34,
  "T": 12.217,
  "U": 14.443,
  "V": 13.34,
  "W": 18.877,
  "X": 13.34,
  "Y": 13.34,
  "Z": 12.217,
  "[": 5.557,
  "\\": 5.557,
  "]": 5.557,
  "^": 9.385,
  "_": 11.123,
  "`": 6.66,
  "a": 11.123,
  "b": 11.123,
  "c": 10,
  "d": 11.123,
  "e": 11.123,
  "f": 5.557,
  "g": 11.123,
  "h": 11.123,
  "i": 4.443,
  "j": 4.443,
  "k": 10,
  "l": 4.443,
  "m": 16.66,
  "n": 11.123,
  "o": 11.123,
  "p": 11.123,
  "q": 11.123,
  "r": 6.66,
  "s": 10,
  "t": 5.557,
  "u": 11.123,
  "v": 10,
  "w": 14.443,
  "x": 10,
  "y": 10,
  "z": 10,
  "{": 6.68,
  "|": 5.195,
  "}": 6.68,
  "~": 11.68,
  "·": 6.66,
  "º": 7.305,
  "ã": 11.123,
  "é": 11.123,
  "–": 11.123,
  "—": 20,
  "★": 17.93,
};

/** Largura media, usada para qualquer caractere fora da tabela. */
const FALLBACK_20 = 11.1;

/** Largura de `text` em Arial, no `fontSize` pedido (padrao 20px). */
export function serpWidth(text: string, fontSize = 20): number {
  let total = 0;
  for (const ch of text) total += ARIAL_20[ch] ?? FALLBACK_20;
  return (total * fontSize) / 20;
}

export const TITLE_LIMIT_PX = 600;
export const DESCRIPTION_LIMIT_PX = 920;

/**
 * Monta o title mais informativo que ainda cabe.
 *
 * Recebe a base (sempre presente) e ganchos em ordem de prioridade; devolve a
 * base com o primeiro gancho que couber. `brandSuffix` e o que o template do
 * layout anexa depois — precisa entrar na conta.
 */
export function fitTitle(
  base: string,
  hooks: string[],
  brandSuffix = " | Alfa Construction",
  limitPx: number = TITLE_LIMIT_PX,
): string {
  const budget = limitPx - serpWidth(brandSuffix, 20);
  for (const hook of hooks) {
    const candidate = base + hook;
    if (serpWidth(candidate, 20) <= budget) return candidate;
  }
  return base;
}

/**
 * Corta `text` na ultima fronteira de palavra que ainda cabe em `limitPx`.
 * Nunca parte uma palavra no meio.
 */
export function clipToWidth(
  text: string,
  limitPx: number,
  fontSize = 14,
): string {
  if (serpWidth(text, fontSize) <= limitPx) return text;
  const words = text.split(" ");
  let out = "";
  for (const word of words) {
    const next = out ? `${out} ${word}` : word;
    if (serpWidth(next, fontSize) > limitPx) break;
    out = next;
  }
  return out.replace(/[\s,;:—-]+$/, "");
}

/**
 * Escolhe a primeira description que cabe no snippet.
 *
 * Diferente de `fitTitle`, esta funcao NUNCA devolve algo que estoure: se
 * nenhuma candidata couber, a ultima e cortada em fronteira de palavra. O
 * motivo e o C-01 da auditoria — o que estourava e era cortado pelo Google era
 * exatamente o telefone no fim da frase. Escreva as candidatas da mais
 * completa para a mais enxuta, com o telefone sempre dentro do orcamento.
 */
export function fitDescription(
  candidates: string[],
  limitPx: number = DESCRIPTION_LIMIT_PX,
): string {
  for (const candidate of candidates) {
    if (serpWidth(candidate, 14) <= limitPx) return candidate;
  }
  return clipToWidth(candidates[candidates.length - 1] ?? "", limitPx, 14);
}

/**
 * Monta a description garantindo que o final (`tail`) sempre sobreviva.
 *
 * Este e o remedio direto do C-01 da auditoria: as descriptions do site
 * terminavam com "Free estimate: (508) 590-9193" e estouravam o snippet, entao
 * o Google cortava justamente o telefone — o unico CTA do resultado de busca.
 * Aqui o orcamento e reservado para o `tail` primeiro; o corpo cede espaco.
 */
export function fitDescriptionWithTail(
  body: string,
  tail: string,
  limitPx: number = DESCRIPTION_LIMIT_PX,
): string {
  const tailWidth = serpWidth(` ${tail}`, 14);
  const clipped = clipToWidth(body, limitPx - tailWidth, 14);
  return clipped ? `${clipped} ${tail}` : tail;
}

/**
 * Remove um telefone e a chamada que costuma acompanha-lo do fim de um texto,
 * para que `fitDescriptionWithTail` possa reanexa-lo dentro do orcamento em
 * vez de deixar o Google corta-lo.
 */
export function stripTrailingPhone(text: string): string {
  return text
    .replace(/[^.!?]*\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}[^.!?]*[.!?]?\s*$/i, "")
    .trim();
}
