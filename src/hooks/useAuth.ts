import { useState, useEffect } from 'react';
import { authApi } from '../services/api';
import { storage } from '../utils';
import type { User, AuthResponse } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (user) {
      // Сохраняем пользователя только если его еще нет в localStorage
      const savedUser = storage.get<User>('user');
      if (!savedUser || savedUser.id !== user.id) {
        storage.set('user', user);
        console.log('Пользователь сохранен в useEffect:', user);
      }
    } else {
      // Удаляем данные только если пользователь действительно null И нет сохраненных данных
      const savedUser = storage.get<User>('user');
      const savedToken = storage.get<string>('authToken');
      
      if (!savedUser && !savedToken) {
        storage.remove('user');
        storage.remove('authToken');
        console.log('Данные удалены в useEffect - нет сохраненных данных');
      } else {
        console.log('Данные НЕ удалены в useEffect - есть сохраненные данные');
      }
    }
    
    // Убираем BroadcastChannel - он вызывает ошибки
    // Синхронизация будет через localStorage events
  }, [user]);

  // Инициализация авторизации при загрузке приложения
  useEffect(() => {
    const initializeAuth = () => {
      try {
        console.log('=== ИНИЦИАЛИЗАЦИЯ АВТОРИЗАЦИИ ===');
        const token = storage.get<string>('authToken');
        const savedUser = storage.get<User>('user');
        
        console.log('Initializing auth:', { hasToken: !!token, hasUser: !!savedUser });
        
        if (token && savedUser) {
          // Восстанавливаем пользователя из localStorage
          console.log('Восстанавливаем пользователя из localStorage:', savedUser);
          setUser(savedUser);
        } else if (token && !savedUser) {
          // Если есть токен, но нет пользователя, очищаем токен
          console.log('Токен есть, но пользователь не найден, очищаем токен');
          storage.remove('authToken');
          setUser(null);
        } else if (!token && savedUser) {
          // Если есть пользователь, но нет токена, очищаем пользователя
          console.log('Пользователь есть, но токен не найден, очищаем пользователя');
          storage.remove('user');
          setUser(null);
        } else {
          // Нет токена или пользователя
          console.log('Нет сохраненных данных авторизации');
          setUser(null);
        }
        
        setIsInitialized(true);
        console.log('=== ИНИЦИАЛИЗАЦИЯ ЗАВЕРШЕНА ===');
      } catch (error) {
        console.error('Ошибка при инициализации авторизации:', error);
        setUser(null);
        setIsInitialized(true);
      }
    };

    // Небольшая задержка для правильной инициализации
    const timeoutId = setTimeout(initializeAuth, 100);
    
    return () => clearTimeout(timeoutId);
  }, []);

  // Синхронизация между вкладками
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      // Игнорируем события от текущей вкладки
      if (e.storageArea !== localStorage) return;
      
      if (e.key === 'authToken' || e.key === 'user') {
        console.log('Storage change detected:', e.key, e.newValue);
        
        const token = storage.get<string>('authToken');
        const savedUser = storage.get<User>('user');
        
        if (token && savedUser) {
          console.log('Syncing user from storage:', savedUser);
          setUser(savedUser);
        } else if (!token || !savedUser) {
          console.log('Clearing user from storage sync');
          setUser(null);
        }
      }
    };

    // Обработка события принудительного выхода
    const handleAuthLogout = () => {
      console.log('Получено событие принудительного выхода');
      setUser(null);
      storage.remove('authToken');
      storage.remove('user');
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('auth-logout', handleAuthLogout);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-logout', handleAuthLogout);
    };
  }, []);

  const login = async (username: string, password: string): Promise<AuthResponse> => {
    console.log('=== ФУНКЦИЯ LOGIN ВЫЗВАНА ===');
    console.log('Username:', username);
    console.log('Password length:', password.length);
    console.log('Current user state:', user);
    console.log('Current loading state:', isLoading);
    
    setIsLoading(true);
    setError(null);
    
    console.log('После setLoading(true)');
    
    try {
      console.log('=== НАЧАЛО ПРОЦЕССА ВХОДА ===');
      console.log('Попытка входа с username:', username);
      console.log('API URL:', import.meta.env.VITE_API_URL || 'http://localhost:8086/api');
      
      // Прямой вызов API без лишнего Promise.resolve
      const response = await authApi.login(username, password);
      console.log('=== ОТВЕТ ОТ API ===');
      console.log('Полный ответ:', response);
      console.log('Response data:', response.data);
      console.log('Response status:', response.status);
      
      // Backend возвращает токен в формате "Bearer <token>", убираем "Bearer " prefix
      let token = response.data;
      console.log('Исходный токен:', token);
      
      if (typeof token === 'string' && token.startsWith('Bearer ')) {
        token = token.substring(7); // Убираем "Bearer " (7 символов)
        console.log('Токен после удаления Bearer prefix:', token);
      }
      
      if (!token) {
        console.error('Токен пустой или не получен от сервера');
        throw new Error('Токен не получен от сервера');
      }
      
      // Сохраняем токен без Bearer prefix
      storage.set('authToken', token);
      console.log('Токен сохранен в localStorage');
      
      // Проверяем, что токен действительно сохранился
      const savedToken = storage.get<string>('authToken');
      console.log('Проверка сохранения токена:', savedToken ? 'Токен сохранен' : 'Токен НЕ сохранен');
      
      // Создаем объект пользователя из username
      const userData = {
        id: username,
        name: username,
        email: `${username}@example.com`, // Заглушка, так как API не возвращает email
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setUser(userData);
      console.log('Пользователь установлен в состоянии:', userData);
      
      // Сохраняем пользователя в localStorage
      storage.set('user', userData);
      console.log('Пользователь сохранен в localStorage');
      
      // Проверяем, что пользователь действительно сохранен
      const savedUser = storage.get<User>('user');
      console.log('Проверка сохранения пользователя:', savedUser ? 'Пользователь сохранен' : 'Пользователь НЕ сохранен');
      
      console.log('=== УСПЕШНЫЙ ВХОД ЗАВЕРШЕН ===');
      
      return { success: true, user: userData };
    } catch (error: any) {
      console.error('=== ОШИБКА ВХОДА ===');
      console.error('Полная ошибка:', error);
      console.error('Error type:', typeof error);
      console.error('Error message:', error.message);
      
      let errorMessage = 'Ошибка входа';
      
      if (error.response) {
        // Сервер ответил с ошибкой
        console.error('Response error:', error.response);
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
        errorMessage = error.response.data?.message || error.response.data || `Ошибка сервера: ${error.response.status}`;
      } else if (error.request) {
        // Запрос был отправлен, но ответа не получено
        console.error('Request error:', error.request);
        errorMessage = 'Сервер недоступен. Проверьте, что Java backend запущен на порту 8086';
      } else {
        // Что-то пошло не так при настройке запроса
        console.error('Setup error:', error.message);
        errorMessage = error.message || 'Неизвестная ошибка';
      }
      
      console.error('Финальное сообщение об ошибке:', errorMessage);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, password: string): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Попытка регистрации с username:', username);
      
      // Прямой вызов API без лишнего Promise.resolve
      const response = await authApi.register(username, password);
      console.log('Ответ от API:', response);
      
      // Backend возвращает объект с success и message
      const responseData = response.data;
      console.log('Response data:', responseData);
      
      if (!responseData.success) {
        throw new Error(responseData.message || 'Ошибка регистрации');
      }
      
      // После успешной регистрации создаем объект пользователя
      const userData = {
        id: username,
        name: username,
        email: `${username}@example.com`, // Заглушка, так как API не возвращает email
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setUser(userData);
      console.log('Пользователь установлен:', userData);
      
      // Сохраняем пользователя в localStorage
      storage.set('user', userData);
      console.log('Пользователь сохранен в localStorage');
      
      return { success: true, user: userData };
    } catch (error: any) {
      console.error('Ошибка регистрации:', error);
      
      let errorMessage = 'Ошибка регистрации';
      
      if (error.response) {
        // Сервер ответил с ошибкой
        const responseData = error.response.data;
        if (responseData && responseData.message) {
          // Проверяем специфичные сообщения от backend
          if (responseData.message.includes('User already exists')) {
            errorMessage = 'Пользователь уже существует!';
          } else {
            errorMessage = responseData.message;
          }
        } else {
          errorMessage = `Ошибка сервера: ${error.response.status}`;
        }
      } else if (error.request) {
        // Запрос был отправлен, но ответа не получено
        errorMessage = 'Сервер недоступен. Проверьте, что Java backend запущен на порту 8086';
      } else {
        // Что-то пошло не так при настройке запроса
        errorMessage = error.message || 'Неизвестная ошибка';
      }
      
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    } finally {
      // Очищаем данные независимо от результата API запроса
      storage.remove('authToken');
      storage.remove('user');
      // Сбрасываем флаг приветствия при выходе
      sessionStorage.removeItem('welcomeShown');
      setUser(null);
      setError(null);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
    isAuthenticated: !!user,
    isInitialized
  };
}; 