// Утилита для тестирования API подключения
import { authApi } from '../services/api';

export const testApiConnection = async () => {
  try {
    console.log('🔍 Тестирование подключения к API...');
    
    // Тест базового подключения
    const response = await fetch('http://localhost:8086/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'testpassword'
      })
    });
    
    console.log('📡 Статус ответа:', response.status);
    console.log('📡 Заголовки:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ API отвечает:', data);
      return { success: true, data };
    } else {
      const errorText = await response.text();
      console.log('❌ Ошибка API:', errorText);
      return { success: false, error: errorText };
    }
  } catch (error) {
    console.error('❌ Ошибка подключения к API:', error);
    return { success: false, error: error };
  }
};

// Функция для проверки доступности API
export const checkApiHealth = async () => {
  try {
    const response = await fetch('http://localhost:8086/api/health', {
      method: 'GET',
    });
    
    if (response.ok) {
      console.log('✅ API сервер доступен');
      return true;
    } else {
      console.log('⚠️ API сервер недоступен');
      return false;
    }
  } catch (error) {
    console.log('❌ API сервер недоступен:', error);
    return false;
  }
};
