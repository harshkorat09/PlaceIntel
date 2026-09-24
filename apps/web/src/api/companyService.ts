import { apiClient } from './client';
import type { Company } from './types';

export const companyService = {
  async getCompanies(): Promise<Company[]> {
    const res = await apiClient.get('/companies');
    if (!res.success) {
      throw new Error(res.message || 'Failed to fetch companies');
    }
    return (res.data || []).map((c: any) => ({
      ...c,
      id: String(c.id),
      hiresDepstar: Number(c.hiresDepstar) || 0,
      hiresCspit: Number(c.hiresCspit) || 0,
      avgPackage: Number(c.avgPackage) || 0,
      notes: c.notes || '',
      website: c.website || '',
      hrContacts: Array.isArray(c.hrContacts) ? c.hrContacts : [],
      visits: Array.isArray(c.visits) ? c.visits : [],
    }));
  },

  async createCompany(data: Omit<Company, 'id'>): Promise<Company> {
    const payload = {
      name: data.name,
      sector: data.sector,
      hiresDepstar: Number(data.hiresDepstar) || 0,
      hiresCspit: Number(data.hiresCspit) || 0,
      status: data.status || 'Active Recruiter',
      avgPackage: Number(data.avgPackage),
      notes: data.notes || '',
      website: data.website || '',
      hrContacts: data.hrContacts || [],
      visits: data.visits || [],
    };
    const res = await apiClient.post('/companies', payload);
    if (!res.success) {
      throw new Error(res.message || 'Failed to create company');
    }
    const c = res.data;
    return {
      ...c,
      id: String(c.id),
      hiresDepstar: Number(c.hiresDepstar) || 0,
      hiresCspit: Number(c.hiresCspit) || 0,
      avgPackage: Number(c.avgPackage) || 0,
      notes: c.notes || '',
      website: c.website || '',
      hrContacts: Array.isArray(c.hrContacts) ? c.hrContacts : [],
      visits: Array.isArray(c.visits) ? c.visits : [],
    };
  },

  async updateCompany(id: string, data: Partial<Company>): Promise<Company> {
    const res = await apiClient.put(`/companies/${id}`, data);
    if (!res.success) {
      throw new Error(res.message || 'Failed to update company');
    }
    const c = res.data;
    return {
      ...c,
      id: String(c.id),
    };
  },

  async deleteCompany(id: string): Promise<void> {
    const res = await apiClient.delete(`/companies/${id}`);
    if (!res.success) {
      throw new Error(res.message || 'Failed to delete company');
    }
  },
};
