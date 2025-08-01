import { useState } from 'react';
import { 
  User, 
  Camera, 
  Save,
  Upload
} from 'lucide-react';
import { useUpdateUser } from '../hooks/useUsers';
import { useUploadAvatar } from '../hooks/useFiles';
import { useAppStore } from '../store/useAppStore';
import Card from './ui/Card';
import Button from './ui/Button';
import type { User as UserType } from '../types/api';

export default function UserProfile() {
  const user = useAppStore((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const updateUserMutation = useUpdateUser();
  const uploadAvatarMutation = useUploadAvatar();

  if (!user) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-gray-600">Необходимо войти в систему</p>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSave = () => {
    if (user.id) {
      const updatedUser: UserType = {
        ...user,
        username: formData.username,
        email: formData.email,
      };
      
      updateUserMutation.mutate({ id: user.id, user: updatedUser }, {
        onSuccess: () => {
          setIsEditing(false);
        }
      });
    }
  };

  const handleAvatarUpload = () => {
    if (selectedFile && user.id) {
      uploadAvatarMutation.mutate({
        file: selectedFile,
        userId: user.id
      }, {
        onSuccess: () => {
          setSelectedFile(null);
          setPreviewUrl(null);
        }
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Профиль пользователя</h2>
        </div>
        
        <div className="px-6 py-4 space-y-6">
          {/* Аватар */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center">
                {user.avatarPath ? (
                  <img 
                    src={`/api/files/avatar/${user.avatarPath}`}
                    alt="Avatar" 
                    className="h-20 w-20 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-10 w-10 text-indigo-600" />
                )}
              </div>
              
              {previewUrl && (
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="h-20 w-20 object-cover"
                  />
                </div>
              )}
              
              <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-lg cursor-pointer" title="Загрузить аватар">
                <Camera className="h-4 w-4 text-gray-600" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  aria-label="Выберите файл аватара"
                />
              </label>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">{user.username}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
              
              {selectedFile && (
                <div className="mt-2 flex items-center space-x-2">
                  <Button
                    size="sm"
                    onClick={handleAvatarUpload}
                    disabled={uploadAvatarMutation.isPending}
                  >
                    <Upload className="h-4 w-4 mr-1" />
                    Загрузить
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Форма редактирования */}
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Имя пользователя
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>

            <div className="flex justify-end space-x-3">
              {isEditing ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        username: user.username || '',
                        email: user.email || '',
                      });
                    }}
                  >
                    Отмена
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={updateUserMutation.isPending}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Сохранить
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                >
                  Редактировать
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
} 