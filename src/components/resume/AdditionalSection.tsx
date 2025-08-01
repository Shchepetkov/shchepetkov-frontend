import React from 'react';
import { BookOpen } from 'lucide-react';
import Section from './Section';

const AdditionalSection: React.FC = () => (
  <Section title="Дополнительно" icon={<BookOpen size={24} />}> 
    <ul className="list-disc ml-6 text-gray-200">
      <li>Разработка тестовых фреймворков с нуля</li>
      <li>Проведение технических собеседований</li>
      <li>Разработка и проведение авторских курсов по автоматизации</li>
      <li>Опыт работы с микросервисной архитектурой</li>
      <li>Наставничество и менторинг</li>
    </ul>
  </Section>
);

export default AdditionalSection; 