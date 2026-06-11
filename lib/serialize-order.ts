import type { Order, OrderItem, Product } from "@prisma/client";

type OrderItemWithProduct = OrderItem & {
  product: Pick<Product, "slug" | "imageUrl"> | null;
};

export type OrderWithItems = Order & {
  items: OrderItemWithProduct[];
};

export type PublicOrderItem = {
  id: string;
  productId: string;
  title: string;
  slug: string | null;
  imageUrl: string | null;
  quantity: number;
  unit: string;
  price: number;
  lineTotal: number;
};

export type PublicOrder = {
  id: string;
  trackNumber: string;
  customerName: string;
  phone: string;
  contactMethod: string;
  email: string | null;
  company: string | null;
  comment: string | null;
  status: Order["status"];
  total: number;
  createdAt: string;
  items: PublicOrderItem[];
};

export function serializeOrder(order: OrderWithItems): PublicOrder {
  return {
    id: order.id,
    trackNumber: order.trackNumber,
    customerName: order.customerName,
    phone: order.phone,
    contactMethod: order.contactMethod,
    email: order.email,
    company: order.company,
    comment: order.comment,
    status: order.status,
    total: Number(order.total),
    createdAt: order.createdAt.toISOString(),
    items: order.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      title: item.title,
      slug: item.product?.slug ?? null,
      imageUrl: item.product?.imageUrl ?? null,
      quantity: item.quantity,
      unit: item.unit,
      price: Number(item.price),
      lineTotal: Number(item.price) * item.quantity
    }))
  };
}
