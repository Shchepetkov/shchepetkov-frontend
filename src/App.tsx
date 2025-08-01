import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate, NavLink } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
import { useCurrentUser, useLogout } from './hooks/useAuth';
// import { useAppStore } from './store/useAppStore';
// import AuthContainer from './components/auth/AuthContainer';
// import UserProfile from './components/UserProfile';
// import MessageList from './components/MessageList';
// import CreateMessage from './components/CreateMessage';
import NotificationContainer from './components/ui/NotificationContainer';
// import AdminPanel from './components/admin/AdminPanel';
import WelcomePage from './components/WelcomePage';
import AuthContainer from './components/auth/AuthContainer';
import { LogOut } from 'lucide-react';
import Navbar from './components/ui/Navbar';
import { Role } from './types/api';
// import { Shield, Users, MessageSquare, Plus, LogOut } from 'lucide-react';
// import { Role } from './types/api';

// Импорт новых страниц
import ResumePage from './pages/ResumePage';
import MessageBoardPage from './pages/MessageBoardPage';
import UserSettingsPage from './pages/UserSettingsPage';
import UserListPage from './pages/UserListPage';
import UserEditPage from './pages/UserEditPage';
import TestPage from './pages/TestPage';
import SimpleResumePage from './pages/SimpleResumePage';

function Sidebar() {
  return (
    <aside className="sidebar">
      <img src="/vite.svg" alt="logo" className="logo" />
      <nav>
        <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>Профиль</NavLink>
        <NavLink to="/chat" className={({ isActive }) => isActive ? 'active' : ''}>Чат</NavLink>
        <NavLink to="/messages" className={({ isActive }) => isActive ? 'active' : ''}>Сообщения</NavLink>
        <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>Настройки</NavLink>
      </nav>
    </aside>
  );
}

function Header({ username, avatar, onLogout }: { username: string; avatar?: string; onLogout: () => void }) {
  return (
    <header className="header-bar">
      <div className="header-content">
        <span className="user-name">{username}</span>
        <div className="header-actions">
          {avatar && <img src={avatar} alt="avatar" className="user-avatar" />}
          <button className="logout-btn" onClick={onLogout} title="Выйти">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

function ProfilePage({ user }: { user: any }) {
  return (
    <div className="profile-card">
      <img
        src={user.avatarPath || '/vite.svg'}
        alt="avatar"
      />
      <h2>{user.username}</h2>
      <p>Email: {user.email || '—'}</p>
      <p>ID: {user.id}</p>
      <p>Роли: {user.roles?.join(', ') || '—'}</p>
      <p>Статус: {user.active ? 'Активен' : 'Неактивен'}</p>
    </div>
  );
}

function ChatPage() {
  return <div className="card">Скоро здесь будет чат!</div>;
}

function MessagesPage() {
  return <MessageBoardPage />;
}

function SettingsPage() {
  return <UserSettingsPage />;
}

function App() {
  // const [activeTab, setActiveTab] = useState<'profile' | 'messages' | 'create' | 'admin'>('profile');
  const [showAuth, setShowAuth] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const navigate = useNavigate();
  const logoutMutation = useLogout();

  // Следим за появлением токена после входа (например, из другого окна)
  useEffect(() => {
    const handler = () => setToken(localStorage.getItem('token'));
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  // Запрашиваем пользователя только если токен есть
  const { data: currentUserData, isLoading, isError } = useCurrentUser({ enabled: !!token });

  useEffect(() => {
    if (
      token &&
      currentUserData?.success &&
      currentUserData.user &&
      (window.location.pathname === '/' || window.location.pathname === '')
    ) {
      navigate('/profile', { replace: true });
    }
  }, [token, currentUserData, navigate]);

  const handleLogout = () => {
    logoutMutation.mutate();
    localStorage.removeItem('token');
    setToken(null);
    setShowAuth(false);
    navigate('/', { replace: true });
  };

  if (!token) {
    if (!showAuth) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-bg-dark to-header flex flex-col">
          <WelcomePage onLogin={() => setShowAuth(true)} />
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-dark to-header flex flex-col">
        <AuthContainer onLoginSuccess={() => setToken(localStorage.getItem('token'))} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-dark to-header flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-400">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (isError || !currentUserData?.success) {
    // Если токен невалиден — сбрасываем его и возвращаемся к приветствию
    localStorage.removeItem('token');
    setToken(null);
    setShowAuth(false);
    return null;
  }

  // const currentUser = currentUserData?.user;
  // const isAdmin = currentUser?.roles?.includes(Role.ADMIN);

  // const tabs = [
  //   { id: 'profile' as const, label: 'Профиль', icon: Users },
  //   { id: 'messages' as const, label: 'Сообщения', icon: MessageSquare },
  //   { id: 'create' as const, label: 'Создать', icon: Plus },
  //   ...(isAdmin ? [{ id: 'admin' as const, label: 'Админ', icon: Shield }] : []),
  // ];

  // return (
  //   <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
  //     {/* Header */}
  //     <header className="bg-white shadow-sm border-b border-gray-200">
  //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //         <div className="flex justify-between items-center h-16">
  //           <div className="flex items-center space-x-4">
  //             <h1 className="text-xl font-semibold text-gray-900">
  //               Привет, {currentUser?.username}!
  //             </h1>
  //             {isAdmin && (
  //               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
  //                 Администратор
  //               </span>
  //             )}
  //           </div>
  //           
  //           <button
  //             onClick={() => {
  //               logout();
  //               localStorage.removeItem('token');
  //             }}
  //             className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
  //           >
  //             <LogOut className="h-4 w-4 mr-2" />
  //             Выйти
  //           </button>
  //         </div>
  //       </div>
  //     </header>

  //     {/* Navigation Tabs */}
  //     <nav className="bg-white border-b border-gray-200">
  //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //         <div className="flex space-x-8">
  //           {tabs.map((tab) => {
  //             const Icon = tab.icon;
  //             return (
  //               <button
  //                 key={tab.id}
  //                 onClick={() => setActiveTab(tab.id)}
  //                 className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
  //                   activeTab === tab.id
  //                     ? 'border-indigo-500 text-indigo-600'
  //                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
  //                 }`}
  //               >
  //                 <Icon className="h-4 w-4 mr-2" />
  //                 {tab.label}
  //               </button>
  //             );
  //           })}
  //         </div>
  //       </div>
  //     </nav>

  //     {/* Main Content */}
  //     <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  //       <AnimatePresence mode="wait">
  //         <motion.div
  //           key={activeTab}
  //           initial={{ opacity: 0, y: 20 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           exit={{ opacity: 0, y: -20 }}
  //           transition={{ duration: 0.3 }}
  //         >
  //           {activeTab === 'profile' && <UserProfile />}
  //           {activeTab === 'messages' && <MessageList />}
  //           {activeTab === 'create' && <CreateMessage />}
  //           {activeTab === 'admin' && isAdmin && <AdminPanel />}
  //         </motion.div>
  //       </AnimatePresence>
  //     </main>

  return (
    <div>
      <Navbar
        username={currentUserData?.user?.username || ''}
        onLogout={handleLogout}
        isAdmin={currentUserData?.user?.roles?.includes(Role.ADMIN)}
      />
      <div className="main-content container">
        <Routes>
          <Route path="/profile" element={currentUserData?.user ? <ProfilePage user={currentUserData.user} /> : null} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/resume-simple" element={<SimpleResumePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/test" element={<TestPage />} />
          {/* Админские маршруты */}
          <Route path="/admin/users" element={currentUserData?.user?.roles?.includes(Role.ADMIN) ? <UserListPage /> : <Navigate to="/profile" replace />} />
          <Route path="/admin/users/:userId/edit" element={currentUserData?.user?.roles?.includes(Role.ADMIN) ? <UserEditPage /> : <Navigate to="/profile" replace />} />
          <Route path="*" element={<Navigate to="/profile" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
