"use client";

import Link from "next/link";
import clsx from "clsx";
import { CheckCircle2, X } from "lucide-react";
import { FormEvent, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ContactMethodField } from "@/components/ContactMethodField";
import { NameInput } from "@/components/NameInput";
import { PhoneInput } from "@/components/PhoneInput";
import { parseContactMethod, type ContactMethod } from "@/lib/contact-method";
import { isRuPhoneComplete, RU_PHONE_PLACEHOLDER } from "@/lib/phone-mask";

type Phase = "form" | "success";

export type ContactRequestPayload = {
  customerName?: string;
  phone: string;
  contactMethod: ContactMethod;
};

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: ReactNode;
  showName?: boolean;
  submitLabel: string;
  successTitle?: string;
  successText?: string;
  onSubmit: (payload: ContactRequestPayload) => Promise<{ ok: true } | { ok: false; error: string }>;
};

export function ContactRequestModal({
  open,
  onClose,
  title,
  description,
  showName = true,
  submitLabel,
  successTitle = "Заявка принята",
  successText = "Мы свяжемся с вами в ближайшее рабочее время.",
  onSubmit
}: Props) {
  const [render, setRender] = useState(open);
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState<Phase>("form");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    if (open) {
      setRender(true);
      setPhase("form");
      setError("");
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

  function handleClose() {
    onClose();
    window.setTimeout(() => {
      setPhase("form");
      setError("");
    }, 280);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
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

    if (showName && customerName.length < 2) {
      setError("Укажите имя.");
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
    const result = await onSubmit({
      ...(showName ? { customerName } : {}),
      phone,
      contactMethod
    });
    setPending(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    form.reset();
    setFormKey((key) => key + 1);
    setPhase("success");
  }

  if (!render || typeof document === "undefined") return null;

  const titleId = phase === "success" ? "contact-request-success-title" : "contact-request-form-title";

  return createPortal(
    <section
      className={clsx("order-success-modal", active && "order-success-modal-open")}
      aria-hidden={!active}
      onClick={handleClose}
    >
      <div className="order-success-backdrop" aria-hidden />
      <article
        className={clsx(
          "order-success-dialog",
          phase === "form" && "order-success-dialog--form"
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="order-success-close icon-button"
          aria-label="Закрыть"
          onClick={handleClose}
        >
          <X size={20} />
        </button>

        {phase === "success" ? (
          <>
            <span className="order-success-icon" aria-hidden>
              <CheckCircle2 size={52} strokeWidth={1.5} />
            </span>
            <h2 id={titleId}>{successTitle}</h2>
            <p className="muted">{successText}</p>
          </>
        ) : (
          <>
            <h2 id={titleId} className="contact-request-modal__title">
              {title}
            </h2>
            {description ? <p className="contact-request-modal__desc muted">{description}</p> : null}

            {error ? (
              <p className="contact-request-modal__error" role="alert">
                {error}
              </p>
            ) : null}

            <form key={formKey} className="contact-request-modal__form" onSubmit={handleSubmit}>
              {showName ? (
                <label className="contact-request-modal__field">
                  <span>Имя *</span>
                  <NameInput
                    className="contact-request-modal__input"
                    name="customerName"
                    required
                    disabled={pending}
                    minLength={2}
                    placeholder="Введите ваше имя"
                  />
                </label>
              ) : null}
              <label className="contact-request-modal__field">
                <span>Телефон *</span>
                <PhoneInput className="contact-request-modal__input" name="phone" required disabled={pending} />
              </label>
              <ContactMethodField
                fieldClassName="contact-request-modal__field"
                selectClassName="contact-request-modal__input"
                disabled={pending}
              />
              <label className="contact-request-modal__consent">
                <input
                  className="contact-request-modal__consent-check"
                  type="checkbox"
                  name="privacyAccepted"
                  value="yes"
                  required
                  disabled={pending}
                />
                <span className="contact-request-modal__consent-text">
                  Согласен с{" "}
                  <Link href="/politika-konfidencialnosti" target="_blank" rel="noopener noreferrer">
                    политикой конфиденциальности
                  </Link>
                </span>
              </label>
              <button className="button contact-request-modal__submit" type="submit" disabled={pending}>
                {pending ? "Отправляем…" : submitLabel}
              </button>
            </form>
          </>
        )}
      </article>
    </section>,
    document.body
  );
}
