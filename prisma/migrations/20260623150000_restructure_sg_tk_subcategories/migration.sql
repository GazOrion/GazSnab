UPDATE "Product"
SET specs = jsonb_set(specs::jsonb, '{Подкатегория}', '"СГ-ТК-Д (на базе диафрагменных счетчиков газа)"')
WHERE slug = 'kompleksy-sg-tk-d';

UPDATE "Product"
SET specs = jsonb_set(specs::jsonb, '{Подкатегория}', '"СГ-ТК-Р (на базе ротационных счетчиков газа)"')
WHERE slug = 'kompleksy-sg-tk-r';

UPDATE "Product"
SET
  title = 'СГ-ТК-Д (на базе диафрагменных счетчиков газа)',
  description = 'Комплексы СГ-ТК-Д на базе диафрагменных счетчиков газа типа BK с температурными корректорами ТС215 и ТС220.'
WHERE slug = 'kompleksy-sg-tk-d';

UPDATE "Product"
SET
  title = 'СГ-ТК-Р (на базе ротационных счетчиков газа)',
  description = 'Комплексы СГ-ТК-Р на базе ротационных счетчиков газа с электронной коррекцией показаний по температуре.'
WHERE slug = 'kompleksy-sg-tk-r';
