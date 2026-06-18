import type { CatalogProduct } from "@/components/ProductCard";
import type { CategoryCluster } from "@/lib/catalog-data";
import { CATALOG_ROUTES, catalogPath, PRODUCT_KIND } from "@/lib/catalog";
import { PUMPS_CATEGORY } from "@/lib/equipment-category-config";
import { ON_REQUEST_PRICE_LABEL } from "@/lib/product-price-label";

export const PUMP_SPEC_SUBCATEGORY = "Подкатегория";

const PUMPS_CATEGORY_IMAGE = "/media/categories/pumps.webp";

const PUMP_SUBCATEGORY_IMAGE = (id: string) => `/media/categories/pumps/${id}.webp`;

export const PUMP_SUBCATEGORIES = [
  {
    id: "intelligent-wet-rotor",
    name: "Интеллектуальные циркуляционные насосы с «мокрым» ротором",
    image: PUMP_SUBCATEGORY_IMAGE("intelligent-wet-rotor"),
    teaser:
      "Энергоэффективные насосы с электронным управлением для систем отопления и ГВС"
  },
  {
    id: "three-speed-wet-rotor",
    name: "Трехскоростные циркуляционные насосы с «мокрым» ротором",
    image: PUMP_SUBCATEGORY_IMAGE("three-speed-wet-rotor"),
    teaser: "Классические циркуляционные насосы с переключением скорости вращения"
  },
  {
    id: "inline-circulation",
    name: "Линейные циркуляционные насосы",
    image: PUMP_SUBCATEGORY_IMAGE("inline-circulation"),
    teaser: "Компактные inline-насосы для монтажа непосредственно в трубопровод"
  },
  {
    id: "vertical-multistage",
    name: "Вертикальные многоступенчатые центробежные насосы",
    image: PUMP_SUBCATEGORY_IMAGE("vertical-multistage"),
    teaser: "Высоконапорные насосы вертикального исполнения для водоснабжения и промышленности"
  },
  {
    id: "horizontal-multistage",
    name: "Горизонтальные многоступенчатые центробежные насосы",
    image: PUMP_SUBCATEGORY_IMAGE("horizontal-multistage"),
    teaser: "Многоступенчатые насосы горизонтальной компоновки для стабильного давления"
  },
  {
    id: "monoblock-console",
    name: "Консольно-моноблочные центробежные насосы",
    image: PUMP_SUBCATEGORY_IMAGE("monoblock-console"),
    teaser: "Моноблочные агрегаты с близко расположенными опорами на общей раме"
  },
  {
    id: "console-centrifugal",
    name: "Центробежные насосы консольного типа",
    image: PUMP_SUBCATEGORY_IMAGE("console-centrifugal"),
    teaser: "Насосы с консольным креплением рабочего колеса на валу электродвигателя"
  },
  {
    id: "submersible-sewage",
    name: "Погружные канализационные насосы",
    image: PUMP_SUBCATEGORY_IMAGE("submersible-sewage"),
    teaser: "Погружные насосы для откачки сточных и дренажных вод"
  }
] as const;

export type PumpSubcategory = (typeof PUMP_SUBCATEGORIES)[number];

export const PUMP_THREE_SPEED_SUBCATEGORY =
  PUMP_SUBCATEGORIES.find((item) => item.id === "three-speed-wet-rotor")!.name;

const PUMP_SPEC_MODEL = "Модель";

const PUMP_DESIGNATION_IMAGES = {
  UPS: "/media/categories/pumps/designation-ups.png",
  GEB: "/media/categories/pumps/designation-geb.png",
  GEM: "/media/categories/pumps/designation-gem.png",
  "GS-F": "/media/categories/pumps/three-speed-designation.webp",
  CDL: "/media/categories/pumps/designation-cdl.png",
  CHT: "/media/categories/pumps/designation-cht.webp",
  CHL: "/media/categories/pumps/designation-chl.webp",
  GFM: "/media/categories/pumps/designation-gfm.webp",
  GSM: "/media/categories/pumps/designation-gsm.webp",
  WQ: "/media/categories/pumps/designation-wq.webp"
} as const;

export function getPumpModelFromSpecs(specs: Record<string, string>): string | null {
  return specs[PUMP_SPEC_MODEL] ?? null;
}

export function getPumpDesignationImage(model: string): string | null {
  const normalized = model.toUpperCase();

  if (normalized.startsWith("UPS")) return PUMP_DESIGNATION_IMAGES.UPS;
  if (normalized.startsWith("GEB")) return PUMP_DESIGNATION_IMAGES.GEB;
  if (normalized.startsWith("GEM")) return PUMP_DESIGNATION_IMAGES.GEM;
  if (normalized.startsWith("GSM")) return PUMP_DESIGNATION_IMAGES.GSM;
  if (/\d+WQ/i.test(normalized)) return PUMP_DESIGNATION_IMAGES.WQ;
  if (/WQK/i.test(normalized)) return PUMP_DESIGNATION_IMAGES.WQ;
  if (normalized.startsWith("GS")) return PUMP_DESIGNATION_IMAGES["GS-F"];
  if (normalized.startsWith("CDLF") || normalized.startsWith("CDL")) {
    return PUMP_DESIGNATION_IMAGES.CDL;
  }
  if (normalized.startsWith("CHT")) return PUMP_DESIGNATION_IMAGES.CHT;
  if (normalized.startsWith("CHL") || normalized.startsWith("CHS")) {
    return PUMP_DESIGNATION_IMAGES.CHL;
  }
  if (normalized.startsWith("GF")) return PUMP_DESIGNATION_IMAGES.GFM;

  return null;
}

export function getPumpDesignationAlt(model: string): string {
  if (/\d+WQ/i.test(model)) return "Схема расшифровки обозначения насоса WQ";
  if (/WQK/i.test(model)) return "Схема расшифровки обозначения насоса WQK";

  const series =
    model.match(/^(UPS|GEB|GEM|GSM|GS|CDLF|CDL|CHT|CHL|CHS|GF)/i)?.[1]?.toUpperCase() ?? "насоса";
  return `Схема расшифровки обозначения насоса ${series === "GF" ? "GF(m)" : series}`;
}

export function isCompactPumpDesignation(model: string) {
  const normalized = model.toUpperCase();
  return (
    normalized.startsWith("CDL") ||
    normalized.startsWith("CHT") ||
    normalized.startsWith("CHL") ||
    normalized.startsWith("CHS") ||
    normalized.startsWith("GF") ||
    normalized.startsWith("GSM") ||
    /\d+WQ/i.test(normalized) ||
    /WQK/i.test(normalized)
  );
}

export function getProductSpecs(product: CatalogProduct): Record<string, string> {
  return product.specs ?? {};
}

export function getPumpSubcategory(product: CatalogProduct): string | null {
  return getProductSpecs(product)[PUMP_SPEC_SUBCATEGORY] ?? null;
}

export function filterPumpProducts(
  products: CatalogProduct[],
  subcategory: string | null | undefined
) {
  if (!subcategory) return products;
  return products.filter((product) => getPumpSubcategory(product) === subcategory);
}

function minPrice(products: CatalogProduct[]) {
  const prices = products.map((product) => product.price).filter((price) => price > 0);
  if (!prices.length) return null;
  return Math.min(...prices);
}

export function buildPumpSubcategoryClusters(products: CatalogProduct[]): CategoryCluster[] {
  return PUMP_SUBCATEGORIES.map((item) => {
    const subcategoryProducts = filterPumpProducts(products, item.name);

    return {
      hubId: `pump-subcategory-${item.id}`,
      name: item.name,
      label: item.name,
      teaser: item.teaser,
      imageUrl: item.image ?? PUMPS_CATEGORY_IMAGE,
      count: subcategoryProducts.length,
      minPrice: minPrice(subcategoryProducts),
      priceLabel: subcategoryProducts.length > 0 ? ON_REQUEST_PRICE_LABEL : undefined,
      href: catalogPath({
        kind: PRODUCT_KIND.GOODS,
        category: PUMPS_CATEGORY,
        subcategory: item.name
      })
    };
  });
}

export function pumpsCategoryHref() {
  return catalogPath({ kind: PRODUCT_KIND.GOODS, category: PUMPS_CATEGORY });
}

export function pumpsSubcategoryBreadcrumbs(subcategory: string) {
  return [
    { label: "Главная", href: "/" },
    { label: "Каталог", href: CATALOG_ROUTES.equipment },
    { label: "Насосы", href: pumpsCategoryHref() },
    { label: subcategory }
  ];
}

export function getPumpSubcategoryListingTitle(subcategory: string) {
  return subcategory;
}

/** Разделы фильтров в листинге насосов → ключи в `specs`. */
export const PUMP_FILTER_SECTIONS = [
  "Номинальный диаметр",
  "Пропускная способность",
  "Напор",
  "Материал корпуса"
] as const;

export type PumpFilterSection = (typeof PUMP_FILTER_SECTIONS)[number];

const PUMP_FILTER_SPEC_KEYS: Record<PumpFilterSection, readonly string[]> = {
  "Номинальный диаметр": [
    "Номинальный диаметр",
    "Присоединение",
    "Присоединение вход/выход"
  ],
  "Пропускная способность": ["Пропускная способность", "Номинальный расход"],
  "Материал корпуса": ["Материал корпуса"],
  Напор: ["Напор", "Номинальный напор"]
};

function stripPumpFilterUnit(value: string, section: PumpFilterSection) {
  if (section === "Пропускная способность") {
    return value.replace(/\s*м³\/ч\s*$/i, "").trim();
  }

  if (section === "Напор") {
    return value.replace(/\s*м\s*$/i, "").trim();
  }

  return value.trim();
}

const PUMP_INCH_TO_DN: Record<string, string> = {
  "1": "DN25",
  "1.25": "DN32",
  "1.5": "DN40",
  "2": "DN50"
};

function normalizePumpConnection(value: string) {
  const dnMatch = value.match(/^DN(\d+)/i);
  if (dnMatch) return `DN${dnMatch[1]}`;

  const sizeMatch = value.match(/^(\d+)x\d+$/i);
  if (sizeMatch) return `DN${sizeMatch[1]}`;

  const inchMatch = value.match(/^(\d+(?:\.\d+)?)\s*["″]?\s*[×x]/i);
  if (inchMatch) {
    const dn = PUMP_INCH_TO_DN[inchMatch[1]];
    if (dn) return dn;
  }

  return value;
}

function formatPumpFilterValue(section: PumpFilterSection, part: string) {
  const trimmed = part.trim();
  if (!trimmed) return "";

  if (section === "Пропускная способность") {
    return `${trimmed} м³/ч`;
  }

  if (section === "Напор") {
    return `${trimmed} м`;
  }

  if (section === "Номинальный диаметр") {
    return normalizePumpConnection(trimmed);
  }

  return trimmed;
}

function expandPumpSpecFilterValues(section: PumpFilterSection, raw: string) {
  const stripped = stripPumpFilterUnit(raw, section);

  if (section === "Пропускная способность" || section === "Напор") {
    const parts = stripped.includes(" / ") ? stripped.split(" / ") : [stripped];
    return parts
      .map((part) => formatPumpFilterValue(section, part))
      .filter((value): value is string => Boolean(value));
  }

  const formatted = formatPumpFilterValue(section, stripped);
  return formatted ? [formatted] : [];
}

export function isPumpFilterSection(section: string): section is PumpFilterSection {
  return (PUMP_FILTER_SECTIONS as readonly string[]).includes(section);
}

export function getPumpSpecFilterValues(product: CatalogProduct, section: PumpFilterSection) {
  const specs = getProductSpecs(product);
  const values = new Set<string>();

  for (const key of PUMP_FILTER_SPEC_KEYS[section]) {
    const value = specs[key];
    if (!value) continue;

    for (const expanded of expandPumpSpecFilterValues(section, value)) {
      values.add(expanded);
    }
  }

  return [...values];
}

export function pumpMatchesSectionFilter(
  product: CatalogProduct,
  section: PumpFilterSection,
  value: string
) {
  return getPumpSpecFilterValues(product, section).includes(value);
}

function connectionSortWeight(value: string) {
  const dnMatch = value.match(/^DN(\d+)/i);
  if (dnMatch) return Number(dnMatch[1]);
  if (value.startsWith('G1½"') || value.startsWith("G1½")) return 40;
  if (value.startsWith('G1"') || value.startsWith("G1")) return 32;
  if (value.startsWith('1½"') || value.startsWith("1½")) return 40;
  if (value.startsWith('2"') || value.startsWith("2")) return 50;
  return 999;
}

function numericSpecSortValue(value: string) {
  const match = value.match(/^([\d,]+)/);
  return match ? parseFloat(match[1].replace(",", ".")) : 0;
}

function sortPumpFilterOptions(section: PumpFilterSection, values: string[]) {
  if (section === "Напор" || section === "Пропускная способность") {
    return values.sort(
      (left, right) => numericSpecSortValue(left) - numericSpecSortValue(right)
    );
  }

  if (section === "Номинальный диаметр") {
    return values.sort((left, right) => connectionSortWeight(left) - connectionSortWeight(right));
  }

  if (section === "Материал корпуса") {
    const order = ["чугун", "нержав. сталь"];
    return values.sort((left, right) => order.indexOf(left) - order.indexOf(right));
  }

  return values.sort((left, right) => left.localeCompare(right, "ru"));
}

export function collectPumpFilterOptions(
  products: CatalogProduct[],
  section: PumpFilterSection
) {
  const values = new Set<string>();

  for (const product of products) {
    for (const value of getPumpSpecFilterValues(product, section)) {
      values.add(value);
    }
  }

  return sortPumpFilterOptions(section, [...values]);
}
