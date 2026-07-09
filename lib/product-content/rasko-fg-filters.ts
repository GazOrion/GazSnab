import type { ProductRichContent } from "@/lib/product-content/smt-kompleks";
import { buildRaskoFgDescriptionBlocks } from "@/lib/product-content/helpers/rasko-fg-description";

const MEDIA_BASE = "/media/products/rasko-fg-filters";

export const RASKO_FG_CARD_IMAGE = `${MEDIA_BASE}/fg-01.webp`;

export const RASKO_FG_GALLERY = [
  RASKO_FG_CARD_IMAGE,
  `${MEDIA_BASE}/fg-02.webp`,
  `${MEDIA_BASE}/fg-03.webp`
];

export const RASKO_FG_SHORT_DESCRIPTION =
  "Фильтры газа ФГ предназначены для очистки газа от примесей пыли, твёрдых частиц, ржавчины и устанавливаются перед запорно-регулировочной арматурой, измерительными приборами, газогорелочными устройствами котлов и другими газосжигающими устройствами. Качественная очистка газа повышает надёжность работы приборов, увеличивает межремонтное время эксплуатации из-за уменьшения износа. Правильный выбор фильтров позволяет обеспечивать безопасное и надёжное функционирование системы газоснабжения.";

type FgFilterRow = {
  slug: string;
  title: string;
  model: string;
  listingParams: string;
  diameter: string;
  filtration: "80 мкм" | "5 мкм";
  hasDpd: boolean;
  dpdNom?: string;
};

export const RASKO_FG_PRODUCTS: FgFilterRow[] = [
  {
    slug: "fg-16-50",
    title: "Фильтр газа ФГ16-50",
    model: "ФГ16-50",
    listingParams: "Ду=50 мм, δ=80 мкм",
    diameter: "50 мм",
    filtration: "80 мкм",
    hasDpd: false
  },
  {
    slug: "fg-16-50v",
    title: "Фильтр газа ФГ16-50В",
    model: "ФГ16-50В",
    listingParams: "Ду=50 мм, δ=5 мкм",
    diameter: "50 мм",
    filtration: "5 мкм",
    hasDpd: false
  },
  {
    slug: "fg-16-50-dpd",
    title: "Фильтр газа ФГ16-50-ДПД",
    model: "ФГ16-50-ДПД",
    listingParams: "Ду=50 мм, δ=80 мкм, индикатор перепада давления ΔPном=5 кПа",
    diameter: "50 мм",
    filtration: "80 мкм",
    hasDpd: true,
    dpdNom: "5 кПа"
  },
  {
    slug: "fg-16-50v-dpd",
    title: "Фильтр газа ФГ16-50В-ДПД",
    model: "ФГ16-50В-ДПД",
    listingParams: "Ду=50 мм, δ=5 мкм, индикатор перепада давления ΔPном=10 кПа",
    diameter: "50 мм",
    filtration: "5 мкм",
    hasDpd: true,
    dpdNom: "10 кПа"
  },
  {
    slug: "fg-16-80",
    title: "Фильтр газа ФГ16-80",
    model: "ФГ16-80",
    listingParams: "Ду=80 мм, δ=80 мкм",
    diameter: "80 мм",
    filtration: "80 мкм",
    hasDpd: false
  },
  {
    slug: "fg-16-80v",
    title: "Фильтр газа ФГ16-80В",
    model: "ФГ16-80В",
    listingParams: "Ду=80 мм, δ=5 мкм",
    diameter: "80 мм",
    filtration: "5 мкм",
    hasDpd: false
  },
  {
    slug: "fg-16-80-dpd",
    title: "Фильтр газа ФГ16-80-ДПД",
    model: "ФГ16-80-ДПД",
    listingParams: "Ду=80 мм, δ=80 мкм, индикатор перепада давления ΔPном=5 кПа",
    diameter: "80 мм",
    filtration: "80 мкм",
    hasDpd: true,
    dpdNom: "5 кПа"
  },
  {
    slug: "fg-16-80v-dpd",
    title: "Фильтр газа ФГ16-80В-ДПД",
    model: "ФГ16-80В-ДПД",
    listingParams: "Ду=80 мм, δ=5 мкм, индикатор перепада давления ΔPном=10 кПа",
    diameter: "80 мм",
    filtration: "5 мкм",
    hasDpd: true,
    dpdNom: "10 кПа"
  },
  {
    slug: "fg-16-100",
    title: "Фильтр газа ФГ16-100",
    model: "ФГ16-100",
    listingParams: "Ду=100 мм, δ=80 мкм",
    diameter: "100 мм",
    filtration: "80 мкм",
    hasDpd: false
  },
  {
    slug: "fg-16-100v",
    title: "Фильтр газа ФГ16-100В",
    model: "ФГ16-100В",
    listingParams: "Ду=100 мм, δ=5 мкм",
    diameter: "100 мм",
    filtration: "5 мкм",
    hasDpd: false
  },
  {
    slug: "fg-16-100-dpd",
    title: "Фильтр газа ФГ16-100-ДПД",
    model: "ФГ16-100-ДПД",
    listingParams: "Ду=100 мм, δ=80 мкм, индикатор перепада давления ΔPном=5 кПа",
    diameter: "100 мм",
    filtration: "80 мкм",
    hasDpd: true,
    dpdNom: "5 кПа"
  },
  {
    slug: "fg-16-100v-dpd",
    title: "Фильтр газа ФГ16-100В-ДПД",
    model: "ФГ16-100В-ДПД",
    listingParams: "Ду=100 мм, δ=5 мкм, индикатор перепада давления ΔPном=10 кПа",
    diameter: "100 мм",
    filtration: "5 мкм",
    hasDpd: true,
    dpdNom: "10 кПа"
  }
];

function buildFgProductSpecs(row: FgFilterRow): Record<string, string> {
  const specs: Record<string, string> = {
    Производитель: "РАСКО",
    Серия: "ФГ",
    Модель: row.model,
    "Тип фильтра": "Газовый",
    Диаметр: row.diameter,
    "Степень очистки": row.filtration,
    "Индикатор перепада давления": row.hasDpd ? "ДПД16" : "нет",
    Давление: "до 1,6 МПа",
    Монтаж: "фланцевый"
  };

  if (row.dpdNom) {
    specs["ΔPном индикатора"] = row.dpdNom;
  }

  return specs;
}

function buildFgFiltrationDetail(row: FgFilterRow) {
  if (row.filtration === "5 мкм") {
    return "не менее 99,5% частиц размером более 0,005 мм (5 мкм)";
  }

  return "не менее 99,5% частиц размером более 0,08 мм (80 мкм)";
}

function buildFgProductSpecsTable(row: FgFilterRow) {
  return [
    { characteristic: "Производитель", value: "РАСКО" },
    { characteristic: "Модель", value: row.model },
    { characteristic: "Диаметр условного прохода", value: row.diameter },
    { characteristic: "Степень фильтрации", value: buildFgFiltrationDetail(row) },
    { characteristic: "Максимальное рабочее давление", value: "1,6 МПа (16 кг/см²)" },
    {
      characteristic: "Диапазон температуры рабочей и окружающей среды",
      value: "от −40 до +70 °С"
    },
    {
      characteristic: "Индикатор перепада давления",
      value: row.hasDpd ? `ДПД16, ΔPном=${row.dpdNom ?? "—"}` : "без индикатора"
    },
    { characteristic: "Монтаж", value: "фланцевый" }
  ];
}

export function buildFgListingDescription(row: FgFilterRow) {
  return `${row.title}, ${row.listingParams}. Производитель РАСКО.`;
}

export function buildFgSeedSpecs(row: FgFilterRow) {
  return buildFgProductSpecs(row);
}

function buildFgContent(row: FgFilterRow): ProductRichContent {
  return {
    descriptionTitle: "Подробное описание",
    description: buildRaskoFgDescriptionBlocks(row),
    specsTitle: "Технические характеристики",
    specs: buildFgProductSpecsTable(row)
  };
}

export const RASKO_FG_CONTENT_BY_SLUG = Object.fromEntries(
  RASKO_FG_PRODUCTS.map((row) => [row.slug, buildFgContent(row)])
) as Record<string, ProductRichContent>;
