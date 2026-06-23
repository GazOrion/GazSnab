import { NextResponse } from "next/server";
import { getCachedYmlFeed } from "@/lib/yml-feed-cache";

export async function GET() {
  const { xml, stats } = await getCachedYmlFeed();

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "X-YML-Offers-Included": String(stats.included),
      "X-YML-Offers-Skipped-No-Price": String(stats.skippedNoPrice)
    }
  });
}
