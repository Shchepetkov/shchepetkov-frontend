import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { useTranslation } from '../../hooks/useTranslation';

interface UserProfileProps {
  className?: string;
}

const UserProfile: FC<UserProfileProps> = ({ className = '' }) => {
  const { user, logout } = useAuthContext();
  const { t } = useTranslation();

  if (user) {
    // Авторизованный пользователь
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        {/* Кнопка профиля - компактная версия */}
        <Link
          to="/profile"
          className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-blue-600 hover:to-purple-700 transition-colors"
          title={`${t('hello')}, ${user.name}`}
        >
          <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-sm font-medium">
            {user.name}
          </span>
        </Link>

        {/* Кнопка выхода */}
        <button
          onClick={logout}
          className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          title={t('logout')}
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
            />
          </svg>
        </button>
      </div>
    );
  }

  // Неавторизованный пользователь
  return (
    <Link
      to="/auth"
      className={`flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${className}`}
      title={t('signIn')}
    >
      <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
        <svg 
          className="w-3 h-3" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
          />
        </svg>
      </div>
      <span className="text-sm font-medium">
        {t('signIn')}
      </span>
    </Link>
  );
};

export default UserProfile;
