"use client";

import clsx from "clsx";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import type { PublicOrder } from "@/lib/serialize-order";
import { formatPrice } from "@/lib/format";
import { orderStatusClass, orderStatusLabel } from "@/lib/order-status";

type Props = {
  order: PublicOrder;
  onOpen: (order: PublicOrder) => void;
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

export function OrderHistoryCard({ order, onOpen }: Props) {
  const [copied, setCopied] = useState(false);

  async function copyTrack(event: React.MouseEvent) {
    event.stopPropagation();
    try {
      await navigator.clipboard.writeText(order.trackNumber);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <li className="order-history-entry">
      <button type="button" className="order-history-entry-head" onClick={() => onOpen(order)}>
        <section className="order-history-entry-main">
          <p className="order-history-track">
            <span className="muted">Трек-номер</span>
            <code>{order.trackNumber}</code>
            <button
              type="button"
              className="order-history-track-copy"
              onClick={copyTrack}
              aria-label="Скопировать трек-номер"
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
            </button>
          </p>
          <p className="order-history-date">{formatDate(order.createdAt)}</p>
          <p className="order-history-meta muted">
            {order.customerName}
            {order.company ? ` · ${order.company}` : ""}
          </p>
        </section>
        <section className="order-history-entry-side">
          <span className={clsx("order-status-pill", orderStatusClass(order.status))}>
            {orderStatusLabel[order.status]}
          </span>
          <strong>{formatPrice(order.total)}</strong>
        </section>
      </button>
    </li>
  );
}
