import type { CatalogProduct } from "@/components/ProductCard";
import type { CategoryCluster } from "@/lib/catalog-data";
import { CATALOG_ROUTES, catalogPath, PRODUCT_KIND } from "@/lib/catalog";
import { GAS_METERS_CATEGORY } from "@/lib/equipment-category-config";

export const GAS_METER_SUBCATEGORY_SMT = "СМТ-Комплексы";
export const GAS_METER_SUBCATEGORY_MEMBRANE = "Мембранные";
export const GAS_METER_SUBCATEGORY_ROTARY = "Ротационные";
export const GAS_METER_SUBCATEGORY_TURBINE = "Турбинные";

export const GAS_METER_SPEC_SUBCATEGORY = "Подкатегория";
export const GAS_METER_SPEC_MANUFACTURER = "Производитель";
export const GAS_METER_SPEC_TYPE_SIZE = "Типоразмер";
export const GAS_METER_SPEC_TYPE_SIZES = "Типоразмеры";
export const GAS_METER_SPEC_PURPOSE = "Назначение";
export const GAS_METER_TYPE_SIZE_FILTER = "Типоразмер";

export function getProductSpecs(product: CatalogProduct): Record<string, string> {
  return product.specs ?? {};
}

export function getGasMeterSubcategory(product: CatalogProduct): string | null {
  return getProductSpecs(product)[GAS_METER_SPEC_SUBCATEGORY] ?? null;
}

export function isMembraneGasMeterProduct(specs?: Record<string, string> | null) {
  return specs?.[GAS_METER_SPEC_SUBCATEGORY] === GAS_METER_SUBCATEGORY_MEMBRANE;
}

export function isRotaryGasMeterProduct(specs?: Record<string, string> | null) {
  return specs?.[GAS_METER_SPEC_SUBCATEGORY] === GAS_METER_SUBCATEGORY_ROTARY;
}

export function isTurbineGasMeterProduct(specs?: Record<string, string> | null) {
  return specs?.[GAS_METER_SPEC_SUBCATEGORY] === GAS_METER_SUBCATEGORY_TURBINE;
}

export function isOnRequestGasMeterProduct(specs?: Record<string, string> | null) {
  return (
    isMembraneGasMeterProduct(specs) ||
    isRotaryGasMeterProduct(specs) ||
    isTurbineGasMeterProduct(specs)
  );
}

export function filterGasMeterProducts(
  products: CatalogProduct[],
  subcategory: string | null | undefined
) {
  if (!subcategory) return products;
  return products.filter((product) => getGasMeterSubcategory(product) === subcategory);
}

function minPrice(products: CatalogProduct[]) {
  const prices = products.map((product) => product.price).filter((price) => price > 0);
  if (!prices.length) return null;
  return Math.min(...prices);
}

export function buildGasMeterSubcategoryClusters(products: CatalogProduct[]): CategoryCluster[] {
  const smtProducts = filterGasMeterProducts(products, GAS_METER_SUBCATEGORY_SMT);
  const membraneProducts = filterGasMeterProducts(products, GAS_METER_SUBCATEGORY_MEMBRANE);
  const rotaryProducts = filterGasMeterProducts(products, GAS_METER_SUBCATEGORY_ROTARY);
  const turbineProducts = filterGasMeterProducts(products, GAS_METER_SUBCATEGORY_TURBINE);

  return [
    {
      hubId: "gas-meter-subcategory-smt",
      name: GAS_METER_SUBCATEGORY_SMT,
      label: GAS_METER_SUBCATEGORY_SMT,
      teaser: "Микротермальные счётчики СМТ-Комплекс для бытового и коммерческого учёта газа",
      imageUrl: "/media/products/smt/smt-kompleks.webp",
      count: smtProducts.length,
      minPrice: minPrice(smtProducts),
      href: catalogPath({
        kind: PRODUCT_KIND.GOODS,
        category: GAS_METERS_CATEGORY,
        subcategory: GAS_METER_SUBCATEGORY_SMT
      })
    },
    {
      hubId: "gas-meter-subcategory-membrane",
      name: GAS_METER_SUBCATEGORY_MEMBRANE,
      label: GAS_METER_SUBCATEGORY_MEMBRANE,
      teaser: "Мембранные счётчики газа ТАУГАЗ и РАСКО для учёта природного газа",
      imageUrl: "/media/products/taugaz/taugaz-vkr-g4.png",
      count: membraneProducts.length,
      minPrice: minPrice(membraneProducts),
      href: catalogPath({
        kind: PRODUCT_KIND.GOODS,
        category: GAS_METERS_CATEGORY,
        subcategory: GAS_METER_SUBCATEGORY_MEMBRANE
      })
    },
    {
      hubId: "gas-meter-subcategory-rotary",
      name: GAS_METER_SUBCATEGORY_ROTARY,
      label: GAS_METER_SUBCATEGORY_ROTARY,
      teaser:
        "Ротационные счётчики газа РГ-Р для промышленного и коммерческого учёта природного газа",
      imageUrl: "/media/products/rgr/rgr-rotary-card.webp",
      count: rotaryProducts.length,
      minPrice: minPrice(rotaryProducts),
      href: catalogPath({
        kind: PRODUCT_KIND.GOODS,
        category: GAS_METERS_CATEGORY,
        subcategory: GAS_METER_SUBCATEGORY_ROTARY
      })
    },
    {
      hubId: "gas-meter-subcategory-turbine",
      name: GAS_METER_SUBCATEGORY_TURBINE,
      label: GAS_METER_SUBCATEGORY_TURBINE,
      teaser:
        "Турбинные счётчики газа РГ-Т для коммерческого и технологического учёта природного газа",
      imageUrl: "/media/products/rgt/rgt-turbine-01.webp",
      count: turbineProducts.length,
      minPrice: minPrice(turbineProducts),
      href: catalogPath({
        kind: PRODUCT_KIND.GOODS,
        category: GAS_METERS_CATEGORY,
        subcategory: GAS_METER_SUBCATEGORY_TURBINE
      })
    }
  ];
}

export function gasMetersCategoryHref() {
  return catalogPath({ kind: PRODUCT_KIND.GOODS, category: GAS_METERS_CATEGORY });
}

export function gasMetersSubcategoryBreadcrumbs(subcategory: string) {
  return [
    { label: "Главная", href: "/" },
    { label: "Каталог", href: CATALOG_ROUTES.equipment },
    { label: "Счётчики газа", href: gasMetersCategoryHref() },
    { label: subcategory }
  ];
}

export function getGasMeterSubcategoryListingTitle(subcategory: string) {
  if (subcategory === GAS_METER_SUBCATEGORY_MEMBRANE) {
    return "Мембранные счётчики";
  }
  if (subcategory === GAS_METER_SUBCATEGORY_ROTARY) {
    return "Ротационные счётчики";
  }
  if (subcategory === GAS_METER_SUBCATEGORY_TURBINE) {
    return "Турбинные счётчики";
  }
  if (subcategory === GAS_METER_SUBCATEGORY_SMT) {
    return GAS_METER_SUBCATEGORY_SMT;
  }
  return subcategory;
}

function splitGasMeterTypeSizeValue(raw: string) {
  return raw
    .split(/[;,]/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function getGasMeterTypeSizes(product: CatalogProduct): string[] {
  const specs = getProductSpecs(product);
  const values = new Set<string>();

  const single = specs[GAS_METER_SPEC_TYPE_SIZE];
  if (single) values.add(single.trim());

  const multiple = specs[GAS_METER_SPEC_TYPE_SIZES];
  if (multiple) {
    for (const value of splitGasMeterTypeSizeValue(multiple)) {
      values.add(value);
    }
  }

  return [...values];
}

export function gasMeterMatchesTypeSize(product: CatalogProduct, value: string) {
  return getGasMeterTypeSizes(product).includes(value);
}

function parseGasMeterTypeSizeNumeric(value: string) {
  const match = value.match(/^G([\d,]+)/i);
  if (!match) return Number.POSITIVE_INFINITY;
  return Number.parseFloat(match[1].replace(",", "."));
}

export function sortGasMeterTypeSizes(values: string[]) {
  return [...values].sort((left, right) => {
    const leftNumeric = parseGasMeterTypeSizeNumeric(left);
    const rightNumeric = parseGasMeterTypeSizeNumeric(right);
    if (leftNumeric !== rightNumeric) return leftNumeric - rightNumeric;
    return left.localeCompare(right, "ru");
  });
}

export function collectGasMeterTypeSizeOptions(products: CatalogProduct[]) {
  const values = new Set<string>();

  for (const product of products) {
    for (const size of getGasMeterTypeSizes(product)) {
      values.add(size);
    }
  }

  return sortGasMeterTypeSizes([...values]);
}
