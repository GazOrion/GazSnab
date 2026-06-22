"use client";

import { Suspense, useMemo } from "react";
import clsx from "clsx";
import { ChevronLeft } from "lucide-react";
import type { CatalogProduct } from "@/components/ProductCard";
import { CatalogHubHero } from "@/components/catalog/CatalogHubHero";
import { EquipmentCatalogHero } from "@/components/catalog/EquipmentCatalogHero";
import { EquipmentCategoryGrid } from "@/components/catalog/EquipmentCategoryGrid";
import { EquipmentCategoryListing } from "@/components/catalog/EquipmentCategoryListing";
import { EquipmentListingProductCard } from "@/components/catalog/EquipmentListingProductCard";
import { GasMetersCategoryLanding } from "@/components/catalog/GasMetersCategoryLanding";
import { PumpsCategoryLanding } from "@/components/catalog/PumpsCategoryLanding";
import {
  filterGasMeterProducts,
  gasMetersSubcategoryBreadcrumbs,
  getGasMeterSubcategoryListingTitle
} from "@/lib/gas-meters-catalog";
import {
  filterPumpProducts,
  getPumpSubcategoryListingTitle,
  pumpsSubcategoryBreadcrumbs
} from "@/lib/pumps-catalog";
import {
  GAS_METERS_CATEGORY,
  PUMPS_CATEGORY,
  getEquipmentCategoryConfig
} from "@/lib/equipment-category-config";
import type { CategoryCluster } from "@/lib/catalog-data";
import {
  clusterPresentation,
  EQUIPMENT_CLUSTER_ORDER,
  PRODUCT_KIND,
  resolveEquipmentClusterImage,
  SERVICE_CLUSTER_ORDER,
  sortClusters,
  catalogBlockFromKind,
  type ProductKind
} from "@/lib/catalog";
import { sortEquipmentClusters, sortEquipmentProducts } from "@/lib/equipment-catalog";
import { useCatalogSearch } from "@/contexts/CatalogSearchContext";
import { useCatalogNavigation } from "@/hooks/useCatalogNavigation";
import { CatalogClusterGrid } from "./CatalogClusterGrid";
import { HomeCatalogToolbar } from "./HomeCatalogToolbar";
import { ProductGrid } from "./ProductGrid";

function ToolbarFallback() {
  return <div className="store-catalog-toolbar store-catalog-toolbar-skeleton" aria-hidden />;
}

function filterByQuery(products: CatalogProduct[], query: string) {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return products;
  return products.filter(
    (product) =>
      product.title.toLowerCase().includes(trimmed) ||
      product.description.toLowerCase().includes(trimmed)
  );
}

type Props = {
  id: string;
  title: string;
  description: string;
  pageLead?: string;
  products: CatalogProduct[];
  categories: string[];
  clusters?: CategoryCluster[];
  hubClusters?: CategoryCluster[];
  clusterHub?: boolean;
  fixedKind?: ProductKind;
  showKindSwitch?: boolean;
  variant?: "default" | "equipment" | "services";
  catalogBannerSrc?: string;
  equipmentCategoryBanners?: Record<string, string>;
};

function CatalogSectionInner({
  id,
  title,
  description,
  pageLead,
  products,
  categories,
  clusters = [],
  hubClusters,
  clusterHub = false,
  fixedKind,
  showKindSwitch = false,
  variant = "default",
  catalogBannerSrc,
  equipmentCategoryBanners = {}
}: Props) {
  const block = catalogBlockFromKind(fixedKind);
  const { getQuery, setBlockQuery, clearBlockQuery } = useCatalogSearch();
  const searchQ = block ? getQuery(block) : "";

  const {
    category,
    listView,
    equipmentSort,
    subcategory,
    clearAll: clearCategoryFilters
  } = useCatalogNavigation({
    fixedKind
  });

  const inCategoryView = Boolean(category || listView);
  const onHubPage = clusterHub && !inCategoryView;
  const isEquipmentHub = variant === "equipment" && onHubPage;
  const isServicesHub = variant === "services" && onHubPage;
  const isCatalogHub = isEquipmentHub || isServicesHub;
  const categoryBannerSrc = category ? equipmentCategoryBanners[category] : undefined;
  const isGasMetersCategoryView =
    variant === "equipment" && inCategoryView && category === GAS_METERS_CATEGORY;
  const isPumpsCategoryView =
    variant === "equipment" && inCategoryView && category === PUMPS_CATEGORY;
  const gasMetersBannerSrc =
    categoryBannerSrc ?? "/media/gas-meters-banner.webp";
  const pumpsBannerSrc = categoryBannerSrc ?? "/media/pumps-banner.webp";
  const equipmentCategoryConfig =
    category && variant === "equipment" ? getEquipmentCategoryConfig(category) : null;
  const isGasMetersLanding = isGasMetersCategoryView && !subcategory;
  const isPumpsLanding = isPumpsCategoryView && !subcategory;
  const usesDedicatedCategoryPage =
    isGasMetersCategoryView || isPumpsCategoryView
      ? true
      : variant === "equipment" && inCategoryView && Boolean(equipmentCategoryConfig);

  const isEquipmentCategoryListing =
    usesDedicatedCategoryPage && !isGasMetersLanding && !isPumpsLanding;

  const resolvedEquipmentCategoryBannerSrc =
    category && equipmentCategoryConfig
      ? category === GAS_METERS_CATEGORY
        ? gasMetersBannerSrc
        : category === PUMPS_CATEGORY
          ? pumpsBannerSrc
          : categoryBannerSrc ??
            resolveEquipmentClusterImage(category, null) ??
            catalogBannerSrc
      : undefined;

  const usesEquipmentListingCards =
    variant === "equipment" && inCategoryView && Boolean(equipmentCategoryConfig);

  const hubSource = hubClusters?.length ? hubClusters : clusters;

  const sortedClusters = useMemo(() => {
    if (!fixedKind || hubSource.length === 0) return hubSource;
    if (variant === "equipment") {
      return sortEquipmentClusters(hubSource, equipmentSort);
    }
    const order =
      fixedKind === PRODUCT_KIND.GOODS ? EQUIPMENT_CLUSTER_ORDER : SERVICE_CLUSTER_ORDER;
    return sortClusters(hubSource, order);
  }, [hubSource, equipmentSort, fixedKind, variant]);

  const filteredProducts = useMemo(() => {
    let list = inCategoryView ? products : filterByQuery(products, searchQ);
    if (variant === "equipment") {
      list = sortEquipmentProducts(list, equipmentSort);
    }
    return list;
  }, [products, searchQ, inCategoryView, variant, equipmentSort]);

  const showClusterButtons =
    onHubPage && sortedClusters.length > 0 && !searchQ.trim();

  const showHubSearchResults = onHubPage && Boolean(searchQ.trim());

  const activePresentation = category && fixedKind ? clusterPresentation(category, fixedKind) : null;

  const hasHubFilters = Boolean(searchQ.trim());
  const hasListingFilters = Boolean(category || listView);

  function clearHubSearch() {
    if (block) clearBlockQuery(block);
  }

  function clearAll() {
    if (block) clearBlockQuery(block);
    clearCategoryFilters();
  }

  function backToClusters() {
    if (block) clearBlockQuery(block);
    clearCategoryFilters();
  }

  return (
    <section
      className={clsx(
        `store-catalog store-catalog-${variant}`,
        usesDedicatedCategoryPage && "store-catalog-equipment-category",
        usesEquipmentListingCards && "store-catalog-equipment-category",
        isServicesHub && "store-catalog-services-hub"
      )}
      id={id}
      aria-labelledby={
        isCatalogHub
          ? isEquipmentHub
            ? "equipment-catalog-title"
            : "services-catalog-title"
          : usesDedicatedCategoryPage
            ? undefined
            : `${id}-title`
      }
    >
      {isGasMetersLanding ? (
        <GasMetersCategoryLanding products={products} bannerSrc={gasMetersBannerSrc} />
      ) : null}

      {isPumpsLanding ? (
        <PumpsCategoryLanding products={products} bannerSrc={pumpsBannerSrc} />
      ) : null}

      {isEquipmentCategoryListing && category ? (
        <EquipmentCategoryListing
          category={category}
          products={
            category === GAS_METERS_CATEGORY && subcategory
              ? filterGasMeterProducts(products, subcategory)
              : category === PUMPS_CATEGORY && subcategory
                ? filterPumpProducts(products, subcategory)
                : products
          }
          bannerSrc={resolvedEquipmentCategoryBannerSrc ?? catalogBannerSrc ?? "/media/catalog-banner.webp"}
          breadcrumbs={
            category === GAS_METERS_CATEGORY && subcategory
              ? gasMetersSubcategoryBreadcrumbs(subcategory)
              : category === PUMPS_CATEGORY && subcategory
                ? pumpsSubcategoryBreadcrumbs(subcategory)
                : undefined
          }
          listingTitle={
            category === GAS_METERS_CATEGORY && subcategory
              ? getGasMeterSubcategoryListingTitle(subcategory)
              : category === PUMPS_CATEGORY && subcategory
                ? getPumpSubcategoryListingTitle(subcategory)
                : undefined
          }
          heroSubtitle={
            category === GAS_METERS_CATEGORY && subcategory ? subcategory : undefined
          }
        />
      ) : null}

      {isEquipmentHub && catalogBannerSrc ? (
        <EquipmentCatalogHero bannerSrc={catalogBannerSrc} />
      ) : null}

      {isServicesHub && catalogBannerSrc ? (
        <CatalogHubHero
          bannerSrc={catalogBannerSrc}
          title="Услуги"
          lead={
            pageLead ??
            "Металлообработка, проектирование и сервисное обслуживение для промышленных объектов"
          }
          titleId="services-catalog-title"
          breadcrumbCurrent="Услуги"
          bannerClassName="store-equipment-catalog-hero__banner--services"
        />
      ) : null}

      {!usesDedicatedCategoryPage ? (
      <div className="container store-catalog-inner">
        {!isCatalogHub ? (
          <header className="store-section-head store-cluster-hub-head">
            <div>
              <h1 id={`${id}-title`}>{title}</h1>
              <p className="muted">
                {showClusterButtons
                  ? pageLead ??
                    (fixedKind === PRODUCT_KIND.GOODS
                      ? "Выберите раздел — откроются карточки с фото, ценой, корзиной и избранным"
                      : "Выберите направление — затем карточку услуги для заявки")
                  : showHubSearchResults
                    ? filteredProducts.length
                      ? `Найдено ${filteredProducts.length} ${description}`
                      : "Ничего не найдено — измените запрос или сбросьте поиск"
                    : activePresentation
                      ? activePresentation.teaser
                      : filteredProducts.length
                        ? `${filteredProducts.length} ${description}`
                        : "Подходящих позиций не найдено — измените фильтры"}
              </p>
            </div>
          </header>
        ) : null}

        {onHubPage ? (
          <>
            {!isCatalogHub ? (
              <Suspense fallback={<ToolbarFallback />}>
                <HomeCatalogToolbar
                  categories={categories}
                  fixedKind={fixedKind}
                  showKindSwitch={showKindSwitch}
                  showSearch
                  showCategories={false}
                  searchQuery={searchQ}
                  onSearchQueryChange={(next) => block && setBlockQuery(block, next)}
                  hasFilters={hasHubFilters}
                  onClear={clearHubSearch}
                />
              </Suspense>
            ) : null}

            {showClusterButtons ? (
              variant === "equipment" || variant === "services" ? (
                <EquipmentCategoryGrid clusters={sortedClusters} kind={fixedKind!} />
              ) : (
                <CatalogClusterGrid clusters={sortedClusters} kind={fixedKind!} />
              )
            ) : showHubSearchResults ? (
              filteredProducts.length === 0 ? (
                <p className="catalog-empty muted">
                  Измените запрос или{" "}
                  <button type="button" className="catalog-empty-action" onClick={clearHubSearch}>
                    сбросьте поиск
                  </button>
                  .
                </p>
              ) : (
                <ProductGrid products={filteredProducts} />
              )
            ) : null}
          </>
        ) : (
          <>
            {clusterHub && sortedClusters.length > 0 ? (
              <nav className="store-catalog-breadcrumb" aria-label="Навигация по каталогу">
                <button type="button" className="store-catalog-back" onClick={backToClusters}>
                  <ChevronLeft size={18} aria-hidden />
                  Все разделы
                </button>
                {activePresentation ? (
                  <span className="store-catalog-breadcrumb-current">
                    {activePresentation.title}
                  </span>
                ) : listView ? (
                  <span className="store-catalog-breadcrumb-current">Все позиции</span>
                ) : null}
              </nav>
            ) : null}

            {!clusterHub ? (
              <Suspense fallback={<ToolbarFallback />}>
                <HomeCatalogToolbar
                  categories={categories}
                  fixedKind={fixedKind}
                  showKindSwitch={showKindSwitch}
                  showSearch
                  searchQuery={searchQ}
                  onSearchQueryChange={(next) => block && setBlockQuery(block, next)}
                  category={category}
                  hasFilters={hasListingFilters || hasHubFilters}
                  onClear={clearAll}
                />
              </Suspense>
            ) : (
              <Suspense fallback={<ToolbarFallback />}>
                <HomeCatalogToolbar
                  categories={categories}
                  fixedKind={fixedKind}
                  showKindSwitch={showKindSwitch}
                  showSearch={false}
                  showCategories
                  searchQuery=""
                  onSearchQueryChange={() => undefined}
                  category={category}
                  hasFilters={hasListingFilters}
                  onClear={clearAll}
                  onBackToClusters={sortedClusters.length > 0 ? backToClusters : undefined}
                />
              </Suspense>
            )}

            {filteredProducts.length === 0 ? (
              <p className="catalog-empty muted">
                В этом разделе пока нет позиций.
              </p>
            ) : usesEquipmentListingCards ? (
              <div className="store-equipment-listing-grid">
                {filteredProducts.map((product) => (
                  <EquipmentListingProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <ProductGrid products={filteredProducts} />
            )}
          </>
        )}
      </div>
      ) : null}
    </section>
  );
}

export function CatalogSectionClient(props: Props) {
  return (
    <Suspense fallback={null}>
      <CatalogSectionInner {...props} />
    </Suspense>
  );
}
