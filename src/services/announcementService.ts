import { Announcement } from '../types';
import { mockAnnouncements } from '../mocks';

/**
 * Duyuru Servisi
 */
export const announcementService = {
  getAll: async (): Promise<Announcement[]> => {
    await new Promise((r) => setTimeout(r, 500));
    return mockAnnouncements;
  },

  getById: async (id: string): Promise<Announcement | undefined> => {
    await new Promise((r) => setTimeout(r, 300));
    return mockAnnouncements.find((a) => a.id === id);
  },

  getByAgeGroup: async (ageGroupId: string): Promise<Announcement[]> => {
    await new Promise((r) => setTimeout(r, 400));
    return mockAnnouncements.filter(
      (a) => a.ageGroupIds.length === 0 || a.ageGroupIds.includes(ageGroupId)
    );
  },

  getGeneral: async (): Promise<Announcement[]> => {
    await new Promise((r) => setTimeout(r, 400));
    return mockAnnouncements.filter((a) => a.ageGroupIds.length === 0);
  },
};
