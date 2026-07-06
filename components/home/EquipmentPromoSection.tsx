import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ResponsiveBannerImage } from "@/components/ResponsiveBannerImage";
import { PopularProductsBlock } from "@/components/home/PopularProductsBlock";
import type { CatalogProduct } from "@/components/ProductCard";
import { CATALOG_ROUTES } from "@/lib/catalog";
import {
  MOBILE_BANNER_FILES,
  getClientMobileBannerPath
} from "@/lib/mobile-banner-paths";

const EQUIPMENT_PROMO_BANNER = "/media/gotovoe-oborudovanie.png";
const EQUIPMENT_PROMO_MOBILE_BANNER = getClientMobileBannerPath(
  MOBILE_BANNER_FILES.equipmentPromo
);

type Props = {
  popularProducts: CatalogProduct[];
};

export function EquipmentPromoSection({ popularProducts }: Props) {
  return (
    <section className="store-equipment-hero" aria-labelledby="store-equipment-hero-heading">
      <div className="store-equipment-hero__intro">
        <div className="store-equipment-hero__banner">
          <ResponsiveBannerImage
            desktopSrc={EQUIPMENT_PROMO_BANNER}
            mobileSrc={EQUIPMENT_PROMO_MOBILE_BANNER}
            className="store-equipment-hero__bg"
          />
          <div className="store-equipment-hero__container">
            <div className="store-equipment-hero__copy">
              <h2 id="store-equipment-hero-heading" className="store-equipment-hero__title">
                <span>Готовое газовое</span>
                <span>оборудование</span>
              </h2>
              <p className="store-equipment-hero__lead">
                <span>Счётчики, краны, арматура, регуляторы,</span>
                <span>сигнализаторы и другие решения для газовых систем.</span>
              </p>

              <Link className="store-equipment-hero__cta" href={CATALOG_ROUTES.equipment}>
                Смотреть весь каталог
                <ArrowRight size={18} strokeWidth={2.5} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="store-equipment-hero__body">
        <PopularProductsBlock
          products={popularProducts}
          catalogHref={CATALOG_ROUTES.equipment}
          classPrefix="store-equipment-hero"
        />
      </div>
    </section>
  );
}
