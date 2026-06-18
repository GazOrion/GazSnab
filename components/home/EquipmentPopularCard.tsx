"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { CartQuantityControl } from "@/components/CartQuantityControl";
import type { CatalogProduct } from "@/components/ProductCard";
import { POPULAR_CARD_COVER_IMAGE_SLUGS } from "@/lib/catalog-data";
import { getProductPriceLabel } from "@/lib/product-price-label";
import { getProductListingTitle } from "@/lib/product-listing-title";

type Props = {
  product: CatalogProduct;
};

export function EquipmentPopularCard({ product }: Props) {
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

  const isService = product.kind === "Услуга";
  const priceLabel = getProductPriceLabel({
    slug: product.slug,
    price: product.price,
    kind: product.kind,
    specs: product.specs
  });
  const coverImage = POPULAR_CARD_COVER_IMAGE_SLUGS.has(product.slug);
  const listingTitle = getProductListingTitle(product.title, product.specs);

  return (
    <article
      className={
        isService
          ? "store-equipment-popular-card store-equipment-popular-card--service"
          : "store-equipment-popular-card"
      }
    >
      {!isService ? (
        <p className="store-equipment-popular-card__stock">
          <span className="store-equipment-popular-card__stock-icon" aria-hidden>
            <Check size={10} strokeWidth={3} />
          </span>
          <span className="store-equipment-popular-card__stock-label">В наличии</span>
        </p>
      ) : null}

      <Link className="store-equipment-popular-card__media" href={`/products/${product.slug}`} tabIndex={-1}>
        <img
          src={imageSrc}
          alt=""
          className={
            coverImage
              ? "store-equipment-popular-card__img store-equipment-popular-card__img--cover"
              : "store-equipment-popular-card__img"
          }
          loading="lazy"
          onError={() => {
            if (imageSrc !== "/placeholder-product.jpg") {
              setImageSrc("/placeholder-product.jpg");
            }
          }}
        />
      </Link>

      <div className="store-equipment-popular-card__content">
        <div className="store-equipment-popular-card__body">
          <h3 className="store-equipment-popular-card__title">
            <Link href={`/products/${product.slug}`}>{listingTitle}</Link>
          </h3>
          <p className="store-equipment-popular-card__price">{priceLabel}</p>
        </div>

        <div className="store-equipment-popular-card__footer">
          <CartQuantityControl product={cartProduct} variant="equipment" />
        </div>
      </div>
    </article>
  );
}
