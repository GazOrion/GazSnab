import type {
  ProductDescriptionBlock,
  ProductRichContent,
  ProductSpecRow
} from "@/lib/product-content/smt-kompleks";

const RABO_MEDIA = "/media/products/rabo";

export const RABO_CARD_IMAGE = `${RABO_MEDIA}/rabo-card.webp`;

export const RABO_GALLERY = [
  `${RABO_MEDIA}/rabo-01.webp`,
  `${RABO_MEDIA}/rabo-02.webp`,
  `${RABO_MEDIA}/rabo-03.webp`,
  `${RABO_MEDIA}/rabo-04.webp`,
  `${RABO_MEDIA}/rabo-05.webp`
];

export const RABO_SHORT_DESCRIPTION =
  "RABO — ротационный счётчик газа для измерения объёмов очищенных и осушенных одно- и многокомпонентных неагрессивных газов: природного газа по ГОСТ 5542-87, пропана, воздуха, азота, инертных и других газов. Счётчик разработан с учётом опыта RVG и превосходит его по метрологическим и эксплуатационным характеристикам. Доступны исполнения «Р», «Б», «К» в зависимости от размера и конструкции корпуса.";

const RABO_MODEL_COLUMNS = [
  "Параметры",
  "G10",
  "G16",
  "G25",
  "G40",
  "G65",
  "G100",
  "G160*",
  "G250*",
  "G400*",
  "G650*",
  "G1000*"
];

const RABO_SPECS_SECTION_BLOCKS: ProductDescriptionBlock[] = [
  {
    type: "heading",
    text: "Типоразмеры и параметры",
    level: 4
  },
  {
    type: "data-table",
    table: {
      columns: ["Наименование", "Параметры"],
      rows: [
        ["RABO G10", "Qmax=16 м³/ч; Ду=40 мм"],
        ["RABO G16", "Qmax=25 м³/ч; Ду=50 мм"],
        ["RABO G25", "Qmax=40 м³/ч; Ду=50 мм"],
        ["RABO G40", "Qmax=65 м³/ч; Ду=50 мм"],
        ["RABO G65", "Qmax=100 м³/ч; Ду=50 мм"],
        ["RABO G100", "Qmax=160 м³/ч; Ду=80 мм"],
        ["RABO G160", "Qmax=250 м³/ч; Ду=80 мм"],
        ["RABO G160", "Qmax=250 м³/ч; Ду=100 мм"],
        ["RABO G250", "Qmax=400 м³/ч; Ду=80 мм"],
        ["RABO G250", "Qmax=400 м³/ч; Ду=100 мм"],
        ["RABO G400", "Qmax=650 м³/ч; Ду=100 мм"],
        ["RABO G400", "Qmax=650 м³/ч; Ду=150 мм"],
        ["RABO G650", "Qmax=1000 м³/ч; Ду=150 мм"],
        ["RABO G1000", "Qmax=1600 м³/ч; Ду=200 мм"]
      ]
    }
  },
  {
    type: "heading",
    text: "Основные технические характеристики RABO счетчика газа ротационного (RABO G10, G16, G25, G40, G65, G100, G160, G250, G400, G650, G1000)",
    level: 4
  },
  {
    type: "data-table",
    matrix: true,
    table: {
      columns: RABO_MODEL_COLUMNS,
      rows: [
        [
          "Исполнения",
          { text: "«Р», «Б», «К»", colspan: 11 }
        ],
        [
          "Диапазоны рабочих расходов счётчика",
          "1:50, 1:30",
          "1:50, 1:30",
          "1:80, 1:65, 1:50, 1:30",
          "1:130, 1:100, 1:80, 1:65, 1:50, 1:30",
          "1:250, 1:200, 1:160, 1:130, 1:100, 1:80, 1:65, 1:50, 1:30",
          "1:250, 1:200, 1:160, 1:130, 1:100, 1:80, 1:65, 1:50, 1:30",
          "1:250, 1:200, 1:160, 1:130, 1:100, 1:80, 1:65, 1:50, 1:30",
          "1:250, 1:200, 1:160, 1:130, 1:100, 1:80, 1:65, 1:50, 1:30",
          "1:250, 1:200, 1:160, 1:130, 1:100, 1:80, 1:65, 1:50, 1:30",
          "1:160, 1:130, 1:100, 1:80, 1:65, 1:50, 1:30",
          "1:160, 1:130, 1:100, 1:80, 1:65, 1:50, 1:30"
        ],
        [
          "Порог чувствительности, м³/ч",
          { text: "0,03", colspan: 5 },
          "0,05",
          "0,1",
          "0,2",
          { text: "0,4", colspan: 3 }
        ],
        [
          "Цена оборота ролика младшего разряда, м³",
          { text: "0,1", colspan: 5 },
          { text: "1", colspan: 6 }
        ],
        [
          "Масса, кг",
          { text: "12", colspan: 5 },
          "16",
          "32",
          "36",
          { text: "для DN100 — 42 кг, DN150 — 41 кг", colspan: 3 }
        ],
        [
          "Рабочее давление измеряемого газа",
          { text: "не более 1,6 МПа", colspan: 11 }
        ],
        [
          "Диапазон температур измеряемой среды",
          { text: "от −30 °C до +70 °C", colspan: 11 }
        ],
        [
          "Диапазон температур окружающей среды",
          { text: "от −40 °C до +70 °C", colspan: 11 }
        ],
        ["Счётный механизм", { text: "8-разрядный", colspan: 11 }],
        [
          "Степень защиты",
          {
            text: "IP67 (для исполнений «Б» и «К» — IP65) по ГОСТ 14254",
            colspan: 11
          }
        ],
        ["Средний срок службы", { text: "12 лет", colspan: 11 }],
        ["Средняя наработка на отказ", { text: "100000 ч", colspan: 11 }],
        ["Интервал между поверками", { text: "5 лет", colspan: 11 }]
      ]
    }
  },
  {
    type: "data-table",
    matrix: true,
    table: {
      columns: [
        "Параметр",
        "G10",
        "G16",
        "G25",
        "G40",
        "G65",
        "G100",
        "G160",
        "G250",
        "G400",
        "G650",
        "G1000"
      ],
      rows: [
        [
          "Порог чувствительности, м³/ч\n– исполнение «Р»\n– исполнение «Б», «К»",
          "\n—\n0,08",
          "\n0,03\n0,08",
          "\n0,03\n0,08",
          "\n0,03\n0,08",
          "\n0,03\n0,08",
          "\n0,05\n0,15",
          "\n0,1\n0,15",
          "\n0,2\n0,2",
          "\n0,4\n0,4",
          "\n—\n0,7",
          "\n—\n1,0"
        ],
        [
          "Емкость счётного механизма, м³",
          "10⁶",
          "10⁶",
          "10⁶",
          "10⁶",
          "10⁶",
          "10⁶",
          "10⁷",
          "10⁷",
          "10⁷",
          "10⁷",
          "10⁸"
        ],
        [
          "Объём изм. камеры, дм³\n– исполнение «Р»\n– исполнение «Б»\n– исполнение «К»",
          "\n0,87\n0,95\n0,51",
          "\n0,87\n0,95\n0,51",
          "\n0,87\n0,95\n0,51",
          "\n0,87\n0,95\n0,51",
          "\n0,87\n0,95\n—",
          "\n1,61\n2,78\n1,17",
          "\n2,99\n3,1\n—",
          "\n3,7\n4,5\n—",
          "\n4,5\n4,68\n—",
          "\n—\n15,7\n—",
          "\n—\n19,7\n—"
        ],
        [
          "Цена деления ролика младшего разряда, м³",
          "0,002",
          "0,002",
          "0,002",
          "0,002",
          "0,002",
          "0,02",
          "0,02",
          "0,02",
          "0,02",
          "0,02",
          "0,2"
        ]
      ]
    }
  },
  {
    type: "paragraph",
    text: "* Типоразмеры с несколькими вариантами условного диаметра."
  }
];

export const RABO_OPTIONS_TITLE = "Дополнительные опции и исполнения";

export const RABO_OPTIONS_DESCRIPTION: ProductDescriptionBlock[] = [
  {
    type: "heading",
    text: "2.9. Дополнительные опции и исполнения счетчика газа RABO",
    level: 4
  },
  {
    type: "data-table",
    table: {
      columns: ["Опция / исполнение", "Описание"],
      rows: [
        ["Расш. диапазона", "Qmax/Qmin=50 (бесплатно)"],
        ["Расш. диапазона", "Qmax/Qmin=65 (бесплатно)"],
        ["Расш. диапазона", "Qmax/Qmin=80 (бесплатно)"],
        ["Расш. диапазона", "Qmax/Qmin=100 (бесплатно)"],
        ["Расш. диапазона", "Qmax/Qmin=130 (бесплатно)"],
        ["Расш. диапазона", "Qmax/Qmin=160 (бесплатно)"],
        ["Расш. диапазона", "Qmax/Qmin=200"],
        ["Расш. диапазона", "Qmax/Qmin=250"]
      ]
    }
  }
];

function raboContent(): ProductRichContent {
  return {
    descriptionTitle: "Подробное описание",
    description: [
      {
        type: "paragraph",
        text: "Счётчик газа RABO имеет следующие особенности:"
      },
      {
        type: "list",
        items: [
          "Высокая точность измерения",
          "Низкий порог чувствительности по расходу",
          "Пониженная, в сравнении с RVG, чувствительность к пневмоудару",
          "Монтаж на горизонтальных и вертикальных участках газопровода",
          "Применение для направлений потока газа слева направо или справа налево",
          "Широкий диапазон измерения (до 1:250)",
          "Отсутствие требований к длине прямолинейных участков трубопровода",
          "Низкая потеря давления на счётчике",
          "Возможность работы с электронными корректорами газа",
          "Исполнения с улучшенными метрологическими характеристиками",
          "Установка низкочастотных (НЧ), среднечастотных (СЧ) и высокочастотных (ВЧ) датчиков импульсов",
          "Оптимизированный процесс технического обслуживания в эксплуатации"
        ]
      },
      {
        type: "paragraph",
        text: "Ротационные газовые счётчики серии RABO отличаются конструктивными решениями, которые повышают удобство установки и эксплуатации оборудования, особенно в условиях ограниченного пространства узла учёта."
      },
      {
        type: "paragraph",
        text: "Для счётчиков одинаковых типоразмеров монтажные габариты моделей RVG и RABO совпадают, за исключением исполнения G400."
      },
      {
        type: "paragraph",
        text: "Счётчик RABO по метрологическим, техническим и эксплуатационным характеристикам полностью удовлетворяет требованиям ГОСТ Р 8.740–2023 «Методика измерений с помощью турбинных, ротационных и вихревых расходомеров и счетчиков» и имеет сертификаты соответствия ТР ТС."
      }
    ],
    specsTitle: "Технические характеристики ротационного счётчика газа RABO",
    specs: [],
    specsFooter: RABO_SPECS_SECTION_BLOCKS,
    optionsTitle: RABO_OPTIONS_TITLE,
    optionsDescription: RABO_OPTIONS_DESCRIPTION
  };
}

type RaboProductRow = {
  slug: string;
  typoraзmer: string;
  dn: number;
  qmax: number;
};

const RABO_PRODUCT_ROWS: RaboProductRow[] = [
  { slug: "rabo-g10-dn40", typoraзmer: "G10", dn: 40, qmax: 16 },
  { slug: "rabo-g16-dn50", typoraзmer: "G16", dn: 50, qmax: 25 },
  { slug: "rabo-g25-dn50", typoraзmer: "G25", dn: 50, qmax: 40 },
  { slug: "rabo-g40-dn50", typoraзmer: "G40", dn: 50, qmax: 65 },
  { slug: "rabo-g65-dn50", typoraзmer: "G65", dn: 50, qmax: 100 },
  { slug: "rabo-g100-dn80", typoraзmer: "G100", dn: 80, qmax: 160 },
  { slug: "rabo-g160-dn80", typoraзmer: "G160", dn: 80, qmax: 250 },
  { slug: "rabo-g160-dn100", typoraзmer: "G160", dn: 100, qmax: 250 },
  { slug: "rabo-g250-dn80", typoraзmer: "G250", dn: 80, qmax: 400 },
  { slug: "rabo-g250-dn100", typoraзmer: "G250", dn: 100, qmax: 400 },
  { slug: "rabo-g400-dn100", typoraзmer: "G400", dn: 100, qmax: 650 },
  { slug: "rabo-g400-dn150", typoraзmer: "G400", dn: 150, qmax: 650 },
  { slug: "rabo-g650-dn150", typoraзmer: "G650", dn: 150, qmax: 1000 },
  { slug: "rabo-g1000-dn200", typoraзmer: "G1000", dn: 200, qmax: 1600 }
];

function buildRaboTitle(row: RaboProductRow): string {
  return `Ротационный счётчик газа RABO ${row.typoraзmer} (DN ${row.dn} мм)`;
}

function buildRaboExtraSpecs(row: RaboProductRow): ProductSpecRow[] {
  return [
    { characteristic: "Типоразмер", value: row.typoraзmer },
    { characteristic: "Максимальный расход Qmax", value: `${row.qmax} м³/ч` },
    { characteristic: "Условный диаметр", value: `DN${row.dn} мм` }
  ];
}

export type RaboProductDefinition = {
  slug: string;
  title: string;
  model: string;
  typoraзmer: string;
  extraSpecs: ProductSpecRow[];
};

export const RABO_PRODUCTS: RaboProductDefinition[] = RABO_PRODUCT_ROWS.map((row) => ({
  slug: row.slug,
  title: buildRaboTitle(row),
  model: `RABO ${row.typoraзmer}`,
  typoraзmer: row.typoraзmer,
  extraSpecs: buildRaboExtraSpecs(row)
}));

export function buildRaboListingDescription(product: RaboProductDefinition): string {
  const qmax = product.extraSpecs.find((row) => row.characteristic === "Максимальный расход Qmax")
    ?.value;
  const du = product.extraSpecs.find((row) => row.characteristic === "Условный диаметр")?.value;

  const params = [qmax, du].filter(Boolean).join(", ");
  if (params) {
    return `Ротационный счётчик газа RABO ${product.typoraзmer}, ${params}. Промышленный учёт природного газа.`;
  }

  return `Ротационный счётчик газа RABO ${product.typoraзmer}. Промышленный учёт природного газа, расход 0,3–1600 м³/ч.`;
}

export const RABO_CONTENT_BY_SLUG: Record<string, ProductRichContent> = Object.fromEntries(
  RABO_PRODUCTS.map((product) => [product.slug, raboContent()])
);
