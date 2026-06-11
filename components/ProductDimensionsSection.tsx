import type { ProductDimensionsSection as ProductDimensionsSectionData } from "@/lib/product-content";
import { ProductDimensionsBlock } from "@/components/ProductDimensionsBlock";

export function ProductDimensionsSection({ section }: { section: ProductDimensionsSectionData }) {
  return (
    <div className="product-dimensions-section">
      {section.sectionTitle ? (
        <h3 className="product-dimensions-section__title">{section.sectionTitle}</h3>
      ) : null}
      {section.items.map((item, index) => (
        <ProductDimensionsBlock
          key={`${item.imageSrc}-${index}`}
          content={{
            title: item.title,
            imageSrc: item.imageSrc,
            imageAlt: item.imageAlt,
            caption: item.caption
          }}
        />
      ))}
    </div>
  );
}
