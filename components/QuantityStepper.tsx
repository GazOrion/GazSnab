"use client";

import clsx from "clsx";
import { Minus, Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const MAX_QTY = 9999;

export type QuantityStepperVariant = "default" | "compact" | "equipment" | "accent" | "detailBar";

type Props = {
  quantity: number;
  onChange: (quantity: number) => void;
  disabled?: boolean;
  variant?: QuantityStepperVariant;
  min?: number;
  max?: number;
};

function variantClasses(variant: QuantityStepperVariant) {
  switch (variant) {
    case "equipment":
    case "accent":
      return {
        root: "store-equipment-popular-card__qty",
        btn: "store-equipment-popular-card__qty-btn",
        input: "store-equipment-popular-card__qty-input",
        iconSize: 18
      };
    case "detailBar":
      return {
        root: "product-detail-order-bar__qty",
        btn: "product-detail-order-bar__qty-btn",
        input: "product-detail-order-bar__qty-input",
        iconSize: 16
      };
    case "compact":
      return {
        root: "inline-qty inline-qty-compact",
        btn: "inline-qty-btn",
        input: "inline-qty-input",
        iconSize: 15
      };
    default:
      return {
        root: "qty-stepper",
        btn: "qty-stepper-btn",
        input: "qty-stepper-input",
        iconSize: 16
      };
  }
}

export function QuantityStepper({
  quantity,
  onChange,
  disabled,
  variant = "default",
  min = 1,
  max = MAX_QTY
}: Props) {
  const [draft, setDraft] = useState(String(quantity));
  const classes = variantClasses(variant);

  useEffect(() => {
    setDraft(String(quantity));
  }, [quantity]);

  const commitDraft = useCallback(() => {
    const trimmed = draft.trim();
    if (!trimmed) {
      setDraft(String(quantity));
      return;
    }

    const parsed = Number.parseInt(trimmed, 10);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      onChange(0);
      return;
    }

    const next = Math.min(max, Math.max(min, parsed));
    setDraft(String(next));
    if (next !== quantity) {
      onChange(next);
    }
  }, [draft, max, min, onChange, quantity]);

  const decrease = () => onChange(quantity - 1);
  const increase = () => onChange(Math.min(max, quantity + 1));

  return (
    <div
      className={clsx(classes.root, disabled && "qty-stepper--disabled")}
      role="group"
      aria-label={`Количество: ${quantity}`}
    >
      <button
        type="button"
        className={classes.btn}
        aria-label="Уменьшить количество"
        disabled={disabled}
        onClick={decrease}
      >
        <Minus
          size={classes.iconSize}
          strokeWidth={variant === "equipment" || variant === "accent" ? 2.5 : 2}
          aria-hidden
        />
      </button>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        className={classes.input}
        value={draft}
        disabled={disabled}
        aria-label="Количество"
        onChange={(event) => setDraft(event.target.value.replace(/\D/g, ""))}
        onBlur={commitDraft}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            commitDraft();
            event.currentTarget.blur();
          }
        }}
      />
      <button
        type="button"
        className={classes.btn}
        aria-label="Увеличить количество"
        disabled={disabled}
        onClick={increase}
      >
        <Plus
          size={classes.iconSize}
          strokeWidth={variant === "equipment" || variant === "accent" ? 2.5 : 2}
          aria-hidden
        />
      </button>
    </div>
  );
}
