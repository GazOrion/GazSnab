"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { usePathname } from "next/navigation";
import {
  CATALOG_FILTER_PARAMS,
  CATALOG_ROUTES,
  type CatalogBlockId
} from "@/lib/catalog";

const STORAGE_KEY = "gazsnab-header-search";

type CatalogSearchContextValue = {
  getQuery: (block: CatalogBlockId) => string;
  setBlockQuery: (block: CatalogBlockId, query: string) => void;
  clearBlockQuery: (block: CatalogBlockId) => void;
  getHeaderQuery: () => string;
  applyHeaderSearch: (query: string) => void;
  clearHeaderSearch: () => void;
};

const CatalogSearchContext = createContext<CatalogSearchContextValue | null>(null);

function blocksForPathname(pathname: string): CatalogBlockId[] {
  if (
    pathname === CATALOG_ROUTES.equipment ||
    pathname.startsWith(`${CATALOG_ROUTES.equipment}/`)
  ) {
    return ["equipment"];
  }
  if (pathname === CATALOG_ROUTES.services || pathname.startsWith(`${CATALOG_ROUTES.services}/`)) {
    return ["services"];
  }
  return ["equipment", "services"];
}

export function CatalogSearchProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [queries, setQueries] = useState<Record<CatalogBlockId, string>>({
    equipment: "",
    services: ""
  });

  useEffect(() => {
    const pending = sessionStorage.getItem(STORAGE_KEY);
    if (!pending?.trim()) return;
    sessionStorage.removeItem(STORAGE_KEY);
    const blocks = blocksForPathname(pathname);
    setQueries((prev) => {
      const next = { ...prev };
      for (const block of blocks) {
        next[block] = pending.trim();
      }
      return next;
    });
  }, [pathname]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const keys = [
      CATALOG_FILTER_PARAMS.equipment.q,
      CATALOG_FILTER_PARAMS.services.q,
      "q"
    ];
    let changed = false;
    for (const key of keys) {
      if (url.searchParams.has(key)) {
        url.searchParams.delete(key);
        changed = true;
      }
    }
    if (!changed) return;
    const search = url.searchParams.toString();
    window.history.replaceState(null, "", search ? `${url.pathname}?${search}` : url.pathname);
  }, []);

  const getQuery = useCallback((block: CatalogBlockId) => queries[block] ?? "", [queries]);

  const setBlockQuery = useCallback((block: CatalogBlockId, query: string) => {
    setQueries((prev) => ({ ...prev, [block]: query }));
  }, []);

  const clearBlockQuery = useCallback((block: CatalogBlockId) => {
    setBlockQuery(block, "");
  }, [setBlockQuery]);

  const getHeaderQuery = useCallback(() => {
    const blocks = blocksForPathname(pathname);
    for (const block of blocks) {
      const value = queries[block]?.trim();
      if (value) return value;
    }
    return "";
  }, [pathname, queries]);

  const applyHeaderSearch = useCallback(
    (query: string) => {
      const trimmed = query.trim();
      const blocks = blocksForPathname(pathname);
      setQueries((prev) => {
        const next = { ...prev };
        for (const block of blocks) {
          next[block] = trimmed;
        }
        return next;
      });
    },
    [pathname]
  );

  const clearHeaderSearch = useCallback(() => {
    applyHeaderSearch("");
  }, [applyHeaderSearch]);

  const value = useMemo(
    () => ({
      getQuery,
      setBlockQuery,
      clearBlockQuery,
      getHeaderQuery,
      applyHeaderSearch,
      clearHeaderSearch
    }),
    [getQuery, setBlockQuery, clearBlockQuery, getHeaderQuery, applyHeaderSearch, clearHeaderSearch]
  );

  return (
    <CatalogSearchContext.Provider value={value}>{children}</CatalogSearchContext.Provider>
  );
}

export function useCatalogSearch() {
  const ctx = useContext(CatalogSearchContext);
  if (!ctx) {
    throw new Error("useCatalogSearch must be used within CatalogSearchProvider");
  }
  return ctx;
}

export function useCatalogSearchOptional() {
  return useContext(CatalogSearchContext);
}
