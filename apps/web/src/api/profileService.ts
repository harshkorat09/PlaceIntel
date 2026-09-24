import type { StudentProfileData } from './types';
import { apiClient } from './client';

export const profileService = {
  async getProfile(_studentId: string): Promise<StudentProfileData> {
    const data = await apiClient.get(`/profile`);
    return {
      id: String(data.id),
      name: data.name,
      email: data.email,
      branch: data.branch?.name || '',
      cgpa: data.cgpa || 0,
      skills: data.skills ? data.skills.map((s: any) => s.skill.name) : []
    };
  },

  async updateProfile(_studentId: string, data: Partial<StudentProfileData>): Promise<StudentProfileData> {
    // Fetch lookups to map names to IDs
    const [branches, skills] = await Promise.all([
      apiClient.get('/branches'),
      apiClient.get('/skills')
    ]);

    const payload: any = {};
    if (data.name) payload.name = data.name;
    if (data.cgpa !== undefined) payload.cgpa = data.cgpa;
    
    if (data.branch) {
      const b = branches.find((x: any) => x.name === data.branch);
      if (b) payload.branchId = b.id;
    }

    if (data.skills) {
      payload.skillIds = data.skills
        .map(name => skills.find((s: any) => s.name === name)?.id)
        .filter(Boolean);
    }

    const updated = await apiClient.put(`/profile`, payload);
    return {
      id: String(updated.id),
      name: updated.name,
      email: updated.email,
      branch: updated.branch?.name || data.branch || '',
      cgpa: updated.cgpa || 0,
      skills: updated.skills ? updated.skills.map((s: any) => s.skill.name) : (data.skills || [])
    };
  }
};
