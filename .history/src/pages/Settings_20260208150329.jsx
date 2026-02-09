//Styling noch anpassen (evtl. Bilder für Kategorien) -> Symbole und Pfeil, wie bei Insta
import { Link } from 'react-router-dom';
const Settings = () => {
  return (
    <div>
    <div
      style={{ padding: '30px' }}>
      <h1>Einstellungen</h1>
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
          fontSize: '16px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          //width: '100%',
        }}>
          <img src="/personalization.png" alt="Personalisierung und Datenschutz" 
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
        padding: '20px',
        textAlign: 'center'}}>
        <h2>Benachrichtigungen</h2>
      </div>
      <div
      style = {{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #131212',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center'}}>
        <h2>Hilfe</h2>
      </div>
      <div
      style = {{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #131212',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center'}}>
        <h2>Feedback</h2>
      </div>
      <div>
      <h3 style={{textAlign: 'center', marginTop: '50px', color: '#999'}}>Version 0.9.0</h3>
      </div>
    </div>
  );
};

export default Settings;
