import type { Company } from './types';
import { apiClient } from './client';

const mapCompany = (c: any): Company => ({
  ...c,
  id: String(c.id)
});

export const companyService = {
  async getCompanies(): Promise<Company[]> {
    const data = await apiClient.get('/companies');
    return (data || []).map(mapCompany);
  },

  async createCompany(data: Omit<Company, 'id'>): Promise<Company> {
    const res = await apiClient.post('/companies', data);
    return mapCompany(res);
  },

  async updateCompany(id: string, data: Partial<Company>): Promise<Company> {
    const res = await apiClient.put(`/companies/${id}`, data);
    return mapCompany(res);
  },

  async deleteCompany(id: string): Promise<void> {
    await apiClient.delete(`/companies/${id}`);
  }
};
