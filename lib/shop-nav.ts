import {
  CATALOG_FILTER_PARAMS,
  catalogPath,
  EQUIPMENT_HEADER_CATALOG_ITEMS,
  PRODUCT_KIND
} from "@/lib/catalog";

export type HeaderNavChild = {
  label: string;
  href: string;
  imageUrl?: string | null;
  match: (pathname: string, search?: string) => boolean;
};

export type ShopNavItem = {
  href: string;
  label: string;
  match: (pathname: string, search?: string) => boolean;
  /** Показать шеврон (каталог / услуги). */
  dropdown?: boolean;
  children?: HeaderNavChild[];
};

const equipmentCategoryParam = CATALOG_FILTER_PARAMS.equipment.category;

const CATALOG_NAV_IMAGES: Partial<Record<string, string>> = {
  "Счётчики газа": "/media/products/smt/smt-kompleks.webp",
  Телеметрия: "/media/products/smt/bpek-02-ck.webp",
  ПО: "/media/products/software/gazset-standart.webp",
  "Дополнительное оборудование": "/media/products/accessories/bpek-ek-cable.webp",
  Насосы: "/media/categories/pumps.webp"
};

export const HEADER_CATALOG_CHILDREN: HeaderNavChild[] = EQUIPMENT_HEADER_CATALOG_ITEMS.map(
  (item) => ({
    label: item.label,
    href: catalogPath({ kind: PRODUCT_KIND.GOODS, category: item.name }),
    imageUrl:
      ("image" in item && item.image ? item.image : CATALOG_NAV_IMAGES[item.label]) ?? null,
    match: (pathname, search = "") =>
      pathname === "/oborudovanie" &&
      new URLSearchParams(search).get(equipmentCategoryParam) === item.name
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

function matchNavChildren(children: HeaderNavChild[], pathname: string, search = "") {
  return children.some((child) => child.match(pathname, search));
}

/** Пункты в шапке как на макете. */
export const HEADER_NAV_LINKS: ShopNavItem[] = [
  {
    href: "/oborudovanie",
    label: "Каталог",
    dropdown: true,
    children: HEADER_CATALOG_CHILDREN,
    match: (pathname, search) =>
      pathname === "/oborudovanie" || matchNavChildren(HEADER_CATALOG_CHILDREN, pathname, search)
  },
  {
    href: "/uslugi",
    label: "Услуги",
    dropdown: true,
    children: HEADER_SERVICES_CHILDREN,
    match: (pathname, search) =>
      pathname === "/uslugi" || matchNavChildren(HEADER_SERVICES_CHILDREN, pathname, search)
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
  ...HEADER_NAV_LINKS,
  {
    href: "/zakazy",
    label: "История заказов",
    match: (pathname) => pathname === "/zakazy"
  }
];

export function isShopNavActive(pathname: string, item: ShopNavItem, search = "") {
  return item.match(pathname, search);
}

export function isHeaderNavChildActive(pathname: string, child: HeaderNavChild, search = "") {
  if (pathname === "/") return false;
  return child.match(pathname, search);
}

/** Подсветка пунктов шапки: на главной ничего не активно. */
export function isHeaderNavActive(pathname: string, item: ShopNavItem, search = "") {
  if (pathname === "/") return false;
  return isShopNavActive(pathname, item, search);
}
