"use client";

import {
  type ClipboardEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
  useCallback,
  useState
} from "react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "defaultValue" | "onChange">;

const NAV_KEYS = new Set([
  "Backspace",
  "Delete",
  "Tab",
  "ArrowLeft",
  "ArrowRight",
  "Home",
  "End"
]);

/** Имя: буквы (кириллица/латиница), пробел, дефис, апостроф. */
export function sanitizePersonName(raw: string): string {
  return raw.replace(/[0-9]/g, "").replace(/[^\p{L}\s\-'.]/gu, "");
}

export function NameInput({ className, disabled, required, onBlur, onFocus, ...rest }: Props) {
  const [value, setValue] = useState("");

  const applyValue = useCallback((next: string) => {
    setValue(sanitizePersonName(next));
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (NAV_KEYS.has(event.key)) return;
    if (/^\d$/.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    applyValue(event.target.value);
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    applyValue(event.clipboardData.getData("text"));
  };

  return (
    <input
      {...rest}
      className={className}
      type="text"
      autoComplete="name"
      disabled={disabled}
      required={required}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}
