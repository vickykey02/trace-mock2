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
        height: '50px',
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

      {/* Reset Button für Nutzertests */}
      <div style={{ padding: '20px', marginTop: '20px' }}>
        <button
          onClick={() => setShowResetConfirm(true)}
          style={{
            width: '100%',
            padding: '15px',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          🔄 App zurücksetzen (für Nutzertests)
        </button>
        <p style={{ color: '#999', fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>
          Löscht alle gespeicherten Daten und startet die App neu
        </p>
      </div>

      {/* Bestätigungs-Popup */}
      {showResetConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '12px',
            maxWidth: '300px',
            textAlign: 'center',
          }}>
            <h3 style={{ marginTop: 0 }}>App zurücksetzen?</h3>
            <p style={{ color: '#666', fontSize: '14px' }}>
              Alle Punkte, Handlungen, Ziele und Einstellungen werden gelöscht.
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button
                onClick={() => setShowResetConfirm(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#e0e0e0',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Abbrechen
              </button>
              <button
                onClick={handleReset}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Zurücksetzen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
