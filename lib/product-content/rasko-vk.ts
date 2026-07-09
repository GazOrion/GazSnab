import type {
  ProductDescriptionBlock,
  ProductRichContent,
  ProductSpecRow
} from "@/lib/product-content/smt-kompleks";

const RASKO_VK_SHORT =
  "Бытовые счётчики газа диафрагменные ВК типоразмеров G1,6(T), G2,5(T), G4(T), G6(T) предназначены для учёта объёма потребляемого газа (природного, сжиженного, нефтяного, пропана, бутана, инертных газов и других неагрессивных, неоднородных по химическому составу газов) в квартирах, частных домах, оборудованных газовыми плитами, колонками и котлами малой и средней мощности, и других сферах деятельности, где требуется учёт потребляемого газа.";

const RASKO_VK_COMMUNAL_SHORT =
  "Счётчики газа диафрагменные ВК G10(T), G16(T), G25(T) предназначены для учёта объёма потребляемого газа (природного, сжиженного, нефтяного, пропана, бутана, инертных и других неагрессивных, неоднородных по химическому составу газов) на коммунальных и производственных объектах, оборудованных котлами малой и средней мощности, на предприятиях различных отраслей промышленности и в других сферах деятельности, где требуется учёт потребляемого газа.";

const RASKO_VK_DESCRIPTION_BLOCKS: ProductDescriptionBlock[] = [
  {
    type: "paragraph",
    text: "Принцип действия диафрагменного счётчика газа ВК основан на преобразовании на входе и выходе разности давлений газа в возвратно-поступательное движение образующих две измерительные камеры мембран. Газ через входной патрубок заполняет пространство внутри корпуса и через входной клапан поступает поочередно в одну из камер, оказывая давление на мембрану, которая, перемещаясь, вытесняет газ из соседней камеры через выходной клапан и отводящий канал в выходной патрубок. Возвратно-поступательное движение мембран преобразуется рычажно-кривошипным механизмом во вращательное движение вала, число оборотов которого пропорционально протекающему объёму газа. Вращение вала приводит в движение восьмиразрядный счётный механизм."
  },
  {
    type: "paragraph",
    text: "Счётчики ВК могут выпускаться в исполнении «Т» с механической температурной компенсацией. Они дополнительно оснащаются выполненным в виде спиральной биметаллической пружины механическим температурным компенсатором. Счётчики в исполнении без температурной компенсации могут иметь исполнение «Н» с улучшенными метрологическими характеристиками."
  },
  {
    type: "heading",
    text: "Отличительные особенности",
    level: 4
  },
  {
    type: "list",
    items: [
      "Механическая температурная компенсация в исполнении «Т»",
      "Улучшенные метрологические характеристики в исполнении «Н»",
      "Дополнительная защита от механических вмешательств",
      "Высокая чувствительность и точность измерений",
      "Возможность дополнительного монтажа низкочастотного датчика импульсов и электронного корректора объёма газа",
      "Наличие блокировки от обратного хода",
      "Низкая потеря давления и малая чувствительность к загрязнениям газа",
      "Энергонезависимость и высокая коррозионная стойкость",
      "Компактная конструкция и современный дизайн",
      "Наличие сертификата об утверждении типа средств измерений"
    ]
  },
  {
    type: "heading",
    text: "Особенности монтажа",
    level: 4
  },
  {
    type: "list",
    items: [
      "Счётчик устанавливается только в вертикальном положении с учётом направления потока газа",
      "Перед монтажом трубопровод должен быть очищен от загрязнений",
      "Присоединение должно исключать передачу сил, деформирующих корпус",
      "Запрещается располагать счётчик над открытым пламенем; поверхность не должна нагреваться выше 55 °С",
      "Дно установленного счётчика не должно соприкасаться с полом",
      "При монтаже на открытом воздухе счётчик должен быть защищён от солнца, пыли и осадков",
      "Счётчик малочувствителен к загрязнениям и не требует фильтра перед собой",
      "Опрессовку избыточным давлением проводить до установки счётчика",
      "Давление на входе при вводе в эксплуатацию не должно превышать 50 кПа"
    ]
  }
];

const RASKO_VK_COMMUNAL_DESCRIPTION_BLOCKS: ProductDescriptionBlock[] = [
  {
    type: "paragraph",
    text: "Принцип действия коммунального диафрагменного счётчика газа ВК основан на преобразовании разности давлений газа на входе и выходе в возвратно-поступательное движение мембран, образующих две измерительные камеры. Газ через входной патрубок заполняет пространство внутри корпуса и через входной клапан поступает поочередно в одну из камер, оказывая давление на мембрану, которая, перемещаясь, вытесняет газ из соседней камеры через выходной клапан и отводящий канал в выходной патрубок. Возвратно-поступательное движение мембран преобразуется рычажно-кривошипным механизмом во вращательное движение вала, число оборотов которого пропорционально протекающему объёму газа. Вращение вала приводит в движение восьмиразрядный счётный механизм."
  },
  {
    type: "paragraph",
    text: "Счётчики ВК могут выпускаться в исполнении «Т» с механической температурной компенсацией. Они дополнительно оснащаются механическим температурным компенсатором, выполненным в виде спиральной биметаллической пружины. Счётчики в исполнении без температурной компенсации могут иметь исполнение «Н» с улучшенными метрологическими характеристиками."
  },
  {
    type: "heading",
    text: "Отличительные особенности",
    level: 4
  },
  {
    type: "list",
    items: [
      "Механическая температурная компенсация в исполнении «Т»",
      "Улучшенные метрологические характеристики в исполнении «Н»",
      "Дополнительная защита от механических вмешательств",
      "Высокая чувствительность и точность измерений",
      "Возможность дополнительного монтажа низкочастотного датчика импульсов и электронного корректора объёма газа",
      "Наличие блокировки от обратного хода",
      "Низкая потеря давления при работе на всех расходах",
      "Малая чувствительность к загрязнениям газа",
      "Низкий уровень шума при работе",
      "Энергонезависимость",
      "Высокая коррозионная стойкость металлических элементов и надёжность синтетических материалов",
      "Компактная конструкция и современный дизайн",
      "Наличие сертификата об утверждении типа средств измерений"
    ]
  },
  {
    type: "heading",
    text: "Особенности монтажа",
    level: 4
  },
  {
    type: "list",
    items: [
      "Счётчик устанавливается только в вертикальном положении с учётом направления потока газа",
      "Перед монтажом трубопровод должен быть очищен от загрязнений",
      "Присоединение должно исключать передачу сил, деформирующих корпус",
      "Запрещается располагать счётчик над открытым пламенем; поверхность не должна нагреваться выше 55 °С",
      "Дно установленного счётчика не должно соприкасаться с полом",
      "При монтаже на открытом воздухе счётчик должен быть защищён от солнца, пыли и осадков",
      "Счётчик малочувствителен к загрязнениям и не требует фильтра перед собой",
      "Опрессовку избыточным давлением проводить до установки счётчика",
      "После установки соединения проверить на герметичность мыльной эмульсией",
      "Давление на входе при вводе в эксплуатацию не должно превышать 50 кПа",
      "При каждом запуске обеспечить плавное заполнение счётчика газом"
    ]
  }
];

const HOUSEHOLD_DIMENSIONS_TABLE: ProductDescriptionBlock[] = [
  {
    type: "heading",
    text: "Габаритно-присоединительные размеры бытовых счётчиков газа диафрагменных ВК-G1,6(Т), ВК-G2,5(Т), ВК-G4(Т), ВК-G6(Т)",
    level: 4
  },
  {
    type: "data-table",
    table: {
      columns: ["Параметр", "G1,6", "G2,5", "G4", "G6"],
      rows: [
        ["Высота, мм", "225", "225", "225 / 245", "245 / 250 / 285"],
        ["Ширина, мм", "205", "205", "205 / 330", "330 / 340 / 280"],
        ["Длина, мм", "165", "165", "165 / 170", "170 / 170 / 205"],
        ["Присоединительная резьба, дюйм", "1¼", "1¼", "1¼", "1¼"],
        [
          "Расстояние между осями присоединительных штуцеров, мм",
          "110",
          "110",
          "110 / 250",
          "200 / 250 / 180"
        ],
        ["Масса, кг, не более", "1,9", "1,9", "1,9 / 3,2", "3,5"]
      ]
    }
  }
];

const COMMUNAL_DIMENSIONS_TABLE: ProductDescriptionBlock[] = [
  {
    type: "heading",
    text: "Габаритно-присоединительные размеры коммунальных диафрагменных счётчиков газа ВК-G10(T), ВК-G16(T), ВК-G25(T)",
    level: 4
  },
  {
    type: "data-table",
    table: {
      columns: ["Параметр", "G10", "G16", "G25"],
      rows: [
        ["Высота, мм", "320 / 330 / 320", "340 / 375", "375 / 425"],
        ["Ширина, мм", "350 / 405 / 335", "405", "465"],
        ["Длина, мм", "205 / 235 / 220", "235 / 275", "275 / 290"],
        ["Присоединительная резьба, дюйм", "1¾ / 2", "2", "2½"],
        [
          "Расстояние между осями присоединительных штуцеров, мм",
          "250 / 280 / 250",
          "280",
          "335"
        ],
        ["Масса, кг, не более", "5,7", "8", "10,6"]
      ]
    }
  }
];

const COMMON_SPECS: ProductSpecRow[] = [
  { characteristic: "Производитель", value: "РАСКО" },
  { characteristic: "Серия", value: "ВК" },
  { characteristic: "Тип счётчика", value: "диафрагменный" },
  { characteristic: "Давление измеряемой среды, не более", value: "5 кПа" },
  { characteristic: "Максимальное давление внутри корпуса, не более", value: "50 кПа" },
  { characteristic: "Температура измеряемой среды", value: "от −25 °С до +40 °С" },
  {
    characteristic: "Температура окружающей среды",
    value: "от −40 °С до +55 °С"
  },
  { characteristic: "Межповерочный интервал", value: "10 лет" },
  { characteristic: "Средний срок службы", value: "20 лет" }
];

const COMMUNAL_COMMON_SPECS: ProductSpecRow[] = [
  ...COMMON_SPECS,
  { characteristic: "Порог чувствительности", value: "0,01 м³/ч" }
];

function raskoVkIntro(model: string, extraSpecs: ProductSpecRow[], communal: boolean): string {
  const typeSize = extraSpecs.find((row) => row.characteristic === "Типоразмер")?.value ?? model;
  const qnom = extraSpecs.find((row) => row.characteristic === "Номинальный расход")?.value;
  const qrange = extraSpecs.find((row) => row.characteristic === "Диапазон рабочих расходов")?.value;

  const scope = communal
    ? "на коммунальных и производственных объектах с котлами малой и средней мощности"
    : "в квартирах, частных домах и на объектах с газовым оборудованием малой мощности";

  let text = `Диафрагменный счётчик газа РАСКО ${model} (типоразмер ${typeSize}) предназначен для учёта объёма потребляемого природного, сжиженного и других неагрессивных газов ${scope}.`;

  if (qnom) {
    text += ` Номинальный расход — ${qnom}.`;
  }

  if (qrange) {
    text += ` Диапазон рабочих расходов — ${qrange}.`;
  }

  return text;
}

type RaskoVkContentOptions = {
  communal?: boolean;
  descriptionBlocks: ProductDescriptionBlock[];
  dimensionsTable: ProductDescriptionBlock[];
  baseSpecs?: ProductSpecRow[];
  executionNote?: string;
};

function raskoVkContent(
  model: string,
  extraSpecs: ProductSpecRow[],
  options: RaskoVkContentOptions
): ProductRichContent {
  const introBlocks: ProductDescriptionBlock[] = [
    {
      type: "paragraph",
      text: raskoVkIntro(model, extraSpecs, Boolean(options.communal))
    }
  ];

  if (options.executionNote) {
    introBlocks.push({ type: "paragraph", text: options.executionNote });
  }

  const description: ProductDescriptionBlock[] = [
    ...introBlocks,
    ...options.descriptionBlocks,
    ...options.dimensionsTable
  ];

  return {
    descriptionTitle: "Подробное описание",
    description,
    specsTitle: "Технические характеристики",
    specs: [
      ...(options.baseSpecs ?? COMMON_SPECS),
      { characteristic: "Модель", value: model },
      ...extraSpecs
    ]
  };
}

export const RASKO_VK_CONTENT_BY_SLUG: Record<string, ProductRichContent> = {
  "rasko-vk-g16": raskoVkContent(
    "ВК-G1,6",
    [
      { characteristic: "Типоразмер", value: "G1,6" },
      { characteristic: "Диапазон рабочих расходов", value: "0,016 — 2,5 м³/ч" },
      { characteristic: "Номинальный расход", value: "1,6 м³/ч" },
      { characteristic: "Циклический объём", value: "1,2 дм³" },
      { characteristic: "Порог чувствительности", value: "0,0032 м³/ч" }
    ],
    {
      descriptionBlocks: RASKO_VK_DESCRIPTION_BLOCKS,
      dimensionsTable: HOUSEHOLD_DIMENSIONS_TABLE
    }
  ),
  "rasko-vk-g16t": raskoVkContent(
    "ВК-G1,6T",
    [
      { characteristic: "Типоразмер", value: "G1,6T" },
      { characteristic: "Диапазон рабочих расходов", value: "0,016 — 2,5 м³/ч" },
      { characteristic: "Номинальный расход", value: "1,6 м³/ч" },
      { characteristic: "Циклический объём", value: "1,2 дм³" },
      { characteristic: "Порог чувствительности", value: "0,0032 м³/ч" },
      { characteristic: "Термокоррекция", value: "механическая" }
    ],
    {
      descriptionBlocks: RASKO_VK_DESCRIPTION_BLOCKS,
      dimensionsTable: HOUSEHOLD_DIMENSIONS_TABLE,
      executionNote: "Исполнение «Т» с механической температурной компенсацией."
    }
  ),
  "rasko-vk-g25": raskoVkContent(
    "ВК-G2,5",
    [
      { characteristic: "Типоразмер", value: "G2,5" },
      { characteristic: "Диапазон рабочих расходов", value: "0,025 — 4 м³/ч" },
      { characteristic: "Номинальный расход", value: "2,5 м³/ч" },
      { characteristic: "Циклический объём", value: "1,2 дм³" },
      { characteristic: "Порог чувствительности", value: "0,005 м³/ч" }
    ],
    {
      descriptionBlocks: RASKO_VK_DESCRIPTION_BLOCKS,
      dimensionsTable: HOUSEHOLD_DIMENSIONS_TABLE
    }
  ),
  "rasko-vk-g25t": raskoVkContent(
    "ВК-G2,5T",
    [
      { characteristic: "Типоразмер", value: "G2,5T" },
      { characteristic: "Диапазон рабочих расходов", value: "0,025 — 4 м³/ч" },
      { characteristic: "Номинальный расход", value: "2,5 м³/ч" },
      { characteristic: "Циклический объём", value: "1,2 дм³" },
      { characteristic: "Порог чувствительности", value: "0,005 м³/ч" },
      { characteristic: "Термокоррекция", value: "механическая" }
    ],
    {
      descriptionBlocks: RASKO_VK_DESCRIPTION_BLOCKS,
      dimensionsTable: HOUSEHOLD_DIMENSIONS_TABLE,
      executionNote: "Исполнение «Т» с механической температурной компенсацией."
    }
  ),
  "rasko-vk-g4": raskoVkContent(
    "ВК-G4",
    [
      { characteristic: "Типоразмер", value: "G4" },
      { characteristic: "Диапазон рабочих расходов", value: "0,04 — 6 м³/ч" },
      { characteristic: "Номинальный расход", value: "4 м³/ч" },
      { characteristic: "Циклический объём", value: "1,2 / 2 дм³" },
      { characteristic: "Порог чувствительности", value: "0,008 м³/ч" }
    ],
    {
      descriptionBlocks: RASKO_VK_DESCRIPTION_BLOCKS,
      dimensionsTable: HOUSEHOLD_DIMENSIONS_TABLE
    }
  ),
  "rasko-vk-g4t": raskoVkContent(
    "ВК-G4T",
    [
      { characteristic: "Типоразмер", value: "G4T" },
      { characteristic: "Диапазон рабочих расходов", value: "0,04 — 6 м³/ч" },
      { characteristic: "Номинальный расход", value: "4 м³/ч" },
      { characteristic: "Циклический объём", value: "1,2 / 2 дм³" },
      { characteristic: "Порог чувствительности", value: "0,008 м³/ч" },
      { characteristic: "Термокоррекция", value: "механическая" }
    ],
    {
      descriptionBlocks: RASKO_VK_DESCRIPTION_BLOCKS,
      dimensionsTable: HOUSEHOLD_DIMENSIONS_TABLE,
      executionNote: "Исполнение «Т» с механической температурной компенсацией."
    }
  ),
  "rasko-vk-g6": raskoVkContent(
    "ВК-G6",
    [
      { characteristic: "Типоразмер", value: "G6" },
      { characteristic: "Диапазон рабочих расходов", value: "0,06 — 10 м³/ч" },
      { characteristic: "Номинальный расход", value: "6 м³/ч" },
      { characteristic: "Циклический объём", value: "2 / 3,5 дм³" },
      { characteristic: "Порог чувствительности", value: "0,008 м³/ч" }
    ],
    {
      descriptionBlocks: RASKO_VK_DESCRIPTION_BLOCKS,
      dimensionsTable: HOUSEHOLD_DIMENSIONS_TABLE
    }
  ),
  "rasko-vk-g6t": raskoVkContent(
    "ВК-G6T",
    [
      { characteristic: "Типоразмер", value: "G6T" },
      { characteristic: "Диапазон рабочих расходов", value: "0,06 — 10 м³/ч" },
      { characteristic: "Номинальный расход", value: "6 м³/ч" },
      { characteristic: "Циклический объём", value: "2 / 3,5 дм³" },
      { characteristic: "Порог чувствительности", value: "0,008 м³/ч" },
      { characteristic: "Термокоррекция", value: "механическая" }
    ],
    {
      descriptionBlocks: RASKO_VK_DESCRIPTION_BLOCKS,
      dimensionsTable: HOUSEHOLD_DIMENSIONS_TABLE,
      executionNote: "Исполнение «Т» с механической температурной компенсацией."
    }
  ),
  "rasko-vk-g10": raskoVkContent(
    "ВК-G10",
    [
      { characteristic: "Типоразмер", value: "G10" },
      { characteristic: "Диапазон рабочих расходов", value: "0,10 — 16 м³/ч" },
      { characteristic: "Номинальный расход", value: "10 м³/ч" },
      { characteristic: "Циклический объём", value: "3,5 / 5,6 / 6 дм³" }
    ],
    {
      communal: true,      descriptionBlocks: RASKO_VK_COMMUNAL_DESCRIPTION_BLOCKS,
      dimensionsTable: COMMUNAL_DIMENSIONS_TABLE,
      baseSpecs: COMMUNAL_COMMON_SPECS
    }
  ),
  "rasko-vk-g10t": raskoVkContent(
    "ВК-G10T",
    [
      { characteristic: "Типоразмер", value: "G10T" },
      { characteristic: "Диапазон рабочих расходов", value: "0,10 — 16 м³/ч" },
      { characteristic: "Номинальный расход", value: "10 м³/ч" },
      { characteristic: "Циклический объём", value: "3,5 / 5,6 / 6 дм³" },
      { characteristic: "Термокоррекция", value: "механическая" }
    ],
    {
      communal: true,      descriptionBlocks: RASKO_VK_COMMUNAL_DESCRIPTION_BLOCKS,
      dimensionsTable: COMMUNAL_DIMENSIONS_TABLE,
      baseSpecs: COMMUNAL_COMMON_SPECS,
      executionNote: "Исполнение «Т» с механической температурной компенсацией."
    }
  ),
  "rasko-vk-comm-g16": raskoVkContent(
    "ВК-G16",
    [
      { characteristic: "Типоразмер", value: "G16" },
      { characteristic: "Диапазон рабочих расходов", value: "0,16 — 25 м³/ч" },
      { characteristic: "Номинальный расход", value: "16 м³/ч" },
      { characteristic: "Циклический объём", value: "6 / 11 дм³" }
    ],
    {
      communal: true,      descriptionBlocks: RASKO_VK_COMMUNAL_DESCRIPTION_BLOCKS,
      dimensionsTable: COMMUNAL_DIMENSIONS_TABLE,
      baseSpecs: COMMUNAL_COMMON_SPECS
    }
  ),
  "rasko-vk-comm-g16t": raskoVkContent(
    "ВК-G16T",
    [
      { characteristic: "Типоразмер", value: "G16T" },
      { characteristic: "Диапазон рабочих расходов", value: "0,16 — 25 м³/ч" },
      { characteristic: "Номинальный расход", value: "16 м³/ч" },
      { characteristic: "Циклический объём", value: "6 / 11 дм³" },
      { characteristic: "Термокоррекция", value: "механическая" }
    ],
    {
      communal: true,      descriptionBlocks: RASKO_VK_COMMUNAL_DESCRIPTION_BLOCKS,
      dimensionsTable: COMMUNAL_DIMENSIONS_TABLE,
      baseSpecs: COMMUNAL_COMMON_SPECS,
      executionNote: "Исполнение «Т» с механической температурной компенсацией."
    }
  ),
  "rasko-vk-comm-g25": raskoVkContent(
    "ВК-G25",
    [
      { characteristic: "Типоразмер", value: "G25" },
      { characteristic: "Диапазон рабочих расходов", value: "0,25 — 40 м³/ч" },
      { characteristic: "Номинальный расход", value: "25 м³/ч" },
      { characteristic: "Циклический объём", value: "11 / 12 дм³" }
    ],
    {
      communal: true,      descriptionBlocks: RASKO_VK_COMMUNAL_DESCRIPTION_BLOCKS,
      dimensionsTable: COMMUNAL_DIMENSIONS_TABLE,
      baseSpecs: COMMUNAL_COMMON_SPECS
    }
  ),
  "rasko-vk-comm-g25t": raskoVkContent(
    "ВК-G25T",
    [
      { characteristic: "Типоразмер", value: "G25T" },
      { characteristic: "Диапазон рабочих расходов", value: "0,25 — 40 м³/ч" },
      { characteristic: "Номинальный расход", value: "25 м³/ч" },
      { characteristic: "Циклический объём", value: "11 / 12 дм³" },
      { characteristic: "Термокоррекция", value: "механическая" }
    ],
    {
      communal: true,      descriptionBlocks: RASKO_VK_COMMUNAL_DESCRIPTION_BLOCKS,
      dimensionsTable: COMMUNAL_DIMENSIONS_TABLE,
      baseSpecs: COMMUNAL_COMMON_SPECS,
      executionNote: "Исполнение «Т» с механической температурной компенсацией."
    }
  )
};

export const RASKO_VK_HOUSEHOLD_SLUGS = [
  "rasko-vk-g16",
  "rasko-vk-g16t",
  "rasko-vk-g25",
  "rasko-vk-g25t",
  "rasko-vk-g4",
  "rasko-vk-g4t",
  "rasko-vk-g6",
  "rasko-vk-g6t"
] as const;

export const RASKO_VK_COMMUNAL_SLUGS = [
  "rasko-vk-g10",
  "rasko-vk-g10t",
  "rasko-vk-comm-g16",
  "rasko-vk-comm-g16t",
  "rasko-vk-comm-g25",
  "rasko-vk-comm-g25t"
] as const;

export const RASKO_VK_SHORT_DESCRIPTION = RASKO_VK_SHORT;
export const RASKO_VK_COMMUNAL_SHORT_DESCRIPTION = RASKO_VK_COMMUNAL_SHORT;
