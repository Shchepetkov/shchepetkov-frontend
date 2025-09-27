import { useState, useEffect } from 'react';
import { authApi } from '../services/api';
import { storage } from '../utils';
import type { User, AuthResponse } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = storage.get<User>('user');
    return savedUser;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      storage.set('user', user);
    } else {
      storage.remove('user');
      storage.remove('authToken');
    }
  }, [user]);

  // Проверяем токен при загрузке приложения
  useEffect(() => {
    const checkAuth = async () => {
      const token = storage.get<string>('authToken');
      if (token && !user) {
        try {
          const response = await authApi.getCurrentUser();
          setUser(response.data);
        } catch (error) {
          // Токен недействителен, очищаем его
          storage.remove('authToken');
        }
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authApi.login(email, password);
      const { user: userData, token } = response.data;
      
      // Сохраняем токен и пользователя
      storage.set('authToken', token);
      setUser(userData);
      
      return { success: true, user: userData };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Ошибка входа';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authApi.register(name, email, password);
      const { user: userData, token } = response.data;
      
      // Сохраняем токен и пользователя
      storage.set('authToken', token);
      setUser(userData);
      
      return { success: true, user: userData };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Ошибка регистрации';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    } finally {
      // Очищаем данные независимо от результата API запроса
      storage.remove('authToken');
      storage.remove('user');
      setUser(null);
      setError(null);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
    isAuthenticated: !!user
  };
}; 