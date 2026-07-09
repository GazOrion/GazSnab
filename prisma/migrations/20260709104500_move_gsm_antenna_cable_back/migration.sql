-- GSM-кабель для антенны — доп. оборудование, не кабель БПЭК.

UPDATE "Product"
SET "category" = 'Дополнительное оборудование'
WHERE "slug" = 'gsm-antenna-cable-8m';

UPDATE "Product" product
SET "categoryId" = category."id"
FROM "CatalogCategory" category
WHERE category."kind" = product."kind"
  AND category."name" = 'Дополнительное оборудование'
  AND product."slug" = 'gsm-antenna-cable-8m';
