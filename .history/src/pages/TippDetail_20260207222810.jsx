//Komponenten auf neue Tipps anpassen

import { useParams } from 'react-router-dom';
import LocationMap from '../components/LocationMap';
import RememberButton from '../components/RememberButton';
import { useTipps } from '../context/TippsContext';

const TippDetail = () => {
  const { id } = useParams();
  const { tipps, friendTipps } = useTipps();
  
  const tipp = tipps.find(t => t.id === parseInt(id)) || friendTipps.find(t => t.id === id);
  if (!tipp) {
    return <div style={{ padding: '20px' }}>Tipp nicht gefunden</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', paddingBottom: '100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0, marginTop: '35px' }}>{tipp.title}</h1>
        <img src ={tipp.images} alt={tipp.title} style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }} />
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
        <p><strong>Anleitung:</strong> {tipp.description}</p>
      </div>
    </div>
  );
};

export default TippDetail;
