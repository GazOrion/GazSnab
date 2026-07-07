"use client";

import clsx from "clsx";
import { X, ZoomIn } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type WheelEvent as ReactWheelEvent } from "react";
import { createPortal } from "react-dom";

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const ZOOM_STEP = 0.25;

type PreviewMode = "expandable" | "inline" | "plain" | "dimensions" | "catalog";

type Props = {
  imageSrc: string;
  imageAlt: string;
  caption?: string;
  mode?: PreviewMode;
  figureClassName?: string;
  imageClassName?: string;
};

function clampScale(value: number) {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));
}

function getTouchDistance(touches: React.TouchList) {
  const [first, second] = [touches[0], touches[1]];
  const dx = second.clientX - first.clientX;
  const dy = second.clientY - first.clientY;
  return Math.hypot(dx, dy);
}

export function ProductExpandableFigure({
  imageSrc,
  imageAlt,
  caption,
  mode = "inline",
  figureClassName,
  imageClassName
}: Props) {
  const [open, setOpen] = useState(false);
  const [render, setRender] = useState(false);
  const [active, setActive] = useState(false);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const pinchRef = useRef<{ distance: number; scale: number } | null>(null);

  const resetZoom = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (open) {
      setRender(true);
      const frame = requestAnimationFrame(() => setActive(true));
      return () => cancelAnimationFrame(frame);
    }
    setActive(false);
    const timer = window.setTimeout(() => setRender(false), 220);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) {
      resetZoom();
    }
  }, [open, resetZoom]);

  useEffect(() => {
    if (!render) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeModal, render]);

  const zoomBy = useCallback((delta: number) => {
    setScale((current) => {
      const next = clampScale(Number((current + delta).toFixed(2)));
      if (next <= MIN_SCALE) {
        setTranslate({ x: 0, y: 0 });
      }
      return next;
    });
  }, []);

  const onViewportWheel = useCallback(
    (event: ReactWheelEvent<HTMLDivElement>) => {
      event.preventDefault();
      zoomBy(event.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP);
    },
    [zoomBy]
  );

  const onViewportPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (scale <= MIN_SCALE || event.button !== 0) return;
      viewportRef.current?.setPointerCapture(event.pointerId);
      lastPointerRef.current = { x: event.clientX, y: event.clientY };
      setDragging(true);
    },
    [scale]
  );

  const onViewportPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!dragging || scale <= MIN_SCALE) return;
      const dx = event.clientX - lastPointerRef.current.x;
      const dy = event.clientY - lastPointerRef.current.y;
      lastPointerRef.current = { x: event.clientX, y: event.clientY };
      setTranslate((current) => ({ x: current.x + dx, y: current.y + dy }));
    },
    [dragging, scale]
  );

  const stopDragging = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (viewportRef.current?.hasPointerCapture(event.pointerId)) {
      viewportRef.current.releasePointerCapture(event.pointerId);
    }
    setDragging(false);
  }, []);

  const onViewportDoubleClick = useCallback(() => {
    setScale((current) => {
      if (current > MIN_SCALE) {
        setTranslate({ x: 0, y: 0 });
        return MIN_SCALE;
      }
      return 2.5;
    });
  }, []);

  const onViewportTouchStart = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      if (event.touches.length === 2) {
        pinchRef.current = {
          distance: getTouchDistance(event.touches),
          scale
        };
      }
    },
    [scale]
  );

  const onViewportTouchMove = useCallback((event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 2 || !pinchRef.current) return;
    event.preventDefault();
    const distance = getTouchDistance(event.touches);
    const ratio = distance / pinchRef.current.distance;
    const next = clampScale(Number((pinchRef.current.scale * ratio).toFixed(2)));
    setScale(next);
    if (next <= MIN_SCALE) {
      setTranslate({ x: 0, y: 0 });
    }
  }, []);

  const onViewportTouchEnd = useCallback(() => {
    pinchRef.current = null;
  }, []);

  const openLabel = `Открыть изображение: ${imageAlt}`;

  const previewButton = (
    <button
      type="button"
      className={clsx(
        mode === "expandable" ? "product-expandable-figure__preview" : "product-image-lightbox__trigger",
        mode === "plain" && "product-image-lightbox__trigger--plain",
        mode === "dimensions" && "product-image-lightbox__trigger--dimensions",
        (mode === "inline" || mode === "catalog") && "product-image-lightbox__trigger--inline"
      )}
      onClick={() => setOpen(true)}
      aria-label={openLabel}
    >
      {mode === "expandable" ? (
        <>
          <div className="product-expandable-figure__preview-frame">
            <img
              className="product-description-rich__figure-image product-expandable-figure__preview-image"
              src={imageSrc}
              alt={imageAlt}
              loading="lazy"
            />
            <span className="product-expandable-figure__fade" aria-hidden />
          </div>
          <span className="product-expandable-figure__action">
            <ZoomIn size={18} aria-hidden />
            Открыть схему полностью
          </span>
        </>
      ) : (
        <img
          className={clsx(imageClassName ?? "product-description-rich__figure-image", mode === "plain" && "product-description-rich__figure-image--plain")}
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
        />
      )}
    </button>
  );

  const figureClass = clsx(
    mode === "expandable" && "product-description-rich__figure product-expandable-figure",
    mode === "inline" && "product-description-rich__figure",
    mode === "plain" && "product-description-rich__figure product-description-rich__figure--plain",
    mode === "dimensions" && "product-dimensions-block__frame",
    figureClassName
  );

  return (
    <>
      {mode === "dimensions" ? (
        <div className={figureClass}>
          <div className="product-dimensions-block__media">{previewButton}</div>
          {caption ? <p className="product-dimensions-block__caption">{caption}</p> : null}
        </div>
      ) : mode === "catalog" ? (
        <div className={figureClassName ?? "product-parts-catalog__media"}>{previewButton}</div>
      ) : (
        <figure className={figureClass}>
          {mode === "inline" ? (
            <div className="product-description-rich__figure-frame">{previewButton}</div>
          ) : (
            previewButton
          )}
          {caption ? (
            <figcaption className="product-description-rich__figure-caption">{caption}</figcaption>
          ) : null}
        </figure>
      )}

      {render && typeof document !== "undefined"
        ? createPortal(
            <section
              className={clsx("product-figure-modal", active && "product-figure-modal-open")}
              aria-hidden={!active}
            >
              <button
                type="button"
                className="product-figure-modal__backdrop"
                aria-label="Закрыть"
                onClick={closeModal}
              />
              <button
                type="button"
                className="product-figure-modal__close icon-button"
                aria-label="Закрыть"
                onClick={closeModal}
              >
                <X size={22} />
              </button>
              <div
                className={clsx(
                  "product-figure-modal__viewport",
                  dragging && "product-figure-modal__viewport--dragging"
                )}
                role="dialog"
                aria-modal="true"
                aria-label={imageAlt}
                ref={viewportRef}
                onWheel={onViewportWheel}
                onPointerDown={onViewportPointerDown}
                onPointerMove={onViewportPointerMove}
                onPointerUp={stopDragging}
                onPointerCancel={stopDragging}
                onDoubleClick={onViewportDoubleClick}
                onTouchStart={onViewportTouchStart}
                onTouchMove={onViewportTouchMove}
                onTouchEnd={onViewportTouchEnd}
                onTouchCancel={onViewportTouchEnd}
              >
                <img
                  className="product-figure-modal__image"
                  src={imageSrc}
                  alt={imageAlt}
                  draggable={false}
                  style={{
                    transform: `translate3d(${translate.x}px, ${translate.y}px, 0) scale(${scale})`
                  }}
                />
              </div>
            </section>,
            document.body
          )
        : null}
    </>
  );
}
