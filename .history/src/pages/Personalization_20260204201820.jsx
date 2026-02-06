//noch weitere Untermenüs überlegen
import { useState } from 'react';

const Personalization = () => {
  const [rankingDisabled, setRankingDisabled] = useState(() => {
    const saved = localStorage.getItem('rankingDisabled');
    return saved ? JSON.parse(saved) : false;
  });
  const [algorithmDisabled, setAlgorithmDisabled] = useState(() => {
    const saved = localStorage.getItem('algorithmDisabled');
    return saved ? JSON.parse(saved) : false;
  });

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
        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
          <h3 style={{ margin: 0, color: 'white' }}>Rangliste deaktivieren</h3>
		  <p>Falls du dich nicht gern mit anderen misst kannst du hier die Rangliste deaktivieren.</p>
          <input 
            type="checkbox" 
            checked={rankingDisabled}
            onChange={(e) => {
              setRankingDisabled(e.target.checked);
              localStorage.setItem('rankingDisabled', JSON.stringify(e.target.checked));
            }}
            style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: '#128b09' }}
          />
        </label>
      </div>

	  <div
      style = {{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #131212',
        borderRadius: '8px',
        padding: '20px',}}>
        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
          <h3 style={{ margin: 0, color: 'white' }}>Personalisierte Handlungsempfehlungen erhalten</h3>
		  <input 
            type="checkbox" 
            checked={algorithmDisabled}
            onChange={(e) => {
              setAlgorithmDisabled(e.target.checked);
              localStorage.setItem('algorithmDisabled', JSON.stringify(e.target.checked));
            }}
            style={{ width: '30px', height: '30px', cursor: 'pointer', accentColor: '#128b09' }}
          />
        </label>
		<p>Wenn du diese Option aktivierst, sammeln und analysieren wir deine Nutzungsdaten, um dir Handlungen, die für dich potenziell interessant sein könnten häufiger und prominenter anzuzeigen.</p>
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
