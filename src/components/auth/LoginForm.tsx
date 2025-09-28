import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useAuthContext } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onAuthSuccess: () => void;
}

const LoginForm: FC<LoginFormProps> = ({ onSwitchToRegister, onAuthSuccess }) => {
  console.log('=== LoginForm рендерится ===');
  
  const { t } = useTranslation();
  const { login, isLoading, error, clearError } = useAuthContext();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  console.log('LoginForm props:', { onSwitchToRegister, onAuthSuccess });
  console.log('LoginForm state:', { formData, isLoading, error });

  const handleSubmit = async (e: FormEvent) => {
    console.log('=== ФОРМА ОТПРАВЛЕНА ===');
    console.log('Form data:', formData);
    console.log('Event:', e);
    
    e.preventDefault();
    e.stopPropagation();
    
    console.log('После preventDefault');
    clearError();

    console.log('Вызываем функцию login...');
    try {
      const result = await login(formData.username, formData.password);
      console.log('Результат login:', result);
      
      if (result.success && result.user) {
        console.log('Успешный вход, вызываем onAuthSuccess');
        onAuthSuccess();
      } else {
        console.log('Неуспешный вход:', result.error);
      }
    } catch (error) {
      console.error('Ошибка в handleSubmit:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
            <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {t('loginTitle')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {t('or')}{' '}
            <button
              onClick={onSwitchToRegister}
              className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
            >
              {t('orCreateAccount')}
            </button>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} action="#" method="post">
          <div className="space-y-4">
            <Input
              label="Имя пользователя"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Введите имя пользователя"
              fullWidth
            />
            
            <Input
              label={t('password')}
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder={t('password')}
              fullWidth
            />
          </div>

          {error && (
            <div className="rounded-md bg-red-50 dark:bg-red-900 p-4">
              <div className="text-sm text-red-800 dark:text-red-200">
                {error}
              </div>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isLoading}
            disabled={isLoading}
            fullWidth
            onClick={() => console.log('Кнопка нажата')}
          >
            {isLoading ? t('loggingIn') : t('loginButton')}
          </Button>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                {t('forgotPassword')}
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm; 