-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "details" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "gallery" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "kind" TEXT NOT NULL DEFAULT 'Товар',
ADD COLUMN     "leadTime" TEXT NOT NULL DEFAULT 'Уточняется после заявки',
ADD COLUMN     "specs" JSONB NOT NULL DEFAULT '{}';
