import type { ProductRichContent } from "@/lib/product-content/smt-kompleks";
import { KMCH_DLYA_KORREKTOROV_LIST_ITEMS } from "@/lib/product-content/kmch-dlya-korrektorov";

const MEDIA_BASE = "/media/products/preobrazovateli-kmch-korrektory";

export const PREOBRAZOVATELI_I_KMCH_DLYA_KORREKTOROV_SLUG = "preobrazovateli-i-kmch-dlya-korrektorov";

export const PREOBRAZOVATELI_I_KMCH_DLYA_KORREKTOROV_CARD_IMAGE = `${MEDIA_BASE}/card.webp`;

export const PREOBRAZOVATELI_I_KMCH_DLYA_KORREKTOROV_GALLERY = [
  PREOBRAZOVATELI_I_KMCH_DLYA_KORREKTOROV_CARD_IMAGE,
  `${MEDIA_BASE}/pkkm-01.webp`,
  `${MEDIA_BASE}/pkkm-02.webp`,
  `${MEDIA_BASE}/pkkm-03.webp`,
  `${MEDIA_BASE}/pkkm-04.webp`
];

export const PREOBRAZOVATELI_I_KMCH_DLYA_KORREKTOROV_CARD_DESCRIPTION =
  "Преобразователи, арматура и комплекты монтажных частей для корректоров объёма газа ЕК270 и ТС220.";

const PREOBRAZOVATELI_I_ARMATURA_ITEMS = [
  "Преобразователь перепада давления с КМЧ для ЕК270 — внешний преобразователь перепада давления с цифровым выходным сигналом",
  "Преобразователь температуры для ЕК270 — дополнительный преобразователь, предназначенный для контроля температуры окружающей среды",
  "Кран 2-х ходовой"
];

const KMCH_DLYA_RVG_RABO_TRZ_SG_ITEMS = [
  "КМЧ СГ-ЭК-Р, СГ-ЭК-Т — КМЧ для монтажа ЕК270 на счетчики газа типа RVG, RABO, TRZ, СГ",
  "КМЧ СГ-ТК-Р, СГ-ТК-Т — КМЧ для монтажа ТС220 на счетчики газа типа RVG, RABO, TRZ"
];

const KMCH_DLYA_RG_R_RG_T_ITEMS = [
  "КМЧ СГ-ЭК-Р, СГ-ЭК-Т — КМЧ для монтажа ЕК270 на счетчики газа типа РГ-Р, РГ-Т (с НЧ ДИ)",
  "КМЧ СГ-ТК-Р, СГ-ТК-Т — КМЧ для монтажа ТС220 на счетчики газа типа РГ-Р, РГ-Т (с НЧ ДИ)",
  "КМЧ СГ-ЭК-Р, СГ-ЭК-Т — КМЧ для монтажа ЕК270 на счетчики газа типа РГ-Р, РГ-Т",
  "КМЧ СГ-ТК-Р, СГ-ТК-Т — КМЧ для монтажа ТС220 на счетчики газа типа РГ-Р, РГ-Т"
];

export const PREOBRAZOVATELI_I_KMCH_DLYA_KORREKTOROV_CONTENT: ProductRichContent = {
  descriptionTitle: "Подробное описание",
  description: [
    {
      type: "paragraph",
      text: "Преобразователи, арматура и комплекты монтажных частей для корректоров объёма газа ЕК270 и ТС220."
    },
    {
      type: "heading",
      text: "Преобразователи и арматура",
      level: 4
    },
    {
      type: "list",
      items: PREOBRAZOVATELI_I_ARMATURA_ITEMS
    },
    {
      type: "heading",
      text: "КМЧ для счётчиков газа BK",
      level: 4
    },
    {
      type: "list",
      items: KMCH_DLYA_KORREKTOROV_LIST_ITEMS
    },
    {
      type: "heading",
      text: "КМЧ для ротационных и турбинных счётчиков (RVG, RABO, TRZ, СГ)",
      level: 4
    },
    {
      type: "list",
      items: KMCH_DLYA_RVG_RABO_TRZ_SG_ITEMS
    },
    {
      type: "heading",
      text: "КМЧ для ротационных и турбинных счётчиков РГ-Р и РГ-Т",
      level: 4
    },
    {
      type: "list",
      items: KMCH_DLYA_RG_R_RG_T_ITEMS
    }
  ]
};
