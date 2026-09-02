import 'dotenv/config';
import { PrismaClient } from './generated/client/index.js';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL || 'postgresql://placeintel:placeintel@127.0.0.1:5433/placeintel?schema=public';

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });
