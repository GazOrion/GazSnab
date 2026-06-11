"use client";

import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";

const PLACEHOLDER = "/placeholder-product.jpg";
const SCROLL_EDGE_EPS = 2;

export function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const safeImages = images.length ? images : [PLACEHOLDER];
  const [activeIndex, setActiveIndex] = useState(0);
  const [fadeTop, setFadeTop] = useState(false);
  const [fadeBottom, setFadeBottom] = useState(false);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const mainWrapRef = useRef<HTMLDivElement>(null);
  const stripOuterRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  const active = safeImages[activeIndex] ?? PLACEHOLDER;

  const updateScrollFades = useCallback(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const { scrollTop, scrollHeight, clientHeight } = strip;
    const overflow = scrollHeight - clientHeight > SCROLL_EDGE_EPS;

    setFadeTop(overflow && scrollTop > SCROLL_EDGE_EPS);
    setFadeBottom(overflow && scrollTop + clientHeight < scrollHeight - SCROLL_EDGE_EPS);
  }, []);

  const syncStripViewport = useCallback(() => {
    const main = mainWrapRef.current;
    const outer = stripOuterRef.current;
    const strip = stripRef.current;
    if (!main || !outer || !strip) return;

    const height = main.offsetHeight;
    outer.style.height = `${height}px`;
    updateScrollFades();
  }, [updateScrollFades]);

  useEffect(() => {
    setActiveIndex(0);
    activeIndexRef.current = 0;
    const strip = stripRef.current;
    if (strip) strip.scrollTop = 0;
  }, [safeImages.join("|")]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const main = mainWrapRef.current;
    const strip = stripRef.current;
    if (!main || !strip) return;

    syncStripViewport();

    const resizeObserver = new ResizeObserver(() => {
      syncStripViewport();
    });
    resizeObserver.observe(main);

    strip.addEventListener("scroll", updateScrollFades, { passive: true });
    window.addEventListener("resize", syncStripViewport);

    return () => {
      resizeObserver.disconnect();
      strip.removeEventListener("scroll", updateScrollFades);
      window.removeEventListener("resize", syncStripViewport);
    };
  }, [safeImages.length, syncStripViewport, updateScrollFades]);

  const scrollThumbIntoView = useCallback(
    (index: number) => {
      const strip = stripRef.current;
      const button = thumbRefs.current[index];
      if (!strip || !button) return;

      const stripTop = strip.scrollTop;
      const stripBottom = stripTop + strip.clientHeight;
      const thumbTop = button.offsetTop;
      const thumbBottom = thumbTop + button.offsetHeight;

      if (thumbTop < stripTop) {
        strip.scrollTo({ top: thumbTop, behavior: "smooth" });
      } else if (thumbBottom > stripBottom) {
        strip.scrollTo({ top: thumbBottom - strip.clientHeight, behavior: "smooth" });
      }
    },
    []
  );

  const goTo = useCallback(
    (index: number) => {
      const next = ((index % safeImages.length) + safeImages.length) % safeImages.length;
      setActiveIndex(next);
      activeIndexRef.current = next;
      scrollThumbIntoView(next);
    },
    [safeImages.length, scrollThumbIntoView]
  );

  useEffect(() => {
    if (safeImages.length <= 1) return;

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (target.closest("input, textarea, select, [contenteditable='true']")) return;

      const isPrev = event.key === "ArrowUp" || event.key === "ArrowLeft";
      const isNext = event.key === "ArrowDown" || event.key === "ArrowRight";
      if (!isPrev && !isNext) return;

      event.preventDefault();
      const delta = isNext ? 1 : -1;
      goTo(activeIndexRef.current + delta);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo, safeImages.length]);

  return (
    <div className="product-detail-media" aria-label="Галерея товара">
      <div className="gallery-strip-col">
        <div
          className={clsx(
            "gallery-strip-outer",
            fadeTop && "gallery-strip-outer--fade-top",
            fadeBottom && "gallery-strip-outer--fade-bottom"
          )}
          ref={stripOuterRef}
        >
          <div className="gallery-strip" aria-label="Миниатюры" ref={stripRef}>
            {safeImages.map((image, index) => (
              <button
                className={index === activeIndex ? "active" : ""}
                key={`${image}-${index}`}
                ref={(node) => {
                  thumbRefs.current[index] = node;
                }}
                onClick={() => goTo(index)}
                type="button"
              >
                <img
                  src={image}
                  alt={`${title}: фото ${index + 1}`}
                  onError={(event) => {
                    event.currentTarget.src = PLACEHOLDER;
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="product-detail-gallery-wrap" ref={mainWrapRef}>
        <img
          className="gallery-main-image"
          src={active}
          alt={title}
          onError={(event) => {
            event.currentTarget.src = PLACEHOLDER;
            if (safeImages[activeIndex] !== PLACEHOLDER) {
              goTo(0);
            }
          }}
        />
      </div>
    </div>
  );
}
