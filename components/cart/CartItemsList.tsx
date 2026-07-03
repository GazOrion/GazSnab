"use client";

import Link from "next/link";
import { Package, Plus, Shield, Trash2 } from "lucide-react";
import { positionsLabel } from "@/lib/cart-display";
import { CATALOG_ROUTES } from "@/lib/catalog";
import { useCart } from "@/components/CartProvider";
import { AnimatedPrice } from "./AnimatedPrice";
import { CartItemRow } from "./CartItemRow";

type Props = {
  disabled?: boolean;
  onClearCart: () => void;
};

export function CartItemsList({ disabled, onClearCart }: Props) {
  const { items, total, updateQuantity, removeItem } = useCart();
  const lineCount = items.length;

  function handleClearCart() {
    if (!window.confirm("Очистить корзину? Все позиции будут удалены.")) return;
    onClearCart();
  }

  return (
    <article className="cart-card cart-card-items">
      <header className="cart-card-toolbar">
        <p className="cart-card-toolbar-title">
          <Package size={20} aria-hidden />
          <span>{positionsLabel(lineCount)}</span>
        </p>
        <div className="cart-card-toolbar-actions">
          <Link className="button secondary cart-add-link" href={CATALOG_ROUTES.equipment}>
            <Plus size={17} aria-hidden />
            Добавить позиции
          </Link>
          <button
            type="button"
            className="button secondary cart-clear-btn"
            disabled={disabled}
            onClick={handleClearCart}
          >
            <Trash2 size={17} aria-hidden />
            Очистить корзину
          </button>
        </div>
      </header>

      <ul className="cart-rows">
        {items.map((item) => (
          <CartItemRow
            key={item.id}
            item={item}
            disabled={disabled}
            onQuantityChange={(quantity) => updateQuantity(item.id, quantity)}
            onRemove={() => removeItem(item.id)}
          />
        ))}
      </ul>

      <footer className="cart-card-footer">
        <section className="cart-help-block">
          <span className="cart-help-icon" aria-hidden>
            <Shield size={22} />
          </span>
          <section>
            <strong>Нужна помощь с подбором?</strong>
            <p className="muted">
              Наши специалисты подберут оптимальное решение под ваш объект и условия эксплуатации.
            </p>
          </section>
        </section>
        <section className="cart-total-block">
          <span className="cart-total-label">Итого по заявке</span>
          <AnimatedPrice value={total} className="cart-total-value" />
        </section>
      </footer>
    </article>
  );
}
