import type { FC } from 'react';
import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthContainerProps {
  onAuthSuccess: () => void;
}

const AuthContainer: FC<AuthContainerProps> = ({ onAuthSuccess }) => {
  console.log('=== AuthContainer рендерится ===');
  
  const [isLogin, setIsLogin] = useState(true);
  
  console.log('AuthContainer state:', { isLogin });
  console.log('AuthContainer props:', { onAuthSuccess });

  console.log('AuthContainer render:', { isLogin });

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