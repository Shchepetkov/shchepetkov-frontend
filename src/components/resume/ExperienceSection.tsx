import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import Section from './Section';

const ExperienceSection: React.FC = () => (
  <Section title="Опыт работы" icon={<Briefcase size={24} />} className="lg:col-span-2"> 
    <div className="space-y-6">
      {/* IBS */}
      <div className="group bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              ООО IBS, Москва
            </h3>
            <p className="text-cyan-300 font-semibold">Старший инженер по автоматизированному тестированию</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>Декабрь 2022 — настоящее время</span>
          </div>
        </div>
        <ul className="space-y-2">
          {[
            'Разработка и поддержка автоматизированных тестов на Java (Cucumber, Gherkin, JUnit 5)',
            'Настройка CI/CD в TeamCity',
            'Разработка тестового фреймворка с нуля',
            'Проведение собеседований в ОТП Банк',
            'Обучение и наставничество'
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-200">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ANTARA */}
      <div className="group bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              ООО АНТАРА, Москва
            </h3>
            <p className="text-cyan-300 font-semibold">Ведущий инженер по автоматизированному тестированию</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>Декабрь 2020 — Декабрь 2022</span>
          </div>
        </div>
        <ul className="space-y-2">
          {[
            'Разработка и поддержка автотестов',
            'Разработка тестовых фреймворков',
            'Проведение лекций в школе АНТАРА',
            'Разработка микросервисов на Spring'
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-200">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Section>
);

export default ExperienceSection; 