"use client";

import { RotateCcw, Search } from "lucide-react";
import clsx from "clsx";
import { FormEvent, useId } from "react";
import { useCatalogNavigation } from "@/hooks/useCatalogNavigation";
import type { ProductKind } from "@/lib/catalog";
import { PRODUCT_KIND, SERVICE_CATEGORY_METAL } from "@/lib/catalog";

const KIND_OPTIONS = [
  { value: "", label: "Все разделы" },
  { value: PRODUCT_KIND.GOODS, label: "Оборудование" },
  { value: PRODUCT_KIND.SERVICE, label: "Услуги" }
] as const;

type Props = {
  categories: string[];
  fixedKind?: ProductKind;
  showKindSwitch?: boolean;
  showSearch?: boolean;
  showCategories?: boolean;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  category?: string;
  hasFilters?: boolean;
  onClear?: () => void;
  onBackToClusters?: () => void;
};

export function HomeCatalogToolbar({
  categories,
  fixedKind,
  showKindSwitch = false,
  showSearch = true,
  showCategories = true,
  searchQuery,
  onSearchQueryChange,
  category: categoryProp,
  hasFilters: hasFiltersProp,
  onClear,
  onBackToClusters
}: Props) {
  const nav = useCatalogNavigation({ fixedKind });
  const category = categoryProp ?? nav.category;
  const hasFilters = hasFiltersProp ?? Boolean(nav.kind || category || searchQuery.trim());

  const searchInputId = useId();

  function handleClear() {
    if (onClear) {
      onClear();
      return;
    }
    onSearchQueryChange("");
    nav.clearAll();
  }

  function onSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  const visibleCategories =
    fixedKind === PRODUCT_KIND.SERVICE
      ? categories
          .filter((name) => name !== SERVICE_CATEGORY_METAL)
          .sort((a, b) => a.localeCompare(b, "ru"))
      : categories;

  const toolbarClass = clsx(
    "store-catalog-toolbar",
    showSearch && !showCategories && "store-catalog-toolbar-search-only"
  );

  return (
    <div className={toolbarClass} aria-label="Фильтры каталога">
      {showKindSwitch ? (
        <div className="store-catalog-kind" role="group" aria-label="Тип позиции">
          {KIND_OPTIONS.map(({ value, label }) => (
            <button
              key={value || "_all"}
              type="button"
              className={clsx("store-pill", nav.kind === value && "store-pill-active")}
              onClick={() => nav.setKind(value)}
              aria-pressed={nav.kind === value}
            >
              {label}
            </button>
          ))}
        </div>
      ) : null}

      {showCategories ? (
      <div className="store-catalog-categories" role="tablist" aria-label="Категории">
        <button
          type="button"
          role="tab"
          className={clsx("store-pill", !category && "store-pill-active")}
          aria-selected={!category}
          onClick={() => {
            if (onBackToClusters && (category || nav.listView)) {
              onBackToClusters();
              return;
            }
            nav.setCategory("");
          }}
        >
          {onBackToClusters ? "Все разделы" : "Все категории"}
        </button>
        {visibleCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            className={clsx("store-pill", category === cat && "store-pill-active")}
            aria-selected={category === cat}
            onClick={() => nav.setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      ) : null}

      {showSearch ? (
      <form className="store-catalog-search" onSubmit={onSearchSubmit}>
        <label className="visually-hidden" htmlFor={searchInputId}>
          Поиск
        </label>
        <Search size={17} aria-hidden className="store-catalog-search-icon" />
        <input
          id={searchInputId}
          className="store-catalog-search-input"
          type="text"
          placeholder="Поиск"
          value={searchQuery}
          onChange={(event) => onSearchQueryChange(event.target.value)}
          autoComplete="off"
        />
        {hasFilters ? (
          <button
            type="button"
            className="icon-button-soft store-catalog-reset"
            onClick={handleClear}
            aria-label="Сбросить фильтры"
            title="Сбросить фильтры"
          >
            <RotateCcw size={16} />
          </button>
        ) : null}
      </form>
      ) : null}
    </div>
  );
}
