import { formatPrice } from "@/lib/format";
import { PUMPS_CATEGORY } from "@/lib/equipment-category-config";
import { getProductLineCatalog, getProductLineMinPrice } from "@/lib/product-lines";

export const ON_REQUEST_PRICE_LABEL = "по запросу";

export function isPumpProduct(slug?: string, category?: string) {
  return category === PUMPS_CATEGORY || (slug?.startsWith("nasos-") ?? false);
}

/** Товары с несколькими исполнениями — в каталоге и на карточке показываем цену «от». */
const FROM_PRICE_PRODUCT_SLUGS = new Set([
  "smt-smart",
  "smt-smart-k",
  "smt-smart-dkz",
  "smt-smart-110",
  "smt-kompleks",
  "smt-kompleks-k",
  "smt-kompleks-g40",
  "smt-kompleks-g65-g100",
  "montazhnoe-prisoedinitelnoe-oborudovanie",
  "shkaf-zashchitnyy-shg"
]);

export function isFromPriceProduct(slug: string, kind?: string) {
  if (kind === "Услуга") return true;
  if (FROM_PRICE_PRODUCT_SLUGS.has(slug)) return true;
  return getProductLineCatalog(slug) != null;
}

export function getProductPriceLabel(options: {
  slug: string;
  price: number;
  kind?: string;
  category?: string;
}) {
  const { slug, price, kind, category } = options;

  if (isPumpProduct(slug, category)) {
    return ON_REQUEST_PRICE_LABEL;
  }

  const lineCatalog = getProductLineCatalog(slug);
  const lineMinPrice = lineCatalog ? getProductLineMinPrice(lineCatalog) : null;

  if (lineMinPrice != null) {
    return `от ${formatPrice(lineMinPrice)}`;
  }

  if (lineCatalog) {
    return ON_REQUEST_PRICE_LABEL;
  }

  if (isFromPriceProduct(slug, kind) && price > 0) {
    return `от ${formatPrice(price)}`;
  }

  return formatPrice(price);
}

export function getCategoryClusterPriceLabel(options: {
  category?: string;
  minPrice?: number | null;
  count?: number;
  priceLabel?: string;
}) {
  if (options.priceLabel) {
    return options.priceLabel;
  }

  if (isPumpProduct(undefined, options.category) && (options.count ?? 0) > 0) {
    return ON_REQUEST_PRICE_LABEL;
  }

  if (options.minPrice == null || options.minPrice <= 0) {
    return null;
  }

  return `от ${formatPrice(options.minPrice)}`;
}
