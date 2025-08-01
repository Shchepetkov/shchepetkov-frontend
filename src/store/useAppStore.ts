import { create } from 'zustand';
import type { User, Notification } from '../types/api';

interface AppState {
  theme: 'light' | 'dark';
  user: User | null;
  isLoading: boolean;
  notifications: Notification[];
}

interface AppActions {
  setTheme: (theme: 'light' | 'dark') => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  clearUser: () => void;
}

type AppStore = AppState & AppActions;

export const useAppStore = create<AppStore>((set) => ({
  // State
  theme: 'light',
  user: null,
  isLoading: false,
  notifications: [],

  // Actions
  setTheme: (theme) => set({ theme }),
  
  setUser: (user) => set({ user }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          ...notification,
          id: Date.now().toString(),
        },
      ],
    })),
  
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  
  clearNotifications: () => set({ notifications: [] }),
  
  clearUser: () => set({ user: null }),
})); 