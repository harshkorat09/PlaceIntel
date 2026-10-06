import { prisma } from './apps/api/src/db.js';

async function main() {
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE "Placement" ADD COLUMN "minPackage" DOUBLE PRECISION;`);
  } catch(e) {}
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE "Placement" ADD COLUMN "maxPackage" DOUBLE PRECISION;`);
  } catch(e) {}
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE "Placement" DROP COLUMN "ctc";`);
  } catch(e) {}
  console.log("Done");
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
