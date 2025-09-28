import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import AuthContainer from '../components/auth/AuthContainer';
import WelcomeToast from '../components/ui/WelcomeToast';

const AuthPage: FC = () => {
  console.log('=== AuthPage рендерится ===');
  
  const { isInitialized, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(false);
  
  console.log('AuthPage state:', { isInitialized, isAuthenticated, showWelcome });

  // Если пользователь уже авторизован, перенаправляем на главную
  useEffect(() => {
    console.log('AuthPage useEffect:', { isInitialized, isAuthenticated });
    if (isInitialized && isAuthenticated) {
      console.log('Перенаправляем на главную');
      navigate('/', { replace: true });
    }
  }, [isInitialized, isAuthenticated, navigate]);

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
    // Показываем приветствие и перенаправляем
    setShowWelcome(true);
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 2000);
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