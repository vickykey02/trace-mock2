import { useFollow } from '../context/FollowContext';

const FollowButton = ({ friendId, compact = false }) => {
  const { toggleFollow, isFollowed } = useFollow();
  const isFollowedStatus = isFollowed(friendId);
  const handleToggle = () => {
	toggleFollow(friendId);
  };

  // Kompakte Version (nur Plus/Check)
  if (compact) {
    return (
      <button
        onClick={handleToggle}
        style={{
          backgroundColor: isFollowedStatus ? '#128b09ff' : '#f0f0f0',
          color: isFollowedStatus ? '#fff' : '#128b09ff',
          width: '22px',
          height: '22px',
          padding: 0,
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-color 0.2s'
        }}
        title={isFollowedStatus ? 'Nicht mehr folgen' : 'Folgen'}
      >
        {isFollowedStatus ? '✓' : '+'}
      </button>
    );
  }

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