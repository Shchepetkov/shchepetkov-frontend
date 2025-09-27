import type { FC } from 'react';
import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthContainerProps {
  onAuthSuccess: (user: { name: string; email: string }) => void;
}

const AuthContainer: FC<AuthContainerProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      {isLogin ? (
        <LoginForm
          onSwitchToRegister={() => setIsLogin(false)}
          onAuthSuccess={onAuthSuccess}
        />
      ) : (
        <RegisterForm
          onSwitchToLogin={() => setIsLogin(true)}
          onAuthSuccess={onAuthSuccess}
        />
      )}
    </div>
  );
};

export default AuthContainer; 