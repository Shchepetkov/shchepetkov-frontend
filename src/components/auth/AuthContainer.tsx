import type { FC } from 'react';
import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthContainerProps {
  onAuthSuccess: (user: { name: string; email: string }) => void;
}

const AuthContainer: FC<AuthContainerProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = (email: string, password: string) => {
    // Имитация успешного входа
    onAuthSuccess({
      name: 'Пользователь',
      email: email
    });
  };

  const handleRegister = (name: string, email: string, password: string) => {
    // Имитация успешной регистрации
    onAuthSuccess({
      name: name,
      email: email
    });
  };

  return (
    <div>
      {isLogin ? (
        <LoginForm
          onSwitchToRegister={() => setIsLogin(false)}
          onLogin={handleLogin}
        />
      ) : (
        <RegisterForm
          onSwitchToLogin={() => setIsLogin(true)}
          onRegister={handleRegister}
        />
      )}
    </div>
  );
};

export default AuthContainer; 