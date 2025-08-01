import React, { useState } from 'react';
import { Settings, User, Lock, Save, ArrowLeft } from 'lucide-react';
import { useCurrentUser } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function UserSettingsPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { data: currentUserData } = useCurrentUser();
  const navigate = useNavigate();

  const currentUser = currentUserData?.user;

  // Устанавливаем начальное значение username при загрузке пользователя
  React.useEffect(() => {
    if (currentUser?.username) {
      setUsername(currentUser.username);
    }
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/user/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password || undefined
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Настройки успешно обновлены!');
        setPassword('');
        // Обновляем токен если он был изменен
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
      } else {
        setError(data.message || 'Ошибка обновления настроек');
      }
    } catch (err) {
      setError('Ошибка сети. Попробуйте еще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="card shadow-sm max-w-2xl mx-auto">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0 flex items-center gap-2">
            <Settings size={20} />
            Настройки профиля
          </h4>
          <button
            onClick={() => navigate('/profile')}
            className="btn btn-light flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Вернуться в профиль
          </button>
        </div>
        <div className="card-body">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <User size={16} />
                Имя пользователя
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
                minLength={3}
                maxLength={50}
              />
            </div>
            
            <div className="form-group mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Lock size={16} />
                Новый пароль
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Оставьте пустым, если не хотите менять"
                minLength={6}
              />
              <p className="text-sm text-gray-500 mt-1">
                Минимум 6 символов. Оставьте пустым, если не хотите менять пароль.
              </p>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary flex items-center gap-2 disabled:opacity-50"
            >
              <Save size={16} />
              {isLoading ? 'Сохранение...' : 'Сохранить изменения'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 