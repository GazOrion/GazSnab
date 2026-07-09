"use client";

import { useState } from "react";
import { Phone } from "lucide-react";
import { ContactRequestModal } from "@/components/ContactRequestModal";
import { getConsultationPagePayload } from "@/lib/consultation-page-url";
import type { ContactMethod } from "@/lib/contact-method";

export function PhoneFabWidget() {
  const [open, setOpen] = useState(false);

  async function submitCallback(payload: {
    phone: string;
    contactMethod: ContactMethod;
  }) {
    const response = await fetch("/api/consultation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: payload.phone,
        contactMethod: payload.contactMethod,
        source: "phone-fab",
        ...getConsultationPagePayload()
      })
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      return { ok: false as const, error: data?.error || "Не удалось отправить. Попробуйте позже." };
    }

    return { ok: true as const };
  }

  return (
    <div className="phone-fab">
      <ContactRequestModal
        open={open}
        onClose={() => setOpen(false)}
        title="Заказать звонок"
        description="Оставьте номер — мы перезвоним."
        showName={false}
        submitLabel="Жду звонка"
        successTitle="Заявка принята"
        successText="Мы перезвоним вам в ближайшее рабочее время."
        onSubmit={submitCallback}
      />

      {!open ? (
        <button
          type="button"
          className="phone-fab__btn"
          aria-label="Заказать звонок"
          aria-expanded={false}
          onClick={() => setOpen(true)}
        >
          <Phone size={22} strokeWidth={2.25} aria-hidden />
        </button>
      ) : null}
    </div>
  );
}
