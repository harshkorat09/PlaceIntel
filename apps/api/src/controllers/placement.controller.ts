import type { Request, Response } from 'express';
import { prisma } from '../db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { NotFoundError } from '../utils/errors.js';
import { calculateFitScore } from '../utils/fitScore.js';
import type { AuthRequest } from '../middlewares/auth.middleware.js';

export const getPlacements = asyncHandler(async (req: Request, res: Response) => {
  const { skills, packageRange, branch, year, status } = req.query;
  
  const where: any = {};
  
  if (skills) {
    const skillList = Array.isArray(skills) ? skills : [skills];
    where.skills = {
      some: { skill: { name: { in: skillList.map(String), mode: 'insensitive' } } }
    };
  }
  
  if (branch) {
    where.branches = {
      some: { branch: { name: { equals: String(branch), mode: 'insensitive' } } }
    };
  }
  
  if (packageRange) {
    const [min, max] = String(packageRange).split('-').map(Number);
    if (min !== undefined && max !== undefined && !isNaN(min) && !isNaN(max)) {
      where.ctc = { gte: min, lte: max };
    } else if (min !== undefined && !isNaN(min)) {
      where.ctc = { gte: min };
    }
  }
  
  if (year) {
    const yearStart = new Date(`${year}-01-01`);
    const yearEnd = new Date(`${year}-12-31`);
    where.deadline = { gte: yearStart, lte: yearEnd };
  }

  if (status) {
    where.status = { equals: String(status), mode: 'insensitive' };
  }

  const placements = await prisma.placement.findMany({
    where,
    include: {
      company: true,
      skills: { include: { skill: true } },
      branches: { include: { branch: true } }
    }
  });
  res.json({ success: true, data: placements });
});

export const createPlacement = asyncHandler(async (req: Request, res: Response) => {
  const { companyId, position, ctc, deadline, cgpaCutoff, description, branchIds, skillIds, status } = req.body;
  
  const placement = await prisma.placement.create({
    data: {
      companyId,
      position,
      ctc,
      deadline: new Date(deadline),
      cgpaCutoff,
      description,
      status: status || 'Upcoming',
      branches: {
        create: branchIds?.map((id: number) => ({ branchId: id })) || []
      },
      skills: {
        create: skillIds?.map((id: number) => ({ skillId: id })) || []
      }
    }
  });
  
  res.status(201).json({ success: true, message: 'Placement created', data: placement });
});

export const updatePlacement = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { branchIds, skillIds, ...data } = req.body;
  
  const existingPlacement = await prisma.placement.findUnique({ where: { id: parseInt(id as string) } });
  if (!existingPlacement) {
    throw new NotFoundError('Placement not found');
  }

  if (data.deadline) data.deadline = new Date(data.deadline);

  // Note: Deep update of branch/skill M2M handled ideally in a transaction if passed.
  // Simplifying here for primitive updates as requested.
  const placement = await prisma.placement.update({
    where: { id: parseInt(id as string) },
    data
  });
  
  res.json({ success: true, message: 'Placement updated', data: placement });
});

export const deletePlacement = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const existingPlacement = await prisma.placement.findUnique({ where: { id: parseInt(id as string) } });
  if (!existingPlacement) {
    throw new NotFoundError('Placement not found');
  }

  await prisma.placement.delete({
    where: { id: parseInt(id as string) }
  });
  
  res.json({ success: true, message: 'Placement deleted' });
});

export const getPlacementFitScore = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.userId;
  const placementId = parseInt(id as string);
  
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { skills: true }
  });
  
  if (!user) throw new NotFoundError('User not found');

  const placement = await prisma.placement.findUnique({
    where: { id: placementId },
    include: { branches: true, skills: true }
  });

  if (!placement) throw new NotFoundError('Placement not found');

  const fitResult = calculateFitScore({
    studentCgpa: user.cgpa,
    studentBranchId: user.branchId,
    studentSkillIds: user.skills.map(s => s.skillId),
    placementCgpaCutoff: placement.cgpaCutoff,
    placementBranchIds: placement.branches.map(b => b.branchId),
    placementSkillIds: placement.skills.map(s => s.skillId)
  });

  res.json({ 
    success: true, 
    data: fitResult
  });
});
