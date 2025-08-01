import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLogin } from '../../hooks/useAuth';
import Button from '../ui/Button';
import type { LoginRequest } from '../../types/api';

const loginSchema = z.object({
  username: z.string().min(3, 'Имя пользователя должно содержать минимум 3 символа'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onLoginSuccess?: () => void;
}

export default function LoginForm({ onSwitchToRegister, onLoginSuccess }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    const loginRequest: LoginRequest = {
      username: data.username,
      password: data.password,
    };
    loginMutation.mutate(loginRequest, {
      onSuccess: (data) => {
        if (data.success && onLoginSuccess) {
          setTimeout(() => {
            onLoginSuccess();
          }, 0);
        }
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="w-full max-w-md"
    >
      <div className="bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Добро пожаловать</h2>
          <p className="text-gray-600">Войдите в свой аккаунт</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Имя пользователя
            </label>
            <input
              {...register('username')}
              type="text"
              id="username"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Введите имя пользователя"
            />
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
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle-btn"
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
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Вход...
              </div>
            ) : (
              <>
                <LogIn className="h-5 w-5 mr-2" />
                Войти
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Нет аккаунта?{' '}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors"
            >
              Зарегистрироваться
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
} 