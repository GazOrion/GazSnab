-- Move impulse sensors from «Дополнительное оборудование» to «Датчики».

UPDATE "Product"
SET
  "category" = 'Датчики',
  "specs" = "specs" - 'Подкатегория'
WHERE "category" = 'Дополнительное оборудование'
  AND "specs"->>'Подкатегория' = 'Датчики';

UPDATE "Product" product
SET "categoryId" = category."id"
FROM "CatalogCategory" category
WHERE category."kind" = product."kind"
  AND category."name" = 'Датчики'
  AND product."category" = 'Датчики';
