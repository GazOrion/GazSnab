import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { CATALOG_ROUTES } from "@/lib/catalog";

export function EmptyCartState() {
  return (
    <section className="cart-empty-state">
      <span className="cart-empty-state-icon" aria-hidden>
        <ShoppingCart size={48} strokeWidth={1.4} />
      </span>
      <h1>Корзина пуста</h1>
      <p className="muted">
        Добавьте позиции из каталога, чтобы отправить заявку менеджеру.
      </p>
      <Link className="button" href={CATALOG_ROUTES.equipment}>
        Перейти в каталог
      </Link>
    </section>
  );
}
