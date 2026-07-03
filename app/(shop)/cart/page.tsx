import type { Metadata } from "next";
import { CartPage } from "@/components/cart/CartPage";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

import { buildPageMetadata } from "@/lib/site-seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/cart");
}

export default function CartRoutePage() {
  return (
    <main className="site-shell site-shell-shop site-shell-cart">
      <SiteHeader />
      <CartPage />
      <SiteFooter />
    </main>
  );
}
