"use client";

import { FormEvent, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, Search } from "lucide-react";
import type { CatalogProduct } from "@/components/ProductCard";
import { EquipmentCategoryFilters } from "@/components/catalog/EquipmentCategoryFilters";
import type { EquipmentCategoryConfig, EquipmentCategoryFilterState } from "@/lib/equipment-category-config";

type Props = {
  open: boolean;
  onClose: () => void;
  products: CatalogProduct[];
  filters: EquipmentCategoryFilterState;
  bounds: { min: number; max: number };
  config: EquipmentCategoryConfig;
  onChange: (next: EquipmentCategoryFilterState) => void;
  onReset: () => void;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
};

export function EquipmentCategoryFilterDrawer({
  open,
  onClose,
  products,
  filters,
  bounds,
  config,
  onChange,
  onReset,
  searchQuery,
  onSearchQueryChange
}: Props) {
  const searchInputId = useId();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  function onSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return createPortal(
    <div className="store-filter-drawer-root" role="presentation">
      <button
        type="button"
        className="store-filter-drawer-backdrop"
        onClick={onClose}
        aria-label="Закрыть фильтры"
      />
      <aside className="store-filter-drawer" aria-label="Фильтры каталога">
        <header className="store-filter-drawer__head">
          <div className="store-filter-drawer__head-start">
            <button
              type="button"
              className="store-filter-drawer__back"
              onClick={onClose}
              aria-label="Назад"
            >
              <ArrowLeft size={22} strokeWidth={2} aria-hidden />
            </button>
            <h2 className="store-filter-drawer__title">Фильтры</h2>
          </div>
          <button type="button" className="store-filter-drawer__reset-all" onClick={onReset}>
            Сбросить всё
          </button>
        </header>

        <div className="store-filter-drawer__body">
          <form className="store-filter-drawer__search" onSubmit={onSearchSubmit}>
            <label className="visually-hidden" htmlFor={searchInputId}>
              Поиск
            </label>
            <input
              id={searchInputId}
              className="store-filter-drawer__search-input"
              type="search"
              placeholder="Поиск в разделе"
              value={searchQuery}
              onChange={(event) => onSearchQueryChange(event.target.value)}
              autoComplete="off"
            />
            <Search size={18} className="store-filter-drawer__search-icon" aria-hidden />
          </form>

          <EquipmentCategoryFilters
            className="store-equipment-listing-filters--drawer"
            products={products}
            filters={filters}
            bounds={bounds}
            config={config}
            onChange={onChange}
            onReset={onReset}
            showReset={false}
          />
        </div>

        <footer className="store-filter-drawer__foot">
          <button type="button" className="store-filter-drawer__apply" onClick={onClose}>
            Показать товары
          </button>
        </footer>
      </aside>
    </div>,
    document.body
  );
}
