import type { Request, Response } from 'express';
import { prisma } from '../db.js';

export const getBranches = async (_req: Request, res: Response) => {
  try {
    const branches = await prisma.branch.findMany({
      orderBy: { name: 'asc' }
    });
    res.json({ success: true, data: branches });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
