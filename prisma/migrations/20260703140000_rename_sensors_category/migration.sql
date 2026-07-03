-- Rename «Газорегуляторные пункты» → «Датчики» and hide removed «Узлы учета» section.

UPDATE "Product"
SET "category" = 'Датчики'
WHERE "category" = 'Газорегуляторные пункты';

UPDATE "CatalogCategory"
SET
  "name" = 'Датчики',
  "title" = 'Датчики',
  "slug" = 'datchiki',
  "teaser" = 'Датчики давления, импульсные и другие приборы для систем учёта и контроля газа'
WHERE "name" = 'Газорегуляторные пункты' AND "kind" = 'Товар';

UPDATE "Product"
SET "inStock" = false
WHERE "category" = 'Узлы учета';

UPDATE "CatalogCategory"
SET "isVisible" = false
WHERE "name" = 'Узлы учета' AND "kind" = 'Товар';

UPDATE "Product" product
SET "categoryId" = category."id"
FROM "CatalogCategory" category
WHERE category."kind" = product."kind"
  AND category."name" = 'Датчики'
  AND product."category" = 'Датчики';
