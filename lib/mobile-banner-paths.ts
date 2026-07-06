import { SENSORS_CATEGORY } from "@/lib/catalog";

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

export function getClientMobileBannerPath(filename: string): string {
  return `/processed/${encodeURI(filename)}`;
}

/** Путь к мобильному баннеру раздела (без fs — для клиентских компонентов). */
export function getClientMobileEquipmentCategoryBannerSrc(category: string): string | null {
  const filename = MOBILE_EQUIPMENT_CATEGORY_BANNER_FILES[category];
  if (!filename) return null;
  return getClientMobileBannerPath(filename);
}
