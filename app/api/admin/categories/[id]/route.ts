import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidateYmlFeed } from "@/lib/yml-feed-cache";

const categorySchema = z.object({
  name: z.string().trim().min(2),
  slug: z.string().trim().min(2).regex(/^[a-z0-9-]+$/),
  kind: z.enum(["Товар", "Услуга"]),
  title: z.string().trim().min(2),
  teaser: z.string().trim().optional().or(z.literal("")),
  imageUrl: z.string().trim().optional().or(z.literal("")),
  sortOrder: z.coerce.number().int().min(0),
  isVisible: z.coerce.boolean()
});

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Нет доступа." }, { status: 401 });
  }

  const parsed = categorySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Проверьте данные раздела." }, { status: 400 });
  }

  const { id } = await params;
  const category = await prisma.catalogCategory.update({
    where: { id },
    data: {
      ...parsed.data,
      teaser: parsed.data.teaser ?? "",
      imageUrl: parsed.data.imageUrl || null
    }
  });

  await prisma.product.updateMany({
    where: { categoryId: id },
    data: { category: category.name, kind: category.kind }
  });

  revalidateYmlFeed();

  return NextResponse.json(category);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Нет доступа." }, { status: 401 });
  }

  const { id } = await params;
  const products = await prisma.product.count({ where: { categoryId: id } });

  if (products > 0) {
    await prisma.catalogCategory.update({ where: { id }, data: { isVisible: false } });
    revalidateYmlFeed();
    return NextResponse.json({ ok: true, hidden: true });
  }

  await prisma.catalogCategory.delete({ where: { id } });
  revalidateYmlFeed();
  return NextResponse.json({ ok: true, deleted: true });
}
