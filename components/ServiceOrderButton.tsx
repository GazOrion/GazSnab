"use client";

import { useState } from "react";
import clsx from "clsx";
import { ContactRequestModal } from "@/components/ContactRequestModal";
import type { ContactMethod } from "@/lib/contact-method";

type ServiceProduct = {
  id: string;
  title: string;
};

type Props = {
  product: ServiceProduct;
  compact?: boolean;
  block?: boolean;
  variant?: "default" | "equipment" | "accent";
};

export function ServiceOrderButton({ product, compact, block, variant = "default" }: Props) {
  const [open, setOpen] = useState(false);

  const buttonClassName = (() => {
    if (variant === "equipment") return "store-service-order-btn";
    if (compact) return clsx("button card-add-btn", block && "card-add-btn-block");
    if (variant === "accent") return "button yellow";
    return "button";
  })();

  async function submitOrder(payload: {
    customerName?: string;
    phone: string;
    contactMethod: ContactMethod;
  }) {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: payload.customerName,
        phone: payload.phone,
        contactMethod: payload.contactMethod,
        items: [{ productId: product.id, quantity: 1 }]
      })
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      return { ok: false as const, error: data?.error || "Не удалось отправить заявку." };
    }

    return { ok: true as const };
  }

  return (
    <>
      <button type="button" className={buttonClassName} onClick={() => setOpen(true)}>
        Заказать
      </button>
      <ContactRequestModal
        open={open}
        onClose={() => setOpen(false)}
        title="Заказать услугу"
        description={product.title}
        submitLabel="Отправить заявку"
        successTitle="Заявка оформлена"
        successText="Спасибо! Менеджер свяжется с вами для уточнения деталей."
        onSubmit={submitOrder}
      />
    </>
  );
}
