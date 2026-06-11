"use client";

import { useMemo } from "react";
import type { CatalogProduct } from "@/components/ProductCard";
import { EquipmentCategoryGrid } from "@/components/catalog/EquipmentCategoryGrid";
import { EquipmentCategoryHero } from "@/components/catalog/EquipmentCategoryHero";
import { EquipmentCategoryListing } from "@/components/catalog/EquipmentCategoryListing";
import { CATALOG_ROUTES, clusterPresentation, PRODUCT_KIND } from "@/lib/catalog";
import { buildGasMeterSubcategoryClusters } from "@/lib/gas-meters-catalog";
import { GAS_METERS_CATEGORY } from "@/lib/equipment-category-config";

type Props = {
  products: CatalogProduct[];
  bannerSrc: string;
};

export function GasMetersCategoryLanding({ products, bannerSrc }: Props) {
  const presentation = clusterPresentation(GAS_METERS_CATEGORY, PRODUCT_KIND.GOODS);
  const subcategoryClusters = useMemo(
    () => buildGasMeterSubcategoryClusters(products),
    [products]
  );

  return (
    <div className="store-equipment-category-page store-gas-meters-landing">
      <EquipmentCategoryHero
        bannerSrc={bannerSrc}
        title={presentation.title}
        lead={presentation.teaser}
        bannerModifier="gas-meters"
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Каталог", href: CATALOG_ROUTES.equipment },
          { label: presentation.title }
        ]}
      />

      <div className="container store-gas-meters-landing__subcategories-wrap">
        <EquipmentCategoryGrid
          clusters={subcategoryClusters}
          kind={PRODUCT_KIND.GOODS}
          layout="grid"
        />
      </div>

      <EquipmentCategoryListing
        category={GAS_METERS_CATEGORY}
        products={products}
        bannerSrc={bannerSrc}
        hideHero
        listingTitle="Все счётчики газа"
      />
    </div>
  );
}
