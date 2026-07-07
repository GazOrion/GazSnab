import { ProductExpandableFigure } from "@/components/ProductExpandableFigure";
import type { ProductDimensionsContent } from "@/lib/product-content";

export function ProductDimensionsBlock({ content }: { content: ProductDimensionsContent }) {
  return (
    <article className="product-dimensions-block">
      {content.title ? <h3 className="product-dimensions-block__title">{content.title}</h3> : null}
      <ProductExpandableFigure
        imageSrc={content.imageSrc}
        imageAlt={content.imageAlt}
        caption={content.caption}
        mode="dimensions"
      />
    </article>
  );
}
