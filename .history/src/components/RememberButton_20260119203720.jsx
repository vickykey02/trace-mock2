import { useTipp } from '../context/TippsContext';

const RememberButton = ({ tippId }) => {
  const { toggleLikes, isRemembered } = useTipp();
  const isRemember = isRemembered(tippId);
  const handleToggle = () => {
	toggleLikes(tippId);
  };

  return (
	<button
	  onClick={handleToggle}
	  style={{
		backgroundColor: isRemember ? '#ff6b6b' : '#f0f0f0',
		color: isRemember ? '#fff' : '#333',
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
	  title={isRemembered ? 'Nicht mehr merken' : 'Merken'}
	>
	  <span style={{ fontSize: '16px' }}>
		{isRemember ? '❤️' : '🤍'}
	  </span>
	  {isRemember ? 'dislike' : 'like'}
	</button>
  );
};

export default RememberButton;