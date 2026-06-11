"use client";

import { useRouter } from "next/navigation";
import { contactMethodLabel } from "@/lib/contact-method";
import { formatPrice } from "@/lib/format";

type Order = {
  id: string;
  customerName: string;
  phone: string;
  contactMethod: string;
  email: string | null;
  company: string | null;
  comment: string | null;
  status: string;
  total: number;
  createdAt: string;
  items: {
    id: string;
    title: string;
    quantity: number;
    unit: string;
    price: number;
  }[];
};

const statuses = [
  ["NEW", "Новый"],
  ["IN_PROGRESS", "В работе"],
  ["DONE", "Завершен"],
  ["CANCELED", "Отменен"]
];

export function AdminOrders({ orders }: { orders: Order[] }) {
  const router = useRouter();

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/admin/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    router.refresh();
  }

  return (
    <section className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>Заказ</th>
            <th>Клиент</th>
            <th>Товары</th>
            <th>Сумма</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>
                <strong>#{order.id.slice(-6).toUpperCase()}</strong>
                <p className="muted">{new Date(order.createdAt).toLocaleString("ru-RU")}</p>
              </td>
              <td>
                <strong>{order.customerName}</strong>
                <p className="muted">{order.phone}</p>
                <p className="muted">Связь: {contactMethodLabel(order.contactMethod)}</p>
                {order.email && <p className="muted">{order.email}</p>}
                {order.company && <p>{order.company}</p>}
                {order.comment && <p className="muted">{order.comment}</p>}
              </td>
              <td>
                {order.items.map((item) => (
                  <p key={item.id}>
                    {item.title} x {item.quantity} {item.unit}
                  </p>
                ))}
              </td>
              <td>{formatPrice(order.total)}</td>
              <td>
                <select
                  className="select"
                  value={order.status}
                  onChange={(event) => updateStatus(order.id, event.target.value)}
                >
                  {statuses.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
