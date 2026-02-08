//besser stylen (evtl. Bilder einbauen)
import { useParams, Link } from 'react-router-dom';
import LocationMap from '../components/LocationMap';
import LikeButton from '../components/LikeButton';
import { useKnowledge } from '../context/KnowledgeContext';
import { useActions } from '../context/ActionsContext';

const KnowledgeDetail = () => {
  const { id } = useParams();
  const { knowledge: allKnowledge } = useKnowledge();
  const { actions } = useActions();
  
  const knowledgeBite = allKnowledge.find(a => a.id === parseInt(id));
  
  // Finde die zugehörige Handlung anhand des Titels
  const relatedActionObj = knowledgeBite?.relatedAction 
    ? actions.find(a => a.title.toLowerCase() === knowledgeBite.relatedAction.toLowerCase())
    : null;

  if (!knowledgeBite) {
    return <div style={{ padding: '20px' }}>Wissenshappen nicht gefunden</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', paddingBottom: '100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0, marginTop: '35px' }}>{knowledgeBite.title}</h1>
        <LikeButton knowledgeId={knowledgeBite.id} />
      </div>

      {/* Bild */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <img src ={knowledgeBite.images} alt={knowledgeBite.title} style={{ width: '100%', height: '200px', borderRadius: '8px', objectFit: 'cover' }} />
      </div>

      {/* Informationen */}
      <div style={{
        backgroundColor: '#4abc96',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
      }}>
        <p><strong>Wusstest du schon...?</strong> {knowledgeBite.description}</p>
        <p><strong>Wende dein neu erlerntes Wissen aktiv an:</strong>{' '}
          {relatedActionObj ? (
            <Link 
              to={`/action/${relatedActionObj.id}`} 
              state={{ action: relatedActionObj }}
              style={{ 
                color: '#fff', 
                fontWeight: 'bold',
                textDecoration: 'underline'
              }}
            >
              {knowledgeBite.relatedAction}
            </Link>
          ) : (
            knowledgeBite.relatedAction
          )}
        </p>
      </div>
    </div>
  );
};

export default KnowledgeDetail;
