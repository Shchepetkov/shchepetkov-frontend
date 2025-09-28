import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { useTranslation } from '../../hooks/useTranslation';

interface WelcomeToastProps {
  onClose: () => void;
}

const WelcomeToast: FC<WelcomeToastProps> = ({ onClose }) => {
  const { user } = useAuthContext();
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Показываем toast с небольшой задержкой для плавной анимации
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => {
      clearTimeout(showTimer);
    };
  }, []);

  if (!user) return null;

  return (
    <div
      className={`fixed top-20 right-4 z-50 max-w-sm w-full bg-white dark:bg-gray-800 border border-green-200 dark:border-green-700 rounded-lg shadow-xl transition-all duration-500 transform ${
        isVisible 
          ? 'translate-x-0 opacity-100 scale-100' 
          : 'translate-x-full opacity-0 scale-95'
      }`}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center animate-pulse">
              <svg 
                className="w-5 h-5 text-green-600 dark:text-green-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              {t('loginSuccess')}
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {t('welcomeBack').replace('{name}', user.name)}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(onClose, 300);
              }}
              className="inline-flex text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md"
            >
              <span className="sr-only">Закрыть</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeToast;
