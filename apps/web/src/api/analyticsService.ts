import type { AnalyticsData } from './types';

const mockAnalytics: AnalyticsData = {
  totalCompanies: 45,
  totalPlacements: 180,
  packageDistribution: {
    '< 6 LPA': 210,
    '6-12 LPA': 154,
    '12-25 LPA': 215,
    '> 25 LPA': 52
  },
  skillDemand: {
    'React': 85,
    'Node.js': 70,
    'Python': 65,
    'Java': 60,
    'SQL': 55
  },
  branchDistribution: {
    'CSE': 180,
    'IT': 140,
    'CE': 120,
    'ECE': 90,
    'ME': 45,
    'EE': 35
  },
  yearWiseTrends: {
    '2023': 4.5,
    '2024': 8.2,
    '2025': 10.5,
    '2026': 12.4
  }
};

export const analyticsService = {
  async getDescriptiveAnalytics(): Promise<AnalyticsData> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...mockAnalytics });
      }, 400);
    });
    // return apiClient.get('/analytics');
  }
};
