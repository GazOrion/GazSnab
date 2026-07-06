"use client";

import { Lock, Send } from "lucide-react";
import Link from "next/link";
import { FormEvent } from "react";
import { ContactMethodField } from "@/components/ContactMethodField";
import { NameInput } from "@/components/NameInput";
import { PhoneInput } from "@/components/PhoneInput";
import { CATALOG_ROUTES } from "@/lib/catalog";

type Props = {
  pending: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  embedded?: boolean;
  error?: string;
};

export function RequestForm({ pending, onSubmit, embedded = false, error }: Props) {
  const content = (
    <>
      {!embedded ? (
        <header className="cart-form-header">
          <h2>Оформление заявки</h2>
          <p className="muted">
            Менеджер уточнит комплектацию и пришлёт счёт или коммерческое предложение.
          </p>
        </header>
      ) : (
        <p className="cart-form-intro muted">
          Менеджер уточнит комплектацию и пришлёт счёт или коммерческое предложение.
        </p>
      )}

      {error ? <p className="error cart-page-alert">{error}</p> : null}

      <form className="form cart-request-form" onSubmit={onSubmit}>
        <label className="field">
          <span>Имя *</span>
          <NameInput
            className="input"
            name="customerName"
            required
            disabled={pending}
            minLength={2}
            placeholder="Введите ваше имя"
          />
        </label>
        <label className="field">
          <span>Телефон *</span>
          <PhoneInput className="input" name="phone" required disabled={pending} />
        </label>
        <ContactMethodField disabled={pending} />

        <label className="cart-consent">
          <input
            className="cart-consent__checkbox"
            type="checkbox"
            name="privacyAccepted"
            value="yes"
            required
            disabled={pending}
          />
          <span className="cart-consent__text">
            Согласен с{" "}
            <Link href="/politika-konfidencialnosti" target="_blank" rel="noopener noreferrer">
              политикой конфиденциальности
            </Link>
          </span>
        </label>

        <button className="button cart-submit-btn" type="submit" disabled={pending}>
          <Send size={18} aria-hidden />
          {pending ? "Отправляем…" : "Отправить заявку"}
        </button>
        <Link className="button secondary cart-continue-btn" href={CATALOG_ROUTES.equipment}>
          Продолжить подбор
        </Link>

        <p className="cart-privacy muted">
          <Lock size={14} aria-hidden />
          Ваши данные защищены и не передаются третьим лицам
        </p>
      </form>
    </>
  );

  if (embedded) {
    return content;
  }

  return <article className="cart-card cart-card-form">{content}</article>;
}
