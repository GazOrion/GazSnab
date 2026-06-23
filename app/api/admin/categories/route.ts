import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const categorySchema = z.object({
  name: z.string().trim().min(2),
  slug: z.string().trim().min(2).regex(/^[a-z0-9-]+$/),
  kind: z.enum(["Товар", "Услуга"]).default("Товар"),
  title: z.string().trim().min(2),
  teaser: z.string().trim().optional().or(z.literal("")),
  imageUrl: z.string().trim().optional().or(z.literal("")),
  sortOrder: z.coerce.number().int().min(0).default(0),
  isVisible: z.coerce.boolean().default(true)
});

export async function GET() {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Нет доступа." }, { status: 401 });
  }

  const categories = await prisma.catalogCategory.findMany({
    orderBy: [{ kind: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
    include: { _count: { select: { products: true } } }
  });

  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Нет доступа." }, { status: 401 });
  }

  const parsed = categorySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Проверьте данные раздела." }, { status: 400 });
  }

  const category = await prisma.catalogCategory.create({
    data: {
      ...parsed.data,
      teaser: parsed.data.teaser ?? "",
      imageUrl: parsed.data.imageUrl || null
    }
  });

  return NextResponse.json(category);
}
