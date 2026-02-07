import { Player } from '../types';
import { mockPlayers } from '../mocks';

/**
 * Sporcu Servisi - Mock veri katmanı
 * Firebase entegrasyonunda bu fonksiyonlar Firestore çağrılarına dönüşecek
 */
export const playerService = {
  getAll: async (): Promise<Player[]> => {
    await new Promise((r) => setTimeout(r, 500));
    return mockPlayers;
  },

  getById: async (id: string): Promise<Player | undefined> => {
    await new Promise((r) => setTimeout(r, 300));
    return mockPlayers.find((p) => p.id === id);
  },

  getByAgeGroup: async (ageGroupId: string): Promise<Player[]> => {
    await new Promise((r) => setTimeout(r, 400));
    return mockPlayers.filter((p) => p.ageGroupIds.includes(ageGroupId));
  },

  getByParent: async (parentId: string): Promise<Player[]> => {
    await new Promise((r) => setTimeout(r, 300));
    return mockPlayers.filter((p) => p.parentId === parentId);
  },

  getActive: async (): Promise<Player[]> => {
    await new Promise((r) => setTimeout(r, 400));
    return mockPlayers.filter((p) => p.isActive);
  },

  create: async (player: Omit<Player, 'id'>): Promise<Player> => {
    await new Promise((r) => setTimeout(r, 500));
    const newPlayer: Player = { ...player, id: `player-${Date.now()}` };
    return newPlayer;
  },

  update: async (id: string, data: Partial<Player>): Promise<Player> => {
    await new Promise((r) => setTimeout(r, 500));
    const player = mockPlayers.find((p) => p.id === id);
    if (!player) throw new Error('Sporcu bulunamadı');
    return { ...player, ...data };
  },

  delete: async (_id: string): Promise<void> => {
    await new Promise((r) => setTimeout(r, 300));
  },
};
