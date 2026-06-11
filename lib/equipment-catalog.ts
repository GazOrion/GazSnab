import {
  EQUIPMENT_CLUSTER_ORDER,
  EQUIPMENT_SORT,
  type EquipmentSort,
  sortClusters
} from "@/lib/catalog";
import type { CategoryCluster } from "@/lib/catalog-data";
import type { CatalogProduct } from "@/components/ProductCard";

export function sortEquipmentClusters(
  clusters: CategoryCluster[],
  sort: EquipmentSort
): CategoryCluster[] {
  const isHubMenu = clusters.some((cluster) => cluster.hubId);

  if (sort === EQUIPMENT_SORT.priceAsc) {
    return [...clusters].sort((a, b) => {
      const left = a.minPrice ?? Number.POSITIVE_INFINITY;
      const right = b.minPrice ?? Number.POSITIVE_INFINITY;
      if (left !== right) return left - right;
      return a.name.localeCompare(b.name, "ru");
    });
  }

  if (sort === EQUIPMENT_SORT.priceDesc) {
    return [...clusters].sort((a, b) => {
      const left = a.minPrice ?? Number.NEGATIVE_INFINITY;
      const right = b.minPrice ?? Number.NEGATIVE_INFINITY;
      if (left !== right) return right - left;
      return a.name.localeCompare(b.name, "ru");
    });
  }

  if (isHubMenu) {
    return clusters;
  }

  const ordered = sortClusters(clusters, EQUIPMENT_CLUSTER_ORDER);
  return [...ordered].sort((a, b) => b.count - a.count);
}

export function sortEquipmentProducts(
  products: CatalogProduct[],
  sort: EquipmentSort
): CatalogProduct[] {
  if (sort === EQUIPMENT_SORT.priceAsc) {
    return [...products].sort((a, b) => a.price - b.price);
  }
  if (sort === EQUIPMENT_SORT.priceDesc) {
    return [...products].sort((a, b) => b.price - a.price);
  }
  return products;
}
