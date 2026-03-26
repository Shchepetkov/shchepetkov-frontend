import axios from 'axios';
import type { LoginApiResponse, RegisterApiResponse, UpdateProfilePayload, AuthUserDto } from '../types';
import { getStoredAuth } from '../utils/authStorage';

// Создаем axios инстанс с базовой конфигурацией
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8086/api',
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const extractApiErrorMessage = (error: any, fallback = 'Неизвестная ошибка'): string => {
  const payload = error?.response?.data;
  if (typeof payload === 'string') return payload;
  if (payload?.message && typeof payload.message === 'string') return payload.message;
  if (payload?.error && typeof payload.error === 'string') return payload.error;
  if (error?.request) return 'Сервер недоступен. Проверьте, что backend запущен';
  return error?.message || fallback;
};

// Интерцептор для запросов
api.interceptors.request.use(
  (config) => {
    const { token } = getStoredAuth();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Интерцептор для ответов
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('user');
      window.dispatchEvent(new CustomEvent('auth-logout'));
    }
    return Promise.reject(error);
  }
);

// API методы для работы с резюме
export const resumeApi = {
  // Получить данные резюме
  getResume: () => api.get('/resume'),
  
  // Обновить данные резюме
  updateResume: (data: any) => api.put('/resume', data),
  
  // Получить опыт работы
  getExperience: () => api.get('/resume/experience'),
  
  // Получить навыки
  getSkills: () => api.get('/resume/skills'),
  
  // Получить проекты
  getProjects: () => api.get('/resume/projects'),
  
  // Отправить контактную форму
  sendContactForm: (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => api.post('/contact', data),
};

// API методы для аутентификации
export const authApi = {
  // Вход
  login: (username: string, password: string) => 
    api.post<LoginApiResponse>('/auth/login', { username, password }),
  
  // Регистрация
  register: (username: string, password: string) => 
    api.post<RegisterApiResponse>('/registration', { username, password }),
  
  // Выход
  logout: () => api.post('/auth/logout'),
  
  // Получить текущего пользователя
  getCurrentUser: () => api.get<{ success: boolean; user?: LoginApiResponse['user']; message?: string }>('/auth/me'),
  
  // Обновить токен
  refreshToken: () => api.post('/auth/refresh'),
  
  // Проверить валидность токена
  validateToken: () => api.get('/auth/validate'),
};

export const userApi = {
  getMyProfile: () => api.get<AuthUserDto>('/users/me/profile'),
  updateMyProfile: (payload: UpdateProfilePayload) => api.put<AuthUserDto>('/users/me/profile', payload),
};

export default api;
