import { EQUIPMENT_CATEGORY_CONFIGS, normalizeEquipmentCategory, PUMPS_CATEGORY } from "@/lib/equipment-category-config";
import {
  GAS_METER_SUBCATEGORY_MEMBRANE,
  GAS_METER_SUBCATEGORY_ROTARY,
  GAS_METER_SUBCATEGORY_SG_EK,
  GAS_METER_SUBCATEGORY_SG_TK,
  GAS_METER_SUBCATEGORY_SG_TK_D,
  GAS_METER_SUBCATEGORY_SG_TK_R,
  GAS_METER_SUBCATEGORY_SG_TK_T,
  GAS_METER_SUBCATEGORY_SMT,
  GAS_METER_SUBCATEGORY_TURBINE,
  GAS_METERS_CATEGORY
} from "@/lib/gas-meters-catalog";
import { PUMP_SUBCATEGORIES } from "@/lib/pumps-catalog";

const EQUIPMENT_ROUTE = "/oborudovanie";
const SERVICES_ROUTE = "/uslugi";

const EQUIPMENT_SLUG_TO_CATEGORY = Object.fromEntries(
  Object.values(EQUIPMENT_CATEGORY_CONFIGS).map((config) => [config.slug, config.category])
) as Record<string, string>;

const EQUIPMENT_CATEGORY_TO_SLUG = Object.fromEntries(
  Object.values(EQUIPMENT_CATEGORY_CONFIGS).map((config) => [config.category, config.slug])
) as Record<string, string>;

const GAS_METER_SUBCATEGORY_SLUGS: Record<string, string> = {
  [GAS_METER_SUBCATEGORY_SMT]: "smt-kompleks",
  [GAS_METER_SUBCATEGORY_MEMBRANE]: "membrane",
  [GAS_METER_SUBCATEGORY_ROTARY]: "rotary",
  [GAS_METER_SUBCATEGORY_TURBINE]: "turbine",
  [GAS_METER_SUBCATEGORY_SG_TK]: "sg-tk",
  [GAS_METER_SUBCATEGORY_SG_TK_T]: "sg-tk-t",
  [GAS_METER_SUBCATEGORY_SG_TK_R]: "sg-tk-r",
  [GAS_METER_SUBCATEGORY_SG_TK_D]: "sg-tk-d",
  [GAS_METER_SUBCATEGORY_SG_EK]: "sg-ek"
};

const GAS_METER_SUBCATEGORY_BY_SLUG = Object.fromEntries(
  Object.entries(GAS_METER_SUBCATEGORY_SLUGS).map(([name, slug]) => [slug, name])
);

const PUMP_SUBCATEGORY_BY_SLUG = Object.fromEntries(
  PUMP_SUBCATEGORIES.map((item) => [item.id, item.name])
);

const PUMP_SUBCATEGORY_SLUGS = Object.fromEntries(
  PUMP_SUBCATEGORIES.map((item) => [item.name, item.id])
);

export const SERVICE_CATEGORY_SLUGS: Record<string, string> = {
  Инжиниринг: "inzhiniring",
  Сервис: "servis"
};

const SERVICE_SLUG_TO_CATEGORY = Object.fromEntries(
  Object.entries(SERVICE_CATEGORY_SLUGS).map(([name, slug]) => [slug, name])
);

export function getEquipmentCategorySlug(category: string): string | null {
  const normalized = normalizeEquipmentCategory(category);
  return EQUIPMENT_CATEGORY_TO_SLUG[normalized] ?? null;
}

export function getEquipmentCategoryBySlug(slug: string): string | null {
  return EQUIPMENT_SLUG_TO_CATEGORY[slug] ?? null;
}

export function getEquipmentSubcategorySlug(category: string, subcategory: string): string | null {
  const normalizedCategory = normalizeEquipmentCategory(category);
  if (normalizedCategory === GAS_METERS_CATEGORY) {
    return GAS_METER_SUBCATEGORY_SLUGS[subcategory] ?? null;
  }
  if (normalizedCategory === PUMPS_CATEGORY) {
    return PUMP_SUBCATEGORY_SLUGS[subcategory] ?? null;
  }
  return null;
}

export function getEquipmentSubcategoryBySlug(category: string, slug: string): string | null {
  const normalizedCategory = normalizeEquipmentCategory(category);
  if (normalizedCategory === GAS_METERS_CATEGORY) {
    return GAS_METER_SUBCATEGORY_BY_SLUG[slug] ?? null;
  }
  if (normalizedCategory === PUMPS_CATEGORY) {
    return PUMP_SUBCATEGORY_BY_SLUG[slug] ?? null;
  }
  return null;
}

export function getServiceCategorySlug(category: string): string | null {
  return SERVICE_CATEGORY_SLUGS[category] ?? null;
}

export function getServiceCategoryBySlug(slug: string): string | null {
  return SERVICE_SLUG_TO_CATEGORY[slug] ?? null;
}

export type ParsedEquipmentCatalogPath = {
  categorySlug?: string;
  subcategorySlug?: string;
  categoryName?: string;
  subcategoryName?: string;
};

export function parseEquipmentCatalogPath(pathname: string): ParsedEquipmentCatalogPath {
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] !== "oborudovanie") {
    return {};
  }

  const categorySlug = segments[1];
  const subcategorySlug = segments[2];
  if (!categorySlug) {
    return {};
  }

  const categoryName = getEquipmentCategoryBySlug(categorySlug) ?? undefined;
  const subcategoryName =
    categoryName && subcategorySlug
      ? getEquipmentSubcategoryBySlug(categoryName, subcategorySlug) ?? undefined
      : undefined;

  return {
    categorySlug,
    subcategorySlug,
    categoryName,
    subcategoryName
  };
}

export type ParsedServicesCatalogPath = {
  categorySlug?: string;
  categoryName?: string;
};

export function parseServicesCatalogPath(pathname: string): ParsedServicesCatalogPath {
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] !== "uslugi") {
    return {};
  }

  const categorySlug = segments[1];
  if (!categorySlug) {
    return {};
  }

  return {
    categorySlug,
    categoryName: getServiceCategoryBySlug(categorySlug) ?? undefined
  };
}

export function buildEquipmentCatalogPath(category: string, subcategory?: string) {
  const categorySlug = getEquipmentCategorySlug(category);
  if (!categorySlug) {
    return EQUIPMENT_ROUTE;
  }

  let path = `${EQUIPMENT_ROUTE}/${categorySlug}`;
  if (subcategory) {
    const subcategorySlug = getEquipmentSubcategorySlug(category, subcategory);
    if (subcategorySlug) {
      path = `${path}/${subcategorySlug}`;
    }
  }

  return path;
}

export function buildServicesCatalogPath(category: string) {
  const categorySlug = getServiceCategorySlug(category);
  if (!categorySlug) {
    return SERVICES_ROUTE;
  }
  return `${SERVICES_ROUTE}/${categorySlug}`;
}

export function appendCatalogQuery(path: string, query: URLSearchParams) {
  const normalizedQuery = query.toString();
  return normalizedQuery ? `${path}?${normalizedQuery}` : path;
}
