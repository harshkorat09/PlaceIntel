import type { StudentProfileData } from './types';

let mockProfiles: Record<string, StudentProfileData> = {
  '24DCSE045': {
    id: '24DCSE045',
    name: 'Aditya Vardhan',
    email: 'aditya.v@depstar.ac.in',
    branch: 'CSE',
    cgpa: 8.72,
    skills: ['React', 'Node.js']
  },
  'D25CSE018': {
    id: 'D25CSE018',
    name: 'Riddhi Shah',
    email: 'riddhi.s@cspit.ac.in',
    branch: 'CSE',
    cgpa: 9.15,
    skills: ['Python', 'Django']
  }
};

export const profileService = {
  async getProfile(studentId: string): Promise<StudentProfileData> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const id = studentId.toUpperCase();
        if (mockProfiles[id]) {
          resolve({ ...mockProfiles[id] });
        } else {
          // Return a default profile if not found in mock
          resolve({
            id: id,
            name: 'Student ' + id,
            email: `student.${id.toLowerCase()}@charusat.edu.in`,
            branch: id.includes('CE') ? 'CE' : 'CSE',
            cgpa: 0,
            skills: []
          });
        }
      }, 300);
    });
    // return apiClient.get(`/profiles/${studentId}`);
  },

  async updateProfile(studentId: string, data: Partial<StudentProfileData>): Promise<StudentProfileData> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const id = studentId.toUpperCase();
        if (mockProfiles[id]) {
          mockProfiles[id] = { ...mockProfiles[id], ...data };
        } else {
          mockProfiles[id] = {
            id,
            name: data.name || 'Student',
            email: data.email || '',
            branch: data.branch || 'CSE',
            cgpa: data.cgpa || 0,
            skills: data.skills || []
          };
        }
        resolve({ ...mockProfiles[id] });
      }, 500);
    });
    // return apiClient.put(`/profiles/${studentId}`, data);
  }
};
