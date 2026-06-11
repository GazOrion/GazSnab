import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard, type CatalogProduct } from "@/components/ProductCard";
import { CATALOG_ROUTES, CATALOG_SECTION } from "@/lib/catalog";

type Props = {
  services: CatalogProduct[];
};

export function MetalworkingSubsection({ services }: Props) {
  if (!services.length) {
    return null;
  }

  return (
    <div className="store-metal-sub" id={CATALOG_SECTION.metalworking} aria-labelledby="store-metal-title">
      <header className="store-metal-sub-head">
        <div>
          <span className="eyebrow">Направление</span>
          <h3 id="store-metal-title">Металлообработка</h3>
          <p className="muted">
            Сверление, сварка, гибка, 3D-печать и другие работы — с фото и ценами «от».
          </p>
        </div>
        <Link className="store-section-link" href={CATALOG_ROUTES.services}>
          Все работы
          <ArrowRight size={17} aria-hidden />
        </Link>
      </header>

      <div className="store-metal-sub-track">
        {services.map((service) => (
          <ProductCard product={service} key={service.id} />
        ))}
      </div>
    </div>
  );
}
