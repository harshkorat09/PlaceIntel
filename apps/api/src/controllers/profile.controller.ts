import type { Request, Response } from 'express';
import { prisma } from '../db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { NotFoundError } from '../utils/errors.js';
import type { AuthRequest } from '../middlewares/auth.middleware.js';

export const getProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      rollNo: true,
      cgpa: true,
      institute: true,
      phone: true,
      branchId: true,
      branch: true,
      skills: {
        include: {
          skill: true,
        }
      }
    }
  });

  if (!user) throw new NotFoundError('User not found');
  
  res.json({ success: true, data: user });
});

export const updateProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const { cgpa, branchId, phone, skills } = req.body;

  // Start a transaction if skills are being updated
  const updatedUser = await prisma.$transaction(async (tx) => {
    const user = await tx.user.update({
      where: { id: userId },
      data: {
        cgpa,
        branchId,
        phone,
      }
    });

    if (skills !== undefined) {
      // Clear old skills
      await tx.studentSkill.deleteMany({
        where: { userId }
      });
      // Insert new skills
      if (skills.length > 0) {
        await tx.studentSkill.createMany({
          data: skills.map((skillId: number) => ({
            userId,
            skillId
          }))
        });
      }
    }

    return tx.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        rollNo: true,
        cgpa: true,
        institute: true,
        phone: true,
        branchId: true,
        branch: true,
        skills: {
          include: {
            skill: true,
          }
        }
      }
    });
  });

  res.json({ success: true, message: 'Profile updated successfully', data: updatedUser });
});
