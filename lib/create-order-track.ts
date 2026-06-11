import { prisma } from "@/lib/prisma";
import { generateTrackNumber } from "@/lib/track-number";

export async function createUniqueTrackNumber(maxAttempts = 8): Promise<string> {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const trackNumber = generateTrackNumber();
    const existing = await prisma.order.findUnique({
      where: { trackNumber },
      select: { id: true }
    });
    if (!existing) return trackNumber;
  }
  throw new Error("Failed to generate unique track number");
}
