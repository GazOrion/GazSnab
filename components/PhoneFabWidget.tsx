"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { CheckCircle2, Phone, X } from "lucide-react";
import { PhoneInput } from "@/components/PhoneInput";
import { rememberTrackNumber } from "@/lib/order-history";
import { isRuPhoneComplete, RU_PHONE_PLACEHOLDER } from "@/lib/phone-mask";

type Phase = "form" | "success";

export function PhoneFabWidget() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("form");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [formKey, setFormKey] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function close() {
    setOpen(false);
  }

  function toggleOpen() {
    setOpen((value) => {
      if (value) return false;
      setPhase("form");
      setError("");
      return true;
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const phone = String(formData.get("phone") ?? "").trim();

    if (!formData.get("privacyAccepted")) {
      setError("Подтвердите согласие с политикой конфиденциальности.");
      return;
    }

    if (!isRuPhoneComplete(phone)) {
      setError(`Укажите телефон в формате ${RU_PHONE_PLACEHOLDER}.`);
      return;
    }

    setPending(true);

    const response = await fetch("/api/consultation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone,
        source: "phone-fab"
      })
    });

    setPending(false);

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setError(payload?.error || "Не удалось отправить. Попробуйте позже.");
      return;
    }

    const payload = (await response.json()) as { trackNumber?: string };
    if (payload.trackNumber) {
      rememberTrackNumber(payload.trackNumber);
    }

    form.reset();
    setFormKey((key) => key + 1);
    setPhase("success");
  }

  return (
    <div className="phone-fab" ref={rootRef}>
      {open ? (
        <div
          className={`phone-fab__panel phone-fab__panel--${phase}`}
          role="dialog"
          aria-labelledby="phone-fab-title"
        >
          <button
            type="button"
            className="phone-fab__panel-close"
            aria-label="Закрыть"
            onClick={close}
          >
            <X size={16} strokeWidth={2.5} aria-hidden />
          </button>

          {phase === "success" ? (
            <div className="phone-fab__success" role="status">
              <CheckCircle2 className="phone-fab__success-icon" size={32} strokeWidth={2} aria-hidden />
              <p id="phone-fab-title" className="phone-fab__title">Заявка принята</p>
              <p className="phone-fab__text">Мы перезвоним вам в ближайшее рабочее время.</p>
            </div>
          ) : (
            <>
              <h2 id="phone-fab-title" className="phone-fab__title">Заказать звонок</h2>
              <p className="phone-fab__text">Оставьте номер — мы перезвоним.</p>

              {error ? (
                <p className="phone-fab__error" role="alert">{error}</p>
              ) : null}

              <form key={formKey} className="phone-fab__form" onSubmit={onSubmit}>
                <label className="phone-fab__field">
                  <span>Ваш телефон *</span>
                  <PhoneInput
                    className="phone-fab__input"
                    name="phone"
                    required
                    disabled={pending}
                  />
                </label>
                <label className="phone-fab__consent">
                  <input
                    className="phone-fab__consent-check"
                    type="checkbox"
                    name="privacyAccepted"
                    value="yes"
                    required
                    disabled={pending}
                  />
                  <span className="phone-fab__consent-text">
                    Согласен с{" "}
                    <Link href="/politika-konfidencialnosti" target="_blank" rel="noopener noreferrer">
                      политикой конфиденциальности
                    </Link>
                  </span>
                </label>
                <button className="phone-fab__submit" type="submit" disabled={pending}>
                  {pending ? "Отправляем…" : "Жду звонка"}
                </button>
              </form>
            </>
          )}
        </div>
      ) : null}

      <button
        type="button"
        className={`phone-fab__btn${open ? " is-open" : ""}`}
        aria-label={open ? "Закрыть" : "Заказать звонок"}
        aria-expanded={open}
        onClick={toggleOpen}
      >
        <Phone size={22} strokeWidth={2.25} aria-hidden />
      </button>
    </div>
  );
}
