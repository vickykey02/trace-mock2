import { useParams } from 'react-router-dom';
import LocationMap from '../components/LocationMap';
import AddButton from '../components/LikeButton';
import { useKnowledge } from '../context/KnowledgeContext';

const KnowledgeDetail = () => {
  const { id } = useParams();
  const { knowledge } = useKnowledge();
  
  const knowledgeBite = knowledge.find(a => a.id === parseInt(id));

  if (!knowledgeBite) {
    return <div style={{ padding: '20px' }}>Wissenshappen nicht gefunden</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', paddingBottom: '100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0, marginTop: '35px' }}>{knowledgeBite.title}</h1>
        <AddButton knowledgeId={knowledgeBite.id} />
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
        {knowledgeBite.category}
      </span>

      {/* Beschreibung */}
      <div style={{ marginBottom: '20px' }}>
        <h2>So funktioniert's</h2>
        <p>{knowledgeBite.description}</p>
      </div>

      {/* Informationen */}
      <div style={{
        backgroundColor: '#4abc96',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
      }}>
        <p><strong>Schwierigkeit:</strong> {knowledgeBite.difficulty}</p>
        <p><strong>Punkte:</strong> {knowledgeBite.points}</p>
        <p><strong>Hintergrund:</strong> {knowledgeBite.information}</p>
        <p><strong>Umweltauswirkung:</strong> {knowledgeBite.impact}</p>
      </div>

      {/* Tipps */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Tipps zum Umsetzen:</h3>
        <ul>
          {knowledgeBite.tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>

      {/* LocationMap falls verfügbar */}
      {knowledgeBite.showMap && (
        <div style={{ marginBottom: '20px' }}>
          <LocationMap knowledgeCategory={knowledgeBite.category} />
        </div>
      )}
    </div>
  );
};

export default KnowledgeDetail;
