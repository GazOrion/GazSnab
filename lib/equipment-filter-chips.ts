import type { EquipmentCategoryConfig, EquipmentCategoryFilterState } from "@/lib/equipment-category-config";
import { shouldShowEquipmentPriceFilter } from "@/lib/equipment-category-config";

export type EquipmentFilterChip = {
  id: string;
  label: string;
  tone: "active" | "muted";
  onRemove?: () => void;
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value);
}

export function countActiveEquipmentFilters(
  filters: EquipmentCategoryFilterState,
  bounds: { min: number; max: number },
  config: EquipmentCategoryConfig,
  searchQuery: string
) {
  let count = 0;

  if (searchQuery.trim()) count += 1;

  if (
    shouldShowEquipmentPriceFilter(config, bounds) &&
    (filters.priceMin > bounds.min || filters.priceMax < bounds.max)
  ) {
    count += 1;
  }

  count += filters.manufacturers.length;

  for (const values of Object.values(filters.sectionFilters)) {
    count += values?.length ?? 0;
  }

  if (filters.inStockOnly) count += 1;

  return count;
}

export function buildEquipmentFilterChips(
  filters: EquipmentCategoryFilterState,
  bounds: { min: number; max: number },
  config: EquipmentCategoryConfig,
  searchQuery: string,
  handlers: {
    onReset: () => void;
    onRemoveSearch: () => void;
    onResetPrice: () => void;
    onRemoveManufacturer: (brand: string) => void;
    onRemoveSectionFilter: (section: string, value: string) => void;
    onClearInStock: () => void;
  }
): EquipmentFilterChip[] {
  const chips: EquipmentFilterChip[] = [];

  if (searchQuery.trim()) {
    chips.push({
      id: "search",
      label: `Поиск: ${searchQuery.trim()}`,
      tone: "active",
      onRemove: handlers.onRemoveSearch
    });
  }

  if (
    shouldShowEquipmentPriceFilter(config, bounds) &&
    (filters.priceMin > bounds.min || filters.priceMax < bounds.max)
  ) {
    chips.push({
      id: "price",
      label: `Цена: ${formatPrice(filters.priceMin)}–${formatPrice(filters.priceMax)} ₽`,
      tone: "active",
      onRemove: handlers.onResetPrice
    });
  }

  for (const brand of filters.manufacturers) {
    chips.push({
      id: `brand-${brand}`,
      label: brand,
      tone: "active",
      onRemove: () => handlers.onRemoveManufacturer(brand)
    });
  }

  for (const [section, values] of Object.entries(filters.sectionFilters)) {
    for (const value of values ?? []) {
      chips.push({
        id: `${section}-${value}`,
        label: `${section}: ${value}`,
        tone: "active",
        onRemove: () => handlers.onRemoveSectionFilter(section, value)
      });
    }
  }

  chips.push({
    id: "availability",
    label: filters.inStockOnly ? "В наличии" : "Наличие: все",
    tone: filters.inStockOnly ? "active" : "muted",
    onRemove: filters.inStockOnly ? handlers.onClearInStock : undefined
  });

  const hasRemovableFilters = chips.some((chip) => chip.id !== "availability" && chip.onRemove);

  if (hasRemovableFilters || filters.inStockOnly) {
    chips.push({
      id: "reset",
      label: "Сбросить фильтры",
      tone: "muted",
      onRemove: handlers.onReset
    });
  }

  return chips;
}
