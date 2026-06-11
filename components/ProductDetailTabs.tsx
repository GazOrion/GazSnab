"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ProductCard, type CatalogProduct } from "@/components/ProductCard";
import { ProductDescriptionContent } from "@/components/ProductDescriptionContent";
import { ProductDimensionsBlock } from "@/components/ProductDimensionsBlock";
import { ProductDimensionsSection } from "@/components/ProductDimensionsSection";
import { ProductComparisonSpecsTable } from "@/components/ProductComparisonSpecsTable";
import { ProductSpecsTable } from "@/components/ProductSpecsTable";
import type { ProductRichContent } from "@/lib/product-content";

export type ProductDetailSectionId = "description" | "specs" | "bought-together";

const SECTIONS: { id: ProductDetailSectionId; label: string }[] = [
  { id: "description", label: "Описание" },
  { id: "specs", label: "Характеристики" },
  { id: "bought-together", label: "Другие товары" }
];

type SpecRow = [string, string];

function SpecValue({ value }: { value: string }) {
  const lines = value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length > 1) {
    return (
      <ul className="product-spec-block__list">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    );
  }

  return <p className="product-spec-block__text">{value}</p>;
}

export function ProductDetailTabs({
  description,
  details,
  specs,
  relatedProducts,
  richContent,
  sections = SECTIONS.map((section) => section.id),
  beforeBoughtTogether
}: {
  description: string;
  details: string;
  specs: SpecRow[];
  relatedProducts: CatalogProduct[];
  richContent?: ProductRichContent | null;
  sections?: ProductDetailSectionId[];
  beforeBoughtTogether?: ReactNode;
}) {
  const visibleSections = SECTIONS.filter((section) => sections.includes(section.id));
  const [active, setActive] = useState<ProductDetailSectionId>(visibleSections[0]?.id ?? "description");

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "") as ProductDetailSectionId;
      if (visibleSections.some((section) => section.id === hash)) {
        setActive(hash);
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [visibleSections]);

  useEffect(() => {
    const elements = visibleSections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length < 2) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActive(visible[0].target.id as ProductDetailSectionId);
        }
      },
      { rootMargin: "-96px 0px -52% 0px", threshold: [0.12, 0.35, 0.6] }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [visibleSections]);

  const showDescription = sections.includes("description");
  const showSpecs = sections.includes("specs");
  const showBoughtTogether = sections.includes("bought-together");
  const descriptionTitle = richContent?.descriptionTitle ?? "Подробное описание";
  const specsTitle = richContent?.specsTitle ?? "Характеристики";
  const hasRichSpecs = Boolean(
    richContent?.specs.length || richContent?.comparisonTable?.rows.length
  );
  const hasFallbackSpecs = specs.length > 0;

  return (
    <div className="product-detail-sections">
      {visibleSections.length > 1 ? (
      <nav className="product-detail-sections__nav" aria-label="Разделы товара">
        {visibleSections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`product-detail-sections__link${active === section.id ? " is-active" : ""}`}
            onClick={(event) => {
              event.preventDefault();
              setActive(section.id);
              document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              window.history.pushState(null, "", `#${section.id}`);
            }}
          >
            {section.label}
          </a>
        ))}
      </nav>
      ) : null}

      <div className="product-detail-sections__stack">
        {showDescription ? (
        <section className="product-detail-section" id="description">
          <h2 className="product-detail-section__title">{descriptionTitle}</h2>
          <div className="product-detail-section__body">
            {richContent ? (
              <ProductDescriptionContent blocks={richContent.description} />
            ) : details.trim() ? (
              <p>{details}</p>
            ) : (
              <p className="product-detail-section__empty">Описание уточняется у менеджера.</p>
            )}
          </div>
        </section>
        ) : null}

        {showSpecs ? (
        <section className="product-detail-section" id="specs">
          <h2 className="product-detail-section__title">{specsTitle}</h2>
          {hasRichSpecs ? (
            <>
              {richContent!.specs.length ? (
                <ProductSpecsTable rows={richContent!.specs} />
              ) : null}
              {richContent?.comparisonTable ? (
                <ProductComparisonSpecsTable table={richContent.comparisonTable} />
              ) : null}
              {richContent?.dimensionsSection ? (
                <ProductDimensionsSection section={richContent.dimensionsSection} />
              ) : null}
              {!richContent?.dimensionsSection && richContent?.dimensions ? (
                <ProductDimensionsBlock content={richContent.dimensions} />
              ) : null}
            </>
          ) : hasFallbackSpecs ? (
            <div className="product-spec-blocks">
              {specs.map(([key, value]) => (
                <article className="product-spec-block" key={key}>
                  <h3 className="product-spec-block__title">{key}</h3>
                  <SpecValue value={value} />
                </article>
              ))}
            </div>
          ) : (
            <p className="product-detail-section__empty">Характеристики уточняются у менеджера.</p>
          )}
        </section>
        ) : null}

        {beforeBoughtTogether ? (
          <div className="product-detail-section__before-related">{beforeBoughtTogether}</div>
        ) : null}

        {showBoughtTogether ? (
        <section className="product-detail-section" id="bought-together">
          <h2 className="product-detail-section__title">Другие товары</h2>
          {relatedProducts.length > 0 ? (
            <div className="product-grid compact product-detail-sections__grid">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          ) : (
            <p className="product-detail-section__empty">
              Для этой позиции подборка дополнений пока не сформирована — уточните у менеджера при
              оформлении заявки.
            </p>
          )}
        </section>
        ) : null}
      </div>
    </div>
  );
}
