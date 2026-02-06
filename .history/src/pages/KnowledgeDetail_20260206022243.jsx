//anpassen auf die Kategorien die für Wissen notwendig sind
//Verlinkung relatedAction zu Aktionen möglich machen (evtl. als Button, damit es direkt auffällt)

import { useParams } from 'react-router-dom';
import LocationMap from '../components/LocationMap';
import LikeButton from '../components/LikeButton';
import { useKnowledge } from '../context/KnowledgeContext';

const KnowledgeDetail = () => {
  const { id } = useParams();
  const { knowledge: allKnowledge } = useKnowledge();
  
  const knowledgeBite = allKnowledge.find(a => a.id === parseInt(id));

  if (!knowledgeBite) {
    return <div style={{ padding: '20px' }}>Wissenshappen nicht gefunden</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', paddingBottom: '100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0, marginTop: '35px' }}>{knowledgeBite.title}</h1>
        <LikeButton knowledgeId={knowledgeBite.id} />
      </div>

      {/* Informationen */}
      <div style={{
        backgroundColor: '#4abc96',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
      }}>
        <p><strong>Wusstest du schon...?</strong> {knowledgeBite.description}</p>
        <p><strong>Wende dein neu erlerntes Wissen aktiv an:</strong> {knowledgeBite.relatedAction}</p>
      </div>
    </div>
  );
};

export default KnowledgeDetail;
