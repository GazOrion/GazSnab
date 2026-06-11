/** Цифры российского номера: 7 + 10 цифр абонента. */
export function normalizeRuPhoneDigits(input: string): string {
  let digits = input.replace(/\D/g, "");
  if (!digits) return "";

  if (digits.startsWith("8")) {
    digits = `7${digits.slice(1)}`;
  } else if (digits.startsWith("9") && digits.length <= 10) {
    digits = `7${digits}`;
  } else if (!digits.startsWith("7")) {
    digits = `7${digits}`;
  }

  return digits.slice(0, 11);
}

/** Маска ввода: +7 (ХХХ) ХХХ-ХХ-ХХ */
export function formatRuPhoneFromDigits(digits: string): string {
  if (!digits) return "";

  const local = digits.startsWith("7") ? digits.slice(1) : digits;

  if (local.length === 0) return "+7 (";

  let formatted = `+7 (${local.slice(0, 3)}`;

  if (local.length < 3) return formatted;

  formatted += `) ${local.slice(3, 6)}`;

  if (local.length <= 3) return formatted;

  if (local.length <= 6) return formatted;

  formatted += `-${local.slice(6, 8)}`;

  if (local.length <= 8) return formatted;

  return `${formatted}-${local.slice(8, 10)}`;
}

export function formatRuPhoneInput(raw: string): string {
  return formatRuPhoneFromDigits(normalizeRuPhoneDigits(raw));
}

/** Сколько цифр номера (включая ведущую 7) стоит левее позиции курсора. */
export function ruPhoneDigitIndexBeforeCursor(formatted: string, cursor: number): number {
  let count = 0;
  const end = Math.max(0, Math.min(cursor, formatted.length));
  for (let i = 0; i < end; i++) {
    if (/\d/.test(formatted[i] ?? "")) count++;
  }
  return count;
}

/** Позиция курсора сразу после цифры с указанным индексом (0 = «7»). */
export function ruPhoneCursorAfterDigitIndex(formatted: string, digitIndex: number): number {
  if (digitIndex <= 0) {
    const seven = formatted.indexOf("7");
    return seven >= 0 ? seven + 1 : formatted.length;
  }

  let count = 0;
  for (let i = 0; i < formatted.length; i++) {
    if (/\d/.test(formatted[i] ?? "")) {
      count++;
      if (count === digitIndex) return i + 1;
    }
  }
  return formatted.length;
}

/**
 * Удаляет цифры с индексов [fromDigitIndex, toDigitIndex) и возвращает отформатированное значение.
 * Индекс 0 — код страны «7».
 */
export function removeRuPhoneDigits(
  value: string,
  fromDigitIndex: number,
  toDigitIndex: number
): string {
  const digits = normalizeRuPhoneDigits(value);
  if (!digits) return "";

  if (fromDigitIndex < toDigitIndex && fromDigitIndex <= 0 && toDigitIndex >= 1) {
    return "";
  }

  const local = digits.slice(1);
  const localFrom = Math.max(0, fromDigitIndex - 1);
  const localTo = Math.max(localFrom, toDigitIndex - 1);
  const nextLocal = local.slice(0, localFrom) + local.slice(localTo);

  if (!nextLocal) return "";
  return formatRuPhoneFromDigits(`7${nextLocal}`);
}

export function isRuPhoneComplete(value: string): boolean {
  return normalizeRuPhoneDigits(value).length === 11;
}

export const RU_PHONE_PATTERN = String.raw`\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}`;
export const RU_PHONE_PLACEHOLDER = "+7 (ХХХ) ХХХ-ХХ-ХХ";
