import Image from "next/image";

type Props = {
  image: string;
  alt: string;
  compact?: boolean;
};

export function PumpDesignation({ image, alt, compact = false }: Props) {
  return (
    <section
      className={`store-pump-designation${compact ? " store-pump-designation--compact" : ""}`}
      aria-labelledby="pump-designation-title"
    >
      <h2 className="store-pump-designation__title" id="pump-designation-title">
        Как читать обозначение
      </h2>

      <figure className="store-pump-designation__figure">
        <Image
          src={image}
          alt={alt}
          width={1400}
          height={520}
          className="store-pump-designation__image"
          sizes="(max-width: 980px) 100vw, min(1400px, 100%)"
        />
      </figure>
    </section>
  );
}
