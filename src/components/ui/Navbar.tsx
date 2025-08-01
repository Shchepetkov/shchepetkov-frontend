import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut, Sun, Moon, UserCircle, Home, Users, MessageSquare, FileText } from 'lucide-react';

export default function Navbar({ username, onLogout, isAdmin }: { username: string; onLogout: () => void; isAdmin?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const navigate = useNavigate();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    document.body.classList.toggle('dark-theme', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <nav className="w-full bg-[#181c24] shadow-sm sticky top-0 z-40">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-2">
        {/* Лого и бренд */}
        <div className="flex items-center gap-3">
          <img src="/vite.svg" alt="logo" className="logo" style={{ width: 36, height: 36 }} />
          <NavLink to="/" className="text-2xl font-extrabold text-primary flex items-center gap-2">
            <Home size={20} /> Shchepetkov
          </NavLink>
        </div>
        {/* Меню навигации */}
        <div className="hidden md:flex items-center gap-2 ml-8">
          <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link'}>
            <UserCircle size={18} className="inline mr-1" /> Профиль
          </NavLink>
          <NavLink to="/resume" className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link'}>
            <FileText size={18} className="inline mr-1" /> Резюме
          </NavLink>
          <NavLink to="/messages" className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link'}>
            <MessageSquare size={18} className="inline mr-1" /> Сообщения
          </NavLink>
          {isAdmin && (
            <NavLink to="/admin/users" className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link'}>
              <Users size={18} className="inline mr-1" /> Пользователи
            </NavLink>
          )}
        </div>
        {/* Правая часть: тема, профиль, выход */}
        <div className="flex items-center gap-2 relative">
          <button className="theme-switch rounded-full p-2 hover:bg-[#232946] transition" onClick={toggleTheme} title="Переключить тему">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          {/* Профиль-дропдаун */}
          <div className="relative">
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#232946] transition font-semibold"
              onClick={() => setProfileOpen((v) => !v)}
              onBlur={() => setTimeout(() => setProfileOpen(false), 150)}
            >
              <UserCircle size={22} />
              <span className="hidden sm:inline">{username}</span>
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#232946] border border-[#232946] rounded-lg shadow-lg z-50 animate-fade-in">
                <NavLink to="/profile" className="block px-4 py-2 hover:bg-primary/10 transition-colors">Профиль</NavLink>
                <NavLink to="/settings" className="block px-4 py-2 hover:bg-primary/10 transition-colors">Настройки</NavLink>
                <NavLink to="/resume" className="block px-4 py-2 hover:bg-primary/10 transition-colors">Резюме</NavLink>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-red-600/80 hover:text-white transition-colors flex items-center gap-2"
                  onClick={onLogout}
                >
                  <LogOut size={18} /> Выйти
                </button>
              </div>
            )}
          </div>
          {/* Явная кнопка выхода на десктопе */}
          <button
            className="hidden md:flex items-center gap-2 px-3 py-2 ml-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            onClick={onLogout}
            title="Выйти"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Выйти</span>
          </button>
          {/* Бургер-меню для мобилы */}
          <button className="md:hidden ml-2 p-2 rounded hover:bg-[#232946]" onClick={() => setMenuOpen((v) => !v)}>
            <span className="block w-6 h-0.5 bg-primary mb-1"></span>
            <span className="block w-6 h-0.5 bg-primary mb-1"></span>
            <span className="block w-6 h-0.5 bg-primary"></span>
          </button>
        </div>
      </div>
      {/* Мобильное меню */}
      {menuOpen && (
        <div className="md:hidden bg-[#181c24] border-t border-[#232946] px-4 pb-4 animate-fade-in">
          <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-link-active block' : 'nav-link block'} onClick={() => setMenuOpen(false)}>
            <UserCircle size={18} className="inline mr-1" /> Профиль
          </NavLink>
          <NavLink to="/resume" className={({ isActive }) => isActive ? 'nav-link-active block' : 'nav-link block'} onClick={() => setMenuOpen(false)}>
            <FileText size={18} className="inline mr-1" /> Резюме
          </NavLink>
          <NavLink to="/messages" className={({ isActive }) => isActive ? 'nav-link-active block' : 'nav-link block'} onClick={() => setMenuOpen(false)}>
            <MessageSquare size={18} className="inline mr-1" /> Сообщения
          </NavLink>
          {isAdmin && (
            <NavLink to="/admin/users" className={({ isActive }) => isActive ? 'nav-link-active block' : 'nav-link block'} onClick={() => setMenuOpen(false)}>
              <Users size={18} className="inline mr-1" /> Пользователи
            </NavLink>
          )}
          <NavLink to="/settings" className={({ isActive }) => isActive ? 'nav-link-active block' : 'nav-link block'} onClick={() => setMenuOpen(false)}>
            ⚙️ Настройки
          </NavLink>
          <button
            className="w-full text-left px-4 py-2 mt-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            onClick={onLogout}
          >
            <LogOut size={18} /> Выйти
          </button>
        </div>
      )}
      <style>{`
        .nav-link {
          @apply px-3 py-2 rounded-lg text-base font-medium text-gray-300 hover:bg-primary/10 hover:text-primary transition-colors;
        }
        .nav-link-active {
          @apply px-3 py-2 rounded-lg text-base font-bold bg-primary/20 text-primary;
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
} 