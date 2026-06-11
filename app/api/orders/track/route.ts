import { NextResponse } from "next/server";
import { orderWithItemsInclude } from "@/lib/order-queries";
import { prisma } from "@/lib/prisma";
import { serializeOrder } from "@/lib/serialize-order";
import { normalizeTrackNumber } from "@/lib/track-number";

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get("code") ?? "";
  const trackNumber = normalizeTrackNumber(code);

  if (!trackNumber) {
    return NextResponse.json({ error: "Укажите корректный трек-номер." }, { status: 400 });
  }

  const order = await prisma.order.findUnique({
    where: { trackNumber },
    include: orderWithItemsInclude
  });

  if (!order) {
    return NextResponse.json({ error: "Заказ с таким трек-номером не найден." }, { status: 404 });
  }

  return NextResponse.json({ order: serializeOrder(order) });
}
