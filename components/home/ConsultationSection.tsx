"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Phone, Send } from "lucide-react";
import { ContactMethodField } from "@/components/ContactMethodField";
import { PhoneInput } from "@/components/PhoneInput";
import { company } from "@/lib/company";
import { parseContactMethod } from "@/lib/contact-method";
import { rememberTrackNumber } from "@/lib/order-history";

export function ConsultationSection() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [trackNumber, setTrackNumber] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setTrackNumber("");

    const formData = new FormData(event.currentTarget);

    if (!formData.get("privacyAccepted")) {
      setError("Подтвердите согласие с политикой конфиденциальности.");
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
        customerName: formData.get("customerName"),
        phone: formData.get("phone"),
        contactMethod,
        source: "home"
      })
    });

    setPending(false);

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setError(payload?.error || "Не удалось отправить заявку. Попробуйте позже.");
      return;
    }

    const payload = (await response.json()) as { trackNumber?: string };
    const track = payload.trackNumber ?? "";

    if (track) {
      rememberTrackNumber(track);
    }

    setTrackNumber(track);
    event.currentTarget.reset();
  }

  return (
    <section
      id="consult"
      className="store-promo-section store-consult-section"
      aria-labelledby="consult-title"
    >
      <div className="container store-promo-inner">
        <div className="store-consult-layout">
          <div className="store-consult-intro">
            <h2 id="consult-title">Подберём решение под ваш объект</h2>
            <p className="muted store-promo-lead">
              Оставьте имя и телефон — менеджер перезвонит и уточнит задачу. Можно также позвонить
              напрямую.
            </p>
            <div className="store-consult-contacts">
              <a className="store-consult-phone" href={`tel:${company.phone.replace(/\D/g, "")}`}>
                <Phone size={18} aria-hidden />
                {company.phone}
              </a>
              <a className="store-consult-mail" href={`mailto:${company.email}`}>
                {company.email}
              </a>
            </div>
          </div>

          <article className="store-consult-card">
            {trackNumber ? (
              <div className="store-consult-success" role="status">
                <h3>Заявка принята</h3>
                <p className="muted">
                  Номер для отслеживания: <strong>{trackNumber}</strong>. Менеджер свяжется с вами в
                  ближайшее рабочее время.
                </p>
                <div className="store-consult-success-actions">
                  <Link className="button yellow" href="/zakazy">
                    История заказов
                  </Link>
                  <button
                    type="button"
                    className="button secondary"
                    onClick={() => setTrackNumber("")}
                  >
                    Отправить ещё
                  </button>
                </div>
              </div>
            ) : (
              <>
                <header className="store-consult-card-head">
                  <h3>Оставить заявку</h3>
                  <p className="muted">Перезвоним в рабочее время</p>
                </header>

                {error ? <p className="error store-consult-error">{error}</p> : null}

                <form className="form store-consult-form" onSubmit={onSubmit}>
                  <label className="field">
                    <span>Имя *</span>
                    <input
                      className="input"
                      name="customerName"
                      required
                      disabled={pending}
                      placeholder="Как к вам обращаться"
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
                  <button className="button yellow store-consult-submit" type="submit" disabled={pending}>
                    <Send size={18} aria-hidden />
                    {pending ? "Отправляем…" : "Жду звонка"}
                  </button>
                </form>
              </>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}
