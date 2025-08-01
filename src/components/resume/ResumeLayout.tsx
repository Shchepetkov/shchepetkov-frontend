import React from 'react';

interface ResumeLayoutProps {
  children: React.ReactNode;
}

const ResumeLayout: React.FC<ResumeLayoutProps> = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
    {/* Animated background elements */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>
    
    {/* Main content */}
    <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default ResumeLayout; 