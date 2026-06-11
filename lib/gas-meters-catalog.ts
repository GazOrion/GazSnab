import type { CatalogProduct } from "@/components/ProductCard";
import type { CategoryCluster } from "@/lib/catalog-data";
import { CATALOG_ROUTES, catalogPath, PRODUCT_KIND } from "@/lib/catalog";
import { GAS_METERS_CATEGORY } from "@/lib/equipment-category-config";

export const GAS_METER_SUBCATEGORY_SMT = "СМТ-Комплексы";
export const GAS_METER_SUBCATEGORY_MEMBRANE = "Мембранные";

export const GAS_METER_SPEC_SUBCATEGORY = "Подкатегория";
export const GAS_METER_SPEC_MANUFACTURER = "Производитель";

export function getProductSpecs(product: CatalogProduct): Record<string, string> {
  return product.specs ?? {};
}

export function getGasMeterSubcategory(product: CatalogProduct): string | null {
  return getProductSpecs(product)[GAS_METER_SPEC_SUBCATEGORY] ?? null;
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
      teaser: "Мембранные счётчики газа ТАУГАЗ серии ВКР для учёта природного газа",
      imageUrl: "/media/products/taugaz/taugaz-vkr-g4.png",
      count: membraneProducts.length,
      minPrice: minPrice(membraneProducts),
      href: catalogPath({
        kind: PRODUCT_KIND.GOODS,
        category: GAS_METERS_CATEGORY,
        subcategory: GAS_METER_SUBCATEGORY_MEMBRANE
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
  if (subcategory === GAS_METER_SUBCATEGORY_SMT) {
    return GAS_METER_SUBCATEGORY_SMT;
  }
  return subcategory;
}
