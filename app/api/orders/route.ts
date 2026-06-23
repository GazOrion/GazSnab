import { NextResponse } from "next/server";
import { z } from "zod";
import { contactMethodSchema } from "@/lib/contact-method";
import { syncCartOrderToOrionCrm } from "@/lib/orion-crm";
import { normalizeRuPhoneDigits } from "@/lib/phone-mask";
import { prisma } from "@/lib/prisma";

const orderSchema = z.object({
  customerName: z
    .string()
    .trim()
    .min(2)
    .regex(/^[\p{L}\s\-'.]+$/u, "Укажите имя без цифр."),
  phone: z
    .string()
    .trim()
    .refine((value) => normalizeRuPhoneDigits(value).length === 11, "Некорректный телефон."),
  contactMethod: contactMethodSchema,
  email: z.string().trim().email().optional().or(z.literal("")),
  company: z.string().trim().optional().or(z.literal("")),
  comment: z.string().trim().optional().or(z.literal("")),
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().min(1).max(999)
      })
    )
    .min(1)
});

export async function POST(request: Request) {
  const parsed = orderSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Проверьте данные заказа." }, { status: 400 });
  }

  const productIds = parsed.data.items.map((item) => item.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, inStock: true },
    select: {
      id: true,
      title: true,
      price: true,
      unit: true,
      slug: true
    }
  });

  if (products.length !== productIds.length) {
    return NextResponse.json({ error: "Один из товаров недоступен." }, { status: 400 });
  }

  const items = parsed.data.items.map((item) => {
    const product = products.find((candidate) => candidate.id === item.productId);
    if (!product) {
      throw new Error("Product not found");
    }
    return {
      productId: product.id,
      title: product.title,
      price: product.price,
      quantity: item.quantity,
      unit: product.unit
    };
  });

  const total = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  const order = await prisma.order.create({
    data: {
      customerName: parsed.data.customerName,
      phone: parsed.data.phone,
      contactMethod: parsed.data.contactMethod,
      email: parsed.data.email || null,
      company: parsed.data.company || null,
      comment: parsed.data.comment || null,
      total,
      items: {
        create: items
      }
    },
    include: { items: true }
  });

  try {
    await syncCartOrderToOrionCrm({
      customerName: parsed.data.customerName,
      phone: parsed.data.phone,
      contactMethod: parsed.data.contactMethod,
      total: Number(order.total),
      email: parsed.data.email,
      company: parsed.data.company,
      comment: parsed.data.comment,
      items: parsed.data.items.map((item) => {
        const product = products.find((candidate) => candidate.id === item.productId);
        if (!product) {
          throw new Error("Product not found");
        }
        return {
          title: product.title,
          price: product.price,
          quantity: item.quantity,
          slug: product.slug
        };
      })
    });
  } catch (error) {
    console.error("[orders] Orion CRM sync failed:", error);
  }

  return NextResponse.json({ id: order.id, success: true });
}
