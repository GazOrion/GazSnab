import { z } from "zod";

export const CONTACT_METHOD_VALUES = ["phone", "max", "telegram"] as const;

export type ContactMethod = (typeof CONTACT_METHOD_VALUES)[number];

export const CONTACT_METHOD_OPTIONS: ReadonlyArray<{ value: ContactMethod; label: string }> = [
  { value: "phone", label: "Телефон" },
  { value: "max", label: "MAX" },
  { value: "telegram", label: "Телеграм" }
];

export const contactMethodSchema = z.enum(CONTACT_METHOD_VALUES);

const LABEL_BY_VALUE = Object.fromEntries(
  CONTACT_METHOD_OPTIONS.map((option) => [option.value, option.label])
) as Record<ContactMethod, string>;

export function contactMethodLabel(value: string | null | undefined): string {
  if (!value) return CONTACT_METHOD_OPTIONS[0].label;
  return LABEL_BY_VALUE[value as ContactMethod] ?? value;
}

export function parseContactMethod(value: FormDataEntryValue | null): ContactMethod | null {
  const raw = String(value ?? "").trim();
  const parsed = contactMethodSchema.safeParse(raw);
  return parsed.success ? parsed.data : null;
}
