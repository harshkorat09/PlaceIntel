import type { Placement } from './types';

// Initial Mock Data
let mockPlacements: Placement[] = [
  {
    id: '1',
    companyName: 'Google',
    role: 'Software Engineer',
    packageRange: '28 - 32 LPA',
    deadline: '2026-08-15',
    cgpaRequirement: 8.0,
    eligibleBranches: ['CSE', 'CE', 'IT'],
    requiredSkills: ['Algorithms', 'System Design', 'React'],
    description: 'Google India campus drive for 2026 graduates.',
    fitScore: 85,
    status: 'Ongoing',
  },
  {
    id: '2',
    companyName: 'Microsoft',
    role: 'Program Manager',
    packageRange: '20 - 24 LPA',
    deadline: '2026-08-20',
    cgpaRequirement: 7.5,
    eligibleBranches: ['CSE', 'CE', 'IT', 'ECE'],
    requiredSkills: ['Product Management', 'Data Analytics'],
    description: 'Microsoft campus recruitment for PM roles.',
    fitScore: 60,
    status: 'Completed',
  },
  {
    id: '3',
    companyName: 'Deloitte',
    role: 'Technology Analyst',
    packageRange: '8 - 10 LPA',
    deadline: '2026-09-01',
    cgpaRequirement: 7.0,
    eligibleBranches: ['CSE', 'CE', 'IT', 'ECE', 'EE'],
    requiredSkills: ['SQL', 'Java', 'Communication'],
    description: 'Deloitte US India technology consulting drive.',
    fitScore: 92,
    status: 'Registration Open',
  },
];

export const placementService = {
  // Use isolated mock data for now. Replace with real API calls when backend is ready.
  async getPlacements(): Promise<Placement[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockPlacements]);
      }, 300);
    });
    // return apiClient.get('/placements');
  },

  async getPlacementById(id: string): Promise<Placement | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockPlacements.find(p => p.id === id) || null);
      }, 200);
    });
    // return apiClient.get(`/placements/${id}`);
  },

  async createPlacement(data: Omit<Placement, 'id' | 'fitScore'>): Promise<Placement> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPlacement = {
          ...data,
          id: Date.now().toString(),
        };
        mockPlacements.push(newPlacement);
        resolve(newPlacement);
      }, 500);
    });
    // return apiClient.post('/placements', data);
  },

  async updatePlacement(id: string, data: Partial<Placement>): Promise<Placement> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockPlacements.findIndex(p => p.id === id);
        if (index > -1) {
          mockPlacements[index] = { ...mockPlacements[index], ...data };
          resolve(mockPlacements[index]);
        } else {
          reject(new Error('Placement not found'));
        }
      }, 500);
    });
    // return apiClient.put(`/placements/${id}`, data);
  },

  async deletePlacement(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockPlacements = mockPlacements.filter(p => p.id !== id);
        resolve();
      }, 400);
    });
    // return apiClient.delete(`/placements/${id}`);
  }
};
