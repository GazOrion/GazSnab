"use client";

import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

const MOBILE_MAX_WIDTH = 768;
export const PRODUCT_MOBILE_TABLE_VISIBLE_ROWS = 3;

type Props = {
  children: ReactNode;
  expandLabel?: string;
  collapseLabel?: string;
  collapsedMaxHeight?: number;
  visibleRows?: number;
  mode?: "truncate" | "hidden" | "rows";
};

export function ProductMobileExpandable({
  children,
  expandLabel = "Развернуть все",
  collapseLabel = "Свернуть все",
  collapsedMaxHeight = 420,
  visibleRows = PRODUCT_MOBILE_TABLE_VISIBLE_ROWS,
  mode = "truncate"
}: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`);
    const updateMobile = () => {
      setIsMobile(mediaQuery.matches);
      if (!mediaQuery.matches) {
        setExpanded(false);
      }
    };

    updateMobile();
    mediaQuery.addEventListener("change", updateMobile);
    return () => mediaQuery.removeEventListener("change", updateMobile);
  }, []);

  useEffect(() => {
    const node = contentRef.current;
    if (!node || !isMobile) {
      setIsCollapsible(false);
      return;
    }

    if (mode === "hidden") {
      setIsCollapsible(true);
      return;
    }

    if (mode === "rows") {
      const measureRows = () => {
        const rowCount = Math.max(
          node.querySelectorAll("tbody tr").length,
          node.querySelectorAll(".product-data-table-mobile__group").length,
          node.querySelectorAll(".product-data-table-mobile--simple .product-data-table-mobile__item")
            .length
        );
        setIsCollapsible(rowCount > visibleRows);
      };

      measureRows();
      const resizeObserver = new ResizeObserver(measureRows);
      resizeObserver.observe(node);

      return () => resizeObserver.disconnect();
    }

    const measure = () => {
      setIsCollapsible(node.scrollHeight > collapsedMaxHeight + 8);
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(node);

    return () => resizeObserver.disconnect();
  }, [children, collapsedMaxHeight, isMobile, mode, visibleRows]);

  const showToggle = isMobile && isCollapsible;

  return (
    <div
      className={clsx(
        "product-mobile-expandable",
        mode === "truncate" && "product-mobile-expandable--truncate",
        mode === "hidden" && "product-mobile-expandable--hidden",
        mode === "rows" && `product-mobile-expandable--rows-${visibleRows}`,
        showToggle && !expanded && "product-mobile-expandable--collapsed",
        expanded && "product-mobile-expandable--expanded"
      )}
      style={
        showToggle && !expanded && mode === "truncate"
          ? ({ "--product-mobile-expandable-max-h": `${collapsedMaxHeight}px` } as CSSProperties)
          : undefined
      }
    >
      <div className="product-mobile-expandable__content" ref={contentRef}>
        {children}
      </div>
      {showToggle ? (
        <button
          type="button"
          className="product-mobile-expandable__toggle"
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? collapseLabel : expandLabel}
          <ChevronDown size={18} aria-hidden className="product-mobile-expandable__toggle-icon" />
        </button>
      ) : null}
    </div>
  );
}
