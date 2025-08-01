import React, { useState, useEffect } from 'react';
import { User, Key, Shield, Save, ArrowLeft } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUsers';
import { useUpdateUser } from '../hooks/useUsers';
import { Role } from '../types/api';

export default function UserEditPage() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { data: userData, isLoading: isLoadingUser, error: userError } = useUser(Number(userId));
  const updateUserMutation = useUpdateUser();

  const user = userData;
  const availableRoles: Role[] = [Role.USER, Role.ADMIN];

  // Устанавливаем начальные значения при загрузке пользователя
  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setSelectedRoles(user.roles);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const updateData: any = {
        username: username.trim(),
        roles: selectedRoles
      };

      if (newPassword.trim()) {
        updateData.newPassword = newPassword;
      }

      await updateUserMutation.mutateAsync({
        id: Number(userId),
        user: { ...user!, ...updateData }
      });

      setSuccess('Пользователь успешно обновлен!');
      setNewPassword('');
    } catch (error: any) {
      setError(error.message || 'Ошибка обновления пользователя');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleToggle = (role: Role) => {
    setSelectedRoles(prev => {
      if (prev.includes(role)) {
        return prev.filter(r => r !== role);
      } else {
        return [...prev, role];
      }
    });
  };

  if (isLoadingUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка пользователя...</p>
        </div>
      </div>
    );
  }

  if (userError || !user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p>Пользователь не найден</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="card shadow-sm max-w-2xl mx-auto">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0 flex items-center gap-2">
            <User size={20} />
            Редактирование пользователя {user.username}
          </h4>
          <button
            onClick={() => navigate('/admin/users')}
            className="btn btn-light flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Назад к списку
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

            <div className="form-group mb-4">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Key size={16} />
                Новый пароль
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Оставьте пустым, чтобы не менять"
                minLength={6}
              />
              <p className="text-sm text-gray-500 mt-1">
                Минимум 6 символов. Оставьте пустым, если не хотите менять пароль.
              </p>
            </div>
            
            <div className="form-group mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Shield size={16} />
                Роли пользователя
              </label>
              <div className="role-container bg-gray-50 p-4 rounded-lg">
                {availableRoles.map((role) => (
                  <div key={role} className="custom-control custom-switch mb-3">
                    <input
                      type="checkbox"
                      id={`role-${role}`}
                      checked={selectedRoles.includes(role)}
                      onChange={() => handleRoleToggle(role)}
                      className="custom-control-input"
                    />
                    <label className="custom-control-label ml-2" htmlFor={`role-${role}`}>
                      {role === Role.ADMIN ? 'Администратор' : 'Пользователь'}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button
                type="submit"
                disabled={isLoading || updateUserMutation.isPending}
                className="btn btn-success flex items-center gap-2 disabled:opacity-50"
              >
                <Save size={16} />
                {isLoading || updateUserMutation.isPending ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 