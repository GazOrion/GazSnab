import type { ProductDescriptionBlock, ProductRichContent } from "@/lib/product-content";

export type ProductDescriptionContext = {
  title: string;
  slug: string;
  description?: string | null;
  specs: Record<string, string>;
};

const SPEC_KEYS_FOR_INTRO = [
  "Типоразмер",
  "Модель",
  "Длина",
  "Условный диаметр",
  "Совместимость",
  "Максимальный расход Qmax",
  "Номинальный расход",
  "Диапазон рабочих расходов",
  "Исполнение"
] as const;

function specValue(specs: Record<string, string>, key: string) {
  const value = specs[key]?.trim();
  return value || null;
}

function descriptionMentionsSpecs(description: string, specs: Record<string, string>) {
  const normalized = description.toLowerCase();

  for (const key of SPEC_KEYS_FOR_INTRO) {
    const value = specValue(specs, key);
    if (!value) continue;

    if (normalized.includes(value.toLowerCase())) {
      return true;
    }
  }

  return false;
}

export function hasDistinguishingSpecs(specs: Record<string, string>) {
  return SPEC_KEYS_FOR_INTRO.some((key) => Boolean(specValue(specs, key)));
}

export function buildProductUniqueIntro(context: ProductDescriptionContext): string {
  const detailParts: string[] = [];

  for (const key of SPEC_KEYS_FOR_INTRO) {
    const value = specValue(context.specs, key);
    if (!value) continue;

    const label = key === "Максимальный расход Qmax" ? "максимальный расход" : key.toLowerCase();
    detailParts.push(`${label} — ${value}`);
  }

  if (detailParts.length > 0) {
    return `${context.title}: ${detailParts.join("; ")}.`;
  }

  const shortDescription = context.description?.trim();
  if (shortDescription && descriptionMentionsSpecs(shortDescription, context.specs)) {
    return shortDescription;
  }

  return `${context.title}: техническое описание, характеристики и условия поставки.`;
}

export function buildProductSeoDescription(context: ProductDescriptionContext): string {
  const intro = buildProductUniqueIntro(context);
  const shortDescription = context.description?.trim();

  if (!shortDescription) {
    return intro;
  }

  if (hasDistinguishingSpecs(context.specs) && !descriptionMentionsSpecs(shortDescription, context.specs)) {
    return intro;
  }

  return shortDescription;
}

function firstParagraphText(blocks: ProductDescriptionBlock[]): string | null {
  for (const block of blocks) {
    if (block.type === "paragraph") {
      return block.text;
    }
  }

  return null;
}

function descriptionAlreadyUnique(blocks: ProductDescriptionBlock[], context: ProductDescriptionContext) {
  const firstParagraph = firstParagraphText(blocks);
  if (!firstParagraph) return false;

  if (firstParagraph.includes(context.title)) {
    return true;
  }

  return descriptionMentionsSpecs(firstParagraph, context.specs);
}

export function personalizeProductRichContent(
  richContent: ProductRichContent,
  context: ProductDescriptionContext
): ProductRichContent {
  if (descriptionAlreadyUnique(richContent.description, context)) {
    return richContent;
  }

  const intro = buildProductUniqueIntro(context);

  return {
    ...richContent,
    description: [{ type: "paragraph", text: intro }, ...richContent.description]
  };
}

export function personalizeProductDetails(
  details: string,
  context: ProductDescriptionContext
): string {
  const trimmed = details.trim();
  if (!trimmed) {
    return trimmed;
  }

  if (trimmed.includes(context.title) || descriptionMentionsSpecs(trimmed, context.specs)) {
    return trimmed;
  }

  return `${buildProductUniqueIntro(context)}\n\n${trimmed}`;
}
