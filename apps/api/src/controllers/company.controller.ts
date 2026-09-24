import type { Request, Response } from 'express';
import { prisma } from '../db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { NotFoundError } from '../utils/errors.js';

export const getCompanies = asyncHandler(async (_req: Request, res: Response) => {
  const companies = await prisma.company.findMany();
  res.json({ success: true, data: companies });
});

export const createCompany = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body;
  const company = await prisma.company.create({
    data,
  });
  res.status(201).json({ success: true, message: 'Company created', data: company });
});

export const updateCompany = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  
  const existingCompany = await prisma.company.findUnique({ where: { id: parseInt(id) } });
  if (!existingCompany) {
    throw new NotFoundError('Company not found');
  }

  const company = await prisma.company.update({
    where: { id: parseInt(id) },
    data,
  });
  
  res.json({ success: true, message: 'Company updated', data: company });
});

export const deleteCompany = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const existingCompany = await prisma.company.findUnique({ where: { id: parseInt(id) } });
  if (!existingCompany) {
    throw new NotFoundError('Company not found');
  }

  await prisma.company.delete({
    where: { id: parseInt(id) },
  });
  
  res.json({ success: true, message: 'Company deleted' });
});
