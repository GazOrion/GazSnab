import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CatalogDbError } from "@/components/home/CatalogDbError";
import { CatalogSection } from "@/components/home/CatalogSection";
import { ShopPageShell } from "@/components/ShopPageShell";
import { SiteFooter } from "@/components/SiteFooter";
import { CATALOG_SECTION, PRODUCT_KIND, catalogPath } from "@/lib/catalog";
import { getServiceCategoryBySlug } from "@/lib/catalog-slugs";
import { loadHomeCatalogData } from "@/lib/catalog-data";
import { buildPageMetadata } from "@/lib/site-seo";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const categoryName = getServiceCategoryBySlug(categorySlug);
  if (!categoryName) {
    return {};
  }

  return buildPageMetadata(catalogPath({ kind: PRODUCT_KIND.SERVICE, category: categoryName }));
}

export default async function ServicesCategoryPage({ params }: Props) {
  const { category: categorySlug } = await params;
  const categoryName = getServiceCategoryBySlug(categorySlug);
  if (!categoryName) {
    notFound();
  }

  let catalogData;
  try {
    catalogData = await loadHomeCatalogData({
      services: { category: categoryName }
    });
  } catch (error) {
    console.error("[uslugi/category] catalog load failed:", error);
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
              id={CATALOG_SECTION.services}
              title="Услуги"
              description="позиций — добавьте услугу в заявку"
              products={catalogData.services}
              categories={catalogData.serviceCategories}
              clusters={catalogData.serviceClusters}
              hubClusters={catalogData.serviceHubClusters}
              clusterHub
              fixedKind={PRODUCT_KIND.SERVICE}
              variant="services"
            />
          </Suspense>
        )}
      </div>
      <SiteFooter />
    </ShopPageShell>
  );
}
