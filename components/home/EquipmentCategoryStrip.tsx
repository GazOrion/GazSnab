import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { EquipmentPromoCategory } from "@/lib/catalog-data";

type Props = {
  categories: EquipmentPromoCategory[];
  classPrefix: "store-hero-industrial" | "store-equipment-hero";
};

export function EquipmentCategoryStrip({ categories, classPrefix }: Props) {
  if (!categories.length) return null;

  return (
    <div className={`${classPrefix}__categories`} aria-label="Категории оборудования">
      <div className={`${classPrefix}__categories-inner`}>
        {categories.map((category) => (
          <Link
            key={`${category.href}-${category.title}`}
            href={category.href}
            className="store-equipment-category-card"
          >
            <span className="store-equipment-category-card__thumb">
              {category.imageUrl ? (
                <Image
                  src={category.imageUrl}
                  alt=""
                  width={88}
                  height={88}
                  className="store-equipment-category-card__img"
                />
              ) : (
                <span className="store-equipment-category-card__placeholder" aria-hidden />
              )}
            </span>
            <span className="store-equipment-category-card__body">
              <span className="store-equipment-category-card__title">{category.title}</span>
            </span>
            <span className="store-equipment-category-card__arrow" aria-hidden>
              <ArrowRight size={18} strokeWidth={2.5} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
