import { ProductExpandableFigure } from "@/components/ProductExpandableFigure";
import type { ProductDescriptionBlock } from "@/lib/product-content";

export function ProductDescriptionContent({ blocks }: { blocks: ProductDescriptionBlock[] }) {
  return (
    <div className="product-description-rich">
      {blocks.map((block, index) => {
        if (block.type === "paragraph") {
          return (
            <p className="product-description-rich__paragraph" key={index}>
              {block.text}
            </p>
          );
        }

        if (block.type === "heading") {
          const Tag = block.level === 4 ? "h4" : "h3";
          const headingClass =
            block.level === 4
              ? "product-description-rich__heading product-description-rich__heading--h4"
              : "product-description-rich__heading";
          return (
            <Tag className={headingClass} key={index}>
              {block.text}
            </Tag>
          );
        }

        if (block.type === "list") {
          return (
            <ul className="product-description-rich__list" key={index}>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }

        if (block.type === "modification") {
          return (
            <article className="product-modification-card" key={index}>
              <div className="product-modification-card__head">
                <h4 className="product-modification-card__title">{block.title}</h4>
                <span className="product-modification-card__badge" aria-hidden="true">
                  {block.badge}
                </span>
              </div>
              <p className="product-modification-card__body">{block.body}</p>
            </article>
          );
        }

        if (block.type === "figure") {
          return (
            <ProductExpandableFigure
              key={index}
              imageSrc={block.imageSrc}
              imageAlt={block.imageAlt}
              caption={block.caption}
              mode={block.expandable ? "expandable" : block.plain ? "plain" : "inline"}
            />
          );
        }

        if (block.type === "data-table") {
          const hasMergedCells = block.table.rows.some((row) =>
            row.some(
              (cell) =>
                typeof cell === "object" &&
                cell.colspan != null &&
                cell.colspan > 1
            )
          );

          const wrapClass = [
            "product-data-table-wrap",
            block.highlight ? "product-data-table-wrap--highlight" : "",
            block.matrix ? "product-data-table-wrap--matrix" : "",
            hasMergedCells ? "product-data-table-wrap--merged" : ""
          ]
            .filter(Boolean)
            .join(" ");

          function renderTableCell(cell: string) {
            return cell.includes("\n")
              ? cell.split("\n").map((line, lineIndex) => (
                  <span className="product-data-table__cell-line" key={lineIndex}>
                    {line.trim() || "\u00a0"}
                  </span>
                ))
              : cell;
          }

          return (
            <div className={wrapClass} key={index}>
              <table className="product-data-table">
                <thead>
                  <tr>
                    {block.table.columns.map((column) => (
                      <th key={column} scope="col">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.table.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => {
                        const text = typeof cell === "string" ? cell : cell.text;
                        const colspan = typeof cell === "object" ? cell.colspan : undefined;

                        return (
                          <td key={cellIndex} colSpan={colspan}>
                            {renderTableCell(text)}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        if (block.type === "parts-catalog") {
          return (
            <article
              className={`product-parts-catalog${block.imageSrc ? "" : " product-parts-catalog--no-media"}`}
              key={index}
            >
              {block.imageSrc ? (
                <ProductExpandableFigure
                  imageSrc={block.imageSrc}
                  imageAlt={block.imageAlt || ""}
                  imageClassName="product-parts-catalog__image"
                  mode="catalog"
                />
              ) : null}
              <div className="product-parts-catalog__rows">
                {block.items.map((item) => (
                  <div className="product-parts-catalog__row" key={item.code || item.description}>
                    {item.code ? <div className="product-parts-catalog__code">{item.code}</div> : null}
                    {item.description ? (
                      <div className="product-parts-catalog__description">{item.description}</div>
                    ) : null}
                  </div>
                ))}
              </div>
            </article>
          );
        }

        return (
          <div className="product-description-rich__subblock" key={index}>
            <h4 className="product-description-rich__subheading">{block.text}</h4>
            <p className="product-description-rich__paragraph">{block.body}</p>
          </div>
        );
      })}
    </div>
  );
}
