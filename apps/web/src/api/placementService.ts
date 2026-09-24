import { apiClient } from './client';
import type { Placement } from './types';

/**
 * Shape that the real Express API returns in createPlacement.
 * We map it to the frontend Placement type after creation.
 */
interface ApiPlacement {
  id: number;
  companyId: number;
  position: string;
  ctc: number;
  deadline: string;
  cgpaCutoff: number;
  description?: string;
  status: string;
  company?: { id: number; name: string };
  branches?: { branch: { id: number; name: string } }[];
  skills?: { skill: { id: number; name: string } }[];
}

function mapApiPlacement(p: ApiPlacement): Placement {
  return {
    id: String(p.id),
    companyName: p.company?.name ?? String(p.companyId),
    role: p.position,
    packageRange: `${p.ctc} LPA`,
    deadline: p.deadline ? p.deadline.split('T')[0] : '',
    cgpaRequirement: p.cgpaCutoff,
    description: p.description ?? '',
    eligibleBranches: p.branches?.map(b => b.branch.name) ?? [],
    requiredSkills: p.skills?.map(s => s.skill.name) ?? [],
    status: p.status ?? 'Upcoming',
  };
}

export const placementService = {
  async getPlacements(): Promise<Placement[]> {
    const res = await apiClient.get('/placements');
    if (!res.success) throw new Error(res.message || 'Failed to fetch placements');
    return (res.data as ApiPlacement[]).map(mapApiPlacement);
  },

  async getPlacementById(id: string): Promise<Placement | null> {
    // No single-placement endpoint; fetch all and find
    const all = await placementService.getPlacements();
    return all.find(p => p.id === id) ?? null;
  },

  /**
   * Create a placement using the real API.
   * @param data - structured placement fields (uses IDs for company/branches/skills)
   * @param pdfFile - optional PDF notice file
   */
  async createPlacement(
    data: {
      companyId: number;
      position: string;
      ctc: number;
      deadline: string;
      cgpaCutoff: number;
      description?: string;
      branchIds: number[];
      skillIds: number[];
    },
    pdfFile?: File | null,
  ): Promise<{ placement: Placement; noticeResult?: any }> {
    // Step 1: Create placement
    const res = await apiClient.post('/placements', data);
    if (!res.success) {
      throw new Error(res.message || 'Failed to create placement');
    }
    const placement = mapApiPlacement(res.data as ApiPlacement);

    // Step 2 (optional): Upload PDF notice
    if (pdfFile) {
      const formData = new FormData();
      formData.append('file', pdfFile, pdfFile.name);
      const noticeRes = await apiClient.postFormData(`/placements/${placement.id}/notice`, formData);
      return { placement, noticeResult: noticeRes };
    }

    return { placement };
  },

  async updatePlacement(id: string, data: Partial<Placement>): Promise<Placement> {
    const res = await apiClient.put(`/placements/${id}`, data);
    if (!res.success) throw new Error(res.message || 'Failed to update placement');
    return mapApiPlacement(res.data as ApiPlacement);
  },

  async deletePlacement(id: string): Promise<void> {
    const res = await apiClient.delete(`/placements/${id}`);
    if (!res.success) throw new Error(res.message || 'Failed to delete placement');
  },
};
