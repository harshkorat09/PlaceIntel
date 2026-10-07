import { z } from 'zod';

export const companySchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Company name is required'),
    sector: z.string().min(2, 'Sector is required'),
    description: z.string().optional(),
    location: z.string().optional(),
    size: z.string().optional(),
    foundedYear: z.number().int().min(1800).max(new Date().getFullYear()).optional(),
    website: z.string().url().optional().or(z.literal('')),
  }),
});

export const updateCompanySchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID must be numeric'),
  }),
  body: z.object({
    name: z.string().min(2).optional(),
    sector: z.string().min(2).optional(),
    description: z.string().optional(),
    location: z.string().optional(),
    size: z.string().optional(),
    foundedYear: z.number().int().min(1800).max(new Date().getFullYear()).optional(),
    website: z.string().url().optional().or(z.literal('')),
  }),
});

export const companyIdParamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID must be numeric'),
  }),
});
