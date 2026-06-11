"use client";

import { ShoppingCart } from "lucide-react";
import { QuantityStepper } from "@/components/QuantityStepper";
import { useCart, type CartProduct } from "./CartProvider";

type Props = {
  product: CartProduct;
  /** Компактный вид для карточки каталога */
  compact?: boolean;
  /** На всю ширину карточки */
  block?: boolean;
  /** Оранжевая иконка корзины (карточки каталога оборудования) */
  variant?: "default" | "equipment" | "accent";
};

export function CartQuantityControl({ product, compact, block, variant = "default" }: Props) {
  const { getQuantity, addItem, updateQuantity } = useCart();
  const quantity = getQuantity(product.id);

  if (quantity === 0) {
    if (variant === "equipment") {
      return (
        <button
          type="button"
          className="store-equipment-popular-card__cart"
          aria-label={`Добавить ${product.title} в корзину`}
          onClick={() => addItem(product)}
        >
          <ShoppingCart size={20} strokeWidth={2} aria-hidden />
        </button>
      );
    }

    const addClassName = compact
      ? `button card-add-btn${block ? " card-add-btn-block" : ""}`
      : variant === "accent"
        ? "button yellow"
        : "button";

    return (
      <button type="button" className={addClassName} onClick={() => addItem(product)}>
        В корзину
      </button>
    );
  }

  const stepperVariant =
    variant === "equipment" || variant === "accent"
      ? variant
      : compact
        ? "compact"
        : "default";

  return (
    <QuantityStepper
      quantity={quantity}
      variant={stepperVariant}
      onChange={(next) => updateQuantity(product.id, next)}
    />
  );
}
