"use client";

import { useMemo } from "react";
import type { CatalogProduct } from "@/components/ProductCard";
import { EquipmentCategoryGrid } from "@/components/catalog/EquipmentCategoryGrid";
import { EquipmentCategoryHero } from "@/components/catalog/EquipmentCategoryHero";
import { EquipmentCategoryListing } from "@/components/catalog/EquipmentCategoryListing";
import { CATALOG_ROUTES, clusterPresentation, PRODUCT_KIND } from "@/lib/catalog";
import { PUMPS_CATEGORY } from "@/lib/equipment-category-config";
import { buildPumpSubcategoryClusters } from "@/lib/pumps-catalog";

type Props = {
  products: CatalogProduct[];
  bannerSrc: string;
  mobileBannerSrc?: string | null;
};

export function PumpsCategoryLanding({ products, bannerSrc, mobileBannerSrc }: Props) {
  const presentation = clusterPresentation(PUMPS_CATEGORY, PRODUCT_KIND.GOODS);
  const subcategoryClusters = useMemo(() => buildPumpSubcategoryClusters(products), [products]);

  return (
    <div className="store-equipment-category-page store-pumps-landing">
      <EquipmentCategoryHero
        bannerSrc={bannerSrc}
        mobileBannerSrc={mobileBannerSrc}
        title={presentation.title}
        lead={presentation.teaser}
        bannerModifier="pumps"
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Каталог", href: CATALOG_ROUTES.equipment },
          { label: presentation.title }
        ]}
      />

      <div className="store-pumps-landing__subcategories-wrap">
        <EquipmentCategoryGrid
          clusters={subcategoryClusters}
          kind={PRODUCT_KIND.GOODS}
          layout="list"
        />
      </div>

      <EquipmentCategoryListing
        className="store-pumps-landing__listing"
        category={PUMPS_CATEGORY}
        products={products}
        bannerSrc={bannerSrc}
        mobileBannerSrc={mobileBannerSrc}
        hideHero
        listingTitle="Все насосы"
      />
    </div>
  );
}
