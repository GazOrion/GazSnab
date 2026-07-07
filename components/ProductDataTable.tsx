import { ProductMobileExpandable } from "@/components/ProductMobileExpandable";
import type { ProductDataTableCell } from "@/lib/product-content/smt-kompleks";

type TableData = {
  columns: string[];
  rows: ProductDataTableCell[][];
};

type Props = {
  table: TableData;
  highlight?: boolean;
  matrix?: boolean;
  hasMergedCells?: boolean;
  collapsible?: boolean;
};

function getCellText(cell: ProductDataTableCell) {
  return typeof cell === "string" ? cell : cell.text;
}

function expandRowToValues(row: ProductDataTableCell[]) {
  const values: string[] = [];

  for (const cell of row) {
    const text = getCellText(cell);
    const colspan = typeof cell === "object" ? cell.colspan ?? 1 : 1;
    for (let index = 0; index < colspan; index += 1) {
      values.push(text);
    }
  }

  return values;
}

function renderCellContent(text: string) {
  if (!text.includes("\n")) return text;

  return text.split("\n").map((line, lineIndex) => (
    <span className="product-data-table__cell-line" key={lineIndex}>
      {line.trim() || "\u00a0"}
    </span>
  ));
}

function ProductDataTableMobile({ table, matrix }: { table: TableData; matrix?: boolean }) {
  if (matrix) {
    const modelColumns = table.columns.slice(1);

    return (
      <div className="product-data-table-mobile product-data-table-mobile--matrix">
        {table.rows.map((row, rowIndex) => {
          const values = expandRowToValues(row);
          const title = values[0] ?? "";
          const modelValues = values.slice(1);

          return (
            <article className="product-data-table-mobile__group" key={rowIndex}>
              <h5 className="product-data-table-mobile__title">{renderCellContent(title)}</h5>
              <dl className="product-data-table-mobile__list">
                {modelColumns.map((model, modelIndex) => {
                  const value = modelValues[modelIndex];
                  if (value == null || value === "") return null;

                  return (
                    <div className="product-data-table-mobile__item" key={`${model}-${modelIndex}`}>
                      <dt>{model}</dt>
                      <dd>{renderCellContent(value)}</dd>
                    </div>
                  );
                })}
              </dl>
            </article>
          );
        })}
      </div>
    );
  }

  return (
    <dl className="product-data-table-mobile product-data-table-mobile--simple">
      {table.rows.map((row, rowIndex) => {
        const values = expandRowToValues(row);

        return (
          <div className="product-data-table-mobile__item" key={rowIndex}>
            <dt>{renderCellContent(values[0] ?? "")}</dt>
            <dd>{renderCellContent(values[1] ?? "")}</dd>
          </div>
        );
      })}
    </dl>
  );
}

export function ProductDataTable({
  table,
  highlight,
  matrix,
  hasMergedCells,
  collapsible = true
}: Props) {
  const wrapClass = [
    "product-data-table-wrap",
    highlight ? "product-data-table-wrap--highlight" : "",
    matrix ? "product-data-table-wrap--matrix" : "",
    hasMergedCells ? "product-data-table-wrap--merged" : ""
  ]
    .filter(Boolean)
    .join(" ");

  const tableContent = (
    <div className={wrapClass}>
      <table className="product-data-table product-data-table--desktop">
        <thead>
          <tr>
            {table.columns.map((column) => (
              <th key={column} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => {
                const text = getCellText(cell);
                const colspan = typeof cell === "object" ? cell.colspan : undefined;

                return (
                  <td key={cellIndex} colSpan={colspan}>
                    {renderCellContent(text)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <ProductDataTableMobile table={table} matrix={matrix} />
    </div>
  );

  if (!collapsible) {
    return tableContent;
  }

  return <ProductMobileExpandable mode="rows">{tableContent}</ProductMobileExpandable>;
}
