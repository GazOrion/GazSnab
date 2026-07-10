import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  buildSeoPageCatalog,
  normalizeSeoPath,
  productSeoPath,
  SEO_STATIC_PAGES,
  type SeoPageDefinition
} from "@/lib/site-seo-pages";
import { legacyCatalogSeoPathLookupKeys } from "@/lib/legacy-seo-paths";

export type { SeoPageDefinition };

export type SeoPageRow = {
  path: string;
  label: string;
  title: string;
  description: string;
};

const staticDefaultsByPath = new Map(SEO_STATIC_PAGES.map((page) => [page.path, page]));

const getCachedSeoCatalogByPath = unstable_cache(
  async (): Promise<Record<string, SeoPageDefinition>> => {
    const pages = await buildSeoPageCatalog();
    return Object.fromEntries(pages.map((page) => [page.path, page]));
  },
  ["seo-page-catalog-by-path"],
  { tags: ["seo-pages"] }
);

function canUsePageMeta() {
  return typeof prisma.pageMeta?.findUnique === "function";
}

async function getDefaultsForPath(path: string) {
  const catalog = await getCachedSeoCatalogByPath();
  const page = catalog[path];
  if (page) {
    return { title: page.title, description: page.description };
  }

  const staticFallback = staticDefaultsByPath.get(path);
  return {
    title: staticFallback?.title ?? "ОРИОН ГАЗСНАБ",
    description: staticFallback?.description ?? ""
  };
}

async function findStoredPageMeta(path: string) {
  const direct = await prisma.pageMeta.findUnique({ where: { path } });
  if (direct) {
    return direct;
  }

  for (const legacyPath of legacyCatalogSeoPathLookupKeys(path)) {
    const legacy = await prisma.pageMeta.findUnique({ where: { path: legacyPath } });
    if (legacy) {
      return legacy;
    }
  }

  return null;
}

export async function getPageSeo(path: string): Promise<{ title: string; description: string }> {
  const defaults = await getDefaultsForPath(path);

  if (!canUsePageMeta()) {
    return defaults;
  }

  try {
    const row = await findStoredPageMeta(path);
    if (!row) return defaults;

    return {
      title: row.title,
      description: row.description
    };
  } catch (error) {
    console.error("[site-seo] PageMeta load failed:", error);
    return defaults;
  }
}

export async function buildPageMetadata(path: string): Promise<Metadata> {
  const seo = await getPageSeo(path);
  return {
    title: seo.title,
    ...(seo.description ? { description: seo.description } : {})
  };
}

export async function buildPageMetadataFromRequest(
  pathname: string,
  searchParams?: URLSearchParams | Record<string, string | string[] | undefined>
): Promise<Metadata> {
  return buildPageMetadata(normalizeSeoPath(pathname, searchParams));
}

export async function buildProductPageMetadata(slug: string): Promise<Metadata> {
  return buildPageMetadata(productSeoPath(slug));
}

export async function listSeoPagesForAdmin(): Promise<SeoPageRow[]> {
  const [catalog, storedRows] = await Promise.all([
    buildSeoPageCatalog(),
    canUsePageMeta()
      ? prisma.pageMeta.findMany().catch((error) => {
          console.error("[site-seo] PageMeta list failed:", error);
          return [];
        })
      : Promise.resolve([])
  ]);

  const byPath = new Map(storedRows.map((row) => [row.path, row]));

  return catalog.map((page) => {
    const stored =
      byPath.get(page.path) ??
      legacyCatalogSeoPathLookupKeys(page.path)
        .map((legacyPath) => byPath.get(legacyPath))
        .find(Boolean);

    return {
      path: page.path,
      label: page.label,
      title: stored?.title ?? page.title,
      description: stored?.description ?? page.description
    };
  });
}

export async function getAllowedSeoPaths(): Promise<Set<string>> {
  const catalog = await buildSeoPageCatalog();
  return new Set(catalog.map((page) => page.path));
}

export { normalizeSeoPath, productSeoPath };
