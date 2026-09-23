import type { Company } from './types';

let mockCompanies: Company[] = [
  {
    id: '1',
    name: 'Google',
    sector: 'Technology',
    hiresDepstar: 42,
    hiresCspit: 43,
    status: 'Active Recruiter',
    avgPackage: 32.0,
    notes: 'Premium partner',
    website: 'https://careers.google.com',
  },
  {
    id: '2',
    name: 'Microsoft',
    sector: 'Technology',
    hiresDepstar: 30,
    hiresCspit: 34,
    status: 'Active Recruiter',
    avgPackage: 28.0,
    notes: 'Premium partner',
    website: 'https://careers.microsoft.com',
  },
  {
    id: '3',
    name: 'Deloitte',
    sector: 'Consulting',
    hiresDepstar: 50,
    hiresCspit: 60,
    status: 'Active Recruiter',
    avgPackage: 14.0,
    notes: 'Mass recruiter',
    website: 'https://www2.deloitte.com',
  }
];

export const companyService = {
  async getCompanies(): Promise<Company[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockCompanies]);
      }, 300);
    });
    // return apiClient.get('/companies');
  },

  async createCompany(data: Omit<Company, 'id'>): Promise<Company> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCompany = {
          ...data,
          id: Date.now().toString(),
        };
        mockCompanies.push(newCompany);
        resolve(newCompany);
      }, 500);
    });
    // return apiClient.post('/companies', data);
  },

  async updateCompany(id: string, data: Partial<Company>): Promise<Company> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockCompanies.findIndex(c => c.id === id);
        if (index > -1) {
          mockCompanies[index] = { ...mockCompanies[index], ...data };
          resolve(mockCompanies[index]);
        } else {
          reject(new Error('Company not found'));
        }
      }, 500);
    });
    // return apiClient.put(`/companies/${id}`, data);
  },

  async deleteCompany(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockCompanies = mockCompanies.filter(c => c.id !== id);
        resolve();
      }, 400);
    });
    // return apiClient.delete(`/companies/${id}`);
  }
};
