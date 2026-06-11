"use client";

import clsx from "clsx";
import { Check, CheckCircle2, Copy, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  trackNumber: string;
  onClose: () => void;
};

export function OrderSuccessModal({ open, trackNumber, onClose }: Props) {
  const [render, setRender] = useState(open);
  const [active, setActive] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) {
      setRender(true);
      setCopied(false);
      const frame = requestAnimationFrame(() => setActive(true));
      return () => cancelAnimationFrame(frame);
    }
    setActive(false);
    const timer = window.setTimeout(() => setRender(false), 280);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!render) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [render]);

  async function copyTrack() {
    try {
      await navigator.clipboard.writeText(trackNumber);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  if (!render || typeof document === "undefined") return null;

  return createPortal(
    <section
      className={clsx("order-success-modal", active && "order-success-modal-open")}
      aria-hidden={!active}
    >
      <div className="order-success-backdrop" aria-hidden />
      <article
        className="order-success-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-success-title"
      >
        <button type="button" className="order-success-close icon-button" aria-label="Закрыть" onClick={onClose}>
          <X size={20} />
        </button>
        <span className="order-success-icon" aria-hidden>
          <CheckCircle2 size={52} strokeWidth={1.5} />
        </span>
        <h2 id="order-success-title">Заявка оформлена</h2>
        <p className="muted">
          Спасибо! В ближайшее время с вами свяжется менеджер для уточнения деталей и подготовки
          предложения.
        </p>

        <section className="order-track-box">
          <span className="order-track-label">Трек-номер заявки</span>
          <div className="order-track-row">
            <code className="order-track-code">{trackNumber}</code>
            <button
              type="button"
              className={clsx("button secondary order-track-copy", copied && "order-track-copy-done")}
              onClick={copyTrack}
            >
              {copied ? <Check size={17} aria-hidden /> : <Copy size={17} aria-hidden />}
              {copied ? "Скопировано" : "Копировать"}
            </button>
          </div>
          <p className="muted order-track-hint">
            Сохраните номер — по нему можно найти заказ в разделе «История заказов» на любом устройстве.
          </p>
        </section>
      </article>
    </section>,
    document.body
  );
}
