import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/** Подсказки: только title и category (без description). */
export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (q.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        inStock: true,
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { category: { contains: q, mode: "insensitive" } }
        ]
      },
      select: {
        title: true,
        slug: true,
        kind: true,
        category: true
      },
      orderBy: [{ featured: "desc" }, { title: "asc" }],
      take: 8
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("[suggest]", error);
    return NextResponse.json({ error: "search_unavailable" }, { status: 503 });
  }
}
