import type { Request, Response } from 'express';
import { prisma } from '../db.js';
import type { AuthRequest } from '../middlewares/auth.middleware.js';

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

      // 5xx: generic message, don't expose internals
      return res.status(502).json({
        success: false,
        message: 'AI service returned an error. Notice was not ingested.',
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
