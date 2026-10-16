import Image from "next/image";

/**
 * Logo do site: o simbolo dourado + o nome em texto.
 *
 * O logo.png antigo trazia "PAINTING & CARPENTRY" embaixo do nome — servicos que
 * a Alfa nao vende mais — e, por ser uma imagem larga com muita margem, aparecia
 * com ~120px no header e o nome ficava ilegivel. Aqui so o simbolo e imagem; o
 * nome e texto de verdade, nitido em qualquer tela.
 */
export default function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const mark = size === "lg" ? 44 : 38;
  return (
    <span className="flex items-center gap-2.5">
      <Image
        src="/images/logo-mark-96.png"
        alt=""
        width={mark}
        height={Math.round(mark * 0.906)}
        className="shrink-0"
        priority
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-extrabold tracking-wide text-white ${
            size === "lg" ? "text-xl" : "text-base md:text-lg"
          }`}
        >
          ALFA CONSTRUCTION
        </span>
        <span className="mt-1 text-[10px] md:text-[11px] font-semibold tracking-[0.18em] text-alfa-gold">
          SIDING SPECIALISTS
        </span>
      </span>
    </span>
  );
}
