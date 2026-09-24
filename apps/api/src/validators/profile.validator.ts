import { z } from 'zod';

export const updateProfileSchema = z.object({
  body: z.object({
    cgpa: z.number().min(0).max(10).optional(),
    branchId: z.number().int().positive().optional(),
    phone: z.string().optional(),
    skills: z.array(z.number().int().positive()).optional(),
  }),
});
