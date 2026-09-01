import { videosForCity, videosForService, videoSchema, type SiteVideo } from "@/data/videos";

/**
 * Filmagem de obra numa pagina de cidade ou de servico.
 *
 * POR QUE ISTO EXISTE
 * A auditoria nao achou nenhum video em 1.132 paginas — nem <video>, nem
 * VideoObject. Este e o consumidor de data/videos.ts.
 *
 * PERFORMANCE
 * preload="none" nao e opcional aqui. O MP4 tem alguns megabytes e o poster
 * tem dezenas de kilobytes: a pagina carrega so a imagem, e os megabytes so
 * saem do servidor se a pessoa clicar em play. Sem isso um video custaria mais
 * que a pagina inteira e desfaria o trabalho de defer feito no FormEmbed.
 *
 * Nao renderiza nada quando nao ha filmagem para aquela cidade ou servico. Um
 * estado vazio seria pior que a ausencia.
 */
export default function SiteVideo({
  citySlug,
  serviceSlug,
  placeName,
}: {
  citySlug?: string;
  serviceSlug?: string;
  placeName: string;
}) {
  const list: SiteVideo[] = citySlug
    ? videosForCity(citySlug)
    : serviceSlug
      ? videosForService(serviceSlug)
      : [];

  if (list.length === 0) return null;

  const schema = videoSchema(list);

  return (
    <section className="py-20 bg-alfa-dark" aria-labelledby="site-video-heading">
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <div className="max-w-4xl mx-auto px-4">
        <span className="text-alfa-gold font-semibold text-sm uppercase tracking-wider">
          On the job
        </span>
        <h2
          id="site-video-heading"
          className="text-3xl md:text-4xl font-bold text-white mt-2 mb-3"
        >
          Watch us work in {placeName}
        </h2>
        <p className="text-gray-400 mb-8">
          Filmed by our own crew on site. No stock footage.
        </p>

        <ul className="grid grid-cols-1 gap-8">
          {list.map((v) => (
            <li key={v.id}>
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video
                className="w-full rounded-xl border border-white/10 bg-black"
                src={v.src}
                poster={v.poster}
                preload="none"
                controls
                playsInline
                aria-label={v.title}
              />
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                {v.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
