import React from 'react';
import { User } from 'lucide-react';
import Section from './Section';

const AboutSection: React.FC = () => (
  <Section title="О себе" icon={<User size={24} />} className="lg:col-span-2"> 
    <p className="text-lg leading-relaxed">
      <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-semibold">
        Опытный инженер по автоматизированному тестированию
      </span> с более чем 4 годами работы в крупных IT-компаниях. 
      <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
        Эксперт в разработке тестовых фреймворков, CI/CD, DevOps, BDD и API-тестировании.
      </span> Проводил технические собеседования, разрабатывал учебные курсы, участвовал в построении процессов тестирования с нуля. 
      <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent font-semibold">
        Обладаю глубокой экспертизой в Java, Spring, Docker и Kafka.
      </span>
    </p>
  </Section>
);

export default AboutSection; 