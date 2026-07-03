"use client";

import { useMemo } from "react";
import type { CatalogProduct } from "@/components/ProductCard";
import { EquipmentCategoryGrid } from "@/components/catalog/EquipmentCategoryGrid";
import { EquipmentCategoryHero } from "@/components/catalog/EquipmentCategoryHero";
import { CATALOG_ROUTES, PRODUCT_KIND } from "@/lib/catalog";
import {
  buildGasMeterSgTkVariantClusters,
  GAS_METER_SUBCATEGORY_SG_TK,
  gasMetersCategoryHref
} from "@/lib/gas-meters-catalog";

type Props = {
  products: CatalogProduct[];
  bannerSrc: string;
  mobileBannerSrc?: string | null;
};

export function GasMetersSgTkLanding({ products, bannerSrc, mobileBannerSrc }: Props) {
  const variantClusters = useMemo(() => buildGasMeterSgTkVariantClusters(products), [products]);

  return (
    <div className="store-equipment-category-page store-gas-meters-landing store-gas-meters-sg-tk-landing">
      <EquipmentCategoryHero
        bannerSrc={bannerSrc}
        mobileBannerSrc={mobileBannerSrc}
        title={GAS_METER_SUBCATEGORY_SG_TK}
        lead="Комплексы с электронной коррекцией показаний на базе турбинных, ротационных и диафрагменных счётчиков газа"
        bannerModifier="gas-meters"
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Каталог", href: CATALOG_ROUTES.equipment },
          { label: "Счётчики газа", href: gasMetersCategoryHref() },
          { label: GAS_METER_SUBCATEGORY_SG_TK }
        ]}
      />

      <div className="store-gas-meters-landing__subcategories-wrap">
        <EquipmentCategoryGrid
          clusters={variantClusters}
          kind={PRODUCT_KIND.GOODS}
          layout="list"
        />
      </div>
    </div>
  );
}
