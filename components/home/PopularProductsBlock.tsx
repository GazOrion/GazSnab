import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EquipmentPopularCard } from "@/components/home/EquipmentPopularCard";
import type { CatalogProduct } from "@/components/ProductCard";

type Props = {
  products: CatalogProduct[];
  catalogHref: string;
  title?: string;
  classPrefix?: string;
};

export function PopularProductsBlock({
  products,
  catalogHref,
  title = "Популярные позиции",
  classPrefix = "store-popular-block"
}: Props) {
  if (products.length === 0) return null;

  return (
    <div className={`${classPrefix}__popular`}>
      <header className={`${classPrefix}__popular-head`}>
        <h3 className={`${classPrefix}__popular-title`}>{title}</h3>
        <Link className={`${classPrefix}__popular-link`} href={catalogHref}>
          Смотреть все
          <ArrowRight size={16} aria-hidden />
        </Link>
      </header>
      <div className={`${classPrefix}__popular-grid`}>
        {products.map((product) => (
          <EquipmentPopularCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
