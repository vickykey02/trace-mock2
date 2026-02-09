import { useLikes } from '../context/LikesContext';

const LikeButton = ({ knowledgeId }) => {
  const { toggleLikes, isLiked } = useLikes();
  const isLike = isLiked(knowledgeId);

  const handleToggle = () => {
	toggleLikes(knowledgeId);
  };

  return (
	<button
	  onClick={handleToggle}
	  style={{
		//backgroundColor: isLike ? '#ff6b6b' : '#f0f0f0',
		color: isLike ? '#fff' : '#333',
		padding: '10px 15px',
		border: 'none',
		borderRadius: '5px',
		cursor: 'pointer',
		fontSize: '14px',
		fontWeight: 'bold',
		display: 'flex',
		alignItems: 'center',
		gap: '8px',
		transition: 'background-color 0.2s'
	  }}
	  title={isLiked ? 'Gefällt mir nicht mehr' : 'Gefällt mir'}
	>
	  <span style={{ fontSize: '16px' }}>
		{isLike ? '💚' : '🤍'}
	  </span>
	</button>
  );
};

export default LikeButton;