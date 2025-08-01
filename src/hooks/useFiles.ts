import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { useAppStore } from '../store/useAppStore';

// Hook для загрузки аватара
export function useUploadAvatar() {
  const queryClient = useQueryClient();
  const addNotification = useAppStore((state) => state.addNotification);

  return useMutation({
    mutationFn: async ({ file, userId }: { file: File; userId: number }) => {
      return await apiService.uploadAvatar(file, userId);
    },
    onSuccess: (data) => {
      if (data.success) {
        addNotification({
          type: 'success',
          message: data.message || 'Аватар загружен успешно!',
        });
        // Инвалидируем кэш пользователя и текущего пользователя
        queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        queryClient.invalidateQueries({ queryKey: ['users'] });
      } else {
        addNotification({
          type: 'error',
          message: data.message || 'Ошибка загрузки аватара',
        });
      }
    },
    onError: (error: Error) => {
      addNotification({
        type: 'error',
        message: error.message || 'Ошибка загрузки аватара',
      });
    },
  });
}

// Hook для удаления аватара
export function useDeleteAvatar() {
  const queryClient = useQueryClient();
  const addNotification = useAppStore((state) => state.addNotification);

  return useMutation({
    mutationFn: async (userId: number) => {
      return await apiService.deleteAvatar(userId);
    },
    onSuccess: (data) => {
      if (data.success) {
        addNotification({
          type: 'success',
          message: data.message || 'Аватар удален успешно!',
        });
        // Инвалидируем кэш пользователя и текущего пользователя
        queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        queryClient.invalidateQueries({ queryKey: ['users'] });
      } else {
        addNotification({
          type: 'error',
          message: data.message || 'Ошибка удаления аватара',
        });
      }
    },
    onError: (error: Error) => {
      addNotification({
        type: 'error',
        message: error.message || 'Ошибка удаления аватара',
      });
    },
  });
}

// Helper hook для получения URL аватара
export function useAvatarUrl(filename?: string) {
  if (!filename) return null;
  return apiService.getAvatarUrl(filename);
} 