import fs from "fs";
import path from "path";
import { EQUIPMENT_CLUSTER_ORDER, SENSORS_CATEGORY } from "@/lib/catalog";

const processedDir = path.join(process.cwd(), "public", "processed");

/** Файлы в `public/processed/` для баннеров на мобилках (≤768px). */
export const MOBILE_BANNER_FILES = {
  home: "главный экран.webp",
  equipmentPromo: "Готовое оборудование.webp",
  metalworking: "металлообработка.webp",
  catalog: "Каталог.webp",
  services: "услуги.webp"
} as const;

/** Раздел каталога оборудования → мобильный баннер. */
export const MOBILE_EQUIPMENT_CATEGORY_BANNER_FILES: Record<string, string> = {
  "Счётчики газа": "счетчики газа.webp",
  Телеметрия: "телеметрия.webp",
  ПО: "ПО.webp",
  "Дополнительное оборудование": "доп оборудование.webp",
  ГРПШ: "грпш.webp",
  [SENSORS_CATEGORY]: "датчики.webp",
  Фильтры: "фильтры и фитинги.webp",
  Насосы: "насосы.webp",
  "Краны шаровые": "краны.webp",
  "Корректоры газа": "корректоры.webp"
};

function mobileProcessedSrc(filename: string): string | null {
  const filePath = path.join(processedDir, filename);
  if (!fs.existsSync(filePath)) return null;
  try {
    const { mtimeMs } = fs.statSync(filePath);
    return `/processed/${encodeURI(filename)}?v=${mtimeMs}`;
  } catch {
    return `/processed/${encodeURI(filename)}`;
  }
}

export function getMobileMainBannerSrc(): string | null {
  return mobileProcessedSrc(MOBILE_BANNER_FILES.home);
}

export function getMobileEquipmentPromoBannerSrc(): string | null {
  return mobileProcessedSrc(MOBILE_BANNER_FILES.equipmentPromo);
}

export function getMobileMetalworkingBannerSrc(): string | null {
  return mobileProcessedSrc(MOBILE_BANNER_FILES.metalworking);
}

export function getMobileCatalogBannerSrc(): string | null {
  return mobileProcessedSrc(MOBILE_BANNER_FILES.catalog);
}

/** Баннер страницы услуг на мобилке. */
export function getMobileServicesCatalogBannerSrc(): string | null {
  return mobileProcessedSrc(MOBILE_BANNER_FILES.services);
}

export function getMobileEquipmentCategoryBannerSrc(category: string): string | null {
  const filename = MOBILE_EQUIPMENT_CATEGORY_BANNER_FILES[category];
  if (!filename) return null;
  return mobileProcessedSrc(filename);
}

export function getMobileEquipmentCategoryBannerMap(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const category of EQUIPMENT_CLUSTER_ORDER) {
    const src = getMobileEquipmentCategoryBannerSrc(category);
    if (src) map[category] = src;
  }
  return map;
}
