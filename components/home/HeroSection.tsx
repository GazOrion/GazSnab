import Link from "next/link";
import { CATALOG_ROUTES } from "@/lib/catalog";
import { getMainBannerSrc } from "@/lib/main-banner";
import type { CatalogProduct } from "@/components/ProductCard";
import type { EquipmentPromoCategory } from "@/lib/catalog-data";
import { EquipmentCategoryStrip } from "./EquipmentCategoryStrip";
import { PromoBannerBenefits } from "./PromoBannerBenefits";
import { PopularProductsBlock } from "./PopularProductsBlock";

type Props = {
  categories: EquipmentPromoCategory[];
  popularProducts: CatalogProduct[];
};

export function HeroSection({ categories, popularProducts }: Props) {
  return (
    <section className="store-hero-industrial" aria-labelledby="store-hero-heading">
      <div className="store-hero-industrial__main">
        <div className="store-hero-industrial__banner">
          {/* eslint-disable-next-line @next/next/no-img-element -- static banner, no optimizer cache */}
          <img
            src={getMainBannerSrc()}
            alt=""
            className="store-hero-industrial__bg"
            decoding="async"
            fetchPriority="high"
          />
          <div className="store-hero-industrial__container">
            <div className="store-hero-industrial__aside">
              <div className="store-hero-industrial__copy">
                <h1 id="store-hero-heading" className="store-hero-industrial__title">
                  <span>Оборудование</span>
                  <span>для газа</span>
                  <span>и производства</span>
                </h1>
                <p className="store-hero-industrial__subtitle">
                  Поставка, изготовление, металлообработка
                </p>
                <Link className="store-hero-industrial__cta" href={CATALOG_ROUTES.equipment}>
                  Перейти в каталог
                </Link>
                <PromoBannerBenefits classPrefix="store-hero-industrial" />
              </div>
            </div>
          </div>
        </div>

        <EquipmentCategoryStrip categories={categories} classPrefix="store-hero-industrial" />
      </div>

      <div className="store-hero-industrial__popular-wrap">
        <PopularProductsBlock
          products={popularProducts}
          catalogHref={CATALOG_ROUTES.equipment}
          classPrefix="store-hero-industrial"
        />
      </div>
    </section>
  );
}
