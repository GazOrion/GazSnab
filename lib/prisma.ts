import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function createPrismaClient() {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"]
  });
}

function isStalePrismaClient(client: PrismaClient) {
  return typeof (client as PrismaClient & { pageMeta?: unknown }).pageMeta === "undefined";
}

function getPrismaClient() {
  const cached = globalForPrisma.prisma;

  if (cached && isStalePrismaClient(cached)) {
    void cached.$disconnect().catch(() => undefined);
    globalForPrisma.prisma = undefined;
  }

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }

  return globalForPrisma.prisma;
}

export const prisma = getPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
