import { useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // В реальном приложении здесь был бы запрос к API
      const userData = {
        name: 'Пользователь',
        email: email
      };
      
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Ошибка входа' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // В реальном приложении здесь был бы запрос к API
      const userData = {
        name: name,
        email: email
      };
      
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Ошибка регистрации' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };
}; 