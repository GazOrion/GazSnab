export type ProductPartsCatalogRow = {
  code: string;
  description: string;
};

export type ProductDescriptionBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; level?: 3 | 4 }
  | { type: "list"; items: string[] }
  | { type: "subheading"; text: string; body: string }
  | { type: "modification"; title: string; badge: string; body: string }
  | {
      type: "figure";
      imageSrc: string;
      imageAlt: string;
      caption?: string;
      expandable?: boolean;
    }
  | {
      type: "parts-catalog";
      imageSrc?: string;
      imageAlt?: string;
      items: ProductPartsCatalogRow[];
    }
  | { type: "data-table"; table: ProductDataTable };

export type ProductSpecRow = {
  characteristic: string;
  value: string;
};

export type ProductDimensionsContent = {
  title?: string;
  imageSrc: string;
  imageAlt: string;
  caption: string;
};

export type ProductDimensionsSection = {
  sectionTitle?: string;
  items: ProductDimensionsContent[];
};

export type ProductComparisonTableRow = {
  characteristic: string;
  values: [string, string];
};

export type ProductComparisonTable = {
  columns: [string, string];
  rows: ProductComparisonTableRow[];
};

export type ProductDataTable = {
  columns: string[];
  rows: string[][];
};

export type ProductRichContent = {
  descriptionTitle: string;
  description: ProductDescriptionBlock[];
  specsTitle: string;
  specs: ProductSpecRow[];
  comparisonTable?: ProductComparisonTable;
  dimensions?: ProductDimensionsContent;
  dimensionsSection?: ProductDimensionsSection;
};

export const SMT_KOMPLEKS_CONTENT: ProductRichContent = {
  descriptionTitle: "Подробное описание",
  description: [
    {
      type: "paragraph",
      text: "Соответствует Постановлению Правительства РФ от 16 ноября 2020 г. N 1847 «Об утверждении перечня измерений, относящихся к сфере государственного регулирования обеспечения единства измерений»."
    },
    {
      type: "paragraph",
      text: "Метрологические характеристики соответствуют СТО Газпром 5.37-2011 «Единые технические требования на оборудование узлов измерения расхода и количества природного газа, применяемых в ОАО «Газпром»."
    },
    {
      type: "paragraph",
      text: "Соответствует требованиям п.6 «Показатели точности» в диапазоне расходов Qmin – Qmax для категории УИРГ «Группа Б» СТО Газпром газораспределение 2.4.-13-1-2025 «Узлы измерений расхода газа»."
    },
    { type: "heading", text: "Особенности и преимущества", level: 3 },
    {
      type: "list",
      items: [
        "Интегрирован в единый пульт управления СТМ РГК/ГРО;",
        "2 встроенные SIM-карты формата SIM-чип (опция);",
        "Передача данных с одной SIM-карты на 2 сервера сбора данных;",
        "Измерение объёма природного газа, приведённого к стандартным условиям;",
        "Надёжная защита от внешних несанкционированных воздействий, искажающих результаты измерений;",
        "Система диагностики работоспособности прибора;",
        "Дистанционная передача измеренных данных и архивов событий на сервера поставщика и потребителя газа;",
        "Передача данных по каналам GPRS, GSM, оптическому каналу;",
        "Сбор и анализ данных выполняется программно-техническим комплексом «Газсеть», установленным на серверах поставщика и потребителя газа;",
        "Работа в мобильном приложении «Моя Газсеть» для абонентов узлов учёта газа;",
        "Автономная работа комплекса — не менее 12 лет;",
        "Возможность подключения внешней телеметрии БПЭК-03/ЦК."
      ]
    },
    { type: "heading", text: "Модификации", level: 3 },
    {
      type: "modification",
      title: "Модификация «У»",
      badge: "У",
      body: "С улучшенными точностными характеристиками. Предел допускаемой основной относительной погрешности 1,5% во всём диапазоне измерений."
    }
  ],
  specsTitle: "Основные технические характеристики",
  specs: [
    {
      characteristic: "Диапазон измеряемых расходов",
      value: [
        "G4 — от 0,04 м³/ч до 7 м³/ч, Qном = 4 м³/ч",
        "G6 — от 0,06 м³/ч до 11 м³/ч, Qном = 6 м³/ч",
        "G10 — от 0,1 м³/ч до 18 м³/ч, Qном = 10 м³/ч",
        "G16 — от 0,16 м³/ч до 28 м³/ч, Qном = 16 м³/ч",
        "G25 — от 0,25 м³/ч до 45 м³/ч, Qном = 25 м³/ч"
      ].join("\n")
    },
    {
      characteristic: "Измеряемая среда",
      value: "природный газ по ГОСТ 5542"
    },
    {
      characteristic: "Измерение стандартного объёма",
      value: "tст = 20°C\nPст = 760 мм. рт. ст. (101,325 кПа)"
    },
    {
      characteristic: "Основная относительная погрешность, %, не более",
      value: "± 3 от Qмин до 0,1Qном включ.\n± 1,5 св. 0,1Qном до Qмакс включ."
    },
    {
      characteristic:
        "Допускаемая относительная погрешность при измерении объёма газа, приведённого к стандартным условиям, для рабочих условий применения",
      value: "±4%"
    },
    {
      characteristic: "Потеря давления ΔP при Qмакс, Па, не более",
      value: ["G4 — 150", "G6 — 200", "G10 — 250", "G16 — 350", "G25 — 400"].join("\n")
    },
    {
      characteristic: "Порог чувствительности, м³/ч",
      value: ["G4 — 0,008", "G6 — 0,012", "G10 — 0,02", "G16 — 0,032", "G25 — 0,05"].join("\n")
    },
    {
      characteristic: "Максимальное рабочее избыточное давление измеряемой среды, кПа, не более",
      value: "15"
    },
    {
      characteristic: "Температура окружающей среды, °C",
      value: "от -40 до 60"
    },
    {
      characteristic: "Температура измеряемой среды, °C",
      value: "от -25 до 55"
    },
    {
      characteristic: "Тип присоединения к трубопроводу",
      value: "Фланец DN 40, Внутренняя резьба 1 ¼″"
    },
    {
      characteristic: "Степень защиты от воздействия окружающей среды",
      value: "IP54"
    },
    {
      characteristic: "Маркировка взрывозащиты",
      value: "1Ex ib IIB T4 Gb X"
    },
    {
      characteristic: "Каналы передачи данных",
      value: [
        "Оптический канал,",
        "Встроенная GSM/GPRS телеметрия,",
        "Подключаемая внешняя GSM/GPRS телеметрия"
      ].join("\n")
    },
    {
      characteristic: "Архивы",
      value: [
        "Интервальный — предусматривает интервальные записи с периодом 1 час на начало каждого часа;",
        "Суточный — предусматривает интервальные записи с периодом 1 сутки на начало «газового дня»;",
        "Архив изменений — предназначен для контроля и хранения данных обо всех изменениях настраиваемых параметров СМТ-Комплекс;",
        "Архив телеметрии — предназначен для логирования процесса работы встроенного модуля телеметрии, фиксации активности оптического интерфейса;",
        "Архив системный — предназначен для фиксации сервисной информации по сбоям аппаратных систем и ПО СМТ-Комплекс."
      ].join("\n")
    },
    {
      characteristic: "Срок работы элементов питания для измерений",
      value: "Не менее 12 лет"
    },
    {
      characteristic: "Срок работы элементов питания встроенного модуля телеметрии",
      value:
        "Не менее одного межповерочного интервала (6 лет, при ежесуточном режиме работы), допускается замена элементов питания в течение всего периода эксплуатации"
    }
  ],
  dimensions: {
    title: "Габаритные и присоединительные размеры счётчиков СМТ-Комплекс",
    imageSrc: "/media/products/smt/smt-kompleks-dimensions.png",
    imageAlt: "Габаритные и присоединительные размеры счётчиков СМТ-Комплекс",
    caption:
      "Тип соединения счётчика с трубопроводом: фланец 40-2,5-01. Габаритные размеры G4–G25, не более 246×175×200 мм"
  }
};
