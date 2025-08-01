import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthContainerProps {
  onLoginSuccess?: () => void;
}

export default function AuthContainer({ onLoginSuccess }: AuthContainerProps) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {isLogin ? (
            <LoginForm key="login" onSwitchToRegister={() => setIsLogin(false)} onLoginSuccess={onLoginSuccess} />
          ) : (
            <RegisterForm key="register" onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 