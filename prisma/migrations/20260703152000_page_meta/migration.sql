CREATE TABLE "PageMeta" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PageMeta_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "PageMeta_path_key" ON "PageMeta"("path");

INSERT INTO "PageMeta" ("id", "path", "title", "description")
VALUES
  ('seo_home', '/', 'ОРИОН ГАЗСНАБ — газовое оборудование и металлообработка', 'Поставка газового оборудования, металлообработка и сервис для промышленных объектов в Ростовской области'),
  ('seo_about', '/o-kompanii', 'О компании | ГазСнаб', 'ОРИОН ГАЗСНАБ — производство, поставка и сервис газового оборудования'),
  ('seo_equipment', '/oborudovanie', 'Каталог оборудования | ОРИОН ГАЗСНАБ', 'Готовое газовое оборудование — ГРПШ, узлы учёта, счётчики, арматура'),
  ('seo_services', '/uslugi', 'Услуги | ОРИОН ГАЗСНАБ', 'Металлообработка, проектирование и сервисное обслуживание для промышленных объектов'),
  ('seo_delivery', '/dostavka', 'Доставка и оплата | ГазСнаб', 'Условия доставки газового оборудования и способы оплаты'),
  ('seo_warranty', '/garantii', 'Гарантии и возврат | ГазСнаб', 'Гарантийные обязательства и условия возврата поставляемого оборудования'),
  ('seo_custom', '/pod-obekt', 'Под объект | ГазСнаб', 'Комплектация газового оборудования под условия объекта'),
  ('seo_privacy', '/politika-konfidencialnosti', 'Политика конфиденциальности | ОРИОН ГАЗСНАБ', 'Политика обработки персональных данных ОРИОН ГАЗСНАБ'),
  ('seo_cart', '/cart', 'Корзина | ГазСнаб', 'Оформление заявки на газовое оборудование и услуги')
ON CONFLICT ("path") DO NOTHING;
