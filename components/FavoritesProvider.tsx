"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type FavoritesContextValue = {
  slugs: string[];
  isFavorite: (slug: string) => boolean;
  toggle: (slug: string) => void;
  pruneSlugs: (validSlugs: string[]) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);
const STORAGE_KEY = "gazsnab_favorite_slugs";
const LEGACY_STORAGE_KEY = "gazsnab_favorites";

function isLegacyProductId(value: string) {
  return /^c[a-z0-9]{20,}$/i.test(value);
}

function readStoredSlugs(): string[] {
  try {
    const keys = [STORAGE_KEY, LEGACY_STORAGE_KEY];
    const values: string[] = [];

    for (const key of keys) {
      const stored = window.localStorage.getItem(key);
      if (!stored) continue;
      const parsed = JSON.parse(stored) as unknown;
      if (Array.isArray(parsed)) {
        values.push(...parsed.filter((item) => typeof item === "string"));
      }
    }

    return [...new Set(values)];
  } catch {
    return [];
  }
}

async function migrateLegacyIds(values: string[]) {
  const slugs = values.filter((value) => !isLegacyProductId(value));
  const legacyIds = values.filter(isLegacyProductId);

  if (!legacyIds.length) {
    return slugs;
  }

  try {
    const response = await fetch(
      `/api/products/by-ids?ids=${encodeURIComponent(legacyIds.join(","))}`
    );
    if (!response.ok) return slugs;

    const products = (await response.json()) as { slug: string }[];
    return [...new Set([...slugs, ...products.map((product) => product.slug)])];
  } catch {
    return slugs;
  }
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const stored = readStoredSlugs();
      const migrated = await migrateLegacyIds(stored);

      if (cancelled) return;

      setSlugs(migrated);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      window.localStorage.removeItem(LEGACY_STORAGE_KEY);
      setReady(true);
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  }, [slugs, ready]);

  const pruneSlugs = useCallback((validSlugs: string[]) => {
    const valid = new Set(validSlugs);
    setSlugs((current) => {
      const next = current.filter((slug) => valid.has(slug));
      return next.length === current.length ? current : next;
    });
  }, []);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      slugs,
      isFavorite(slug) {
        return slugs.includes(slug);
      },
      toggle(slug) {
        setSlugs((current) =>
          current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]
        );
      },
      pruneSlugs
    }),
    [slugs, pruneSlugs]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }
  return context;
}
