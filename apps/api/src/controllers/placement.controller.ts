import type { Request, Response } from 'express';
import { prisma } from '../db.js';

export const getPlacements = async (req: Request, res: Response) => {
  try {
    const { skill, packageRange, branch, year } = req.query;
    
    // Build where clause based on query filters
    const where: any = {};
    
    if (skill) {
      where.skills = { some: { skill: { name: { contains: String(skill), mode: 'insensitive' } } } };
    }
    if (branch) {
      where.branches = { some: { branch: { name: { contains: String(branch), mode: 'insensitive' } } } };
    }
    if (packageRange) {
      // e.g. "10-20"
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

    const placements = await prisma.placement.findMany({
      where,
      include: {
        company: true,
        skills: { include: { skill: true } },
        branches: { include: { branch: true } }
      }
    });
    res.json({ success: true, data: placements });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createPlacement = async (req: Request, res: Response) => {
  try {
    const { companyId, position, ctc, deadline, cgpaCutoff, description, branchIds, skillIds } = req.body;
    
    const placement = await prisma.placement.create({
      data: {
        companyId,
        position,
        ctc,
        deadline: new Date(deadline),
        cgpaCutoff,
        description,
        branches: {
          create: branchIds?.map((id: number) => ({ branchId: id })) || []
        },
        skills: {
          create: skillIds?.map((id: number) => ({ skillId: id })) || []
        }
      }
    });
    
    res.status(201).json({ success: true, message: 'Placement created', data: placement });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updatePlacement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { branchIds, skillIds, ...data } = req.body;
    
    // Note: robust update would require updating branch and skill relations
    // Simplifying here to update primitive fields
    if (data.deadline) data.deadline = new Date(data.deadline);

    const placement = await prisma.placement.update({
      where: { id: parseInt(id as string) },
      data
    });
    
    res.json({ success: true, message: 'Placement updated', data: placement });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deletePlacement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    await prisma.placement.delete({
      where: { id: parseInt(id as string) }
    });
    
    res.json({ success: true, message: 'Placement deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getPlacementFitScore = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Simulate some logic
    const placementId = parseInt(id as string);
    let fitScore = 75; // base score
    let reasons = ["Student meets basic CGPA cutoff"];
    
    if (placementId % 2 === 0) {
      fitScore += 15;
      reasons.push("Strong alignment in Data Structures and Algorithms");
    } else {
      fitScore -= 10;
      reasons.push("Missing preferred skill: Cloud Architecture");
    }

    res.json({ 
      success: true, 
      data: {
        score: fitScore,
        analysis: reasons,
        isEligible: fitScore >= 60
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
