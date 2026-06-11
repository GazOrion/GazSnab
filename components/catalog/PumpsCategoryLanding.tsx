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
};

export function PumpsCategoryLanding({ products, bannerSrc }: Props) {
  const presentation = clusterPresentation(PUMPS_CATEGORY, PRODUCT_KIND.GOODS);
  const subcategoryClusters = useMemo(() => buildPumpSubcategoryClusters(products), [products]);

  return (
    <div className="store-equipment-category-page store-pumps-landing">
      <EquipmentCategoryHero
        bannerSrc={bannerSrc}
        title={presentation.title}
        lead={presentation.teaser}
        bannerModifier="pumps"
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Каталог", href: CATALOG_ROUTES.equipment },
          { label: presentation.title }
        ]}
      />

      <div className="container store-pumps-landing__subcategories-wrap">
        <EquipmentCategoryGrid
          clusters={subcategoryClusters}
          kind={PRODUCT_KIND.GOODS}
          layout="grid"
        />
      </div>

      <EquipmentCategoryListing
        category={PUMPS_CATEGORY}
        products={products}
        bannerSrc={bannerSrc}
        hideHero
        listingTitle="Все насосы"
      />
    </div>
  );
}
