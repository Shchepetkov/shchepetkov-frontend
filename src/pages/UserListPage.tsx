import React, { useState } from 'react';
import { Users, Edit, Trash2, Eye, Shield, User as UserIcon } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';
import { useDeleteUser } from '../hooks/useUsers';
import { useNavigate } from 'react-router-dom';
import type { User, Role } from '../types/api';

export default function UserListPage() {
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const { data: usersData, isLoading, error } = useUsers();
  const deleteUserMutation = useDeleteUser();
  const navigate = useNavigate();

  const users = usersData || [];

  const handleDelete = async (userId: number, username: string) => {
    if (window.confirm(`Вы уверены, что хотите удалить пользователя ${username}?`)) {
      try {
        await deleteUserMutation.mutateAsync(userId);
        setDeleteConfirm(null);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const getRoleBadge = (roles: Role[]) => {
    if (roles.includes('ADMIN' as Role)) {
      return (
        <span className="badge badge-danger flex items-center gap-1">
          <Shield size={12} />
          Админ
        </span>
      );
    }
    return (
      <span className="badge badge-info flex items-center gap-1">
        <UserIcon size={12} />
        Пользователь
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка пользователей...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p>Ошибка загрузки пользователей</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0 flex items-center gap-2">
            <Users size={24} />
            Список пользователей
          </h2>
        </div>
        <div className="card-body">
          {users.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table table-hover w-full">
                <thead className="thead-dark">
                  <tr>
                    <th className="px-4 py-3 text-left">Имя пользователя</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Роли</th>
                    <th className="px-4 py-3 text-left">Статус</th>
                    <th className="px-4 py-3 text-center">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user: User) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {user.avatarPath ? (
                            <img
                              src={`/uploads/${user.avatarPath}`}
                              alt="Avatar"
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                              <UserIcon size={16} className="text-gray-600" />
                            </div>
                          )}
                          <span className="font-medium">{user.username}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {user.email || '—'}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {getRoleBadge(user.roles)}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`badge ${user.active ? 'badge-success' : 'badge-warning'}`}>
                          {user.active ? 'Активен' : 'Неактивен'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => navigate(`/admin/users/${user.id}`)}
                            className="btn btn-outline-primary btn-sm flex items-center gap-1"
                            title="Просмотреть"
                          >
                            <Eye size={14} />
                            Просмотр
                          </button>
                          <button
                            onClick={() => navigate(`/admin/users/${user.id}/edit`)}
                            className="btn btn-outline-info btn-sm flex items-center gap-1"
                            title="Редактировать"
                          >
                            <Edit size={14} />
                            Редактировать
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(user.id)}
                            className="btn btn-outline-danger btn-sm flex items-center gap-1"
                            title="Удалить"
                            disabled={deleteUserMutation.isPending}
                          >
                            <Trash2 size={14} />
                            Удалить
                          </button>
                        </div>
                        
                        {/* Модальное окно подтверждения удаления */}
                        {deleteConfirm === user.id && (
                          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 max-w-md mx-4">
                              <h3 className="text-lg font-semibold mb-4">Подтверждение удаления</h3>
                              <p className="text-gray-600 mb-6">
                                Вы уверены, что хотите удалить пользователя <strong>{user.username}</strong>?
                                Это действие нельзя отменить.
                              </p>
                              <div className="flex gap-3 justify-end">
                                <button
                                  onClick={() => setDeleteConfirm(null)}
                                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                                >
                                  Отмена
                                </button>
                                <button
                                  onClick={() => handleDelete(user.id, user.username)}
                                  disabled={deleteUserMutation.isPending}
                                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50"
                                >
                                  {deleteUserMutation.isPending ? 'Удаление...' : 'Удалить'}
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Users size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 text-lg">Пользователей нет</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 