"use client";

import clsx from "clsx";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCart } from "./CartProvider";

type Props = {
  variant?: "default" | "icon" | "header";
};

export function CartLink({ variant = "icon" }: Props) {
  const { count } = useCart();
  const pathname = usePathname();
  const active = pathname === "/cart";

  if (variant === "header") {
    return (
      <Link
        className={clsx("header-pro-cart", active && "header-pro-cart-active")}
        href="/cart"
        aria-label={count ? `Корзина: ${count} позиций` : "Корзина"}
      >
        <span className="header-pro-action-icon-slot header-pro-action-icon-slot--cart">
          <ShoppingCart size={22} strokeWidth={1.75} aria-hidden />
          {count > 0 ? (
            <span className="header-icon-badge" aria-hidden>
              {count > 99 ? "99+" : count}
            </span>
          ) : null}
        </span>
        <span className="header-pro-cart-label">Корзина</span>
      </Link>
    );
  }

  if (variant === "icon") {
    return (
      <Link
        className={clsx("header-icon-btn header-icon-btn-cart", active && "header-icon-btn-active")}
        href="/cart"
        aria-label={count ? `Корзина: ${count} позиций` : "Корзина"}
      >
        <ShoppingCart size={22} strokeWidth={1.75} aria-hidden />
        {count > 0 ? (
          <span className="header-icon-badge" aria-hidden>
            {count > 99 ? "99+" : count}
          </span>
        ) : null}
      </Link>
    );
  }

  return (
    <Link className={clsx("cart-trigger", active && "cart-trigger-active")} href="/cart">
      <span className="cart-trigger-inner">
        <ShoppingCart size={18} aria-hidden strokeWidth={2} />
        <span className="cart-trigger-label">Корзина</span>
        {count > 0 ? (
          <span className="cart-badge" aria-label={`Позиций в корзине: ${count}`}>
            {count}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
