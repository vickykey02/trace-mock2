import { useNotifications } from '../context/NotificationsContext';

const Notifications = () => {
  const { notifications, unreadCount, markAsRead } = useNotifications();

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

  return (
    <div style={{ padding: '20px', paddingBottom: '100px' }}>
      <h2 style={{ textAlign: 'center', marginTop: '3px', marginLeft: '10px' }}>Benachrichtigungen</h2>
      
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