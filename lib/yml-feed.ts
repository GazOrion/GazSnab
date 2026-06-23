import type { Product } from "@prisma/client";
import { company } from "@/lib/company";
import { CONSULTATION_PRODUCT_SLUG, PRODUCT_KIND } from "@/lib/catalog";
import { getProductLineCatalog, getProductLineMinPrice } from "@/lib/product-lines";
import { absoluteMediaUrl, absoluteUrl, getSiteUrl } from "@/lib/site-url";

const PRODUCT_KIND_GOODS = PRODUCT_KIND.GOODS;
const MAX_DESCRIPTION_LENGTH = 3000;
const MAX_SALES_NOTES_LENGTH = 50;

export type YmlFeedBuildResult = {
  xml: string;
  stats: {
    totalGoods: number;
    included: number;
    skippedNoPrice: number;
    skippedNoImage: number;
    skippedHidden: number;
  };
};

type OfferBuildResult =
  | { kind: "included"; xml: string }
  | { kind: "skipped"; reason: "no-price" | "no-image" };

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function normalizeSpecs(specs: Product["specs"]) {
  if (!specs || typeof specs !== "object" || Array.isArray(specs)) {
    return {} as Record<string, string>;
  }

  return Object.fromEntries(
    Object.entries(specs as Record<string, unknown>)
      .map(([key, value]) => [key.trim(), String(value).trim()])
      .filter(([key, value]) => key && value)
  );
}

function formatFeedDate(date: Date) {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function formatPrice(value: number) {
  return value.toFixed(2).replace(/\.00$/, "");
}

function trimDescription(text: string) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= MAX_DESCRIPTION_LENGTH) {
    return normalized;
  }
  return `${normalized.slice(0, MAX_DESCRIPTION_LENGTH - 1).trim()}…`;
}

function resolveOfferPrice(product: Product) {
  const directPrice = Number(product.price);
  if (Number.isFinite(directPrice) && directPrice > 0) {
    return { price: directPrice, onRequest: false };
  }

  const lineCatalog = getProductLineCatalog(product.slug);
  if (lineCatalog) {
    const minPrice = getProductLineMinPrice(lineCatalog);
    if (minPrice != null && minPrice > 0) {
      return { price: minPrice, onRequest: true };
    }
  }

  return null;
}

function buildCategoryMap(products: Product[]) {
  const categories = [...new Set(products.map((product) => product.category).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, "ru")
  );

  return new Map(categories.map((name, index) => [name, index + 1]));
}

function buildParamElements(specs: Record<string, string>) {
  const skipKeys = new Set(["Подкатегория"]);
  return Object.entries(specs)
    .filter(([key]) => !skipKeys.has(key))
    .map(([name, value]) => `        <param name="${escapeXml(name)}">${escapeXml(value)}</param>`)
    .join("\n");
}

function buildOffer(product: Product, categoryId: number): OfferBuildResult {
  const priceInfo = resolveOfferPrice(product);
  if (!priceInfo) {
    return { kind: "skipped", reason: "no-price" };
  }

  const pictures = [...new Set([product.imageUrl, ...product.gallery].filter(Boolean) as string[])]
    .map((url) => absoluteMediaUrl(url))
    .filter((url): url is string => Boolean(url));

  if (!pictures.length) {
    return { kind: "skipped", reason: "no-image" };
  }

  const specs = normalizeSpecs(product.specs);
  const vendor = specs["Производитель"];
  const vendorCode = specs["Модель"] || specs["Артикул"];
  const description = trimDescription(product.details || product.description);
  const salesNotes = priceInfo.onRequest ? "Цена по запросу" : "Безналичный расчёт";
  const paramsXml = buildParamElements(specs);

  const offerLines = [
    `      <offer id="${escapeXml(product.slug)}" available="${product.inStock ? "true" : "false"}">`,
    `        <url>${escapeXml(absoluteUrl(`/products/${product.slug}`))}</url>`,
    `        <price>${formatPrice(priceInfo.price)}</price>`,
    `        <currencyId>RUB</currencyId>`,
    `        <categoryId>${categoryId}</categoryId>`,
    ...pictures.map((picture) => `        <picture>${escapeXml(picture)}</picture>`),
    `        <name>${escapeXml(product.title)}</name>`,
    vendor ? `        <vendor>${escapeXml(vendor)}</vendor>` : "",
    vendorCode ? `        <vendorCode>${escapeXml(vendorCode)}</vendorCode>` : "",
    `        <description>${escapeXml(description)}</description>`,
    `        <sales_notes>${escapeXml(salesNotes.slice(0, MAX_SALES_NOTES_LENGTH))}</sales_notes>`,
    paramsXml,
    `      </offer>`
  ].filter(Boolean);

  return { kind: "included", xml: offerLines.join("\n") };
}

export function buildYmlFeed(products: Product[]): YmlFeedBuildResult {
  const visibleGoods = products.filter(
    (product) =>
      product.kind === PRODUCT_KIND_GOODS &&
      product.inStock &&
      product.slug !== CONSULTATION_PRODUCT_SLUG
  );

  const categoryMap = buildCategoryMap(visibleGoods);
  const categoriesXml = [...categoryMap.entries()]
    .map(([name, id]) => `      <category id="${id}">${escapeXml(name)}</category>`)
    .join("\n");

  const stats = {
    totalGoods: visibleGoods.length,
    included: 0,
    skippedNoPrice: 0,
    skippedNoImage: 0,
    skippedHidden: products.length - visibleGoods.length
  };

  const offersXml: string[] = [];

  for (const product of visibleGoods) {
    const categoryId = categoryMap.get(product.category);
    if (!categoryId) continue;

    const offer = buildOffer(product, categoryId);
    if (offer.kind === "included") {
      stats.included += 1;
      offersXml.push(offer.xml);
      continue;
    }

    if (offer.reason === "no-price") {
      stats.skippedNoPrice += 1;
    } else {
      stats.skippedNoImage += 1;
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<yml_catalog date="${formatFeedDate(new Date())}">
  <shop>
    <name>ОРИОНГАЗСНАБ</name>
    <company>${escapeXml(company.name)}</company>
    <url>${escapeXml(getSiteUrl())}</url>
    <currencies>
      <currency id="RUB" rate="1"/>
    </currencies>
    <categories>
${categoriesXml}
    </categories>
    <offers>
${offersXml.join("\n")}
    </offers>
  </shop>
</yml_catalog>
`;

  return { xml, stats };
}
