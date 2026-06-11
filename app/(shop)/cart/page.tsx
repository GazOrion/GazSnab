import type { Metadata } from "next";
import { CartPage } from "@/components/cart/CartPage";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Корзина | ГазСнаб",
  description: "Оформление заявки на газовое оборудование и услуги"
};

export default function CartRoutePage() {
  return (
    <main className="site-shell site-shell-shop site-shell-cart">
      <SiteHeader />
      <CartPage />
      <SiteFooter />
    </main>
  );
}
