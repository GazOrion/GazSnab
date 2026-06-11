import type { ProductLineCatalog } from "@/lib/product-lines/types";

/** Редактируйте типоразмеры, цены и описания серий здесь. */
export const BALL_VALVES_LD_PRIDE: ProductLineCatalog = {
  slug: "krany-sharovye-ld-pride",
  brand: "LD Pride",
  title: "Кран шаровой латунный LD Pride",
  lead:
    "Запорная арматура с ручным приводом-рычагом. Три серии под разные диаметры и давления — выберите нужный Ду в таблице и оформите заявку.",
  features: [
    "Корпус из латуни",
    "Привод: рычаг",
    "Для воды, пара, неагрессивных сред; серия GAS — для газовых линий",
    "Поставка по наличию — уточняйте срок у менеджера"
  ],
  orderHint:
    "При заказе укажите серию, Ду и рабочее давление — менеджер подтвердит наличие и актуальную цену.",
  series: [
    {
      id: "b-bp-301",
      title: "B-B.P",
      article: "301",
      pressureNote: "Ру 40",
      description: "Компактная серия для малых диаметров.",
      variants: [
        { du: "15", pressure: "Ру 40", price: null },
        { du: "20", pressure: "Ру 40", price: null },
        { du: "25", pressure: "Ру 40", price: null }
      ]
    },
    {
      id: "47-b-bp-112",
      title: "47.xx.B-B.P",
      article: "112",
      pressureNote: "Ру 25",
      description: "Средние и крупные диаметры с маркировкой по модели.",
      variants: [
        { du: "32", model: "47.32.B-B.P", pressure: "Ру 25", price: null },
        { du: "40", model: "47.40.B-B.P", pressure: "Ру 25", price: null },
        { du: "50", model: "47.50.B-B.P", pressure: "Ру 25", price: null }
      ]
    },
    {
      id: "b-bp-gas-351",
      title: "B-B.P GAS",
      article: "351",
      description: "Газовая серия — несколько диаметров с разным рабочим давлением.",
      variants: [
        { du: "15", pressure: "Ру 40", price: null },
        { du: "20", pressure: "Ру 40", price: null },
        { du: "25", pressure: "Ру 40", price: null },
        { du: "32", pressure: "Ру 25", price: null },
        { du: "40", pressure: "Ру 25", price: null },
        { du: "50", pressure: "Ру 25", price: null }
      ]
    }
  ]
};
