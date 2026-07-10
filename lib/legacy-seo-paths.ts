import {
  CATALOG_FILTER_PARAMS,
  CATALOG_ROUTES,
  catalogPath
} from "@/lib/catalog";
import { normalizeEquipmentCategory } from "@/lib/equipment-category-config";
import {
  parseEquipmentCatalogPath,
  parseServicesCatalogPath
} from "@/lib/catalog-slugs";

function parsePageMetaPath(path: string) {
  const [pathname, search = ""] = path.split("?");
  return {
    pathname,
    params: new URLSearchParams(search)
  };
}

/** Старый SEO-path каталога → новый path (или null, если это не legacy-каталог). */
export function legacyCatalogSeoPathToCurrent(path: string): string | null {
  const { pathname, params } = parsePageMetaPath(path);

  if (pathname === CATALOG_ROUTES.equipment) {
    const rawCategory = params.get(CATALOG_FILTER_PARAMS.equipment.category);
    const subcategory = params.get(CATALOG_FILTER_PARAMS.equipment.subcategory) ?? undefined;
    const list = params.get(CATALOG_FILTER_PARAMS.equipment.list) === "1";

    if (!rawCategory) {
      return null;
    }

    const category = normalizeEquipmentCategory(rawCategory);
    return catalogPath({
      block: "equipment",
      category,
      subcategory,
      list
    });
  }

  if (pathname === CATALOG_ROUTES.services) {
    const category = params.get(CATALOG_FILTER_PARAMS.services.category);
    const list = params.get(CATALOG_FILTER_PARAMS.services.list) === "1";

    if (!category) {
      return null;
    }

    return catalogPath({
      block: "services",
      category,
      list
    });
  }

  return null;
}

/** Новый path каталога → старый SEO-path (для поиска записей в PageMeta). */
export function currentCatalogSeoPathToLegacy(path: string): string | null {
  const { pathname, params } = parsePageMetaPath(path);
  const equipment = parseEquipmentCatalogPath(pathname);
  if (equipment.categoryName) {
    const legacyParams = new URLSearchParams();
    legacyParams.set(CATALOG_FILTER_PARAMS.equipment.category, equipment.categoryName);
    if (equipment.subcategoryName) {
      legacyParams.set(CATALOG_FILTER_PARAMS.equipment.subcategory, equipment.subcategoryName);
    }
    if (params.get(CATALOG_FILTER_PARAMS.equipment.list) === "1") {
      legacyParams.set(CATALOG_FILTER_PARAMS.equipment.list, "1");
    }
    return `${CATALOG_ROUTES.equipment}?${legacyParams.toString()}`;
  }

  const services = parseServicesCatalogPath(pathname);
  if (services.categoryName) {
    const legacyParams = new URLSearchParams();
    legacyParams.set(CATALOG_FILTER_PARAMS.services.category, services.categoryName);
    if (params.get(CATALOG_FILTER_PARAMS.services.list) === "1") {
      legacyParams.set(CATALOG_FILTER_PARAMS.services.list, "1");
    }
    return `${CATALOG_ROUTES.services}?${legacyParams.toString()}`;
  }

  return null;
}

/** Варианты legacy-path для поиска в БД (разная кодировка query). */
export function legacyCatalogSeoPathLookupKeys(currentPath: string): string[] {
  const legacy = currentCatalogSeoPathToLegacy(currentPath);
  if (!legacy) {
    return [];
  }

  const keys = new Set<string>([legacy]);
  const { pathname, params } = parsePageMetaPath(legacy);

  const decoded = new URLSearchParams();
  params.forEach((value, key) => {
    try {
      decoded.set(key, decodeURIComponent(value.replace(/\+/g, " ")));
    } catch {
      decoded.set(key, value);
    }
  });

  keys.add(`${pathname}?${decoded.toString()}`);

  return [...keys];
}
