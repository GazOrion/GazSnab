import { SG_EK_SLUG } from "@/lib/product-content/sg-ek-kompleks";
import { SG_TK_D_SLUG } from "@/lib/product-content/sg-tk-kompleks";
import { GAS_METER_ACCESSORIES_SLUG, GAS_METER_ACCESSORIES_TURBINE_SLUG } from "@/lib/product-content/gas-meter-accessories";

const SG_EK_RETIRED_SLUGS = [
  "sg-ek-r-25-1-6",
  "sg-ek-r-40-1-6",
  "sg-ek-r-65-1-6",
  "sg-ek-r-100-1-6",
  "sg-ek-r-160-1-6",
  "sg-ek-r-250-1-6",
  "sg-ek-r-400-1-6",
  "sg-ek-r-650-1-6",
  "sg-ek-r-1000-1-6",
  "sg-ek-r-1600-1-6"
] as const;

const SG_TK_D_RETIRED_SLUGS = [
  "sg-tk-d-2-5-6",
  "sg-tk-d-10",
  "sg-tk-d-16",
  "sg-tk-d-25",
  "sg-tk-d-40",
  "sg-tk-d-65",
  "sg-tk-d-100"
] as const;

export const PRODUCT_SLUG_REDIRECTS: Record<string, string> = Object.fromEntries([
  ...SG_EK_RETIRED_SLUGS.map((slug) => [slug, SG_EK_SLUG]),
  ...SG_TK_D_RETIRED_SLUGS.map((slug) => [slug, SG_TK_D_SLUG]),
  [GAS_METER_ACCESSORIES_TURBINE_SLUG, GAS_METER_ACCESSORIES_SLUG]
]);

export function getProductSlugRedirect(slug: string): string | null {
  return PRODUCT_SLUG_REDIRECTS[slug] ?? null;
}
