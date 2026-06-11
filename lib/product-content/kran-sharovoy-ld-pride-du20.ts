import type { ProductRichContent } from "@/lib/product-content/smt-kompleks";

export const KRAN_SHAROVOY_LD_PRIDE_DU20_CONTENT: ProductRichContent = {
  descriptionTitle: "Подробное описание",
  description: [
    {
      type: "paragraph",
      text: "Кран шаровой латунный LD Pride с никелевым покрытием предназначен для жидких сред, неагрессивных к материалам крана, а также пара."
    },
    {
      type: "paragraph",
      text: "Шаровой кран - вид трубопроводной арматуры, предназначенный для полного перекрывания потока среды. Изделие обеспечивает быстрое перекрытие воды, которое регулируется при помощи рукоятки."
    },
    { type: "heading", text: "Размеры крана", level: 3 },
    {
      type: "list",
      items: ["L = 55 мм", "A = 89 мм", "B = 58 мм"]
    }
  ],
  specsTitle: "Технические характеристики",
  specs: [
    {
      characteristic: "Исполнение",
      value: "LD, внутренняя/внутренняя резьба, ручка-рычаг, 3/4″"
    },
    { characteristic: "Форма", value: "прямой" },
    { characteristic: "Газовый", value: "нет" },
    { characteristic: "Тип ручки", value: "рычаг" },
    { characteristic: "Тип арматуры", value: "запорная" },
    { characteristic: "Материал", value: "латунь" },
    { characteristic: "Тип присоединения", value: "резьбовой" },
    { characteristic: "Тип резьбы", value: "3/4F-3/4F" },
    { characteristic: "Номинальное давление (PN)", value: "40 бар" },
    { characteristic: "Max температура применения", value: "150 °С" },
    { characteristic: "Условный диаметр DN", value: "20 мм" },
    { characteristic: "Область применения", value: "вода" },
    { characteristic: "Для подсоединения стиральной машины", value: "нет" },
    { characteristic: "Для подсоединения манометра", value: "нет" },
    { characteristic: "Тип крана", value: "прямой" },
    { characteristic: "С фильтром", value: "нет" },
    { characteristic: "С креплением", value: "нет" },
    { characteristic: "С термометром", value: "нет" },
    { characteristic: "С носиком", value: "нет" },
    { characteristic: "Спускное устройство", value: "нет" },
    { characteristic: "Цвет флажка/бабочки", value: "черный" },
    { characteristic: "Резьба присоединения", value: "внутренняя - внутренняя" }
  ]
};
