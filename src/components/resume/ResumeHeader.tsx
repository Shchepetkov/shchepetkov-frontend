import React from 'react';
import { User, Mail, Phone, MapPin, Globe, Download } from 'lucide-react';

const ResumeHeader: React.FC = () => (
  <div className="lg:col-span-3 text-center mb-12">
    {/* Profile section */}
    <div className="relative mb-8">
      <div className="relative inline-block">
        <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-1 animate-pulse">
          <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
            <User className="w-16 h-16 text-white" />
          </div>
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-900 animate-ping"></div>
      </div>
    </div>

    {/* Name with gradient text */}
    <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient">
      Щепетков Максим
    </h1>
    
    {/* Title */}
    <div className="text-2xl font-bold text-white mb-6">
      <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        Senior QA Automation Engineer
      </span>
    </div>

    {/* Contact info with hover effects */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="group flex items-center justify-center gap-2 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105">
        <Phone className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
        <span className="text-gray-300 group-hover:text-white">+7 (927) 125-11-23</span>
      </div>
      <div className="group flex items-center justify-center gap-2 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105">
        <Mail className="w-5 h-5 text-pink-400 group-hover:text-pink-300" />
        <span className="text-gray-300 group-hover:text-white">maksim.shchepetkov1995@gmail.com</span>
      </div>
      <div className="group flex items-center justify-center gap-2 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105">
        <MapPin className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300" />
        <span className="text-gray-300 group-hover:text-white">Саратов</span>
      </div>
      <div className="group flex items-center justify-center gap-2 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105">
        <Globe className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300" />
        <span className="text-gray-300 group-hover:text-white">щепетков.я.рус</span>
      </div>
    </div>

    {/* Download button */}
    <button className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <Download className="w-5 h-5 group-hover:animate-bounce" />
      Скачать резюме
    </button>
  </div>
);

export default ResumeHeader; 