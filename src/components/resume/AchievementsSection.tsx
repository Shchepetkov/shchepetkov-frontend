import React from 'react';
import { Award } from 'lucide-react';
import Section from './Section';

const AchievementsSection: React.FC = () => (
  <Section title="Достижения" icon={<Award size={24} />}> 
    <ul className="list-disc ml-6 text-gray-200">
      <li>Разработал тестовый фреймворк с нуля, ускорив регрессионное тестирование на 30%</li>
      <li>Автоматизировал более 500 тест-кейсов</li>
      <li>Настроил процесс CI/CD, сократив время развертывания тестов с 2 часов до 15 минут</li>
      <li>Обучил более 50 специалистов</li>
    </ul>
  </Section>
);

export default AchievementsSection; 