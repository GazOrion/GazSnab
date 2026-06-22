"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { CatalogProduct } from "@/components/ProductCard";
import { ProductCard } from "@/components/ProductCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { useFavorites } from "@/components/FavoritesProvider";
import { CATALOG_ROUTES } from "@/lib/catalog";

export default function FavoritesPage() {
  const { slugs, pruneSlugs } = useFavorites();
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);

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

  const visibleCount = loading ? slugs.length : products.length;

  return (
    <main className="site-shell site-shell-shop">
      <SiteHeader />
      <section className="store-page-section">
        <div className="container">
          <header className="store-section-head">
            <div>
              <h1>Избранное</h1>
              <p className="muted">
                {visibleCount
                  ? `${visibleCount} позиций в списке — добавьте в корзину и оформите заявку`
                  : "Добавляйте товары и услуги в избранное с карточки каталога"}
              </p>
            </div>
          </header>

          {loading ? (
            <p className="muted">Загрузка…</p>
          ) : products.length === 0 ? (
            <p className="catalog-empty muted">
              Список пуст. <Link href={CATALOG_ROUTES.equipment}>Перейти в каталог</Link>
            </p>
          ) : (
            <div className="product-grid store-product-grid">
              {products.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          )}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
