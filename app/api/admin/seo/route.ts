import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getAllowedSeoPaths, listSeoPagesForAdmin } from "@/lib/site-seo";

const seoItemSchema = z.object({
  path: z.string().trim().min(1),
  title: z.string().trim().min(1),
  description: z.string().trim()
});

const seoBulkSchema = z.object({
  items: z.array(seoItemSchema).min(1)
});

function canUsePageMeta() {
  return typeof prisma.pageMeta?.upsert === "function";
}

export async function GET() {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Нет доступа." }, { status: 401 });
  }

  const pages = await listSeoPagesForAdmin();
  return NextResponse.json({ pages });
}

export async function PUT(request: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Нет доступа." }, { status: 401 });
  }

  const parsed = seoBulkSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Проверьте данные метатегов." }, { status: 400 });
  }

  const allowedPaths = await getAllowedSeoPaths();

  for (const item of parsed.data.items) {
    if (!allowedPaths.has(item.path)) {
      return NextResponse.json({ error: `Неизвестная страница: ${item.path}` }, { status: 400 });
    }
  }

  if (!canUsePageMeta()) {
    return NextResponse.json(
      {
        error:
          "Модель SEO не подключена. Выполните npx prisma generate и npx prisma migrate deploy, затем перезапустите сервер."
      },
      { status: 503 }
    );
  }

  try {
    await prisma.$transaction(
      parsed.data.items.map((item) =>
        prisma.pageMeta.upsert({
          where: { path: item.path },
          create: {
            path: item.path,
            title: item.title,
            description: item.description
          },
          update: {
            title: item.title,
            description: item.description
          }
        })
      )
    );

    revalidateTag("seo-pages");

    const revalidatedPaths = new Set<string>();
    for (const item of parsed.data.items) {
      const pathname = item.path.split("?")[0] || item.path;
      if (!revalidatedPaths.has(pathname)) {
        revalidatePath(pathname);
        revalidatedPaths.add(pathname);
      }
    }

    const pages = await listSeoPagesForAdmin();
    return NextResponse.json({ pages });
  } catch (error) {
    console.error("[admin/seo] save failed:", error);
    return NextResponse.json(
      {
        error:
          "Не удалось сохранить метатеги. Проверьте, что выполнена миграция: npx prisma migrate deploy."
      },
      { status: 500 }
    );
  }
}
