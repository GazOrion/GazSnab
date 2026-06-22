import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("slugs") ?? "";
  const slugs = raw
    .split(",")
    .map((slug) => slug.trim())
    .filter(Boolean)
    .slice(0, 50);

  if (!slugs.length) {
    return NextResponse.json([]);
  }

  const products = await prisma.product.findMany({
    where: { slug: { in: slugs }, inStock: true },
    orderBy: { title: "asc" }
  });

  return NextResponse.json(
    products.map((product) => ({
      id: product.id,
      title: product.title,
      slug: product.slug,
      description: product.description,
      kind: product.kind,
      price: Number(product.price),
      unit: product.unit,
      imageUrl: product.imageUrl
    }))
  );
}
