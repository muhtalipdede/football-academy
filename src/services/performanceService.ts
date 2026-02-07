import { PerformanceReport } from '../types';
import { mockPerformanceReports } from '../mocks';

/**
 * Performans Servisi
 */
export const performanceService = {
  getAll: async (): Promise<PerformanceReport[]> => {
    await new Promise((r) => setTimeout(r, 500));
    return mockPerformanceReports;
  },

  getByPlayer: async (playerId: string): Promise<PerformanceReport[]> => {
    await new Promise((r) => setTimeout(r, 400));
    return mockPerformanceReports.filter((p) => p.playerId === playerId);
  },

  getById: async (id: string): Promise<PerformanceReport | undefined> => {
    await new Promise((r) => setTimeout(r, 300));
    return mockPerformanceReports.find((p) => p.id === id);
  },
};
