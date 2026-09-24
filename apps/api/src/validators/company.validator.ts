import { z } from 'zod';

export const companySchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Company name is required'),
    sector: z.string().min(2, 'Sector is required'),
    hiresDepstar: z.number().int().min(0).optional().default(0),
    hiresCspit: z.number().int().min(0).optional().default(0),
    status: z.string().optional().default('Active Recruiter'),
    avgPackage: z.number().min(0, 'Package must be positive'),
    notes: z.string().optional(),
    website: z.string().url().optional().or(z.literal('')),
    hrContacts: z.any().optional(), // Can refine later if needed
    visits: z.any().optional(),
  }),
});

export const updateCompanySchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID must be numeric'),
  }),
  body: z.object({
    name: z.string().min(2).optional(),
    sector: z.string().min(2).optional(),
    hiresDepstar: z.number().int().min(0).optional(),
    hiresCspit: z.number().int().min(0).optional(),
    status: z.string().optional(),
    avgPackage: z.number().min(0).optional(),
    notes: z.string().optional(),
    website: z.string().url().optional().or(z.literal('')),
    hrContacts: z.any().optional(),
    visits: z.any().optional(),
  }),
});

export const companyIdParamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID must be numeric'),
  }),
});
