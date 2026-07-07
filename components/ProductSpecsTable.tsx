import type { ProductSpecRow } from "@/lib/product-content";
import { ProductMobileExpandable } from "@/components/ProductMobileExpandable";

function SpecCellValue({ value }: { value: string }) {
  const lines = value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length > 1) {
    return (
      <div className="product-spec-table__multiline">
        {lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
    );
  }

  return <span className="product-spec-table__value">{value}</span>;
}

export function ProductSpecsTable({ rows }: { rows: ProductSpecRow[] }) {
  return (
    <ProductMobileExpandable mode="rows">
      <div className="product-spec-table-wrap">
        <table className="product-spec-table">
          <thead>
            <tr>
              <th scope="col">Характеристика</th>
              <th scope="col" className="product-spec-table__col-value">
                Значение
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.characteristic}>
                <th scope="row">{row.characteristic}</th>
                <td>
                  <SpecCellValue value={row.value} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ProductMobileExpandable>
  );
}
