import { apiClient } from './client';

export interface Skill {
  id: string;
  name: string;
}

export const skillService = {
  async getSkills(): Promise<Skill[]> {
    const data = await apiClient.get('/skills');
    return (data || []).map((s: any) => ({
      id: String(s.id),
      name: s.name
    }));
  }
};
