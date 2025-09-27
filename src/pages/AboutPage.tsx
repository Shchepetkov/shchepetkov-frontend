import type { FC } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import Card from '../components/ui/Card';

const AboutPage: FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
                            <div className="text-center mb-16">
                      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        {t('aboutTitle')}
                      </h1>
                      <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        {t('aboutSubtitle')}
                      </p>
                    </div>

        {/* Биография */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <Card title={t('biography')} className="h-fit">
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  {t('biographyText1')}
                </p>
                <p>
                  {t('biographyText2')}
                </p>
                <p>
                  {t('biographyText3')}
                </p>
              </div>
            </Card>
            
            <Card 
              title={t('keyPrinciples')} 
              gradient 
              className="h-fit"
            >
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  {t('principle1')}
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  {t('principle2')}
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  {t('principle3')}
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  {t('principle4')}
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  {t('principle5')}
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Опыт работы */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {t('workExperience')}
          </h2>
          <div className="space-y-6">
            {[
              {
                period: '2023 - настоящее время',
                company: 'TechCorp',
                position: 'Senior Test Automation Engineer',
                description: 'Создание фреймворков для UI и API тестирования, интеграция с CI/CD, менторинг команды',
                technologies: ['Java', 'Selenium', 'Cucumber', 'REST-assured', 'Jenkins', 'Docker']
              },
              {
                period: '2021 - 2023',
                company: 'InnovationLab',
                position: 'Test Automation Engineer',
                description: 'Разработка автоматизированных тестов, внедрение Cucumber + Gherkin, создание отчетов Allure',
                technologies: ['Java', 'Selenium', 'Cucumber', 'Allure', 'Maven', 'GitLab CI']
              },
              {
                period: '2019 - 2021',
                company: 'StartupXYZ',
                position: 'QA Engineer',
                description: 'Ручное тестирование, первые шаги в автоматизации, изучение Selenium WebDriver',
                technologies: ['Manual Testing', 'Selenium', 'Java', 'JUnit', 'TestNG']
              }
            ].map((job, index) => (
              <Card key={index} hover className="relative">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {job.position}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                      {job.company}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {job.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400 text-sm md:text-right mt-2 md:mt-0 md:ml-4">
                    {job.period}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Образование */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {t('education')}
          </h2>
          <Card>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('bachelorDegree')}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                  {t('university')}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('specialization')}
                </p>
              </div>
              <span className="text-gray-500 dark:text-gray-400 text-sm md:text-right mt-4 md:mt-0">
                2015 - 2019
              </span>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default AboutPage; 