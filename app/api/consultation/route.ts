import { NextResponse } from "next/server";
import { z } from "zod";
import { CONSULTATION_PRODUCT_SLUG } from "@/lib/catalog";
import { contactMethodSchema } from "@/lib/contact-method";
import { createUniqueTrackNumber } from "@/lib/create-order-track";
import { normalizeRuPhoneDigits } from "@/lib/phone-mask";
import { prisma } from "@/lib/prisma";

const consultationSchema = z.object({
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
  source: z.enum(["home", "popup"]).optional()
});

export async function POST(request: Request) {
  const parsed = consultationSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Укажите имя и телефон." }, { status: 400 });
  }

  const product = await prisma.product.findFirst({
    where: { slug: CONSULTATION_PRODUCT_SLUG, inStock: true }
  });

  if (!product) {
    return NextResponse.json(
      { error: "Форма временно недоступна. Позвоните нам или оформите заявку через корзину." },
      { status: 503 }
    );
  }

  const trackNumber = await createUniqueTrackNumber();

  const order = await prisma.order.create({
    data: {
      trackNumber,
      customerName: parsed.data.customerName,
      phone: parsed.data.phone,
      contactMethod: parsed.data.contactMethod,
      comment:
        parsed.data.source === "popup"
          ? "Заявка на консультацию из виджета на сайте."
          : "Заявка на консультацию с главной страницы (имя и телефон).",
      total: 0,
      items: {
        create: [
          {
            productId: product.id,
            title: product.title,
            price: product.price,
            quantity: 1,
            unit: product.unit
          }
        ]
      }
    }
  });

  return NextResponse.json({ trackNumber: order.trackNumber });
}
