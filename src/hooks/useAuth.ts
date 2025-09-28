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
      storage.set('user', user);
    } else {
      storage.remove('user');
      storage.remove('authToken');
    }
    
    // Отправляем сообщение через BroadcastChannel для синхронизации
    try {
      const broadcastChannel = new BroadcastChannel('auth-sync');
      broadcastChannel.postMessage({
        type: 'auth-change',
        user: user
      });
      broadcastChannel.close();
    } catch (error) {
      console.log('BroadcastChannel not supported');
    }
  }, [user]);

  // Инициализация авторизации при загрузке приложения
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = storage.get<string>('authToken');
        const savedUser = storage.get<User>('user');
        
        console.log('Initializing auth:', { hasToken: !!token, hasUser: !!savedUser });
        
        if (token && savedUser) {
          // Если есть токен и сохраненный пользователь, восстанавливаем состояние
          console.log('Восстанавливаем пользователя из localStorage:', savedUser);
          setUser(savedUser);
        } else if (token && !savedUser) {
          // Если есть токен, но нет пользователя, очищаем токен
          console.log('Токен есть, но пользователь не найден, очищаем токен');
          storage.remove('authToken');
          setUser(null);
        } else {
          // Нет токена или пользователя
          console.log('Нет сохраненных данных авторизации');
          setUser(null);
        }
        
        setIsInitialized(true);
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

    // Дополнительная синхронизация через BroadcastChannel
    let broadcastChannel: BroadcastChannel | null = null;
    
    try {
      broadcastChannel = new BroadcastChannel('auth-sync');
      
      broadcastChannel.onmessage = (event) => {
        const { type, user: userData } = event.data;
        
        if (type === 'auth-change') {
          console.log('BroadcastChannel auth change:', userData);
          setUser(userData);
        }
      };
    } catch (error) {
      console.log('BroadcastChannel not supported, using storage events only');
    }

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      if (broadcastChannel) {
        broadcastChannel.close();
      }
    };
  }, []);

  const login = async (username: string, password: string): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Попытка входа с username:', username);
      
      // Обертываем API вызов в Promise для лучшей обработки ошибок
      const response = await Promise.resolve(authApi.login(username, password));
      console.log('Ответ от API:', response);
      
      const token = response.data; // JWT токен приходит напрямую
      
      if (!token) {
        throw new Error('Токен не получен от сервера');
      }
      
      // Сохраняем токен
      storage.set('authToken', token);
      console.log('Токен сохранен');
      
      // Создаем объект пользователя из username
      const userData = {
        id: username,
        name: username,
        email: `${username}@example.com`, // Заглушка, так как API не возвращает email
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setUser(userData);
      console.log('Пользователь установлен:', userData);
      
      return { success: true, user: userData };
    } catch (error: any) {
      console.error('Ошибка входа:', error);
      
      let errorMessage = 'Ошибка входа';
      
      if (error.response) {
        // Сервер ответил с ошибкой
        errorMessage = error.response.data?.message || error.response.data || `Ошибка сервера: ${error.response.status}`;
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

  const register = async (username: string, password: string): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Попытка регистрации с username:', username);
      
      // Обертываем API вызов в Promise для лучшей обработки ошибок
      const response = await Promise.resolve(authApi.register(username, password));
      console.log('Ответ от API:', response);
      
      const token = response.data; // JWT токен приходит напрямую
      
      if (!token) {
        throw new Error('Токен не получен от сервера');
      }
      
      // Сохраняем токен
      storage.set('authToken', token);
      console.log('Токен сохранен');
      
      // Создаем объект пользователя из username
      const userData = {
        id: username,
        name: username,
        email: `${username}@example.com`, // Заглушка, так как API не возвращает email
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setUser(userData);
      console.log('Пользователь установлен:', userData);
      
      return { success: true, user: userData };
    } catch (error: any) {
      console.error('Ошибка регистрации:', error);
      
      let errorMessage = 'Ошибка регистрации';
      
      if (error.response) {
        // Сервер ответил с ошибкой
        errorMessage = error.response.data?.message || error.response.data || `Ошибка сервера: ${error.response.status}`;
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
      await Promise.resolve(authApi.logout());
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