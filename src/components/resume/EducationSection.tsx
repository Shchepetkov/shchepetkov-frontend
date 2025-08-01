import React from 'react';
import { GraduationCap } from 'lucide-react';
import Section from './Section';

const EducationSection: React.FC = () => (
  <Section title="Образование" icon={<GraduationCap size={24} />}> 
    <div className="font-semibold">СГУ им. Н.Г. Чернышевского</div>
    <div className="text-gray-300">Механико-математический факультет</div>
    <div className="text-gray-300">Прикладная информатика, 2018</div>
  </Section>
);

export default EducationSection; 