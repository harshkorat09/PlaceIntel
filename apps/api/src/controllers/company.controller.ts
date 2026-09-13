import type { Request, Response } from 'express';
import { prisma } from '../db.js';

export const getCompanies = async (_req: Request, res: Response) => {
  try {
    const companies = await prisma.company.findMany();
    res.json({ success: true, data: companies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createCompany = async (req: Request, res: Response) => {
  try {
    const { name, sector, hiresDepstar, hiresCspit, status, avgPackage, notes, hrContacts, visits, website } = req.body;
    
    const company = await prisma.company.create({
      data: {
        name,
        sector,
        hiresDepstar,
        hiresCspit,
        status,
        avgPackage,
        notes,
        hrContacts,
        visits,
        website
      }
    });
    
    res.status(201).json({ success: true, message: 'Company created', data: company });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    
    const company = await prisma.company.update({
      where: { id: parseInt(id as string) },
      data
    });
    
    res.json({ success: true, message: 'Company updated', data: company });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    await prisma.company.delete({
      where: { id: parseInt(id as string) }
    });
    
    res.json({ success: true, message: 'Company deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
