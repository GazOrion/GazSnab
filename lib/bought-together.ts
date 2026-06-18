import type { CatalogProduct } from "@/components/ProductCard";
import { CONSULTATION_PRODUCT_SLUG } from "@/lib/catalog";
import { GAS_METERS_CATEGORY, SOFTWARE_CATEGORY } from "@/lib/equipment-category-config";
import {
  getRaskoVkFittingsSlugForMeter,
  isRaskoGasMeterProduct
} from "@/lib/rasko-accessories";
import { prisma } from "@/lib/prisma";

const DEFAULT_LIMIT = 4;

type PoolItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  kind: string;
  category: string;
  specs: unknown;
  price: { toString(): string };
  unit: string;
  imageUrl: string | null;
  inStock: boolean;
};

type ProductSpecs = Record<string, string>;

function asSpecs(value: unknown): ProductSpecs {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value as ProductSpecs;
}

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Счётчики СМТ / Техномер (линейка СМТ-Комплексы). */
export function isSmtTechnomerProduct(product: {
  category: string;
  specs?: ProductSpecs | null;
}): boolean {
  if (product.category !== GAS_METERS_CATEGORY) return false;
  const specs = product.specs ?? {};
  const manufacturer = specs["Производитель"];
  const subcategory = specs["Подкатегория"];
  return (
    subcategory === "СМТ-Комплексы" ||
    manufacturer === "СМТ" ||
    manufacturer === "Техномер"
  );
}

export function isPoProduct(product: { category: string }): boolean {
  return product.category === SOFTWARE_CATEGORY;
}

/** Случайная подборка из разных категорий, только тот же kind (товар/услуга). */
function pickFromDifferentCategories(pool: PoolItem[], limit: number): PoolItem[] {
  if (pool.length <= limit) return shuffle(pool);

  const byCategory = new Map<string, PoolItem[]>();
  for (const item of pool) {
    const list = byCategory.get(item.category) ?? [];
    list.push(item);
    byCategory.set(item.category, list);
  }

  const picked: PoolItem[] = [];
  const usedIds = new Set<string>();

  for (const category of shuffle([...byCategory.keys()])) {
    if (picked.length >= limit) break;
    const candidate = shuffle(byCategory.get(category)!)[0];
    if (!candidate || usedIds.has(candidate.id)) continue;
    picked.push(candidate);
    usedIds.add(candidate.id);
  }

  if (picked.length < limit) {
    for (const item of shuffle(pool.filter((p) => !usedIds.has(p.id)))) {
      if (picked.length >= limit) break;
      picked.push(item);
      usedIds.add(item.id);
    }
  }

  return shuffle(picked).slice(0, limit);
}

function pickRequiredItem(pool: PoolItem[], predicate: (item: PoolItem) => boolean): PoolItem | null {
  const candidates = shuffle(pool.filter(predicate));
  return candidates[0] ?? null;
}

function pickBoughtTogetherPool(
  pool: PoolItem[],
  limit: number,
  current: { slug: string; category: string; specs?: ProductSpecs | null }
): PoolItem[] {
  const picked: PoolItem[] = [];
  const usedIds = new Set<string>();

  const currentIsSmt = isSmtTechnomerProduct(current);
  const currentIsPo = isPoProduct(current);
  const currentIsRasko = isRaskoGasMeterProduct(current);

  if (currentIsRasko) {
    const fittingsSlug = getRaskoVkFittingsSlugForMeter(current.slug);
    if (fittingsSlug) {
      const fitting = pool.find((item) => item.slug === fittingsSlug);
      if (fitting && !usedIds.has(fitting.id)) {
        picked.push(fitting);
        usedIds.add(fitting.id);
      }
    }
  } else if (currentIsSmt) {
    const poItem = pickRequiredItem(pool, (item) => isPoProduct(item));
    if (poItem) {
      picked.push(poItem);
      usedIds.add(poItem.id);
    }
  } else if (currentIsPo) {
    const smtItem = pickRequiredItem(pool, (item) =>
      isSmtTechnomerProduct({ category: item.category, specs: asSpecs(item.specs) })
    );
    if (smtItem) {
      picked.push(smtItem);
      usedIds.add(smtItem.id);
    }
  }

  const remaining = pool.filter((item) => !usedIds.has(item.id));
  const rest = pickFromDifferentCategories(remaining, limit - picked.length);

  for (const item of rest) {
    if (picked.length >= limit) break;
    if (usedIds.has(item.id)) continue;
    picked.push(item);
    usedIds.add(item.id);
  }

  return shuffle(picked).slice(0, limit);
}

function toCatalogProduct(item: PoolItem): CatalogProduct {
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    description: item.description,
    kind: item.kind,
    price: Number(item.price),
    unit: item.unit,
    imageUrl: item.imageUrl,
    inStock: item.inStock
  };
}

export async function getBoughtTogetherProducts(params: {
  productId: string;
  slug: string;
  kind: string;
  category: string;
  specs?: ProductSpecs | null;
  limit?: number;
}): Promise<CatalogProduct[]> {
  const limit = params.limit ?? DEFAULT_LIMIT;

  const pool = await prisma.product.findMany({
    where: {
      inStock: true,
      kind: params.kind,
      slug: { notIn: [params.slug, CONSULTATION_PRODUCT_SLUG] },
      id: { not: params.productId }
    },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      kind: true,
      category: true,
      specs: true,
      price: true,
      unit: true,
      imageUrl: true,
      inStock: true
    }
  });

  return pickBoughtTogetherPool(pool, limit, {
    slug: params.slug,
    category: params.category,
    specs: params.specs
  }).map(toCatalogProduct);
}
