//Komponenten auf neue Tipps anpassen

import { useParams } from 'react-router-dom';
import RememberButton from '../components/RememberButton';
import { useTipps } from '../context/TippsContext';
import { useFriends } from '../context/FriendsContext';


// Hilfsfunktion: Text mit **fett** und - Aufzählungen parsen
const parseFormattedText = (text) => {
  if (!text) return null;
  
  // Erst nach Zeilenumbrüchen splitten
  const lines = text.split('\n');
  const result = [];
  let currentList = [];
  
  const parseBold = (str) => {
    return str.split(/(\*\*.*?\*\*)/).map((part, i) => 
      part.startsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part
    );
  };
  
  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('- ')) {
      // Listenelement
      currentList.push(
        <li key={`li-${index}`}>{parseBold(trimmedLine.slice(2))}</li>
      );
    } else {
      // Wenn wir eine Liste hatten, diese erst abschließen
      if (currentList.length > 0) {
        result.push(<ul key={`ul-${index}`} style={{ margin: '10px 0', paddingLeft: '20px' }}>{currentList}</ul>);
        currentList = [];
      }
      // Normaler Text
      if (trimmedLine) {
        result.push(<span key={`p-${index}`}>{parseBold(trimmedLine)} </span>);
      }
    }
  });
  
  // Falls noch eine Liste offen ist
  if (currentList.length > 0) {
    result.push(<ul key="ul-final" style={{ margin: '10px 0', paddingLeft: '20px' }}>{currentList}</ul>);
  }
  
  return result;
};

const TippDetail = () => {
  const { id } = useParams();
  const { tipps, friendTipps } = useTipps();
  const { friends } = useFriends();
  
  const tipp = tipps.find(t => t.id === parseInt(id)) || friendTipps.find(t => t.id === id);
  
  // Finde den Freund anhand der author-ID des Tipps
  const friend = tipp?.author ? friends.find(f => f.title === tipp.author) : null;
  
  if (!tipp) {
    return <div style={{ padding: '20px' }}>Tipp nicht gefunden</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', paddingBottom: '100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0, marginTop: '35px' }}>{tipp.title}</h1>
        <RememberButton tippId={tipp.id} />
      </div>

      {/* Kategorie Badge */}
      <span
        style={{
          display: 'inline-block',
          backgroundColor: '#e8f5e8',
          color: '#128b09ff',
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: 'bold',
          marginBottom: '20px',
        }}
      >
        {tipp.category}
      </span>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <img src ={tipp.images} alt={tipp.title} style={{ width: '100%', height: '200px', borderRadius: '8px', objectFit: 'cover' }} />
      </div>

      {/* Beschreibung */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Darum geht's:</h2>
        <p>{tipp.shortDescription}</p>
      </div>

      {/* Informationen */}
      <div style={{
        backgroundColor: '#4abc96',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
      }}>
        <p><strong>Anleitung:</strong></p>
        {parseFormattedText(tipp.description)}
      </div>

      {/* Autor */}
      {tipp.author && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 12,
          padding: '6px 12px',
          background: '#e3f2fd',
          borderRadius: 8
        }}>
          <span style={{ color: '#1976D2', fontSize: 12 }}>Autor:</span>
          <img
            {...friend.picture ? (
          <img 
            src={friend.picture} 
            alt={tipp.author} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentNode.innerHTML = `<span style="color: white; font-weight: bold; font-size: 18px">${user.title?.charAt(0) || '?'}</span>`;
            }}
          />
        ) : (
          <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>
            {user.title?.charAt(0) || '?'}
          </span>
        )}
            alt={tipp.author}
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />
          <span style={{ fontWeight: 'bold', color: '#1976D2', fontSize: 13 }}>
            {tipp.author.title}
          </span>
        </div>
      )}

    </div>
  );
};

export default TippDetail;
