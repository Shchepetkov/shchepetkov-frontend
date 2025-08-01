import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../services/api';
import type { User } from '../types/api';
import { useAppStore } from '../store/useAppStore';

// Hook для получения всех пользователей
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      return await apiService.getAllUsers();
    },
    staleTime: 2 * 60 * 1000, // 2 минуты
  });
}

// Hook для получения пользователя по ID
export function useUser(id: number) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      return await apiService.getUserById(id);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

// Hook для получения пользователя по имени
export function useUserByUsername(username: string) {
  return useQuery({
    queryKey: ['userByUsername', username],
    queryFn: async () => {
      return await apiService.getUserByUsername(username);
    },
    enabled: username.length > 0,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

// Hook для проверки существования имени пользователя
export function useCheckUsernameExists(username: string) {
  return useQuery({
    queryKey: ['checkUsernameExists', username],
    queryFn: async () => {
      return await apiService.checkUsernameExists(username);
    },
    enabled: username.length > 2,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

// Hook для получения количества пользователей
export function useUserCount() {
  return useQuery({
    queryKey: ['userCount'],
    queryFn: async () => {
      return await apiService.getUserCount();
    },
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

// Hook для получения администраторов
export function useAdmins() {
  return useQuery({
    queryKey: ['admins'],
    queryFn: async () => {
      return await apiService.getAdmins();
    },
    staleTime: 2 * 60 * 1000, // 2 минуты
  });
}

// Hook для получения активных пользователей
export function useActiveUsers() {
  return useQuery({
    queryKey: ['activeUsers'],
    queryFn: async () => {
      return await apiService.getActiveUsers();
    },
    staleTime: 2 * 60 * 1000, // 2 минуты
  });
}

// Hook для регистрации пользователя
export function useRegisterUser() {
  const queryClient = useQueryClient();
  const addNotification = useAppStore((state) => state.addNotification);

  return useMutation({
    mutationFn: async (user: User) => {
      return await apiService.registerUser(user);
    },
    onSuccess: (message) => {
      addNotification({
        type: 'success',
        message: message || 'Пользователь зарегистрирован успешно!',
      });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['userCount'] });
    },
    onError: (error: Error) => {
      addNotification({
        type: 'error',
        message: error.message || 'Ошибка регистрации пользователя',
      });
    },
  });
}

// Hook для обновления пользователя
export function useUpdateUser() {
  const queryClient = useQueryClient();
  const addNotification = useAppStore((state) => state.addNotification);

  return useMutation({
    mutationFn: async ({ id, user }: { id: number; user: User }) => {
      return await apiService.updateUser(id, user);
    },
    onSuccess: (updatedUser) => {
      addNotification({
        type: 'success',
        message: 'Пользователь обновлен успешно!',
      });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', updatedUser.id] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
    onError: (error: Error) => {
      addNotification({
        type: 'error',
        message: error.message || 'Ошибка обновления пользователя',
      });
    },
  });
}

// Hook для удаления пользователя
export function useDeleteUser() {
  const queryClient = useQueryClient();
  const addNotification = useAppStore((state) => state.addNotification);

  return useMutation({
    mutationFn: async (id: number) => {
      return await apiService.deleteUser(id);
    },
    onSuccess: () => {
      addNotification({
        type: 'success',
        message: 'Пользователь удален успешно!',
      });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['userCount'] });
    },
    onError: (error: Error) => {
      addNotification({
        type: 'error',
        message: error.message || 'Ошибка удаления пользователя',
      });
    },
  });
} 