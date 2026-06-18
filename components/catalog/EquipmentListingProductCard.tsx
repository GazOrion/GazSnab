"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { CartQuantityControl } from "@/components/CartQuantityControl";
import { getProductPriceLabel } from "@/lib/product-price-label";
import { getProductListingTitle } from "@/lib/product-listing-title";
import { shouldHideProductCardDescription } from "@/lib/rasko-accessories";
import type { CatalogProduct } from "@/components/ProductCard";

function normalizeDescription(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function excerpt(text: string, max = 88) {
  const clean = normalizeDescription(text);
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max).trim()}…`;
}

function descriptionLines(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

type Props = {
  product: CatalogProduct;
  layout?: "grid" | "list";
};

export function EquipmentListingProductCard({ product, layout = "grid" }: Props) {
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

  const inStock = product.inStock !== false;
  const listingTitle = getProductListingTitle(product.title, product.specs);
  const priceText = getProductPriceLabel({
    slug: product.slug,
    price: product.price,
    kind: product.kind,
    specs: product.specs
  });

  return (
    <article className="store-equipment-listing-card">
      <Link
        className="store-equipment-listing-card__media"
        href={`/products/${product.slug}`}
        tabIndex={-1}
      >
        <img
          src={imageSrc}
          alt=""
          className="store-equipment-listing-card__img"
          loading="lazy"
          onError={() => {
            if (imageSrc !== "/placeholder-product.jpg") {
              setImageSrc("/placeholder-product.jpg");
            }
          }}
        />
      </Link>

      <div className="store-equipment-listing-card__body">
        <h3 className="store-equipment-listing-card__title">
          <Link href={`/products/${product.slug}`}>{listingTitle}</Link>
        </h3>
        {product.description && !shouldHideProductCardDescription(product.slug) ? (
          descriptionLines(product.description).length > 1 ? (
            <ul className="store-equipment-listing-card__desc store-equipment-listing-card__desc-list">
              {descriptionLines(product.description).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : (
            <p className="store-equipment-listing-card__desc">
              {layout === "list"
                ? normalizeDescription(product.description)
                : excerpt(product.description)}
            </p>
          )
        ) : null}

        {inStock ? (
          <p className="store-equipment-listing-card__stock">
            <span className="store-equipment-listing-card__stock-icon" aria-hidden>
              <Check size={10} strokeWidth={3} />
            </span>
            В наличии
          </p>
        ) : null}

        <div className="store-equipment-listing-card__footer">
          <p className="store-equipment-listing-card__price">{priceText}</p>
          <CartQuantityControl product={cartProduct} variant="equipment" />
        </div>
      </div>
    </article>
  );
}
