import React from 'react';
import { CheckCircle } from 'lucide-react';
import Section from './Section';

const ApproachSection: React.FC = () => (
  <Section title="Профессиональный подход" icon={<CheckCircle size={24} />}> 
    <ul className="list-disc ml-6 text-gray-200">
      <li><b>Качество кода:</b> Следование принципам SOLID, паттернам проектирования и best practices при разработке автотестов</li>
      <li><b>Эффективность:</b> Оптимизация процессов тестирования, сокращение времени выполнения тестов</li>
      <li><b>Масштабируемость:</b> Создание расширяемых и поддерживаемых решений для автоматизации</li>
      <li><b>Документация:</b> Подробное документирование кода и процессов для облегчения поддержки</li>
    </ul>
  </Section>
);

export default ApproachSection; 