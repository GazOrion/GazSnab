import {
  catalogPath,
  EQUIPMENT_HEADER_CATALOG_ITEMS,
  PRODUCT_KIND
} from "@/lib/catalog";
import { parseEquipmentCatalogPath } from "@/lib/catalog-slugs";
import {
  GAS_METERS_CATEGORY,
  GAS_METER_SUBCATEGORY_MEMBRANE,
  GAS_METER_SUBCATEGORY_ROTARY,
  GAS_METER_SUBCATEGORY_SG_EK,
  GAS_METER_SUBCATEGORY_SG_TK,
  GAS_METER_SUBCATEGORY_SG_TK_D,
  GAS_METER_SUBCATEGORY_SG_TK_R,
  GAS_METER_SUBCATEGORY_SG_TK_T,
  GAS_METER_SUBCATEGORY_SMT,
  GAS_METER_SUBCATEGORY_TURBINE
} from "@/lib/gas-meters-catalog";
import { PUMPS_CATEGORY } from "@/lib/equipment-category-config";
import { PUMP_SUBCATEGORIES } from "@/lib/pumps-catalog";

export type HeaderNavChild = {
  label: string;
  href: string;
  imageUrl?: string | null;
  match: (pathname: string, search?: string) => boolean;
  children?: HeaderNavChild[];
};

export type ShopNavItem = {
  href: string;
  label: string;
  match: (pathname: string, search?: string) => boolean;
  /** Показать шеврон (каталог / услуги). */
  dropdown?: boolean;
  children?: HeaderNavChild[];
};

function matchEquipmentCategory(category: string, subcategory?: string) {
  return (pathname: string) => {
    const parsed = parseEquipmentCatalogPath(pathname.split("?")[0] ?? pathname);
    if (subcategory) {
      return parsed.categoryName === category && parsed.subcategoryName === subcategory;
    }
    return parsed.categoryName === category && !parsed.subcategoryName;
  };
}

function buildEquipmentSubcategoryNavChild(
  category: string,
  subcategory: string,
  label = subcategory
): HeaderNavChild {
  return {
    label,
    href: catalogPath({ kind: PRODUCT_KIND.GOODS, category, subcategory }),
    match: matchEquipmentCategory(category, subcategory)
  };
}

function buildGasMeterCatalogNavChildren(): HeaderNavChild[] {
  const sgTkChildren: HeaderNavChild[] = [
    GAS_METER_SUBCATEGORY_SG_TK_T,
    GAS_METER_SUBCATEGORY_SG_TK_R,
    GAS_METER_SUBCATEGORY_SG_TK_D
  ].map((subcategory) => buildEquipmentSubcategoryNavChild(GAS_METERS_CATEGORY, subcategory));

  return [
    buildEquipmentSubcategoryNavChild(GAS_METERS_CATEGORY, GAS_METER_SUBCATEGORY_SMT),
    buildEquipmentSubcategoryNavChild(GAS_METERS_CATEGORY, GAS_METER_SUBCATEGORY_MEMBRANE),
    buildEquipmentSubcategoryNavChild(GAS_METERS_CATEGORY, GAS_METER_SUBCATEGORY_ROTARY),
    buildEquipmentSubcategoryNavChild(GAS_METERS_CATEGORY, GAS_METER_SUBCATEGORY_TURBINE),
    {
      ...buildEquipmentSubcategoryNavChild(GAS_METERS_CATEGORY, GAS_METER_SUBCATEGORY_SG_TK),
      children: sgTkChildren
    },
    buildEquipmentSubcategoryNavChild(GAS_METERS_CATEGORY, GAS_METER_SUBCATEGORY_SG_EK)
  ];
}

function buildPumpCatalogNavChildren(): HeaderNavChild[] {
  return PUMP_SUBCATEGORIES.map((item) =>
    buildEquipmentSubcategoryNavChild(PUMPS_CATEGORY, item.name)
  );
}

const CATALOG_NESTED_CHILDREN: Partial<Record<string, HeaderNavChild[]>> = {
  [GAS_METERS_CATEGORY]: buildGasMeterCatalogNavChildren(),
  [PUMPS_CATEGORY]: buildPumpCatalogNavChildren()
};

const CATALOG_NAV_IMAGES: Partial<Record<string, string>> = {
  "Счётчики газа": "/media/products/smt/smt-kompleks.webp",
  Телеметрия: "/media/products/smt/bpek-02-ck.webp",
  ПО: "/media/products/software/gazset-standart.webp",
  "Дополнительное оборудование": "/media/products/accessories/antenna.webp",
  "Кабели БПЭК": "/media/products/accessories/bpek-ek-cable.webp",
  Насосы: "/media/categories/pumps.webp"
};

export const HEADER_CATALOG_CHILDREN: HeaderNavChild[] = EQUIPMENT_HEADER_CATALOG_ITEMS.map(
  (item) => ({
    label: item.label,
    href: catalogPath({ kind: PRODUCT_KIND.GOODS, category: item.name }),
    imageUrl:
      ("image" in item && item.image ? item.image : CATALOG_NAV_IMAGES[item.label]) ?? null,
    match: matchEquipmentCategory(item.name),
    children: CATALOG_NESTED_CHILDREN[item.name]
  })
);

const SERVICE_SLUGS = {
  bending: "gibka-listovogo-metalla",
  welding: "robotizirovannaya-svarka-metalla",
  sawing: "raspil-metalla-lentopilnyy",
  drilling: "sverlenie-metalla",
  printing: "3d-pechat-plastik-tpu"
} as const;

function matchServiceSlug(slug: string) {
  return (pathname: string) => pathname === `/products/${slug}`;
}

export const HEADER_SERVICES_CHILDREN: HeaderNavChild[] = [
  {
    label: "Гибка металла",
    href: `/products/${SERVICE_SLUGS.bending}`,
    imageUrl: `/media/services/${SERVICE_SLUGS.bending}.webp`,
    match: matchServiceSlug(SERVICE_SLUGS.bending)
  },
  {
    label: "Сварка",
    href: `/products/${SERVICE_SLUGS.welding}`,
    imageUrl: `/media/services/${SERVICE_SLUGS.welding}.webp`,
    match: matchServiceSlug(SERVICE_SLUGS.welding)
  },
  {
    label: "Распил металла",
    href: `/products/${SERVICE_SLUGS.sawing}`,
    imageUrl: `/media/services/${SERVICE_SLUGS.sawing}.webp`,
    match: matchServiceSlug(SERVICE_SLUGS.sawing)
  },
  {
    label: "Сверление металла",
    href: `/products/${SERVICE_SLUGS.drilling}`,
    imageUrl: `/media/services/${SERVICE_SLUGS.drilling}.webp`,
    match: matchServiceSlug(SERVICE_SLUGS.drilling)
  },
  {
    label: "3-D печать пластиком",
    href: `/products/${SERVICE_SLUGS.printing}`,
    imageUrl: `/media/services/${SERVICE_SLUGS.printing}.webp`,
    match: matchServiceSlug(SERVICE_SLUGS.printing)
  }
];

/** Пункты в шапке как на макете. */
export const HEADER_NAV_LINKS: ShopNavItem[] = [
  {
    href: "/oborudovanie",
    label: "Каталог",
    dropdown: true,
    children: HEADER_CATALOG_CHILDREN,
    match: (pathname) => {
      const cleanPath = pathname.split("?")[0] ?? pathname;
      return cleanPath === "/oborudovanie";
    }
  },
  {
    href: "/uslugi",
    label: "Услуги",
    dropdown: true,
    children: HEADER_SERVICES_CHILDREN,
    match: (pathname) => {
      const cleanPath = pathname.split("?")[0] ?? pathname;
      return cleanPath === "/uslugi";
    }
  },
  {
    href: "/o-kompanii",
    label: "О компании",
    match: (pathname) => pathname === "/o-kompanii"
  },
  {
    href: "/dostavka",
    label: "Доставка и оплата",
    match: (pathname) => pathname === "/dostavka"
  },
  {
    href: "/garantii",
    label: "Гарантии и возврат",
    match: (pathname) => pathname === "/garantii"
  }
];

/** Полное меню (мобильная панель). */
export const SHOP_NAV_LINKS: ShopNavItem[] = [
  {
    href: "/",
    label: "Главная",
    match: (pathname) => pathname === "/"
  },
  ...HEADER_NAV_LINKS
];

export function isShopNavActive(pathname: string, item: ShopNavItem, search = "") {
  return item.match(pathname, search);
}

/** Ветка меню содержит текущую страницу (для автораскрытия групп). */
export function isHeaderNavChildBranchActive(
  pathname: string,
  child: HeaderNavChild,
  search = ""
): boolean {
  if (pathname === "/") return false;
  if (child.match(pathname, search)) return true;
  return child.children?.some((nested) => isHeaderNavChildBranchActive(pathname, nested, search)) ?? false;
}

export function isShopNavBranchActive(pathname: string, item: ShopNavItem, search = "") {
  if (pathname === "/") return false;
  if (item.match(pathname, search)) return true;
  return item.children?.some((child) => isHeaderNavChildBranchActive(pathname, child, search)) ?? false;
}

/** Только прямое совпадение пункта (для подсветки активного). */
export function isHeaderNavChildActive(
  pathname: string,
  child: HeaderNavChild,
  search = ""
): boolean {
  if (pathname === "/") return false;
  return child.match(pathname, search);
}

/** Подсветка пунктов шапки: на главной ничего не активно. */
export function isHeaderNavActive(pathname: string, item: ShopNavItem, search = "") {
  if (pathname === "/") return false;
  return isShopNavActive(pathname, item, search);
}
