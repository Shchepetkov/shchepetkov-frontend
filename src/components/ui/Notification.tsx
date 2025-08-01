import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import type { Notification as NotificationType } from '../../types/api';

interface NotificationProps {
  notification: NotificationType;
  onRemove: (id: string) => void;
}

const notificationIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const notificationColors = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
};

export default function Notification({ notification, onRemove }: NotificationProps) {
  const Icon = notificationIcons[notification.type];

  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(notification.id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [notification.id, onRemove]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={`flex items-center p-4 border rounded-lg shadow-lg ${notificationColors[notification.type]}`}
    >
      <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
      <p className="text-sm font-medium flex-1">{notification.message}</p>
      <button
        onClick={() => onRemove(notification.id)}
        className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Закрыть уведомление"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
} 