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

const METALWORKING_BANNER = "/media/metalloobr.png";
const METALWORKING_MOBILE_BANNER = getClientMobileBannerPath(MOBILE_BANNER_FILES.metalworking);

type Props = {
  popularServices: CatalogProduct[];
};

export function MetalworkingPromoSection({ popularServices }: Props) {
  return (
    <section className="store-metal-hero" aria-labelledby="store-metal-hero-heading">
      <div className="store-metal-hero__intro">
        <div className="store-metal-hero__banner">
          <ResponsiveBannerImage
            desktopSrc={METALWORKING_BANNER}
            mobileSrc={METALWORKING_MOBILE_BANNER}
            className="store-metal-hero__bg"
          />
          <div className="store-metal-hero__container">
            <div className="store-metal-hero__copy">
              <h2 id="store-metal-hero-heading" className="store-metal-hero__title">
                Металлообработка
              </h2>

              <p className="store-metal-hero__lead">
                Высокоточная обработка деталей из металла на современном оборудовании. Гарантия
                качества и соблюдение сроков.
              </p>

              <Link className="store-metal-hero__cta" href={CATALOG_ROUTES.services}>
                Перейти в каталог
                <ArrowRight size={18} strokeWidth={2.5} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="store-metal-hero__body">
        <PopularProductsBlock
          products={popularServices}
          catalogHref={CATALOG_ROUTES.services}
          classPrefix="store-metal-hero"
        />
      </div>
    </section>
  );
}
