import type { Request, Response } from 'express';
import { prisma } from '../db.js';

export const getStats = async (_req: Request, res: Response) => {
  try {
    const totalCompanies = await prisma.company.count();
    const totalPlacements = await prisma.placement.count();
    const totalStudents = await prisma.user.count({ where: { role: 'STUDENT' } });
    
    const placements = await prisma.placement.findMany({ select: { ctc: true, offeredCount: true, appliedCount: true } });
    
    let totalPackage = 0;
    let placedCount = 0;
    let totalApplied = 0;

    placements.forEach(p => {
      totalPackage += p.ctc;
      placedCount += p.offeredCount;
      totalApplied += p.appliedCount;
    });

    const averagePackage = placements.length > 0 ? (totalPackage / placements.length).toFixed(1) : 0;
    const placementRate = totalStudents > 0 ? ((placedCount / totalStudents) * 100).toFixed(1) : 0;

    res.json({ 
      success: true, 
      data: {
        totalCompanies,
        totalPlacements,
        totalStudents,
        averagePackage: Number(averagePackage),
        placementRate: Number(placementRate)
      } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
