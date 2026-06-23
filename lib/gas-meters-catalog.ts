import type { CatalogProduct } from "@/components/ProductCard";
import type { CategoryCluster } from "@/lib/catalog-data";
import { CATALOG_ROUTES, catalogPath, PRODUCT_KIND } from "@/lib/catalog";

export const GAS_METERS_CATEGORY = "Счётчики газа";

export const GAS_METER_SUBCATEGORY_SMT = "СМТ-Комплексы";
export const GAS_METER_SUBCATEGORY_MEMBRANE = "Мембранные";
export const GAS_METER_SUBCATEGORY_ROTARY = "Ротационные";
export const GAS_METER_SUBCATEGORY_TURBINE = "Турбинные";
export const GAS_METER_SUBCATEGORY_SG_TK = "Комплексы СГ-ТК";
export const GAS_METER_SUBCATEGORY_SG_TK_T = "СГ-ТК-Т (на базе турбинных счетчиков газа)";
export const GAS_METER_SUBCATEGORY_SG_TK_R = "СГ-ТК-Р (на базе ротационных счетчиков газа)";
export const GAS_METER_SUBCATEGORY_SG_TK_D = "СГ-ТК-Д (на базе диафрагменных счетчиков газа)";
/** @deprecated Старое значение в БД — нормализуется в getGasMeterSubcategory */
export const GAS_METER_SUBCATEGORY_SG_TK_D_LEGACY =
  "Комплексы СГ-ТК-Д на базе диафрагменных счетчиков";
/** @deprecated Старое значение в БД — нормализуется в getGasMeterSubcategory */
export const GAS_METER_SUBCATEGORY_SG_TK_R_LEGACY =
  "Комплексы СГ-ТК на базе ротационных счетчиков";
export const GAS_METER_SUBCATEGORY_SG_EK = "Комплексы СГ-ЭК";
const GAS_METER_SUBCATEGORY_SG_EK_LEGACY = "Комплекс СГ-ЭК";

export const GAS_METER_FILTER_TYPE_SG_TK = GAS_METER_SUBCATEGORY_SG_TK;
export const GAS_METER_FILTER_TYPE_SG_EK = "Комплексы СГ-ЭК";

const GAS_METER_SUBCATEGORIES_SG_TK = [
  GAS_METER_SUBCATEGORY_SG_TK_T,
  GAS_METER_SUBCATEGORY_SG_TK_R,
  GAS_METER_SUBCATEGORY_SG_TK_D,
  GAS_METER_SUBCATEGORY_SG_TK_D_LEGACY,
  GAS_METER_SUBCATEGORY_SG_TK_R_LEGACY
] as const;

export const GAS_METER_SPEC_SUBCATEGORY = "Подкатегория";
export const GAS_METER_SPEC_MANUFACTURER = "Производитель";
export const GAS_METER_SPEC_TYPE_SIZE = "Типоразмер";
export const GAS_METER_SPEC_TYPE_SIZES = "Типоразмеры";
export const GAS_METER_SPEC_PURPOSE = "Назначение";
export const GAS_METER_PURPOSE_HOUSEHOLD = "Бытовые";
export const GAS_METER_PURPOSE_COMMUNAL = "Коммунальные";
export const GAS_METER_PURPOSE_INDUSTRIAL = "Промышленные";
export const GAS_METER_TYPE_SIZE_FILTER = "Типоразмер";

export function getProductSpecs(product: CatalogProduct): Record<string, string> {
  return product.specs ?? {};
}

export function getGasMeterSubcategory(product: CatalogProduct): string | null {
  const subcategory = getProductSpecs(product)[GAS_METER_SPEC_SUBCATEGORY] ?? null;
  if (subcategory === GAS_METER_SUBCATEGORY_SG_EK_LEGACY) {
    return GAS_METER_SUBCATEGORY_SG_EK;
  }
  if (subcategory === GAS_METER_SUBCATEGORY_SG_TK_D_LEGACY) {
    return GAS_METER_SUBCATEGORY_SG_TK_D;
  }
  if (subcategory === GAS_METER_SUBCATEGORY_SG_TK_R_LEGACY) {
    return GAS_METER_SUBCATEGORY_SG_TK_R;
  }
  return subcategory;
}

export function isGasMeterSgTkChildSubcategory(subcategory: string) {
  return (
    subcategory === GAS_METER_SUBCATEGORY_SG_TK_T ||
    subcategory === GAS_METER_SUBCATEGORY_SG_TK_R ||
    subcategory === GAS_METER_SUBCATEGORY_SG_TK_D ||
    subcategory === GAS_METER_SUBCATEGORY_SG_TK_D_LEGACY ||
    subcategory === GAS_METER_SUBCATEGORY_SG_TK_R_LEGACY
  );
}

export function isSgTkGasMeterProduct(specs?: Record<string, string> | null) {
  const subcategory = specs?.[GAS_METER_SPEC_SUBCATEGORY];
  return subcategory
    ? GAS_METER_SUBCATEGORIES_SG_TK.includes(
        subcategory as (typeof GAS_METER_SUBCATEGORIES_SG_TK)[number]
      )
    : false;
}

export function isSgEkGasMeterProduct(specs?: Record<string, string> | null) {
  const subcategory = specs?.[GAS_METER_SPEC_SUBCATEGORY];
  return subcategory === GAS_METER_SUBCATEGORY_SG_EK || subcategory === GAS_METER_SUBCATEGORY_SG_EK_LEGACY;
}

export function gasMeterMatchesTypeFilter(product: CatalogProduct, value: string) {
  const subcategory = getGasMeterSubcategory(product);

  if (value === GAS_METER_FILTER_TYPE_SG_TK) {
    return isSgTkGasMeterProduct(product.specs);
  }

  if (value === GAS_METER_FILTER_TYPE_SG_EK) {
    return isSgEkGasMeterProduct(product.specs);
  }

  return subcategory === value;
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

export function isOnRequestGasMeterProduct(
  specs?: Record<string, string> | null,
  price?: number | null
) {
  if (price != null && price > 0) {
    return false;
  }

  return (
    isMembraneGasMeterProduct(specs) ||
    isRotaryGasMeterProduct(specs) ||
    isTurbineGasMeterProduct(specs) ||
    isSgTkGasMeterProduct(specs) ||
    specs?.[GAS_METER_SPEC_SUBCATEGORY] === GAS_METER_SUBCATEGORY_SG_EK
  );
}

export function filterGasMeterProducts(
  products: CatalogProduct[],
  subcategory: string | null | undefined
) {
  if (!subcategory) return products;
  return products.filter((product) => getGasMeterSubcategory(product) === subcategory);
}

function filterSgTkGasMeterProducts(products: CatalogProduct[]) {
  return products.filter((product) => isSgTkGasMeterProduct(product.specs));
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
  const sgTkProducts = filterSgTkGasMeterProducts(products);
  const sgEkProducts = filterGasMeterProducts(products, GAS_METER_SUBCATEGORY_SG_EK);

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
        "Ротационные счётчики газа РГ-Р, RVG и RABO для промышленного и коммерческого учёта природного газа",
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
    },
    {
      hubId: "gas-meter-subcategory-sg-tk",
      name: GAS_METER_SUBCATEGORY_SG_TK,
      label: GAS_METER_SUBCATEGORY_SG_TK,
      teaser:
        "Комплексы СГ-ТК с электронной коррекцией на базе турбинных, ротационных и диафрагменных счётчиков газа",
      imageUrl: "/media/products/sg-tk/sg-tk-01.webp",
      count: sgTkProducts.length,
      minPrice: minPrice(sgTkProducts),
      href: catalogPath({
        kind: PRODUCT_KIND.GOODS,
        category: GAS_METERS_CATEGORY,
        subcategory: GAS_METER_SUBCATEGORY_SG_TK
      })
    },
    {
      hubId: "gas-meter-subcategory-sg-ek",
      name: GAS_METER_SUBCATEGORY_SG_EK,
      label: GAS_METER_SUBCATEGORY_SG_EK,
      teaser:
        "Комплексы СГ-ЭК для коммерческого учёта газа с электронной коррекцией по температуре, давлению и коэффициенту сжимаемости",
      imageUrl: "/media/products/sg-ek/sg-ek-section.webp",
      count: sgEkProducts.length,
      minPrice: minPrice(sgEkProducts),
      href: catalogPath({
        kind: PRODUCT_KIND.GOODS,
        category: GAS_METERS_CATEGORY,
        subcategory: GAS_METER_SUBCATEGORY_SG_EK
      })
    }
  ];
}

export function buildGasMeterSgTkVariantClusters(products: CatalogProduct[]): CategoryCluster[] {
  const sgTkTProducts = filterGasMeterProducts(products, GAS_METER_SUBCATEGORY_SG_TK_T);
  const sgTkRProducts = filterGasMeterProducts(products, GAS_METER_SUBCATEGORY_SG_TK_R);
  const sgTkDProducts = filterGasMeterProducts(products, GAS_METER_SUBCATEGORY_SG_TK_D);

  return [
    {
      hubId: "gas-meter-sg-tk-variant-t",
      name: GAS_METER_SUBCATEGORY_SG_TK_T,
      label: GAS_METER_SUBCATEGORY_SG_TK_T,
      teaser:
        "Комплексы СГ-ТК-Т на базе турбинных счетчиков газа с электронной коррекцией по температуре",
      imageUrl: "/media/products/rgt/rgt-turbine-01.webp",
      count: sgTkTProducts.length,
      minPrice: minPrice(sgTkTProducts),
      href: catalogPath({
        kind: PRODUCT_KIND.GOODS,
        category: GAS_METERS_CATEGORY,
        subcategory: GAS_METER_SUBCATEGORY_SG_TK_T
      })
    },
    {
      hubId: "gas-meter-sg-tk-variant-r",
      name: GAS_METER_SUBCATEGORY_SG_TK_R,
      label: GAS_METER_SUBCATEGORY_SG_TK_R,
      teaser:
        "Комплексы СГ-ТК-Р на базе ротационных счетчиков газа с электронной коррекцией по температуре",
      imageUrl: "/media/products/sg-tk/sg-tk-01.webp",
      count: sgTkRProducts.length,
      minPrice: minPrice(sgTkRProducts),
      href: catalogPath({
        kind: PRODUCT_KIND.GOODS,
        category: GAS_METERS_CATEGORY,
        subcategory: GAS_METER_SUBCATEGORY_SG_TK_R
      })
    },
    {
      hubId: "gas-meter-sg-tk-variant-d",
      name: GAS_METER_SUBCATEGORY_SG_TK_D,
      label: GAS_METER_SUBCATEGORY_SG_TK_D,
      teaser:
        "Комплексы СГ-ТК-Д на базе диафрагменных счетчиков газа BK с электронной коррекцией по температуре",
      imageUrl: "/media/products/sg-tk/sg-tk-01.webp",
      count: sgTkDProducts.length,
      minPrice: minPrice(sgTkDProducts),
      href: catalogPath({
        kind: PRODUCT_KIND.GOODS,
        category: GAS_METERS_CATEGORY,
        subcategory: GAS_METER_SUBCATEGORY_SG_TK_D
      })
    }
  ];
}

export function gasMetersCategoryHref() {
  return catalogPath({ kind: PRODUCT_KIND.GOODS, category: GAS_METERS_CATEGORY });
}

export function gasMetersSgTkLandingHref() {
  return catalogPath({
    kind: PRODUCT_KIND.GOODS,
    category: GAS_METERS_CATEGORY,
    subcategory: GAS_METER_SUBCATEGORY_SG_TK
  });
}

export function gasMetersSubcategoryBreadcrumbs(subcategory: string) {
  const crumbs: { label: string; href?: string }[] = [
    { label: "Главная", href: "/" },
    { label: "Каталог", href: CATALOG_ROUTES.equipment },
    { label: "Счётчики газа", href: gasMetersCategoryHref() }
  ];

  if (subcategory === GAS_METER_SUBCATEGORY_SG_TK) {
    crumbs.push({ label: GAS_METER_SUBCATEGORY_SG_TK });
    return crumbs;
  }

  if (isGasMeterSgTkChildSubcategory(subcategory)) {
    crumbs.push({
      label: GAS_METER_SUBCATEGORY_SG_TK,
      href: gasMetersSgTkLandingHref()
    });
    crumbs.push({ label: getGasMeterSubcategoryListingTitle(subcategory) });
    return crumbs;
  }

  crumbs.push({ label: subcategory });
  return crumbs;
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
  if (subcategory === GAS_METER_SUBCATEGORY_SG_TK) {
    return GAS_METER_SUBCATEGORY_SG_TK;
  }
  if (subcategory === GAS_METER_SUBCATEGORY_SG_TK_T) {
    return GAS_METER_SUBCATEGORY_SG_TK_T;
  }
  if (subcategory === GAS_METER_SUBCATEGORY_SG_TK_D) {
    return GAS_METER_SUBCATEGORY_SG_TK_D;
  }
  if (subcategory === GAS_METER_SUBCATEGORY_SG_TK_R) {
    return GAS_METER_SUBCATEGORY_SG_TK_R;
  }
  if (subcategory === GAS_METER_SUBCATEGORY_SG_EK) {
    return GAS_METER_SUBCATEGORY_SG_EK;
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

export function countGasMeterProductsWithTypeSize(products: CatalogProduct[]) {
  return products.filter((product) => getGasMeterTypeSizes(product).length > 0).length;
}
