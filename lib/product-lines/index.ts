import { BALL_VALVES_LD_PRIDE } from "@/lib/product-lines/ball-valves-ld-pride";
import type { ProductLineCatalog } from "@/lib/product-lines/types";

const PRODUCT_LINES_BY_SLUG: Record<string, ProductLineCatalog> = {
  [BALL_VALVES_LD_PRIDE.slug]: BALL_VALVES_LD_PRIDE
};

export function getProductLineCatalog(slug: string): ProductLineCatalog | null {
  return PRODUCT_LINES_BY_SLUG[slug] ?? null;
}

export function getProductLineMinPrice(catalog: ProductLineCatalog): number | null {
  const prices = catalog.series
    .flatMap((series) => series.variants.map((variant) => variant.price))
    .filter((price): price is number => price != null && price > 0);

  return prices.length ? Math.min(...prices) : null;
}

export { BALL_VALVES_LD_PRIDE };
export type { ProductLineCatalog, ProductLineSeries, ProductLineVariant } from "@/lib/product-lines/types";
