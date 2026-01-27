//oben jeweils Fakt des Tages anzeigen und Weiterleitung zu Knowledge Base2 bei Klick
//bessere Einbindung mit Vorschlägen/Vorschau von Explore
//Einstellungen, Benachrichtigungen, Freunde und evtl. Rangliste sollten auch hier hin
//Gamification-Elemente und Feedback müssen auch noch rein

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useActions } from '../context/ActionsContext';
import ActionCard from '../components/ActionCard';

const Home = () => {
  const navigate = useNavigate();
  const { actions: allActions } = useActions();
  const [searchTerm, setSearchTerm] = useState('');

  // Zeige nur die ersten 2 Handlungen als Vorschau
  const previewActions = allActions.slice(0, 2);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Navigiere zu Explore mit dem Suchbegriff
    navigate(`/Explore?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', paddingBottom: '100px' }}>
      <h1>Home</h1>
      <p>Hier muss auch das Feedback und die narrative Gamification mit hin</p>

      {/* Explore Vorschau */}
      <div style={{
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        padding: '20px',
        marginTop: '20px',
        marginBottom: '20px'
      }}>
        <h2 style={{ margin: '0 0 15px 0', fontSize: '18px' }}>🔍 Handlungen entdecken</h2>
        
        {/* Mini Suchleiste */}
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Suche nach Handlungen..."
            value={searchTerm}
            onChange={handleSearch}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxSizing: 'border-box',
              marginBottom: '15px'
            }}
          />
        </form>

        {/* Vorschau von 2 Handlungen */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {previewActions.map(action => (
            <ActionCard key={action.id} action={action} />
          ))}
        </div>

        {/* Link zu Explore */}
        <Link to="/Explore" style={{ textDecoration: 'none' }}>
          <button
            style={{
              width: '100%',
              backgroundColor: '#128b09',
              color: '#fff',
              padding: '12px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              marginTop: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            Alle Handlungen anzeigen →
          </button>
        </Link>
      </div>

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