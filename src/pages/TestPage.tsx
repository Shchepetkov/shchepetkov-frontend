import React from 'react';

export default function TestPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="card shadow-sm">
        <div className="card-body">
          <h1 className="text-2xl font-bold mb-4">Тестовая страница</h1>
          <p className="text-gray-600">
            Если вы видите эту страницу, значит роутинг работает правильно!
          </p>
          <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            ✅ Роутинг работает!
          </div>
        </div>
      </div>
    </div>
  );
} 