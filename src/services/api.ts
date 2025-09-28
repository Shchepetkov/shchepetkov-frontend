import axios from 'axios';
import type { RegisterApiResponse } from '../types';

// Создаем axios инстанс с базовой конфигурацией
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8086/api',
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерцептор для запросов
api.interceptors.request.use(
  (config) => {
    try {
      // Добавляем токен авторизации если есть
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Добавлен токен в заголовок:', `Bearer ${token.substring(0, 20)}...`);
      } else {
        console.log('Токен не найден в localStorage и sessionStorage');
      }
      return config;
    } catch (error) {
      console.error('Ошибка в request interceptor:', error);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error('Ошибка в request interceptor:', error);
    return Promise.reject(error);
  }
);

// Интерцептор для ответов
api.interceptors.response.use(
  (response) => {
    try {
      return response;
    } catch (error) {
      console.error('Ошибка в response interceptor:', error);
      return Promise.reject(error);
    }
  },
  (error) => {
    try {
      console.log('API Error:', error);
      
      if (error.response?.status === 401) {
        // Очищаем токен при 401 ошибке
        console.log('Получена 401 ошибка, очищаем токен и пользователя');
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('user');
        // Отправляем событие для обновления состояния в других компонентах
        window.dispatchEvent(new CustomEvent('auth-logout'));
      }
      
      // Логируем детали ошибки для отладки
      if (error.response) {
        console.log('Response error:', error.response.data);
        console.log('Status:', error.response.status);
      } else if (error.request) {
        console.log('Request error:', error.request);
      } else {
        console.log('Error:', error.message);
      }
      
      return Promise.reject(error);
    } catch (interceptorError) {
      console.error('Ошибка в response interceptor:', interceptorError);
      return Promise.reject(error);
    }
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
    api.post('/auth/login', { username, password }),
  
  // Регистрация
  register: (username: string, password: string) => 
    api.post<RegisterApiResponse>('/registration', { username, password }),
  
  // Выход
  logout: () => api.post('/auth/logout'),
  
  // Получить текущего пользователя
  getCurrentUser: () => api.get('/auth/me'),
  
  // Обновить токен
  refreshToken: () => api.post('/auth/refresh'),
  
  // Проверить валидность токена
  validateToken: () => api.get('/auth/validate'),
};

export default api;
