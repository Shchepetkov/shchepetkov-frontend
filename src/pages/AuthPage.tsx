import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContainer from '../components/auth/AuthContainer';
import { useAuth } from '../hooks/useAuth';

const AuthPage: FC = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleAuthSuccess = (user: { name: string; email: string }) => {
    // Перенаправляем на главную страницу после успешной аутентификации
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AuthContainer onAuthSuccess={handleAuthSuccess} />
    </div>
  );
};

export default AuthPage; 