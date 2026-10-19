import { company } from "@/data/company";
import FormEmbed from "./FormEmbed";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  cityName?: string;
  /** id da ancora (os botoes "Get a free estimate" apontam para ela). */
  id?: string;
}

/**
 * Secao de orcamento: o argumento a esquerda, o formulario do GHL a direita,
 * sem moldura nem fundo atras do formulario (ele aparece como vem do GHL).
 */
export default function CTASection({ title, subtitle, cityName, id = "estimate" }: CTASectionProps) {
  const heading = title || (cityName ? `Get a free siding estimate in ${cityName}` : "Get a free siding estimate");
  const sub =
    subtitle ||
    `Tell us about the house. Fabio calls you back the same day, walks the property and sends an itemized written estimate within 24 hours.`;

  return (
    <section id={id} className="scroll-mt-28 py-16 md:py-24 bg-mist">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-32">
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-5">{heading}</h2>
          <p className="text-lg text-ink-soft leading-relaxed max-w-lg mb-8">{sub}</p>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 max-w-md mb-8 text-sm">
            <div>
              <dt className="text-ink-soft">Estimate</dt>
              <dd className="font-semibold text-ink">Free, itemized, in writing</dd>
            </div>
            <div>
              <dt className="text-ink-soft">License</dt>
              <dd className="font-semibold text-ink">MA HIC {company.license}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Experience</dt>
              <dd className="font-semibold text-ink">Since {company.foundedYear}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Languages</dt>
              <dd className="font-semibold text-ink">English &amp; Portuguese</dd>
            </div>
          </dl>
          <p className="text-ink-soft">
            Prefer to talk?{" "}
            <a href={company.phoneTel} className="font-bold text-ink underline underline-offset-4 decoration-alfa-gold decoration-2 hover:decoration-ink">
              Call {company.phone}
            </a>
          </p>
        </div>
        <FormEmbed />
      </div>
    </section>
  );
}
