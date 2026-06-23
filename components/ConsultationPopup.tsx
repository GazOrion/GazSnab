"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { ContactMethodField } from "@/components/ContactMethodField";
import { NameInput } from "@/components/NameInput";
import { PhoneInput } from "@/components/PhoneInput";
import { parseContactMethod } from "@/lib/contact-method";
import {
  CONSULTATION_POPUP_ALWAYS_VISIBLE,
  CONSULTATION_POPUP_DELAY_MS,
  CONSULTATION_POPUP_IMAGE_SRC,
  CONSULTATION_POPUP_STORAGE_KEY
} from "@/lib/consultation-popup";
import { isRuPhoneComplete, RU_PHONE_PLACEHOLDER } from "@/lib/phone-mask";

type Phase = "promo" | "form" | "success";

export function ConsultationPopup() {
  const [open, setOpen] = useState(CONSULTATION_POPUP_ALWAYS_VISIBLE);
  const [phase, setPhase] = useState<Phase>("promo");
  const [showImage, setShowImage] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [formKey, setFormKey] = useState(0);

  const close = useCallback(() => {
    setOpen(false);
    if (CONSULTATION_POPUP_ALWAYS_VISIBLE) return;
    try {
      sessionStorage.setItem(CONSULTATION_POPUP_STORAGE_KEY, "1");
    } catch {
      /* sessionStorage недоступен */
    }
  }, []);

  useEffect(() => {
    if (CONSULTATION_POPUP_ALWAYS_VISIBLE) return;

    try {
      if (sessionStorage.getItem(CONSULTATION_POPUP_STORAGE_KEY)) return;
    } catch {
      return;
    }

    const timer = window.setTimeout(() => setOpen(true), CONSULTATION_POPUP_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const customerName = String(formData.get("customerName") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();

    if (!formData.get("privacyAccepted")) {
      setError("Подтвердите согласие с политикой конфиденциальности.");
      return;
    }

    if (!isRuPhoneComplete(phone)) {
      setError(`Укажите телефон в формате ${RU_PHONE_PLACEHOLDER}.`);
      return;
    }

    const contactMethod = parseContactMethod(formData.get("contactMethod"));
    if (!contactMethod) {
      setError("Выберите удобный способ связи.");
      return;
    }

    setPending(true);

    const response = await fetch("/api/consultation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName,
        phone,
        contactMethod,
        source: "popup"
      })
    });

    setPending(false);

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setError(payload?.error || "Не удалось отправить. Попробуйте позже.");
      return;
    }

    form.reset();
    setFormKey((key) => key + 1);
    setPhase("success");
  }

  if (!open) return null;

  const titleId =
    phase === "success"
      ? "consult-popup-success-title"
      : phase === "form"
        ? "consult-popup-form-title"
        : "consult-popup-title";

  return (
    <aside
      className={`consult-popup consult-popup--${phase}`}
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
    >
      <div className={`consult-popup__card consult-popup__card--${phase}`}>
        <button
          type="button"
          className="consult-popup__close"
          aria-label="Закрыть"
          onClick={close}
        >
          <X size={20} strokeWidth={2.5} aria-hidden />
        </button>

        <div className="consult-popup__content">
          <div
            className={`consult-popup__stage consult-popup__stage--promo${phase === "promo" ? " is-active" : ""}`}
            aria-hidden={phase !== "promo"}
          >
            <h2 id="consult-popup-title" className="consult-popup__title">
              Нужна помощь с подбором?
            </h2>
            <p className="consult-popup__text">
              Наши специалисты помогут вам найти оптимальное решение
            </p>
            <button
              type="button"
              className="consult-popup__cta"
              onClick={() => {
                setError("");
                setPhase("form");
              }}
            >
              Получить консультацию
            </button>
          </div>

          <div
            className={`consult-popup__stage consult-popup__stage--form${phase === "form" ? " is-active" : ""}`}
            aria-hidden={phase !== "form"}
          >
            <h2 id="consult-popup-form-title" className="consult-popup__title consult-popup__title--compact">
              Консультация
            </h2>

            {error ? (
              <p className="consult-popup__error" role="alert">
                {error}
              </p>
            ) : null}

            <form
              key={formKey}
              className="consult-popup__form"
              onSubmit={onSubmit}
            >
              <label className="consult-popup__field">
                <span>Имя *</span>
                <NameInput
                  className="consult-popup__input"
                  name="customerName"
                  required
                  disabled={pending}
                  minLength={2}
                  placeholder="Ваше имя"
                />
              </label>
              <label className="consult-popup__field">
                <span>Телефон *</span>
                <PhoneInput
                  className="consult-popup__input"
                  name="phone"
                  required
                  disabled={pending}
                />
              </label>
              <ContactMethodField
                fieldClassName="consult-popup__field"
                selectClassName="consult-popup__input"
                disabled={pending}
              />
              <label className="consult-popup__consent">
                <input
                  className="consult-popup__consent-check"
                  type="checkbox"
                  name="privacyAccepted"
                  value="yes"
                  required
                  disabled={pending}
                />
                <span className="consult-popup__consent-text">
                  Согласен с{" "}
                  <Link href="/politika-konfidencialnosti" target="_blank" rel="noopener noreferrer">
                    политикой конфиденциальности
                  </Link>
                </span>
              </label>
              <button
                className="consult-popup__cta consult-popup__cta--submit"
                type="submit"
                disabled={pending}
              >
                {pending ? "Отправляем…" : "Отправить"}
              </button>
            </form>
          </div>

          <div
            className={`consult-popup__stage consult-popup__stage--success${phase === "success" ? " is-active" : ""}`}
            aria-hidden={phase !== "success"}
          >
            <div className="consult-popup__success" role="status">
              <CheckCircle2 className="consult-popup__success-icon" size={36} strokeWidth={2} aria-hidden />
              <p id="consult-popup-success-title" className="consult-popup__thanks">
                Наш специалист свяжется с Вами в ближайшее время!
              </p>
            </div>
          </div>
        </div>

        {showImage ? (
          <div className="consult-popup__media" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element -- локальный файл из media/ */}
            <img
              className="consult-popup__img"
              src={CONSULTATION_POPUP_IMAGE_SRC}
              alt=""
              decoding="async"
              onError={() => setShowImage(false)}
            />
          </div>
        ) : null}
      </div>
    </aside>
  );
}
