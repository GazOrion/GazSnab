-- Move BPEK cables from «Дополнительное оборудование» to «Кабели БПЭК».

INSERT INTO "CatalogCategory" ("id", "name", "slug", "kind", "title", "teaser", "sortOrder", "isVisible")
SELECT
  'cat_bpek_cables',
  'Кабели БПЭК',
  'kabeli-bpek',
  'Товар',
  'Кабели БПЭК',
  'Кабели для подключения модулей телеметрии БПЭК к корректорам и счётчикам газа',
  COALESCE((SELECT MAX("sortOrder") FROM "CatalogCategory" WHERE "kind" = 'Товар'), 0) + 1,
  true
WHERE NOT EXISTS (
  SELECT 1 FROM "CatalogCategory" WHERE "kind" = 'Товар' AND "name" = 'Кабели БПЭК'
);

UPDATE "Product"
SET
  "category" = 'Кабели БПЭК',
  "specs" = "specs" - 'Подкатегория'
WHERE "category" = 'Дополнительное оборудование'
  AND "specs"->>'Подкатегория' = 'Кабели';

UPDATE "CatalogCategory"
SET "teaser" = 'Антенны, элементы питания, комплектующие и аксессуары для приборов учёта'
WHERE "name" = 'Дополнительное оборудование' AND "kind" = 'Товар';

UPDATE "Product" product
SET "categoryId" = category."id"
FROM "CatalogCategory" category
WHERE category."kind" = product."kind"
  AND category."name" = product."category"
  AND product."category" IN ('Кабели БПЭК', 'Дополнительное оборудование');
