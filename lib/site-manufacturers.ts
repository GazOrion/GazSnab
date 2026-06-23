export const SITE_MANUFACTURERS = ["РАСКО", "Техномер", "ТАУГАЗ", "Юнипамп"] as const;

export type SiteManufacturer = (typeof SITE_MANUFACTURERS)[number];

/** Производители в фильтре раздела «Счётчики газа» и «Телеметрия». */
export const GAS_METER_FILTER_MANUFACTURERS = ["Техномер", "ТАУГАЗ", "РАСКО"] as const;

/** Производители в фильтре раздела «Корректоры газа». */
export const GAS_CORRECTOR_FILTER_MANUFACTURERS = ["РАСКО"] as const;

/** Производители в фильтре раздела «Насосы» (когда появятся товары). */
export const PUMP_FILTER_MANUFACTURERS = ["Юнипамп"] as const;
