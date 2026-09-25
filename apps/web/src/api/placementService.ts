import { apiClient } from './client';
import type { Placement } from './types';

// Shape that the real Express API returns
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

function mapPlacement(p: ApiPlacement): Placement {
  return {
    id: String(p.id),
    companyName: p.company?.name ?? String(p.companyId),
    role: p.position,
    packageRange: p.ctc ? `${p.ctc} LPA` : 'TBD',
    deadline: p.deadline ? new Date(p.deadline).toISOString().split('T')[0] : '',
    cgpaRequirement: p.cgpaCutoff,
    description: p.description ?? '',
    eligibleBranches: p.branches?.map(b => b.branch.name) ?? [],
    requiredSkills: p.skills?.map(s => s.skill.name) ?? [],
    status: p.status ?? 'Upcoming',
  };
}

export const placementService = {
  async getPlacements(filters?: { search?: string; branch?: string; skills?: string }): Promise<Placement[]> {
    let url = '/placements';
    if (filters) {
      const params = new URLSearchParams();
      if (filters.branch) params.append('branch', filters.branch);
      if (filters.skills) params.append('skills', filters.skills);
      // Wait, backend does not have a 'search' query parameter for company/role.
      // But we can still support the others via API and maybe fallback search locally or update backend?
      // Let's pass what we can.
      const qs = params.toString();
      if (qs) url += `?${qs}`;
    }
    const data = await apiClient.get(url);
    let results = (data as ApiPlacement[] || []).map(mapPlacement);
    
    // Fallback client-side filtering for 'search' since backend API doesn't have it natively in controller
    if (filters?.search) {
      const s = filters.search.toLowerCase();
      results = results.filter(drive => 
        drive.companyName.toLowerCase().includes(s) || drive.role.toLowerCase().includes(s)
      );
    }
    return results;
  },

  async getPlacementById(id: string): Promise<Placement | null> {
    const data = await apiClient.get('/placements');
    const p = (data as ApiPlacement[] || []).find((x) => String(x.id) === id);
    return p ? mapPlacement(p) : null;
  },

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
      status?: string;
    },
    pdfFile?: File | null,
  ): Promise<{ placement: Placement; noticeResult?: any }> {
    const res = await apiClient.post('/placements', data);
    const placement = mapPlacement(res as ApiPlacement);

    if (pdfFile) {
      const formData = new FormData();
      formData.append('file', pdfFile, pdfFile.name);
      // postFormData returns raw unwrapped if we updated client.ts, wait we updated client.ts to unwrap postFormData too
      const noticeRes = await apiClient.postFormData(`/placements/${placement.id}/notice`, formData);
      return { placement, noticeResult: noticeRes };
    }

    return { placement };
  },

  async updatePlacement(id: string, data: Partial<Placement>): Promise<Placement> {
    const payload: any = {};
    if (data.role) payload.position = data.role;
    if (data.deadline) payload.deadline = data.deadline;
    if (data.cgpaRequirement !== undefined) payload.cgpaCutoff = data.cgpaRequirement;
    if (data.description) payload.description = data.description;
    if (data.status) payload.status = data.status;
    if (data.packageRange) {
       const ctcMatch = data.packageRange.match(/(\d+)/);
       if (ctcMatch) payload.ctc = parseInt(ctcMatch[1]);
    }
    const res = await apiClient.put(`/placements/${id}`, payload);
    return mapPlacement(res as ApiPlacement);
  },

  async deletePlacement(id: string): Promise<void> {
    await apiClient.delete(`/placements/${id}`);
  }
};
