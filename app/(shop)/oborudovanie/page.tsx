import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { CatalogDbError } from "@/components/home/CatalogDbError";
import { CatalogSection } from "@/components/home/CatalogSection";
import { ShopPageShell } from "@/components/ShopPageShell";
import { SiteFooter } from "@/components/SiteFooter";
import { CATALOG_FILTER_PARAMS, CATALOG_ROUTES, CATALOG_SECTION, PRODUCT_KIND } from "@/lib/catalog";
import { isRemovedEquipmentCategory, normalizeEquipmentCategory } from "@/lib/equipment-category-config";
import { loadHomeCatalogData } from "@/lib/catalog-data";

import { buildPageMetadataFromRequest } from "@/lib/site-seo";

export const dynamic = "force-dynamic";

type SearchParams = Record<string, string | string[] | undefined>;

export async function generateMetadata({
  searchParams
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const params = await searchParams;
  return buildPageMetadataFromRequest(CATALOG_ROUTES.equipment, params);
}

type Props = {
  searchParams: Promise<{
    equipment_category?: string;
    equipment_list?: string;
  }>;
};

export default async function EquipmentPage({ searchParams }: Props) {
  const params = await searchParams;
  const rawCategory = params[CATALOG_FILTER_PARAMS.equipment.category];

  if (rawCategory && isRemovedEquipmentCategory(rawCategory)) {
    redirect(CATALOG_ROUTES.equipment);
  }

  const category = rawCategory ? normalizeEquipmentCategory(rawCategory) : undefined;

  if (rawCategory && category && rawCategory !== category) {
    redirect(`${CATALOG_ROUTES.equipment}?${CATALOG_FILTER_PARAMS.equipment.category}=${encodeURIComponent(category)}`);
  }

  const listAll = params[CATALOG_FILTER_PARAMS.equipment.list] === "1";

  let catalogData;
  try {
    catalogData = await loadHomeCatalogData({
      goods: listAll
        ? {}
        : {
            category
          }
    });
  } catch (error) {
    console.error("[oborudovanie] catalog load failed:", error);
    catalogData = null;
  }

  return (
    <ShopPageShell className="site-shell site-shell-shop store-catalog-page">
      <div className="store-page-section">
        {!catalogData ? (
          <CatalogDbError />
        ) : (
          <Suspense fallback={null}>
            <CatalogSection
              id={CATALOG_SECTION.equipment}
              title="Каталог оборудования"
              description="позиций — оформите заявку из корзины"
              products={catalogData.goods}
              categories={catalogData.goodsCategories}
              clusters={catalogData.goodsClusters}
              hubClusters={catalogData.equipmentHubClusters}
              clusterHub
              fixedKind={PRODUCT_KIND.GOODS}
              variant="equipment"
            />
          </Suspense>
        )}
      </div>
      <SiteFooter />
    </ShopPageShell>
  );
}
