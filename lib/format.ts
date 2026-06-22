export const ON_REQUEST_PRICE_LABEL = "По запросу";

export function formatPrice(value: number | string) {
  const amount = Number(value);

  if (!Number.isFinite(amount) || amount <= 0) {
    return ON_REQUEST_PRICE_LABEL;
  }

  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0
  }).format(amount);
}
