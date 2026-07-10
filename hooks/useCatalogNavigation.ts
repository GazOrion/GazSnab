"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import type { ProductKind } from "@/lib/catalog";
import {
  CATALOG_FILTER_PARAMS,
  CATALOG_ROUTES,
  PRODUCT_KIND,
  catalogBlockFromKind,
  catalogPath,
  catalogRouteFromBlock,
  parseEquipmentSort,
  resolveCatalogBasePath,
  type EquipmentSort
} from "@/lib/catalog";
import {
  appendCatalogQuery,
  parseEquipmentCatalogPath,
  parseServicesCatalogPath
} from "@/lib/catalog-slugs";

type Options = {
  fixedKind?: ProductKind;
  basePath?: string;
};

function legacyParamsToDelete(params: URLSearchParams) {
  params.delete("kind");
  params.delete("q");
  params.delete("category");
  params.delete(CATALOG_FILTER_PARAMS.equipment.category);
  params.delete(CATALOG_FILTER_PARAMS.equipment.subcategory);
  params.delete(CATALOG_FILTER_PARAMS.services.category);
}

function buildTargetPath(
  block: "equipment" | "services" | undefined,
  category: string,
  subcategory: string,
  listView: boolean
) {
  if (!block) {
    return CATALOG_ROUTES.home;
  }

  if (listView) {
    return catalogPath({ block, list: true });
  }

  if (category) {
    return catalogPath({
      block,
      category,
      ...(block === "equipment" && subcategory ? { subcategory } : {})
    });
  }

  return catalogRouteFromBlock(block);
}

export function useCatalogNavigation(options: Options = {}) {
  const { fixedKind, basePath: basePathOption } = options;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const block = catalogBlockFromKind(fixedKind);
  const filterKeys = block ? CATALOG_FILTER_PARAMS[block] : null;
  const cleanPath = pathname.split("?")[0] ?? pathname;
  const equipmentPath = parseEquipmentCatalogPath(cleanPath);
  const servicesPath = parseServicesCatalogPath(cleanPath);

  const pathCategory =
    block === "equipment"
      ? equipmentPath.categoryName ?? ""
      : block === "services"
        ? servicesPath.categoryName ?? ""
        : "";
  const subcategory = block === "equipment" ? equipmentPath.subcategoryName ?? "" : "";

  const category = pathCategory;

  const basePath =
    basePathOption ??
    (block ? resolveCatalogBasePath(pathname, block) : CATALOG_ROUTES.home);
  const [, startTransition] = useTransition();

  const kind = fixedKind ?? searchParams.get("kind") ?? "";
  const listView = filterKeys ? searchParams.get(filterKeys.list) === "1" : false;
  const equipmentSort: EquipmentSort =
    block === "equipment" && "sort" in CATALOG_FILTER_PARAMS.equipment
      ? parseEquipmentSort(searchParams.get(CATALOG_FILTER_PARAMS.equipment.sort))
      : parseEquipmentSort(null);

  const navigateTo = useCallback(
    (targetPath: string, params: URLSearchParams) => {
      legacyParamsToDelete(params);
      const target = appendCatalogQuery(targetPath, params);
      const current = `${pathname}${searchParams.toString() ? `?${searchParams}` : ""}`;
      if (target === current) return;

      startTransition(() => {
        router.replace(target, { scroll: false });
      });
    },
    [pathname, router, searchParams]
  );

  const merge = useCallback(() => new URLSearchParams(searchParams.toString()), [searchParams]);

  const setKind = useCallback(
    (value: string) => {
      const params = merge();
      if (!value) params.delete("kind");
      else params.set("kind", value);

      if (fixedKind) {
        navigateTo(basePath, params);
        return;
      }

      const target =
        value === PRODUCT_KIND.GOODS
          ? CATALOG_ROUTES.equipment
          : value === PRODUCT_KIND.SERVICE
            ? CATALOG_ROUTES.services
            : CATALOG_ROUTES.home;
      navigateTo(target, params);
    },
    [basePath, fixedKind, merge, navigateTo]
  );

  const setCategory = useCallback(
    (value: string) => {
      const params = merge();
      legacyParamsToDelete(params);
      if (filterKeys) {
        params.delete(filterKeys.list);
      }
      if (block === "equipment") {
        params.delete(CATALOG_FILTER_PARAMS.equipment.sort);
      }

      const targetPath = buildTargetPath(block, value, "", false);
      navigateTo(targetPath, params);
    },
    [block, filterKeys, merge, navigateTo]
  );

  const clearListView = useCallback(() => {
    if (!filterKeys) return;
    const params = merge();
    params.delete(filterKeys.list);
    const targetPath = buildTargetPath(block, category, subcategory, false);
    navigateTo(targetPath, params);
  }, [block, category, filterKeys, merge, navigateTo, subcategory]);

  const setEquipmentSort = useCallback(
    (value: EquipmentSort) => {
      if (block !== "equipment") return;
      const params = merge();
      if (value === parseEquipmentSort(null)) {
        params.delete(CATALOG_FILTER_PARAMS.equipment.sort);
      } else {
        params.set(CATALOG_FILTER_PARAMS.equipment.sort, value);
      }
      navigateTo(basePath, params);
    },
    [basePath, block, merge, navigateTo]
  );

  const setSubcategory = useCallback(
    (value: string) => {
      if (block !== "equipment") return;
      const params = merge();
      legacyParamsToDelete(params);
      const targetPath = buildTargetPath(block, category, value, false);
      navigateTo(targetPath, params);
    },
    [block, category, merge, navigateTo]
  );

  const clearAll = useCallback(() => {
    const params = merge();
    legacyParamsToDelete(params);

    if (filterKeys) {
      params.delete(filterKeys.list);
      if (block === "equipment") {
        params.delete(CATALOG_FILTER_PARAMS.equipment.sort);
      }
    }

    const targetPath = block ? catalogRouteFromBlock(block) : CATALOG_ROUTES.home;
    navigateTo(targetPath, params);
  }, [block, filterKeys, merge, navigateTo]);

  return {
    kind,
    category,
    subcategory,
    listView,
    equipmentSort,
    setKind,
    setCategory,
    setSubcategory,
    setEquipmentSort,
    clearAll,
    clearListView,
    basePath,
    pathname
  };
}
