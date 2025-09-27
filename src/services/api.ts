import axios from 'axios';

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
    // Добавляем токен авторизации если есть
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Интерцептор для ответов
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Очищаем токен при 401 ошибке
      localStorage.removeItem('authToken');
      window.location.href = '/auth';
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
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  
  // Регистрация
  register: (name: string, email: string, password: string) => 
    api.post('/auth/register', { name, email, password }),
  
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
