//oben jeweils Fakt des Tages anzeigen und Weiterleitung zu Knowledge Base2 bei Klick
//bessere Einbindung mit Vorschlägen/Vorschau von Explore
//Einstellungen, Benachrichtigungen, Freunde, Favoriten als 4er Kachel
//  und evtl. Rangliste sollten auch hier hin
//Gamification-Elemente und Feedback müssen auch noch rein

import { Link } from 'react-router-dom';
import { useActions } from '../context/ActionsContext';

const Home = () => {
  const { actions: allActions } = useActions();

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', paddingBottom: '100px' }}>
      <h1>Home</h1>
      <p>Hier muss auch das Feedback und die narrative Gamification mit hin</p>

      {/* Explore Vorschau - kompakt */}
      <Link to="/Explore" style={{ textDecoration: 'none' }}>
        <div style={{
          backgroundColor: '#f8f9fa',
          borderRadius: '10px',
          padding: '12px 15px',
          marginTop: '15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          border: '1px solid #e0e0e0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>🔍</span>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}>Handlungen entdecken</div>
              <div style={{ fontSize: '12px', color: '#666' }}>{allActions.length} verfügbar</div>
            </div>
          </div>
          <span style={{ color: '#128b09', fontSize: '18px' }}>→</span>
        </div>
      </Link>

	  {/* Faves Button */}
      <Link to="/favorites" style={{ textDecoration: 'none' }}>
        <button
          style={{
            backgroundColor: '#128b09ff',
            color: '#fff',
            padding: '12px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '20px'
          }}
        >
          <img src="/favorite.png" alt="Favoriten" style={{ width: '24px', height: '24px' }} />
        </button>
      </Link>
    </div>
  );
};

export default Home;