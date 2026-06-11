import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  catalogPath,
  clusterPresentation,
  PRODUCT_KIND,
  resolveCatalogClusterImage,
  type ProductKind
} from "@/lib/catalog";
import type { CategoryCluster } from "@/lib/catalog-data";
import { getCategoryClusterPriceLabel } from "@/lib/product-price-label";

type Props = {
  clusters: CategoryCluster[];
  kind?: ProductKind;
  layout?: "grid" | "list";
};

export function EquipmentCategoryGrid({
  clusters,
  kind = PRODUCT_KIND.GOODS,
  layout = "grid"
}: Props) {
  if (clusters.length === 0) {
    return <p className="muted">Разделы каталога появятся после добавления позиций.</p>;
  }

  return (
    <div
      className={clsx(
        "store-equipment-category-grid",
        layout === "list" && "store-equipment-category-grid-list"
      )}
      role="list"
    >
      {clusters.map((cluster) => {
        const presentation = clusterPresentation(cluster.name, kind);
        const title = cluster.label ?? presentation.title;
        const teaser = cluster.teaser ?? presentation.teaser;
        const href = cluster.href ?? catalogPath({ kind, category: cluster.name });
        const imageUrl = resolveCatalogClusterImage(cluster.name, kind, cluster.imageUrl);
        const priceLabel = getCategoryClusterPriceLabel({
          category: cluster.name,
          minPrice: cluster.minPrice,
          count: cluster.count,
          priceLabel: cluster.priceLabel
        });

        return (
          <Link
            key={cluster.hubId ?? cluster.name}
            href={href}
            className="store-equipment-category-card"
            role="listitem"
          >
            <span className="store-equipment-category-card__thumb">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt=""
                  width={88}
                  height={88}
                  className="store-equipment-category-card__img"
                />
              ) : (
                <span className="store-equipment-category-card__placeholder" aria-hidden />
              )}
            </span>
            <span className="store-equipment-category-card__body">
              <span className="store-equipment-category-card__title">{title}</span>
              <span className="store-equipment-category-card__teaser">{teaser}</span>
              {priceLabel ? (
                <span className="store-equipment-category-card__price">{priceLabel}</span>
              ) : null}
            </span>
            <span className="store-equipment-category-card__arrow" aria-hidden>
              <ArrowRight size={20} strokeWidth={2.5} />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
