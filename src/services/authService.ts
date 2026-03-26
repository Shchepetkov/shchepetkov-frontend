/**
 * @file: authService.ts
 * @description: Network-layer auth operations and response normalization
 * @dependencies: src/services/api.ts, src/types/index.ts
 * @created: 2026-03-26
 */

import { authApi } from './api';
import type { AuthUserDto, RegisterApiResponse } from '../types';

export interface LoginResult {
  success: boolean;
  user?: AuthUserDto;
  token?: string;
  message?: string;
}

export const normalizeToken = (value?: string): string | null => {
  if (!value) return null;
  return value.startsWith('Bearer ') ? value.slice(7) : value;
};

export const loginRequest = async (username: string, password: string): Promise<LoginResult> => {
  const { data } = await authApi.login(username, password);
  return {
    success: data.success,
    user: data.user,
    token: normalizeToken(data.token) ?? undefined,
    message: data.message,
  };
};

export const registerRequest = async (username: string, password: string): Promise<RegisterApiResponse> => {
  const { data } = await authApi.register(username, password);
  return data;
};

export const logoutRequest = async (): Promise<void> => {
  await authApi.logout();
};
