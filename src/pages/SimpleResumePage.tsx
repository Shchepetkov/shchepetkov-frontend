import React from 'react';

export default function SimpleResumePage() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#646cff', fontSize: '2rem', marginBottom: '1rem' }}>
        Максим Щепетков
      </h1>
      <h2 style={{ color: '#666', fontSize: '1.5rem', marginBottom: '1rem' }}>
        Senior QA Automation Engineer
      </h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: '#333', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
          Контакты
        </h3>
        <p>📧 maksim.shchepetkov1995@gmail.com</p>
        <p>📱 +7 (927) 125-11-23</p>
        <p>📍 Саратов</p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: '#333', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
          О себе
        </h3>
        <p>
          Опытный инженер по автоматизированному тестированию с более чем 4 годами работы в крупных IT-компаниях.
          Эксперт в разработке тестовых фреймворков, CI/CD, DevOps, BDD и API-тестировании.
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: '#333', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
          Опыт работы
        </h3>
        <div style={{ marginBottom: '1rem' }}>
          <h4 style={{ color: '#646cff', fontSize: '1.1rem' }}>ООО IBS, Москва</h4>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>Старший инженер по автоматизированному тестированию</p>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>Декабрь 2022 — настоящее время</p>
        </div>
      </div>

      <div>
        <h3 style={{ color: '#333', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
          Навыки
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ background: '#646cff', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem' }}>
            Java
          </span>
          <span style={{ background: '#646cff', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem' }}>
            Selenium
          </span>
          <span style={{ background: '#646cff', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem' }}>
            JUnit 5
          </span>
          <span style={{ background: '#646cff', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem' }}>
            Cucumber
          </span>
        </div>
      </div>
    </div>
  );
} 