"use client";

import clsx from "clsx";
import { LayoutGrid, LayoutList, Search } from "lucide-react";
import { FormEvent, useId } from "react";
import { EQUIPMENT_SORT, PRODUCT_KIND, type EquipmentSort } from "@/lib/catalog";
import { useCatalogNavigation } from "@/hooks/useCatalogNavigation";

type LayoutMode = "grid" | "list";

type Props = {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  layout: LayoutMode;
  onLayoutChange: (layout: LayoutMode) => void;
};

export function EquipmentCatalogToolbar({
  searchQuery,
  onSearchQueryChange,
  layout,
  onLayoutChange
}: Props) {
  const searchInputId = useId();
  const { equipmentSort, setEquipmentSort } = useCatalogNavigation({
    fixedKind: PRODUCT_KIND.GOODS
  });

  const priceSort =
    equipmentSort === EQUIPMENT_SORT.priceAsc
      ? EQUIPMENT_SORT.priceAsc
      : equipmentSort === EQUIPMENT_SORT.priceDesc
        ? EQUIPMENT_SORT.priceDesc
        : "";

  function onSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function onPopularityChange(value: string) {
    if (value) setEquipmentSort(value as EquipmentSort);
  }

  function onPriceChange(value: string) {
    if (!value) {
      setEquipmentSort(EQUIPMENT_SORT.popular);
      return;
    }
    setEquipmentSort(value as EquipmentSort);
  }

  return (
    <div className="store-equipment-catalog-toolbar" aria-label="Поиск и сортировка">
      <form className="store-equipment-catalog-search" onSubmit={onSearchSubmit}>
        <label className="visually-hidden" htmlFor={searchInputId}>
          Поиск по каталогу
        </label>
        <input
          id={searchInputId}
          className="store-equipment-catalog-search__input"
          type="search"
          placeholder="Поиск по каталогу"
          value={searchQuery}
          onChange={(event) => onSearchQueryChange(event.target.value)}
          autoComplete="off"
        />
        <Search size={18} className="store-equipment-catalog-search__icon" aria-hidden />
      </form>

      <div className="store-equipment-catalog-toolbar__controls">
        <label className="store-equipment-catalog-select-wrap">
          <span className="visually-hidden">Сортировка по популярности</span>
          <select
            className="store-equipment-catalog-select"
            value={priceSort ? "" : equipmentSort}
            onChange={(event) => onPopularityChange(event.target.value)}
          >
            <option value={EQUIPMENT_SORT.popular}>По популярности</option>
          </select>
        </label>

        <label className="store-equipment-catalog-select-wrap">
          <span className="visually-hidden">Сортировка по цене</span>
          <select
            className="store-equipment-catalog-select"
            value={priceSort}
            onChange={(event) => onPriceChange(event.target.value)}
          >
            <option value="">По цене</option>
            <option value={EQUIPMENT_SORT.priceAsc}>Сначала дешевле</option>
            <option value={EQUIPMENT_SORT.priceDesc}>Сначала дороже</option>
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
