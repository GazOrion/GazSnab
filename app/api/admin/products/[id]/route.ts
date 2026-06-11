import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const productSchema = z.object({
  title: z.string().trim().min(2),
  slug: z.string().trim().min(2).regex(/^[a-z0-9-]+$/),
  kind: z.enum(["Товар", "Услуга"]),
  category: z.string().trim().min(2),
  description: z.string().trim().min(5),
  details: z.string().trim().optional().or(z.literal("")),
  specs: z.record(z.string()).default({}),
  leadTime: z.string().trim().min(2),
  price: z.coerce.number().positive(),
  unit: z.string().trim().min(1),
  imageUrl: z.string().trim().url().optional().or(z.literal("")),
  gallery: z.array(z.string().url()).default([]),
  inStock: z.coerce.boolean(),
  featured: z.coerce.boolean()
});

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Нет доступа." }, { status: 401 });
  }

  const parsed = productSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Проверьте данные товара." }, { status: 400 });
  }

  const { id } = await params;
  await prisma.product.update({
    where: { id },
    data: {
      ...parsed.data,
      imageUrl: parsed.data.imageUrl || null,
      gallery: parsed.data.gallery
    }
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Нет доступа." }, { status: 401 });
  }

  const { id } = await params;
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
