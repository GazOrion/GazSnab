import type { ProductDescriptionBlock, ProductSpecRow } from "@/lib/product-content/smt-kompleks";
import { productSpecValue } from "@/lib/product-content/helpers/product-spec-value";

export type RotaryMeterProduct = {
  slug: string;
  model: string;
  typoraзmer: string;
  extraSpecs: ProductSpecRow[];
};

const OPERATION_PARAGRAPHS = [
  "Работа счётчика построена на объёмном принципе: синхронно вращающиеся роторы отделяют поток газа на порции постоянного объёма. Размер порции определяется геометрией измерительной камеры между корпусом и рабочими поверхностями роторов.",
  "Измерение выполняется методом дискретного вытеснения. Каждый цикл роторной пары переносит через прибор фиксированный объём газа от входного фланца к выходному, что обеспечивает прямую связь числа оборотов с пройденным объёмом.",
  "Принцип действия ротационного счётчика — последовательное заполнение и опорожнение рабочих полостей. Два ротора, вращаясь согласованно, делят поток на одинаковые порции, объём которых задаётся конструкцией корпуса.",
  "Внутри корпуса газ проходит через чередующиеся рабочие камеры, формируемые парой роторов. Каждое полное вращение роторной системы соответствует строго определённому объёму, прошедшему через счётчик."
] as const;

const TRANSMISSION_PARAGRAPHS = [
  "Вращение роторов через редуктор и магнитную муфту передаётся на восьмиразрядный отсчётный механизм, который суммирует количество пройденных порций и отображает накопленный объём газа.",
  "Кинематическая связь роторов со счётной головой реализована через редукторный узел и магнитную муфту. Восьмиразрядный механизм фиксирует число циклов вытеснения и преобразует его в показание суммарного объёма.",
  "Отсчётный механизм получает импульс от роторной пары через редуктор и магнитную муфту. По числу полных циклов заполнения камер определяется суммарный объём газа, прошедшего через прибор.",
  "Счётная головка отслеживает вращение роторов посредством редуктора и магнитной муфты. Каждый зафиксированный цикл соответствует перемещению через счётчик порции газа постоянного объёма."
] as const;

function variantIndex(key: string, modulo: number) {
  let hash = 0;
  for (const char of key) {
    hash = (hash + char.charCodeAt(0)) % modulo;
  }
  return hash;
}

function buildAssignmentParagraph(product: RotaryMeterProduct): string {
  const qmax = productSpecValue(product.extraSpecs, "Максимальный расход Qmax");
  const du = productSpecValue(product.extraSpecs, "Условный диаметр");
  const range = productSpecValue(product.extraSpecs, "Диапазон измерения");
  const model = product.model;

  if (product.typoraзmer === "G10") {
    return `${model} предназначен для измерения объёма природного газа и других неагрессивных газовых сред на объектах с относительно небольшим расходом. Прибор допускает фланцевое присоединение к трубопроводам DN32, DN40 и DN50 и используется в составе промышленных и коммунальных узлов учёта.`;
  }

  const parts = [
    `${model} предназначен для коммерческого и технологического учёта природного газа, а также других очищенных неагрессивных газовых сред на промышленных объектах.`
  ];

  if (qmax) {
    parts.push(`Максимальный расход прибора — ${qmax}.`);
  }

  if (du) {
    parts.push(`Устанавливается на трубопровод ${du}.`);
  }

  if (range) {
    parts.push(`Диапазон измерения — ${range}.`);
  }

  return parts.join(" ");
}

function buildApplicationParagraph(product: RotaryMeterProduct): string {
  const t = product.typoraзmer;

  if (["G10", "G16", "G25", "G40"].includes(t)) {
    return `Счётчик ${product.model} применяют на котельных и производственных площадках с умеренным потреблением газа, в том числе перед горелочным оборудованием и в технологических линиях с пониженным давлением. Прибор допускается к работе с природным газом переменного состава, а также с воздухом, азотом и иными средами без агрессивных примесей.`;
  }

  if (["G65", "G100", "G160"].includes(t)) {
    return `Модель ${product.model} используют на объектах нефтегазовой, химической и энергетической отрасли, где требуется стабильный учёт повышенных расходов газа. Счётчик допускается к эксплуатации на опасных производственных объектах и может работать в системах с импульсными изменениями нагрузки.`;
  }

  return `Счётчик ${product.model} рассчитан на магистральные и крупные промышленные узлы учёта с высоким максимальным расходом. Прибор применяют для коммерческого учёта природного газа на объектах энергоснабжения, газораспределительных станциях и крупных производственных площадках.`;
}

function buildLowPressureParagraph(product: RotaryMeterProduct): string {
  const qmax = productSpecValue(product.extraSpecs, "Максимальный расход Qmax");

  if (qmax) {
    return `Благодаря низким потерям давления и малой инерционности ${product.model} (до ${qmax}) эффективно работает в газопроводах низкого давления, в том числе перед горелочными устройствами и в технологических процессах с переменным расходом.`;
  }

  return `Благодаря низким потерям давления и малой инерционности ${product.model} эффективно работает в газопроводах низкого давления, в том числе перед горелочными устройствами и в технологических процессах с переменным расходом.`;
}

function buildConstructionParagraph(product: RotaryMeterProduct): string {
  const variants = [
    `Конструкция ${product.model} включает корпус из анодированного алюминиевого сплава, пару роторов, переднюю и заднюю крышки, редукторный узел и счётный механизм. В корпусе предусмотрены технологические отверстия для контроля температуры, отбора давления и установки монтажной скобы.`,
    `${product.model} собран из корпуса, двух роторов, крышек, редукторного узла и счётной головы. Корпус оснащён штуцерами для контроля температуры и давления, а также местом для крепления монтажной скобы.`,
    `В состав ${product.model} входят корпус, роторная пара, редуктор, счётный механизм и крышки. На корпусе выполнены отверстия для установки гильз температуры, отбора давления и монтажного крепления.`
  ];

  return variants[variantIndex(product.slug, variants.length)]!;
}

function buildExecutionParagraph(product: RotaryMeterProduct): string {
  const compactTypes = new Set(["G16", "G25", "G100"]);

  if (compactTypes.has(product.typoraзmer)) {
    return `${product.model} может поставляться в стандартном исполнении «Б» или компактном «К» в зависимости от требований к габаритам узла учёта. Также доступны метрологические исполнения «О», «У», «2У» и другие специальные модификации по согласованию при заказе. Монтаж допускается на горизонтальных и вертикальных участках трубопровода.`;
  }

  return `${product.model} выпускается в базовом метрологическом исполнении «О», а также в специальных исполнениях «У», «2У», «3С», «3У» и других по согласованию. Прибор рассчитан на однонаправленный или двунаправленный поток газа и монтируется на горизонтальных или вертикальных участках трубопровода без обязательных прямых участков до и после счётчика.`;
}

function buildImpulseParagraph(product: RotaryMeterProduct): string {
  return `Передача данных о рабочем объёме с ${product.model} на электронный корректор выполняется штатным низкочастотным импульсным выходом. Для задач с высокой точностью мгновенного расхода по отдельному заказу доступен высокочастотный датчик А1К исполнения «Б».`;
}

function buildAdvantagesHeading(product: RotaryMeterProduct): string {
  return `Конструктивные и эксплуатационные особенности ${product.model}`;
}

function buildModelTable(product: RotaryMeterProduct): ProductDescriptionBlock[] {
  const qmax = productSpecValue(product.extraSpecs, "Максимальный расход Qmax");
  const du = productSpecValue(product.extraSpecs, "Условный диаметр");
  const range = productSpecValue(product.extraSpecs, "Диапазон измерения");

  const rows: string[][] = [[product.typoraзmer, [qmax, du].filter(Boolean).join("; ") || "см. характеристики"]];
  if (range) {
    rows[0]!.push(range);
  }

  return [
    {
      type: "heading",
      text: `Параметры ${product.model}`,
      level: 4
    },
    {
      type: "data-table",
      table: {
        columns: range
          ? ["Типоразмер", "Расход и присоединение", "Диапазон измерения"]
          : ["Типоразмер", "Расход и присоединение"],
        rows
      }
    }
  ];
}

export function buildRotaryMeterDetailedDescription(product: RotaryMeterProduct): ProductDescriptionBlock[] {
  const opIndex = variantIndex(product.slug, OPERATION_PARAGRAPHS.length);

  return [
    { type: "paragraph", text: buildAssignmentParagraph(product) },
    { type: "paragraph", text: buildApplicationParagraph(product) },
    {
      type: "heading",
      text: buildAdvantagesHeading(product),
      level: 4
    },
    {
      type: "list",
      items: [
        "Диапазон измерения серии — до 1:250.",
        "Обслуживание после монтажа сводится к замене масла не реже одного раза в 5 лет.",
        "Корпус измерителя выполнен из анодированного высокопрочного алюминия.",
        "Счётная голова из полимера, стабилизированного к ультрафиолету, поворачивается на 355°.",
        "Прямые участки трубопровода до и после прибора не требуются.",
        "Допускается горизонтальная и вертикальная установка.",
        "По заказу возможна комплектация высокочастотным датчиком А1К исп. «Б» для точного измерения мгновенного расхода."
      ]
    },
    { type: "paragraph", text: buildLowPressureParagraph(product) },
    { type: "paragraph", text: OPERATION_PARAGRAPHS[opIndex]! },
    { type: "paragraph", text: TRANSMISSION_PARAGRAPHS[opIndex]! },
    { type: "paragraph", text: buildConstructionParagraph(product) },
    { type: "paragraph", text: buildExecutionParagraph(product) },
    { type: "paragraph", text: buildImpulseParagraph(product) },
    ...buildModelTable(product)
  ];
}
