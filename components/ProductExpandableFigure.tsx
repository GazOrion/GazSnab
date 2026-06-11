"use client";

import clsx from "clsx";
import { X, ZoomIn } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  imageSrc: string;
  imageAlt: string;
  caption?: string;
};

export function ProductExpandableFigure({ imageSrc, imageAlt, caption }: Props) {
  const [open, setOpen] = useState(false);
  const [render, setRender] = useState(false);
  const [active, setActive] = useState(false);

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
    if (!render) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [render]);

  return (
    <>
      <figure className="product-description-rich__figure product-expandable-figure">
        <button
          type="button"
          className="product-expandable-figure__preview"
          onClick={() => setOpen(true)}
          aria-label={`Открыть схему: ${imageAlt}`}
        >
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
        </button>
        {caption ? (
          <figcaption className="product-description-rich__figure-caption">{caption}</figcaption>
        ) : null}
      </figure>

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
                onClick={() => setOpen(false)}
              />
              <div
                className="product-figure-modal__dialog"
                role="dialog"
                aria-modal="true"
                aria-label={imageAlt}
              >
                <button
                  type="button"
                  className="product-figure-modal__close icon-button"
                  aria-label="Закрыть"
                  onClick={() => setOpen(false)}
                >
                  <X size={22} />
                </button>
                <img className="product-figure-modal__image" src={imageSrc} alt={imageAlt} />
              </div>
            </section>,
            document.body
          )
        : null}
    </>
  );
}
