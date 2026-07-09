import type {
  ProductDescriptionBlock,
  ProductRichContent,
  ProductSpecRow
} from "@/lib/product-content/smt-kompleks";

export const RGT_T_CARD_IMAGE = "/media/products/rgt/rgt-turbine-01.webp";

export const RGT_T_GALLERY = [
  "/media/products/rgt/rgt-turbine-01.webp",
  "/media/products/rgt/rgt-turbine-02.webp",
  "/media/products/rgt/rgt-turbine-03.webp",
  "/media/products/rgt/rgt-turbine-04.webp"
];

export const RGT_T_SHORT_DESCRIPTION =
  "Турбинный счётчик газа РГ-Т предназначен для коммерческого либо технологического измерения (учёта) объёмов плавно меняющегося потока очищенного неагрессивного, неоднородного по химическому составу природного газа, а также воздуха, азота и других неагрессивных газов при использовании их в промышленных установках, магистральных трубопроводах, а также в системах энергоснабжения.\n\nГазовые счётчики РГ-Т могут применяться на опасных производственных объектах, в том числе в нефтеперерабатывающей, нефтехимической, химической, газовой и других отраслях промышленности.";

const RGT_T_DESCRIPTION_BLOCKS: ProductDescriptionBlock[] = [
  {
    type: "paragraph",
    text: "Турбинный счётчик газа РГ-Т является счётчиком газа скоростного типа. Поток измеряемого газа заставляет вращаться алюминиевое колесо турбинки. Количество оборотов турбинного колеса пропорционально прошедшему объёму газа, частота оборотов пропорциональна фактическому расходу газа. Вращение турбинного колеса передаётся через магнитную муфту и редуктор на счётный механизм."
  },
  {
    type: "paragraph",
    text: "С помощью НЧ, СЧ и ВЧ датчиков импульсов рабочий расход газа может передаваться на электронные корректоры объёма газа для приведения к стандартным условиям. В НЧ датчике импульсов размещён дополнительный контрольный геркон, срабатывающий при наличии внешнего магнитного поля (защита от несанкционированного доступа)."
  },
  {
    type: "paragraph",
    text: "Сигналы ВЧ и СЧ датчиков (счётный механизм С1) позволяют точно определять мгновенный расход газа. ВЧ датчик может использоваться в установленных вне взрывоопасной зоны счётчиках газа."
  },
  {
    type: "heading",
    text: "Преимущества турбинного счётчика газа РГ-Т",
    level: 4
  },
  {
    type: "list",
    items: [
      "типоразмер от G65 до G4000",
      "расход от 5 до 6500 м³/ч",
      "условный диаметр — от DN50 до DN300",
      "рабочее давление — Pn16 и Pn100",
      "диапазон измерения — 1:50",
      "счётный механизм по умолчанию изготавливается из специального полимерного материала, устойчивого к ультрафиолетовому излучению",
      "счётный механизм может поворачиваться на 355°",
      "имеется возможность компактного монтажа счётчика с использованием прямых участков не менее 2DN до счётчика",
      "возможен горизонтальный и вертикальный монтаж счётчика"
    ]
  },
  {
    type: "heading",
    text: "Основные технические характеристики турбинного счётчика газа РГ-Т",
    level: 4
  },
  {
    type: "data-table",
    table: {
      columns: ["Параметры", "Значения"],
      rows: [
        ["Температура газа", "от −30 °C до +60 °C"],
        ["Температура окружающей среды", "от −40 °C до +70 °C"],
        ["Рабочее давление", "Pn16 и Pn100"],
        ["Межповерочный интервал", "4 года"],
        ["Класс защиты", "IP 65"],
        ["Корпус счётчика", "алюминиевый сплав / углеродистая сталь"],
        ["Турбинное колесо", "алюминиевый сплав"],
        [
          "Счётный механизм",
          "стабилизированный к ультрафиолетовому излучению полимер"
        ],
        ["Взрывозащита", "1 Ex ib IIB T4 Gb X"],
        ["Перегрузка", "кратковременно до 1,25 Qmax"],
        [
          "Счётный механизм",
          "три исполнения счётного механизма: Т1, С1 и С1В"
        ],
        [
          "Импульсный выход",
          "1 НЧ-выход; 1 ВЧ-выход (опционально); 1 СЧ-выход (опционально для счётного механизма С1)"
        ],
        ["Отбор давления", "1–2 отверстия в корпусе"],
        [
          "Температура",
          "1 отверстие в корпусе под установку гильзы с резьбой G ¼″"
        ]
      ]
    }
  },
  {
    type: "paragraph",
    text: "Измерительный картридж предназначен для установки в работающем под давлением корпусе с помощью уплотнительных колец. Это делает счётчик газа РГ-Т устойчивым к любым нагрузкам при возникающих при монтаже газопроводов кручении и изгибах."
  },
  {
    type: "paragraph",
    text: "Турбинные счётчики РГ-Т показывают стабильные и воспроизводимые результаты измерений."
  },
  {
    type: "paragraph",
    text: "Благодаря высококачественным шарикоподшипникам, а также высокоточной обработке корпуса и всех движущихся частей калибровочная характеристика турбинного расходомера РГ-Т остаётся неизменной в процессе эксплуатации. Перед сборкой счётчика колесо турбины подвергается динамической балансировке. Все алюминиевые детали, включая колесо турбины, после механической обработки подвергаются твердому анодированию для повышения устойчивости к механическому износу и химическим воздействиям, что обеспечивает длительный срок службы счётчика и стабильность его метрологических характеристик."
  },
  {
    type: "heading",
    text: "Пределы допускаемой относительной погрешности при измерении объёма",
    level: 4
  },
  {
    type: "data-table",
    table: {
      columns: [
        "Исполнение",
        "Диапазон объёмного расхода",
        "Пределы допускаемой относительной погрешности при измерении объёма¹), %"
      ],
      rows: [
        ["«О», «2»", "от Qmin до Qt", "±2,0"],
        ["«О», «2»", "от Qt до Qmax включ.", "±1,0"],
        ["«3С», «3»", "от Qmin до Qt", "±1,9"],
        ["«3С», «3»", "от Qt до Qmax включ.", "±1,0"],
        ["«4С», «4»", "от Qmin до Qt", "±1,7"],
        ["«4С», «4»", "от Qt до Qmax включ.", "±1,0"],
        ["«5С», «5»", "от Qmin до Qt", "±1,6"],
        ["«5С», «5»", "от Qt до Qmax включ.", "±1,0"],
        ["«6С», «6»", "от Qmin до Qt", "±1,4"],
        ["«6С», «6»", "от Qt до Qmax включ.", "±1,0"],
        ["«2У»", "от Qt до Qmax включ.", "±0,9"]
      ]
    }
  },
  {
    type: "paragraph",
    text: "Qt — значение переходного объёмного расхода при рабочих условиях, которое соответствует 0,1 Qmax для исполнения «О», «3С», «4С», «5С», «6С» и 0,2 Qmax для исполнения «2», «3», «4», «5», «6»."
  },
  {
    type: "paragraph",
    text: "¹) Пределы относительной погрешности при измерении объёма нормированы во всём диапазоне рабочих условий счётчика."
  },
  {
    type: "heading",
    text: "Диапазоны рабочих расходов турбинных счётчиков газа РГ-Т",
    level: 4
  },
  {
    type: "data-table",
    table: {
      columns: [
        "Наименование",
        "DN, мм",
        "Qmax, м³/ч",
        "Qmin при 1:50, м³/ч",
        "Qmin при 1:40, м³/ч",
        "Qmin при 1:30*, м³/ч",
        "Qmin при 1:20*, м³/ч"
      ],
      rows: [
        ["РГ-Т G65**", "50", "100", "—", "—", "—", "5"],
        ["РГ-Т G100**", "80", "160", "—", "—", "—", "8"],
        ["РГ-Т G160", "80", "250", "—", "—", "—", "12,5"],
        ["РГ-Т G250", "80", "400", "8", "10", "13", "20"],
        ["РГ-Т G160**", "100", "250", "—", "—", "—", "12,5"],
        ["РГ-Т G250", "100", "400", "—", "10", "13", "20"],
        ["РГ-Т G400", "100", "650", "13", "16", "21,5", "32,5"],
        ["РГ-Т G400**", "150", "650", "—", "—", "—", "32,5"],
        ["РГ-Т G650", "150", "1000", "—", "25", "33", "50"],
        ["РГ-Т G1000", "150", "1600", "32", "40", "53", "80"],
        ["РГ-Т G650**", "200", "1000", "—", "—", "—", "50"],
        ["РГ-Т G1000", "200", "1600", "—", "40", "53", "80"],
        ["РГ-Т G1600", "200", "2500", "50", "62,5", "83", "125"],
        ["РГ-Т G1000**", "250", "1600", "—", "—", "—", "80"],
        ["РГ-Т G1600", "250", "2500", "—", "62,5", "83", "125"],
        ["РГ-Т G2500", "250", "4000", "80", "100", "133", "200"],
        ["РГ-Т G1600**", "300", "2500", "—", "—", "—", "125"],
        ["РГ-Т G2500", "300", "4000", "—", "100", "133", "200"],
        ["РГ-Т G4000", "300", "6500", "130", "162,5", "216,5", "325"]
      ]
    }
  },
  {
    type: "paragraph",
    text: "* Исполнения «2У», «3», «3С», «4», «4С», «5», «5С», «6», «6С» возможны только для счётчиков с диапазоном расходов 1:30 и 1:20."
  },
  {
    type: "paragraph",
    text: "** Для данных типоразмеров возможны только исполнения «О», «2», «3», «3С», «5», «5С»."
  }
];

const RGT_T_PN10_TYPO_SIZE_ROWS: string[][] = [
  ["РГ-Т G65/10", "Qmax=100 м³/ч; Ду=50 мм (исполнение корпуса К4)"],
  ["РГ-Т G100/10", "Qmax=160 м³/ч; Ду=80 мм (исполнение корпуса К4)"],
  ["РГ-Т G160/10", "Qmax=250 м³/ч; Ду=80 мм (исполнение корпуса К4)"],
  ["РГ-Т G250/10", "Qmax=400 м³/ч; Ду=80 мм (исполнение корпуса К4)"],
  ["РГ-Т G160/10", "Qmax=250 м³/ч; Ду=100 мм (исполнение корпуса К4)"],
  ["РГ-Т G250/10", "Qmax=400 м³/ч; Ду=100 мм (исполнение корпуса К4)"],
  ["РГ-Т G400/10", "Qmax=650 м³/ч; Ду=100 мм (исполнение корпуса К4)"],
  ["РГ-Т G400/10", "Qmax=650 м³/ч; Ду=150 мм (исполнение корпуса К4)"],
  ["РГ-Т G650/10", "Qmax=1000 м³/ч; Ду=150 мм (исполнение корпуса К4)"],
  ["РГ-Т G1000/10", "Qmax=1600 м³/ч; Ду=150 мм (исполнение корпуса К4)"],
  ["РГ-Т G650/10", "Qmax=1000 м³/ч; Ду=200 мм (исполнение корпуса К4)"],
  ["РГ-Т G1000/10", "Qmax=1600 м³/ч; Ду=200 мм (исполнение корпуса К4)"],
  ["РГ-Т G1600/10", "Qmax=2500 м³/ч; Ду=200 мм (исполнение корпуса К4)"],
  ["РГ-Т G1000/10", "Qmax=1600 м³/ч; Ду=250 мм (исполнение корпуса К4)"],
  ["РГ-Т G1600/10", "Qmax=2500 м³/ч; Ду=250 мм (исполнение корпуса К4)"],
  ["РГ-Т G2500/10", "Qmax=4000 м³/ч; Ду=250 мм (исполнение корпуса К4)"],
  ["РГ-Т G1600/10", "Qmax=2500 м³/ч; Ду=300 мм (исполнение корпуса К4)"],
  ["РГ-Т G2500/10", "Qmax=4000 м³/ч; Ду=300 мм (исполнение корпуса К4)"],
  ["РГ-Т G4000/10", "Qmax=6500 м³/ч; Ду=300 мм (исполнение корпуса К4)"]
];

const RGT_T_PN10_DESCRIPTION_TAIL: ProductDescriptionBlock[] = [
  {
    type: "heading",
    text: "Типоразмеры турбинных счётчиков газа РГ-Т (Pn10, исполнение корпуса К4)",
    level: 4
  },
  {
    type: "data-table",
    table: {
      columns: ["Наименование", "Параметры"],
      rows: RGT_T_PN10_TYPO_SIZE_ROWS
    }
  }
];

const RGT_T_SPECS_FOOTER_BLOCKS: ProductDescriptionBlock[] = [
  {
    type: "heading",
    text: "Исполнения корпуса и ответные фланцы",
    level: 4
  },
  {
    type: "data-table",
    table: {
      columns: ["Тип корпуса", "DN", "PN, МПа (кгс/см²)", "Ответные фланцы"],
      rows: [
        [
          "К1, К2, К3",
          "50",
          "1,6 (16)",
          "Фланец 50-16-01-1-В-Ст20-IV ГОСТ 33259\nФланец 50-16-11-1-В-Ст20-IV ГОСТ 33259"
        ],
        [
          "К1, К2, К3",
          "80",
          "1,6 (16)",
          "Фланец 80-16-01-2-В-Ст20-IV ГОСТ 33259\nФланец 80-16-11-2-В-Ст20-IV ГОСТ 33259"
        ],
        [
          "К1, К2, К3",
          "100",
          "1,6 (16)",
          "Фланец 100-16-01-1-В-Ст20-IV ГОСТ 33259\nФланец 100-16-11-1-В-Ст20-IV ГОСТ 33259"
        ],
        [
          "К1, К2, К3",
          "150",
          "1,6 (16)",
          "Фланец 150-16-01-1-В-Ст20-IV ГОСТ 33259\nФланец 150-16-11-1-В-Ст20-IV ГОСТ 33259"
        ],
        [
          "К1, К2, К3",
          "200",
          "1,6 (16)",
          "Фланец 200-16-01-1-В-Ст20-IV ГОСТ 33259\nФланец 200-16-11-1-В-Ст20-IV ГОСТ 33259"
        ],
        [
          "К2",
          "250",
          "1,6 (16)",
          "Фланец 250-16-01-1-B-Ст20-IV ГОСТ 33259\nФланец 250-16-11-1-B-Ст20-IV ГОСТ 33259"
        ],
        [
          "К2",
          "300",
          "1,6 (16)",
          "Фланец 300-16-01-1-B-Ст20-IV ГОСТ 33259\nФланец 300-16-11-1-B-Ст20-IV ГОСТ 33259"
        ],
        [
          "К3",
          "250",
          "1,6 (16)",
          "Фланец 250-16-01-1-F-Ст20-IV ГОСТ 33259\nФланец 250-16-11-1-F-Ст20-IV ГОСТ 33259"
        ],
        [
          "К2",
          "300",
          "1,6 (16)",
          "Фланец 300-16-01-1-F-Ст20-IV ГОСТ 33259\nФланец 300-16-11-1-F-Ст20-IV ГОСТ 33259"
        ],
        ["К4", "50…300", "10 (100)", "ANSI 600 RF / EN 1092-1 PN100 RF"]
      ]
    }
  }
];

export const RGT_T_OPTIONS_TITLE = "Дополнительные опции и исполнения";

export const RGT_T_OPTIONS_DESCRIPTION: ProductDescriptionBlock[] = [
  {
    type: "heading",
    text: "2.4. Дополнительные опции и исполнения счетчика газа РГ-Т (Pmax=1,6 МПа)",
    level: 4
  },
  {
    type: "data-table",
    table: {
      columns: ["Опция / исполнение", "Описание"],
      rows: [
        ["Расш. диапазона", "Qmax/Qmin = 30"],
        ["Расш. диапазона", "Qmax/Qmin = 40"],
        ["Расш. диапазона", "Qmax/Qmin = 50"],
        ["Исп. с масл. насосом", "Дополнительная опция: масляный насос"],
        [
          "Исполнение 2У",
          "относительная погрешность 0,9% в диапазоне расходов Qmin—Qmax"
        ]
      ]
    }
  }
];

const RGT_T_COMMON_SPECS: ProductSpecRow[] = [
  { characteristic: "Серия", value: "РГ-Т" },
  { characteristic: "Тип счётчика", value: "турбинный" },
  { characteristic: "Подкатегория", value: "Турбинные" },
  { characteristic: "Расход", value: "5 – 6500 м³/ч" },
  { characteristic: "Температура газа", value: "от −30 °C до +60 °C" },
  { characteristic: "Температура окружающей среды", value: "от −40 °C до +70 °C" },
  { characteristic: "Рабочее давление", value: "Pn16 и Pn100" },
  { characteristic: "Межповерочный интервал", value: "4 года" },
  { characteristic: "Класс защиты", value: "IP 65" },
  { characteristic: "Корпус счётчика", value: "алюминиевый сплав / углеродистая сталь" },
  { characteristic: "Турбинное колесо", value: "алюминиевый сплав" },
  {
    characteristic: "Счётный механизм",
    value: "стабилизированный к ультрафиолетовому излучению полимер; исполнения Т1, С1 и С1В"
  },
  { characteristic: "Взрывозащита", value: "1 Ex ib IIB T4 Gb X" },
  { characteristic: "Перегрузка", value: "кратковременно до 1,25 Qmax" },
  {
    characteristic: "Импульсный выход",
    value: "1 НЧ-выход; 1 ВЧ-выход (опционально); 1 СЧ-выход (опционально для С1)"
  },
  { characteristic: "Отбор давления", value: "1–2 отверстия в корпусе" },
  {
    characteristic: "Температура",
    value: "1 отверстие в корпусе под установку гильзы с резьбой G ¼″"
  }
];

function mergeSpecRows(...groups: ProductSpecRow[][]): ProductSpecRow[] {
  const seen = new Set<string>();
  const merged: ProductSpecRow[] = [];

  for (const group of groups) {
    for (const row of group) {
      if (seen.has(row.characteristic)) continue;
      seen.add(row.characteristic);
      merged.push(row);
    }
  }

  return merged;
}

function rgtContent(product: RgtProductDefinition): ProductRichContent {
  return {
    descriptionTitle: "Подробное описание",
    description: [
      { type: "paragraph", text: buildRgtListingDescription(product) },
      { type: "paragraph", text: RGT_T_SHORT_DESCRIPTION.split("\n\n")[0] },
      { type: "paragraph", text: RGT_T_SHORT_DESCRIPTION.split("\n\n")[1] },
      ...RGT_T_DESCRIPTION_BLOCKS,
      ...RGT_T_PN10_DESCRIPTION_TAIL
    ],
    specsTitle: "Основные технические характеристики турбинного счётчика газа РГ-Т",
    specs: mergeSpecRows(
      [{ characteristic: "Модель", value: product.model }],
      product.extraSpecs,
      RGT_T_COMMON_SPECS
    ),
    specsFooter: RGT_T_SPECS_FOOTER_BLOCKS,
    optionsTitle: RGT_T_OPTIONS_TITLE,
    optionsDescription: RGT_T_OPTIONS_DESCRIPTION
  };
}

type RgtFlowRow = {
  slug: string;
  typoraзmer: string;
  dn: number;
  qmax: number;
  qmin50?: string;
  qmin40?: string;
  qmin30?: string;
  qmin20?: string;
  limitedExecutions?: boolean;
  bodyType?: string;
  isPn10?: boolean;
};

function toPn10FlowRow(row: RgtFlowRow): RgtFlowRow {
  const slugMatch = row.slug.match(/^rgt-(.+)-dn(\d+)$/);
  const slug = slugMatch ? `rgt-${slugMatch[1]}-10-dn${slugMatch[2]}` : `${row.slug}-10`;

  return {
    ...row,
    slug,
    typoraзmer: `${row.typoraзmer}/10`,
    bodyType: "К4",
    isPn10: true,
    limitedExecutions: undefined
  };
}

const RGT_T_FLOW_ROWS: RgtFlowRow[] = [
  {
    slug: "rgt-g65-dn50",
    typoraзmer: "G65",
    dn: 50,
    qmax: 100,
    qmin20: "5",
    limitedExecutions: true
  },
  {
    slug: "rgt-g100-dn80",
    typoraзmer: "G100",
    dn: 80,
    qmax: 160,
    qmin20: "8",
    limitedExecutions: true
  },
  {
    slug: "rgt-g160-dn80",
    typoraзmer: "G160",
    dn: 80,
    qmax: 250,
    qmin20: "12,5"
  },
  {
    slug: "rgt-g250-dn80",
    typoraзmer: "G250",
    dn: 80,
    qmax: 400,
    qmin50: "8",
    qmin40: "10",
    qmin30: "13",
    qmin20: "20"
  },
  {
    slug: "rgt-g160-dn100",
    typoraзmer: "G160",
    dn: 100,
    qmax: 250,
    qmin20: "12,5",
    limitedExecutions: true
  },
  {
    slug: "rgt-g250-dn100",
    typoraзmer: "G250",
    dn: 100,
    qmax: 400,
    qmin40: "10",
    qmin30: "13",
    qmin20: "20"
  },
  {
    slug: "rgt-g400-dn100",
    typoraзmer: "G400",
    dn: 100,
    qmax: 650,
    qmin50: "13",
    qmin40: "16",
    qmin30: "21,5",
    qmin20: "32,5"
  },
  {
    slug: "rgt-g400-dn150",
    typoraзmer: "G400",
    dn: 150,
    qmax: 650,
    qmin20: "32,5",
    limitedExecutions: true
  },
  {
    slug: "rgt-g650-dn150",
    typoraзmer: "G650",
    dn: 150,
    qmax: 1000,
    qmin40: "25",
    qmin30: "33",
    qmin20: "50"
  },
  {
    slug: "rgt-g1000-dn150",
    typoraзmer: "G1000",
    dn: 150,
    qmax: 1600,
    qmin50: "32",
    qmin40: "40",
    qmin30: "53",
    qmin20: "80"
  },
  {
    slug: "rgt-g650-dn200",
    typoraзmer: "G650",
    dn: 200,
    qmax: 1000,
    qmin20: "50",
    limitedExecutions: true
  },
  {
    slug: "rgt-g1000-dn200",
    typoraзmer: "G1000",
    dn: 200,
    qmax: 1600,
    qmin40: "40",
    qmin30: "53",
    qmin20: "80"
  },
  {
    slug: "rgt-g1600-dn200",
    typoraзmer: "G1600",
    dn: 200,
    qmax: 2500,
    qmin50: "50",
    qmin40: "62,5",
    qmin30: "83",
    qmin20: "125"
  },
  {
    slug: "rgt-g1000-dn250",
    typoraзmer: "G1000",
    dn: 250,
    qmax: 1600,
    qmin20: "80",
    limitedExecutions: true
  },
  {
    slug: "rgt-g1600-dn250",
    typoraзmer: "G1600",
    dn: 250,
    qmax: 2500,
    qmin40: "62,5",
    qmin30: "83",
    qmin20: "125"
  },
  {
    slug: "rgt-g2500-dn250",
    typoraзmer: "G2500",
    dn: 250,
    qmax: 4000,
    qmin50: "80",
    qmin40: "100",
    qmin30: "133",
    qmin20: "200"
  },
  {
    slug: "rgt-g1600-dn300",
    typoraзmer: "G1600",
    dn: 300,
    qmax: 2500,
    qmin20: "125",
    limitedExecutions: true
  },
  {
    slug: "rgt-g2500-dn300",
    typoraзmer: "G2500",
    dn: 300,
    qmax: 4000,
    qmin40: "100",
    qmin30: "133",
    qmin20: "200"
  },
  {
    slug: "rgt-g4000-dn300",
    typoraзmer: "G4000",
    dn: 300,
    qmax: 6500,
    qmin50: "130",
    qmin40: "162,5",
    qmin30: "216,5",
    qmin20: "325"
  }
];

const RGT_T_PN10_FLOW_ROWS: RgtFlowRow[] = RGT_T_FLOW_ROWS.map(toPn10FlowRow);
const RGT_T_ALL_FLOW_ROWS: RgtFlowRow[] = [...RGT_T_FLOW_ROWS, ...RGT_T_PN10_FLOW_ROWS];

function buildRangeSpec(row: RgtFlowRow): string {
  const parts: string[] = [];
  if (row.qmin50) parts.push(`1:50 — Qmin ${row.qmin50} м³/ч`);
  if (row.qmin40) parts.push(`1:40 — Qmin ${row.qmin40} м³/ч`);
  if (row.qmin30) parts.push(`1:30 — Qmin ${row.qmin30} м³/ч`);
  if (row.qmin20) parts.push(`1:20 — Qmin ${row.qmin20} м³/ч`);
  return parts.join("; ");
}

function buildRgtExtraSpecs(row: RgtFlowRow): ProductSpecRow[] {
  const specs: ProductSpecRow[] = [
    { characteristic: "Типоразмер", value: row.typoraзmer },
    { characteristic: "Максимальный расход Qmax", value: `${row.qmax} м³/ч` },
    { characteristic: "Условный диаметр", value: `DN${row.dn} мм` }
  ];

  if (row.bodyType) {
    specs.push({ characteristic: "Исполнение корпуса", value: row.bodyType });
  }

  if (row.isPn10) {
    specs.push({ characteristic: "Рабочее давление", value: "10 МПа (100 кгс/см²)" });
  }

  const range = buildRangeSpec(row);
  if (range) {
    specs.push({ characteristic: "Диапазон рабочих расходов", value: range });
  }

  if (row.limitedExecutions) {
    specs.push({
      characteristic: "Исполнения",
      value: "«О», «2», «3», «3С», «5», «5С»"
    });
  }

  return specs;
}

function buildRgtTitle(row: RgtFlowRow): string {
  const bodySuffix = row.bodyType ? `, исполнение корпуса ${row.bodyType}` : "";
  return `Турбинный счётчик газа РГ-Т ${row.typoraзmer} (DN ${row.dn} мм${bodySuffix})`;
}

export type RgtProductDefinition = {
  slug: string;
  title: string;
  model: string;
  typoraзmer: string;
  extraSpecs: ProductSpecRow[];
};

export const RGT_T_PRODUCTS: RgtProductDefinition[] = RGT_T_ALL_FLOW_ROWS.map((row) => ({
  slug: row.slug,
  title: buildRgtTitle(row),
  model: `РГ-Т ${row.typoraзmer}`,
  typoraзmer: row.typoraзmer,
  extraSpecs: buildRgtExtraSpecs(row)
}));

export function buildRgtListingDescription(product: RgtProductDefinition): string {
  const qmax = product.extraSpecs.find((row) => row.characteristic === "Максимальный расход Qmax")
    ?.value;
  const du = product.extraSpecs.find((row) => row.characteristic === "Условный диаметр")?.value;

  const params = [qmax, du].filter(Boolean).join(", ");
  if (params) {
    return `Турбинный счётчик газа РГ-Т ${product.typoraзmer}, ${params}. Промышленный учёт природного газа.`;
  }

  return `Турбинный счётчик газа РГ-Т ${product.typoraзmer}. Промышленный учёт природного газа, расход 5–6500 м³/ч.`;
}

export const RGT_T_CONTENT_BY_SLUG: Record<string, ProductRichContent> = Object.fromEntries(
  RGT_T_PRODUCTS.map((product) => [product.slug, rgtContent(product)])
);
