"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { CatalogProduct } from "@/components/ProductCard";
import { CatalogLayoutToggle } from "@/components/catalog/CatalogLayoutToggle";
import { EquipmentListingProductCard } from "@/components/catalog/EquipmentListingProductCard";
import type { ListingLayoutMode } from "@/components/catalog/EquipmentCategoryListingToolbar";
import { useFavorites } from "@/components/FavoritesProvider";
import { CATALOG_ROUTES } from "@/lib/catalog";

function productCountLabel(count: number) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return "позиция";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "позиции";
  return "позиций";
}

export function FavoritesPageClient() {
  const { slugs, pruneSlugs } = useFavorites();
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState<ListingLayoutMode>("grid");

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      setLayout("list");
    }
  }, []);

  useEffect(() => {
    if (!slugs.length) {
      setProducts([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetch(`/api/products/by-slugs?slugs=${encodeURIComponent(slugs.join(","))}`)
      .then((response) => response.json())
      .then((data: CatalogProduct[]) => {
        if (!cancelled) {
          const order = new Map(slugs.map((slug, index) => [slug, index]));
          const sorted = [...data].sort(
            (a, b) => (order.get(a.slug) ?? 0) - (order.get(b.slug) ?? 0)
          );
          setProducts(sorted);
          const resolvedSlugs = sorted.map((product) => product.slug);
          if (resolvedSlugs.length !== slugs.length) {
            pruneSlugs(resolvedSlugs);
          }
        }
      })
      .catch(() => {
        if (!cancelled) setProducts([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slugs, pruneSlugs]);

  return (
    <section className="section cart-page-v2 store-favorites-page">
      <div className="container">
        <nav className="breadcrumbs" aria-label="Хлебные крошки">
          <Link href="/">Главная</Link>
          <span aria-hidden>/</span>
          <span>Избранное</span>
        </nav>
        <h1 className="cart-page-title">Избранное</h1>

        {loading ? (
          <p className="muted">Загрузка…</p>
        ) : products.length === 0 ? (
          <p className="catalog-empty muted">
            Список пуст. <Link href={CATALOG_ROUTES.equipment}>Перейти в каталог</Link>
          </p>
        ) : (
          <>
            <div className="store-favorites-toolbar" aria-label="Вид списка избранного">
              <p className="store-favorites-toolbar__count">
                {products.length} {productCountLabel(products.length)}
              </p>
              <CatalogLayoutToggle layout={layout} onLayoutChange={setLayout} />
            </div>

            <div
              className={clsx(
                "store-equipment-listing-grid store-favorites-page__grid",
                layout === "list" && "store-equipment-listing-grid--list"
              )}
            >
              {products.map((product) => (
                <EquipmentListingProductCard
                  key={product.id}
                  product={product}
                  layout={layout}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
