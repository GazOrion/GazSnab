import type { ProductDescriptionBlock, ProductRichContent } from "@/lib/product-content/smt-kompleks";

const MEDIA_BASE = "/media/products/sg-tk";

export const SG_TK_CARD_IMAGE = `${MEDIA_BASE}/sg-tk-01.webp`;

export const SG_TK_GALLERY = [
  SG_TK_CARD_IMAGE,
  `${MEDIA_BASE}/sg-tk-02.webp`,
  `${MEDIA_BASE}/sg-tk-03.webp`,
  `${MEDIA_BASE}/sg-tk-04.webp`
];

export const SG_TK_D_SLUG = "kompleksy-sg-tk-d";
export const SG_TK_R_SLUG = "kompleksy-sg-tk-r";

export const SG_TK_D_TITLE = "Комплексы СГ-ТК-Д на базе диафрагменных счетчиков";
export const SG_TK_R_TITLE = "Комплексы СГ-ТК на базе ротационных счетчиков";

export const SG_TK_SHORT_DESCRIPTION =
  "Комплексы СГ-ТК, модификации СГ-ТК-Т (на базе турбинных счетчиков газа), СГ-ТК-Р (на базе ротационных счетчиков газа) и СГ-ТК-Д (на базе диафрагменных счетчиков газа), предназначены для измерения объема природного газа по ГОСТ 5542 и других неагрессивных, сухих и очищенных, одно- и многокомпонентных газов в единицах приведенного к стандартным условиям объема (количества) посредством автоматической электронной коррекции показаний турбинных, ротационных, диафрагменных счетчиков газа по температуре и при фиксированных значениях давления и коэффициента сжимаемости газа.";

export const SG_TK_D_CARD_DESCRIPTION =
  "Комплексы СГ-ТК-Д на базе диафрагменных счетчиков газа типа BK с температурными корректорами ТС215 и ТС220.";

export const SG_TK_R_CARD_DESCRIPTION =
  "Комплексы СГ-ТК-Р на базе ротационных счетчиков газа с электронной коррекцией показаний по температуре.";

const SG_TK_FUNCTIONS = [
  "Программирование и считывание информации с корректора с помощью оптического порта, установленного на передней панели прибора",
  "Отображение на дисплее текущих измеряемых и рассчитываемых параметров, данных архива",
  "Формирование архива объемом более 2200 записей с интервалом час, день или месяц по рабочему и стандартному объему газа, подстановочному давлению, температуре газа, коэффициенту коррекции. Запись значений в архив происходит по истечении измерительного периода, а также в случае возникновения аварийной ситуации (превышение предельных значений измеряемых параметров) или в случае проведения изменений в настройках корректора",
  "Программирование 2-х цифровых выходов для передачи значений объемов газа в виде импульсов, и/или передачи сообщений об ошибках",
  "Сигнализация о внештатных ситуациях (несанкционированное вмешательство, нарушение границ измеряемых параметров и т.п.)",
  "Интерфейс дистанционного доступа — RS232/RS485",
  "Дистанционная передача данных архива и технологических данных с помощью программного комплекса «СОДЭК Р»",
  "Возможность подключения модулей телеметрии",
  "Передача SMS сообщений"
];

type SgTkVariant = {
  label: string;
  baseMeter?: string;
  qmax?: string;
  sensorMount: string;
  flowDirection?: string;
};

const SG_TK_D_VARIANTS: Record<string, SgTkVariant[]> = {
  "СГ-ТК-Д-2,5...6": [
    {
      label: "Монтаж на корпус",
      qmax: "2,5…6 м³/ч",
      sensorMount: "на корпус счётчика",
      flowDirection: "Л-Пр"
    },
    {
      label: "Монтаж в патрубок",
      qmax: "2,5…6 м³/ч",
      sensorMount: "в патрубок счётчика",
      flowDirection: "Л-Пр"
    }
  ],
  "СГ-ТК-Д-10": [
    {
      label: "BK G6 V2_A250, на корпус",
      baseMeter: "BK G6 V2_A250",
      qmax: "10 м³/ч",
      sensorMount: "на корпус",
      flowDirection: "Л-Пр"
    },
    {
      label: "BK G6 V2_A250, в патрубок",
      baseMeter: "BK G6 V2_A250",
      qmax: "10 м³/ч",
      sensorMount: "в патрубок",
      flowDirection: "Л-Пр"
    },
    {
      label: "BK G6 V2_A200, на корпус",
      baseMeter: "BK G6 V2_A200",
      qmax: "10 м³/ч",
      sensorMount: "на корпус",
      flowDirection: "Пр-Л"
    },
    {
      label: "BK G6 V2_A200, в патрубок",
      baseMeter: "BK G6 V2_A200",
      qmax: "10 м³/ч",
      sensorMount: "в патрубок",
      flowDirection: "Л-Пр, Пр-Л"
    },
    {
      label: "BK G6 V2_A250, на корпус (двунаправленный)",
      baseMeter: "BK G6 V2_A250",
      qmax: "10 м³/ч",
      sensorMount: "на корпус",
      flowDirection: "Л-Пр, Пр-Л"
    },
    {
      label: "BK G6 V2_A250, в патрубок (двунаправленный)",
      baseMeter: "BK G6 V2_A250",
      qmax: "10 м³/ч",
      sensorMount: "в патрубок",
      flowDirection: "Л-Пр, Пр-Л"
    }
  ],
  "СГ-ТК-Д-16": [
    {
      label: "BK G10 V3,5_A250, на корпус",
      baseMeter: "BK G10 V3,5_A250",
      qmax: "16 м³/ч",
      sensorMount: "на корпус"
    },
    {
      label: "Монтаж на корпус",
      qmax: "16 м³/ч",
      sensorMount: "на корпус"
    },
    {
      label: "Монтаж в патрубок",
      qmax: "16 м³/ч",
      sensorMount: "в патрубок"
    }
  ],
  "СГ-ТК-Д-25": [
    {
      label: "BK G16 V11_A280, на корпус",
      baseMeter: "BK G16 V11_A280",
      qmax: "25 м³/ч",
      sensorMount: "на корпус"
    },
    {
      label: "BK G16 V11_A280, в патрубок",
      baseMeter: "BK G16 V11_A280",
      qmax: "25 м³/ч",
      sensorMount: "в патрубок"
    },
    {
      label: "Монтаж на корпус",
      qmax: "25 м³/ч",
      sensorMount: "на корпус"
    },
    {
      label: "Монтаж в патрубок",
      qmax: "25 м³/ч",
      sensorMount: "в патрубок"
    }
  ],
  "СГ-ТК-Д-40": [
    {
      label: "BK G25 V11_A335, на корпус",
      baseMeter: "BK G25 V11_A335",
      qmax: "40 м³/ч",
      sensorMount: "на корпус"
    },
    {
      label: "BK G25 V11_A335, в патрубок",
      baseMeter: "BK G25 V11_A335",
      qmax: "40 м³/ч",
      sensorMount: "в патрубок"
    },
    {
      label: "Монтаж на корпус",
      qmax: "40 м³/ч",
      sensorMount: "на корпус"
    },
    {
      label: "Монтаж в патрубок",
      qmax: "40 м³/ч",
      sensorMount: "в патрубок"
    }
  ],
  "СГ-ТК-Д-65": [
    {
      label: "Гильза в корпусе",
      qmax: "65 м³/ч",
      sensorMount: "в гильзу в корпусе счётчика"
    }
  ],
  "СГ-ТК-Д-100": [
    {
      label: "Гильза в корпусе",
      qmax: "100 м³/ч",
      sensorMount: "в гильзу в корпусе счётчика"
    }
  ]
};

function formatSgTkVariantDescription(variant: SgTkVariant): string {
  const parts: string[] = [];

  if (variant.baseMeter) {
    parts.push(`на базе счётчика газа ${variant.baseMeter}`);
  }

  if (variant.qmax) {
    parts.push(`Qmax=${variant.qmax}`);
  }

  parts.push(`монтаж датчика температуры ${variant.sensorMount}`);

  if (variant.flowDirection) {
    parts.push(`направление потока ${variant.flowDirection}`);
  }

  return parts.join("; ");
}

export const SG_TK_OPTIONS_TITLE = "Дополнительные опции и исполнения";

function sgTkSharedDescription(): ProductDescriptionBlock[] {
  return [
    {
      type: "paragraph",
      text: SG_TK_SHORT_DESCRIPTION
    },
    {
      type: "paragraph",
      text: "Для комплексов СГ-ТК-Д разработана методика выполнения измерений в соответствие с которой относительная расширенная неопределенность комплекса СГ-ТК на базе счетчика газа BK с температурными корректорами ТС215 и ТС220 не превышает ±3%, что соответствует требованиям ГОСТ Р 8.741-2011."
    },
    {
      type: "heading",
      text: "Принцип работы",
      level: 4
    },
    {
      type: "paragraph",
      text: "Принцип действия комплекса СГ-ТК основан на одновременном измерении объема газа (при рабочих условиях), прошедшего через счетчик и температуры газа с последующим вычислением, обработкой и архивированием приведенного к стандартным условиям объема газа с учетом условно-постоянных (подстановочных) значений давления и коэффициента сжимаемости газа с помощью корректора объема газа."
    },
    {
      type: "heading",
      text: "Основные характеристики",
      level: 4
    },
    {
      type: "paragraph",
      text: "Подстановочное значение рабочего давления (избыточное) в зависимости от исполнения комплекса: для исполнения СГ-ТК-Д — до 0,05 МПа; для исполнений СГ-ТК-Р(-Т) — до 0,1 МПа."
    },
    {
      type: "paragraph",
      text: "Диапазон температур окружающей среды комплекса СГ-ТК: от −30°C до +60°C."
    },
    {
      type: "paragraph",
      text: "Межповерочный интервал 5 лет."
    },
    {
      type: "paragraph",
      text: "Взрывозащищённость: комплекс СГ-ТК разрешён для установки во взрывоопасной зоне и имеет маркировку взрывозащищенности «1 Ex ib IIB T4»."
    },
    {
      type: "heading",
      text: "Интерфейс",
      level: 4
    },
    {
      type: "paragraph",
      text: "Комплексы имеют оптический интерфейс локального доступа."
    },
    {
      type: "paragraph",
      text: "Комплекс СГ-ТК дополнительно имеет интерфейс дистанционного доступа RS232/RS485, а так же возможность подключения внешнего источника питания постоянного тока +5…9В, что позволяет использовать его в автоматизированной системе коммерческого учета газа (АСКУГ)."
    },
    {
      type: "heading",
      text: "Выполняемые функции",
      level: 4
    },
    {
      type: "list",
      items: SG_TK_FUNCTIONS
    }
  ];
}

function buildSgTkDOptionsDescription(): ProductDescriptionBlock[] {
  const blocks: ProductDescriptionBlock[] = [
    {
      type: "paragraph",
      text: "Комплексы СГ-ТК-Д на базе диафрагменных счетчиков газа типа BK. Конкретная конфигурация уточняется при заказе."
    }
  ];

  for (const [model, variants] of Object.entries(SG_TK_D_VARIANTS)) {
    blocks.push({
      type: "heading",
      text: model,
      level: 4
    });
    blocks.push({
      type: "data-table",
      table: {
        columns: ["Исполнение / опция", "Описание"],
        rows: variants.map((variant) => [variant.label, formatSgTkVariantDescription(variant)])
      }
    });
  }

  return blocks;
}

export const SG_TK_D_CONTENT: ProductRichContent = {
  descriptionTitle: "Подробное описание",
  description: [
    {
      type: "paragraph",
      text: SG_TK_D_CARD_DESCRIPTION
    },
    ...sgTkSharedDescription()
  ],
  optionsTitle: SG_TK_OPTIONS_TITLE,
  optionsDescription: buildSgTkDOptionsDescription()
};

export const SG_TK_R_CONTENT: ProductRichContent = {
  descriptionTitle: "Подробное описание",
  description: [
    {
      type: "paragraph",
      text: SG_TK_R_CARD_DESCRIPTION
    },
    ...sgTkSharedDescription()
  ]
};

export const SG_TK_CONTENT_BY_SLUG: Record<string, ProductRichContent> = {
  [SG_TK_D_SLUG]: SG_TK_D_CONTENT,
  [SG_TK_R_SLUG]: SG_TK_R_CONTENT
};
