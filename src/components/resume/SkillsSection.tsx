import React from 'react';
import { Code, Zap, Database, Cloud, Wrench, Users } from 'lucide-react';
import Section from './Section';
import Badge from './Badge';

const SkillsSection: React.FC = () => (
  <Section title="Навыки" icon={<Code size={24} />} className="lg:col-span-2"> 
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Programming Languages */}
      <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-5 h-5 text-purple-400" />
          <h3 className="font-bold text-purple-300">Языки программирования</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>Java</Badge>
          <Badge>Kotlin</Badge>
          <Badge>SQL</Badge>
          <Badge>Python</Badge>
          <Badge>C++</Badge>
        </div>
      </div>

      {/* Testing */}
      <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-4 border border-blue-500/20">
        <div className="flex items-center gap-2 mb-3">
          <Code className="w-5 h-5 text-blue-400" />
          <h3 className="font-bold text-blue-300">Автоматизация тестирования</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>JUnit 5</Badge>
          <Badge>Cucumber</Badge>
          <Badge>Selenium</Badge>
          <Badge>Selenide</Badge>
          <Badge>RestAssured</Badge>
          <Badge>Allure</Badge>
        </div>
      </div>

      {/* Frameworks */}
      <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/20">
        <div className="flex items-center gap-2 mb-3">
          <Wrench className="w-5 h-5 text-green-400" />
          <h3 className="font-bold text-green-300">Фреймворки</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>Spring Framework</Badge>
          <Badge>Spring Boot</Badge>
          <Badge>Spring Security</Badge>
        </div>
      </div>

      {/* Databases */}
      <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl p-4 border border-yellow-500/20">
        <div className="flex items-center gap-2 mb-3">
          <Database className="w-5 h-5 text-yellow-400" />
          <h3 className="font-bold text-yellow-300">Базы данных</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>PostgreSQL</Badge>
          <Badge>Oracle</Badge>
        </div>
      </div>

      {/* DevOps */}
      <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-xl p-4 border border-red-500/20">
        <div className="flex items-center gap-2 mb-3">
          <Cloud className="w-5 h-5 text-red-400" />
          <h3 className="font-bold text-red-300">DevOps и CI/CD</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>Docker</Badge>
          <Badge>Kubernetes</Badge>
          <Badge>TeamCity</Badge>
          <Badge>Jenkins</Badge>
          <Badge>Git</Badge>
          <Badge>Selenoid</Badge>
        </div>
      </div>

      {/* Additional */}
      <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl p-4 border border-indigo-500/20">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold text-indigo-300">Дополнительные навыки</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>Kafka</Badge>
          <Badge>Test Framework Development</Badge>
          <Badge>Technical Interviews</Badge>
          <Badge>Mentoring</Badge>
        </div>
      </div>
    </div>
  </Section>
);

export default SkillsSection; 