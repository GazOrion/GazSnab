"use client";

import clsx from "clsx";
import { LayoutGrid, LayoutList } from "lucide-react";
import type { ListingLayoutMode } from "@/components/catalog/EquipmentCategoryListingToolbar";

type Props = {
  layout: ListingLayoutMode;
  onLayoutChange: (layout: ListingLayoutMode) => void;
  className?: string;
};

export function CatalogLayoutToggle({ layout, onLayoutChange, className }: Props) {
  return (
    <div
      className={clsx("store-equipment-catalog-view", className)}
      role="group"
      aria-label="Вид списка"
    >
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
  );
}
