import { useState } from 'react';

const Personalization = () => {
  const [rankingDisabled, setRankingDisabled] = useState(false);

  return (
    <div>
    <div
      style={{ padding: '30px' }}>
      <h1>Personalisierung</h1>
      </div>
      <div
      style = {{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #131212',
        borderRadius: '8px',
        padding: '20px',}}>
        <h3>Rangliste deaktivieren</h3>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            checked={rankingDisabled}
            onChange={(e) => setRankingDisabled(e.target.checked)}
            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
          />
        </label>
      </div>
      <div
      style = {{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #131212',
        borderRadius: '8px',
        padding: '20px',}}>
        <h1>Empfehlungen erhalten</h1>
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

export default Personalization;
