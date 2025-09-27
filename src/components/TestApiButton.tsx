import type { FC } from 'react';
import { useState } from 'react';
import Button from './ui/Button';
import { testApiConnection, checkApiHealth } from '../utils/apiTest';

const TestApiButton: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  const handleTestApi = async () => {
    setIsLoading(true);
    setResult('Тестирование...');
    
    try {
      // Сначала проверяем доступность API
      const isHealthy = await checkApiHealth();
      
      if (!isHealthy) {
        setResult('❌ API сервер недоступен. Убедитесь, что Java backend запущен на порту 8086');
        return;
      }
      
      // Затем тестируем авторизацию
      const testResult = await testApiConnection();
      
      if (testResult.success) {
        setResult('✅ API подключение успешно! Сервер отвечает корректно.');
      } else {
        setResult(`❌ Ошибка API: ${testResult.error}`);
      }
    } catch (error) {
      setResult(`❌ Ошибка: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Тест API подключения</h3>
      <Button
        onClick={handleTestApi}
        loading={isLoading}
        disabled={isLoading}
        variant="outline"
      >
        {isLoading ? 'Тестирование...' : 'Тестировать API'}
      </Button>
      
      {result && (
        <div className="mt-4 p-3 bg-white dark:bg-gray-700 rounded border">
          <pre className="text-sm whitespace-pre-wrap">{result}</pre>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <p>Убедитесь, что Java backend запущен на <code>http://localhost:8086</code></p>
        <p>Эндпоинт для тестирования: <code>POST /api/auth/login</code></p>
      </div>
    </div>
  );
};

export default TestApiButton;
