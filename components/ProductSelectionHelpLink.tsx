"use client";

import { useState } from "react";
import { ContactRequestModal } from "@/components/ContactRequestModal";
import type { ContactMethod } from "@/lib/contact-method";

type Props = {
  productTitle: string;
};

export function ProductSelectionHelpLink({ productTitle }: Props) {
  const [open, setOpen] = useState(false);

  async function submitConsultation(payload: {
    customerName?: string;
    phone: string;
    contactMethod: ContactMethod;
  }) {
    const response = await fetch("/api/consultation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: payload.customerName,
        phone: payload.phone,
        contactMethod: payload.contactMethod,
        source: "product-detail",
        productTitle
      })
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      return { ok: false as const, error: data?.error || "Не удалось отправить. Попробуйте позже." };
    }

    return { ok: true as const };
  }

  return (
    <>
      <button
        type="button"
        className="product-detail-order-bar__help-link"
        onClick={() => setOpen(true)}
      >
        Нужна помощь с подбором?
      </button>

      <ContactRequestModal
        open={open}
        onClose={() => setOpen(false)}
        title="Нужна помощь с подбором?"
        description="Наши специалисты помогут подобрать оптимальное решение под ваш объект."
        submitLabel="Отправить"
        successTitle="Заявка принята"
        successText="Наш специалист свяжется с вами в ближайшее время!"
        onSubmit={submitConsultation}
      />
    </>
  );
}
