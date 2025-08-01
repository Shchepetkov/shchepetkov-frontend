import { AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import Notification from './Notification';

export default function NotificationContainer() {
  const notifications = useAppStore((state) => state.notifications);
  const removeNotification = useAppStore((state) => state.removeNotification);

  return (
    <div className="notification-container fixed top-20 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            notification={notification}
            onRemove={removeNotification}
          />
        ))}
      </AnimatePresence>
    </div>
  );
} 