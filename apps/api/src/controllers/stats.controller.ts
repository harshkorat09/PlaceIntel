import type { Request, Response } from 'express';
import { prisma } from '../db.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getStats = asyncHandler(async (_req: Request, res: Response) => {
  const totalCompanies = await prisma.company.count();
  const totalPlacements = await prisma.placement.count();
  
  const allPlacements = await prisma.placement.findMany({
    include: {
      skills: { include: { skill: true } },
      branches: { include: { branch: true } }
    }
  });

  const packageDistribution: Record<'< 5 LPA' | '5 - 10 LPA' | '10 - 20 LPA' | '20+ LPA', number> = {
    '< 5 LPA': 0,
    '5 - 10 LPA': 0,
    '10 - 20 LPA': 0,
    '20+ LPA': 0,
  };

  const skillDemand: Record<string, number> = {};
  const branchDistribution: Record<string, number> = {};
  const yearWiseTrends: Record<string, number> = {};

  allPlacements.forEach(p => {
    // Package Distribution
    const ctc = p.ctc || 0;
    if (ctc < 5) packageDistribution['< 5 LPA']++;
    else if (ctc <= 10) packageDistribution['5 - 10 LPA']++;
    else if (ctc <= 20) packageDistribution['10 - 20 LPA']++;
    else packageDistribution['20+ LPA']++;

    // Skill Demand
    p.skills.forEach(s => {
      const name = s.skill.name;
      skillDemand[name] = (skillDemand[name] || 0) + 1;
    });

    // Branch Distribution
    p.branches.forEach(b => {
      const name = b.branch.name;
      branchDistribution[name] = (branchDistribution[name] || 0) + 1;
    });

    // Year-wise Trends
    const year = p.deadline.getFullYear().toString();
    yearWiseTrends[year] = (yearWiseTrends[year] || 0) + 1;
  });

  res.json({ 
    success: true, 
    data: {
      totalCompanies,
      totalPlacements,
      packageDistribution,
      skillDemand,
      branchDistribution,
      yearWiseTrends
    } 
  });
});
