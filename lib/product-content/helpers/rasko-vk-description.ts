import type { ProductDescriptionBlock, ProductSpecRow } from "@/lib/product-content/smt-kompleks";
import { productSpecValue } from "@/lib/product-content/helpers/product-spec-value";

const PRINCIPLE_VARIANTS = [
  "Измерение выполняется по объёмному принципу: разность давлений на входе и выходе преобразуется в возвратно-поступательное движение мембран, образующих две рабочие камеры. Газ поочерёдно заполняет камеры, перемещая мембраны и вытесняя поток через выходной патрубок.",
  "Счётчик относится к диафрагменным приборам. Поток газа поочерёдно заполняет измерительные камеры, давление на мембраны преобразуется в поступательное движение, а кривошипно-шатунный механизм передаёт его на восьмиразрядный счётный механизм.",
  "Принцип работы основан на преобразовании перепада давления в перемещение мембран. Каждый цикл заполнения и опорожнения камер соответствует строго определённому объёму газа, прошедшему через прибор."
] as const;

const THERMO_VARIANTS = [
  "Исполнение «T» дополнительно оснащено механическим температурным компенсатором в виде спиральной биметаллической пружины, что позволяет учитывать влияние температуры газа на показания.",
  "В версии с индексом «T» установлен механический температурный компенсатор из биметаллической спирали. Он корректирует объём измерительных камер при отклонении температуры газа от нормальных условий.",
  "Модификация «T» комплектуется механической температурной компенсацией: биметаллическая пружина изменяет эффективный объём камер и приводит показания к стандартным условиям."
] as const;

function variantIndex(key: string, modulo: number) {
  let hash = 0;
  for (const char of key) {
    hash = (hash + char.charCodeAt(0)) % modulo;
  }
  return hash;
}

function buildHouseholdDimensionsTable(typeSize: string): ProductDescriptionBlock[] {
  const rowsByType: Record<string, string[]> = {
    "G1,6": ["225", "205", "165", "1¼", "110", "1,9"],
    "G1,6T": ["225", "205", "165", "1¼", "110", "1,9"],
    "G2,5": ["225", "205", "165", "1¼", "110", "1,9"],
    "G2,5T": ["225", "205", "165", "1¼", "110", "1,9"],
    "G4": ["225 / 245", "205", "165 / 170", "1¼", "110 / 250", "1,9 / 3,2"],
    "G4T": ["225 / 245", "205", "165 / 170", "1¼", "110 / 250", "1,9 / 3,2"],
    "G6": ["245 / 250 / 285", "330 / 340 / 280", "170 / 170 / 205", "1¼", "200 / 250 / 180", "3,5"],
    "G6T": ["245 / 250 / 285", "330 / 340 / 280", "170 / 170 / 205", "1¼", "200 / 250 / 180", "3,5"]
  };

  const row = rowsByType[typeSize];
  if (!row) {
    return [];
  }

  return [
    {
      type: "heading",
      text: `Габаритно-присоединительные размеры ${typeSize}`,
      level: 4
    },
    {
      type: "data-table",
      table: {
        columns: ["Высота, мм", "Ширина, мм", "Длина, мм", "Резьба, дюйм", "Межосевое, мм", "Масса, кг"],
        rows: [row]
      }
    }
  ];
}

function buildCommunalDimensionsTable(typeSize: string): ProductDescriptionBlock[] {
  const rowsByType: Record<string, string[]> = {
    G10: ["320 / 330 / 320", "350 / 405 / 335", "205 / 235 / 220", "1¾ / 2", "250 / 280 / 250", "5,7"],
    G10T: ["320 / 330 / 320", "350 / 405 / 335", "205 / 235 / 220", "1¾ / 2", "250 / 280 / 250", "5,7"],
    G16: ["340 / 375", "405", "235 / 275", "2", "280", "8"],
    G16T: ["340 / 375", "405", "235 / 275", "2", "280", "8"],
    G25: ["375 / 425", "465", "275 / 290", "2½", "335", "10,6"],
    G25T: ["375 / 425", "465", "275 / 290", "2½", "335", "10,6"]
  };

  const row = rowsByType[typeSize];
  if (!row) {
    return [];
  }

  return [
    {
      type: "heading",
      text: `Габаритно-присоединительные размеры ${typeSize}`,
      level: 4
    },
    {
      type: "data-table",
      table: {
        columns: ["Высота, мм", "Ширина, мм", "Длина, мм", "Резьба, дюйм", "Межосевое, мм", "Масса, кг"],
        rows: [row]
      }
    }
  ];
}

export function buildRaskoVkDescriptionBlocks(
  model: string,
  extraSpecs: ProductSpecRow[],
  options: { communal?: boolean; thermo?: boolean; slug: string }
): ProductDescriptionBlock[] {
  const typeSize = productSpecValue(extraSpecs, "Типоразмер") ?? model;
  const qnom = productSpecValue(extraSpecs, "Номинальный расход");
  const qrange = productSpecValue(extraSpecs, "Диапазон рабочих расходов");
  const cyclicVolume = productSpecValue(extraSpecs, "Циклический объём");
  const sensitivity = productSpecValue(extraSpecs, "Порог чувствительности");
  const index = variantIndex(options.slug, PRINCIPLE_VARIANTS.length);

  const scope = options.communal
    ? "на коммунальных и производственных объектах с котлами малой и средней мощности"
    : "в квартирах, частных домах и на объектах с газовыми плитами, колонками и котлами малой мощности";

  const assignmentParts = [
    `Диафрагменный счётчик газа РАСКО ${model} предназначен для коммерческого учёта природного, сжиженного и других неагрессивных газов ${scope}.`
  ];

  if (qnom) {
    assignmentParts.push(`Номинальный расход — ${qnom}.`);
  }

  if (qrange) {
    assignmentParts.push(`Рабочий диапазон — ${qrange}.`);
  }

  if (cyclicVolume) {
    assignmentParts.push(`Циклический объём камер — ${cyclicVolume}.`);
  }

  if (sensitivity) {
    assignmentParts.push(`Порог чувствительности — ${sensitivity}.`);
  }

  const blocks: ProductDescriptionBlock[] = [
    { type: "paragraph", text: assignmentParts.join(" ") },
    { type: "paragraph", text: PRINCIPLE_VARIANTS[index]! }
  ];

  if (options.thermo) {
    blocks.push({
      type: "paragraph",
      text: THERMO_VARIANTS[index]!
    });
  } else {
    blocks.push({
      type: "paragraph",
      text:
        "Счётчик может выпускаться в исполнении «N» с улучшенными метрологическими характеристиками. Конструкция допускает установку низкочастотного импульсного датчика и электронного корректора объёма газа."
    });
  }

  blocks.push(
    {
      type: "heading",
      text: `Отличительные особенности ${model}`,
      level: 4
    },
    {
      type: "list",
      items: [
        "Механическая температурная компенсация в исполнении «T».",
        "Улучшенные метрологические характеристики в исполнении «N».",
        "Защита от механических вмешательств и блокировка обратного хода.",
        "Низкая потеря давления и малая чувствительность к загрязнениям газа.",
        "Энергонезависимость, коррозионная стойкость и компактная конструкция.",
        "Сертификат об утверждении типа средств измерений."
      ]
    },
    {
      type: "heading",
      text: `Особенности монтажа ${model}`,
      level: 4
    },
    {
      type: "list",
      items: [
        "Установка только в вертикальном положении с учётом направления потока.",
        "Перед монтажом трубопровод очищают от загрязнений; опрессовку выполняют до установки счётчика.",
        "Присоединение не должно передавать на корпус нагрузки, деформирующие его.",
        "Дно счётчика не должно соприкасаться с полом; на открытом воздухе нужна защита от солнца и осадков.",
        "Давление на входе при вводе в эксплуатацию не должно превышать 50 кПа."
      ]
    }
  );

  blocks.push(
    ...(options.communal
      ? buildCommunalDimensionsTable(typeSize)
      : buildHouseholdDimensionsTable(typeSize))
  );

  return blocks;
}
