//umbauen auf Sachen die bei Details von Zielen stehen sollen
//umbauen mit Goals Context

import { useParams } from 'react-router-dom';
import LocationMap from '../components/LocationMap';
import RememberButton from '../components/RememberButton';
import { useGoals } from '../context/GoalsContext';

const GoalDetail = () => {
  const { id } = useParams();
  const { goals } = useGoals();
  
  const goal = goals.find(g => g.id === parseInt(id));
  if (!goal) {
    return <div style={{ padding: '20px' }}>Ziel nicht gefunden</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', paddingBottom: '100px' }}>
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
        {goal.category}
      </span>

      {/* Beschreibung */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Ziel</h2>
        <p>{goal.description}</p>
      </div>

      {/* Informationen */}
      <div style={{
        backgroundColor: '#4abc96',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
      }}>
        <p><strong>Schwierigkeit:</strong> {goal.difficulty}</p>
        <p><strong>Punkte:</strong> {goal.points}</p>
        <p><strong>Hintergrund:</strong> {goal.information}</p>
        <p><strong>Umweltauswirkung:</strong> {goal.impact}</p>
      </div>

      {/* Tipps */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Tipps zum Umsetzen:</h3>
        <ul>
          {goal.goals.map((goalItem, index) => (
            <li key={index}>{goalItem}</li>
          ))}
        </ul>
      </div>

      {/* LocationMap falls verfügbar */}
      {goal.showMap && (
        <div style={{ marginBottom: '20px' }}>
          <LocationMap actionCategory={goal.category} />
        </div>
      )}
    </div>
  );
};

export default GoalDetail;
