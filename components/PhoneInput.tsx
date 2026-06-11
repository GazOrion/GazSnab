"use client";

import {
  type ClipboardEvent,
  type FocusEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
  useCallback,
  useRef,
  useState
} from "react";
import {
  formatRuPhoneInput,
  isRuPhoneComplete,
  removeRuPhoneDigits,
  ruPhoneCursorAfterDigitIndex,
  ruPhoneDigitIndexBeforeCursor,
  RU_PHONE_PATTERN,
  RU_PHONE_PLACEHOLDER
} from "@/lib/phone-mask";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "defaultValue" | "onChange"> & {
  name: string;
};

const NAV_KEYS = new Set([
  "Backspace",
  "Delete",
  "Tab",
  "ArrowLeft",
  "ArrowRight",
  "Home",
  "End"
]);

export function PhoneInput({
  name,
  className,
  disabled,
  required,
  placeholder = RU_PHONE_PLACEHOLDER,
  onBlur,
  onFocus,
  ...rest
}: Props) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const applyValue = useCallback((next: string, cursorDigitIndex?: number) => {
    setValue(next);
    if (cursorDigitIndex === undefined) return;

    requestAnimationFrame(() => {
      const input = inputRef.current;
      if (!input) return;
      const pos = ruPhoneCursorAfterDigitIndex(next, cursorDigitIndex);
      input.setSelectionRange(pos, pos);
    });
  }, []);

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (!value) applyValue("+7 (");
    onFocus?.(event);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (value === "+7 (" || value === "+7") applyValue("");
    onBlur?.(event);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    applyValue(formatRuPhoneInput(event.target.value));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;

    if (event.key === "Backspace" || event.key === "Delete") {
      if (!value || value === "+7 (") {
        if (event.key === "Backspace" && value) {
          event.preventDefault();
          applyValue("");
        }
        return;
      }

      const input = event.currentTarget;
      const selectionStart = input.selectionStart ?? 0;
      const selectionEnd = input.selectionEnd ?? 0;
      const digitStart = ruPhoneDigitIndexBeforeCursor(value, selectionStart);
      const digitEnd = ruPhoneDigitIndexBeforeCursor(value, selectionEnd);

      let removeFrom: number;
      let removeTo: number;
      let cursorDigit: number;

      if (selectionStart !== selectionEnd) {
        removeFrom = digitStart;
        removeTo = digitEnd;
        cursorDigit = removeFrom;
      } else if (event.key === "Backspace") {
        if (digitStart <= 1) {
          event.preventDefault();
          applyValue("");
          return;
        }
        removeFrom = digitStart - 1;
        removeTo = digitStart;
        cursorDigit = removeFrom;
      } else {
        const digitsLen = value.replace(/\D/g, "").length;
        if (digitStart >= digitsLen) return;
        removeFrom = digitStart;
        removeTo = digitStart + 1;
        cursorDigit = removeFrom;
      }

      event.preventDefault();
      const next = removeRuPhoneDigits(value, removeFrom, removeTo);
      applyValue(next, next ? cursorDigit : undefined);
      return;
    }

    if (NAV_KEYS.has(event.key)) return;

    if (!/^\d$/.test(event.key)) {
      event.preventDefault();
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text");
    applyValue(formatRuPhoneInput(`${value}${pasted}`));
  };

  return (
    <input
      {...rest}
      ref={inputRef}
      className={className}
      name={name}
      type="tel"
      inputMode="numeric"
      autoComplete="tel"
      disabled={disabled}
      required={required}
      value={value}
      placeholder={placeholder}
      pattern={RU_PHONE_PATTERN}
      title={`Введите номер в формате ${RU_PHONE_PLACEHOLDER}`}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      onFocus={handleFocus}
      onBlur={handleBlur}
      aria-invalid={required && value.length > 0 && !isRuPhoneComplete(value) ? true : undefined}
    />
  );
}
