import type { ProductRichContent } from "@/lib/product-content/smt-kompleks";

const MEDIA_BASE = "/media/products/gas-meter-kpu";

export const GAS_METER_KPU_SLUG = "kpu-dlya-rotary-schetchikov-gaza";

export const GAS_METER_KPU_CARD_IMAGE = `${MEDIA_BASE}/kpu-card.webp`;

export const GAS_METER_KPU_TITLE =
  "КПУ для ротационных счетчиков газа РГ-Р, RABO и RVG (исп. фланцевое по ГОСТ 12815)";

export const GAS_METER_KPU_SHORT_DESCRIPTION =
  "Прямоточные и измерительные участки КПУ для ротационных счётчиков газа РГ-Р, RABO и RVG. Фланцевое исполнение по ГОСТ 12815.";

export const GAS_METER_KPU_LIST_ITEMS = [
  "КПУ-50/Р — Ду=50 мм, два участка, места отбора давления и температуры",
  "КПУ-80/Р — Ду=80 мм, два участка, места отбора давления и температуры",
  "КПУ-100/Р — Ду=100 мм, два участка, места отбора давления и температуры",
  "КПУ-150/Р — Ду=150 мм, два участка, места отбора давления и температуры"
];

export const GAS_METER_KPU_CONTENT: ProductRichContent = {
  descriptionTitle: "Подробное описание",
  description: [
    {
      type: "paragraph",
      text: "КПУ для ротационных счётчиков газа РГ-Р, RABO и RVG (исп. фланцевое по ГОСТ 12815):"
    },
    {
      type: "list",
      items: GAS_METER_KPU_LIST_ITEMS
    }
  ]
};

export const GAS_METER_KPU_TURBINE_SLUG = "kpu-dlya-turbine-schetchikov-gaza";

export const GAS_METER_KPU_TURBINE_TITLE =
  "КПУ для турбинных счетчиков газа РГ-Т и TRZ (исп. фланцевое по ГОСТ 12815)";

export const GAS_METER_KPU_TURBINE_SHORT_DESCRIPTION =
  "Прямоточные и измерительные участки КПУ для турбинных счётчиков газа РГ-Т и TRZ. Фланцевое исполнение по ГОСТ 12815, включая варианты для Рмах=10 МПа.";

export const GAS_METER_KPU_TURBINE_LIST_ITEMS = [
  "КПУ-50/Т2 — Ду=50 мм, два участка, места отбора давления и температуры",
  "КПУ-80/Т2 — Ду=80 мм, два участка, места отбора давления и температуры",
  "КПУ-100/Т2 — Ду=100 мм, два участка, места отбора давления и температуры",
  "КПУ-150/Т2 — Ду=150 мм, два участка, места отбора давления и температуры",
  "КПУ-200/Т2 — Ду=200 мм, два участка, места отбора давления и температуры",
  "КПУ-250/Т2 — Ду=250 мм, два участка, места отбора давления и температуры",
  "КПУ-300/Т2 — Ду=300 мм, два участка, места отбора давления и температуры"
];

export const GAS_METER_KPU_TURBINE_HIGH_PRESSURE_LIST_ITEMS = [
  "КПУ-ВД-50/Т2 — Ду=50 мм, два участка, места отбора давления и температуры",
  "КПУ-ВД-80/Т2 — Ду=80 мм, два участка, места отбора давления и температуры",
  "КПУ-ВД-100/Т2 — Ду=100 мм, два участка, места отбора давления и температуры",
  "КПУ-ВД-150/Т2 — Ду=150 мм, два участка, места отбора давления и температуры",
  "КПУ-ВД-200/Т2 — Ду=200 мм, два участка, места отбора давления и температуры",
  "КПУ-ВД-250/Т2 — Ду=250 мм, два участка, места отбора давления и температуры",
  "КПУ-ВД-300/Т2 — Ду=300 мм, два участка, места отбора давления и температуры"
];

export const GAS_METER_KPU_TURBINE_CONTENT: ProductRichContent = {
  descriptionTitle: "Подробное описание",
  description: [
    {
      type: "paragraph",
      text: "КПУ для турбинных счетчиков газа РГ-Т и TRZ (исп. фланцевое по ГОСТ 12815):"
    },
    {
      type: "list",
      items: GAS_METER_KPU_TURBINE_LIST_ITEMS
    },
    {
      type: "heading",
      text: "КПУ для турбинных счётчиков газа РГ-Т (Рмах=10 МПа)",
      level: 4
    },
    {
      type: "list",
      items: GAS_METER_KPU_TURBINE_HIGH_PRESSURE_LIST_ITEMS
    }
  ]
};

export const GAS_METER_KPU_SG_SLUG = "kpu-dlya-turbine-schetchikov-sg";

export const GAS_METER_KPU_SG_TITLE =
  "КПУ для турбинных счетчиков газа СГ (исп. фланцевое по ГОСТ 12815)";

export const GAS_METER_KPU_SG_SHORT_DESCRIPTION =
  "Прямоточные и измерительные участки КПУ для турбинных счётчиков газа СГ. Фланцевое исполнение по ГОСТ 12815.";

export const GAS_METER_KPU_SG_LIST_ITEMS = [
  "КПУ-50/Т1 — Ду=50 мм, два участка, места отбора давления и температуры",
  "КПУ-80/Т1 — Ду=80 мм, два участка, места отбора давления и температуры",
  "КПУ-100/Т1 — Ду=100 мм, два участка, места отбора давления и температуры",
  "КПУ-150/Т1 — Ду=150 мм, два участка, места отбора давления и температуры",
  "КПУ-200/Т1 — Ду=200 мм, два участка, места отбора давления и температуры"
];

export const GAS_METER_KPU_SG_CONTENT: ProductRichContent = {
  descriptionTitle: "Подробное описание",
  description: [
    {
      type: "paragraph",
      text: "КПУ для турбинных счетчиков газа СГ (исп. фланцевое по ГОСТ 12815):"
    },
    {
      type: "list",
      items: GAS_METER_KPU_SG_LIST_ITEMS
    }
  ]
};
