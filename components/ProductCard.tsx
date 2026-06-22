"use client";

import Link from "next/link";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { CartQuantityControl } from "@/components/CartQuantityControl";
import { FavoriteButton } from "@/components/FavoriteButton";
import { getProductPriceLabel, isFromPriceProduct } from "@/lib/product-price-label";
import { getProductListingTitle } from "@/lib/product-listing-title";
import { shouldHideProductCardDescription } from "@/lib/rasko-accessories";

export type CatalogProduct = {
  id: string;
  title: string;
  slug: string;
  description: string;
  kind: string;
  price: number;
  unit: string;
  imageUrl: string | null;
  inStock?: boolean;
  specs?: Record<string, string>;
};

function excerpt(text: string, max = 96) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max).trim()}…`;
}

export function ProductCard({ product }: { product: CatalogProduct }) {
  const [imageSrc, setImageSrc] = useState(product.imageUrl || "/placeholder-product.jpg");

  useEffect(() => {
    setImageSrc(product.imageUrl || "/placeholder-product.jpg");
  }, [product.id, product.imageUrl]);

  const cartProduct = {
    id: product.id,
    title: product.title,
    price: product.price,
    unit: product.unit,
    slug: product.slug,
    imageUrl: product.imageUrl
  };

  const priceLabel = getProductPriceLabel({
    slug: product.slug,
    price: product.price,
    kind: product.kind,
    specs: product.specs
  });
  const showFromPriceStyle = isFromPriceProduct(product.slug, product.kind);
  const listingTitle = getProductListingTitle(product.title, product.specs);

  return (
    <article className="product-card product-card-shop">
      <div className="product-card-media">
        <FavoriteButton productId={product.id} className="product-card-favorite" />
        <Link className="product-card-image-link" href={`/products/${product.slug}`} tabIndex={-1}>
          <img
            src={imageSrc}
            alt={product.title}
            className="product-card-image"
            loading="lazy"
            onError={() => {
              if (imageSrc !== "/placeholder-product.jpg") {
                setImageSrc("/placeholder-product.jpg");
              }
            }}
          />
        </Link>
      </div>

      <div className="product-card-body">
        <h3 className="product-card-title">
          <Link href={`/products/${product.slug}`}>{listingTitle}</Link>
        </h3>
        {product.description && !shouldHideProductCardDescription(product.slug) ? (
          <p className="product-card-desc muted">{excerpt(product.description)}</p>
        ) : null}

        <div className="product-card-price-row">
          <span className={clsx("product-card-price", showFromPriceStyle && "product-card-price-from")}>
            {priceLabel}
          </span>
          <span className="product-card-unit muted">/ {product.unit}</span>
        </div>

        <div className="product-card-actions">
          <CartQuantityControl product={cartProduct} compact block />
        </div>
      </div>
    </article>
  );
}
