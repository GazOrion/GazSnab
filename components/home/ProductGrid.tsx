"use client";

import { useEffect, useState } from "react";
import { ProductCard, type CatalogProduct } from "@/components/ProductCard";

const PAGE_SIZE = 8;

type Props = {
  products: CatalogProduct[];
};

export function ProductGrid({ products }: Props) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [products]);

  const visible = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  if (!products.length) {
    return null;
  }

  return (
    <>
      <div className="product-grid store-product-grid">
        {visible.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>

      {hasMore ? (
        <div className="store-catalog-more">
          <button
            type="button"
            className="button secondary store-load-more"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
          >
            Показать ещё ({products.length - visibleCount})
          </button>
        </div>
      ) : products.length > PAGE_SIZE ? (
        <p className="muted store-catalog-end">Показаны все {products.length} позиций</p>
      ) : null}
    </>
  );
}
