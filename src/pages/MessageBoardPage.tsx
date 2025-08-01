import React, { useState, useEffect } from 'react';
import { Search, Plus, MessageSquare, Tag, User, Calendar } from 'lucide-react';
import { useMessages, useCreateMessage } from '../hooks/useMessages';
import type { Message, MessageRequest } from '../types/api';
import { useCurrentUser } from '../hooks/useAuth';

export default function MessageBoardPage() {
  const [filter, setFilter] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newMessage, setNewMessage] = useState({ text: '', tag: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data: messagesData, isLoading, error } = useMessages();
  const { data: currentUserData } = useCurrentUser();
  const createMessageMutation = useCreateMessage();

  const messages = messagesData || [];
  const currentUser = currentUserData?.user;

  const filteredMessages = messages.filter((message: Message) =>
    message.tag?.toLowerCase().includes(filter.toLowerCase()) ||
    message.text?.toLowerCase().includes(filter.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      console.error('User not authenticated');
      return;
    }

    const messageRequest: MessageRequest = {
      text: newMessage.text,
      tag: newMessage.tag,
      authorId: currentUser.id
    };

    try {
      await createMessageMutation.mutateAsync(messageRequest);
      setNewMessage({ text: '', tag: '' });
      setSelectedFile(null);
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating message:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка сообщений...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p>Ошибка загрузки сообщений</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Поиск */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Поиск по тегу или тексту..."
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Поиск
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Кнопка добавления */}
      <div className="mb-6">
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Plus size={20} />
          Добавить сообщение
        </button>
      </div>

      {/* Форма создания */}
      {showCreateForm && (
        <div className="mb-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MessageSquare size={20} />
                Новое сообщение
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Текст сообщения
                  </label>
                  <textarea
                    value={newMessage.text}
                    onChange={(e) => setNewMessage({ ...newMessage, text: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    rows={3}
                    placeholder="Введите сообщение..."
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Тег
                  </label>
                  <input
                    type="text"
                    value={newMessage.tag}
                    onChange={(e) => setNewMessage({ ...newMessage, tag: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Введите тег..."
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
                    Изображение (опционально)
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={createMessageMutation.isPending}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                  >
                    {createMessageMutation.isPending ? 'Добавление...' : 'Добавить'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Список сообщений */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((message: Message) => (
            <div key={message.id} className="card shadow-sm hover:shadow-md transition-shadow">
              <div className="card-body">
                <p className="text-gray-800 mb-3">{message.text}</p>
                <div className="flex items-center gap-2 mb-3">
                  <Tag size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {message.tag}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    <span>{message.author.username}</span>
                  </div>
                  {message.createdAt && (
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{new Date(message.createdAt).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <MessageSquare size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 text-lg">
              {filter ? 'Сообщения не найдены' : 'Сообщений пока нет'}
            </p>
            {!filter && (
              <p className="text-gray-500 mt-2">
                Будьте первым, кто добавит сообщение!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 