import Link from "next/link";
import clsx from "clsx";
import { ResponsiveBannerImage } from "@/components/ResponsiveBannerImage";
import { getPumpSubcategoryHeroSubtitleParts } from "@/lib/pumps-catalog";

export type CategoryBreadcrumb = {
  label: string;
  href?: string;
};

type Props = {
  bannerSrc: string;
  mobileBannerSrc?: string | null;
  title: string;
  lead: string;
  breadcrumbs: CategoryBreadcrumb[];
  bannerModifier?: string;
  subtitle?: string;
};

function CategoryBreadcrumbs({ breadcrumbs }: { breadcrumbs: CategoryBreadcrumb[] }) {
  return (
    <nav className="store-equipment-catalog-breadcrumbs" aria-label="Хлебные крошки">
      {breadcrumbs.map((item, index) => (
        <span key={`${item.label}-${index}`} className="store-equipment-catalog-breadcrumbs__item">
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span>{item.label}</span>
          )}
          {index < breadcrumbs.length - 1 ? <span aria-hidden>/</span> : null}
        </span>
      ))}
    </nav>
  );
}

function splitCatalogHeroSubtitle(subtitle: string) {
  const countersMarker = subtitle.toLowerCase().indexOf(" счетчиков газа)");
  if (countersMarker !== -1) {
    return {
      main: subtitle.slice(0, countersMarker),
      aside: subtitle.slice(countersMarker + 1)
    };
  }

  return getPumpSubcategoryHeroSubtitleParts(subtitle);
}

function CatalogHeroSubtitle({ subtitle }: { subtitle: string }) {
  const parts = splitCatalogHeroSubtitle(subtitle);

  if (!parts) {
    return <p className="store-equipment-catalog-hero__subtitle">{subtitle}</p>;
  }

  return (
    <p className="store-equipment-catalog-hero__subtitle store-equipment-catalog-hero__subtitle--split">
      <span className="store-equipment-catalog-hero__subtitle-main">{parts.main}</span>
      <span className="store-equipment-catalog-hero__subtitle-aside">{parts.aside}</span>
    </p>
  );
}

export function EquipmentCategoryHero({
  bannerSrc,
  mobileBannerSrc,
  title,
  lead,
  breadcrumbs,
  bannerModifier,
  subtitle
}: Props) {
  return (
    <header className="store-equipment-catalog-hero">
      <div className="store-equipment-catalog-hero__crumbs-bar">
        <CategoryBreadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <div
        className={clsx(
          "store-equipment-catalog-hero__banner",
          bannerModifier && `store-equipment-catalog-hero__banner--${bannerModifier}`
        )}
      >
        <ResponsiveBannerImage
          desktopSrc={bannerSrc}
          mobileSrc={mobileBannerSrc}
          className="store-equipment-catalog-hero__bg"
        />
        <div className="store-equipment-catalog-hero__container">
          <div className="store-equipment-catalog-hero__copy">
            <div className="store-equipment-catalog-hero__crumbs-in-banner">
              <CategoryBreadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            <div className="store-equipment-catalog-hero__heading">
              <h1 className="store-equipment-catalog-hero__title">{title}</h1>
              {subtitle ? <CatalogHeroSubtitle subtitle={subtitle} /> : null}
            </div>
            <p className="store-equipment-catalog-hero__lead">{lead}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
