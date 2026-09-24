import type { AnalyticsData } from './types';
import { apiClient } from './client';

export const analyticsService = {
  async getDescriptiveAnalytics(): Promise<AnalyticsData> {
    return apiClient.get('/stats');
  }
};
