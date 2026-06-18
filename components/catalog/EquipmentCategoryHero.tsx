import Link from "next/link";
import clsx from "clsx";

export type CategoryBreadcrumb = {
  label: string;
  href?: string;
};

type Props = {
  bannerSrc: string;
  title: string;
  lead: string;
  breadcrumbs: CategoryBreadcrumb[];
  bannerModifier?: string;
  subtitle?: string;
};

export function EquipmentCategoryHero({
  bannerSrc,
  title,
  lead,
  breadcrumbs,
  bannerModifier,
  subtitle
}: Props) {
  return (
    <header className="store-equipment-catalog-hero">
      <div
        className={clsx(
          "store-equipment-catalog-hero__banner",
          bannerModifier && `store-equipment-catalog-hero__banner--${bannerModifier}`
        )}
        style={{ backgroundImage: `url("${bannerSrc}")` }}
      >
        <div className="store-equipment-catalog-hero__container">
          <div className="store-equipment-catalog-hero__copy">
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
            <div className="store-equipment-catalog-hero__heading">
              <h1 className="store-equipment-catalog-hero__title">{title}</h1>
              {subtitle ? (
                <p className="store-equipment-catalog-hero__subtitle">{subtitle}</p>
              ) : null}
            </div>
            <p className="store-equipment-catalog-hero__lead">{lead}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
