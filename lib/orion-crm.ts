import type { ContactMethod } from "@/lib/contact-method";
import { normalizeRuPhoneDigits } from "@/lib/phone-mask";
import { absoluteUrl, getSiteUrl } from "@/lib/site-url";

export const ORION_CRM_TARGET_SITE = "GAZSNAB" as const;

export const ORION_CRM_CONTACT_METHODS = ["PHONE", "WHATSAPP", "TELEGRAM", "MAX"] as const;

export type OrionCrmContactMethod = (typeof ORION_CRM_CONTACT_METHODS)[number];

export type OrionCrmCartItem = {
  name: string;
  quantity: number;
  price: number;
  article?: string;
  url?: string;
};

export type OrionCrmRequestPayload = {
  target_site: typeof ORION_CRM_TARGET_SITE;
  full_name: string;
  phone: string;
  preferred_contact_method: OrionCrmContactMethod;
  source?: string;
  email?: string;
  message?: string;
  website?: string;
  cart?: {
    total: number;
    items: OrionCrmCartItem[];
  };
  meta?: Record<string, string>;
};

export type OrionCrmRequestSuccess = {
  success: true;
  id: string;
  created_at: string;
  target_site: string;
  preferred_contact_method: string;
};

const DEFAULT_API_URL = "https://gaz-orion.ru/api/public/requests";

export function getOrionCrmApiUrl() {
  return process.env.ORION_CRM_API_URL?.trim() || DEFAULT_API_URL;
}

export function getOrionCrmApiKey() {
  return process.env.ORION_CRM_API_KEY?.trim() ?? "";
}

export function isOrionCrmConfigured() {
  return Boolean(getOrionCrmApiKey());
}

export function mapContactMethodToOrionCrm(method: ContactMethod): OrionCrmContactMethod {
  switch (method) {
    case "max":
      return "MAX";
    case "telegram":
      return "TELEGRAM";
    default:
      return "PHONE";
  }
}

export function formatPhoneForOrionCrm(phone: string) {
  const digits = normalizeRuPhoneDigits(phone);
  if (digits.length !== 11) {
    return phone.trim();
  }
  return `+7${digits.slice(1)}`;
}

export async function submitOrionCrmRequest(payload: OrionCrmRequestPayload) {
  const apiKey = getOrionCrmApiKey();
  if (!apiKey) {
    throw new Error("ORION_CRM_API_KEY is not configured");
  }

  const response = await fetch(getOrionCrmApiUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey
    },
    body: JSON.stringify(payload)
  });

  const data: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "error" in data &&
      typeof (data as { error: unknown }).error === "string"
        ? (data as { error: string }).error
        : `Orion CRM API error (${response.status})`;

    throw new Error(message);
  }

  return data as OrionCrmRequestSuccess;
}

type OrderCrmItem = {
  title: string;
  price: number | { toString(): string };
  quantity: number;
  slug: string;
};

export async function syncCartOrderToOrionCrm(params: {
  customerName: string;
  phone: string;
  contactMethod: ContactMethod;
  total: number;
  email?: string | null;
  company?: string | null;
  comment?: string | null;
  items: OrderCrmItem[];
}) {
  if (!isOrionCrmConfigured()) {
    console.warn("[orion-crm] ORION_CRM_API_KEY is not configured, skipping cart order sync");
    return null;
  }

  const messageParts: string[] = [];
  if (params.company?.trim()) {
    messageParts.push(`Организация: ${params.company.trim()}`);
  }
  if (params.comment?.trim()) {
    messageParts.push(params.comment.trim());
  }

  return submitOrionCrmRequest({
    target_site: ORION_CRM_TARGET_SITE,
    full_name: params.customerName,
    phone: formatPhoneForOrionCrm(params.phone),
    preferred_contact_method: mapContactMethodToOrionCrm(params.contactMethod),
    source: "Корзина — оформление заявки",
    website: getSiteUrl(),
    email: params.email?.trim() || undefined,
    message: messageParts.length ? messageParts.join("\n") : undefined,
    cart: {
      total: Number(params.total),
      items: params.items.map((item) => ({
        name: item.title,
        quantity: item.quantity,
        price: Number(item.price) * item.quantity,
        article: item.slug.toUpperCase(),
        url: absoluteUrl(`/products/${item.slug}`)
      }))
    }
  });
}

const CONSULTATION_SOURCE_LABELS = {
  home: "Главная — консультация",
  popup: "Виджет — консультация",
  "phone-fab": "Обратный звонок"
} as const;

export async function syncConsultationToOrionCrm(params: {
  customerName: string;
  phone: string;
  contactMethod: ContactMethod;
  source: keyof typeof CONSULTATION_SOURCE_LABELS;
  message: string;
}) {
  if (!isOrionCrmConfigured()) {
    console.warn("[orion-crm] ORION_CRM_API_KEY is not configured, skipping consultation sync");
    return null;
  }

  return submitOrionCrmRequest({
    target_site: ORION_CRM_TARGET_SITE,
    full_name: params.customerName,
    phone: formatPhoneForOrionCrm(params.phone),
    preferred_contact_method: mapContactMethodToOrionCrm(params.contactMethod),
    source: CONSULTATION_SOURCE_LABELS[params.source],
    website: getSiteUrl(),
    message: params.message,
    meta: {
      form: params.source
    }
  });
}
