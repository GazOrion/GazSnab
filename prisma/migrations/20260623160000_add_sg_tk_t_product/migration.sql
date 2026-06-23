UPDATE "Product"
SET
  "imageUrl" = '/media/products/sg-tk/sg-tk-04.webp',
  "gallery" = ARRAY[
    '/media/products/sg-tk/sg-tk-04.webp',
    '/media/products/sg-tk/sg-tk-01.webp',
    '/media/products/sg-tk/sg-tk-02.webp',
    '/media/products/sg-tk/sg-tk-03.webp'
  ]::text[],
  "inStock" = true,
  "featured" = true
WHERE slug = 'kompleksy-sg-tk-t';

INSERT INTO "Product" (
  "id",
  "title",
  "slug",
  "kind",
  "category",
  "description",
  "details",
  "specs",
  "leadTime",
  "price",
  "unit",
  "imageUrl",
  "gallery",
  "inStock",
  "featured",
  "createdAt",
  "updatedAt"
)
SELECT
  'cm' || substr(md5(random()::text || clock_timestamp()::text), 1, 23),
  'СГ-ТК-Т (на базе турбинных счетчиков газа)',
  'kompleksy-sg-tk-t',
  'Товар',
  'Счётчики газа',
  'Комплексы СГ-ТК-Т на базе турбинных счетчиков газа с электронной коррекцией показаний по температуре.',
  'Комплексы СГ-ТК, модификации СГ-ТК-Т (на базе турбинных счетчиков газа), СГ-ТК-Р (на базе ротационных счетчиков газа) и СГ-ТК-Д (на базе диафрагменных счетчиков газа), предназначены для измерения объема природного газа по ГОСТ 5542 и других неагрессивных, сухих и очищенных, одно- и многокомпонентных газов в единицах приведенного к стандартным условиям объема (количества) посредством автоматической электронной коррекции показаний турбинных, ротационных, диафрагменных счетчиков газа по температуре и при фиксированных значениях давления и коэффициента сжимаемости газа.',
  '{"Серия":"СГ-ТК","Подкатегория":"СГ-ТК-Т (на базе турбинных счетчиков газа)","Производитель":"РАСКО","Назначение":"Промышленные","Модель":"СГ-ТК-Т"}'::jsonb,
  'по наличию, уточняется в заявке',
  0,
  'шт.',
  '/media/products/sg-tk/sg-tk-04.webp',
  ARRAY[
    '/media/products/sg-tk/sg-tk-04.webp',
    '/media/products/sg-tk/sg-tk-01.webp',
    '/media/products/sg-tk/sg-tk-02.webp',
    '/media/products/sg-tk/sg-tk-03.webp'
  ]::text[],
  true,
  true,
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM "Product" WHERE slug = 'kompleksy-sg-tk-t'
);
