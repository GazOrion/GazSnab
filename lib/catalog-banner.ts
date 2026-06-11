import fs from "fs";
import path from "path";
import { EQUIPMENT_CLUSTER_ORDER } from "@/lib/catalog";

const mediaDir = path.join(process.cwd(), "public", "media");

/** Категория каталога → файл в `public/media/` (синхронизация: `npm run sync:promo`). */
export const EQUIPMENT_CATEGORY_BANNER_FILES: Record<string, string> = {
  "Счётчики газа": "gas-meters-banner.webp",
  Телеметрия: "telemetry-banner.webp",
  ПО: "software-banner.webp",
  "Дополнительное оборудование": "additional-equipment-banner.webp",
  "Газорегуляторные пункты": "regulators-banner.webp",
  ГРПШ: "gas-metering-units-banner.webp",
  "Узлы учета": "gas-alarm-banner.webp",
  Фильтры: "filters-banner.webp",
  Насосы: "pumps-banner.webp",
  "Краны шаровые": "ball-valves-banner.webp",
  "Запорная арматура": "ball-valves-banner.webp"
};

function versionedMediaSrc(filename: string): string {
  const filePath = path.join(mediaDir, filename);
  try {
    const { mtimeMs } = fs.statSync(filePath);
    return `/media/${filename}?v=${mtimeMs}`;
  } catch {
    return `/media/${filename}`;
  }
}

/** URL баннера каталога с версией по дате файла — обновляется после `npm run sync:promo`. */
export function getCatalogBannerSrc(): string {
  return versionedMediaSrc("catalog-banner.webp");
}

/** URL баннера страницы услуг (`media/баннер для услуг.webp` → `npm run sync:promo`). */
export function getServicesCatalogBannerSrc(): string | null {
  const filename = "services-banner.webp";
  const filePath = path.join(mediaDir, filename);
  if (!fs.existsSync(filePath)) return null;
  return versionedMediaSrc(filename);
}

/** URL баннера раздела оборудования (если файл синхронизирован). */
export function getEquipmentCategoryBannerSrc(category: string): string | null {
  const filename = EQUIPMENT_CATEGORY_BANNER_FILES[category];
  if (!filename) return null;
  const filePath = path.join(mediaDir, filename);
  if (!fs.existsSync(filePath)) return null;
  return versionedMediaSrc(filename);
}

/** Баннеры всех разделов оборудования для страниц категорий. */
export function getEquipmentCategoryBannerMap(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const category of EQUIPMENT_CLUSTER_ORDER) {
    const src = getEquipmentCategoryBannerSrc(category);
    if (src) map[category] = src;
  }
  return map;
}
