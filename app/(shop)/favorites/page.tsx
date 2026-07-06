import type { Metadata } from "next";
import { FavoritesPageClient } from "@/components/FavoritesPageClient";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { buildPageMetadata } from "@/lib/site-seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/favorites");
}

export default function FavoritesPage() {
  return (
    <main className="site-shell site-shell-shop site-shell-cart">
      <SiteHeader />
      <FavoritesPageClient />
      <SiteFooter />
    </main>
  );
}
