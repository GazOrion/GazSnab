import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CatalogDbError } from "@/components/home/CatalogDbError";
import { CatalogSection } from "@/components/home/CatalogSection";
import { ShopPageShell } from "@/components/ShopPageShell";
import { SiteFooter } from "@/components/SiteFooter";
import {
  getEquipmentCategoryBySlug
} from "@/lib/catalog-slugs";
import { loadHomeCatalogData } from "@/lib/catalog-data";
import { buildPageMetadata } from "@/lib/site-seo";
import { catalogPath, CATALOG_SECTION, PRODUCT_KIND } from "@/lib/catalog";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const categoryName = getEquipmentCategoryBySlug(categorySlug);
  if (!categoryName) {
    return {};
  }

  return buildPageMetadata(catalogPath({ kind: PRODUCT_KIND.GOODS, category: categoryName }));
}

export default async function EquipmentCategoryPage({ params }: Props) {
  const { category: categorySlug } = await params;
  const categoryName = getEquipmentCategoryBySlug(categorySlug);
  if (!categoryName) {
    notFound();
  }

  let catalogData;
  try {
    catalogData = await loadHomeCatalogData({
      goods: { category: categoryName }
    });
  } catch (error) {
    console.error("[oborudovanie/category] catalog load failed:", error);
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
