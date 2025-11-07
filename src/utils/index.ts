// Утилиты для работы с localStorage
export const storage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      // Пробуем localStorage, если не работает - sessionStorage
      const item = localStorage.getItem(key) || sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch {
      return defaultValue || null;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      // Сохраняем в оба хранилища для надежности
      localStorage.setItem(key, JSON.stringify(value));
      sessionStorage.setItem(key, JSON.stringify(value));
      console.log(`Сохранено в localStorage и sessionStorage: ${key}`);
    } catch (error) {
      console.error('Error saving to storage:', error);
      // Если localStorage не работает, пробуем sessionStorage
      try {
        sessionStorage.setItem(key, JSON.stringify(value));
        console.log(`Сохранено только в sessionStorage: ${key}`);
      } catch (sessionError) {
        console.error('Error saving to sessionStorage:', sessionError);
      }
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
      console.log(`Удалено из localStorage и sessionStorage: ${key}`);
    } catch (error) {
      console.error('Error removing from storage:', error);
    }
  }
};

// Утилиты для работы с CSS классами
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};
