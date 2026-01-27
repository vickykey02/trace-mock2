//bessere Einbindung mit Vorschlägen/Vorschau von Explore
//Einstellungen, Benachrichtigungen, Freunde, Favoriten als 4er Kachel
//  und evtl. Rangliste sollten auch hier hin
//Gamification-Elemente und Feedback müssen auch noch rein
//Ideen sammeln für Impact-Anzeige --> z.B. Schlossteich wird zu Oase oder Nischl wird grün 
//oder andere Symbole für Nachhaltigkeit bezogen auf CHemnitz die sich mit Fortschritt verändern
//rechts dann Fragezeigen oder Glühbirne im Kreis die zur aufgeschlüsselten Impact-Seite führt
//bzw. erklärt wie der Impact berechnet wird und was passiert 
//Premiumidee: Esse als Impact-Rückmelder (bekommt ihre Farben) --> wenn voll kommt Nischl dazu
// --> Schrittweise alle Wahrzeichen der Stadt --> eigentlich müsste dahinter ein Algorithmus sein
//der berechnet wie viel Impact das jetzt wirklich hat --> nochmal überlegen ob umsetzbar und wie
// initial auf 1% Färbung pro 10 Punkte 
//FRage: ist das genug Nachhaltigkeitsbezug? 

import { Link } from 'react-router-dom';
import { useActions } from '../context/ActionsContext';
import { useKnowledge } from '../context/KnowledgeContext';
import Esse from '../components/Esse';
import {usePoints} from '../context/PointsContext';

const Home = () => {
  const { actions: allActions } = useActions();
  const { knowledge } = useKnowledge();
  const {points, addPoints} = usePoints();

  const handleAction = () => {
    addPoints(10, 'Testaktion');
  };

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
              <div style={{ fontSize: '11px', opacity: 0.9, letterSpacing: '0.5px' }}>{faktDesTages.short}</div>
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
            //backgroundColor: '#f8f9fa',
            borderRadius: '10px',
            padding: '12px 15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            //border: '1px solid #e0e0e0',
            height: '100%',
            boxSizing: 'border-box'
          }}>
            {/*<span style={{ fontSize: '24px' }}>❤️</span>*/}
            <img src="/favorite.png" alt="Favoriten" style={{ width: '44px', height: '44px' }} />
          </div>
        </Link>
      </div>
      {/* Esse als Impact-Anzeige */}
      <div style={{ 
        background: "url('/chemnitz.webp')",
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundTransparency: '0.1',
        marginTop: '30px',
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '20px',
        padding: '15px',
        //backgroundColor: '#f8f9fa',
        borderRadius: '10px',
       // border: '1px solid #e0e0e0'
      }}>
        <Esse width={50} height={160} />

        {/* Impact Button */}
        <Link to="/impact" style={{ textDecoration: 'none', width: '24px', display: 'block' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
            height: '100%',
          }}>
            <img src="/information.png" alt="Impact" style={{ width: '24px', height: '24px' }} />
          </div>
        </Link>
      </div>
      <button
        onClick={handleAction}
        style={{
          backgroundColor: '#128b09',
          color: '#fff',
          padding: '10px 15px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '14px',
          width: '100%'
        }}
        >
          +10 Punkte
      </button>
    </div>
  );
};

export default Home;