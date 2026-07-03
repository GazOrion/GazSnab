"use client";

import clsx from "clsx";
import { ChevronDown, LayoutGrid, LayoutList, SlidersHorizontal, X } from "lucide-react";
import { EQUIPMENT_SORT, PRODUCT_KIND, type EquipmentSort } from "@/lib/catalog";
import type { EquipmentFilterChip } from "@/lib/equipment-filter-chips";
import { useCatalogNavigation } from "@/hooks/useCatalogNavigation";
import type { ListingLayoutMode } from "@/components/catalog/EquipmentCategoryListingToolbar";

const SORT_OPTIONS: { value: EquipmentSort; label: string }[] = [
  { value: EQUIPMENT_SORT.popular, label: "Сначала популярные" },
  { value: EQUIPMENT_SORT.priceAsc, label: "Сначала дешевле" },
  { value: EQUIPMENT_SORT.priceDesc, label: "Сначала дороже" }
];

type Props = {
  productCount: number;
  layout: ListingLayoutMode;
  onLayoutChange: (layout: ListingLayoutMode) => void;
  activeFilterCount: number;
  chips: EquipmentFilterChip[];
  onOpenFilters: () => void;
};

function productCountLabel(count: number) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return "товар";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "товара";
  return "товаров";
}

export function EquipmentCategoryMobileBar({
  productCount,
  layout,
  onLayoutChange,
  activeFilterCount,
  chips,
  onOpenFilters
}: Props) {
  const { equipmentSort, setEquipmentSort } = useCatalogNavigation({
    fixedKind: PRODUCT_KIND.GOODS
  });

  const sortLabel =
    SORT_OPTIONS.find((option) => option.value === equipmentSort)?.label ?? "Сначала популярные";

  return (
    <div className="store-equipment-mobile-bar" aria-label="Сортировка и фильтры">
      <header className="store-equipment-mobile-bar__head">
        <p className="store-equipment-mobile-bar__count-line">
          <span className="store-equipment-mobile-bar__count">
            {productCount} {productCountLabel(productCount)}
          </span>
        </p>
      </header>

      <div className="store-equipment-mobile-bar__sort-row">
        <label className="store-equipment-mobile-bar__sort">
          <span className="store-equipment-mobile-bar__sort-label">{sortLabel}</span>
          <ChevronDown size={16} className="store-equipment-mobile-bar__sort-chevron" aria-hidden />
          <select
            className="store-equipment-mobile-bar__sort-select"
            value={equipmentSort}
            onChange={(event) => setEquipmentSort(event.target.value as EquipmentSort)}
            aria-label="Сортировка"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          className="store-equipment-mobile-bar__filters-btn"
          onClick={onOpenFilters}
        >
          <SlidersHorizontal size={18} aria-hidden />
          <span>Фильтры</span>
          {activeFilterCount > 0 ? (
            <span className="store-equipment-mobile-bar__filters-badge" aria-hidden>
              {activeFilterCount}
            </span>
          ) : null}
        </button>
      </div>

      <div className="store-equipment-mobile-bar__view-row">
        <div className="store-equipment-catalog-view" role="group" aria-label="Вид списка">
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
        </div>

        <div className="store-equipment-mobile-bar__chips" role="list">
          {chips.map((chip) => (
            <span
              key={chip.id}
              className={clsx(
                "store-equipment-mobile-bar__chip",
                chip.tone === "active" && "store-equipment-mobile-bar__chip--active"
              )}
              role="listitem"
            >
              <span className="store-equipment-mobile-bar__chip-label">{chip.label}</span>
              {chip.onRemove ? (
                <button
                  type="button"
                  className="store-equipment-mobile-bar__chip-remove"
                  onClick={chip.onRemove}
                  aria-label={`Убрать фильтр: ${chip.label}`}
                >
                  <X size={14} aria-hidden />
                </button>
              ) : null}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
