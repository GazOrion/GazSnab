import type { ProductDescriptionBlock, ProductSpecRow } from "@/lib/product-content/smt-kompleks";
import { productSpecValue } from "@/lib/product-content/helpers/product-spec-value";

export type TurbineMeterProduct = {
  slug: string;
  model: string;
  typoraзmer: string;
  extraSpecs: ProductSpecRow[];
};

const PRINCIPLE_VARIANTS = [
  "Турбинный счётчик относится к скоростным приборам: поток газа приводит во вращение алюминиевое колесо турбины. Число оборотов пропорционально прошедшему объёму, а частота вращения — фактическому расходу. Передача движения на счётный механизм выполняется через магнитную муфту и редуктор.",
  "Принцип измерения основан на зависимости частоты вращения турбинного колеса от скорости потока. Алюминиевое рабочее колесо вращается под действием газа, а через магнитную муфту и редуктор импульс передаётся на счётный механизм, фиксирующий накопленный объём.",
  "В приборе скоростного типа измеряемый газ вращает турбинное колесо из алюминиевого сплава. Количество оборотов соответствует объёму, прошедшему через счётчик, а скорость вращения отражает текущий расход. Счётная часть связана с турбиной магнитной муфтой и редуктором."
] as const;

function variantIndex(key: string, modulo: number) {
  let hash = 0;
  for (const char of key) {
    hash = (hash + char.charCodeAt(0)) % modulo;
  }
  return hash;
}

function isPn10(product: TurbineMeterProduct) {
  return product.typoraзmer.includes("/10") || product.slug.includes("-10-dn");
}

export function buildTurbineMeterDetailedDescription(
  product: TurbineMeterProduct
): ProductDescriptionBlock[] {
  const qmax = productSpecValue(product.extraSpecs, "Максимальный расход Qmax");
  const du = productSpecValue(product.extraSpecs, "Условный диаметр");
  const pressure = isPn10(product) ? "PN10" : "PN16";
  const principle = PRINCIPLE_VARIANTS[variantIndex(product.slug, PRINCIPLE_VARIANTS.length)]!;

  const assignment = [
    `${product.model} предназначен для коммерческого или технологического учёта объёма очищенного природного газа, а также воздуха, азота и других неагрессивных газов.`,
    qmax ? `Максимальный расход — ${qmax}.` : "",
    du ? `Условный диаметр патрубков — ${du}.` : "",
    `Рабочее давление — ${pressure}.`
  ]
    .filter(Boolean)
    .join(" ");

  return [
    { type: "paragraph", text: assignment },
    {
      type: "paragraph",
      text:
        `${product.model} применяют на промышленных площадках, магистральных газопроводах и объектах энергоснабжения, в том числе на опасных производственных объектах нефтегазовой, химической и газовой отрасли.`
    },
    { type: "paragraph", text: principle },
    {
      type: "paragraph",
      text:
        "Низко-, средне- и высокочастотные датчики импульсов передают данные о расходе на электронные корректоры для пересчёта к стандартным условиям. В низкочастотном датчике предусмотрен контрольный геркон для фиксации внешнего магнитного поля."
    },
    {
      type: "heading",
      text: `Особенности ${product.model}`,
      level: 4
    },
    {
      type: "list",
      items: [
        "Счётный механизм из полимера, устойчивого к ультрафиолету, с поворотом до 355°.",
        "Компактный монтаж возможен при прямых участках не менее 2DN перед счётчиком.",
        "Допускается горизонтальная и вертикальная установка.",
        "Доступны исполнения счётного механизма T1, C1 и C1B.",
        "Импульсные выходы НЧ, СЧ и ВЧ для подключения корректоров и систем телеметрии."
      ]
    },
    {
      type: "paragraph",
      text:
        "Сигналы средне- и высокочастотных датчиков позволяют точнее определять мгновенный расход газа. Высокочастотный датчик может использоваться на счётчиках, установленных вне взрывоопасной зоны."
    }
  ];
}
