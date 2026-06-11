import type { OrderStatus } from "@prisma/client";

/** Статусы для клиента: Ожидает / В работе / Закрыта */
export const orderStatusLabel: Record<OrderStatus, string> = {
  NEW: "Ожидает",
  IN_PROGRESS: "В работе",
  DONE: "Закрыта",
  CANCELED: "Закрыта"
};

export function orderStatusClass(status: OrderStatus) {
  switch (status) {
    case "NEW":
      return "order-status-pending";
    case "IN_PROGRESS":
      return "order-status-progress";
    case "DONE":
    case "CANCELED":
      return "order-status-closed";
    default:
      return "";
  }
}
