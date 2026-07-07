import type { ProductDescriptionBlock } from "@/lib/product-content/smt-kompleks";

const SPECS_HEADING_MARKERS = [
  "характеристик",
  "типоразмер",
  "габарит",
  "присоединительн"
] as const;

function isSpecsDescriptionBlock(block: ProductDescriptionBlock): boolean {
  if (block.type === "data-table") return true;

  if (block.type === "heading") {
    const text = block.text.toLowerCase();
    if (text.includes("принцип работы")) return false;
    return SPECS_HEADING_MARKERS.some((marker) => text.includes(marker));
  }

  return false;
}

export function splitProductDescriptionBlocks(blocks: ProductDescriptionBlock[]) {
  const splitIndex = blocks.findIndex(isSpecsDescriptionBlock);
  if (splitIndex === -1) {
    return { introBlocks: blocks, specsBlocks: [] as ProductDescriptionBlock[] };
  }

  return {
    introBlocks: blocks.slice(0, splitIndex),
    specsBlocks: blocks.slice(splitIndex)
  };
}

export function hasSpecsDescriptionBlocks(blocks: ProductDescriptionBlock[] | undefined) {
  if (!blocks?.length) return false;
  return splitProductDescriptionBlocks(blocks).specsBlocks.length > 0;
}
