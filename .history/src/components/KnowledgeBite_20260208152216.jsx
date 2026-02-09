import { useNavigate } from 'react-router-dom';
import LikeButton from './LikeButton';

const KnowledgeBite = ({ knowledge }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/knowledge/${knowledge.id}`, { state: { knowledge } });
  };

  return (
    <div
      onClick={handleClick}
      style={{
        backgroundColor: '#fff',
        padding: '15px',
        marginBottom: '15px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
      }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{
        position: 'absolute',
        top: 0,
        right: 10,
      }}>
        <LikeButton knowledgeId={knowledge.id} />
      </div>
      <h3 style={{ margin: '0 0 8px 0', color: '#128b09ff' }}>{knowledge.title}</h3>
      <p style={{ margin: '0 0 8px 0', color: '#666' }}>{knowledge.description}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
		<div onClick={(e) => e.stopPropagation()}>
        	<LikeButton knowledgeId={knowledge.id} />
		</div>
      </div>
    </div>
  );
};

export default KnowledgeBite;
