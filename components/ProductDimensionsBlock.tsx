import type { ProductDimensionsContent } from "@/lib/product-content";

export function ProductDimensionsBlock({ content }: { content: ProductDimensionsContent }) {
  return (
    <article className="product-dimensions-block">
      {content.title ? <h3 className="product-dimensions-block__title">{content.title}</h3> : null}
      <div className="product-dimensions-block__frame">
        <div className="product-dimensions-block__media">
          <img
            className="product-dimensions-block__image"
            src={content.imageSrc}
            alt={content.imageAlt}
            loading="lazy"
          />
        </div>
        {content.caption ? (
          <p className="product-dimensions-block__caption">{content.caption}</p>
        ) : null}
      </div>
    </article>
  );
}
