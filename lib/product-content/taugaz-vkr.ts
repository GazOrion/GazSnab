import type { ProductRichContent, ProductSpecRow } from "@/lib/product-content/smt-kompleks";

const MEMBRANE_INTRO =
  "Мембранные счётчики газа ТАУГАЗ серии ВКР предназначены для учёта объёма природного газа. Корпус с механическим отсчётным устройством, резьбовое присоединение.";

function vkrContent(
  model: string,
  lineSpec: string,
  extraSpecs: ProductSpecRow[] = []
): ProductRichContent {
  return {
    descriptionTitle: "Подробное описание",
    description: [
      { type: "paragraph", text: MEMBRANE_INTRO },
      { type: "paragraph", text: lineSpec }
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
  "taugaz-vkr-g16-g25-g4": vkrContent(
    "ВКР G1,6; G2,5; G4",
    "V1,2L, A-110, левый/правый.",
    [
      { characteristic: "Типоразмеры", value: "G1,6; G2,5; G4" },
      { characteristic: "Циклический объём", value: "1,2 л" },
      { characteristic: "Межосевое расстояние", value: "110 мм" },
      { characteristic: "Исполнение", value: "левый/правый" }
    ]
  ),
  "taugaz-vkr-g16-g25-g4t": vkrContent(
    "ВКР G1,6T; G2,5T; G4T",
    "V1,2L, A-110, левый/правый, с механической термокоррекцией.",
    [
      { characteristic: "Типоразмеры", value: "G1,6T; G2,5T; G4T" },
      { characteristic: "Циклический объём", value: "1,2 л" },
      { characteristic: "Межосевое расстояние", value: "110 мм" },
      { characteristic: "Термокоррекция", value: "механическая" },
      { characteristic: "Исполнение", value: "левый/правый" }
    ]
  ),
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
