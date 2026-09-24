import { z } from 'zod';

export const placementSchema = z.object({
  body: z.object({
    companyId: z.number().int().positive(),
    position: z.string().min(2, 'Position is required'),
    ctc: z.number().min(0, 'CTC must be non-negative'),
    deadline: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date string' }),
    cgpaCutoff: z.number().min(0).max(10),
    description: z.string().optional(),
    branchIds: z.array(z.number().int().positive()).optional(),
    skillIds: z.array(z.number().int().positive()).optional(),
    status: z.string().optional().default('Upcoming'),
  }),
});

export const updatePlacementSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID must be numeric'),
  }),
  body: z.object({
    companyId: z.number().int().positive().optional(),
    position: z.string().min(2).optional(),
    ctc: z.number().min(0).optional(),
    deadline: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date string' }).optional(),
    cgpaCutoff: z.number().min(0).max(10).optional(),
    description: z.string().optional(),
    branchIds: z.array(z.number().int().positive()).optional(),
    skillIds: z.array(z.number().int().positive()).optional(),
    status: z.string().optional(),
  }),
});

export const placementIdParamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID must be numeric'),
  }),
});
