import type { Prisma } from "@prisma/client";
import { Prisma as PrismaNamespace } from "@prisma/client";
import type { CatalogProduct } from "@/components/ProductCard";
import {
  CATALOG_ROUTES,
  catalogPath,
  clusterPresentation,
  CONSULTATION_PRODUCT_SLUG,
  EQUIPMENT_HEADER_CATALOG_ITEMS,
  EQUIPMENT_PROMO_CATEGORIES,
  HOME_CATEGORY_STRIP,
  PRODUCT_KIND,
  resolveEquipmentClusterImage,
  SERVICE_CATEGORY_METAL
} from "@/lib/catalog";
import { prisma } from "@/lib/prisma";
import { HEADER_SERVICES_CHILDREN } from "@/lib/shop-nav";

/** Сколько карточек в одном ряду «Популярные позиции» (см. store-redesign.css). */
export const POPULAR_POSITIONS_LIMIT = 5;

/** Популярные услуги металлообработки на главной (порядок как в каталоге). */
export const METAL_POPULAR_SERVICE_SLUGS = [
  "gibka-listovogo-metalla",
  "robotizirovannaya-svarka-metalla",
  "raspil-metalla-lentopilnyy",
  "sverlenie-metalla",
  "narrezka-rezby-trub",
  "zatochka-sverl-20mm"
] as const;

/** Популярные карточки с обрезкой фото по вертикали (счётчики СМТ). */
export const POPULAR_CARD_COVER_IMAGE_SLUGS = new Set<string>([
  "smt-kompleks-g40",
  "smt-kompleks-g65-g100"
]);

export type SectionCatalogFilters = {
  q?: string;
  category?: string;
};

export type HomeCatalogFilters = {
  goods?: SectionCatalogFilters;
  services?: SectionCatalogFilters;
};

export type CategoryCluster = {
  name: string;
  count: number;
  imageUrl: string | null;
  minPrice: number | null;
  /** Уникальный ключ карточки на хабе (если одна категория БД — несколько пунктов меню). */
  hubId?: string;
  /** Заголовок карточки (подпись из выпадающего меню). */
  label?: string;
  /** Краткое описание под заголовком. */
  teaser?: string;
  /** Прямая ссылка карточки (услуги из меню → страница услуги). */
  href?: string;
  /** Подпись цены на карточке раздела (например «по запросу»). */
  priceLabel?: string;
};

export type HomeCatalogData = {
  goods: CatalogProduct[];
  services: CatalogProduct[];
  goodsCategories: string[];
  serviceCategories: string[];
  goodsClusters: CategoryCluster[];
  /** Карточки хаба /oborudovanie — все пункты выпадающего «Каталог» в шапке. */
  equipmentHubClusters: CategoryCluster[];
  /** Карточки хаба /uslugi — все пункты выпадающего «Услуги» в шапке. */
  serviceHubClusters: CategoryCluster[];
  serviceClusters: CategoryCluster[];
  goodsTotal: number;
  servicesTotal: number;
};

function isDbConnectionError(error: unknown) {
  if (error instanceof PrismaNamespace.PrismaClientKnownRequestError) {
    return ["P1001", "P1002", "P1008", "P1017"].includes(error.code);
  }
  const message = error instanceof Error ? error.message : String(error);
  return /connect|connection|ECONNREFUSED|10054|reset|closed/i.test(message);
}

async function withDbRetry<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (!isDbConnectionError(error)) {
      throw error;
    }
    await prisma.$disconnect().catch(() => undefined);
    await prisma.$connect();
    return fn();
  }
}

function buildSectionWhere(filters?: SectionCatalogFilters): Prisma.ProductWhereInput {
  const trimmed = filters?.q?.trim();
  const searchFilter: Prisma.ProductWhereInput = trimmed
    ? {
        OR: [
          { title: { contains: trimmed, mode: "insensitive" } },
          { description: { contains: trimmed, mode: "insensitive" } }
        ]
      }
    : {};

  return {
    inStock: true,
    slug: { not: CONSULTATION_PRODUCT_SLUG },
    ...searchFilter,
    ...(filters?.category ? { category: filters.category } : {})
  };
}

export const catalogVisibilityWhere = {
  inStock: true,
  slug: { not: CONSULTATION_PRODUCT_SLUG }
} as const;

function toCatalogProduct(product: {
  id: string;
  title: string;
  slug: string;
  description: string;
  kind: string;
  price: { toString(): string } | number | string;
  unit: string;
  imageUrl: string | null;
  inStock?: boolean;
  specs?: unknown;
}): CatalogProduct {
  const specs =
    product.specs && typeof product.specs === "object" && !Array.isArray(product.specs)
      ? Object.fromEntries(
          Object.entries(product.specs as Record<string, unknown>).map(([key, value]) => [
            key,
            String(value)
          ])
        )
      : undefined;

  return {
    id: product.id,
    title: product.title,
    slug: product.slug,
    description: product.description,
    kind: product.kind,
    price: Number(product.price),
    unit: product.unit,
    imageUrl: product.imageUrl,
    inStock: product.inStock ?? true,
    specs
  };
}

const productListArgs = {
  orderBy: [{ featured: "desc" as const }, { createdAt: "desc" as const }]
};

export type HomeCategoryCard = {
  title: string;
  href: string;
  imageUrl: string | null;
};

export type EquipmentPromoCategory = {
  title: string;
  href: string;
  imageUrl: string | null;
};

export type PromoPageData = {
  /** Популярные товары на первом экране (hero). */
  heroPopularGoods: CatalogProduct[];
  /** Популярные товары в блоке «Готовое оборудование». */
  equipmentPopularGoods: CatalogProduct[];
  /** Популярные услуги металлообработки. */
  metalPopularServices: CatalogProduct[];
  homeCategories: HomeCategoryCard[];
  equipmentPromoCategories: EquipmentPromoCategory[];
};

function hubCardPresentation(
  item: (typeof EQUIPMENT_HEADER_CATALOG_ITEMS)[number]
): { title: string; teaser: string } {
  const base = clusterPresentation(item.name, PRODUCT_KIND.GOODS);

  return {
    title: item.label,
    teaser: base.teaser
  };
}

function productSlugFromHref(href: string): string {
  return href.replace(/^\/products\//, "");
}

/** Все услуги из выпадающего «Услуги» для страницы /uslugi. */
export async function buildServiceHubClusters(): Promise<CategoryCluster[]> {
  const slugs = HEADER_SERVICES_CHILDREN.map((item) => productSlugFromHref(item.href));

  const products = await prisma.product.findMany({
    where: {
      AND: [catalogVisibilityWhere, { kind: PRODUCT_KIND.SERVICE, slug: { in: slugs } }]
    },
    select: {
      slug: true,
      description: true,
      price: true
    }
  });

  const bySlug = new Map(products.map((product) => [product.slug, product]));

  return HEADER_SERVICES_CHILDREN.map((item, index) => {
    const slug = productSlugFromHref(item.href);
    const product = bySlug.get(slug);

    return {
      hubId: `service-hub-${index}`,
      name: slug,
      label: item.label,
      href: item.href,
      teaser: product?.description ?? item.label,
      count: product ? 1 : 0,
      imageUrl: item.imageUrl ?? null,
      minPrice: product?.price != null ? Number(product.price) : null
    };
  });
}

/** Все разделы выпадающего «Каталог» для страницы /oborudovanie. */
export function buildEquipmentHubClusters(goodsClusters: CategoryCluster[]): CategoryCluster[] {
  const byName = new Map(goodsClusters.map((cluster) => [cluster.name, cluster]));
  const used = new Set<string>();

  const configured = EQUIPMENT_HEADER_CATALOG_ITEMS.map((item, index) => {
    const cluster = byName.get(item.name);
    const card = hubCardPresentation(item);
    const imageUrl =
      "image" in item && item.image
        ? item.image
        : resolveEquipmentClusterImage(item.name, cluster?.imageUrl ?? null);
    used.add(item.name);

    return {
      hubId: `equipment-hub-${index}`,
      name: item.name,
      label: cluster?.label ?? card.title,
      teaser: cluster?.teaser ?? card.teaser,
      count: cluster?.count ?? 0,
      imageUrl,
      minPrice: cluster?.minPrice ?? null
    };
  });

  return [...configured, ...goodsClusters.filter((cluster) => !used.has(cluster.name))];
}

function buildEquipmentPromoCategories(
  goodsClusters: CategoryCluster[]
): EquipmentPromoCategory[] {
  const imageByName = new Map(goodsClusters.map((cluster) => [cluster.name, cluster.imageUrl]));

  return EQUIPMENT_PROMO_CATEGORIES.map((item) => ({
    title: item.label,
    href: catalogPath({ kind: PRODUCT_KIND.GOODS, category: item.name }),
    imageUrl:
      "image" in item && item.image ? item.image : (imageByName.get(item.name) ?? null)
  }));
}

function buildHomeCategories(
  goodsClusters: CategoryCluster[],
  serviceClusters: CategoryCluster[]
): HomeCategoryCard[] {
  const imageByName = new Map<string, string | null>();
  for (const cluster of [...goodsClusters, ...serviceClusters]) {
    imageByName.set(cluster.name, cluster.imageUrl);
  }

  return HOME_CATEGORY_STRIP.map((item) => ({
    title: item.label,
    href:
      item.kind === PRODUCT_KIND.SERVICE && item.name === SERVICE_CATEGORY_METAL
        ? CATALOG_ROUTES.services
        : catalogPath({ kind: item.kind, category: item.name }),
    imageUrl: imageByName.get(item.name) ?? null
  }));
}

export async function loadPromoPageData(): Promise<PromoPageData> {
  const [popularGoods, metalPopularServices, catalog] = await Promise.all([
    withDbRetry(() =>
      prisma.product.findMany({
        where: { ...catalogVisibilityWhere, kind: PRODUCT_KIND.GOODS },
        ...productListArgs,
        take: 12
      })
    ),
    withDbRetry(async () => {
      const metalServices = await prisma.product.findMany({
        where: {
          ...catalogVisibilityWhere,
          kind: PRODUCT_KIND.SERVICE,
          slug: { in: [...METAL_POPULAR_SERVICE_SLUGS] }
        }
      });
      const bySlug = new Map(metalServices.map((product) => [product.slug, product]));
      return METAL_POPULAR_SERVICE_SLUGS.map((slug) => bySlug.get(slug)).filter(
        (product): product is NonNullable<typeof product> => product != null
      );
    }),
    loadHomeCatalogData({})
  ]);

  const goods = popularGoods.map(toCatalogProduct);

  const limit = POPULAR_POSITIONS_LIMIT;

  return {
    heroPopularGoods: goods.slice(0, limit),
    equipmentPopularGoods:
      goods.slice(limit, limit * 2).length > 0 ? goods.slice(limit, limit * 2) : goods.slice(0, limit),
    metalPopularServices: metalPopularServices.slice(0, limit).map(toCatalogProduct),
    homeCategories: buildHomeCategories(catalog.goodsClusters, catalog.serviceClusters),
    equipmentPromoCategories: buildEquipmentPromoCategories(catalog.goodsClusters)
  };
}

export async function loadHomeCatalogData(filters: HomeCatalogFilters): Promise<HomeCatalogData> {
  const goodsWhere = { ...buildSectionWhere(filters.goods), kind: PRODUCT_KIND.GOODS };
  const servicesWhere = { ...buildSectionWhere(filters.services), kind: PRODUCT_KIND.SERVICE };

  return withDbRetry(async () => {
    const [
      goods,
      services,
      goodsCategoryStats,
      goodsCategoryMinPrices,
      serviceCategoryStats,
      serviceCategoryMinPrices,
      goodsTotal,
      servicesTotal,
      goodsSampleImages,
      serviceSampleImages,
      catalogCategories
    ] = await Promise.all([
      prisma.product.findMany({
        where: goodsWhere,
        ...productListArgs
      }),
      prisma.product.findMany({
        where: servicesWhere,
        ...productListArgs
      }),
      prisma.product.groupBy({
        by: ["category"],
        where: { ...catalogVisibilityWhere, kind: PRODUCT_KIND.GOODS },
        _count: { id: true },
        orderBy: { category: "asc" }
      }),
      prisma.product.groupBy({
        by: ["category"],
        where: { ...catalogVisibilityWhere, kind: PRODUCT_KIND.GOODS, price: { gt: 0 } },
        _min: { price: true }
      }),
      prisma.product.groupBy({
        by: ["category"],
        where: { ...catalogVisibilityWhere, kind: PRODUCT_KIND.SERVICE },
        _count: { id: true },
        orderBy: { category: "asc" }
      }),
      prisma.product.groupBy({
        by: ["category"],
        where: { ...catalogVisibilityWhere, kind: PRODUCT_KIND.SERVICE, price: { gt: 0 } },
        _min: { price: true }
      }),
      prisma.product.count({ where: { ...catalogVisibilityWhere, kind: PRODUCT_KIND.GOODS } }),
      prisma.product.count({ where: { ...catalogVisibilityWhere, kind: PRODUCT_KIND.SERVICE } }),
      prisma.product.findMany({
        where: { ...catalogVisibilityWhere, kind: PRODUCT_KIND.GOODS, imageUrl: { not: null } },
        select: { category: true, imageUrl: true },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }]
      }),
      prisma.product.findMany({
        where: { ...catalogVisibilityWhere, kind: PRODUCT_KIND.SERVICE, imageUrl: { not: null } },
        select: { category: true, imageUrl: true },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }]
      }),
      prisma.catalogCategory.findMany({
        where: { isVisible: true },
        orderBy: [{ kind: "asc" }, { sortOrder: "asc" }, { name: "asc" }]
      })
    ]);

    const categoryByKey = new Map(
      catalogCategories.map((category) => [`${category.kind}:${category.name}`, category])
    );

    const buildClusters = (
      kind: string,
      stats: { category: string; _count: { id: number } }[],
      minPrices: { category: string; _min: { price: unknown } }[],
      samples: { category: string; imageUrl: string | null }[]
    ): CategoryCluster[] => {
      const imageByCategory = new Map<string, string>();
      for (const sample of samples) {
        if (!imageByCategory.has(sample.category) && sample.imageUrl) {
          imageByCategory.set(sample.category, sample.imageUrl);
        }
      }

      const minPriceByCategory = new Map(
        minPrices.map((row) => [
          row.category,
          row._min.price != null ? Number(row._min.price) : null
        ])
      );

      return stats
        .map((row) => {
          const category = categoryByKey.get(`${kind}:${row.category}`);
          return {
            name: row.category,
            count: row._count.id,
            imageUrl: category?.imageUrl ?? imageByCategory.get(row.category) ?? null,
            minPrice: minPriceByCategory.get(row.category) ?? null,
            label: category?.title,
            teaser: category?.teaser,
            hubId: category ? `managed-${category.id}` : undefined,
            sortOrder: category?.sortOrder ?? Number.MAX_SAFE_INTEGER
          };
        })
        .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name, "ru"))
        .map((cluster) => ({
          name: cluster.name,
          count: cluster.count,
          imageUrl: cluster.imageUrl,
          minPrice: cluster.minPrice,
          label: cluster.label,
          teaser: cluster.teaser,
          hubId: cluster.hubId
        }));
    };

    const goodsClusters = buildClusters(
      PRODUCT_KIND.GOODS,
      goodsCategoryStats,
      goodsCategoryMinPrices,
      goodsSampleImages
    );
    const serviceClusters = buildClusters(
      PRODUCT_KIND.SERVICE,
      serviceCategoryStats,
      serviceCategoryMinPrices,
      serviceSampleImages
    );
    const equipmentHubClusters = buildEquipmentHubClusters(goodsClusters);
    const serviceHubClusters = await buildServiceHubClusters();

    return {
      goods: goods.map(toCatalogProduct),
      services: services.map(toCatalogProduct),
      goodsCategories: goodsClusters.map((cluster) => cluster.name),
      serviceCategories: serviceClusters.map((cluster) => cluster.name),
      goodsClusters,
      equipmentHubClusters,
      serviceHubClusters,
      serviceClusters,
      goodsTotal,
      servicesTotal
    };
  });
}
