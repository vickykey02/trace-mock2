//bessere Einbindung mit Vorschlägen/Vorschau von Explore
//Einstellungen, Benachrichtigungen, Freunde, Favoriten als 4er Kachel
//  und evtl. Rangliste sollten auch hier hin
//Gamification-Elemente und Feedback müssen auch noch rein
//Ideen sammeln für Impact-Anzeige --> z.B. Schlossteich wird zu Oase oder Nischl wird grün 
//oder andere Symbole für Nachhaltigkeit bezogen auf CHemnitz die sich mit Fortschritt verändern
//rechts dann Fragezeigen oder Glühbirne im Kreis die zur aufgeschlüsselten Impact-Seite führt
//bzw. erklärt wie der Impact berechnet wird und was passiert 

import { Link } from 'react-router-dom';
import { useActions } from '../context/ActionsContext';
import { useKnowledge } from '../context/KnowledgeContext';

const Home = () => {
  const { actions: allActions } = useActions();
  const { knowledge } = useKnowledge();

  // Fakt des Tages basierend auf dem aktuellen Datum
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const faktDesTages = knowledge[dayOfYear % knowledge.length];

  return (
    <div style={{ padding: '20px', margin: '0 auto', paddingBottom: '100px' }}>
      <h1>Home</h1>

      {/* Fakt des Tages */}
      <Link to="/knowledge-base2" style={{ textDecoration: 'none'}}> {/*{`/knowledge/${faktDesTages.id}`} style={{ textDecoration: 'none' }}>*/}
        <div style={{
          background: 'linear-gradient(135deg, #128b09 0%, #1db954 100%)',
          borderRadius: '10px',
          padding: '12px 15px',
          marginBottom: '15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          color: '#fff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
            <span style={{ fontSize: '20px' }}>💡</span>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '11px', opacity: 0.9, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Fakt des Tages</div>
              <div style={{ fontWeight: 'bold', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{faktDesTages.title}</div>
            </div>
          </div>
          <span style={{ fontSize: '18px', marginLeft: '10px' }}>→</span>
        </div>
      </Link>

      {/* Explore & Favoriten nebeneinander */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '15px', width: '100%' }}>
        {/* Explore Vorschau - kompakt */}
        <Link to="/Explore" style={{ textDecoration: 'none', width: 'calc(70% - 5px)', display: 'block' }}>
          <div style={{
            backgroundColor: '#f8f9fa',
            borderRadius: '10px',
            padding: '12px 15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            border: '1px solid #e0e0e0',
            height: '100%',
            boxSizing: 'border-box'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, overflow: 'hidden' }}>
              <span style={{ fontSize: '20px' }}>🔍</span>
              <div style={{ minWidth: 0, overflow: 'hidden' }}>
                <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}>Entdecken</div>
                <div style={{ fontSize: '12px', color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{allActions.length} Handlungen</div>
              </div>
            </div>
            <span style={{ color: '#128b09', fontSize: '18px' }}>→</span>
          </div>
        </Link>

        {/* Faves Button */}
        <Link to="/favorites" style={{ textDecoration: 'none', width: 'calc(30% - 5px)', display: 'block' }}>
          <div style={{
            backgroundColor: '#f8f9fa',
            borderRadius: '10px',
            padding: '12px 15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: '1px solid #e0e0e0',
            height: '100%',
            boxSizing: 'border-box'
          }}>
            {/*<span style={{ fontSize: '24px' }}>❤️</span>*/}
            <img src="/favorite.png" alt="Favoriten" style={{ width: '24px', height: '24px' }} />
            <span style={{ marginLeft: '10px', fontWeight: 'bold', fontSize: '14px', color: '#333' }}>Favoriten</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;