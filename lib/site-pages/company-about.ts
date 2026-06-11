export type CompanyAboutSubsection = {
  subheading?: string;
  paragraph?: string;
  listLabel?: string;
  listItems: string[];
};

export type CompanyAboutSection = {
  heading: string;
  paragraph?: string;
  subsections?: CompanyAboutSubsection[];
  listItems?: string[];
};

/** Заполнитель для полей, которые нужно уточнить (три прочерка, не тире в тексте). */
export const COMPANY_ABOUT_PLACEHOLDER = "---";

export const COMPANY_ABOUT_META = {
  foundedYear: COMPANY_ABOUT_PLACEHOLDER,
  productionSite: COMPANY_ABOUT_PLACEHOLDER,
  projectDesignContact: COMPANY_ABOUT_PLACEHOLDER
} as const;

export const COMPANY_ABOUT_TRANSPORT_CARRIERS = [
  "Деловые линии",
  "ПЭК",
  "ЖелДорЭкспедиция",
  "GTD",
  "ЭНЕРГИЯ",
  "Байкал-Сервис"
] as const;

export const COMPANY_ABOUT_SECTIONS: CompanyAboutSection[] = [
  {
    heading: "Ассортимент",
    paragraph:
      "Подбираем оборудование под параметры объекта: давление, расход, диаметр подключения и требования эксплуатирующей организации. Часть позиций — в наличии, остальное поставляем под заказ.",
    subsections: [
      {
        subheading: "Насосы",
        paragraph:
          "Насосное оборудование для газовых и водных контуров, котельных и технологических узлов. Поможем подобрать модель под задачу и схему подключения.",
        listItems: ["Марки и серии в каталоге: " + COMPANY_ABOUT_PLACEHOLDER]
      },
      {
        subheading: "Фильтры",
        paragraph:
          "Фильтры для очистки природного газа и для воды — от сменных элементов до узлов на линии. При необходимости комплектуем фильтрацию вместе с запорной арматурой.",
        listItems: [
          "Газовые фильтры и фильтрующие элементы",
          "Фильтры и оснастка для водоснабжения"
        ]
      },
      {
        subheading: "Счётчики",
        paragraph:
          "Коммерческий и технологический учёт расхода газа: бытовые и промышленные счётчики, комплексы учёта, корректоры и сопутствующая автоматика — по согласованию с проектом.",
        listItems: [
          "Счётчики газа разных типов и диаметров подключения",
          "Узлы учёта и шкафные решения"
        ]
      },
      {
        subheading: "Клапаны и арматура",
        paragraph:
          "Запорная и предохранительная арматура для газовых систем: краны, клапаны, регуляторы давления, газорегуляторные пункты шкафного и блочного исполнения.",
        listItems: [
          "Краны шаровые и запорная арматура",
          "Регуляторы давления и ГРП/ГРПШ"
        ]
      }
    ]
  },
  {
    heading: "Услуги",
    paragraph:
      "Помимо поставки оборудования выполняем работы для промышленных и коммунальных заказчиков. Состав услуг и сроки согласуем после заявки.",
    listItems: [
      "Металлообработка: гибка, сварка, распил, сверление и другие операции по чертежам",
      "Инжиниринг и подбор решений под объект",
      "Монтаж, пусконаладка и сервис газового оборудования",
      "Дополнительные виды работ: " + COMPANY_ABOUT_PLACEHOLDER
    ]
  }
];
