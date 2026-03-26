import { useState, useEffect } from 'react';
import { loginRequest, logoutRequest, registerRequest } from '../services/authService';
import { extractApiErrorMessage } from '../services/api';
import { clearStoredAuth, getStoredAuth, setStoredAuth, subscribeAuthStorageSync } from '../utils/authStorage';
import type { User, AuthResponse } from '../types';

const toFrontendUser = (apiUser: {
  id: number;
  username: string;
  active: boolean;
  avatarPath?: string;
  fullName?: string;
  email?: string;
  location?: string;
  bio?: string;
  createdAt?: string;
  updatedAt?: string;
}): User => {
  const now = new Date().toISOString();
  return {
    id: apiUser.id,
    username: apiUser.username,
    name: apiUser.fullName || apiUser.username,
    fullName: apiUser.fullName,
    email: apiUser.email || '',
    location: apiUser.location,
    bio: apiUser.bio,
    active: apiUser.active,
    avatarPath: apiUser.avatarPath,
    createdAt: apiUser.createdAt || now,
    updatedAt: apiUser.updatedAt || now,
  };
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (user) {
      const { token } = getStoredAuth();
      if (token) {
        setStoredAuth(token, user);
      }
    }
  }, [user]);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const { token, user: savedUser } = getStoredAuth();

        if (token && savedUser) {
          setUser(savedUser);
        } else {
          clearStoredAuth();
          setUser(null);
        }
        setIsInitialized(true);
      } catch {
        setUser(null);
        setIsInitialized(true);
      }
    };

    const timeoutId = setTimeout(initializeAuth, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    return subscribeAuthStorageSync(setUser);
  }, []);

  const login = async (username: string, password: string): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const payload = await loginRequest(username, password);
      const token = payload.token;

      if (!payload.success || !token || !payload.user) {
        const errorMessage = 'Токен не получен от сервера';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }

      const userData = toFrontendUser(payload.user);
      setUser(userData);
      setStoredAuth(token, userData);

      return { success: true, user: userData };
    } catch (error: any) {
      const errorMessage = extractApiErrorMessage(
        error,
        'Сервер недоступен. Проверьте, что Java backend запущен на порту 8086'
      );
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, password: string): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const responseData = await registerRequest(username, password);

      if (!responseData.success) {
        const errorMessage = responseData.message || 'Ошибка регистрации';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }

      return await login(username, password);
    } catch (error: any) {
      const errorMessage = extractApiErrorMessage(
        error,
        'Сервер недоступен. Проверьте, что Java backend запущен на порту 8086'
      );
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } catch {
      // Ignore logout API failures and clear local state anyway.
    } finally {
      clearStoredAuth();
      setUser(null);
      setError(null);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const updateUser = (partial: Partial<User>) => {
    setUser((prevUser) => (prevUser ? { ...prevUser, ...partial } : prevUser));
  };

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    updateUser,
    clearError,
    isAuthenticated: !!user,
    isInitialized
  };
}; 