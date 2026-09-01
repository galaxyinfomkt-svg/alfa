/**
 * videos.ts — fonte unica de verdade dos videos do site.
 *
 * POR QUE ESTE ARQUIVO EXISTE
 * ---------------------------
 * A auditoria de 1.132 paginas nao encontrou UM video no site: zero <video>,
 * zero embed, zero schema VideoObject. Enquanto isso ha mais de 20 filmagens
 * de obra da Alfa paradas no Drive, varias nomeadas pela cidade onde foram
 * feitas — inclusive quatro em cidades que ja tem pagina publicada.
 *
 * Para um servico onde o resultado e visual e a execucao e o diferencial,
 * video e uma superficie de busca inteira que o site nao estava disputando:
 * sem VideoObject nao existe rich result de video, nem thumbnail ao lado do
 * link azul, nem entrada na aba Videos do Google.
 *
 * Foto prova o resultado. Filmagem prova a execucao — que e justamente o que
 * concorrente nenhum copia, e o antidoto direto para o problema medido em
 * A-01 da auditoria: paginas do mesmo servico em cidades diferentes com 62,5%
 * de similaridade media. Um video local e conteudo que so aquela pagina tem.
 *
 * REGRA DE HONESTIDADE
 * --------------------
 * `uploadDate` e `duration` sao OBRIGATORIOS e precisam ser os valores reais
 * do arquivo. O Google trata uploadDate errado como violacao de dado
 * estruturado, e um valor chutado e exatamente o tipo de detalhe inventado que
 * o resto deste codigo se recusa a publicar. videoSchema() ignora qualquer
 * entrada sem esses campos em vez de inventar uma data — e CityVideo nao
 * renderiza nada quando a cidade nao tem filmagem. Um player quebrado ou um
 * estado vazio seria pior que a ausencia.
 *
 * ── COMO ADICIONAR OS VIDEOS DO DRIVE ───────────────────────────────────────
 * Os arquivos do Drive sao .MOV/.mp4 de celular. Antes de commitar:
 *
 *   1. Transcodifique para MP4 web (H.264 + AAC, faststart):
 *        ffmpeg -i entrada.MOV -vcodec libx264 -crf 24 -preset slow \
 *               -vf "scale='min(1280,iw)':-2" -acodec aac -b:a 128k \
 *               -movflags +faststart public/videos/<slug>.mp4
 *
 *   2. Gere a capa (o poster e o que carrega na pagina; o MP4 so sai do
 *      servidor se a pessoa der play):
 *        ffmpeg -i public/videos/<slug>.mp4 -ss 00:00:02 -vframes 1 \
 *               -q:v 3 public/videos/<slug>.jpg
 *
 *   3. Leia a duracao real:
 *        ffprobe -v error -show_entries format=duration \
 *                -of csv=p=0 public/videos/<slug>.mp4
 *      e converta para ISO-8601 (39s vira 'PT39S', 1m20s vira 'PT1M20S').
 *
 *   4. Acrescente a entrada em `videos` abaixo com o citySlug e o serviceSlug
 *      corretos. Nada mais precisa mudar — a pagina passa a mostrar o video e
 *      a emitir VideoObject automaticamente.
 *
 * VIDEOS JA IDENTIFICADOS NO DRIVE, aguardando os passos acima:
 *
 *   arquivo no Drive                                 destino
 *   ------------------------------------------------ -------------------------
 *   Siding In Douglas MA (Alfa Construction).mp4      /massachusetts/douglas
 *   wood-shingles-siding-reading-ma.mp4               /massachusetts/reading
 *   custom-pvc-window-trim-woburn-ma.mp4              /massachusetts/woburn
 *   Installation Hardie plank — Jamaica Plain (x2)    /services/hardie-plank-siding
 *   Siding installation in Ma.MOV                     /services/siding
 *   siding-replacement-atkinson-nh (x6)               /services/siding (prova geral)
 *   Siding install Lynnfield MA.MOV (x2)              Lynnfield ainda nao tem pagina
 *   red-cedar-shingles-installation-...-lynnfield(x2) Lynnfield ainda nao tem pagina
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { siteConfig } from "./siteConfig";

export interface SiteVideo {
  /** Slug do video. Vira o nome do arquivo em /public/videos. */
  id: string;
  /** Caminho do MP4 em /public. Ex: '/videos/siding-douglas-ma.mp4' */
  src: string;
  /** Caminho do frame de capa. Ex: '/videos/siding-douglas-ma.jpg' */
  poster: string;
  /** O que o video mostra — vira o `name` do VideoObject. */
  title: string;
  /** Uma ou duas frases sobre o que aparece. Factual, sem venda. */
  description: string;
  /** Data real de publicacao, YYYY-MM-DD. Sem isto nao ha schema. */
  uploadDate: string;
  /** Duracao real em ISO-8601, lida com ffprobe. Sem isto nao ha schema. */
  duration: string;
  /** Slug da cidade, quando a filmagem e de uma obra identificavel. */
  citySlug?: string;
  /** Slug do servico, para o video aparecer na /services/* correspondente. */
  serviceSlug?: string;
}

/**
 * Vazio de proposito. Os arquivos estao no Drive e ainda nao passaram pelo
 * transcode — ver o cabecalho. Enquanto esta lista estiver vazia, CityVideo e
 * ServiceVideo nao renderizam nada e nenhum schema e emitido, que e o
 * comportamento correto: melhor ausencia que player quebrado.
 */
export const videos: SiteVideo[] = [];

/** Videos de uma cidade. */
export const videosForCity = (citySlug: string): SiteVideo[] =>
  videos.filter((v) => v.citySlug === citySlug);

/** Videos de um servico. */
export const videosForService = (serviceSlug: string): SiteVideo[] =>
  videos.filter((v) => v.serviceSlug === serviceSlug);

/**
 * VideoObject JSON-LD dos videos de uma pagina.
 *
 * Devolve null quando nenhum video da lista carrega os dados reais de
 * publicacao, para a pagina nao emitir markup construido sobre data chutada.
 * Assim que uploadDate + duration forem preenchidos, toda pagina que mostra o
 * video passa a emitir VideoObject valido sozinha.
 */
export function videoSchema(list: SiteVideo[] = videos) {
  const eligible = list.filter(
    (v) => v.uploadDate && v.duration && v.poster && v.src,
  );
  if (eligible.length === 0) return null;

  const base = siteConfig.url;

  return {
    "@context": "https://schema.org",
    "@graph": eligible.map((v) => ({
      "@type": "VideoObject",
      "@id": `${base}${v.src}#video`,
      name: v.title,
      description: v.description,
      thumbnailUrl: [`${base}${v.poster}`],
      uploadDate: v.uploadDate,
      duration: v.duration,
      contentUrl: `${base}${v.src}`,
      publisher: { "@id": `${base}/#business` },
    })),
  };
}
