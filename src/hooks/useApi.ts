import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../services/api';

// Generic hook for GET requests
export function useApiQuery<T>(
  key: string[],
  endpoint: string,
  options?: {
    enabled?: boolean;
    refetchOnWindowFocus?: boolean;
    staleTime?: number;
  }
) {
  return useQuery({
    queryKey: key,
    queryFn: async (): Promise<T> => {
      return await apiService.get<T>(endpoint);
    },
    enabled: options?.enabled ?? true,
    refetchOnWindowFocus: options?.refetchOnWindowFocus ?? false,
    staleTime: options?.staleTime ?? 5 * 60 * 1000, // 5 minutes
  });
}

// Generic hook for POST requests
export function useApiMutation<T, V>(
  endpoint: string,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
    invalidateQueries?: string[];
  }
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: V): Promise<T> => {
      return await apiService.post<T>(endpoint, data);
    },
    onSuccess: (data) => {
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey: [queryKey] });
        });
      }
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });
}

// Generic hook for PUT requests
export function useApiPutMutation<T, V>(
  endpoint: string,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
    invalidateQueries?: string[];
  }
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: V): Promise<T> => {
      return await apiService.put<T>(endpoint, data);
    },
    onSuccess: (data) => {
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey: [queryKey] });
        });
      }
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });
}

// Generic hook for DELETE requests
export function useApiDeleteMutation<T>(
  endpoint: string,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
    invalidateQueries?: string[];
  }
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<T> => {
      return await apiService.delete<T>(endpoint);
    },
    onSuccess: (data) => {
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey: [queryKey] });
        });
      }
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });
} 