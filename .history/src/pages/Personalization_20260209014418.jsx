import { useState } from 'react';
import PageHeader from '../components/PageHeader';

const Personalization = () => {
  const [rankingDisabled, setRankingDisabled] = useState(() => {
    const saved = localStorage.getItem('rankingDisabled');
    return saved ? JSON.parse(saved) : false;
  });
  const [algorithmDisabled, setAlgorithmDisabled] = useState(() => {
    const saved = localStorage.getItem('algorithmDisabled');
    return saved ? JSON.parse(saved) : false;
  });
  const [locationDisabled, setLocationDisabled] = useState(() => {
	const saved = localStorage.getItem('locationDisabled');
	return saved ? JSON.parse(saved) : false;
  });

  return (
    <div>
    <PageHeader title="Personalisierung und Datenschutz" />
      <div
      style={{ padding: '30px' }}>
      </div>
      <div
      style = {{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #131212',
        borderRadius: '8px',
        padding: '20px',}}>
        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
          <h3 style={{ margin: 0 }}>Rangliste deaktivieren</h3>
          <input 
            type="checkbox" 
            checked={rankingDisabled}
            onChange={(e) => {
              setRankingDisabled(e.target.checked);
              localStorage.setItem('rankingDisabled', JSON.stringify(e.target.checked));
            }}
            style={{ width: '30px', height: '30px', cursor: 'pointer', accentColor: '#128b09' }}
          />
        </label>
		<p>Falls du dich nicht gern mit anderen misst kannst du hier die Rangliste deaktivieren.</p>
      </div>

	  <div
      style = {{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #131212',
        borderRadius: '8px',
        padding: '20px',}}>
        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
          <h3 style={{ margin: 0 }}>Personalisierte<br />Empfehlungen erhalten</h3>
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
        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
          <h3 style={{ margin: 0 }}>Standortnutzung<br />erlauben</h3>
		  <input 
            type="checkbox" 
            checked={locationDisabled}
            onChange={(e) => {
              setLocationDisabled(e.target.checked);
              localStorage.setItem('locationDisabled', JSON.stringify(e.target.checked));
            }}
            style={{ width: '30px', height: '30px', cursor: 'pointer', accentColor: '#128b09' }}
          />
        </label>
		<p>Wenn du diese Option aktivierst, erlaubst du der App, deinen Standort zu verwenden, um dir standortbasierte Empfehlungen und Informationen bereitzustellen.</p>
      </div>
      <div>
      <h3 style={{textAlign: 'center', marginTop: '50px'}}>Version 0.9.0</h3>
      </div>
    </div>
  );
};

export default Personalization;
