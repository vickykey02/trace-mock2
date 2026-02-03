//noch Unterseiten erstellen und verlinken (sporadisch) --> wenn Aufgaben stehen
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
          //boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          border: 'none',
          //borderRadius: '8px',
          padding: '20px',
          background: 'none',
          width: '100%',
          textAlign: 'left',
          cursor: 'pointer',
        }}>
          <h1>Personalisierung</h1>
        </button>
        </Link>
      </div>
      <div
      style = {{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #131212',
        borderRadius: '8px',
        padding: '20px',}}>
        <h1>Datenschutz</h1>
        <p>Hier verschiedene Unterseiten verlinken.</p>
      </div>
      <div
      style = {{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #131212',
        borderRadius: '8px',
        padding: '20px',}}>
        <h1>Benachrichtigungen</h1>
        <p>Hier verschiedene Unterseiten verlinken.</p>
      </div>
      <div
      style = {{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #131212',
        borderRadius: '8px',
        padding: '20px',}}>
        <h1>Hilfe</h1>
        <p>Hier verschiedene Unterseiten verlinken.</p>
      </div>
      <div
      style = {{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #131212',
        borderRadius: '8px',
        padding: '20px',}}>
        <h1>Feedback</h1>
        <p>Hier verschiedene Unterseiten verlinken.</p>
      </div>
      <div>
      <h3 style={{textAlign: 'center', marginTop: '50px', color: '#999'}}>Version 0.9.0</h3>
      </div>
    </div>
  );
};

export default Settings;
