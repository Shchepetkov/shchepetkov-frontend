import React from 'react';

interface WelcomePageProps {
  onLogin: () => void;
}

export default function WelcomePage({ onLogin }: WelcomePageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <h1 className="text-4xl font-bold mb-6 text-indigo-700">Добро пожаловать в современный мессенджер!</h1>
      <p className="mb-8 text-gray-600 text-lg max-w-xl text-center">
        Здесь вы можете общаться, делиться сообщениями, управлять своим профилем и использовать все возможности современной платформы. Для продолжения, пожалуйста, войдите или зарегистрируйтесь.
      </p>
      <button
        onClick={onLogin}
        className="px-8 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition text-lg font-semibold"
      >
        Войти или зарегистрироваться
      </button>
    </div>
  );
} 