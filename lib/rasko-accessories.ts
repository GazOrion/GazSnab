import { GAS_METERS_CATEGORY } from "@/lib/equipment-category-config";
import { GAS_METER_SPEC_MANUFACTURER } from "@/lib/gas-meters-catalog";

export const RASKO_VK_COMMUNAL_FITTINGS_SLUGS = [
  "komplekt-fitingov-vk-g10t",
  "komplekt-fitingov-vk-g10-g16",
  "komplekt-fitingov-vk-g25"
] as const;

export const RASKO_VK_HOUSEHOLD_FITTINGS_SLUGS = [
  "komplekt-fitingov-vk-g16-g6t-dy15",
  "komplekt-fitingov-vk-g16-g6t-dy20",
  "komplekt-fitingov-vk-g16-g6t-dy25"
] as const;

/** Порядок комплектов фитингов в каталоге «Дополнительное оборудование». */
export const RASKO_VK_FITTINGS_CATALOG_ORDER = [
  ...RASKO_VK_COMMUNAL_FITTINGS_SLUGS,
  ...RASKO_VK_HOUSEHOLD_FITTINGS_SLUGS
] as const;

export const RASKO_VK_FITTINGS_SLUGS = RASKO_VK_FITTINGS_CATALOG_ORDER;

const RASKO_VK_HOUSEHOLD_METER_TO_FITTINGS: Record<string, string> = {
  "rasko-vk-g16": "komplekt-fitingov-vk-g16-g6t-dy15",
  "rasko-vk-g16t": "komplekt-fitingov-vk-g16-g6t-dy15",
  "rasko-vk-g25": "komplekt-fitingov-vk-g16-g6t-dy20",
  "rasko-vk-g25t": "komplekt-fitingov-vk-g16-g6t-dy20",
  "rasko-vk-g4": "komplekt-fitingov-vk-g16-g6t-dy20",
  "rasko-vk-g4t": "komplekt-fitingov-vk-g16-g6t-dy20",
  "rasko-vk-g6": "komplekt-fitingov-vk-g16-g6t-dy25",
  "rasko-vk-g6t": "komplekt-fitingov-vk-g16-g6t-dy25"
};

const RASKO_VK_COMMUNAL_METER_TO_FITTINGS: Record<string, string> = {
  "rasko-vk-g10t": "komplekt-fitingov-vk-g10t",
  "rasko-vk-g10": "komplekt-fitingov-vk-g10-g16",
  "rasko-vk-comm-g16": "komplekt-fitingov-vk-g10-g16",
  "rasko-vk-comm-g16t": "komplekt-fitingov-vk-g10-g16",
  "rasko-vk-comm-g25": "komplekt-fitingov-vk-g25",
  "rasko-vk-comm-g25t": "komplekt-fitingov-vk-g25"
};

export function isRaskoHouseholdGasMeterSlug(slug: string) {
  return slug in RASKO_VK_HOUSEHOLD_METER_TO_FITTINGS;
}

export function isRaskoGasMeterProduct(product: {
  category: string;
  specs?: Record<string, string> | null;
  slug?: string;
}): boolean {
  if (product.category !== GAS_METERS_CATEGORY) return false;
  if (product.slug?.startsWith("rasko-vk")) return true;
  return product.specs?.[GAS_METER_SPEC_MANUFACTURER] === "РАСКО";
}

export function isRaskoVkFittingsSlug(slug: string) {
  return (RASKO_VK_FITTINGS_SLUGS as readonly string[]).includes(slug);
}

/** В каталоге описание комплектов фитингов — только на странице товара. */
export function shouldHideProductCardDescription(slug: string) {
  return isRaskoVkFittingsSlug(slug);
}

/** Комплект фитингов для счётчика РАСКО ВК по slug товара. */
export function getRaskoVkFittingsSlugForMeter(meterSlug: string): string | null {
  return (
    RASKO_VK_HOUSEHOLD_METER_TO_FITTINGS[meterSlug] ??
    RASKO_VK_COMMUNAL_METER_TO_FITTINGS[meterSlug] ??
    null
  );
}

export function prioritizeRaskoVkFittingsProducts<T extends { slug: string }>(products: T[]): T[] {
  const fittings = RASKO_VK_FITTINGS_CATALOG_ORDER.flatMap((slug) => {
    const product = products.find((item) => item.slug === slug);
    return product ? [product] : [];
  });
  const rest = products.filter((item) => !isRaskoVkFittingsSlug(item.slug));
  return [...fittings, ...rest];
}
