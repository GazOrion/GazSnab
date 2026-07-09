import fs from "fs";
import path from "path";
import { EQUIPMENT_CLUSTER_ORDER, SENSORS_CATEGORY } from "@/lib/catalog";
import { BPEK_CABLES_CATEGORY } from "@/lib/equipment-category-config";
import { BPEK_CABLES_BANNER_FILE, getClientMobileBannerPath } from "@/lib/mobile-banner-paths";

const mediaDir = path.join(process.cwd(), "public", "media");
const processedDir = path.join(process.cwd(), "public", "processed");

/** Категория каталога → файл в `public/media/` (синхронизация: `npm run sync:promo`). */
export const EQUIPMENT_CATEGORY_BANNER_FILES: Record<string, string> = {
  "Счётчики газа": "gas-meters-banner.webp",
  Телеметрия: "telemetry-banner.webp",
  ПО: "software-banner.webp",
  "Дополнительное оборудование": "additional-equipment-banner.webp",
  "Кабели БПЭК": "bpek-cables-banner.webp",
  [SENSORS_CATEGORY]: "regulators-banner.webp",
  ГРПШ: "gas-metering-units-banner.webp",
  Фильтры: "filters-banner.webp",
  Насосы: "pumps-banner.webp",
  "Краны шаровые": "ball-valves-banner.webp",
  "Корректоры газа": "korrektory-gaza-banner.webp"
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

function versionedProcessedSrc(filename: string): string {
  const filePath = path.join(processedDir, filename);
  try {
    const { mtimeMs } = fs.statSync(filePath);
    return `${getClientMobileBannerPath(filename)}?v=${mtimeMs}`;
  } catch {
    return getClientMobileBannerPath(filename);
  }
}

/** URL баннера раздела оборудования (если файл синхронизирован). */
export function getEquipmentCategoryBannerSrc(category: string): string | null {
  if (category === BPEK_CABLES_CATEGORY) {
    const processedPath = path.join(processedDir, BPEK_CABLES_BANNER_FILE);
    if (fs.existsSync(processedPath)) {
      return versionedProcessedSrc(BPEK_CABLES_BANNER_FILE);
    }
  }

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
