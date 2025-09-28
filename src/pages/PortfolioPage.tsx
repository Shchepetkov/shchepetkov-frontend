import type { FC } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const PortfolioPage: FC = () => {
  const { t } = useTranslation();
  
  const projectsData = [
    {
      title: t('project1Title'),
      description: t('project1Description'),
      technologies: ['Java', 'Selenium', 'Cucumber', 'REST-assured', 'Allure', 'Jenkins'],
      image: '🏢',
      link: '#',
      github: '#',
      status: 'completed'
    },
    {
      title: t('project2Title'),
      description: t('project2Description'),
      technologies: ['Cucumber', 'Gherkin', 'POM', 'Screenplay', 'Gradle'],
      image: '🌱',
      link: '#',
      github: '#',
      status: 'completed'
    },
    {
      title: t('project3Title'),
      description: t('project3Description'),
      technologies: ['REST-assured', 'GraphQL', 'OAuth 2.0', 'JWT', 'Retrofit'],
      image: '🌐',
      link: '#',
      github: '#',
      status: 'in-progress'
    },
    {
      title: t('project4Title'),
      description: t('project4Description'),
      technologies: ['Appium', 'Java', 'Android', 'iOS', 'Allure'],
      image: '📱',
      link: '#',
      github: '#',
      status: 'completed'
    },
    {
      title: t('project5Title'),
      description: t('project5Description'),
      technologies: ['JMeter', 'Java', 'Grafana', 'InfluxDB', 'Docker'],
      image: '⚡',
      link: '#',
      github: '#',
      status: 'completed'
    },
    {
      title: t('project6Title'),
      description: t('project6Description'),
      technologies: ['Jenkins', 'GitHub Actions', 'GitLab CI', 'Docker', 'Kubernetes'],
      image: '🔄',
      link: '#',
      github: '#',
      status: 'completed'
    }
  ];
  
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
          {projectsData.map((project, index) => (
            <Card key={index} hover className="relative overflow-hidden">
              {/* Статус проекта */}
              <div className="absolute top-4 right-4">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  project.status === 'completed' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  {project.status === 'completed' ? `✅ ${t('statusCompleted')}` : `🚧 ${t('statusInProgress')}`}
                </span>
              </div>
              
              {/* Изображение проекта */}
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{project.image}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {project.description}
                </p>
              </div>
              
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
              <div className="flex space-x-3">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  onClick={() => window.open(project.link, '_blank')}
                >
                  {t('demo')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => window.open(project.github, '_blank')}
                >
                  GitHub
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Статистика */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            {t('statistics')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '15+', label: t('completedProjects'), icon: '🎯' },
              { number: '50K+', label: t('automatedTests'), icon: '🧪' },
              { number: '95%', label: t('codeCoverage'), icon: '📊' },
              { number: '24/7', label: t('cicdMonitoring'), icon: '🔄' }
            ].map((stat, index) => (
              <Card key={index} className="text-center hover">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PortfolioPage; 