import type { ProductDescriptionBlock, ProductSpecRow } from "@/lib/product-content/smt-kompleks";
import { productSpecValue } from "@/lib/product-content/helpers/product-spec-value";

export type RaboProduct = {
  slug: string;
  model: string;
  typoraзmer: string;
  extraSpecs: ProductSpecRow[];
};

const FEATURE_INTROS = [
  "Ротационный счётчик газа RABO сочетает высокую точность измерения с удобством монтажа в стеснённых узлах учёта. Основные эксплуатационные преимущества модели:",
  "Серия RABO ориентирована на промышленный учёт газа и отличается расширенными монтажными возможностями. Ключевые особенности:",
  "Счётчик RABO разработан для коммерческого учёта природного газа и отличается устойчивостью к типовым возмущениям потока. Среди конструктивных и метрологических достоинств:"
] as const;

function variantIndex(key: string, modulo: number) {
  let hash = 0;
  for (const char of key) {
    hash = (hash + char.charCodeAt(0)) % modulo;
  }
  return hash;
}

export function buildRaboDetailedDescription(product: RaboProduct): ProductDescriptionBlock[] {
  const qmax = productSpecValue(product.extraSpecs, "Максимальный расход Qmax");
  const du = productSpecValue(product.extraSpecs, "Условный диаметр");
  const range = productSpecValue(product.extraSpecs, "Диапазон измерения");
  const introIndex = variantIndex(product.slug, FEATURE_INTROS.length);

  const assignmentParts = [
    `${product.model} предназначен для коммерческого и технологического учёта очищенного природного газа и других неагрессивных газовых сред.`
  ];

  if (qmax) {
    assignmentParts.push(`Максимальный расход — ${qmax}.`);
  }

  if (du) {
    assignmentParts.push(`Фланцевое присоединение — ${du}.`);
  }

  if (range) {
    assignmentParts.push(`Диапазон измерения — ${range}.`);
  }

  return [
    { type: "paragraph", text: assignmentParts.join(" ") },
    {
      type: "paragraph",
      text:
        `${product.model} допускается к установке на горизонтальных и вертикальных участках газопровода без обязательных прямых участков до и после прибора. Счётчик может работать при направлении потока слева направо или справа налево и совместим с электронными корректорами объёма газа.`
    },
    {
      type: "paragraph",
      text: FEATURE_INTROS[introIndex]!
    },
    {
      type: "list",
      items: [
        "Высокая точность измерения и низкий порог чувствительности по расходу.",
        "Пониженная по сравнению с RVG чувствительность к пневмоудару.",
        "Широкий диапазон измерения — до 1:250.",
        "Низкие потери давления на приборе.",
        "Возможность установки низко-, средне- и высокочастотных датчиков импульсов.",
        "Исполнения с улучшенными метрологическими характеристиками.",
        "Оптимизированное техническое обслуживание в эксплуатации."
      ]
    },
    {
      type: "paragraph",
      text: `Конструкция ${product.model} упрощает монтаж и обслуживание узла учёта, особенно при ограниченном пространстве на площадке. Для типоразмеров RVG и RABO совпадают монтажные габариты, за исключением исполнения G400.`
    },
    {
      type: "paragraph",
      text: `${product.model} соответствует требованиям ГОСТ Р 8.740–2023 к измерениям с помощью ротационных расходомеров и счётчиков и имеет сертификаты соответствия ТР ТС.`
    }
  ];
}
