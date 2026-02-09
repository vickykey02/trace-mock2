import { Link } from 'react-router-dom';
import { useState } from 'react';
import PageHeader from '../components/PageHeader';

const Settings = () => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleReset = () => {
    // Alle localStorage-Daten löschen
    localStorage.clear();
    // Seite neu laden um alle States zurückzusetzen
    window.location.reload();
  };

  return (
    <div>
    <div
      style={{ padding: '30px' }}>
      <PageHeader title="Einstellungen" />
      </div>
      <div
      style = {{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #131212',
        borderRadius: '8px',
        padding: '20px',}}>
        <Link to="/personalization" style={{ flex: 1, textDecoration: 'none' }}>
        <button
        style = {{
          border:  'none',
          padding: '12px 5px',//'0',
          background: 'none',
          width: '100%',
          textAlign: 'center',
          cursor: 'pointer',
          fontSize: '18px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          //width: '100%',
        }}>
          <img src="./personalization.png" alt="Personalisierung und Datenschutz" 
          style={{ width: '44px', height: '44px' }}/>
          Personalisierung & Datenschutz
        </button>
        </Link>
      </div>

      <div
      style = {{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #131212',
        borderRadius: '8px',
        padding: '20px',}}>
        <Link to="/personalization" style={{ flex: 1, textDecoration: 'none' }}>
        <button
        style = {{
          border:  'none',
          padding: '12px 5px',//'0',
          background: 'none',
          width: '100%',
          textAlign: 'center',
          cursor: 'pointer',
          fontSize: '18px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          //width: '100%',
        }}>
          <img src="./notification.png" alt="Benachrichtigungen" 
          style={{ width: '44px', height: '44px' }}/>
          Benachrichtigungen
        </button>
        </Link>
      </div>

      <div
      style = {{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #131212',
        borderRadius: '8px',
        padding: '20px',}}>
        <Link to="/help" style={{ flex: 1, textDecoration: 'none' }}>
        <button
        style = {{
          border:  'none',
          padding: '12px 5px',//'0',
          background: 'none',
          width: '100%',
          textAlign: 'center',
          cursor: 'pointer',
          fontSize: '18px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          //width: '100%',
        }}>
          <img src="./question.png" alt="Hilfe" 
          style={{ width: '44px', height: '44px' }}/>
          Hilfe
        </button>
        </Link>
      </div>

      <div
      style = {{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #131212',
        borderRadius: '8px',
        padding: '20px',}}>
        <Link to="/personalization" style={{ flex: 1, textDecoration: 'none' }}>
        <button
        style = {{
          border:  'none',
          padding: '12px 5px',//'0',
          background: 'none',
          width: '100%',
          textAlign: 'center',
          cursor: 'pointer',
          fontSize: '18px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          //width: '100%',
        }}>
          <img src="./feedback.png" alt="Feedback" 
          style={{ width: '44px', height: '44px' }}/>
          Feedback
        </button>
        </Link>
      </div>
      <div>
      <h3 style={{textAlign: 'center', marginTop: '50px', color: '#999'}}>Version 0.9.0</h3>
      </div>
    </div>
  );
};

export default Settings;
