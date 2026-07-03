"use client";

import clsx from "clsx";
import { LayoutGrid, LayoutList, Search } from "lucide-react";
import { FormEvent, useId } from "react";
import { EQUIPMENT_SORT, PRODUCT_KIND, type EquipmentSort } from "@/lib/catalog";
import { useCatalogNavigation } from "@/hooks/useCatalogNavigation";

export type ListingLayoutMode = "grid" | "list";

type Props = {
  totalCount: number;
  filteredCount: number;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  layout: ListingLayoutMode;
  onLayoutChange: (layout: ListingLayoutMode) => void;
  className?: string;
};

const SORT_OPTIONS: { value: EquipmentSort; label: string }[] = [
  { value: EQUIPMENT_SORT.popular, label: "Сначала популярные" },
  { value: EQUIPMENT_SORT.priceAsc, label: "Сначала дешевле" },
  { value: EQUIPMENT_SORT.priceDesc, label: "Сначала дороже" }
];

export function EquipmentCategoryListingToolbar({
  totalCount,
  filteredCount,
  searchQuery,
  onSearchQueryChange,
  layout,
  onLayoutChange,
  className
}: Props) {
  const searchInputId = useId();
  const { equipmentSort, setEquipmentSort } = useCatalogNavigation({
    fixedKind: PRODUCT_KIND.GOODS
  });

  function onSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div
      className={clsx("store-equipment-category-toolbar", className)}
      aria-label="Поиск и сортировка"
    >
      <p className="store-equipment-category-toolbar__count">
        Найдено <strong>{filteredCount}</strong>{" "}
        {filteredCount === 1 ? "товар" : filteredCount < 5 ? "товара" : "товаров"}
        {filteredCount !== totalCount ? (
          <span className="store-equipment-category-toolbar__count-muted">
            {" "}
            из {totalCount}
          </span>
        ) : null}
      </p>

      <form className="store-equipment-catalog-search" onSubmit={onSearchSubmit}>
        <label className="visually-hidden" htmlFor={searchInputId}>
          Поиск
        </label>
        <input
          id={searchInputId}
          className="store-equipment-catalog-search__input"
          type="search"
          placeholder="Поиск"
          value={searchQuery}
          onChange={(event) => onSearchQueryChange(event.target.value)}
          autoComplete="off"
        />
        <Search size={18} className="store-equipment-catalog-search__icon" aria-hidden />
      </form>

      <div className="store-equipment-category-toolbar__controls">
        <label className="store-equipment-catalog-select-wrap">
          <span className="visually-hidden">Сортировка</span>
          <select
            className="store-equipment-catalog-select"
            value={equipmentSort}
            onChange={(event) => setEquipmentSort(event.target.value as EquipmentSort)}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <div className="store-equipment-catalog-view" role="group" aria-label="Вид списка">
          <button
            type="button"
            className={clsx(
              "store-equipment-catalog-view__btn",
              layout === "grid" && "store-equipment-catalog-view__btn-active"
            )}
            onClick={() => onLayoutChange("grid")}
            aria-pressed={layout === "grid"}
            aria-label="Сетка"
          >
            <LayoutGrid size={18} aria-hidden />
          </button>
          <button
            type="button"
            className={clsx(
              "store-equipment-catalog-view__btn",
              layout === "list" && "store-equipment-catalog-view__btn-active"
            )}
            onClick={() => onLayoutChange("list")}
            aria-pressed={layout === "list"}
            aria-label="Список"
          >
            <LayoutList size={18} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
