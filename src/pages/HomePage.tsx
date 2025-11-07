import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../hooks/useTranslation';
import WelcomeToast from '../components/ui/WelcomeToast';

const HomePage: FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [showWelcome, setShowWelcome] = useState(false);

  // Показываем приветствие для авторизованных пользователей при первом заходе
  useEffect(() => {
    if (user) {
      const hasShownWelcome = sessionStorage.getItem('welcomeShown');
      if (!hasShownWelcome) {
        setShowWelcome(true);
        sessionStorage.setItem('welcomeShown', 'true');
      }
    }
  }, [user]);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Текст */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                {t('heroTitle')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {t('nameAndLastName')}
                </span>
              </h1>
                             <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8">
                 {t('heroSubtitle')}
               </p>
               <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
                 {t('heroDescription')}
               </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                 <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                   {t('downloadResume')}
                 </button>
                 <Link
                   to="/portfolio"
                   className="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
                 >
                   {t('viewProjects')}
                 </Link>
              </div>
            </div>

            {/* Фото */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                  <div className="w-72 h-72 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <div className="text-6xl">👨‍💻</div>
                  </div>
                </div>
                {/* Плавающие элементы */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
                <div className="absolute top-1/2 -left-8 w-4 h-4 bg-red-400 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ключевые навыки */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
             {t('keySkills')}
           </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                         {[
               {
                 icon: '☕',
                 title: t('javaDevelopment'),
                 description: t('javaDescription')
               },
               {
                 icon: '🧪',
                 title: t('testAutomation'),
                 description: t('testDescription')
               },
               {
                 icon: '🌐',
                 title: t('apiTesting'),
                 description: t('apiDescription')
               },
               {
                 icon: '📊',
                 title: t('reporting'),
                 description: t('reportingDescription')
               },
               {
                 icon: '🔄',
                 title: t('cicd'),
                 description: t('cicdDescription')
               },
               {
                 icon: '🏗️',
                 title: t('architecture'),
                 description: t('architectureDescription')
               }
             ].map((skill, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{skill.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {skill.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Добро пожаловать Toast */}
      {showWelcome && (
        <WelcomeToast onClose={() => setShowWelcome(false)} />
      )}
    </div>
  );
};

export default HomePage; 