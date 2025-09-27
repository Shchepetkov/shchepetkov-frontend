// Конфигурация приложения
export const config = {
  // API настройки
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
    timeout: 10000,
    retryAttempts: 3,
  },
  
  // Настройки темы
  theme: {
    defaultTheme: 'light' as 'light' | 'dark',
    storageKey: 'theme',
  },
  
  // Настройки языка
  language: {
    defaultLanguage: 'ru' as 'ru' | 'en',
    storageKey: 'language',
    supportedLanguages: ['ru', 'en'] as const,
  },
  
  // Настройки аутентификации
  auth: {
    tokenKey: 'authToken',
    refreshTokenKey: 'refreshToken',
    tokenExpiryKey: 'tokenExpiry',
  },
  
  // Настройки приложения
  app: {
    name: 'Максим Щепетков - Автоматизатор тестирования',
    nameEn: 'Maksim Shchepetkov - Test Automation Engineer',
    version: '1.0.0',
    description: 'Современный сайт-резюме автоматизатора тестирования',
    descriptionEn: 'Modern resume website for test automation engineer',
  },
  
  // Настройки контактов
  contacts: {
    email: 'maksim.shchepetkov@example.com',
    phone: '+7 (999) 123-45-67',
    location: 'Москва, Россия',
    locationEn: 'Moscow, Russia',
    linkedin: 'https://linkedin.com/in/maksim-shchepetkov',
    github: 'https://github.com/maksim-shchepetkov',
    telegram: 'https://t.me/maksim_shchepetkov',
  },
  
  // Настройки социальных сетей
  social: {
    linkedin: {
      url: 'https://linkedin.com/in/maksim-shchepetkov',
      icon: 'linkedin',
    },
    github: {
      url: 'https://github.com/maksim-shchepetkov',
      icon: 'github',
    },
    telegram: {
      url: 'https://t.me/maksim_shchepetkov',
      icon: 'telegram',
    },
    email: {
      url: 'mailto:maksim.shchepetkov@example.com',
      icon: 'email',
    },
  },
  
  // Настройки резюме
  resume: {
    pdfUrl: '/resume/maksim-shchepetkov-resume.pdf',
    downloadFilename: 'Maksim_Shchepetkov_Resume.pdf',
  },
  
  // Настройки анимаций
  animations: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500,
    },
    easing: {
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
    },
  },
  
  // Настройки валидации
  validation: {
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: {
        ru: 'Введите корректный email адрес',
        en: 'Please enter a valid email address',
      },
    },
    phone: {
      pattern: /^[\+]?[1-9][\d]{0,15}$/,
      message: {
        ru: 'Введите корректный номер телефона',
        en: 'Please enter a valid phone number',
      },
    },
    password: {
      minLength: 8,
      message: {
        ru: 'Пароль должен содержать минимум 8 символов',
        en: 'Password must be at least 8 characters long',
      },
    },
  },
  
  // Настройки мета-тегов
  meta: {
    title: {
      ru: 'Максим Щепетков - Автоматизатор тестирования',
      en: 'Maksim Shchepetkov - Test Automation Engineer',
    },
    description: {
      ru: 'Автоматизатор тестирования на Java с 5+ лет опыта. Специализируюсь на создании фреймворков для UI и API тестирования.',
      en: 'Java test automation engineer with 5+ years of experience. I specialize in creating frameworks for UI and API testing.',
    },
    keywords: {
      ru: 'автоматизация тестирования, Java, Selenium, Cucumber, REST-assured, тестирование, QA',
      en: 'test automation, Java, Selenium, Cucumber, REST-assured, testing, QA',
    },
  },
  
  // Настройки производительности
  performance: {
    lazyLoadImages: true,
    preloadCriticalResources: true,
    enableServiceWorker: false,
  },
  
  // Настройки аналитики
  analytics: {
    googleAnalytics: {
      enabled: false,
      trackingId: '',
    },
    yandexMetrika: {
      enabled: false,
      counterId: '',
    },
  },
} as const;

// Типы для конфигурации
export type Config = typeof config;
export type SupportedLanguage = typeof config.language.supportedLanguages[number];
export type Theme = 'light' | 'dark';

// Функция для получения конфигурации по ключу
export const getConfig = <K extends keyof Config>(key: K): Config[K] => {
  return config[key];
};

// Функция для проверки поддержки языка
export const isSupportedLanguage = (language: string): language is SupportedLanguage => {
  return config.language.supportedLanguages.includes(language as SupportedLanguage);
};

// Функция для получения мета-данных по языку
export const getMetaByLanguage = (language: SupportedLanguage) => {
  return {
    title: config.meta.title[language],
    description: config.meta.description[language],
    keywords: config.meta.keywords[language],
  };
};
