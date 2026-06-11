"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { QuantityStepper } from "@/components/QuantityStepper";
import { formatArticle } from "@/lib/cart-display";
import type { CartProduct } from "@/components/CartProvider";
import { AnimatedPrice } from "./AnimatedPrice";

export type CartLineItem = CartProduct & { quantity: number };

type Props = {
  item: CartLineItem;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
  disabled?: boolean;
};

export function CartItemRow({ item, onQuantityChange, onRemove, disabled }: Props) {
  const lineTotal = item.price * item.quantity;
  const imageSrc = item.imageUrl || "/placeholder-product.jpg";
  const article = formatArticle(item.slug, item.id);
  const productHref = item.slug ? `/products/${item.slug}` : "/";

  return (
    <li className="cart-row">
      <Link className="cart-row-thumb" href={productHref} tabIndex={-1} aria-hidden>
        <img src={imageSrc} alt="" className="cart-row-img" />
      </Link>

      <div className="cart-row-body">
        <Link className="cart-row-title" href={productHref}>
          {item.title}
        </Link>
        <p className="cart-row-sku">Артикул: {article}</p>
        <span className="cart-row-unit-badge">{item.unit}</span>
      </div>

      <div className="cart-row-actions">
        <AnimatedPrice value={lineTotal} className="cart-row-sum" />
        <QuantityStepper
          quantity={item.quantity}
          variant="accent"
          disabled={disabled}
          onChange={onQuantityChange}
        />
        <button
          type="button"
          className="cart-row-delete"
          aria-label={`Удалить ${item.title}`}
          disabled={disabled}
          onClick={onRemove}
        >
          <Trash2 size={18} aria-hidden />
        </button>
      </div>
    </li>
  );
}
