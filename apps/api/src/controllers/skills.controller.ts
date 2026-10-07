import type { Request, Response } from 'express';
import { prisma } from '../db.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getSkills = asyncHandler(async (_req: Request, res: Response) => {
  const skills = await prisma.skill.findMany({
    orderBy: { name: 'asc' }
  });
  res.json({ success: true, data: skills });
});

export const createSkill = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body;
  const exists = await prisma.skill.findUnique({ where: { name } });
  if (exists) return res.status(400).json({ success: false, error: { message: 'Skill already exists' } });
  
  const skill = await prisma.skill.create({
    data: { name }
  });
  res.status(201).json({ success: true, data: skill });
});

export const updateSkill = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  
  const skill = await prisma.skill.update({
    where: { id: Number(id) },
    data: { name }
  });
  res.json({ success: true, data: skill });
});

export const deleteSkill = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  
  // Check references
  const placementCount = await prisma.placementSkill.count({ where: { skillId: Number(id) } });
  const studentCount = await prisma.studentSkill.count({ where: { skillId: Number(id) } });
  
  if (placementCount > 0 || studentCount > 0) {
    return res.status(400).json({ 
      success: false, 
      error: { message: `Skill is currently used by ${placementCount} placements and ${studentCount} students. Remove its assignments before deleting this skill.` } 
    });
  }

  await prisma.skill.delete({ where: { id: Number(id) } });
  res.json({ success: true, data: null });
});
