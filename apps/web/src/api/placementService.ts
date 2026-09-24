import type { Placement } from './types';
import { apiClient } from './client';

// Helper to map backend placement to frontend placement
const mapPlacement = (p: any): Placement => {
  return {
    id: String(p.id),
    companyName: p.company?.name || 'Unknown',
    role: p.position,
    packageRange: p.ctc ? `${p.ctc} LPA` : 'TBD',
    deadline: p.deadline ? new Date(p.deadline).toISOString().split('T')[0] : '',
    cgpaRequirement: p.cgpaCutoff,
    eligibleBranches: p.branches ? p.branches.map((b: any) => b.branch.name) : [],
    requiredSkills: p.skills ? p.skills.map((s: any) => s.skill.name) : [],
    description: p.description || '',
    status: p.status || 'Upcoming',
  };
};

export const placementService = {
  async getPlacements(): Promise<Placement[]> {
    const data = await apiClient.get('/placements');
    return (data || []).map(mapPlacement);
  },

  async getPlacementById(id: string): Promise<Placement | null> {
    const data = await apiClient.get('/placements');
    const p = data.find((x: any) => String(x.id) === id);
    return p ? mapPlacement(p) : null;
  },

  async createPlacement(data: Omit<Placement, 'id' | 'fitScore'>): Promise<Placement> {
    // Note: A robust implementation would resolve the string names to IDs.
    // Since the frontend form doesn't provide IDs natively in this mock-based UI,
    // we fetch them to map correctly.
    const [companies, branches, skills] = await Promise.all([
      apiClient.get('/companies'),
      apiClient.get('/branches'),
      apiClient.get('/skills')
    ]);

    const company = companies.find((c: any) => c.name.toLowerCase() === data.companyName.toLowerCase());
    if (!company) throw new Error(`Company '${data.companyName}' not found`);

    const branchIds = data.eligibleBranches
      .map(name => branches.find((b: any) => b.name === name)?.id)
      .filter(Boolean);

    const skillIds = data.requiredSkills
      .map(name => skills.find((s: any) => s.name === name)?.id)
      .filter(Boolean);

    const ctcMatch = data.packageRange.match(/(\d+)/);
    const ctc = ctcMatch ? parseInt(ctcMatch[1]) : 0;

    const payload = {
      companyId: company.id,
      position: data.role,
      ctc,
      deadline: data.deadline,
      cgpaCutoff: data.cgpaRequirement,
      description: data.description,
      branchIds,
      skillIds,
      status: data.status
    };

    const res = await apiClient.post('/placements', payload);
    // The create response might not include nested relations, so we might need a refetch or partial map
    return mapPlacement(res);
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
    return mapPlacement(res);
  },

  async deletePlacement(id: string): Promise<void> {
    await apiClient.delete(`/placements/${id}`);
  }
};
