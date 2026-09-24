import type { Request, Response } from 'express';
import { prisma } from '../db.js';

export const getCompanies = async (_req: Request, res: Response) => {
  try {
    const companies = await prisma.company.findMany({
      orderBy: { id: 'desc' },
    });
    res.json({ success: true, data: companies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createCompany = async (req: Request, res: Response) => {
  try {
    const { name, sector, hiresDepstar, hiresCspit, status, avgPackage, notes, hrContacts, visits, website } = req.body;
    
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Company name is required.' });
    }
    if (!sector || typeof sector !== 'string' || !sector.trim()) {
      return res.status(400).json({ success: false, message: 'Sector / Industry is required.' });
    }

    const parsedAvgPackage = Number(avgPackage);
    if (avgPackage === undefined || avgPackage === null || isNaN(parsedAvgPackage)) {
      return res.status(400).json({ success: false, message: 'Average package must be a valid number.' });
    }

    const company = await prisma.company.create({
      data: {
        name: name.trim(),
        sector: sector.trim(),
        hiresDepstar: hiresDepstar !== undefined && !isNaN(Number(hiresDepstar)) ? Math.round(Number(hiresDepstar)) : 0,
        hiresCspit: hiresCspit !== undefined && !isNaN(Number(hiresCspit)) ? Math.round(Number(hiresCspit)) : 0,
        status: status || 'Active Recruiter',
        avgPackage: parsedAvgPackage,
        notes: notes || null,
        hrContacts: hrContacts !== undefined ? hrContacts : null,
        visits: visits !== undefined ? visits : null,
        website: website || null
      }
    });
    
    res.status(201).json({ success: true, message: 'Company created', data: company });
  } catch (error: any) {
    console.error('Error creating company:', error);
    if (error?.code === 'P2002') {
      return res.status(409).json({ success: false, message: 'A company with this name already exists.' });
    }
    res.status(500).json({ success: false, message: error?.message || 'Server error' });
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
