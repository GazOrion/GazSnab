"use client";

import clsx from "clsx";
import { Check, Copy, Package, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { formatArticle, positionsLabel } from "@/lib/cart-display";
import { contactMethodLabel } from "@/lib/contact-method";
import { formatPrice } from "@/lib/format";
import type { PublicOrder } from "@/lib/serialize-order";
import { orderStatusClass, orderStatusLabel } from "@/lib/order-status";

type Props = {
  order: PublicOrder | null;
  onClose: () => void;
};

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(iso));
}

export function OrderDetailModal({ order, onClose }: Props) {
  const open = Boolean(order);
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
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [render, onClose]);

  async function copyTrack() {
    if (!order) return;
    try {
      await navigator.clipboard.writeText(order.trackNumber);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  if (!render || !order || typeof document === "undefined") return null;

  const units = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return createPortal(
    <section
      className={clsx("order-detail-modal", active && "order-detail-modal-open")}
      aria-hidden={!active}
    >
      <button type="button" className="order-detail-modal-backdrop" aria-label="Закрыть" onClick={onClose} />
      <article className="order-detail-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="order-detail-title">
        <header className="order-detail-modal-head">
          <section>
            <p className="order-detail-modal-eyebrow">Заявка от {formatDate(order.createdAt)}</p>
            <h2 id="order-detail-title">Состав заявки</h2>
          </section>
          <button type="button" className="order-success-close icon-button" aria-label="Закрыть" onClick={onClose}>
            <X size={20} />
          </button>
        </header>

        <section className="order-detail-modal-meta">
          <div className="order-detail-modal-track">
            <span className="muted">Трек-номер</span>
            <div className="order-track-row">
              <code className="order-track-code">{order.trackNumber}</code>
              <button
                type="button"
                className={clsx("button secondary order-track-copy", copied && "order-track-copy-done")}
                onClick={copyTrack}
              >
                {copied ? <Check size={17} aria-hidden /> : <Copy size={17} aria-hidden />}
                {copied ? "Скопировано" : "Копировать"}
              </button>
            </div>
          </div>
          <span className={clsx("order-status-pill", orderStatusClass(order.status))}>
            {orderStatusLabel[order.status]}
          </span>
        </section>

        <section className="order-detail-modal-customer">
          <h3>Данные заявки</h3>
          <dl className="order-detail-dl">
            <div>
              <dt>Имя</dt>
              <dd>{order.customerName}</dd>
            </div>
            <div>
              <dt>Телефон</dt>
              <dd>{order.phone}</dd>
            </div>
            <div>
              <dt>Способ связи</dt>
              <dd>{contactMethodLabel(order.contactMethod)}</dd>
            </div>
            {order.email ? (
              <div>
                <dt>Email</dt>
                <dd>{order.email}</dd>
              </div>
            ) : null}
            {order.company ? (
              <div>
                <dt>Компания</dt>
                <dd>{order.company}</dd>
              </div>
            ) : null}
            {order.comment ? (
              <div className="order-detail-dl-wide">
                <dt>Комментарий</dt>
                <dd>{order.comment}</dd>
              </div>
            ) : null}
          </dl>
        </section>

        <section className="order-detail-modal-items">
          <p className="cart-card-toolbar-title">
            <Package size={20} aria-hidden />
            <span>{positionsLabel(order.items.length)}</span>
          </p>
          <ul className="cart-rows order-detail-modal-rows">
            {order.items.map((item) => {
              const imageSrc = item.imageUrl || "/placeholder-product.jpg";
              const productHref = item.slug ? `/products/${item.slug}` : null;
              const article = formatArticle(item.slug ?? undefined, item.productId);

              return (
                <li className="cart-row order-detail-row" key={item.id}>
                  {productHref ? (
                    <Link className="cart-row-thumb order-detail-thumb" href={productHref} tabIndex={-1} aria-hidden>
                      <img src={imageSrc} alt="" className="cart-row-img" />
                    </Link>
                  ) : (
                    <div className="cart-row-thumb order-detail-thumb">
                      <img src={imageSrc} alt="" className="cart-row-img" />
                    </div>
                  )}

                  <div className="cart-row-body">
                    {productHref ? (
                      <Link className="cart-row-title" href={productHref}>
                        {item.title}
                      </Link>
                    ) : (
                      <p className="cart-row-title">{item.title}</p>
                    )}
                    <p className="cart-row-sku">Артикул: {article}</p>
                    <span className="cart-row-unit-badge">{item.unit}</span>
                    <p className="order-detail-unit-price muted">
                      {formatPrice(item.price)} / {item.unit}
                    </p>
                  </div>

                  <div className="cart-row-actions order-detail-actions">
                    <span className="cart-row-sum">{formatPrice(item.lineTotal)}</span>
                    <span className="order-detail-qty">
                      {item.quantity} {item.unit}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <footer className="order-detail-modal-foot">
          <span className="cart-total-label">Итого по заявке</span>
          <strong className="cart-total-value">{formatPrice(order.total)}</strong>
          <span className="muted cart-total-units">{units} шт.</span>
        </footer>
      </article>
    </section>,
    document.body
  );
}
