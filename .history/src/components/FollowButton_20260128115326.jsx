import { useFollow } from '../context/FollowContext';

const FollowButton = ({ friendId }) => {
  const { toggleFollow, isFollowed } = useFollow();
  const isFollowedStatus = isFollowed(friendId);
  const handleToggle = () => {
	toggleFollow(friendId);
  };

  return (
	<button
	  onClick={handleToggle}
	  style={{
		backgroundColor: isFollowedStatus ? '#ffc107' : '#f0f0f0',
		color: isFollowedStatus ? '#fff' : '#333',
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
	  title={isFollowedStatus ? 'Nicht mehr folgen' : 'Folgen'}
	>
	  <span style={{ fontSize: '16px' }}>
		{isFollowedStatus ? '★' : '☆'}
	  </span>
	  {isFollowedStatus ? 'Gefolgt' : 'Folgen'}
	</button>
  );
};

export default FollowButton;