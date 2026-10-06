import { apiClient } from './client';

export interface Branch {
  id: string;
  name: string;
}

export const branchService = {
  async getBranches(): Promise<Branch[]> {
    const data = await apiClient.get('/branches');
    return (data || []).map((b: any) => ({
      id: String(b.id),
      name: b.name
    }));
  }
};
