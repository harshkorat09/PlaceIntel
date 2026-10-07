import type { Request, Response } from 'express';
import { prisma } from '../db.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getBranches = asyncHandler(async (_req: Request, res: Response) => {
  const branches = await prisma.branch.findMany({
    orderBy: { name: 'asc' }
  });
  res.json({ success: true, data: branches });
});

export const createBranch = asyncHandler(async (req: Request, res: Response) => {
  const { name, code, degree } = req.body;
  const exists = await prisma.branch.findUnique({ where: { name } });
  if (exists) return res.status(400).json({ success: false, error: { message: 'Branch already exists' } });
  
  const branch = await prisma.branch.create({
    data: { name, code, degree }
  });
  res.status(201).json({ success: true, data: branch });
});

export const updateBranch = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, code, degree } = req.body;
  
  const branch = await prisma.branch.update({
    where: { id: Number(id) },
    data: { name, code, degree }
  });
  res.json({ success: true, data: branch });
});

export const deleteBranch = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  
  // Check references
  const placementCount = await prisma.placementBranch.count({ where: { branchId: Number(id) } });
  const userCount = await prisma.user.count({ where: { branchId: Number(id) } });
  
  if (placementCount > 0 || userCount > 0) {
    return res.status(400).json({ 
      success: false, 
      error: { message: `Branch is currently used by ${placementCount} placements and ${userCount} students. Remove its assignments before deleting this branch.` } 
    });
  }

  await prisma.branch.delete({ where: { id: Number(id) } });
  res.json({ success: true, data: null });
});
