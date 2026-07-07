import type { Metadata } from "next";
import { FavoritesPageClient } from "@/components/FavoritesPageClient";
import { ShopPageShell } from "@/components/ShopPageShell";
import { SiteFooter } from "@/components/SiteFooter";
import { buildPageMetadata } from "@/lib/site-seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/favorites");
}

export default function FavoritesPage() {
  return (
    <ShopPageShell className="site-shell site-shell-shop site-shell-cart">
      <FavoritesPageClient />
      <SiteFooter />
    </ShopPageShell>
  );
}
