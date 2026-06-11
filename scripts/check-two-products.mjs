import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const rows = await prisma.product.findMany({
  where: { slug: { in: ["proektirovanie-gazovogo-oborudovaniya", "servis-gazovogo-uzla"] } },
  select: { slug: true, imageUrl: true }
});
console.log(rows);
await prisma.$disconnect();
