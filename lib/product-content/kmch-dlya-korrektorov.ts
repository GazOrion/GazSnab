import type { ProductRichContent } from "@/lib/product-content/smt-kompleks";

const MEDIA_BASE = "/media/products/kmch-korrektory";

export const KMCH_DLYA_KORREKTOROV_SLUG = "kmch-dlya-korrektorov";

export const KMCH_DLYA_KORREKTOROV_CARD_IMAGE = `${MEDIA_BASE}/kmch-card.webp`;

export const KMCH_DLYA_KORREKTOROV_GALLERY = [KMCH_DLYA_KORREKTOROV_CARD_IMAGE];

export const KMCH_DLYA_KORREKTOROV_CARD_DESCRIPTION =
  "Комплекты монтажных частей для установки корректора ТС-220 на счётчики газа типа BK.";

export const KMCH_DLYA_KORREKTOROV_LIST_ITEMS = [
  "КМЧ для установки ТС220 на корпус счетчика газа типа BK (измерение t на корпусе счетчика)",
  "КМЧ для установки ТС220 в гильзу датчика температуры счетчика газа BK G40, BK G65, BKG100",
  "КМЧ для установки ТС220 на стену (корпус) и монтажа датчика температуры в патрубок Ду=25 мм (1 ¼″) счетчика газа типа BK",
  "КМЧ для установки ТС220 на стену (корпус) и монтажа датчика температуры в патрубок Ду=40 мм (2″) счетчика газа типа BK",
  "КМЧ установки ТС220 на стену (корпус) и монтажа датчика температуры в патрубок Ду=50 мм (2 ½″) счетчика газа типа BK"
];

export const KMCH_DLYA_KORREKTOROV_CONTENT: ProductRichContent = {
  descriptionTitle: "Подробное описание",
  description: [
    {
      type: "paragraph",
      text: "Комплекты монтажных частей для установки корректора объёма газа ТС-220:"
    },
    {
      type: "list",
      items: KMCH_DLYA_KORREKTOROV_LIST_ITEMS
    }
  ]
};
