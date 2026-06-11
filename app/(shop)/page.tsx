import type { Metadata } from "next";
import { CatalogDbError } from "@/components/home/CatalogDbError";
import { HeroSection } from "@/components/home/HeroSection";
import { EquipmentPromoSection } from "@/components/home/EquipmentPromoSection";
import { MetalworkingPromoSection } from "@/components/home/MetalworkingPromoSection";
import { PromoHomeSections } from "@/components/home/PromoHomeSections";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { loadPromoPageData } from "@/lib/catalog-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ОРИОН ГАЗСНАБ — газовое оборудование и металлообработка",
  description:
    "Поставка газового оборудования, металлообработка и сервис для промышленных объектов в Ростовской области"
};

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
