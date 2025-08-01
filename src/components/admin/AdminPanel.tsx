import { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Shield, 
  Trash2,
  Edit
} from 'lucide-react';
import { useAdminUsers, useAdminStats, useActivateUser, useDeactivateUser, useUpdateUserRoles } from '../../hooks/useAdmin';
import { useUsers, useDeleteUser } from '../../hooks/useUsers';
import type { User } from '../../types/api';
import { Role } from '../../types/api';
import Card from '../ui/Card';
import Button from '../ui/Button';

export default function AdminPanel() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);
  
  const { isLoading: adminUsersLoading } = useAdminUsers();
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: allUsers, isLoading: usersLoading } = useUsers();
  
  const activateUserMutation = useActivateUser();
  const deactivateUserMutation = useDeactivateUser();
  const updateUserRolesMutation = useUpdateUserRoles();
  const deleteUserMutation = useDeleteUser();

  const handleActivateUser = (userId: number) => {
    activateUserMutation.mutate(userId);
  };

  const handleDeactivateUser = (userId: number) => {
    deactivateUserMutation.mutate(userId);
  };

  const handleUpdateRoles = (userId: number) => {
    if (selectedRoles.length > 0) {
      updateUserRolesMutation.mutate({ userId, roles: { roles: selectedRoles } });
      setShowUserModal(false);
      setSelectedUser(null);
      setSelectedRoles([]);
    }
  };

  const handleDeleteUser = (userId: number) => {
    if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      deleteUserMutation.mutate(userId);
    }
  };

  const openUserModal = (user: User) => {
    setSelectedUser(user);
    setSelectedRoles(user.roles || []);
    setShowUserModal(true);
  };

  const toggleRole = (role: Role) => {
    setSelectedRoles(prev => 
      prev.includes(role) 
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  if (adminUsersLoading || statsLoading || usersLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Всего пользователей</p>
              <p className="text-2xl font-semibold text-gray-900">{stats?.totalUsers || 0}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Активных</p>
              <p className="text-2xl font-semibold text-gray-900">{stats?.activeUsers || 0}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <UserX className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Неактивных</p>
              <p className="text-2xl font-semibold text-gray-900">{stats?.inactiveUsers || 0}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Администраторов</p>
              <p className="text-2xl font-semibold text-gray-900">{stats?.adminUsers || 0}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Список пользователей */}
      <Card>
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Управление пользователями</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Пользователь
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Роли
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allUsers?.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-indigo-600">
                            {user.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.username}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.active ? 'Активен' : 'Неактивен'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.roles?.map(role => (
                      <span key={role} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-1">
                        {role}
                      </span>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openUserModal(user)}
                      disabled={updateUserRolesMutation.isPending}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    {user.active ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeactivateUser(user.id)}
                        disabled={deactivateUserMutation.isPending}
                      >
                        <UserX className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleActivateUser(user.id)}
                        disabled={activateUserMutation.isPending}
                      >
                        <UserCheck className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteUser(user.id)}
                      disabled={deleteUserMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Модальное окно для редактирования ролей */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Редактировать роли пользователя {selectedUser.username}
              </h3>
              
              <div className="space-y-3">
                {Object.values(Role).map((role) => (
                  <label key={role} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedRoles.includes(role)}
                      onChange={() => toggleRole(role)}
                      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-700">{role}</span>
                  </label>
                ))}
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowUserModal(false);
                    setSelectedUser(null);
                    setSelectedRoles([]);
                  }}
                >
                  Отмена
                </Button>
                <Button
                  onClick={() => handleUpdateRoles(selectedUser.id)}
                  disabled={updateUserRolesMutation.isPending}
                >
                  Сохранить
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 