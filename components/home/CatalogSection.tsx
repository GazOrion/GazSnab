import type { CatalogProduct } from "@/components/ProductCard";
import type { ProductKind } from "@/lib/catalog";
import type { CategoryCluster } from "@/lib/catalog-data";
import {
  getCatalogBannerSrc,
  getEquipmentCategoryBannerMap,
  getServicesCatalogBannerSrc
} from "@/lib/catalog-banner";
import { CatalogSectionClient } from "./CatalogSectionClient";

type Props = {
  id: string;
  title: string;
  description: string;
  pageLead?: string;
  products: CatalogProduct[];
  categories: string[];
  clusters?: CategoryCluster[];
  /** Карточки хаба (все пункты меню «Каталог»); если не задано — clusters. */
  hubClusters?: CategoryCluster[];
  clusterHub?: boolean;
  fixedKind?: ProductKind;
  showKindSwitch?: boolean;
  variant?: "default" | "equipment" | "services";
};

export function CatalogSection(props: Props) {
  const catalogBannerSrc =
    props.variant === "equipment"
      ? getCatalogBannerSrc()
      : props.variant === "services"
        ? getServicesCatalogBannerSrc() ?? undefined
        : undefined;
  const equipmentCategoryBanners =
    props.variant === "equipment" ? getEquipmentCategoryBannerMap() : {};

  return (
    <CatalogSectionClient
      {...props}
      catalogBannerSrc={catalogBannerSrc}
      equipmentCategoryBanners={equipmentCategoryBanners}
    />
  );
}
