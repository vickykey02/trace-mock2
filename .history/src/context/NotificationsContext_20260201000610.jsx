import { createContext, useContext, useState, useEffect } from 'react';
import { useSubmittedActions } from './SubmittedActionsContext';

const NotificationsContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationsProvider');
  }
  return context;
};

// Statische Anfangsbenachrichtigungen
const initialNotifications = [
  {
    id: 'static-1',
    type: 'info',
    title: 'Willkommen bei Trace!',
    message: 'Entdecke nachhaltige Handlungen und sammle Punkte.',
    time: 'Vor 2 Tagen',
    read: true
  },
  {
    id: 'static-2',
    type: 'social',
    title: 'Jane Goodall folgt dir jetzt',
    message: 'Schau dir ihr Profil an!',
    time: 'Vor 1 Tag',
    read: true
  },
  {
    id: 'static-3',
    type: 'achievement',
    title: '🎉 Erste Handlung abgeschlossen!',
    message: 'Du hast deine erste nachhaltige Handlung eingereicht.',
    time: 'Vor 5 Stunden',
    read: false
  }
];

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [processedActions, setProcessedActions] = useState(() => {
    const saved = localStorage.getItem('processedNotificationActions');
    return saved ? JSON.parse(saved) : [];
  });

  const { submitted, updateStatus } = useSubmittedActions();

  // Speichere Benachrichtigungen in LocalStorage
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Speichere verarbeitete Actions in LocalStorage
  useEffect(() => {
    localStorage.setItem('processedNotificationActions', JSON.stringify(processedActions));
  }, [processedActions]);

  // Timer-Logik: Prüfe auf pending Handlungen und genehmige sie nach 3 Minuten
  useEffect(() => {
    const timers = [];

    const pendingActions = submitted.filter(
      action => action.status === 'pending' && !processedActions.includes(action.id)
    );

    pendingActions.forEach(action => {
      const submittedTime = new Date(action.submittedAt).getTime();
      const now = Date.now();
      const approvalDelay = 10 * 1000; // 10 Sekunden zum Testen (später: 3 * 60 * 1000 für 3 Minuten)
      const timeElapsed = now - submittedTime;
      const timeRemaining = approvalDelay - timeElapsed;

      if (timeRemaining > 0) {
        // Timer setzen für verbleibende Zeit
        const timer = setTimeout(() => {
          // Status auf 'approved' setzen
          updateStatus(action.id, 'approved');
          
          // Benachrichtigung hinzufügen
          addNotification({
            id: `action-${action.id}`,
            type: 'success',
            title: '✅ Handlung genehmigt!',
            message: `Deine Handlung "${action.actionName || action.category}" wurde geprüft und genehmigt. +${action.points} Punkte!`,
            time: 'Gerade eben',
            read: false
          });
          setProcessedActions(prev => [...prev, action.id]);
        }, timeRemaining);

        timers.push(timer);
      } else if (!processedActions.includes(action.id)) {
        // Falls Zeit schon vorbei ist, sofort genehmigen
        updateStatus(action.id, 'approved');
        
        addNotification({
          id: `action-${action.id}`,
          type: 'success',
          title: '✅ Handlung genehmigt!',
          message: `Deine Handlung "${action.actionName || action.category}" wurde geprüft und genehmigt. +${action.points} Punkte!`,
          time: 'Vor kurzem',
          read: false
        });
        setProcessedActions(prev => [...prev, action.id]);
      }
    });

    // Cleanup: Alle Timer bei Unmount oder Änderungen löschen
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [submitted, processedActions, updateStatus]);

  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationsContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      clearNotifications
    }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsContext;
