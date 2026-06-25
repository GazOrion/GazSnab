import { NextResponse } from "next/server";
import { getCachedYmlFeed } from "@/lib/yml-feed-cache";

export async function GET() {
  const { xml, stats } = await getCachedYmlFeed();

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "X-YML-Offers-Included": String(stats.included),
      "X-YML-Offers-With-Price": String(stats.includedWithPrice),
      "X-YML-Offers-On-Request": String(stats.includedOnRequest),
      "X-YML-Offers-Skipped-No-Image": String(stats.skippedNoImage),
      "X-YML-Collections": String(stats.collections)
    }
  });
}
