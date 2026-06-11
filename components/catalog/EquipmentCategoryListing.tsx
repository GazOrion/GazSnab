"use client";

import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import type { CatalogProduct } from "@/components/ProductCard";
import { EquipmentCategoryFilters } from "@/components/catalog/EquipmentCategoryFilters";
import { EquipmentCategoryHero } from "@/components/catalog/EquipmentCategoryHero";
import {
  EquipmentCategoryListingToolbar,
  type ListingLayoutMode
} from "@/components/catalog/EquipmentCategoryListingToolbar";
import { EquipmentListingProductCard } from "@/components/catalog/EquipmentListingProductCard";
import type { CategoryBreadcrumb } from "@/components/catalog/EquipmentCategoryHero";
import { CATALOG_ROUTES, clusterPresentation, PRODUCT_KIND } from "@/lib/catalog";
import {
  createEquipmentCategoryFilterState,
  filterEquipmentCategoryProducts,
  getEquipmentCategoryConfig,
  getProductPriceBounds,
  type EquipmentCategoryFilterState
} from "@/lib/equipment-category-config";
import { sortEquipmentProducts } from "@/lib/equipment-catalog";
import { useCatalogNavigation } from "@/hooks/useCatalogNavigation";

const PAGE_SIZE_OPTIONS = [12, 24, 48] as const;

type Props = {
  category: string;
  products: CatalogProduct[];
  bannerSrc: string;
  hideHero?: boolean;
  breadcrumbs?: CategoryBreadcrumb[];
  listingTitle?: string;
  heroTitle?: string;
};

export function EquipmentCategoryListing({
  category,
  products,
  bannerSrc,
  hideHero = false,
  breadcrumbs,
  listingTitle,
  heroTitle
}: Props) {
  const config = getEquipmentCategoryConfig(category);
  const presentation = clusterPresentation(category, PRODUCT_KIND.GOODS);
  const { equipmentSort } = useCatalogNavigation({ fixedKind: PRODUCT_KIND.GOODS });

  const bounds = useMemo(() => getProductPriceBounds(products), [products]);

  const [filters, setFilters] = useState<EquipmentCategoryFilterState>(() =>
    createEquipmentCategoryFilterState(products)
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [layout, setLayout] = useState<ListingLayoutMode>("grid");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZE_OPTIONS)[number]>(12);

  useEffect(() => {
    setFilters(createEquipmentCategoryFilterState(products));
    setPage(1);
  }, [products, category]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, filters, equipmentSort, pageSize]);

  const filteredProducts = useMemo(() => {
    const filtered = filterEquipmentCategoryProducts(products, searchQuery, filters);
    return sortEquipmentProducts(filtered, equipmentSort);
  }, [products, searchQuery, filters, equipmentSort]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function resetFilters() {
    setFilters(createEquipmentCategoryFilterState(products));
    setSearchQuery("");
  }

  const pageNumbers = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }
    const items: (number | "ellipsis")[] = [1];
    if (currentPage > 3) items.push("ellipsis");
    for (
      let value = Math.max(2, currentPage - 1);
      value <= Math.min(totalPages - 1, currentPage + 1);
      value += 1
    ) {
      if (!items.includes(value)) items.push(value);
    }
    if (currentPage < totalPages - 2) items.push("ellipsis");
    if (!items.includes(totalPages)) items.push(totalPages);
    return items;
  }, [currentPage, totalPages]);

  if (!config) return null;

  const heroBreadcrumbs = breadcrumbs ?? [
    { label: "Главная", href: "/" },
    { label: "Каталог", href: CATALOG_ROUTES.equipment },
    { label: presentation.title }
  ];

  return (
    <div className="store-equipment-category-page">
      {!hideHero ? (
        <EquipmentCategoryHero
          bannerSrc={bannerSrc}
          title={heroTitle ?? presentation.title}
          lead={heroTitle ? `Раздел «${presentation.title}»` : presentation.teaser}
          bannerModifier={config.slug}
          breadcrumbs={heroBreadcrumbs}
        />
      ) : null}

      <div className="container store-equipment-category-page__inner">
        {listingTitle ? (
          <header className="store-equipment-category-listing-head">
            <h2 className="store-equipment-category-listing-head__title">{listingTitle}</h2>
          </header>
        ) : null}
        <div className="store-equipment-category-layout">
          <EquipmentCategoryFilters
            products={products}
            filters={filters}
            bounds={bounds}
            config={config}
            onChange={setFilters}
            onReset={resetFilters}
          />

          <div className="store-equipment-category-main">
            <EquipmentCategoryListingToolbar
              totalCount={products.length}
              filteredCount={filteredProducts.length}
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
              searchPlaceholder={config.searchPlaceholder}
              layout={layout}
              onLayoutChange={setLayout}
            />

            {pageProducts.length === 0 ? (
              <p className="catalog-empty muted">
                По вашему запросу ничего не найдено.{" "}
                <button type="button" className="catalog-empty-action" onClick={resetFilters}>
                  Сбросить фильтры
                </button>
              </p>
            ) : (
              <div
                className={clsx(
                  "store-equipment-listing-grid",
                  layout === "list" && "store-equipment-listing-grid--list"
                )}
              >
                {pageProducts.map((product) => (
                  <EquipmentListingProductCard key={product.id} product={product} layout={layout} />
                ))}
              </div>
            )}

            {filteredProducts.length > 0 ? (
              <nav className="store-equipment-listing-pagination" aria-label="Страницы каталога">
                <div className="store-equipment-listing-pagination__pages">
                  {pageNumbers.map((item, index) =>
                    item === "ellipsis" ? (
                      <span
                        key={`ellipsis-${index}`}
                        className="store-equipment-listing-pagination__ellipsis"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={item}
                        type="button"
                        className={clsx(
                          "store-equipment-listing-pagination__page",
                          item === currentPage && "is-active"
                        )}
                        onClick={() => setPage(item)}
                        aria-current={item === currentPage ? "page" : undefined}
                      >
                        {item}
                      </button>
                    )
                  )}
                  <button
                    type="button"
                    className="store-equipment-listing-pagination__next"
                    disabled={currentPage >= totalPages}
                    onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                    aria-label="Следующая страница"
                  >
                    ›
                  </button>
                </div>

                <label className="store-equipment-listing-pagination__size">
                  <span>Показывать по:</span>
                  <select
                    value={pageSize}
                    onChange={(event) =>
                      setPageSize(Number(event.target.value) as (typeof PAGE_SIZE_OPTIONS)[number])
                    }
                  >
                    {PAGE_SIZE_OPTIONS.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </label>
              </nav>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
