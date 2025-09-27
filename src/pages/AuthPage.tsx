import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContainer from '../components/auth/AuthContainer';
import TestApiButton from '../components/TestApiButton';

const AuthPage: FC = () => {
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    // Перенаправляем на главную страницу после успешной аутентификации
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <AuthContainer onAuthSuccess={handleAuthSuccess} />
            </div>
            <div className="flex items-center">
              <TestApiButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 