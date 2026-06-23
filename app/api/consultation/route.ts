import { NextResponse } from "next/server";
import { z } from "zod";
import { CONSULTATION_PRODUCT_SLUG } from "@/lib/catalog";
import { contactMethodSchema } from "@/lib/contact-method";
import { syncConsultationToOrionCrm } from "@/lib/orion-crm";
import { normalizeRuPhoneDigits } from "@/lib/phone-mask";
import { prisma } from "@/lib/prisma";

const consultationSchema = z
  .object({
    customerName: z
      .string()
      .trim()
      .min(2)
      .regex(/^[\p{L}\s\-'.]+$/u, "Укажите имя без цифр.")
      .optional(),
    phone: z
      .string()
      .trim()
      .refine((value) => normalizeRuPhoneDigits(value).length === 11, "Некорректный телефон."),
    contactMethod: contactMethodSchema.optional(),
    source: z.enum(["home", "popup", "phone-fab"]).optional()
  })
  .superRefine((data, ctx) => {
    const source = data.source ?? "home";
    if (source === "phone-fab") return;

    const name = data.customerName?.trim() ?? "";
    if (name.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Укажите имя.",
        path: ["customerName"]
      });
    }

    if (!data.contactMethod) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Выберите способ связи.",
        path: ["contactMethod"]
      });
    }
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

  const source = parsed.data.source ?? "home";
  const customerName =
    source === "phone-fab"
      ? "Заявка на звонок"
      : parsed.data.customerName!.trim();
  const contactMethod = source === "phone-fab" ? "phone" : parsed.data.contactMethod!;
  const consultationMessage =
    source === "phone-fab"
      ? "Заявка на обратный звонок из виджета «Заказать звонок»."
      : source === "popup"
        ? "Заявка на консультацию из виджета на сайте."
        : "Заявка на консультацию с главной страницы (имя и телефон).";

  const order = await prisma.order.create({
    data: {
      customerName,
      phone: parsed.data.phone,
      contactMethod,
      comment: consultationMessage,
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

  try {
    await syncConsultationToOrionCrm({
      customerName,
      phone: parsed.data.phone,
      contactMethod,
      source,
      message: consultationMessage
    });
  } catch (error) {
    console.error("[consultation] Orion CRM sync failed:", error);
  }

  return NextResponse.json({ id: order.id, success: true });
}
