import type { Metadata } from "next";
import { CartPage } from "@/components/cart/CartPage";
import { ShopPageShell } from "@/components/ShopPageShell";
import { SiteFooter } from "@/components/SiteFooter";

import { buildPageMetadata } from "@/lib/site-seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/cart");
}

export default function CartRoutePage() {
  return (
    <ShopPageShell className="site-shell site-shell-shop site-shell-cart">
      <CartPage />
      <SiteFooter />
    </ShopPageShell>
  );
}
