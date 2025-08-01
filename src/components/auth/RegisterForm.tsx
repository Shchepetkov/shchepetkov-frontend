import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, UserPlus, Check, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRegister, useCheckUsername } from '../../hooks/useAuth';
import Button from '../ui/Button';
import type { RegistrationRequest } from '../../types/api';

const registerSchema = z.object({
  username: z.string().min(3, 'Имя пользователя должно содержать минимум 3 символа'),
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [backendError, setBackendError] = useState<string | null>(null);
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const watchedUsername = watch('username');
  const shouldCheckUsername = !!watchedUsername && watchedUsername.length > 2;
  const { data: usernameCheck } = useCheckUsername(shouldCheckUsername ? watchedUsername : '');

  useEffect(() => {
    if (shouldCheckUsername && usernameCheck && !usernameCheck.available) {
      setError('username', { type: 'manual', message: 'Это имя пользователя уже занято' });
    } else {
      clearErrors('username');
    }
  }, [shouldCheckUsername, usernameCheck, setError, clearErrors]);

  useEffect(() => {
    if (registerMutation.isSuccess && registerMutation.data?.success) {
      setBackendError(null);
      reset();
      onSwitchToLogin();
    } else if (registerMutation.isError && registerMutation.error) {
      setBackendError(registerMutation.error.message || 'Ошибка регистрации');
    }
  }, [registerMutation.isSuccess, registerMutation.data, registerMutation.isError, registerMutation.error, onSwitchToLogin, reset]);

  const onSubmit = (data: RegisterFormData) => {
    setBackendError(null);
    const registrationRequest: RegistrationRequest = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    registerMutation.mutate(registrationRequest);
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { score: 0, label: '', color: '' };
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    const labels = ['Очень слабый', 'Слабый', 'Средний', 'Хороший', 'Сильный', 'Очень сильный'];
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500', 'bg-emerald-500'];
    return {
      score: Math.min(score, 5),
      label: labels[Math.min(score - 1, 5)],
      color: colors[Math.min(score - 1, 5)]
    };
  };

  const password = watch('password');
  const passwordStrength = getPasswordStrength(password);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-md"
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Создать аккаунт</h2>
          <p className="text-gray-600">Заполните форму для регистрации</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Имя пользователя */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Имя пользователя
            </label>
            <div className="relative">
              <input
                {...register('username')}
                type="text"
                id="username"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                  errors.username ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Введите имя пользователя"
                autoComplete="username"
              />
              {shouldCheckUsername && usernameCheck && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {usernameCheck.available ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
            {errors.username && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-sm text-red-600"
              >
                {errors.username.message}
              </motion.p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              {...register('email')}
              type="email"
              id="email"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Введите email"
              autoComplete="email"
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-sm text-red-600"
              >
                {errors.email.message}
              </motion.p>
            )}
          </div>

          {/* Пароль */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Пароль
            </label>
            <div className="relative">
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                id="password"
                className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Введите пароль"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle-btn"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-sm text-red-600"
              >
                {errors.password.message}
              </motion.p>
            )}
            {/* Индикатор сложности пароля */}
            {password && (
              <div className="mt-2 flex items-center space-x-2">
                <div className={`h-2 w-24 rounded-full ${passwordStrength.color} transition-all duration-300`}></div>
                <span className="text-xs text-gray-500">{passwordStrength.label}</span>
              </div>
            )}
          </div>

          {/* Подтверждение пароля */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Подтвердите пароль
            </label>
            <div className="relative">
              <input
                {...register('confirmPassword')}
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Повторите пароль"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="password-toggle-btn"
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-sm text-red-600"
              >
                {errors.confirmPassword.message}
              </motion.p>
            )}
          </div>

          {backendError && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-600 text-center"
            >
              {backendError}
            </motion.p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={registerMutation.isPending || (shouldCheckUsername && usernameCheck && !usernameCheck.available)}
          >
            {registerMutation.isPending ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Регистрация...
              </div>
            ) : (
              <>
                <UserPlus className="h-5 w-5 mr-2" />
                Зарегистрироваться
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Уже есть аккаунт?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors"
            >
              Войти
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
} 