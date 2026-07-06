"use client";

import clsx from "clsx";
import { ChevronLeft } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { RequestForm } from "./RequestForm";

type Props = {
  open: boolean;
  onClose: () => void;
  pending: boolean;
  error?: string;
  formKey: number;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function CartRequestDrawer({ open, onClose, pending, error, formKey, onSubmit }: Props) {
  const [render, setRender] = useState(open);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (open) {
      setRender(true);
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

  if (!render || typeof document === "undefined") return null;

  return createPortal(
    <div
      className={clsx("cart-request-drawer-root", active && "cart-request-drawer-root--open")}
      role="presentation"
      aria-hidden={!active}
    >
      <button
        type="button"
        className="cart-request-drawer-backdrop"
        aria-label="Закрыть оформление заявки"
        onClick={onClose}
      />
      <aside className="cart-request-drawer" aria-label="Оформление заявки">
        <header className="cart-request-drawer__head">
          <button type="button" className="cart-request-drawer__back" onClick={onClose}>
            <ChevronLeft size={22} aria-hidden />
            <span>Назад</span>
          </button>
          <h2 className="cart-request-drawer__title">Оформление заявки</h2>
        </header>
        <div className="cart-request-drawer__body">
          <RequestForm
            key={formKey}
            embedded
            pending={pending}
            error={error}
            onSubmit={onSubmit}
          />
        </div>
      </aside>
    </div>,
    document.body
  );
}
