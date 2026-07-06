"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { parseContactMethod } from "@/lib/contact-method";
import { isRuPhoneComplete, RU_PHONE_PLACEHOLDER } from "@/lib/phone-mask";
import { CartItemsList } from "./CartItemsList";
import { CartRequestDrawer } from "./CartRequestDrawer";
import { EmptyCartState } from "./EmptyCartState";
import { OrderSuccessModal } from "./OrderSuccessModal";
import { RequestForm } from "./RequestForm";

export function CartPage() {
  const { items, clear } = useCart();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!items.length) {
      setError("Добавьте позиции из каталога.");
      return;
    }

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

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName,
        phone,
        contactMethod,
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity
        }))
      })
    });

    setPending(false);

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setError(payload?.error || "Не удалось оформить заявку.");
      return;
    }

    setSuccessOpen(true);
    setCheckoutOpen(false);
    clear();
    form.reset();
    setFormKey((key) => key + 1);
  }

  function openCheckout() {
    setError("");
    setCheckoutOpen(true);
  }

  function closeSuccess() {
    setSuccessOpen(false);
  }

  return (
    <section className="section cart-page-v2">
      <section className="container">
        <nav className="breadcrumbs" aria-label="Хлебные крошки">
          <Link href="/">Главная</Link>
          <span aria-hidden>/</span>
          <span>Корзина</span>
        </nav>
        <h1 className="cart-page-title">Корзина</h1>

        {items.length === 0 ? (
          <EmptyCartState />
        ) : (
          <section className="cart-page-layout">
            <CartItemsList disabled={pending} onClearCart={clear} onOpenCheckout={openCheckout} />
            <RequestForm key={formKey} pending={pending} error={error} onSubmit={submitOrder} />
          </section>
        )}
      </section>

      <CartRequestDrawer
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        pending={pending}
        error={error}
        formKey={formKey}
        onSubmit={submitOrder}
      />
      <OrderSuccessModal open={successOpen} onClose={closeSuccess} />
    </section>
  );
}
