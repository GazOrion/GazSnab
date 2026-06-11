import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogDbError } from "@/components/home/CatalogDbError";
import { CatalogSection } from "@/components/home/CatalogSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { CATALOG_FILTER_PARAMS, CATALOG_SECTION, PRODUCT_KIND } from "@/lib/catalog";
import { loadHomeCatalogData } from "@/lib/catalog-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Каталог оборудования | ОРИОН ГАЗСНАБ",
  description: "Готовое газовое оборудование — ГРПШ, узлы учёта, счётчики, арматура"
};

type Props = {
  searchParams: Promise<{
    equipment_category?: string;
    equipment_list?: string;
  }>;
};

export default async function EquipmentPage({ searchParams }: Props) {
  const params = await searchParams;
  const listAll = params[CATALOG_FILTER_PARAMS.equipment.list] === "1";

  let catalogData;
  try {
    catalogData = await loadHomeCatalogData({
      goods: listAll
        ? {}
        : {
            category: params[CATALOG_FILTER_PARAMS.equipment.category]
          }
    });
  } catch (error) {
    console.error("[oborudovanie] catalog load failed:", error);
    catalogData = null;
  }

  return (
    <main className="site-shell site-shell-shop store-catalog-page">
      <SiteHeader />
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
    </main>
  );
}
