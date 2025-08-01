import { useLanguage } from './useLanguage';
import { translations, type TranslationKey } from '../i18n/translations';

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key: TranslationKey, params?: Record<string, string>): string => {
    let translation = translations[language][key] || key;
    
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{${param}}`, value);
      });
    }
    
    return translation;
  };

  return { t, language };
}; 