import type { CatalogProduct } from "@/components/ProductCard";
import {
  collectPumpFilterOptions,
  isPumpFilterSection,
  PUMP_FILTER_SECTIONS,
  pumpMatchesSectionFilter
} from "@/lib/pumps-catalog";

export const GAS_METERS_CATEGORY = "Счётчики газа";
export const GAS_METERING_UNITS_CATEGORY = "ГРПШ";
export const TELEMETRY_CATEGORY = "Телеметрия";
export const SOFTWARE_CATEGORY = "ПО";
export const ADDITIONAL_EQUIPMENT_CATEGORY = "Дополнительное оборудование";
export const PUMPS_CATEGORY = "Насосы";

export type EquipmentCategorySlug =
  | "gas-meters"
  | "telemetry"
  | "software"
  | "additional-equipment"
  | "regulators"
  | "gas-metering-units"
  | "gas-alarms"
  | "filters"
  | "pumps"
  | "ball-valves"
  | "shutoff-valves";

export type EquipmentCategoryFilterState = {
  priceMin: number;
  priceMax: number;
  manufacturers: string[];
  sectionFilters: Record<string, string[]>;
  inStockOnly: boolean;
};

export type EquipmentCategoryConfig = {
  category: string;
  slug: EquipmentCategorySlug;
  searchPlaceholder: string;
  filterSections: readonly string[];
  filterSectionOptions?: Partial<Record<string, readonly string[]>>;
  manufacturers: readonly string[];
};

const GAS_METER_MANUFACTURERS = ["Техномер", "ТАУГАЗ"] as const;

export const EQUIPMENT_CATEGORY_CONFIGS: Record<string, EquipmentCategoryConfig> = {
  "Счётчики газа": {
    category: "Счётчики газа",
    slug: "gas-meters",
    searchPlaceholder: "Поиск по счетчикам",
    filterSections: ["Тип счётчика", "Диаметр подключения", "Назначение", "Способ монтажа"],
    filterSectionOptions: {
      "Тип счётчика": ["Мембранные", "СМТ-Комплексы"]
    },
    manufacturers: GAS_METER_MANUFACTURERS
  },
  [TELEMETRY_CATEGORY]: {
    category: TELEMETRY_CATEGORY,
    slug: "telemetry",
    searchPlaceholder: "Поиск по телеметрии",
    filterSections: [],
    manufacturers: GAS_METER_MANUFACTURERS
  },
  [SOFTWARE_CATEGORY]: {
    category: SOFTWARE_CATEGORY,
    slug: "software",
    searchPlaceholder: "Поиск по программному обеспечению",
    filterSections: [],
    manufacturers: ["Техномер"]
  },
  [ADDITIONAL_EQUIPMENT_CATEGORY]: {
    category: ADDITIONAL_EQUIPMENT_CATEGORY,
    slug: "additional-equipment",
    searchPlaceholder: "Поиск по дополнительному оборудованию",
    filterSections: [],
    manufacturers: ["Техномер"]
  },
  "Газорегуляторные пункты": {
    category: "Газорегуляторные пункты",
    slug: "regulators",
    searchPlaceholder: "Поиск по регуляторам",
    filterSections: ["Тип регулятора", "Давление", "Пропускная способность"],
    manufacturers: []
  },
  [GAS_METERING_UNITS_CATEGORY]: {
    category: GAS_METERING_UNITS_CATEGORY,
    slug: "gas-metering-units",
    searchPlaceholder: "Поиск по ГРПШ",
    filterSections: ["Тип узла", "Диаметр", "Пропускная способность", "Способ монтажа"],
    manufacturers: []
  },
  "Узлы учета": {
    category: "Узлы учета",
    slug: "gas-alarms",
    searchPlaceholder: "Поиск по сигнализаторам",
    filterSections: ["Тип сигнализатора", "Назначение", "Способ монтажа"],
    manufacturers: []
  },
  Фильтры: {
    category: "Фильтры",
    slug: "filters",
    searchPlaceholder: "Поиск по фильтрам",
    filterSections: ["Тип фильтра", "Диаметр", "Степень очистки"],
    manufacturers: []
  },
  [PUMPS_CATEGORY]: {
    category: PUMPS_CATEGORY,
    slug: "pumps",
    searchPlaceholder: "Поиск по насосам",
    filterSections: PUMP_FILTER_SECTIONS,
    manufacturers: []
  },
  "Краны шаровые": {
    category: "Краны шаровые",
    slug: "ball-valves",
    searchPlaceholder: "Поиск по кранам",
    filterSections: ["Диаметр", "Давление", "Тип резьбы"],
    manufacturers: ["LD Pride"]
  },
  "Запорная арматура": {
    category: "Запорная арматура",
    slug: "shutoff-valves",
    searchPlaceholder: "Поиск по арматуре",
    filterSections: ["Тип арматуры", "Диаметр", "Давление"],
    manufacturers: []
  }
};

export function getEquipmentCategoryConfig(category: string): EquipmentCategoryConfig | null {
  return EQUIPMENT_CATEGORY_CONFIGS[category] ?? null;
}

export function getProductPriceBounds(products: CatalogProduct[]) {
  if (!products.length) {
    return { min: 0, max: 120_000 };
  }
  const prices = products.map((p) => p.price);
  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices))
  };
}

function productMatchesManufacturer(product: CatalogProduct, brand: string) {
  const specs = product.specs;
  if (specs) {
    const manufacturer = specs["Производитель"];
    const subcategory = specs["Подкатегория"];

    if (brand === "Техномер") {
      return (
        manufacturer === "СМТ" ||
        manufacturer === "Техномер" ||
        subcategory === "СМТ-Комплексы" ||
        subcategory === "Газсеть"
      );
    }

    if (brand === "ТАУГАЗ") {
      return manufacturer === "ТАУГАЗ" || subcategory === "Мембранные";
    }
  }

  const haystack = `${product.title} ${product.description}`.toLowerCase();
  return haystack.includes(brand.toLowerCase());
}

export function countByManufacturer(products: CatalogProduct[], brand: string) {
  return products.filter((p) => productMatchesManufacturer(p, brand)).length;
}

function productMatchesSectionFilter(
  product: CatalogProduct,
  section: string,
  value: string
) {
  if (section === "Тип счётчика") {
    return product.specs?.["Подкатегория"] === value;
  }

  if (isPumpFilterSection(section)) {
    return pumpMatchesSectionFilter(product, section, value);
  }

  return false;
}

export function getEquipmentFilterSectionOptions(
  products: CatalogProduct[],
  config: EquipmentCategoryConfig,
  section: string
) {
  const preset = config.filterSectionOptions?.[section];
  if (preset?.length) return [...preset];

  if (config.slug === "pumps" && isPumpFilterSection(section)) {
    return collectPumpFilterOptions(products, section);
  }

  return [];
}

export function shouldShowEquipmentPriceFilter(
  config: EquipmentCategoryConfig,
  bounds: { min: number; max: number }
) {
  if (config.slug === "pumps") return false;
  return bounds.max > bounds.min;
}

export function countBySectionFilter(
  products: CatalogProduct[],
  section: string,
  value: string
) {
  return products.filter((p) => productMatchesSectionFilter(p, section, value)).length;
}

export function filterEquipmentCategoryProducts(
  products: CatalogProduct[],
  query: string,
  filters: EquipmentCategoryFilterState
) {
  const trimmed = query.trim().toLowerCase();

  return products.filter((product) => {
    if (trimmed) {
      const matchesText =
        product.title.toLowerCase().includes(trimmed) ||
        product.description.toLowerCase().includes(trimmed);
      if (!matchesText) return false;
    }

    if (product.price < filters.priceMin || product.price > filters.priceMax) {
      return false;
    }

    if (filters.inStockOnly && product.inStock === false) {
      return false;
    }

    if (filters.manufacturers.length > 0) {
      const matchesBrand = filters.manufacturers.some((brand) =>
        productMatchesManufacturer(product, brand)
      );
      if (!matchesBrand) return false;
    }

    for (const [section, values] of Object.entries(filters.sectionFilters)) {
      if (values.length === 0) continue;
      const matchesSection = values.some((value) =>
        productMatchesSectionFilter(product, section, value)
      );
      if (!matchesSection) return false;
    }

    return true;
  });
}

export function createEquipmentCategoryFilterState(
  products: CatalogProduct[]
): EquipmentCategoryFilterState {
  const bounds = getProductPriceBounds(products);
  return {
    priceMin: bounds.min,
    priceMax: bounds.max,
    manufacturers: [],
    sectionFilters: {},
    inStockOnly: false
  };
}

/** Перенос товаров «узел учёта» из раздела сигнализаторов. */
export function isGasMeteringUnitProduct(product: {
  title: string;
  description: string;
  slug: string;
}) {
  const haystack = `${product.title} ${product.description} ${product.slug}`.toLowerCase();
  if (/сигнализ|загазован/i.test(haystack)) return false;
  if (/grp-sh|грпш/i.test(haystack)) return true;
  return /узел\s*учет|узл[аы]\s+учет|uzel-ucheta/i.test(haystack);
}
