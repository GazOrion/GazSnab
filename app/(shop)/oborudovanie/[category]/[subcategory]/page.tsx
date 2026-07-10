import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CatalogDbError } from "@/components/home/CatalogDbError";
import { CatalogSection } from "@/components/home/CatalogSection";
import { ShopPageShell } from "@/components/ShopPageShell";
import { SiteFooter } from "@/components/SiteFooter";
import { CATALOG_SECTION, PRODUCT_KIND, catalogPath } from "@/lib/catalog";
import {
  getEquipmentCategoryBySlug,
  getEquipmentSubcategoryBySlug
} from "@/lib/catalog-slugs";
import { loadHomeCatalogData } from "@/lib/catalog-data";
import { buildPageMetadata } from "@/lib/site-seo";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;
  const categoryName = getEquipmentCategoryBySlug(categorySlug);
  const subcategoryName =
    categoryName && getEquipmentSubcategoryBySlug(categoryName, subcategorySlug);
  if (!categoryName || !subcategoryName) {
    return {};
  }

  return buildPageMetadata(
    catalogPath({
      kind: PRODUCT_KIND.GOODS,
      category: categoryName,
      subcategory: subcategoryName
    })
  );
}

export default async function EquipmentSubcategoryPage({ params }: Props) {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;
  const categoryName = getEquipmentCategoryBySlug(categorySlug);
  const subcategoryName =
    categoryName && getEquipmentSubcategoryBySlug(categoryName, subcategorySlug);

  if (!categoryName || !subcategoryName) {
    notFound();
  }

  let catalogData;
  try {
    catalogData = await loadHomeCatalogData({
      goods: { category: categoryName }
    });
  } catch (error) {
    console.error("[oborudovanie/category/subcategory] catalog load failed:", error);
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
