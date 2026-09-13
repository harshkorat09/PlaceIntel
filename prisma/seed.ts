import { PrismaClient } from '../apps/api/src/generated/client/index.js';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcrypt';

const connectionString = process.env.DATABASE_URL || 'postgresql://placeintel:placeintel@127.0.0.1:5433/placeintel?schema=public';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // 1. Create Branches
  const branches = ['CE', 'CSE', 'IT', 'ECE', 'EE', 'ME'].map(name => ({ name }));
  for (const b of branches) {
    await prisma.branch.upsert({
      where: { name: b.name },
      update: {},
      create: b,
    });
  }
  console.log('Branches seeded.');

  // 2. Create Skills
  const skills = [
    'React', 'Node.js', 'Python', 'Java', 'C++', 'AWS', 'Docker',
    'Machine Learning', 'SQL', 'Data Structures', 'Algorithms'
  ].map(name => ({ name }));
  
  for (const s of skills) {
    await prisma.skill.upsert({
      where: { name: s.name },
      update: {},
      create: s,
    });
  }
  console.log('Skills seeded.');

  // 3. Create Admin User
  const adminPasswordHash = await bcrypt.hash('admin123', 10);
  const adminEmail = 'admin@placeintel.com';
  
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash: adminPasswordHash,
      name: 'Super Admin',
      role: 'ADMIN',
    },
  });
  console.log('Admin user seeded.');

  // 4. Create Sample Student
  const studentPasswordHash = await bcrypt.hash('student123', 10);
  const studentEmail = 'student.24dcse045@charusat.edu.in';
  
  const cseBranch = await prisma.branch.findUnique({ where: { name: 'CSE' } });
  
  await prisma.user.upsert({
    where: { email: studentEmail },
    update: {},
    create: {
      email: studentEmail,
      passwordHash: studentPasswordHash,
      name: 'Aditya Vardhan',
      role: 'STUDENT',
      rollNo: '24DCSE045',
      cgpa: 8.72,
      institute: 'DEPSTAR',
      phone: '+91 98989 12345',
      branchId: cseBranch?.id,
    },
  });
  console.log('Sample student seeded.');
  
  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
