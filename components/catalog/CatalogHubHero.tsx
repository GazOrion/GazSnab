import clsx from "clsx";
import Link from "next/link";

type Props = {
  bannerSrc: string;
  title: string;
  lead: string;
  titleId: string;
  breadcrumbCurrent: string;
  bannerClassName?: string;
};

export function CatalogHubHero({
  bannerSrc,
  title,
  lead,
  titleId,
  breadcrumbCurrent,
  bannerClassName
}: Props) {
  return (
    <header className="store-equipment-catalog-hero">
      <div
        className={clsx("store-equipment-catalog-hero__banner", bannerClassName)}
        style={{ backgroundImage: `url("${bannerSrc}")` }}
      >
        <div className="store-equipment-catalog-hero__container">
          <div className="store-equipment-catalog-hero__copy">
            <nav className="store-equipment-catalog-breadcrumbs" aria-label="Хлебные крошки">
              <Link href="/">Главная</Link>
              <span aria-hidden>/</span>
              <span>{breadcrumbCurrent}</span>
            </nav>
            <h1 id={titleId} className="store-equipment-catalog-hero__title">
              {title}
            </h1>
            <p className="store-equipment-catalog-hero__lead">{lead}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
