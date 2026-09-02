import type { Request, Response } from 'express';
import { prisma } from '../db.js';

export const getSkills = async (_req: Request, res: Response) => {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { name: 'asc' }
    });
    res.json({ success: true, data: skills });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
