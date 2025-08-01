import type { FC } from 'react';
import { useTranslation } from '../hooks/useTranslation';

const PortfolioPage: FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
                            <div className="text-center mb-16">
                      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        {t('portfolioTitle')}
                      </h1>
                      <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        {t('portfolioSubtitle')}
                      </p>
                    </div>

        {/* Проекты */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Enterprise Test Framework',
              description: 'Полнофункциональный фреймворк для UI и API тестирования с поддержкой параллельного запуска, интеграцией с Jenkins и красивыми отчетами Allure.',
              technologies: ['Java', 'Selenium', 'Cucumber', 'REST-assured', 'Allure', 'Jenkins'],
              image: '🏢',
              link: '#',
              github: '#'
            },
            {
              title: 'BDD Automation Suite',
              description: 'Фреймворк на основе Cucumber + Gherkin для BDD подхода. Включает Page Object Model, Screenplay Pattern и Fluent Interface.',
              technologies: ['Cucumber', 'Gherkin', 'POM', 'Screenplay', 'Gradle'],
              image: '🌱',
              link: '#',
              github: '#'
            },
            {
              title: 'API Testing Platform',
              description: 'Специализированный фреймворк для API тестирования с поддержкой GraphQL, OAuth 2.0, JWT и различных форматов данных.',
              technologies: ['REST-assured', 'GraphQL', 'OAuth 2.0', 'JWT', 'Retrofit'],
              image: '🌐',
              link: '#',
              github: '#'
            },
            {
              title: 'Mobile Test Automation',
              description: 'Фреймворк для автоматизации тестирования мобильных приложений с поддержкой Appium и различных платформ.',
              technologies: ['Appium', 'Java', 'Android', 'iOS', 'Allure'],
              image: '📱',
              link: '#',
              github: '#'
            },
            {
              title: 'Performance Test Suite',
              description: 'Инструменты для нагрузочного тестирования с интеграцией JMeter и кастомными метриками.',
              technologies: ['JMeter', 'Java', 'Grafana', 'InfluxDB', 'Docker'],
              image: '⚡',
              link: '#',
              github: '#'
            },
            {
              title: 'CI/CD Pipeline Framework',
              description: 'Автоматизированные пайплайны для интеграции тестов в CI/CD процессы с поддержкой различных платформ.',
              technologies: ['Jenkins', 'GitHub Actions', 'GitLab CI', 'Docker', 'Kubernetes'],
              image: '🔄',
              link: '#',
              github: '#'
            }
          ].map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Изображение проекта */}
              <div className="p-6 text-center">
                <div className="text-6xl mb-4">{project.image}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {project.description}
                </p>
                
                {/* Технологии */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Ссылки */}
                                            <div className="flex space-x-4">
                              <a
                                href={project.link}
                                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
                              >
                                {t('demo')}
                              </a>
                              <a
                                href={project.github}
                                className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center"
                              >
                                GitHub
                              </a>
                            </div>
              </div>
            </div>
          ))}
        </div>

                            {/* Статистика */}
                    <section className="mt-20">
                      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                        {t('statistics')}
                      </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                    {[
                          { number: '15+', label: t('completedProjects') },
                          { number: '50K+', label: t('automatedTests') },
                          { number: '95%', label: t('codeCoverage') },
                          { number: '24/7', label: t('cicdMonitoring') }
                        ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PortfolioPage; 