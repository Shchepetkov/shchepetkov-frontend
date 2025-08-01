import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  User, 
  Hash, 
  Calendar, 
  Filter,
  Search,
  Trash2,
  Edit
} from 'lucide-react';
import { useMessages, useDeleteMessage } from '../hooks/useMessages';
import { useAppStore } from '../store/useAppStore';
import Card from './ui/Card';
import Button from './ui/Button';
import type { Message } from '../types/api';
import { Role } from '../types/api';

export default function MessageList() {
  const user = useAppStore((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'author'>('date');
  
  const { data: messages, isLoading, error } = useMessages();
  const deleteMessageMutation = useDeleteMessage();

  // Фильтрация и сортировка сообщений
  const filteredMessages = messages?.filter((message) => {
    const matchesSearch = message.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.author.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || message.tag === selectedTag;
    return matchesSearch && matchesTag;
  }) || [];

  const sortedMessages = [...filteredMessages].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
    } else {
      return a.author.username.localeCompare(b.author.username);
    }
  });

  // Получаем уникальные теги
  const uniqueTags = Array.from(new Set(messages?.map(m => m.tag).filter(Boolean) || []));

  const handleDeleteMessage = (messageId: number) => {
    if (window.confirm('Вы уверены, что хотите удалить это сообщение?')) {
      deleteMessageMutation.mutate(messageId);
    }
  };

  const canEditMessage = (message: Message) => {
    return user?.id === message.author.id || user?.roles?.includes(Role.ADMIN);
  };

  const canDeleteMessage = (message: Message) => {
    return user?.id === message.author.id || user?.roles?.includes(Role.ADMIN);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Ошибка загрузки сообщений</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Фильтры и поиск */}
      <Card>
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Сообщения</h2>
        </div>
        
        <div className="px-6 py-4 space-y-4">
          {/* Поиск */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Поиск по тексту или автору..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Фильтры */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Фильтры:</span>
            </div>
            
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Фильтр по тегу"
            >
              <option value="">Все теги</option>
              {uniqueTags.map((tag) => (
                <option key={tag} value={tag}>
                  #{tag}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'author')}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Сортировка"
            >
              <option value="date">По дате</option>
              <option value="author">По автору</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Список сообщений */}
      <div className="space-y-4">
        {sortedMessages.length === 0 ? (
          <Card>
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {searchTerm || selectedTag ? 'Сообщения не найдены' : 'Сообщений пока нет'}
              </p>
            </div>
          </Card>
        ) : (
          sortedMessages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <div className="px-6 py-4">
                  {/* Заголовок сообщения */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{message.author.username}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {message.createdAt 
                              ? new Date(message.createdAt).toLocaleString('ru-RU')
                              : 'Недавно'
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Действия */}
                    <div className="flex space-x-2">
                      {canEditMessage(message) && (
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {canDeleteMessage(message) && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteMessage(message.id)}
                          disabled={deleteMessageMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Текст сообщения */}
                  <div className="mb-3">
                    <p className="text-gray-800 whitespace-pre-wrap">{message.text}</p>
                  </div>

                  {/* Тег */}
                  {message.tag && (
                    <div className="flex items-center space-x-1">
                      <Hash className="h-3 w-3 text-gray-400" />
                      <span className="text-sm text-indigo-600 font-medium">
                        #{message.tag}
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
} 