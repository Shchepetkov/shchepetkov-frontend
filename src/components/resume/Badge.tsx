import React from 'react';

const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full px-4 py-2 text-sm font-semibold mr-3 mb-3 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer">
    {children}
  </span>
);

export default Badge; 