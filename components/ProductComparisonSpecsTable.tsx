import type { ProductComparisonTable } from "@/lib/product-content";

function ComparisonCell({ value }: { value: string }) {
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

export function ProductComparisonSpecsTable({ table }: { table: ProductComparisonTable }) {
  const [columnA, columnB] = table.columns;

  return (
    <div className="product-spec-table-wrap product-comparison-spec-table-wrap">
      <table className="product-spec-table product-comparison-spec-table">
        <thead>
          <tr>
            <th scope="col">Характеристика</th>
            <th scope="col" className="product-spec-table__col-value">
              {columnA}
            </th>
            <th scope="col" className="product-spec-table__col-value">
              {columnB}
            </th>
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row.characteristic}>
              <th scope="row">{row.characteristic}</th>
              <td>
                <ComparisonCell value={row.values[0]} />
              </td>
              <td>
                <ComparisonCell value={row.values[1]} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
