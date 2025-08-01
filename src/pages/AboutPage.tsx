import type { FC } from 'react';

const AboutPage: FC = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            О себе
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Автоматизатор тестирования с 5+ лет опыта в создании надежных и масштабируемых 
            фреймворков для тестирования
          </p>
        </div>

        {/* Биография */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Биография
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  Я специализируюсь на создании идеальных фреймворков для UI и API тестирования, 
                  используя лучшие практики и современные технологии Java экосистемы.
                </p>
                <p>
                  Мой подход основан на принципах SOLID архитектуры, чистом коде и модульности. 
                  Я создаю фреймворки, которые легко масштабируются, поддерживаются и интегрируются 
                  в CI/CD процессы.
                </p>
                <p>
                  Специализируюсь на Cucumber + Gherkin для BDD, Page Object Model для UI тестирования, 
                  и REST-assured для API тестирования. Всегда использую Allure для красивой отчетности 
                  и Log4j2 для логирования.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ключевые принципы
              </h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Чистая архитектура и SOLID принципы
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Модульность и переиспользование кода
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Автоматизация CI/CD процессов
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Подробная документация и отчетность
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Постоянное обучение новым технологиям
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Опыт работы */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Опыт работы
          </h2>
          <div className="space-y-8">
            {[
              {
                period: '2023 - настоящее время',
                company: 'TechCorp',
                position: 'Senior Test Automation Engineer',
                description: 'Создание фреймворков для UI и API тестирования, интеграция с CI/CD, менторинг команды'
              },
              {
                period: '2021 - 2023',
                company: 'InnovationLab',
                position: 'Test Automation Engineer',
                description: 'Разработка автоматизированных тестов, внедрение Cucumber + Gherkin, создание отчетов Allure'
              },
              {
                period: '2019 - 2021',
                company: 'StartupXYZ',
                position: 'QA Engineer',
                description: 'Ручное тестирование, первые шаги в автоматизации, изучение Selenium WebDriver'
              }
            ].map((job, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {job.position}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">
                      {job.company}
                    </p>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400 text-sm md:text-right">
                    {job.period}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {job.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Образование */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Образование
          </h2>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Бакалавр компьютерных наук
                </h3>
                <p className="text-blue-600 dark:text-blue-400">
                  Московский технический университет
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Специализация: Программная инженерия и тестирование
                </p>
              </div>
              <span className="text-gray-500 dark:text-gray-400 text-sm md:text-right mt-4 md:mt-0">
                2015 - 2019
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage; 