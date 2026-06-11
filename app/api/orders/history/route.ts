import { NextResponse } from "next/server";
import { z } from "zod";
import { orderWithItemsInclude } from "@/lib/order-queries";
import { prisma } from "@/lib/prisma";
import { serializeOrder } from "@/lib/serialize-order";
import { normalizeTrackNumber } from "@/lib/track-number";

const bodySchema = z.object({
  tracks: z.array(z.string().min(1)).max(50)
});

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json());

  if (!parsed.success || !parsed.data.tracks.length) {
    return NextResponse.json({ orders: [] });
  }

  const tracks = [
    ...new Set(
      parsed.data.tracks
        .map((track) => normalizeTrackNumber(track))
        .filter((track): track is string => Boolean(track))
    )
  ].slice(0, 50);

  if (!tracks.length) {
    return NextResponse.json({ orders: [] });
  }

  const orders = await prisma.order.findMany({
    where: { trackNumber: { in: tracks } },
    include: orderWithItemsInclude,
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json({ orders: orders.map(serializeOrder) });
}
