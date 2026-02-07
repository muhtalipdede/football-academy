import { create } from 'zustand';
import { User, UserRole } from '../types';
import { mockUsers } from '../mocks';

/**
 * Auth Store - Zustand ile kimlik doğrulama yönetimi
 * Firebase entegrasyonuna hazır yapı
 */
interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  loginWithRole: (role: UserRole) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, _password: string) => {
    set({ isLoading: true });
    // Mock login - Firebase entegrasyonunda değişecek
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const user = mockUsers.find((u) => u.email === email);
    if (user) {
      set({ user, isAuthenticated: true, isLoading: false });
    } else {
      set({ isLoading: false });
      throw new Error('Kullanıcı bulunamadı');
    }
  },

  loginWithRole: (role: UserRole) => {
    const user = mockUsers.find((u) => u.role === role);
    if (user) {
      set({ user, isAuthenticated: true, isLoading: false });
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, isLoading: false });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
}));
