import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import { catalogVisibilityWhere } from "@/lib/catalog-data";
import { PRODUCT_KIND } from "@/lib/catalog";
import { buildYmlFeed } from "@/lib/yml-feed";

export const YML_FEED_CACHE_TAG = "yml-feed";

async function loadYmlFeed() {
  const products = await prisma.product.findMany({
    where: {
      ...catalogVisibilityWhere,
      kind: PRODUCT_KIND.GOODS
    },
    orderBy: [{ category: "asc" }, { title: "asc" }]
  });

  return buildYmlFeed(products);
}

export const getCachedYmlFeed = unstable_cache(loadYmlFeed, ["yml-feed-document"], {
  tags: [YML_FEED_CACHE_TAG]
});

/** Сбрасывает кэш YML после изменений каталога в админке. */
export function revalidateYmlFeed() {
  revalidateTag(YML_FEED_CACHE_TAG);
  revalidatePath("/feed.yml");
}
