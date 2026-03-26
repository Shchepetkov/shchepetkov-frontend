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
    } catch (error) {
      // Если localStorage не работает, пробуем sessionStorage
      try {
        sessionStorage.setItem(key, JSON.stringify(value));
      } catch {
        // ignore storage write errors in private mode/restricted environments
      }
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    } catch {
      // ignore storage removal errors
    }
  }
};

// Утилиты для работы с CSS классами
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};
