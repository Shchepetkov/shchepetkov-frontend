import type { FC } from 'react';
import { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import AuthContainer from '../components/auth/AuthContainer';
import WelcomeToast from '../components/ui/WelcomeToast';

const AuthPage: FC = () => {
  const { isInitialized } = useAuthContext();
  const [showWelcome, setShowWelcome] = useState(false);

  // Показываем загрузку пока не инициализирована авторизация
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Загрузка...</p>
        </div>
      </div>
    );
  }

  const handleAuthSuccess = () => {
    // Просто показываем приветствие, НЕ перенаправляем
    setShowWelcome(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AuthContainer onAuthSuccess={handleAuthSuccess} />
      {showWelcome && (
        <WelcomeToast onClose={() => setShowWelcome(false)} />
      )}
    </div>
  );
};

export default AuthPage; 