/**
 * Переносит узлы учёта газа (включая ГРПШ) в категорию «Узлы учета газа»
 * и обновляет пути к фото в `public/media/products/gas-metering-units/`.
 * Запуск: node scripts/migrate-gas-metering-category.mjs
 */
import { PrismaClient } from "@prisma/client";

const TARGET_CATEGORY = "Узлы учета газа";
const SOURCE_CATEGORIES = ["Узлы учета", "Газорегуляторные пункты"];
const MEDIA_BASE = "/media/products/gas-metering-units";

const IMAGE_BY_SLUG = {
  "uzel-ucheta-gaza": `${MEDIA_BASE}/uzel-ucheta-gaza.webp`,
  "grp-sh-04-2u1": `${MEDIA_BASE}/grp-sh-04-2u1-Photoroom_csecollege.webp`,
  "grp-sh-32-2u1": `${MEDIA_BASE}/grp-sh-32-2u1-Photoroom_csecollege.webp`,
  "grp-sh-10ms-2u1": `${MEDIA_BASE}/grp-sh-10ms-2u1-Photoroom_csecollege.webp`
};

function isGasMeteringUnit(product) {
  const haystack = `${product.title} ${product.description} ${product.slug}`.toLowerCase();
  if (/сигнализ|загазован/i.test(haystack)) return false;
  if (/grp-sh|грпш/i.test(haystack)) return true;
  return /узел\s*учет|узл[аы]\s+учет|uzel-ucheta/i.test(haystack);
}

const prisma = new PrismaClient();

try {
  const candidates = await prisma.product.findMany({
    where: {
      kind: "Товар",
      category: { in: SOURCE_CATEGORIES }
    }
  });

  const toMove = candidates.filter(isGasMeteringUnit);
  if (!toMove.length) {
    console.log("Нет товаров для переноса.");
  } else {
    for (const product of toMove) {
      const imageUrl = IMAGE_BY_SLUG[product.slug] ?? product.imageUrl;
      await prisma.product.update({
        where: { id: product.id },
        data: {
          category: TARGET_CATEGORY,
          imageUrl,
          gallery: [imageUrl]
        }
      });
      console.log(" -", product.title, "→", TARGET_CATEGORY);
    }
    console.log(`Обновлено позиций: ${toMove.length}`);
  }

  const inCategory = await prisma.product.findMany({
    where: { category: TARGET_CATEGORY, kind: "Товар" }
  });
  for (const product of inCategory) {
    const imageUrl = IMAGE_BY_SLUG[product.slug];
    if (!imageUrl) continue;
    if (product.imageUrl === imageUrl) continue;
    await prisma.product.update({
      where: { id: product.id },
      data: { imageUrl, gallery: [imageUrl] }
    });
    console.log("media:", product.slug, "→", imageUrl);
  }
} finally {
  await prisma.$disconnect();
}
