import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidateYmlFeed } from "@/lib/yml-feed-cache";

const mediaSchema = z.object({
  id: z.string().optional(),
  url: z.string().trim().min(1),
  alt: z.string().trim().optional().or(z.literal("")),
  sortOrder: z.coerce.number().int().min(0).default(0)
});

const productSchema = z.object({
  title: z.string().trim().min(2),
  slug: z.string().trim().min(2).regex(/^[a-z0-9-]+$/),
  kind: z.enum(["Товар", "Услуга"]).default("Товар"),
  categoryId: z.string().trim().optional().or(z.literal("")),
  category: z.string().trim().min(2),
  description: z.string().trim().min(5),
  details: z.string().trim().optional().or(z.literal("")),
  specs: z.record(z.string()).default({}),
  leadTime: z.string().trim().min(2),
  price: z.coerce.number().min(0),
  unit: z.string().trim().min(1),
  imageUrl: z.string().trim().optional().or(z.literal("")),
  gallery: z.array(z.string().trim().min(1)).default([]),
  media: z.array(mediaSchema).default([]),
  inStock: z.coerce.boolean().default(true),
  featured: z.coerce.boolean().default(false)
});

async function normalizeProductData(input: z.infer<typeof productSchema>) {
  const category = input.categoryId
    ? await prisma.catalogCategory.findUnique({ where: { id: input.categoryId } })
    : null;
  const media = input.media
    .map((item, index) => ({
      url: item.url,
      alt: item.alt || input.title,
      sortOrder: item.sortOrder ?? index
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const gallery = media.length ? media.map((item) => item.url) : input.gallery;
  const imageUrl = gallery[0] ?? input.imageUrl ?? "";

  return {
    product: {
      title: input.title,
      slug: input.slug,
      kind: category?.kind ?? input.kind,
      category: category?.name ?? input.category,
      categoryId: category?.id ?? null,
      description: input.description,
      details: input.details ?? "",
      specs: input.specs,
      leadTime: input.leadTime,
      price: input.price,
      unit: input.unit,
      imageUrl: imageUrl || null,
      gallery,
      inStock: input.inStock,
      featured: input.featured
    },
    media
  };
}

export async function POST(request: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Нет доступа." }, { status: 401 });
  }

  const parsed = productSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Проверьте данные товара." }, { status: 400 });
  }

  const { product, media } = await normalizeProductData(parsed.data);

  const created = await prisma.product.create({
    data: {
      ...product,
      media: media.length
        ? {
            create: media
          }
        : undefined
    }
  });

  revalidateYmlFeed();

  return NextResponse.json({ ok: true, id: created.id });
}
