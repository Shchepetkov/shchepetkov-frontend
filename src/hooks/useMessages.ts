import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../services/api';
import type { Message, MessageRequest } from '../types/api';
import { useAppStore } from '../store/useAppStore';

// Hook для получения всех сообщений
export function useMessages() {
  return useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      return await apiService.getAllMessages();
    },
    staleTime: 1 * 60 * 1000, // 1 минута
  });
}

// Hook для получения сообщения по ID
export function useMessage(id: number) {
  return useQuery({
    queryKey: ['message', id],
    queryFn: async () => {
      return await apiService.getMessageById(id);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

// Hook для получения сообщений по тегу
export function useMessagesByTag(tag: string) {
  return useQuery({
    queryKey: ['messagesByTag', tag],
    queryFn: async () => {
      return await apiService.getMessagesByTag(tag);
    },
    enabled: tag.length > 0,
    staleTime: 2 * 60 * 1000, // 2 минуты
  });
}

// Hook для получения сообщений по автору
export function useMessagesByAuthor(authorId: number) {
  return useQuery({
    queryKey: ['messagesByAuthor', authorId],
    queryFn: async () => {
      return await apiService.getMessagesByAuthor(authorId);
    },
    enabled: !!authorId,
    staleTime: 2 * 60 * 1000, // 2 минуты
  });
}

// Hook для создания сообщения
export function useCreateMessage() {
  const queryClient = useQueryClient();
  const addNotification = useAppStore((state) => state.addNotification);

  return useMutation({
    mutationFn: async (message: MessageRequest) => {
      return await apiService.createMessage(message);
    },
    onSuccess: (newMessage) => {
      addNotification({
        type: 'success',
        message: 'Сообщение создано успешно!',
      });
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      queryClient.invalidateQueries({ queryKey: ['messagesByAuthor', newMessage.author.id] });
      if (newMessage.tag) {
        queryClient.invalidateQueries({ queryKey: ['messagesByTag', newMessage.tag] });
      }
    },
    onError: (error: Error) => {
      addNotification({
        type: 'error',
        message: error.message || 'Ошибка создания сообщения',
      });
    },
  });
}

// Hook для обновления сообщения
export function useUpdateMessage() {
  const queryClient = useQueryClient();
  const addNotification = useAppStore((state) => state.addNotification);

  return useMutation({
    mutationFn: async ({ id, message }: { id: number; message: Message }) => {
      return await apiService.updateMessage(id, message);
    },
    onSuccess: (updatedMessage) => {
      addNotification({
        type: 'success',
        message: 'Сообщение обновлено успешно!',
      });
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      queryClient.invalidateQueries({ queryKey: ['message', updatedMessage.id] });
      queryClient.invalidateQueries({ queryKey: ['messagesByAuthor', updatedMessage.author.id] });
      if (updatedMessage.tag) {
        queryClient.invalidateQueries({ queryKey: ['messagesByTag', updatedMessage.tag] });
      }
    },
    onError: (error: Error) => {
      addNotification({
        type: 'error',
        message: error.message || 'Ошибка обновления сообщения',
      });
    },
  });
}

// Hook для удаления сообщения
export function useDeleteMessage() {
  const queryClient = useQueryClient();
  const addNotification = useAppStore((state) => state.addNotification);

  return useMutation({
    mutationFn: async (id: number) => {
      return await apiService.deleteMessage(id);
    },
    onSuccess: () => {
      addNotification({
        type: 'success',
        message: 'Сообщение удалено успешно!',
      });
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
    onError: (error: Error) => {
      addNotification({
        type: 'error',
        message: error.message || 'Ошибка удаления сообщения',
      });
    },
  });
} 