import { Prisma } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getAllowedSeoPaths, listSeoPagesForAdmin } from "@/lib/site-seo";

const seoItemSchema = z.object({
  path: z.string().trim().min(1),
  title: z.string().trim().min(1, "Title не может быть пустым."),
  description: z.string().trim()
});

const seoBulkSchema = z.object({
  items: z.array(seoItemSchema).min(1)
});

function canUsePageMeta() {
  return typeof prisma.pageMeta?.upsert === "function";
}

function formatValidationError(error: z.ZodError) {
  const titleIssue = error.issues.find((issue) => issue.path.includes("title"));
  if (titleIssue) return "Title не может быть пустым.";
  return "Проверьте данные метатегов.";
}

function formatSaveError(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2021") {
      return "Таблица PageMeta не найдена. Выполните npx prisma migrate deploy и перезапустите сервер.";
    }
  }

  const message = error instanceof Error ? error.message : String(error);
  if (/PageMeta|does not exist|relation .* does not exist/i.test(message)) {
    return "Таблица PageMeta не найдена. Выполните npx prisma migrate deploy и перезапустите сервер.";
  }

  if (process.env.NODE_ENV === "development") {
    return `Не удалось сохранить метатеги: ${message}`;
  }

  return "Не удалось сохранить метатеги. Попробуйте ещё раз или перезапустите сервер.";
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

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный формат данных." }, { status: 400 });
  }

  const parsed = seoBulkSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: formatValidationError(parsed.error) }, { status: 400 });
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

    const item = parsed.data.items[0];
    return NextResponse.json({
      page: {
        path: item.path,
        title: item.title,
        description: item.description
      }
    });
  } catch (error) {
    console.error("[admin/seo] save failed:", error);
    return NextResponse.json({ error: formatSaveError(error) }, { status: 500 });
  }
}
