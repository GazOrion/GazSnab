import fs from "fs";
import path from "path";
import { EQUIPMENT_CLUSTER_ORDER } from "@/lib/catalog";
import {
  MOBILE_BANNER_FILES,
  MOBILE_EQUIPMENT_CATEGORY_BANNER_FILES,
  getClientMobileBannerPath
} from "@/lib/mobile-banner-paths";

export { MOBILE_BANNER_FILES, MOBILE_EQUIPMENT_CATEGORY_BANNER_FILES } from "@/lib/mobile-banner-paths";

const processedDir = path.join(process.cwd(), "public", "processed");

function mobileProcessedSrc(filename: string): string | null {
  const filePath = path.join(processedDir, filename);
  if (!fs.existsSync(filePath)) return null;
  try {
    const { mtimeMs } = fs.statSync(filePath);
    return `${getClientMobileBannerPath(filename)}?v=${mtimeMs}`;
  } catch {
    return getClientMobileBannerPath(filename);
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
