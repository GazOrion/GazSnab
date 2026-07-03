import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { CatalogDbError } from "@/components/home/CatalogDbError";
import { CatalogSection } from "@/components/home/CatalogSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  CATALOG_FILTER_PARAMS,
  CATALOG_ROUTES,
  CATALOG_SECTION,
  PRODUCT_KIND,
  SERVICE_CATEGORY_METAL
} from "@/lib/catalog";
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
  return buildPageMetadataFromRequest(CATALOG_ROUTES.services, params);
}

type Props = {
  searchParams: Promise<{
    services_category?: string;
    services_list?: string;
  }>;
};

export default async function ServicesPage({ searchParams }: Props) {
  const params = await searchParams;

  if (params[CATALOG_FILTER_PARAMS.services.category] === SERVICE_CATEGORY_METAL) {
    redirect(CATALOG_ROUTES.services);
  }

  const listAll = params[CATALOG_FILTER_PARAMS.services.list] === "1";

  let catalogData;
  try {
    catalogData = await loadHomeCatalogData({
      services: listAll
        ? {}
        : {
            category: params[CATALOG_FILTER_PARAMS.services.category]
          }
    });
  } catch (error) {
    console.error("[uslugi] catalog load failed:", error);
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
    </main>
  );
}
