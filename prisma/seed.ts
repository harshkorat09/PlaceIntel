import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.branch.createMany({ data: [{ name: 'Computer Engineering' }, { name: 'Information Technology' }], skipDuplicates: true });
  await prisma.skill.createMany({ data: [{ name: 'TypeScript' }, { name: 'Python' }, { name: 'SQL' }], skipDuplicates: true });
}
main().finally(() => prisma.$disconnect());
