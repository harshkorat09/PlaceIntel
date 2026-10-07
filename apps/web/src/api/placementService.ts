import { apiClient } from './client';
import type { Placement } from './types';

// Shape that the real Express API returns
interface ApiPlacement {
  id: number;
  companyId: number;
  position: string;
  minPackage?: number;
  maxPackage?: number;
  deadline: string;
  driveDate?: string;
  cgpaCutoff: number;
  description?: string;
  status: string;
  company?: { id: number; name: string };
  branches?: { branch: { id: number; name: string } }[];
  skills?: { skill: { id: number; name: string } }[];
  attachments?: { filePath: string }[];
}

function mapPlacement(p: ApiPlacement): Placement {
  let packageRange = 'Package not specified';
  if (p.minPackage != null && p.maxPackage != null) {
    packageRange = `₹${p.minPackage} LPA – ₹${p.maxPackage} LPA`;
  } else if (p.minPackage != null) {
    packageRange = `₹${p.minPackage} LPA+`;
  } else if (p.maxPackage != null) {
    packageRange = `Up to ₹${p.maxPackage} LPA`;
  }

  return {
    id: String(p.id),
    companyName: p.company?.name ?? String(p.companyId),
    role: p.position,
    packageRange,
    minPackage: p.minPackage,
    maxPackage: p.maxPackage,
    deadline: p.deadline ? new Date(p.deadline).toISOString().split('T')[0] : '',
    driveDate: p.driveDate ? new Date(p.driveDate).toISOString().split('T')[0] : undefined,
    cgpaRequirement: p.cgpaCutoff,
    description: p.description ?? '',
    eligibleBranches: p.branches?.map(b => b.branch.name) ?? [],
    requiredSkills: p.skills?.map(s => s.skill.name) ?? [],
    status: p.status ?? 'Upcoming',
    attachmentUrl: p.attachments && p.attachments.length > 0 ? `http://localhost:4000${p.attachments[0].filePath}` : undefined,
  };
}

export const placementService = {
  async getPlacements(filters?: { search?: string; branch?: string; skills?: string; packageRange?: string; year?: string }): Promise<Placement[]> {
    let url = '/placements';
    if (filters) {
      const params = new URLSearchParams();
      if (filters.branch) params.append('branch', filters.branch);
      if (filters.skills) params.append('skills', filters.skills);
      if (filters.search) params.append('search', filters.search);
      if (filters.packageRange) params.append('packageRange', filters.packageRange);
      if (filters.year) params.append('year', filters.year);
      const qs = params.toString();
      if (qs) url += `?${qs}`;
    }
    const data = await apiClient.get(url);
    const results = (data as ApiPlacement[] || []).map(mapPlacement);
    return results;
  },

  async getPlacementById(id: string): Promise<Placement | null> {
    const data = await apiClient.get(`/placements/${id}`);
    return data ? mapPlacement(data as ApiPlacement) : null;
  },

  async getFitScore(id: string): Promise<any> {
    const data = await apiClient.get(`/placements/${id}/fit-score`);
    return data;
  },

  async createPlacement(
    data: {
      companyId: number;
      position: string;
      minPackage?: number | null;
      maxPackage?: number | null;
      deadline: string;
      driveDate?: string;
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

  async updatePlacement(
    id: string,
    data: {
      position?: string;
      minPackage?: number | null;
      maxPackage?: number | null;
      deadline?: string;
      driveDate?: string;
      cgpaCutoff?: number;
      description?: string;
      branchIds?: number[];
      skillIds?: number[];
      status?: string;
    }
  ): Promise<Placement> {
    const res = await apiClient.put(`/placements/${id}`, data);
    return mapPlacement(res as ApiPlacement);
  },

  async deletePlacement(id: string): Promise<void> {
    await apiClient.delete(`/placements/${id}`);
  }
};
