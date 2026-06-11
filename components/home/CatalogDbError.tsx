import Link from "next/link";
import { CATALOG_ROUTES } from "@/lib/catalog";

export function CatalogDbError() {
  return (
    <section className="store-catalog store-catalog-error">
      <div className="container">
        <div className="store-catalog-error-box">
          <h2>Каталог временно недоступен</h2>
          <p className="muted">
            Не удалось подключиться к базе данных. Проверьте, что PostgreSQL запущен, и обновите
            страницу.
          </p>
          <div className="store-catalog-error-actions">
            <Link className="button yellow" href="/">
              На главную
            </Link>
            <Link className="button secondary" href={CATALOG_ROUTES.equipment}>
              К каталогу
            </Link>
            <Link className="button secondary" href={CATALOG_ROUTES.services}>
              К услугам
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
