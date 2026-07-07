"use client";

import clsx from "clsx";
import { Info } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { CartQuantityControl } from "@/components/CartQuantityControl";
import { FavoriteButton } from "@/components/FavoriteButton";
import { ServiceOrderButton } from "@/components/ServiceOrderButton";
import { PRODUCT_KIND } from "@/lib/catalog";

type Props = {
  kind: string;
  priceLabel: string;
  unit: string;
  leadTime: string;
  product: {
    id: string;
    title: string;
    price: number;
    unit: string;
    slug: string;
    imageUrl: string | null;
  };
};

export function ProductDetailOrderBar({ kind, priceLabel, unit, leadTime, product }: Props) {
  const infoId = useId();
  const infoRef = useRef<HTMLDivElement>(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const isService = kind === PRODUCT_KIND.SERVICE;

  useEffect(() => {
    if (!infoOpen) return;

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (!infoRef.current?.contains(event.target as Node)) {
        setInfoOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [infoOpen]);

  return (
    <div className="product-detail-order-bar">
      <div className="product-detail-order-bar__price" ref={infoRef}>
        <span className="product-detail-order-bar__price-value">{priceLabel}</span>
        <button
          type="button"
          className={clsx(
            "product-detail-order-bar__info",
            infoOpen && "product-detail-order-bar__info--open"
          )}
          aria-expanded={infoOpen}
          aria-controls={infoId}
          aria-label="Единица измерения и срок поставки"
          onClick={() => setInfoOpen((value) => !value)}
        >
          <Info size={18} strokeWidth={2} aria-hidden />
        </button>
        {infoOpen ? (
          <div id={infoId} className="product-detail-order-bar__info-popover" role="region">
            <p>
              <span>Единица</span>
              <strong>{unit}</strong>
            </p>
            <p>
              <span>Срок</span>
              <strong>{leadTime}</strong>
            </p>
          </div>
        ) : null}
      </div>

      <FavoriteButton productSlug={product.slug} className="product-detail-order-bar__favorite" />

      {isService ? (
        <ServiceOrderButton product={{ id: product.id, title: product.title }} variant="detailBar" />
      ) : (
        <CartQuantityControl product={product} variant="detailBar" />
      )}
    </div>
  );
}
