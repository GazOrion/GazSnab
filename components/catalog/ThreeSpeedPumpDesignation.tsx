import Image from "next/image";

const DESIGNATION_IMAGE = "/media/categories/pumps/three-speed-designation.webp";

export function ThreeSpeedPumpDesignation() {
  return (
    <section className="store-pump-designation" aria-labelledby="pump-designation-title">
      <h2 className="store-pump-designation__title" id="pump-designation-title">
        Как читать обозначение
      </h2>

      <figure className="store-pump-designation__figure">
        <Image
          src={DESIGNATION_IMAGE}
          alt="Схема расшифровки обозначения трёхскоростного насоса GS-F"
          width={1400}
          height={520}
          className="store-pump-designation__image"
          sizes="(max-width: 980px) 100vw, min(1400px, 100%)"
        />
      </figure>
    </section>
  );
}
