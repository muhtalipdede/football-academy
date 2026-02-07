import { Match } from '../types';
import { mockMatches } from '../mocks';

/**
 * Maç Servisi
 */
export const matchService = {
  getAll: async (): Promise<Match[]> => {
    await new Promise((r) => setTimeout(r, 500));
    return mockMatches;
  },

  getById: async (id: string): Promise<Match | undefined> => {
    await new Promise((r) => setTimeout(r, 300));
    return mockMatches.find((m) => m.id === id);
  },

  getUpcoming: async (): Promise<Match[]> => {
    await new Promise((r) => setTimeout(r, 400));
    return mockMatches.filter((m) => m.status === 'upcoming');
  },

  getCompleted: async (): Promise<Match[]> => {
    await new Promise((r) => setTimeout(r, 400));
    return mockMatches.filter((m) => m.status === 'completed');
  },

  getByAgeGroup: async (ageGroupId: string): Promise<Match[]> => {
    await new Promise((r) => setTimeout(r, 400));
    return mockMatches.filter((m) => m.ageGroupId === ageGroupId);
  },

  updateScore: async (id: string, homeScore: number, awayScore: number): Promise<Match> => {
    await new Promise((r) => setTimeout(r, 500));
    const match = mockMatches.find((m) => m.id === id);
    if (!match) throw new Error('Maç bulunamadı');
    return { ...match, homeScore, awayScore, status: 'completed' };
  },
};
