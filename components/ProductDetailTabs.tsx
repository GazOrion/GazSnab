"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ProductCard, type CatalogProduct } from "@/components/ProductCard";
import { ProductDescriptionCollapsible } from "@/components/ProductDescriptionCollapsible";
import { ProductDescriptionContent } from "@/components/ProductDescriptionContent";
import { ProductDimensionsBlock } from "@/components/ProductDimensionsBlock";
import { ProductDimensionsSection } from "@/components/ProductDimensionsSection";
import { ProductComparisonSpecsTable } from "@/components/ProductComparisonSpecsTable";
import { ProductSpecsCollapsible } from "@/components/ProductSpecsCollapsible";
import { ProductSpecsTable } from "@/components/ProductSpecsTable";
import type { ProductRichContent } from "@/lib/product-content";
import {
  splitProductDescriptionBlocks
} from "@/lib/product-description-split";

export type ProductDetailSectionId = "description" | "options" | "specs" | "bought-together";

const BASE_SECTIONS: { id: ProductDetailSectionId; label: string }[] = [
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

function isProductDetailSectionId(value: string): value is ProductDetailSectionId {
  return (
    value === "description" ||
    value === "options" ||
    value === "specs" ||
    value === "bought-together"
  );
}

export function ProductDetailTabs({
  description,
  details,
  specs,
  relatedProducts,
  richContent,
  sections = BASE_SECTIONS.map((section) => section.id),
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
  const hasOptionsPanel = Boolean(richContent?.optionsDescription?.length);
  const descriptionSplit = useMemo(
    () => (richContent ? splitProductDescriptionBlocks(richContent.description) : null),
    [richContent]
  );
  const introDescriptionBlocks = descriptionSplit?.introBlocks ?? richContent?.description ?? [];
  const descriptionSpecsBlocks = descriptionSplit?.specsBlocks ?? [];
  const specsDescriptionBlocks = useMemo(
    () => [...descriptionSpecsBlocks, ...(richContent?.specsFooter ?? [])],
    [descriptionSpecsBlocks, richContent?.specsFooter]
  );
  const hasRichSpecsContent = Boolean(
    (richContent?.specs?.length ?? 0) > 0 ||
      specsDescriptionBlocks.length > 0 ||
      (richContent?.comparisonTable?.rows?.length ?? 0) > 0 ||
      richContent?.dimensions ||
      richContent?.dimensionsSection
  );
  const hasFallbackSpecs = specs.length > 0;
  const showSpecsPanel =
    sections.includes("specs") && (hasRichSpecsContent || (hasFallbackSpecs && !richContent));
  const showDescription =
    sections.includes("description") &&
    (introDescriptionBlocks.length > 0 || (!richContent && Boolean(details.trim())));

  const navSections = useMemo(() => {
    const items: { id: ProductDetailSectionId; label: string }[] = [];
    const optionsLabel =
      richContent?.optionsTitle ?? "Дополнительные опции и исполнения";

    for (const section of BASE_SECTIONS) {
      if (!sections.includes(section.id)) continue;
      if (section.id === "description" && !showDescription) continue;
      if (section.id === "specs" && !showSpecsPanel) continue;

      if (section.id === "bought-together" && hasOptionsPanel) {
        items.push({ id: "options", label: optionsLabel });
      }

      items.push(section);
    }

    return items;
  }, [sections, hasOptionsPanel, richContent?.optionsTitle, showDescription, showSpecsPanel]);

  const [active, setActive] = useState<ProductDetailSectionId>(
    navSections[0]?.id ?? "description"
  );
  const [optionsMode, setOptionsMode] = useState(false);
  const pendingScrollRef = useRef<ProductDetailSectionId | null>(null);
  const scrollSpyLockRef = useRef(false);
  const scrollSpyLockTimerRef = useRef<number | null>(null);
  const syncActiveFromScrollRef = useRef<() => void>(() => {});

  const scrollSectionIds = useMemo(
    () =>
      navSections
        .map((section) => section.id)
        .filter((id) => id !== "options"),
    [navSections]
  );

  function lockScrollSpy(durationMs = 900) {
    scrollSpyLockRef.current = true;
    if (scrollSpyLockTimerRef.current !== null) {
      window.clearTimeout(scrollSpyLockTimerRef.current);
    }
    scrollSpyLockTimerRef.current = window.setTimeout(() => {
      scrollSpyLockRef.current = false;
      scrollSpyLockTimerRef.current = null;
      syncActiveFromScrollRef.current();
    }, durationMs);
  }

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "");

      if (hash === "options" && hasOptionsPanel) {
        setOptionsMode(true);
        setActive("options");
        return;
      }

      setOptionsMode(false);

      if (isProductDetailSectionId(hash) && navSections.some((section) => section.id === hash)) {
        setActive(hash);
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [navSections, hasOptionsPanel]);

  useEffect(() => {
    if (optionsMode) return;

    const ACTIVATION_OFFSET = 132;
    let ticking = false;

    const updateActiveFromScroll = () => {
      ticking = false;
      if (scrollSpyLockRef.current) return;

      let nextActive = scrollSectionIds[0] ?? "description";

      for (const id of scrollSectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;
        if (element.getBoundingClientRect().top <= ACTIVATION_OFFSET) {
          nextActive = id;
        }
      }

      const atPageBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 12;
      if (atPageBottom) {
        nextActive = scrollSectionIds[scrollSectionIds.length - 1] ?? nextActive;
      }

      setActive((prev) => (prev === nextActive ? prev : nextActive));
    };

    syncActiveFromScrollRef.current = updateActiveFromScroll;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateActiveFromScroll);
    };

    updateActiveFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (scrollSpyLockTimerRef.current !== null) {
        window.clearTimeout(scrollSpyLockTimerRef.current);
      }
    };
  }, [scrollSectionIds, optionsMode]);

  useEffect(() => {
    if (optionsMode || !pendingScrollRef.current) return;

    const sectionId = pendingScrollRef.current;
    pendingScrollRef.current = null;

    requestAnimationFrame(() => {
      scrollToSection(sectionId);
    });
  }, [optionsMode]);

  const showSpecs = showSpecsPanel && sections.includes("specs");
  const showBoughtTogether = sections.includes("bought-together");
  const descriptionTitle = richContent?.descriptionTitle ?? "Подробное описание";
  const optionsTitle = richContent?.optionsTitle ?? "Дополнительные опции и исполнения";
  const specsTitle = richContent?.specsTitle ?? "Характеристики";
  const hasRichSpecs = hasRichSpecsContent;

  function scrollToSection(sectionId: ProductDetailSectionId) {
    const element = document.getElementById(sectionId);
    if (!element) return;

    lockScrollSpy();

    if (sectionId === "description") {
      const viewportOffset = Math.max(108, window.innerHeight * 0.38);
      const top = element.getBoundingClientRect().top + window.scrollY - viewportOffset;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      return;
    }

    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleNavClick(sectionId: ProductDetailSectionId) {
    if (sectionId === "options" && hasOptionsPanel) {
      setOptionsMode(true);
      setActive("options");
      window.history.pushState(null, "", "#options");
      return;
    }

    const leavingOptions = optionsMode;
    setOptionsMode(false);
    setActive(sectionId);
    lockScrollSpy();
    window.history.pushState(null, "", `#${sectionId}`);

    if (leavingOptions) {
      pendingScrollRef.current = sectionId;
    } else {
      scrollToSection(sectionId);
    }
  }

  return (
    <div className="product-detail-sections">
      {navSections.length > 1 ? (
        <nav className="product-detail-sections__nav" aria-label="Разделы товара">
          {navSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`product-detail-sections__link${active === section.id ? " is-active" : ""}`}
              onClick={(event) => {
                event.preventDefault();
                handleNavClick(section.id);
              }}
            >
              {section.label}
            </a>
          ))}
        </nav>
      ) : null}

      <div className="product-detail-sections__stack">
        {optionsMode && hasOptionsPanel ? (
          <section className="product-detail-section product-detail-section--content-view" id="options">
            <h2 className="product-detail-section__title">{optionsTitle}</h2>
            <div className="product-detail-section__body">
              <ProductDescriptionContent blocks={richContent!.optionsDescription!} />
            </div>
          </section>
        ) : (
          <>
            {showDescription ? (
              <section className="product-detail-section" id="description">
                <h2 className="product-detail-section__title">{descriptionTitle}</h2>
                <div className="product-detail-section__body">
                  <ProductDescriptionCollapsible>
                    {richContent ? (
                      <ProductDescriptionContent blocks={introDescriptionBlocks} />
                    ) : details.trim() ? (
                      <p>{details}</p>
                    ) : (
                      <p className="product-detail-section__empty">Описание уточняется у менеджера.</p>
                    )}
                  </ProductDescriptionCollapsible>
                </div>
              </section>
            ) : null}

            {showSpecs ? (
              <section
                className={
                  specsDescriptionBlocks.length
                    ? "product-detail-section product-detail-section--inline-specs-title"
                    : "product-detail-section"
                }
                id="specs"
              >
                <h2 className="product-detail-section__title">{specsTitle}</h2>
                <ProductSpecsCollapsible>
                  {hasRichSpecs ? (
                    <>
                      {richContent!.specs?.length ? (
                        <ProductSpecsTable rows={richContent!.specs!} />
                      ) : null}
                      {specsDescriptionBlocks.length ? (
                        <div className="product-detail-section__specs-footer">
                          <ProductDescriptionContent
                            blocks={specsDescriptionBlocks}
                            tableCollapsible={false}
                          />
                        </div>
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
                </ProductSpecsCollapsible>
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
          </>
        )}
      </div>
    </div>
  );
}
