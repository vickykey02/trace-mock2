import { useRemember } from '../context/RememberContext';

const FollowButton = ({ friendId }) => {
  const { toggleRemember, isRemembered } = useRemember();
  const isRem = isRemembered(friendId);

  const handleToggle = () => {
	toggleRemember(friendId);
  };

  return (
	<button
	  onClick={handleToggle}
	  style={{
		backgroundColor: isRem ? '#ffc107' : '#f0f0f0',
		color: isRem ? '#fff' : '#333',
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
	  title={isRem ? 'Nicht mehr merken' : 'Merken'}
	>
	  <span style={{ fontSize: '16px' }}>
		{isRem ? '★' : '☆'}
	  </span>
	  {isRem ? 'gemerkt' : 'merken'}
	</button>
  );
};

export default FollowButton;