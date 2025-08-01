import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../services/api';
import type { RoleUpdateRequest } from '../types/api';
import { useAppStore } from '../store/useAppStore';

// Hook для получения всех пользователей (админ)
export function useAdminUsers() {
  return useQuery({
    queryKey: ['adminUsers'],
    queryFn: async () => {
      return await apiService.getAllUsersAdmin();
    },
    staleTime: 1 * 60 * 1000, // 1 минута
  });
}

// Hook для получения статистики администратора
export function useAdminStats() {
  return useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      return await apiService.getAdminStats();
    },
    staleTime: 2 * 60 * 1000, // 2 минуты
  });
}

// Hook для активации пользователя
export function useActivateUser() {
  const queryClient = useQueryClient();
  const addNotification = useAppStore((state) => state.addNotification);

  return useMutation({
    mutationFn: async (userId: number) => {
      return await apiService.activateUser(userId);
    },
    onSuccess: (data) => {
      if (data.success) {
        addNotification({
          type: 'success',
          message: data.message || 'Пользователь активирован успешно!',
        });
      } else {
        addNotification({
          type: 'error',
          message: data.message || 'Ошибка активации пользователя',
        });
      }
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: Error) => {
      addNotification({
        type: 'error',
        message: error.message || 'Ошибка активации пользователя',
      });
    },
  });
}

// Hook для деактивации пользователя
export function useDeactivateUser() {
  const queryClient = useQueryClient();
  const addNotification = useAppStore((state) => state.addNotification);

  return useMutation({
    mutationFn: async (userId: number) => {
      return await apiService.deactivateUser(userId);
    },
    onSuccess: (data) => {
      if (data.success) {
        addNotification({
          type: 'success',
          message: data.message || 'Пользователь деактивирован успешно!',
        });
      } else {
        addNotification({
          type: 'error',
          message: data.message || 'Ошибка деактивации пользователя',
        });
      }
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: Error) => {
      addNotification({
        type: 'error',
        message: error.message || 'Ошибка деактивации пользователя',
      });
    },
  });
}

// Hook для обновления ролей пользователя
export function useUpdateUserRoles() {
  const queryClient = useQueryClient();
  const addNotification = useAppStore((state) => state.addNotification);

  return useMutation({
    mutationFn: async ({ userId, roles }: { userId: number; roles: RoleUpdateRequest }) => {
      return await apiService.updateUserRoles(userId, roles);
    },
    onSuccess: (data) => {
      if (data.success) {
        addNotification({
          type: 'success',
          message: data.message || 'Роли пользователя обновлены успешно!',
        });
      } else {
        addNotification({
          type: 'error',
          message: data.message || 'Ошибка обновления ролей пользователя',
        });
      }
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
    onError: (error: Error) => {
      addNotification({
        type: 'error',
        message: error.message || 'Ошибка обновления ролей пользователя',
      });
    },
  });
} 