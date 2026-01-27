import { useParams } from 'react-router-dom';
import LocationMap from '../components/LocationMap';
import AddButton from '../components/AddButton';
import { useActions } from '../context/ActionsContext';

const ActionDetail = () => {
  const { id } = useParams();
  const { actions } = useActions();
  
  const action = actions.find(a => a.id === parseInt(id));
      id: 7,
      title: 'LED-Lampen',
      description: 'Wechsle zu LED-Lampen und spare bis zu 75% Energie',
      category: 'Energie',
      fullContent: 'LED-Lampen verbrauchen deutlich weniger Strom als Glühlampen und halten länger. Ein einfacher Wechsel mit großer Wirkung.',
      impact: 'Spart 75% Stromverbrauch und 15€ pro Lampe pro Jahr',
      difficulty: 'Sehr leicht',
      timeEstimate: '10 Minuten',
      tips: ['Ersetze alte Glühlampen schrittweise', 'Wähle die richtige Farbtemperatur', 'Spare Geld durch Mengenrabatte']
    },
    8: {
      id: 8,
      title: 'Lokale Produkte',
      description: 'Kaufe Produkte von lokalen Bauern und Herstellern',
      category: 'Ernährung',
      fullContent: 'Lokale Produkte haben kürzere Transportwege und unterstützen die lokale Wirtschaft. Sie sind oft frischer und geschmackvoller.',
      impact: 'Reduziert Transportemissionen um bis zu 80%',
      difficulty: 'Leicht',
      timeEstimate: '1-2 Stunden Einkaufen',
      tips: ['Besuche Bauernmärkte', 'Unterstütze lokale Läden', 'Bekenne dich zur Saisonalität']
    }*/
  };

  const action = actionsData[id];

  if (!action) {
    return <div style={{ padding: '20px' }}>Handlung nicht gefunden</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', paddingBottom: '100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>{action.title}</h1>
        <AddButton actionId={action.id} />
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
        {action.category}
      </span>

      {/* Beschreibung */}
      <div style={{ marginBottom: '20px' }}>
        <h2>So funktioniert's</h2>
        <p>{action.description}</p>
      </div>

      {/* Informationen */}
      <div style={{
        backgroundColor: '#4abc96',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
      }}>
        <p><strong>Schwierigkeit:</strong> {action.difficulty}</p>
        <p><strong>Punkte:</strong> {action.points}</p>
		<p><strong>Hintergrund:</strong> {action.information}</p>
        <p><strong>Umweltauswirkung:</strong> {action.impact}</p>
      </div>

      {/* Tipps */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Tipps zum Umsetzen:</h3>
        <ul>
          {action.tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>

      {/* LocationMap falls verfügbar */}
      {action.showMap && (
        <div style={{ marginBottom: '20px' }}>
          <LocationMap actionCategory={action.category} />
        </div>
      )}

      {/* Hinzufügen Button 
      <button
        onClick={() => setIsAdded(!isAdded)}
        style={{
          width: '100%',
          padding: '15px',
          backgroundColor: isAdded ? '#999' : '#128b09ff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          marginTop: '20px',
        }}
      >
        {isAdded ? '✓ Hinzugefügt' : 'Handlung hinzufügen'}
		hier muss noch die Logik rein, die die Handlung in das Nutzerprofil hinzufügt
      </button>*/}
    </div>
  );
};

export default ActionDetail;
