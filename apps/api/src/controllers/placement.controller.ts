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

/**
 * POST /api/placements/:id/notice
 * Authenticated ADMIN only.
 * Accepts multipart PDF via multer (handled in route).
 * Forwards the file to the FastAPI ingestion endpoint.
 */
export const uploadPlacementNotice = async (req: AuthRequest, res: Response) => {
  try {
    const placementId = parseInt(req.params.id as string, 10);
    if (isNaN(placementId) || placementId <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid placement ID.' });
    }

    // Validate placement exists
    const placement = await prisma.placement.findUnique({ where: { id: placementId } });
    if (!placement) {
      return res.status(404).json({ success: false, message: 'Placement not found.' });
    }

    // multer attaches the file to req.file (memory storage)
    const file = (req as any).file as Express.Multer.File | undefined;
    if (!file) {
      return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }

    if (file.mimetype !== 'application/pdf') {
      return res.status(400).json({ success: false, message: 'Only PDF files are accepted.' });
    }

    if (file.size === 0) {
      return res.status(400).json({ success: false, message: 'Uploaded file is empty.' });
    }

    // Build native multipart form to forward to FastAPI
    const blob = new Blob([new Uint8Array(file.buffer)], { type: file.mimetype });
    const formData = new FormData();
    formData.append('file', blob, file.originalname);

    const chatbotUrl = process.env.CHATBOT_URL || 'http://127.0.0.1:8000';
    const ingestUrl = `${chatbotUrl}/ingestion/placements/${placementId}/notice`;

    let fastApiRes: globalThis.Response;
    try {
      fastApiRes = await fetch(ingestUrl, {
        method: 'POST',
        body: formData,
      });
    } catch (networkErr) {
      console.error('[uploadPlacementNotice] FastAPI unreachable:', networkErr);
      return res.status(502).json({
        success: false,
        message: 'AI service is unavailable. Placement was created but notice was not ingested.',
      });
    }

    const payload = await fastApiRes.json().catch(() => null);

    if (!fastApiRes.ok) {
      const detail = payload?.detail || 'Notice ingestion failed.';
      console.error('[uploadPlacementNotice] FastAPI error:', fastApiRes.status, detail);

      // 400-level: propagate the message (duplicate, bad file, etc.)
      if (fastApiRes.status >= 400 && fastApiRes.status < 500) {
        return res.status(fastApiRes.status).json({ success: false, message: detail });
      }

      // 5xx: generic message, don't expose internals in production
      const isDev = process.env.NODE_ENV === 'development';
      return res.status(502).json({
        success: false,
        message: isDev ? `AI service error: ${detail}` : 'AI service returned an error. Notice was not ingested.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Placement notice ingested successfully.',
      data: payload?.data ?? null,
    });
  } catch (error) {
    console.error('[uploadPlacementNotice] Unexpected error:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};
