-- Дубликат карточки аксессуаров (турбинная копия) → одна страница aksessuary-schetchikov-gaza-rotary.

DELETE FROM "OrderItem"
WHERE "productId" IN (
  SELECT "id" FROM "Product" WHERE "slug" = 'aksessuary-schetchikov-gaza-turbine'
);

DELETE FROM "Product" WHERE "slug" = 'aksessuary-schetchikov-gaza-turbine';

DELETE FROM "PageMeta" WHERE "path" = '/products/aksessuary-schetchikov-gaza-turbine';
