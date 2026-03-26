/**
 * @file: authStorage.ts
 * @description: Storage-layer helpers for auth session persistence/sync
 * @dependencies: src/types/index.ts, src/utils/index.ts
 * @created: 2026-03-26
 */

import { storage } from './index';
import type { User } from '../types';

const TOKEN_KEY = 'authToken';
const USER_KEY = 'user';

export const getStoredAuth = (): { token: string | null; user: User | null } => ({
  token: storage.get<string>(TOKEN_KEY),
  user: storage.get<User>(USER_KEY),
});

export const setStoredAuth = (token: string, user: User): void => {
  storage.set(TOKEN_KEY, token);
  storage.set(USER_KEY, user);
};

export const clearStoredAuth = (): void => {
  storage.remove(TOKEN_KEY);
  storage.remove(USER_KEY);
  sessionStorage.removeItem('welcomeShown');
};

export const subscribeAuthStorageSync = (onChange: (user: User | null) => void): (() => void) => {
  const handleStorageChange = (e: StorageEvent) => {
    if (e.storageArea !== localStorage) return;
    if (e.key !== TOKEN_KEY && e.key !== USER_KEY) return;

    const { token, user } = getStoredAuth();
    onChange(token && user ? user : null);
  };

  const handleAuthLogout = () => {
    clearStoredAuth();
    onChange(null);
  };

  window.addEventListener('storage', handleStorageChange);
  window.addEventListener('auth-logout', handleAuthLogout);

  return () => {
    window.removeEventListener('storage', handleStorageChange);
    window.removeEventListener('auth-logout', handleAuthLogout);
  };
};
