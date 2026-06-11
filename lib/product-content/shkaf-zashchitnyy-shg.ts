import type { ProductRichContent } from "@/lib/product-content/smt-kompleks";

const IMG = "/media/products/accessories/shg";

export const SHKAF_ZASHCHITNYY_SHG_CONTENT: ProductRichContent = {
  descriptionTitle: "Подробное описание",
  description: [
    {
      type: "paragraph",
      text: "Шкаф защитный ШГ рассчитан для работы в диапазоне температур от -50°С до +50°С, относительной влажности 100% при температуре +25°С и имеет 3 варианта исполнения:"
    },
    {
      type: "data-table",
      table: {
        columns: [
          "Наименование",
          "Применяемость",
          "Диаметр условного прохода",
          "Размер, ДхШхВ, мм",
          "Вес не более, кг"
        ],
        rows: [
          [
            "Шкаф защитный ШГ-1",
            "СМТ-Комплекс G4/G6/G10/G16/G25",
            "15/20/25/32/40",
            "405×405×250",
            "9"
          ],
          [
            "Шкаф защитный ШГ-2",
            "СМТ-Смарт G4/G6/G10",
            "15/20/25/32",
            "310×310×200",
            "6"
          ],
          [
            "Шкаф защитный ШГ-3",
            "СМТ-Комплекс G40/G40-2/G65/G100",
            "15/20/25/32/40/50/80",
            "720×400×350",
            "10"
          ]
        ]
      }
    },
    { type: "heading", text: "Сборка шкафа защитного", level: 3 },
    {
      type: "figure",
      imageSrc: `${IMG}/shg-assembly.png`,
      imageAlt: "Сборка шкафа защитного ШГ",
      expandable: true
    }
  ],
  specsTitle: "Характеристики",
  specs: []
};
