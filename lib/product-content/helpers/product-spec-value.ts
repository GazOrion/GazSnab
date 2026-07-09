import type { ProductSpecRow } from "@/lib/product-content/smt-kompleks";

export function productSpecValue(specs: ProductSpecRow[], characteristic: string) {
  return specs.find((row) => row.characteristic === characteristic)?.value;
}
