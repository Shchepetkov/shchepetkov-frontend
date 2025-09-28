import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useAuthContext } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onAuthSuccess: () => void;
}

const RegisterForm: FC<RegisterFormProps> = ({ onSwitchToLogin, onAuthSuccess }) => {
  const { t } = useTranslation();
  const { register, isLoading, error, clearError } = useAuthContext();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();
    setValidationError('');

    if (formData.password !== formData.confirmPassword) {
      setValidationError(t('passwordMismatch'));
      return;
    }

    if (formData.password.length < 6) {
      setValidationError(t('passwordTooShort'));
      return;
    }

    const result = await register(formData.username, formData.password);
    
    if (result.success && result.user) {
      onAuthSuccess();
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {t('registerTitle')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {t('or')}{' '}
            <button
              onClick={onSwitchToLogin}
              className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
            >
              {t('orLogin')}
            </button>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Имя пользователя"
              name="username"
              type="text"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              required
              placeholder="Введите имя пользователя"
              fullWidth
            />
            
            <Input
              label={t('password')}
              name="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              required
              placeholder={t('password')}
              fullWidth
            />
            
            <Input
              label={t('confirmPassword')}
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              required
              placeholder={t('confirmPassword')}
              fullWidth
            />
          </div>

          {(error || validationError) && (
            <div className="rounded-md bg-red-50 dark:bg-red-900 p-4">
              <div className="text-sm text-red-800 dark:text-red-200">
                {error || validationError}
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
          >
            {isLoading ? t('registering') : t('registerButton')}
          </Button>

          <div className="text-sm text-center text-gray-600 dark:text-gray-400">
            {t('termsAgreementPrefix')}{' '}
            <a href="#" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
              {t('termsAgreement')}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm; 