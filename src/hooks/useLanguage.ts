import { useState, useEffect } from 'react';

type Language = 'ru' | 'en';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'ru';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    const newLanguage = language === 'ru' ? 'en' : 'ru';
    localStorage.setItem('language', newLanguage);
    window.location.reload();
  };

  return { language, toggleLanguage };
}; 