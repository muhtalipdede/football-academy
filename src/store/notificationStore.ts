import { create } from 'zustand';
import { Notification } from '../types';
import { mockNotifications } from '../mocks';

/**
 * Bildirim Store
 */
interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;

  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Notification) => void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: mockNotifications,
  unreadCount: mockNotifications.filter((n) => !n.isRead).length,

  markAsRead: (id: string) => {
    const notifications = get().notifications.map((n) =>
      n.id === id ? { ...n, isRead: true } : n
    );
    set({
      notifications,
      unreadCount: notifications.filter((n) => !n.isRead).length,
    });
  },

  markAllAsRead: () => {
    const notifications = get().notifications.map((n) => ({ ...n, isRead: true }));
    set({ notifications, unreadCount: 0 });
  },

  addNotification: (notification: Notification) => {
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));
  },
}));
