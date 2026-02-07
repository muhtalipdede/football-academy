import { MediaItem } from '../types';
import { mockMedia } from '../mocks';

/**
 * Medya Servisi
 */
export const mediaService = {
  getAll: async (): Promise<MediaItem[]> => {
    await new Promise((r) => setTimeout(r, 500));
    return mockMedia;
  },

  getById: async (id: string): Promise<MediaItem | undefined> => {
    await new Promise((r) => setTimeout(r, 300));
    return mockMedia.find((m) => m.id === id);
  },

  getPhotos: async (): Promise<MediaItem[]> => {
    await new Promise((r) => setTimeout(r, 400));
    return mockMedia.filter((m) => m.type === 'photo');
  },

  getVideos: async (): Promise<MediaItem[]> => {
    await new Promise((r) => setTimeout(r, 400));
    return mockMedia.filter((m) => m.type === 'video');
  },

  getDocuments: async (): Promise<MediaItem[]> => {
    await new Promise((r) => setTimeout(r, 400));
    return mockMedia.filter((m) => m.type === 'document');
  },

  getByAgeGroup: async (ageGroupId: string): Promise<MediaItem[]> => {
    await new Promise((r) => setTimeout(r, 400));
    return mockMedia.filter(
      (m) => m.ageGroupIds.length === 0 || m.ageGroupIds.includes(ageGroupId)
    );
  },
};
