import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { apiService } from '../services/api';
import type { LoginRequest, RegistrationRequest } from '../types/api';
import { useAppStore } from '../store/useAppStore';

// Hook для входа в систему
export function useLogin() {
  const queryClient = useQueryClient();
  const setUser = useAppStore((state) => state.setUser);
  const addNotification = useAppStore((state) => state.addNotification);

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      return await apiService.login(credentials);
    },
    onSuccess: (data) => {
      if (data.success && data.user) {
        if (data.token) {
          let token = data.token;
          if (token.startsWith('Bearer ')) {
            token = token.replace(/^Bearer\s+/i, '');
          }
          localStorage.setItem('token', token);
        }
        setUser(data.user);
        addNotification({
          type: 'success',
          message: data.message || 'Вход выполнен успешно!',
        });
      } else {
        addNotification({
          type: 'error',
          message: data.message || 'Ошибка входа',
        });
      }
    },
    onError: (error: Error) => {
      addNotification({
        type: 'error',
        message: error.message || 'Ошибка входа в систему',
      });
    },
  });
}

// Hook для регистрации
export function useRegister() {
  const addNotification = useAppStore((state) => state.addNotification);

  return useMutation({
    mutationFn: async (userData: RegistrationRequest) => {
      return await apiService.register(userData);
    },
    onSuccess: (data) => {
      if (data.success) {
        addNotification({
          type: 'success',
          message: data.message || 'Регистрация выполнена успешно!',
        });
      } else {
        addNotification({
          type: 'error',
          message: data.message || 'Ошибка регистрации',
        });
      }
    },
    onError: (error: Error) => {
      addNotification({
        type: 'error',
        message: error.message || 'Ошибка регистрации',
      });
    },
  });
}

// Hook для выхода из системы
export function useLogout() {
  const queryClient = useQueryClient();
  const clearUser = useAppStore((state) => state.clearUser);
  const addNotification = useAppStore((state) => state.addNotification);

  return useMutation({
    mutationFn: async () => {
      return await apiService.logout();
    },
    onSuccess: (data) => {
      if (data.success) {
        clearUser();
        localStorage.removeItem('token');
        addNotification({
          type: 'success',
          message: data.message || 'Выход выполнен успешно!',
        });
        queryClient.clear();
      } else {
        addNotification({
          type: 'error',
          message: data.message || 'Ошибка выхода',
        });
      }
    },
    onError: (error: Error) => {
      addNotification({
        type: 'error',
        message: error.message || 'Ошибка выхода из системы',
      });
    },
  });
}

// Hook для получения текущего пользователя
export function useCurrentUser(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      return await apiService.getCurrentUser();
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 минут
    enabled: options?.enabled !== undefined ? options.enabled : true,
  });
}

// Hook для проверки доступности имени пользователя
export function useCheckUsername(username: string) {
  return useQuery({
    queryKey: ['checkUsername', username],
    queryFn: async () => {
      return await apiService.checkUsername(username);
    },
    enabled: username.length > 2,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
} 