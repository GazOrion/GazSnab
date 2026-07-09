import type { CatalogProduct } from "@/components/ProductCard";
import {
  catalogPath,
  clusterPresentation,
  CONSULTATION_PRODUCT_SLUG,
  CATALOG_FILTER_PARAMS,
  CATALOG_ROUTES,
  EQUIPMENT_CLUSTER_ORDER,
  PRODUCT_KIND,
  SERVICE_CLUSTER_ORDER,
  SERVICE_CATEGORY_METAL
} from "@/lib/catalog";
import { catalogVisibilityWhere } from "@/lib/catalog-data";
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
import { prisma } from "@/lib/prisma";

export type SeoPageDefinition = {
  path: string;
  label: string;
  title: string;
  description: string;
};

const SITE_SUFFIX = "ОРИОН ГАЗСНАБ";

export const SEO_STATIC_PAGES: SeoPageDefinition[] = [
  {
    path: "/",
    label: "Главная",
    title: `${SITE_SUFFIX} — газовое оборудование и металлообработка`,
    description:
      "Поставка газового оборудования, металлообработка и сервис для промышленных объектов в Ростовской области"
  },
  {
    path: "/o-kompanii",
    label: "О компании",
    title: `О компании | ${SITE_SUFFIX}`,
    description: `${SITE_SUFFIX} — производство, поставка и сервис газового оборудования`
  },
  {
    path: "/oborudovanie",
    label: "Каталог оборудования",
    title: `Каталог оборудования | ${SITE_SUFFIX}`,
    description: "Готовое газовое оборудование — ГРПШ, счётчики, арматура и комплектующие"
  },
  {
    path: "/uslugi",
    label: "Услуги",
    title: `Услуги | ${SITE_SUFFIX}`,
    description: "Металлообработка, проектирование и сервисное обслуживание для промышленных объектов"
  },
  {
    path: "/dostavka",
    label: "Доставка и оплата",
    title: `Доставка и оплата | ${SITE_SUFFIX}`,
    description: "Условия доставки газового оборудования и способы оплаты"
  },
  {
    path: "/garantii",
    label: "Гарантии",
    title: `Гарантии и возврат | ${SITE_SUFFIX}`,
    description: "Гарантийные обязательства и условия возврата поставляемого оборудования"
  },
  {
    path: "/politika-konfidencialnosti",
    label: "Политика конфиденциальности",
    title: `Политика конфиденциальности | ${SITE_SUFFIX}`,
    description: `Политика обработки персональных данных ${SITE_SUFFIX}`
  },
  {
    path: "/cart",
    label: "Корзина",
    title: `Корзина | ${SITE_SUFFIX}`,
    description: "Оформление заявки на газовое оборудование и услуги"
  },
  {
    path: "/favorites",
    label: "Избранное",
    title: `Избранное | ${SITE_SUFFIX}`,
    description: "Сохранённые позиции каталога газового оборудования и услуг"
  },
  {
    path: "/rekvizity",
    label: "Реквизиты (редирект)",
    title: `Реквизиты | ${SITE_SUFFIX}`,
    description: "Реквизиты компании ОРИОН ГАЗСНАБ"
  },
  {
    path: `${CATALOG_ROUTES.equipment}?${CATALOG_FILTER_PARAMS.equipment.list}=1`,
    label: "Каталог: все товары",
    title: `Все позиции каталога | ${SITE_SUFFIX}`,
    description: "Полный список оборудования в каталоге"
  },
  {
    path: `${CATALOG_ROUTES.services}?${CATALOG_FILTER_PARAMS.services.list}=1`,
    label: "Услуги: все позиции",
    title: `Все услуги | ${SITE_SUFFIX}`,
    description: "Полный список услуг компании"
  }
];

function excerpt(text: string, max = 160) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trim()}…`;
}

function categoryPageDefinition(
  path: string,
  label: string,
  title: string,
  description: string
): SeoPageDefinition {
  return { path, label, title, description };
}

function equipmentCategoryPages(): SeoPageDefinition[] {
  return EQUIPMENT_CLUSTER_ORDER.map((name) => {
    const presentation = clusterPresentation(name, PRODUCT_KIND.GOODS);
    return categoryPageDefinition(
      catalogPath({ kind: PRODUCT_KIND.GOODS, category: name }),
      `Каталог: ${presentation.title}`,
      `${presentation.title} | ${SITE_SUFFIX}`,
      presentation.teaser
    );
  });
}

function gasMeterSubcategoryPages(): SeoPageDefinition[] {
  const subcategories = [
    { name: GAS_METER_SUBCATEGORY_SMT, teaser: "Микротермальные счётчики СМТ-Комплекс" },
    { name: GAS_METER_SUBCATEGORY_MEMBRANE, teaser: "Мембранные счётчики газа" },
    { name: GAS_METER_SUBCATEGORY_ROTARY, teaser: "Ротационные счётчики газа" },
    { name: GAS_METER_SUBCATEGORY_TURBINE, teaser: "Турбинные счётчики газа" },
    { name: GAS_METER_SUBCATEGORY_SG_TK, teaser: "Комплексы СГ-ТК с электронной коррекцией" },
    { name: GAS_METER_SUBCATEGORY_SG_TK_T, teaser: "Комплексы СГ-ТК-Т на базе турбинных счётчиков" },
    { name: GAS_METER_SUBCATEGORY_SG_TK_R, teaser: "Комплексы СГ-ТК-Р на базе ротационных счётчиков" },
    { name: GAS_METER_SUBCATEGORY_SG_TK_D, teaser: "Комплексы СГ-ТК-Д на базе диафрагменных счётчиков" },
    { name: GAS_METER_SUBCATEGORY_SG_EK, teaser: "Комплексы СГ-ЭК с электронной коррекцией" }
  ];

  return subcategories.map((item) =>
    categoryPageDefinition(
      catalogPath({
        kind: PRODUCT_KIND.GOODS,
        category: GAS_METERS_CATEGORY,
        subcategory: item.name
      }),
      `Счётчики газа: ${item.name}`,
      `${item.name} | ${SITE_SUFFIX}`,
      item.teaser
    )
  );
}

function pumpSubcategoryPages(): SeoPageDefinition[] {
  return PUMP_SUBCATEGORIES.map((item) =>
    categoryPageDefinition(
      catalogPath({
        kind: PRODUCT_KIND.GOODS,
        category: PUMPS_CATEGORY,
        subcategory: item.name
      }),
      `Насосы: ${item.name}`,
      `${item.name} | ${SITE_SUFFIX}`,
      item.teaser
    )
  );
}

function extraEquipmentCategoryPages(categoryNames: string[]): SeoPageDefinition[] {
  const known = new Set<string>(EQUIPMENT_CLUSTER_ORDER);
  return categoryNames
    .filter((name) => name && !known.has(name))
    .map((name) => {
      const presentation = clusterPresentation(name, PRODUCT_KIND.GOODS);
      return categoryPageDefinition(
        catalogPath({ kind: PRODUCT_KIND.GOODS, category: name }),
        `Каталог: ${presentation.title}`,
        `${presentation.title} | ${SITE_SUFFIX}`,
        presentation.teaser
      );
    });
}

function catalogCategoryPages(
  categories: { name: string; kind: string; title: string; teaser: string }[]
): SeoPageDefinition[] {
  return categories.flatMap((category) => {
    const kind =
      category.kind === PRODUCT_KIND.SERVICE ? PRODUCT_KIND.SERVICE : PRODUCT_KIND.GOODS;
    if (kind === PRODUCT_KIND.SERVICE && category.name === SERVICE_CATEGORY_METAL) {
      return [];
    }

    const presentation = clusterPresentation(category.name, kind);
    return [
      categoryPageDefinition(
        catalogPath({ kind, category: category.name }),
        kind === PRODUCT_KIND.SERVICE
          ? `Услуги: ${category.title || presentation.title}`
          : `Каталог: ${category.title || presentation.title}`,
        `${category.title || presentation.title} | ${SITE_SUFFIX}`,
        category.teaser || presentation.teaser
      )
    ];
  });
}

function serviceCategoryPages(serviceCategories: string[]): SeoPageDefinition[] {
  const names = new Set<string>(SERVICE_CLUSTER_ORDER);
  for (const name of serviceCategories) names.add(name);

  return [...names]
    .filter((name) => name !== SERVICE_CATEGORY_METAL)
    .map((name) => {
      const presentation = clusterPresentation(name, PRODUCT_KIND.SERVICE);
      return categoryPageDefinition(
        catalogPath({ kind: PRODUCT_KIND.SERVICE, category: name }),
        `Услуги: ${presentation.title}`,
        `${presentation.title} | ${SITE_SUFFIX}`,
        presentation.teaser
      );
    });
}

function productPages(
  products: Pick<CatalogProduct, "slug" | "title" | "description" | "kind">[]
): SeoPageDefinition[] {
  return products.map((product) => ({
    path: `/products/${product.slug}`,
    label: product.kind === PRODUCT_KIND.SERVICE ? `Услуга: ${product.title}` : `Товар: ${product.title}`,
    title: `${product.title} | ${SITE_SUFFIX}`,
    description: excerpt(product.description)
  }));
}

function dedupePages(pages: SeoPageDefinition[]) {
  const map = new Map<string, SeoPageDefinition>();
  for (const page of pages) {
    map.set(page.path, page);
  }
  return [...map.values()].sort((a, b) => a.path.localeCompare(b.path, "ru"));
}

export async function buildSeoPageCatalog(): Promise<SeoPageDefinition[]> {
  const [products, dbCategories] = await Promise.all([
    prisma.product.findMany({
      where: {
        ...catalogVisibilityWhere,
        slug: { not: CONSULTATION_PRODUCT_SLUG }
      },
      select: {
        slug: true,
        title: true,
        description: true,
        kind: true,
        category: true
      },
      orderBy: [{ kind: "asc" }, { title: "asc" }]
    }),
    prisma.catalogCategory.findMany({
      where: { isVisible: true },
      select: { name: true, kind: true, title: true, teaser: true }
    })
  ]);

  const goodsCategories = [
    ...new Set(
      products.filter((product) => product.kind === PRODUCT_KIND.GOODS).map((product) => product.category)
    )
  ];
  const serviceCategories = [
    ...new Set(
      products.filter((product) => product.kind === PRODUCT_KIND.SERVICE).map((product) => product.category)
    )
  ];

  return dedupePages([
    ...SEO_STATIC_PAGES,
    ...equipmentCategoryPages(),
    ...extraEquipmentCategoryPages(goodsCategories),
    ...catalogCategoryPages(dbCategories),
    ...gasMeterSubcategoryPages(),
    ...pumpSubcategoryPages(),
    ...serviceCategoryPages(serviceCategories),
    ...productPages(products)
  ]);
}

/** Нормализует путь для поиска SEO (pathname + query без лишних параметров). */
export function normalizeSeoPath(
  pathname: string,
  searchParams?: URLSearchParams | Record<string, string | string[] | undefined>
) {
  const params = new URLSearchParams();

  if (searchParams instanceof URLSearchParams) {
    searchParams.forEach((value, key) => params.set(key, value));
  } else if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (typeof value === "string" && value) params.set(key, value);
      else if (Array.isArray(value) && value[0]) params.set(key, value[0]);
    }
  }

  const equipmentCategory = params.get(CATALOG_FILTER_PARAMS.equipment.category);
  const equipmentSubcategory = params.get(CATALOG_FILTER_PARAMS.equipment.subcategory);
  const equipmentList = params.get(CATALOG_FILTER_PARAMS.equipment.list);
  const servicesCategory = params.get(CATALOG_FILTER_PARAMS.services.category);
  const servicesList = params.get(CATALOG_FILTER_PARAMS.services.list);

  const normalized = new URLSearchParams();
  if (pathname === CATALOG_ROUTES.equipment) {
    if (equipmentCategory) normalized.set(CATALOG_FILTER_PARAMS.equipment.category, equipmentCategory);
    if (equipmentSubcategory) normalized.set(CATALOG_FILTER_PARAMS.equipment.subcategory, equipmentSubcategory);
    if (equipmentList === "1") normalized.set(CATALOG_FILTER_PARAMS.equipment.list, "1");
  }
  if (pathname === CATALOG_ROUTES.services) {
    if (servicesCategory) normalized.set(CATALOG_FILTER_PARAMS.services.category, servicesCategory);
    if (servicesList === "1") normalized.set(CATALOG_FILTER_PARAMS.services.list, "1");
  }

  const query = normalized.toString();
  return query ? `${pathname}?${query}` : pathname;
}

export function productSeoPath(slug: string) {
  return `/products/${slug}`;
}
