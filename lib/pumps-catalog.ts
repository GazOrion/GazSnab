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
  "Номинальный диаметр": ["Номинальный диаметр", "Присоединение"],
  "Пропускная способность": ["Пропускная способность"],
  "Материал корпуса": ["Материал корпуса"],
  Напор: ["Напор"]
};

export function isPumpFilterSection(section: string): section is PumpFilterSection {
  return (PUMP_FILTER_SECTIONS as readonly string[]).includes(section);
}

export function getPumpSpecFilterValues(product: CatalogProduct, section: PumpFilterSection) {
  const specs = getProductSpecs(product);
  const values = new Set<string>();

  for (const key of PUMP_FILTER_SPEC_KEYS[section]) {
    const value = specs[key];
    if (value) values.add(value);
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
  if (value.startsWith("G1")) return 32;
  if (value.startsWith("1½")) return 40;
  if (value.startsWith("2")) return 50;
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
