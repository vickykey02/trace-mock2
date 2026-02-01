//Benachrichtigungen: statische + dynamische nach Handlungseinreichung

import { useState, useEffect } from 'react';
import { useSubmittedActions } from '../context/SubmittedActionsContext';

const Notifications = () => {
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

  const [notifications, setNotifications] = useState(initialNotifications);
  const [processedActions, setProcessedActions] = useState(() => {
    const saved = localStorage.getItem('processedNotificationActions');
    return saved ? JSON.parse(saved) : [];
  });

  const { submitted, updateStatus } = useSubmittedActions();

  // Speichere verarbeitete Actions in LocalStorage
  useEffect(() => {
    localStorage.setItem('processedNotificationActions', JSON.stringify(processedActions));
  }, [processedActions]);

  // Prüfe auf neue eingereichte Handlungen und setze Timer für Benachrichtigung
  useEffect(() => {
    const pendingActions = submitted.filter(
      action => action.status === 'pending' && !processedActions.includes(action.id)
    );

    pendingActions.forEach(action => {
      const submittedTime = new Date(action.submittedAt).getTime();
      const now = Date.now();
      const threeMinutes = 3 * 60 * 1000; // 3 Minuten in Millisekunden
      const timeElapsed = now - submittedTime;
      const timeRemaining = threeMinutes - timeElapsed;

      if (timeRemaining > 0) {
        // Timer setzen für verbleibende Zeit
        const timer = setTimeout(() => {
          // Status auf 'approved' setzen
          updateStatus(action.id, 'approved');
          
          // Benachrichtigung hinzufügen
          const newNotification = {
            id: `action-${action.id}`,
            type: 'success',
            title: '✅ Handlung genehmigt!',
            message: `Deine Handlung "${action.actionName || action.category}" wurde geprüft und genehmigt. +${action.points} Punkte!`,
            time: 'Gerade eben',
            read: false
          };
          setNotifications(prev => [newNotification, ...prev]);
          setProcessedActions(prev => [...prev, action.id]);
        }, timeRemaining);

        return () => clearTimeout(timer);
      } else if (timeElapsed >= threeMinutes && !processedActions.includes(action.id)) {
        // Falls 3 Minuten schon vorbei sind, sofort genehmigen
        updateStatus(action.id, 'approved');
        
        const newNotification = {
          id: `action-${action.id}`,
          type: 'success',
          title: '✅ Handlung genehmigt!',
          message: `Deine Handlung "${action.actionName || action.category}" wurde geprüft und genehmigt. +${action.points} Punkte!`,
          time: 'Vor kurzem',
          read: false
        };
        setNotifications(prev => [newNotification, ...prev]);
        setProcessedActions(prev => [...prev, action.id]);
      }
    });
  }, [submitted, processedActions, updateStatus]);

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const getTypeStyles = (type) => {
    switch (type) {
      case 'success':
        return { bg: '#d4edda', border: '#28a745', icon: '✅' };
      case 'info':
        return { bg: '#d1ecf1', border: '#17a2b8', icon: 'ℹ️' };
      case 'social':
        return { bg: '#e8f5e8', border: '#128b09', icon: '👤' };
      case 'achievement':
        return { bg: '#fff3cd', border: '#ffc107', icon: '🏆' };
      default:
        return { bg: '#f8f9fa', border: '#6c757d', icon: '📢' };
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div style={{ padding: '20px', paddingBottom: '100px' }}>
      <h1 style={{ textAlign: 'center', marginTop: 0 }}>Benachrichtigungen</h1>
      
      {unreadCount > 0 && (
        <p style={{ textAlign: 'center', color: '#128b09', fontWeight: 'bold' }}>
          {unreadCount} neue Benachrichtigung{unreadCount > 1 ? 'en' : ''}
        </p>
      )}

      {notifications.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
          <p>Keine Benachrichtigungen</p>
        </div>
      ) : (
        notifications.map(notification => {
          const styles = getTypeStyles(notification.type);
          return (
            <div
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              style={{
                backgroundColor: styles.bg,
                border: `2px solid ${styles.border}`,
                borderRadius: '10px',
                padding: '15px',
                marginBottom: '10px',
                cursor: 'pointer',
                opacity: notification.read ? 0.7 : 1,
                position: 'relative'
              }}
            >
              {!notification.read && (
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  width: '10px',
                  height: '10px',
                  backgroundColor: '#dc3545',
                  borderRadius: '50%'
                }} />
              )}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '24px' }}>{styles.icon}</span>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>{notification.title}</h3>
                  <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '14px' }}>{notification.message}</p>
                  <span style={{ color: '#999', fontSize: '12px' }}>{notification.time}</span>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Notifications;