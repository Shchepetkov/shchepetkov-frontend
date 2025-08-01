import React from 'react';

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ title, icon, children, className = '' }) => (
  <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl ${className}`}>
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
        <span className="text-white">{icon}</span>
      </div>
      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        {title}
      </h2>
    </div>
    <div className="text-gray-200">{children}</div>
  </section>
);

export default Section; 