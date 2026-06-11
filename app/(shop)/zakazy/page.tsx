import type { Metadata } from "next";
import { OrdersHistoryPage } from "@/components/orders/OrdersHistoryPage";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "История заказов | ГазСнаб",
  description: "Просмотр заявок и статусов по трек-номеру"
};

export default function OrdersHistoryRoutePage() {
  return (
    <main className="site-shell site-shell-shop site-shell-cart">
      <SiteHeader />
      <OrdersHistoryPage />
      <SiteFooter />
    </main>
  );
}
