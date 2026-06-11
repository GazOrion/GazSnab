import Link from "next/link";
import type { ProductLineCatalog } from "@/lib/product-lines/types";
import { formatPrice } from "@/lib/format";

type Props = {
  catalog: ProductLineCatalog;
  /** На странице категории — ссылка на карточку линейки */
  productHref?: string;
  showTitle?: boolean;
};

function formatVariantPrice(price: number | null | undefined) {
  if (price == null || price <= 0) {
    return "по запросу";
  }
  return formatPrice(price);
}

export function ProductLineVariantMatrix({ catalog, productHref, showTitle = true }: Props) {
  const totalVariants = catalog.series.reduce((sum, series) => sum + series.variants.length, 0);

  return (
    <section className="product-line-matrix" aria-labelledby="product-line-matrix-heading">
      {showTitle ? (
        <header className="product-line-matrix__head">
          <div>
            <h2 id="product-line-matrix-heading" className="product-line-matrix__title">
              {catalog.title}
            </h2>
            <p className="product-line-matrix__lead">{catalog.lead}</p>
          </div>
          {productHref ? (
            <Link className="product-line-matrix__more" href={productHref}>
              Карточка линейки
            </Link>
          ) : null}
        </header>
      ) : null}

      <ul className="product-line-matrix__series-list">
        {catalog.series.map((series) => (
          <li key={series.id} className="product-line-matrix__series">
            <div className="product-line-matrix__series-head">
              <div>
                <h3 className="product-line-matrix__series-title">
                  {series.title}
                  <span className="product-line-matrix__series-article">Арт. {series.article}</span>
                </h3>
                {series.pressureNote ? (
                  <p className="product-line-matrix__series-meta">{series.pressureNote}</p>
                ) : null}
                {series.description ? (
                  <p className="product-line-matrix__series-desc">{series.description}</p>
                ) : null}
              </div>
              <span className="product-line-matrix__series-count">
                {series.variants.length} {series.variants.length === 1 ? "позиция" : "позиции"}
              </span>
            </div>

            <div className="product-line-matrix__table-wrap">
              <table className="product-line-matrix__table">
                <thead>
                  <tr>
                    <th scope="col">Ду, мм</th>
                    <th scope="col">Модель</th>
                    <th scope="col">Давление</th>
                    <th scope="col">Цена</th>
                  </tr>
                </thead>
                <tbody>
                  {series.variants.map((variant) => {
                    const rowKey = `${series.id}-${variant.du}-${variant.model ?? ""}-${variant.pressure}`;
                    return (
                      <tr key={rowKey}>
                        <td data-label="Ду">{variant.du}</td>
                        <td data-label="Модель">{variant.model ?? series.title}</td>
                        <td data-label="Давление">{variant.pressure}</td>
                        <td data-label="Цена" className="product-line-matrix__price">
                          {formatVariantPrice(variant.price)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </li>
        ))}
      </ul>

      <footer className="product-line-matrix__foot">
        <p>
          {catalog.orderHint ?? "Укажите нужный типоразмер при оформлении заявки."}
        </p>
        <p className="product-line-matrix__summary muted">
          Всего {totalVariants} типоразмеров в {catalog.series.length} сериях
        </p>
      </footer>
    </section>
  );
}
