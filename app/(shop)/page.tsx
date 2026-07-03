import type { Metadata } from "next";
import { CatalogDbError } from "@/components/home/CatalogDbError";
import { HeroSection } from "@/components/home/HeroSection";
import { EquipmentPromoSection } from "@/components/home/EquipmentPromoSection";
import { MetalworkingPromoSection } from "@/components/home/MetalworkingPromoSection";
import { PromoHomeSections } from "@/components/home/PromoHomeSections";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
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
    <main className="site-shell site-shell-shop store-promo-page">
      <SiteHeader />
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
    </main>
  );
}
