import { useParams } from 'react-router-dom';
import LocationMap from '../components/LocationMap';
import AddButton from '../components/AddButton';
import { useActions } from '../context/ActionsContext';

const ActionDetail = () => {
  const { id } = useParams();
  const { actions } = useActions();
  
  const action = actions.find(a => a.id === parseInt(id));

  if (!action) {
    return <div style={{ padding: '20px' }}>Handlung nicht gefunden</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', paddingBottom: '100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, marginTop: '-25px', marginLeft: '50px' }}>{action.title}</h2>
        <AddButton actionId={action.id} style={{ fontSize: '50px' }} />
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
        <h3>So funktioniert's</h3>
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
        <p><strong>Punkte:</strong> {action.pointsDescription}</p>
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
    </div>
  );
};

export default ActionDetail;
