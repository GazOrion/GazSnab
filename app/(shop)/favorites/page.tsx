import type { Metadata } from "next";
import { FavoritesPageClient } from "@/components/FavoritesPageClient";
import { buildPageMetadata } from "@/lib/site-seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/favorites");
}

export default function FavoritesPage() {
  return <FavoritesPageClient />;
}
