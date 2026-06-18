const BASE = "/media/products/gas-metering-units";

export const GRP_SH_04_IMAGE = `${BASE}/grp-sh-04-2u1-Photoroom_csecollege.webp`;
export const GRP_SH_32_IMAGE = `${BASE}/grp-sh-32-2u1-Photoroom_csecollege.webp`;
export const GRP_SH_10MS_IMAGE = `${BASE}/grp-sh-10ms-2u1-Photoroom_csecollege.webp`;

/** Превью категории «ГРПШ» на главной и в навигации каталога. */
export const GAS_METERING_UNITS_CARD_IMAGE = GRP_SH_32_IMAGE;

export const GRP_IMAGE_BY_SLUG: Record<string, string> = {
  "grp-sh-04-2u1": GRP_SH_04_IMAGE,
  "grp-sh-32-2u1": GRP_SH_32_IMAGE,
  "grp-sh-10ms-2u1": GRP_SH_10MS_IMAGE
};
