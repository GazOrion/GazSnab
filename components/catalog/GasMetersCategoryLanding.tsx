"use client";

import { useMemo } from "react";
import type { CatalogProduct } from "@/components/ProductCard";
import { EquipmentCategoryGrid } from "@/components/catalog/EquipmentCategoryGrid";
import { EquipmentCategoryHero } from "@/components/catalog/EquipmentCategoryHero";
import { EquipmentCategoryListing } from "@/components/catalog/EquipmentCategoryListing";
import { CATALOG_ROUTES, clusterPresentation, PRODUCT_KIND } from "@/lib/catalog";
import { buildGasMeterSubcategoryClusters } from "@/lib/gas-meters-catalog";
import { GAS_METERS_CATEGORY } from "@/lib/equipment-category-config";
import { getClientMobileEquipmentCategoryBannerSrc } from "@/lib/mobile-banner-paths";

type Props = {
  products: CatalogProduct[];
  bannerSrc: string;
  mobileBannerSrc?: string | null;
};

export function GasMetersCategoryLanding({ products, bannerSrc, mobileBannerSrc }: Props) {
  const presentation = clusterPresentation(GAS_METERS_CATEGORY, PRODUCT_KIND.GOODS);
  const subcategoryClusters = useMemo(
    () => buildGasMeterSubcategoryClusters(products),
    [products]
  );
  const resolvedMobileBannerSrc =
    mobileBannerSrc ?? getClientMobileEquipmentCategoryBannerSrc(GAS_METERS_CATEGORY);

  return (
    <div className="store-equipment-category-page store-gas-meters-landing">
      <EquipmentCategoryHero
        bannerSrc={bannerSrc}
        mobileBannerSrc={resolvedMobileBannerSrc}
        title={presentation.title}
        lead={presentation.teaser}
        bannerModifier="gas-meters"
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Каталог", href: CATALOG_ROUTES.equipment },
          { label: presentation.title }
        ]}
      />

      <div className="store-gas-meters-landing__subcategories-wrap">
        <EquipmentCategoryGrid
          clusters={subcategoryClusters}
          kind={PRODUCT_KIND.GOODS}
          layout="list"
        />
      </div>

      <EquipmentCategoryListing
        className="store-gas-meters-landing__listing"
        category={GAS_METERS_CATEGORY}
        products={products}
        bannerSrc={bannerSrc}
        mobileBannerSrc={resolvedMobileBannerSrc}
        hideHero
        listingTitle="Все счётчики газа"
      />
    </div>
  );
}
