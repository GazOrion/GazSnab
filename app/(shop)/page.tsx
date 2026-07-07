import type { Metadata } from "next";
import { CatalogDbError } from "@/components/home/CatalogDbError";
import { HeroSection } from "@/components/home/HeroSection";
import { EquipmentPromoSection } from "@/components/home/EquipmentPromoSection";
import { MetalworkingPromoSection } from "@/components/home/MetalworkingPromoSection";
import { PromoHomeSections } from "@/components/home/PromoHomeSections";
import { ShopPageShell } from "@/components/ShopPageShell";
import { SiteFooter } from "@/components/SiteFooter";
import { loadPromoPageData } from "@/lib/catalog-data";
import { buildPageMetadata } from "@/lib/site-seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/");
}

export default async function Home() {
  let promoData;
  try {
    promoData = await loadPromoPageData();
  } catch (error) {
    console.error("[home] promo load failed:", error);
    promoData = null;
  }

  return (
    <ShopPageShell className="site-shell site-shell-shop store-promo-page">
      <HeroSection
        categories={promoData?.equipmentPromoCategories ?? []}
        popularProducts={promoData?.heroPopularGoods ?? []}
      />
      {promoData ? (
        <EquipmentPromoSection popularProducts={promoData.equipmentPopularGoods} />
      ) : null}
      <MetalworkingPromoSection popularServices={promoData?.metalPopularServices ?? []} />
      {!promoData ? <CatalogDbError /> : <PromoHomeSections />}
      <SiteFooter />
    </ShopPageShell>
  );
}
