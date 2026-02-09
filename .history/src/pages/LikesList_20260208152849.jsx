import { useLikes } from '../context/LikesContext';
import { useKnowledge } from '../context/KnowledgeContext';
import KnowledgeBite from '../components/KnowledgeBite';

const LikesList = () => {
  const { likes } = useLikes();
  const { knowledge: allKnowledge } = useKnowledge();

  // Debug
  console.log('LikesList - Likes:', likes);
  console.log('LikesList - Knowledge:', allKnowledge);
  // Filter: Nur die geliketen Wissenshappen anzeigen
  const likedKnowledge = allKnowledge.filter(knowledge => likes.includes(knowledge.id));

  console.log('LikesList - Gefilterte Favoriten:', likedKnowledge);

  if (likedKnowledge.length === 0) {
    return (
      <div style={{ padding: '30px', paddingBottom: '100px' }}>
        <h1>Favoriten</h1>
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          color: '#999'
        }}>
          <p>Du hast noch keine Inhalte geliked. Klicke auf den 🤍 Button, um einen Wissenshappen zu liken!</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', paddingBottom: '100px' }}>
      <h1>Favoriten</h1>
      <p style={{ color: '#666', marginBottom: '15px' }}>
        {likedKnowledge.length} Favorit(e) gefunden
      </p>

      {/* Favoriten Liste */}
      <div>
        {likedKnowledge.map(knowledge => (
          <KnowledgeBite key={knowledge.id} knowledge={knowledge} />
        ))}
      </div>
    </div>
  );
};

export default LikesList;
