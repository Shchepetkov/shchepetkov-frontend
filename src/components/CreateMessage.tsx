import { useState } from 'react';
import { Send, Hash } from 'lucide-react';
import { useCreateMessage } from '../hooks/useMessages';
import { useAppStore } from '../store/useAppStore';
import Card from './ui/Card';
import Button from './ui/Button';
import type { MessageRequest } from '../types/api';

export default function CreateMessage() {
  const user = useAppStore((state) => state.user);
  const [message, setMessage] = useState('');
  const [tag, setTag] = useState('');
  
  const createMessageMutation = useCreateMessage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id || !message.trim()) return;

    const messageRequest: MessageRequest = {
      text: message.trim(),
      tag: tag.trim(),
      authorId: user.id,
    };

    createMessageMutation.mutate(messageRequest, {
      onSuccess: () => {
        setMessage('');
        setTag('');
      },
    });
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-gray-600">Необходимо войти в систему</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Создать новое сообщение</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Текст сообщения
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Введите текст сообщения..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              rows={4}
              required
            />
          </div>

          <div>
            <label htmlFor="tag" className="block text-sm font-medium text-gray-700 mb-2">
              Тег (необязательно)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Hash className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="tag"
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Введите тег..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={createMessageMutation.isPending || !message.trim()}
              className="min-w-[120px]"
            >
              {createMessageMutation.isPending ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Отправить
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
} 