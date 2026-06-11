export const PRODUCT_KIND = {
  GOODS: "Товар",
  SERVICE: "Услуга"
} as const;

export type ProductKind = (typeof PRODUCT_KIND)[keyof typeof PRODUCT_KIND];

export const SERVICE_CATEGORY_METAL = "Металлообработка";

/** Служебная позиция для заявок с формы консультации — не показывается в каталоге. */
export const CONSULTATION_PRODUCT_SLUG = "zayavka-konsultaciya";

export const CATALOG_SECTION = {
  equipment: "equipment",
  services: "services",
  metalworking: "metalworking",
  catalog: "catalog"
} as const;

export type CatalogSectionId = (typeof CATALOG_SECTION)[keyof typeof CATALOG_SECTION];

/** Отдельные query-параметры фильтров для блоков на главной. */
export const CATALOG_FILTER_PARAMS = {
  equipment: {
    q: "equipment_q",
    category: "equipment_category",
    subcategory: "equipment_subcategory",
    list: "equipment_list",
    sort: "equipment_sort"
  },
  services: {
    q: "services_q",
    category: "services_category",
    list: "services_list"
  }
} as const;

export type CatalogBlockId = keyof typeof CATALOG_FILTER_PARAMS;

export const CATALOG_ROUTES = {
  home: "/",
  equipment: "/oborudovanie",
  services: "/uslugi"
} as const;

/** @deprecated Используйте CATALOG_ROUTES.home */
export const CATALOG_ROUTE_HOME = CATALOG_ROUTES.home;

export type ClusterPresentation = {
  title: string;
  teaser: string;
};

export const EQUIPMENT_CLUSTER_PRESENTATION: Record<string, ClusterPresentation> = {
  "Газорегуляторные пункты": {
    title: "Регуляторы давления",
    teaser:
      "Газорегуляторные пункты и шкафы для стабильного давления газа на объекте любой мощности"
  },
  "Счётчики газа": {
    title: "Счётчики газа",
    teaser:
      "Бытовые и промышленные газовые счётчики для точного учёта газа в любых условиях эксплуатации"
  },
  Телеметрия: {
    title: "Телеметрия",
    teaser:
      "Цифровые коммуникационные блоки БПЭК для удалённого сбора данных с корректоров и счётчиков газа"
  },
  ПО: {
    title: "ПО",
    teaser:
      "Программное обеспечение для сбора, хранения и анализа данных с приборов учёта газа"
  },
  "Дополнительное оборудование": {
    title: "Дополнительное оборудование",
    teaser: "Кабели, комплектующие и аксессуары для подключения приборов учёта и телеметрии"
  },
  "Узлы учета газа": {
    title: "Узлы учета газа",
    teaser:
      "Прайс-лист и актуальные комплектации можно запросить у отдела продаж — подберём узел под ваш проект"
  },
  "Узлы учета": {
    title: "Сигнализаторы загазованности",
    teaser:
      "Сигнализаторы загазованности для контроля концентрации газа в жилых и промышленных помещениях"
  },
  Фильтры: {
    title: "Фильтры и фитинги",
    teaser: "Фильтры и комплектующие для очистки газа перед регуляторами и приборами учёта"
  },
  Насосы: {
    title: "Насосы",
    teaser: "Насосное оборудование для водоснабжения, отопления и технологических систем"
  },
  "Краны шаровые": {
    title: "Краны шаровые",
    teaser: "Шаровые краны для перекрытия потока воды, пара и неагрессивных сред"
  },
  "Запорная арматура": {
    title: "Запорная арматура",
    teaser: "Предохранительно-запорная арматура для защиты газовых линий и пунктов редуцирования"
  }
};

export const SERVICE_CLUSTER_PRESENTATION: Record<string, ClusterPresentation> = {
  Металлообработка: {
    title: "Металлообработка",
    teaser: "Сварка, гибка, сверление, 3D-печать и другие операции"
  },
  Инжиниринг: {
    title: "Проектирование",
    teaser: "Техническое решение и комплект документации"
  },
  Сервис: {
    title: "Сервисное обслуживание",
    teaser: "Диагностика, настройка и регламентные работы"
  }
};

export const EQUIPMENT_SORT = {
  popular: "popular",
  priceAsc: "price_asc",
  priceDesc: "price_desc"
} as const;

export type EquipmentSort = (typeof EQUIPMENT_SORT)[keyof typeof EQUIPMENT_SORT];

export function parseEquipmentSort(value: string | null | undefined): EquipmentSort {
  if (value === EQUIPMENT_SORT.priceAsc || value === EQUIPMENT_SORT.priceDesc) {
    return value;
  }
  return EQUIPMENT_SORT.popular;
}

/** Превью-картинки разделов каталога оборудования. */
export const EQUIPMENT_CATEGORY_IMAGES: Partial<Record<string, string>> = {
  "Счётчики газа": "/media/products/smt/smt-kompleks.webp",
  Телеметрия: "/media/products/smt/bpek-02-ck.webp",
  ПО: "/media/products/software/gazset-standart.webp",
  "Дополнительное оборудование": "/media/products/accessories/bpek-ek-cable.webp",
  "Газорегуляторные пункты": "/media/categories/regulator-davleniya.webp",
  "Узлы учета газа": "/media/products/gas-metering-units/uzel-ucheta-gaza.webp",
  "Узлы учета": "/media/categories/signalizator-zagazovannosti.webp",
  Фильтры: "/media/categories/filtr.webp",
  Насосы: "/media/categories/pumps.webp",
  "Краны шаровые": "/media/categories/zapornyy-kran.webp",
  "Запорная арматура": "/media/categories/zapornaya-armatura.webp"
};

export function resolveEquipmentClusterImage(name: string, fallback: string | null) {
  return EQUIPMENT_CATEGORY_IMAGES[name] ?? fallback;
}

/** Превью разделов каталога услуг. */
export const SERVICE_CATEGORY_IMAGES: Partial<Record<string, string>> = {
  Металлообработка: "/media/metalloobr.png"
};

export function resolveServiceClusterImage(name: string, fallback: string | null) {
  return SERVICE_CATEGORY_IMAGES[name] ?? fallback;
}

export function resolveCatalogClusterImage(
  name: string,
  kind: ProductKind,
  fallback: string | null
) {
  return kind === PRODUCT_KIND.GOODS
    ? resolveEquipmentClusterImage(name, fallback)
    : resolveServiceClusterImage(name, fallback);
}

export const EQUIPMENT_CLUSTER_ORDER = [
  "Газорегуляторные пункты",
  "Счётчики газа",
  "Телеметрия",
  "ПО",
  "Дополнительное оборудование",
  "Узлы учета газа",
  "Узлы учета",
  "Фильтры",
  "Насосы",
  "Краны шаровые",
  "Запорная арматура"
] as const;

export const SERVICE_CLUSTER_ORDER = [
  "Металлообработка",
  "Инжиниринг",
  "Сервис"
] as const;

/**
 * Карточки категорий на главной (полоса под баннером).
 * Фиксированный набор из 5 разделов — новые категории каталога сюда не добавляются.
 */
export const EQUIPMENT_PROMO_CATEGORIES = [
  { name: "Счётчики газа", label: "Счётчики газа" },
  {
    name: "Насосы",
    label: "Насосы",
    image: "/media/categories/pumps.webp"
  },
  {
    name: "Узлы учета газа",
    label: "Узлы учета газа",
    image: "/media/products/gas-metering-units/uzel-ucheta-gaza.webp"
  },
  {
    name: "Телеметрия",
    label: "Телеметрия",
    image: "/media/products/smt/bpek-02-ck.webp"
  },
  {
    name: "Краны шаровые",
    label: "Краны шаровые",
    image: "/media/categories/zapornyy-kran.webp"
  }
] as const;

export type EquipmentCatalogNavItem = {
  name: string;
  label: string;
  image?: string;
};

/** Убирает повторы по `name` (первое вхождение сохраняется). */
export function dedupeEquipmentCatalogNavItems<T extends EquipmentCatalogNavItem>(
  items: readonly T[]
): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.name)) return false;
    seen.add(item.name);
    return true;
  });
}

/** Пункты выпадающего «Каталог» в шапке и хаба /oborudovanie. */
export const EQUIPMENT_HEADER_CATALOG_ITEMS = dedupeEquipmentCatalogNavItems([
  { name: "Счётчики газа", label: "Счётчики газа" },
  {
    name: "Телеметрия",
    label: "Телеметрия",
    image: "/media/products/smt/bpek-02-ck.webp"
  },
  {
    name: "ПО",
    label: "ПО",
    image: "/media/products/software/gazset-standart.webp"
  },
  {
    name: "Дополнительное оборудование",
    label: "Дополнительное оборудование",
    image: "/media/products/accessories/bpek-ek-cable.webp"
  },
  {
    name: "Краны шаровые",
    label: "Краны шаровые",
    image: "/media/categories/zapornyy-kran.webp"
  },
  {
    name: "Насосы",
    label: "Насосы",
    image: "/media/categories/pumps.webp"
  },
  {
    name: "Запорная арматура",
    label: "Запорная арматура",
    image: "/media/categories/zapornaya-armatura.webp"
  },
  {
    name: "Газорегуляторные пункты",
    label: "Регуляторы давления",
    image: "/media/categories/regulator-davleniya.webp"
  },
  {
    name: "Узлы учета газа",
    label: "Узлы учета газа",
    image: "/media/products/gas-metering-units/uzel-ucheta-gaza.webp"
  },
  {
    name: "Фильтры",
    label: "Фильтры и фитинги",
    image: "/media/categories/filtr.webp"
  }
]);

/** Порядок и подписи карточек категорий на главной (как в макете). */
export const HOME_CATEGORY_STRIP = [
  { name: "Счётчики газа", kind: PRODUCT_KIND.GOODS, label: "Счётчики газа" },
  { name: "Краны шаровые", kind: PRODUCT_KIND.GOODS, label: "Краны шаровые" },
  { name: "Запорная арматура", kind: PRODUCT_KIND.GOODS, label: "Запорная арматура" },
  { name: "Газорегуляторные пункты", kind: PRODUCT_KIND.GOODS, label: "Газовые шкафы" },
  { name: "Фильтры", kind: PRODUCT_KIND.GOODS, label: "Фильтры" },
  { name: SERVICE_CATEGORY_METAL, kind: PRODUCT_KIND.SERVICE, label: "Металло обработка" }
] as const;

export function sortClusters<T extends { name: string }>(
  clusters: T[],
  order: readonly string[]
): T[] {
  const rank = new Map(order.map((name, index) => [name, index]));
  return [...clusters].sort((a, b) => {
    const left = rank.get(a.name) ?? 999;
    const right = rank.get(b.name) ?? 999;
    if (left !== right) return left - right;
    return a.name.localeCompare(b.name, "ru");
  });
}

export function clusterPresentation(name: string, kind: ProductKind): ClusterPresentation {
  const map =
    kind === PRODUCT_KIND.GOODS
      ? EQUIPMENT_CLUSTER_PRESENTATION
      : SERVICE_CLUSTER_PRESENTATION;
  return map[name] ?? { title: name, teaser: `Раздел «${name}»` };
}

export function catalogRouteFromBlock(block: CatalogBlockId): string {
  return CATALOG_ROUTES[block];
}

/** Базовый путь для фильтров: остаёмся на текущей странице каталога, если она подходит блоку. */
export function resolveCatalogBasePath(pathname: string, block: CatalogBlockId): string {
  const blockRoute = catalogRouteFromBlock(block);
  if (pathname === blockRoute) {
    return pathname;
  }
  return blockRoute;
}

export function catalogBlockFromKind(kind?: ProductKind): CatalogBlockId | undefined {
  if (kind === PRODUCT_KIND.GOODS) return "equipment";
  if (kind === PRODUCT_KIND.SERVICE) return "services";
  return undefined;
}

export function isProductKind(value: string | undefined): value is ProductKind {
  return value === PRODUCT_KIND.GOODS || value === PRODUCT_KIND.SERVICE;
}

export function catalogPath(options?: {
  kind?: ProductKind;
  block?: CatalogBlockId;
  category?: string;
  subcategory?: string;
  q?: string;
  list?: boolean;
  section?: CatalogSectionId;
}) {
  const params = new URLSearchParams();
  const block = options?.block ?? catalogBlockFromKind(options?.kind);

  if (block) {
    if (options?.category) {
      params.set(CATALOG_FILTER_PARAMS[block].category, options.category);
    }
    if (block === "equipment" && options?.subcategory) {
      params.set(CATALOG_FILTER_PARAMS.equipment.subcategory, options.subcategory);
    }
    if (options?.q) {
      params.set(CATALOG_FILTER_PARAMS[block].q, options.q);
    }
    if (options?.list) {
      params.set(CATALOG_FILTER_PARAMS[block].list, "1");
    }
  }

  const query = params.toString();
  const base = block ? catalogRouteFromBlock(block) : CATALOG_ROUTES.home;
  if (query) return `${base}?${query}`;
  return base;
}

/** Ссылка «назад в каталог» со страницы товара — раздел оборудования/услуг с фильтром по категории. */
export function getProductBackCatalogHref(product: {
  kind: string;
  category: string;
  specs?: Record<string, string> | null;
}) {
  if (product.kind === PRODUCT_KIND.SERVICE) {
    if (product.category === SERVICE_CATEGORY_METAL) {
      return CATALOG_ROUTES.services;
    }
    return catalogPath({ kind: PRODUCT_KIND.SERVICE, category: product.category });
  }
  if (product.kind === PRODUCT_KIND.GOODS) {
    const subcategory = product.specs?.["Подкатегория"];
    return catalogPath({
      kind: PRODUCT_KIND.GOODS,
      category: product.category,
      ...(subcategory ? { subcategory } : {})
    });
  }
  return CATALOG_ROUTES.equipment;
}
