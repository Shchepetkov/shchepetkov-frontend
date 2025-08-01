import React from 'react';
import { Star, Code, BookOpen, Award } from 'lucide-react';
import Section from './Section';

const SpecializationSection: React.FC = () => (
  <Section title="Специализация" icon={<Star size={24} />}> 
    <div className="mb-4">
      <div className="font-semibold flex items-center gap-2 mb-1"><Code size={18} />Автоматизация тестирования</div>
      <div className="text-gray-200 mb-2">Разработка комплексных решений для автоматизации тестирования веб-приложений, API и микросервисов. Создание фреймворков с нуля, интеграция с CI/CD системами.</div>
    </div>
    <div className="mb-4">
      <div className="font-semibold flex items-center gap-2 mb-1"><BookOpen size={18} />Управление качеством</div>
      <div className="text-gray-200 mb-2">Построение процессов тестирования, внедрение методологий BDD/TDD, организация работы команды тестирования.</div>
    </div>
    <div>
      <div className="font-semibold flex items-center gap-2 mb-1"><Award size={18} />Обучение и развитие</div>
      <div className="text-gray-200">Разработка обучающих программ, проведение технических собеседований, менторинг junior специалистов.</div>
    </div>
  </Section>
);

export default SpecializationSection; 