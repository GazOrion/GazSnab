"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import type { ProductKind } from "@/lib/catalog";
import {
  CATALOG_FILTER_PARAMS,
  CATALOG_ROUTES,
  PRODUCT_KIND,
  catalogBlockFromKind,
  parseEquipmentSort,
  resolveCatalogBasePath,
  type EquipmentSort
} from "@/lib/catalog";

type Options = {
  fixedKind?: ProductKind;
  basePath?: string;
};

function legacyParamsToDelete(params: URLSearchParams) {
  params.delete("kind");
  params.delete("q");
  params.delete("category");
}

export function useCatalogNavigation(options: Options = {}) {
  const { fixedKind, basePath: basePathOption } = options;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const block = catalogBlockFromKind(fixedKind);
  const filterKeys = block ? CATALOG_FILTER_PARAMS[block] : null;
  const basePath =
    basePathOption ??
    (block ? resolveCatalogBasePath(pathname, block) : CATALOG_ROUTES.home);
  const [, startTransition] = useTransition();

  const kind = fixedKind ?? searchParams.get("kind") ?? "";
  const category = filterKeys
    ? (searchParams.get(filterKeys.category) ?? "")
    : (searchParams.get("category") ?? "");
  const listView = filterKeys ? searchParams.get(filterKeys.list) === "1" : false;
  const subcategory =
    block === "equipment"
      ? (searchParams.get(CATALOG_FILTER_PARAMS.equipment.subcategory) ?? "")
      : "";
  const equipmentSort: EquipmentSort =
    block === "equipment" && "sort" in CATALOG_FILTER_PARAMS.equipment
      ? parseEquipmentSort(searchParams.get(CATALOG_FILTER_PARAMS.equipment.sort))
      : parseEquipmentSort(null);

  const navigate = useCallback(
    (next: URLSearchParams) => {
      legacyParamsToDelete(next);
      const query = next.toString();
      const target = query ? `${basePath}?${query}` : basePath;
      startTransition(() => {
        router.replace(target, { scroll: false });
      });
    },
    [basePath, router]
  );

  const merge = useCallback(() => new URLSearchParams(searchParams.toString()), [searchParams]);

  const setKind = useCallback(
    (value: string) => {
      const params = merge();
      if (!value) params.delete("kind");
      else params.set("kind", value);

      if (fixedKind) {
        navigate(params);
        return;
      }

      const target =
        value === PRODUCT_KIND.GOODS
          ? CATALOG_ROUTES.equipment
          : value === PRODUCT_KIND.SERVICE
            ? CATALOG_ROUTES.services
            : CATALOG_ROUTES.home;
      const query = params.toString();
      startTransition(() => {
        router.replace(query ? `${target}?${query}` : target, { scroll: false });
      });
    },
    [fixedKind, merge, navigate, router]
  );

  const setCategory = useCallback(
    (value: string) => {
      const params = merge();
      legacyParamsToDelete(params);

      if (filterKeys) {
        params.delete(filterKeys.list);
        params.delete(CATALOG_FILTER_PARAMS.equipment.subcategory);
        if (!value) params.delete(filterKeys.category);
        else params.set(filterKeys.category, value);
      } else if (!value) {
        params.delete("category");
      } else {
        params.set("category", value);
      }

      navigate(params);
    },
    [filterKeys, merge, navigate]
  );

  const clearListView = useCallback(() => {
    if (!filterKeys) return;
    const params = merge();
    params.delete(filterKeys.list);
    navigate(params);
  }, [filterKeys, merge, navigate]);

  const setEquipmentSort = useCallback(
    (value: EquipmentSort) => {
      if (block !== "equipment") return;
      const params = merge();
      if (value === parseEquipmentSort(null)) {
        params.delete(CATALOG_FILTER_PARAMS.equipment.sort);
      } else {
        params.set(CATALOG_FILTER_PARAMS.equipment.sort, value);
      }
      navigate(params);
    },
    [block, merge, navigate]
  );

  const setSubcategory = useCallback(
    (value: string) => {
      if (block !== "equipment") return;
      const params = merge();
      legacyParamsToDelete(params);
      if (!value) {
        params.delete(CATALOG_FILTER_PARAMS.equipment.subcategory);
      } else {
        params.set(CATALOG_FILTER_PARAMS.equipment.subcategory, value);
      }
      navigate(params);
    },
    [block, merge, navigate]
  );

  const clearAll = useCallback(() => {
    const params = merge();
    legacyParamsToDelete(params);

    if (filterKeys) {
      params.delete(filterKeys.category);
      params.delete(filterKeys.list);
      if (block === "equipment") {
        params.delete(CATALOG_FILTER_PARAMS.equipment.sort);
        params.delete(CATALOG_FILTER_PARAMS.equipment.subcategory);
      }
    } else {
      params.delete("category");
    }

    const query = params.toString();
    const target = query ? `${basePath}?${query}` : basePath;
    const current = `${pathname}${searchParams.toString() ? `?${searchParams}` : ""}`;

    if (target === current) return;

    startTransition(() => {
      router.replace(target, { scroll: false });
    });
  }, [basePath, filterKeys, merge, pathname, router, searchParams]);

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
