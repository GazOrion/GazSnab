"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import {
  HOME_HERO_MOBILE_PROMO_CATEGORY,
  PRODUCT_KIND,
  catalogPath
} from "@/lib/catalog";
import type { EquipmentPromoCategory } from "@/lib/catalog-data";

type Props = {
  categories: EquipmentPromoCategory[];
  classPrefix: "store-hero-industrial" | "store-equipment-hero";
};

const homeHeroMobileCategory: EquipmentPromoCategory = {
  title: HOME_HERO_MOBILE_PROMO_CATEGORY.label,
  href: catalogPath({
    kind: PRODUCT_KIND.GOODS,
    category: HOME_HERO_MOBILE_PROMO_CATEGORY.name
  }),
  imageUrl: HOME_HERO_MOBILE_PROMO_CATEGORY.image
};

function CategoryCard({ category }: { category: EquipmentPromoCategory }) {
  return (
    <Link href={category.href} className="store-equipment-category-card">
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
  );
}

export function EquipmentCategoryStrip({ categories, classPrefix }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (!categories.length) return null;

  const showMobileGasCorrectors =
    classPrefix === "store-hero-industrial" && isMobile;

  return (
    <div className={`${classPrefix}__categories`} aria-label="Категории оборудования">
      <div className={`${classPrefix}__categories-inner`}>
        {categories.map((category) => (
          <CategoryCard key={`${category.href}-${category.title}`} category={category} />
        ))}
        {showMobileGasCorrectors ? (
          <CategoryCard
            key={`${homeHeroMobileCategory.href}-${homeHeroMobileCategory.title}`}
            category={homeHeroMobileCategory}
          />
        ) : null}
      </div>
    </div>
  );
}
