import type { ProductRichContent, ProductSpecRow } from "@/lib/product-content/smt-kompleks";

function vkrContent(
  model: string,
  lineSpec: string,
  extraSpecs: ProductSpecRow[] = []
): ProductRichContent {
  const typeSize = extraSpecs.find((row) => row.characteristic === "Типоразмер")?.value;
  const cyclicVolume = extraSpecs.find((row) => row.characteristic === "Циклический объём")?.value;
  const thermo = extraSpecs.find((row) => row.characteristic === "Термокоррекция")?.value;
  const axis = extraSpecs.find((row) => row.characteristic === "Межосевое расстояние")?.value;

  const intro = typeSize
    ? `Мембранный счётчик газа ТАУГАЗ ${model} (типоразмер ${typeSize}) предназначен для учёта объёма природного газа в бытовых и коммунальных узлах. Корпус с механическим отсчётным устройством, резьбовое присоединение.`
    : `Мембранный счётчик газа ТАУГАЗ ${model} предназначен для учёта объёма природного газа. Корпус с механическим отсчётным устройством, резьбовое присоединение.`;

  const detailParts = [`Конструктивное исполнение ${model}: ${lineSpec}`];
  if (cyclicVolume) {
    detailParts.push(`Циклический объём — ${cyclicVolume}.`);
  }
  if (axis) {
    detailParts.push(`Межосевое расстояние патрубков — ${axis}.`);
  }
  if (thermo) {
    detailParts.push(`Версия ${typeSize ?? model} комплектуется механической термокоррекцией.`);
  }

  return {
    descriptionTitle: "Подробное описание",
    description: [
      { type: "paragraph", text: intro },
      { type: "paragraph", text: detailParts.join(" ") }
    ],
    specsTitle: "Технические характеристики",
    specs: [
      { characteristic: "Производитель", value: "ТАУГАЗ" },
      { characteristic: "Серия", value: "ВКР" },
      { characteristic: "Модель", value: model },
      { characteristic: "Тип счётчика", value: "мембранный" },
      ...extraSpecs
    ]
  };
}

export const TAUGAZ_VKR_CONTENT_BY_SLUG: Record<string, ProductRichContent> = {
  "taugaz-vkr-g6": vkrContent("ВКР G6", "V2L, A-250, левый.", [
    { characteristic: "Типоразмер", value: "G6" },
    { characteristic: "Циклический объём", value: "2 л" },
    { characteristic: "Межосевое расстояние", value: "250 мм" },
    { characteristic: "Исполнение", value: "левый" }
  ]),
  "taugaz-vkr-g6t": vkrContent(
    "ВКР G6T",
    "V2L, A-250, левый, с механической термокоррекцией.",
    [
      { characteristic: "Типоразмер", value: "G6T" },
      { characteristic: "Циклический объём", value: "2 л" },
      { characteristic: "Межосевое расстояние", value: "250 мм" },
      { characteristic: "Термокоррекция", value: "механическая" },
      { characteristic: "Исполнение", value: "левый" }
    ]
  ),
  "taugaz-vkr-g10-v35": vkrContent("ВКР G10", "V3,5L, A-250, левый.", [
    { characteristic: "Типоразмер", value: "G10" },
    { characteristic: "Циклический объём", value: "3,5 л" },
    { characteristic: "Межосевое расстояние", value: "250 мм" },
    { characteristic: "Исполнение", value: "левый" }
  ]),
  "taugaz-vkr-g10t-v35": vkrContent("ВКР G10T", "V3,5L, A-250, левый.", [
    { characteristic: "Типоразмер", value: "G10T" },
    { characteristic: "Циклический объём", value: "3,5 л" },
    { characteristic: "Межосевое расстояние", value: "250 мм" },
    { characteristic: "Исполнение", value: "левый" }
  ]),
  "taugaz-vkr-g10-v6": vkrContent("ВКР G10", "V6L, A-280, левый.", [
    { characteristic: "Типоразмер", value: "G10" },
    { characteristic: "Циклический объём", value: "6 л" },
    { characteristic: "Межосевое расстояние", value: "280 мм" },
    { characteristic: "Исполнение", value: "левый" }
  ]),
  "taugaz-vkr-g16": vkrContent("ВКР G16", "V6L, A-280, левый.", [
    { characteristic: "Типоразмер", value: "G16" },
    { characteristic: "Циклический объём", value: "6 л" },
    { characteristic: "Межосевое расстояние", value: "280 мм" },
    { characteristic: "Исполнение", value: "левый" }
  ]),
  "taugaz-vkr-g25": vkrContent("ВКР G25", "V12L, A-335, левый.", [
    { characteristic: "Типоразмер", value: "G25" },
    { characteristic: "Циклический объём", value: "12 л" },
    { characteristic: "Межосевое расстояние", value: "335 мм" },
    { characteristic: "Исполнение", value: "левый" }
  ])
};
