-- Catalog sections managed from the admin panel.
CREATE TABLE "CatalogCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "kind" TEXT NOT NULL DEFAULT 'Товар',
    "title" TEXT NOT NULL,
    "teaser" TEXT NOT NULL DEFAULT '',
    "imageUrl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CatalogCategory_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ProductMedia" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT NOT NULL DEFAULT '',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductMedia_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Product" ADD COLUMN "categoryId" TEXT;

CREATE UNIQUE INDEX "CatalogCategory_kind_slug_key" ON "CatalogCategory"("kind", "slug");
CREATE UNIQUE INDEX "CatalogCategory_kind_name_key" ON "CatalogCategory"("kind", "name");
CREATE INDEX "CatalogCategory_kind_sortOrder_idx" ON "CatalogCategory"("kind", "sortOrder");
CREATE INDEX "ProductMedia_productId_sortOrder_idx" ON "ProductMedia"("productId", "sortOrder");
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");
CREATE INDEX "Product_kind_category_idx" ON "Product"("kind", "category");
CREATE INDEX "Product_featured_idx" ON "Product"("featured");

ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CatalogCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ProductMedia" ADD CONSTRAINT "ProductMedia_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Backfill categories from current products.
INSERT INTO "CatalogCategory" ("id", "name", "slug", "kind", "title", "sortOrder")
SELECT
  'cat_' || md5(grouped."kind" || ':' || grouped."category"),
  grouped."category",
  regexp_replace(
    lower(
      translate(
        grouped."category",
        'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя ',
        'abvgdeezij klmnoprstufhccss_y_euaabvgdeezij klmnoprstufhccss_y_eua-'
      )
    ),
    '[^a-z0-9-]+',
    '-',
    'g'
  ),
  grouped."kind",
  grouped."category",
  row_number() OVER (PARTITION BY grouped."kind" ORDER BY grouped."category")
FROM (
  SELECT "kind", "category"
  FROM "Product"
  WHERE "category" IS NOT NULL AND length(trim("category")) > 0
  GROUP BY "kind", "category"
) grouped
ON CONFLICT ("kind", "name") DO NOTHING;

UPDATE "Product" product
SET "categoryId" = category."id"
FROM "CatalogCategory" category
WHERE category."kind" = product."kind" AND category."name" = product."category";

INSERT INTO "ProductMedia" ("id", "productId", "url", "alt", "sortOrder")
SELECT 'media_' || md5("id" || ':' || "imageUrl"), "id", "imageUrl", "title", 0
FROM "Product"
WHERE "imageUrl" IS NOT NULL AND length(trim("imageUrl")) > 0;
