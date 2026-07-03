"use client";

import clsx from "clsx";
import { ChevronDown, RotateCcw } from "lucide-react";
import { useEffect, useId, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import type { CatalogProduct } from "@/components/ProductCard";
import {
  countByManufacturer,
  countBySectionFilter,
  getEquipmentFilterSectionOptions,
  shouldShowEquipmentPriceFilter,
  type EquipmentCategoryConfig,
  type EquipmentCategoryFilterState
} from "@/lib/equipment-category-config";
import {
  countGasMeterProductsWithTypeSize,
  GAS_METER_TYPE_SIZE_FILTER
} from "@/lib/gas-meters-catalog";

type Props = {
  products: CatalogProduct[];
  filters: EquipmentCategoryFilterState;
  bounds: { min: number; max: number };
  config: EquipmentCategoryConfig;
  onChange: (next: EquipmentCategoryFilterState) => void;
  onReset: () => void;
  className?: string;
  showReset?: boolean;
};

const VISIBLE_BRANDS = 6;

const FILTER_PANEL_PRICE = "price";
const FILTER_PANEL_MANUFACTURER = "manufacturer";
const FILTER_PANEL_AVAILABILITY = "availability";

function buildFilterPanelOrder(
  showPriceFilter: boolean,
  showManufacturers: boolean,
  config: EquipmentCategoryConfig,
  products: CatalogProduct[]
) {
  const panels: string[] = [];

  if (showPriceFilter) panels.push(FILTER_PANEL_PRICE);
  if (showManufacturers) panels.push(FILTER_PANEL_MANUFACTURER);

  for (const title of config.filterSections) {
    const options = getEquipmentFilterSectionOptions(products, config, title);
    if (options.length) panels.push(title);
  }

  panels.push(FILTER_PANEL_AVAILABILITY);
  return panels;
}

function createDefaultOpenPanels(firstPanelId: string | null) {
  return firstPanelId ? { [firstPanelId]: true } : {};
}

function FilterCollapse({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <div
      className={clsx("store-equipment-listing-filters__collapse", open && "is-open")}
      aria-hidden={!open}
    >
      <div className="store-equipment-listing-filters__collapse-inner">{children}</div>
    </div>
  );
}

export function EquipmentCategoryFilters({
  products,
  filters,
  bounds,
  config,
  onChange,
  onReset,
  className,
  showReset = true
}: Props) {
  const priceMinId = useId();
  const priceMaxId = useId();
  const [showAllBrands, setShowAllBrands] = useState(false);

  const showManufacturers = config.manufacturers.length > 0;
  const showPriceFilter = shouldShowEquipmentPriceFilter(config, bounds);

  const panelOrder = useMemo(
    () => buildFilterPanelOrder(showPriceFilter, showManufacturers, config, products),
    [showPriceFilter, showManufacturers, config, products]
  );

  const firstPanelId = panelOrder[0] ?? null;

  const [openPanels, setOpenPanels] = useState<Record<string, boolean>>(() =>
    createDefaultOpenPanels(firstPanelId)
  );

  useEffect(() => {
    setOpenPanels(createDefaultOpenPanels(firstPanelId));
    setShowAllBrands(false);
  }, [config.category, firstPanelId, products]);

  const inStockCount = useMemo(
    () => products.filter((product) => product.inStock !== false).length,
    [products]
  );

  const brandRows = useMemo(
    () =>
      config.manufacturers.map((brand) => ({
        brand,
        count: countByManufacturer(products, brand)
      })),
    [config.manufacturers, products]
  );

  const visibleBrands = showAllBrands ? brandRows : brandRows.slice(0, VISIBLE_BRANDS);

  function updatePriceMin(value: number) {
    onChange({
      ...filters,
      priceMin: Math.min(value, filters.priceMax)
    });
  }

  function updatePriceMax(value: number) {
    onChange({
      ...filters,
      priceMax: Math.max(value, filters.priceMin)
    });
  }

  function toggleManufacturer(brand: string) {
    const next = filters.manufacturers.includes(brand)
      ? filters.manufacturers.filter((item) => item !== brand)
      : [...filters.manufacturers, brand];
    onChange({ ...filters, manufacturers: next });
  }

  function toggleSectionFilter(section: string, value: string) {
    const current = filters.sectionFilters[section] ?? [];
    const nextValues = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    onChange({
      ...filters,
      sectionFilters: {
        ...filters.sectionFilters,
        [section]: nextValues
      }
    });
  }

  function isPanelOpen(panelId: string) {
    if (openPanels[panelId] !== undefined) return openPanels[panelId];
    return panelId === firstPanelId;
  }

  function togglePanel(panelId: string) {
    setOpenPanels((current) => {
      const open = current[panelId] ?? panelId === firstPanelId;
      return { ...current, [panelId]: !open };
    });
  }

  function handleReset() {
    setOpenPanels(createDefaultOpenPanels(firstPanelId));
    setShowAllBrands(false);
    onReset();
  }

  const rangeSpan = Math.max(bounds.max - bounds.min, 1);
  const minPercent = ((filters.priceMin - bounds.min) / rangeSpan) * 100;
  const maxPercent = ((filters.priceMax - bounds.min) / rangeSpan) * 100;

  return (
    <aside
      className={clsx("store-equipment-listing-filters", className)}
      aria-label="Фильтры каталога"
    >
      {showPriceFilter ? (
      <div className="store-equipment-listing-filters__group">
        <button
          type="button"
          className="store-equipment-listing-filters__head"
          onClick={() => togglePanel(FILTER_PANEL_PRICE)}
          aria-expanded={isPanelOpen(FILTER_PANEL_PRICE)}
        >
          <span>Цена, ₽</span>
          <ChevronDown
            size={18}
            className={clsx(
              "store-equipment-listing-filters__chevron",
              isPanelOpen(FILTER_PANEL_PRICE) && "is-open"
            )}
            aria-hidden
          />
        </button>
        <FilterCollapse open={isPanelOpen(FILTER_PANEL_PRICE)}>
          <div className="store-equipment-listing-filters__body">
            <div
              className="store-equipment-listing-filters__range"
              style={
                {
                  "--range-min": `${minPercent}%`,
                  "--range-max": `${maxPercent}%`
                } as CSSProperties
              }
            >
              <input
                type="range"
                className="store-equipment-listing-filters__range-input store-equipment-listing-filters__range-input--min"
                min={bounds.min}
                max={bounds.max}
                value={filters.priceMin}
                onChange={(event) => updatePriceMin(Number(event.target.value))}
                aria-label="Минимальная цена"
              />
              <input
                type="range"
                className="store-equipment-listing-filters__range-input store-equipment-listing-filters__range-input--max"
                min={bounds.min}
                max={bounds.max}
                value={filters.priceMax}
                onChange={(event) => updatePriceMax(Number(event.target.value))}
                aria-label="Максимальная цена"
              />
            </div>
            <div className="store-equipment-listing-filters__price-fields">
              <label className="store-equipment-listing-filters__price-field" htmlFor={priceMinId}>
                <span className="visually-hidden">Цена от</span>
                <span className="store-equipment-listing-filters__price-prefix">от</span>
                <input
                  id={priceMinId}
                  type="number"
                  min={bounds.min}
                  max={filters.priceMax}
                  value={filters.priceMin}
                  onChange={(event) => updatePriceMin(Number(event.target.value) || bounds.min)}
                />
              </label>
              <label className="store-equipment-listing-filters__price-field" htmlFor={priceMaxId}>
                <span className="visually-hidden">Цена до</span>
                <span className="store-equipment-listing-filters__price-prefix">до</span>
                <input
                  id={priceMaxId}
                  type="number"
                  min={filters.priceMin}
                  max={bounds.max}
                  value={filters.priceMax}
                  onChange={(event) => updatePriceMax(Number(event.target.value) || bounds.max)}
                />
              </label>
            </div>
          </div>
        </FilterCollapse>
      </div>
      ) : null}

      {showManufacturers ? (
        <div className="store-equipment-listing-filters__group">
          <button
            type="button"
            className="store-equipment-listing-filters__head"
            onClick={() => togglePanel(FILTER_PANEL_MANUFACTURER)}
            aria-expanded={isPanelOpen(FILTER_PANEL_MANUFACTURER)}
          >
            <span>Производитель</span>
            <ChevronDown
              size={18}
              className={clsx(
                "store-equipment-listing-filters__chevron",
                isPanelOpen(FILTER_PANEL_MANUFACTURER) && "is-open"
              )}
              aria-hidden
            />
          </button>
          <FilterCollapse open={isPanelOpen(FILTER_PANEL_MANUFACTURER)}>
            <div className="store-equipment-listing-filters__body">
              <ul className="store-equipment-listing-filters__checks">
                {visibleBrands.map(({ brand, count }) => (
                  <li key={brand}>
                    <label className="store-equipment-listing-filters__check">
                      <input
                        type="checkbox"
                        checked={filters.manufacturers.includes(brand)}
                        onChange={() => toggleManufacturer(brand)}
                        disabled={count === 0}
                      />
                      <span>
                        {brand}
                        {count > 0 ? ` (${count})` : ""}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
              {brandRows.length > VISIBLE_BRANDS ? (
                <button
                  type="button"
                  className="store-equipment-listing-filters__more"
                  onClick={() => setShowAllBrands((value) => !value)}
                >
                  {showAllBrands ? "Свернуть" : "Показать ещё"}
                </button>
              ) : null}
            </div>
          </FilterCollapse>
        </div>
      ) : null}

      {config.filterSections.map((title) => {
        const options = getEquipmentFilterSectionOptions(products, config, title);
        const sectionOpen = isPanelOpen(title);

        if (!options.length) return null;

        return (
          <div className="store-equipment-listing-filters__group" key={title}>
            <button
              type="button"
              className="store-equipment-listing-filters__head"
              onClick={() => togglePanel(title)}
              aria-expanded={sectionOpen}
            >
              <span>{title}</span>
              <ChevronDown
                size={18}
                className={clsx(
                  "store-equipment-listing-filters__chevron",
                  sectionOpen && "is-open"
                )}
                aria-hidden
              />
            </button>
            <FilterCollapse open={sectionOpen}>
              <div className="store-equipment-listing-filters__body">
                {title === GAS_METER_TYPE_SIZE_FILTER ? (
                  <p className="store-equipment-listing-filters__note">
                    Число у типоразмера — сколько позиций с этим G. С типоразмером:{" "}
                    {countGasMeterProductsWithTypeSize(products)} из {products.length}.
                  </p>
                ) : null}
                <ul className="store-equipment-listing-filters__checks">
                  {options.map((option) => {
                    const count = countBySectionFilter(products, title, option);
                    const selected = filters.sectionFilters[title]?.includes(option) ?? false;

                    return (
                      <li key={option}>
                        <label className="store-equipment-listing-filters__check">
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => toggleSectionFilter(title, option)}
                            disabled={count === 0}
                          />
                          <span>
                            {option}
                            {count > 0 ? ` (${count})` : ""}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </FilterCollapse>
          </div>
        );
      })}

      <div className="store-equipment-listing-filters__group">
        <button
          type="button"
          className="store-equipment-listing-filters__head store-equipment-listing-filters__head--plain"
          onClick={() => togglePanel(FILTER_PANEL_AVAILABILITY)}
          aria-expanded={isPanelOpen(FILTER_PANEL_AVAILABILITY)}
        >
          <span>Наличие</span>
          <ChevronDown
            size={18}
            className={clsx(
              "store-equipment-listing-filters__chevron",
              isPanelOpen(FILTER_PANEL_AVAILABILITY) && "is-open"
            )}
            aria-hidden
          />
        </button>
        <FilterCollapse open={isPanelOpen(FILTER_PANEL_AVAILABILITY)}>
          <div className="store-equipment-listing-filters__body">
            <label className="store-equipment-listing-filters__check">
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={(event) =>
                  onChange({ ...filters, inStockOnly: event.target.checked })
                }
              />
              <span>В наличии ({inStockCount})</span>
            </label>
          </div>
        </FilterCollapse>
      </div>

      {showReset ? (
        <button type="button" className="store-equipment-listing-filters__reset" onClick={handleReset}>
          <RotateCcw size={16} aria-hidden />
          Сбросить фильтры
        </button>
      ) : null}
    </aside>
  );
}
