"use client";

import clsx from "clsx";
import { type SelectHTMLAttributes, useState } from "react";
import { CONTACT_METHOD_OPTIONS } from "@/lib/contact-method";

type Props = Omit<SelectHTMLAttributes<HTMLSelectElement>, "name" | "children"> & {
  name?: string;
  label?: string;
  selectClassName?: string;
  fieldClassName?: string;
};

/** Шеврон «птичка» (V), не галочка и не залитый треугольник. */
function ContactMethodChevron({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M2.5 5.25L7 9.75L11.5 5.25"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ContactMethodField({
  name = "contactMethod",
  label = "Удобный способ связи",
  selectClassName = "input",
  fieldClassName = "field",
  required = true,
  disabled,
  defaultValue = "phone",
  onFocus,
  onBlur,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  onChange,
  ...rest
}: Props) {
  const [open, setOpen] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <label className={clsx("contact-method-field", fieldClassName)}>
      <span>
        {label}
        {required ? " *" : ""}
      </span>
      <div
        className={clsx(
          "contact-method-field__control",
          open && "is-open",
          pressed && "is-pressed"
        )}
      >
        <select
          {...rest}
          className={clsx("contact-method-field__select", selectClassName)}
          name={name}
          required={required}
          disabled={disabled}
          defaultValue={defaultValue}
          onFocus={(event) => {
            setOpen(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setOpen(false);
            setPressed(false);
            onBlur?.(event);
          }}
          onChange={(event) => {
            setOpen(false);
            setPressed(false);
            onChange?.(event);
          }}
          onMouseDown={(event) => {
            if (open) {
              setOpen(false);
            } else {
              setPressed(true);
            }
            onMouseDown?.(event);
          }}
          onMouseUp={(event) => {
            setPressed(false);
            onMouseUp?.(event);
          }}
          onMouseLeave={(event) => {
            setPressed(false);
            onMouseLeave?.(event);
          }}
        >
          {CONTACT_METHOD_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="contact-method-field__icon" aria-hidden>
          <ContactMethodChevron />
        </span>
      </div>
    </label>
  );
}
