import type { MetadataRoute } from "next";
import { CONSULTATION_PRODUCT_SLUG } from "@/lib/catalog";
import { catalogVisibilityWhere } from "@/lib/catalog-data";
import { prisma } from "@/lib/prisma";
import { buildSeoPageCatalog } from "@/lib/site-seo-pages";
import { absoluteUrl } from "@/lib/site-url";

const EXCLUDED_PATHS = new Set(["/cart", "/favorites", "/rekvizity"]);

function pathnameOnly(path: string) {
  return path.split("?")[0] || path;
}

function sitemapPriority(path: string): number {
  if (path === "/") return 1;
  if (path.startsWith("/products/")) return 0.8;
  if (path.includes("?")) return 0.6;
  return 0.7;
}

function sitemapChangeFrequency(path: string): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (path.startsWith("/products/")) return "weekly";
  if (path.includes("?")) return "weekly";
  return "monthly";
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, products] = await Promise.all([
    buildSeoPageCatalog(),
    prisma.product.findMany({
      where: {
        ...catalogVisibilityWhere,
        slug: { not: CONSULTATION_PRODUCT_SLUG }
      },
      select: {
        slug: true,
        updatedAt: true
      }
    })
  ]);

  const updatedAtBySlug = new Map(products.map((product) => [product.slug, product.updatedAt]));

  return pages
    .filter((page) => !EXCLUDED_PATHS.has(pathnameOnly(page.path)))
    .map((page) => {
      const productSlug = page.path.startsWith("/products/")
        ? page.path.slice("/products/".length).split("?")[0]
        : null;
      const lastModified = productSlug ? updatedAtBySlug.get(productSlug) : undefined;

      const entry: MetadataRoute.Sitemap[number] = {
        url: absoluteUrl(page.path),
        changeFrequency: sitemapChangeFrequency(page.path),
        priority: sitemapPriority(page.path)
      };

      if (lastModified) {
        entry.lastModified = lastModified;
      }

      return entry;
    });
}
