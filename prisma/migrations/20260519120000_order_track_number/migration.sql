-- AlterTable
ALTER TABLE "Order" ADD COLUMN "trackNumber" TEXT;

UPDATE "Order"
SET "trackNumber" = 'GS-' || upper(substr(md5(random()::text || "id"), 1, 8))
WHERE "trackNumber" IS NULL;

ALTER TABLE "Order" ALTER COLUMN "trackNumber" SET NOT NULL;

CREATE UNIQUE INDEX "Order_trackNumber_key" ON "Order"("trackNumber");
